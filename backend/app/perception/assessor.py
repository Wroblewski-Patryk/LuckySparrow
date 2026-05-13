from typing import Any, Protocol
import re

from app.affective.assessor import AffectiveAssessor
from app.core.contracts import AffectiveAssessmentOutput, PerceptionOutput


class PerceptionClassifierClient(Protocol):
    async def classify_perception(
        self,
        *,
        user_text: str,
        fallback_language: str,
    ) -> dict[str, Any] | None: ...


class StructuredPerceptionAssessor:
    FALLBACK_REASON_FIELD = "_aion_perception_fallback_reason"
    FALLBACK_REASON_PREFIX = "perception_fallback_reason:"
    ALLOWED_EVENT_TYPES = {"question", "statement", "command", "scheduler", "unknown"}

    def __init__(
        self,
        classifier_client: PerceptionClassifierClient | None = None,
        *,
        enabled: bool = True,
        policy_source: str = "runtime_default",
    ):
        self.classifier_client = classifier_client
        self.enabled = bool(enabled)
        self.policy_source = str(policy_source).strip().lower() or "runtime_default"

    async def assess(
        self,
        *,
        user_text: str,
        fallback: PerceptionOutput,
    ) -> PerceptionOutput:
        text = str(user_text or "").strip()
        if not text:
            return self._fallback_output(fallback)

        if not self.enabled:
            return self._fallback_output(fallback, reason="policy_disabled")

        if self.classifier_client is None:
            return self._fallback_output(fallback, reason="classifier_unavailable")

        raw = await self.classifier_client.classify_perception(
            user_text=text,
            fallback_language=fallback.language,
        )
        if raw is None:
            return self._fallback_output(fallback, reason="classifier_no_payload")
        if not isinstance(raw, dict):
            return self._fallback_output(fallback, reason="classifier_non_object_payload")

        fallback_reason = self._extract_fallback_reason(raw)
        if fallback_reason is not None:
            return self._fallback_output(fallback, reason=fallback_reason)

        normalized = self._normalize_output(raw=raw, fallback=fallback)
        if normalized is None:
            return self._fallback_output(fallback, reason=self._normalization_failure_reason(raw))
        return normalized

    def snapshot(self) -> dict[str, str | bool]:
        if self.enabled and self.classifier_client is not None:
            posture = "ai_assisted_active"
            hint = "ai_classifier_available_for_structured_perception"
        elif self.enabled:
            posture = "fallback_only_classifier_unavailable"
            hint = "configure_classifier_or_disable_ai_structured_perception"
        else:
            posture = "fallback_only_policy_disabled"
            hint = "policy_disabled_use_deterministic_perception_baseline"
        return {
            "structured_perception_enabled": self.enabled,
            "structured_perception_source": self.policy_source,
            "structured_perception_classifier_available": self.classifier_client is not None,
            "structured_perception_posture": posture,
            "structured_perception_hint": hint,
            "structured_perception_owner": "structured_perception_rollout_policy",
        }

    def _fallback_output(
        self,
        fallback: PerceptionOutput,
        *,
        reason: str | None = None,
    ) -> PerceptionOutput:
        if not reason:
            return fallback
        evidence = [str(item) for item in fallback.affective.evidence]
        marker = f"{self.FALLBACK_REASON_PREFIX}{reason}"
        if marker not in evidence:
            evidence = [marker, *evidence]
        affective = fallback.affective.model_copy(update={"evidence": evidence[:3]})
        return fallback.model_copy(update={"affective": affective})

    def _normalize_output(
        self,
        *,
        raw: dict[str, Any],
        fallback: PerceptionOutput,
    ) -> PerceptionOutput | None:
        event_type = self._normalize_event_type(raw.get("event_type"), fallback.event_type)
        language = self._normalize_language(raw.get("language"))
        if not language:
            return None

        topic = self._normalize_slug(raw.get("topic"), fallback.topic)
        intent = self._normalize_slug(raw.get("intent"), fallback.intent)
        topic_tags = self._normalize_tags(raw.get("topic_tags"), fallback.topic_tags, topic)
        language_confidence = self._clamp_float(raw.get("language_confidence"), fallback.language_confidence)
        ambiguity = self._clamp_float(raw.get("ambiguity"), fallback.ambiguity)
        initial_salience = self._clamp_float(raw.get("initial_salience"), fallback.initial_salience)
        affective = self._normalize_affective(raw.get("affective"), fallback.affective)

        return fallback.model_copy(
            update={
                "event_type": event_type,
                "topic": topic,
                "topic_tags": topic_tags,
                "intent": intent,
                "language": language,
                "language_source": "ai_classifier",
                "language_confidence": language_confidence,
                "ambiguity": ambiguity,
                "initial_salience": initial_salience,
                "affective": affective,
            }
        )

    def _normalize_event_type(self, value: object, fallback: str) -> str:
        candidate = self._normalize_slug(value, fallback)
        if candidate in self.ALLOWED_EVENT_TYPES:
            return candidate
        return fallback if fallback in self.ALLOWED_EVENT_TYPES else "unknown"

    def _normalize_language(self, value: object) -> str | None:
        candidate = str(value or "").strip().lower()
        if not candidate:
            return None
        candidate = candidate.replace("_", "-")[:16]
        if re.fullmatch(r"[a-z]{2,3}(-[a-z0-9]{2,8})?", candidate):
            return candidate
        return None

    def _normalize_slug(self, value: object, fallback: str) -> str:
        candidate = str(value or "").strip().lower()
        candidate = re.sub(r"[^a-z0-9_ -]+", "", candidate)
        candidate = re.sub(r"[\s-]+", "_", candidate).strip("_")
        if not candidate:
            return str(fallback or "unknown").strip().lower() or "unknown"
        return candidate[:48]

    def _normalize_tags(self, value: object, fallback: list[str], topic: str) -> list[str]:
        source = value if isinstance(value, list) else fallback
        tags: list[str] = []
        for item in source:
            tag = self._normalize_slug(item, "")
            if not tag or tag in tags:
                continue
            tags.append(tag)
            if len(tags) >= 5:
                break
        if topic and topic not in tags:
            tags.insert(0, topic)
        return tags[:5]

    def _normalize_affective(
        self,
        value: object,
        fallback: AffectiveAssessmentOutput,
    ) -> AffectiveAssessmentOutput:
        if not isinstance(value, dict):
            return fallback
        label = str(value.get("affect_label", "")).strip().lower()
        if label not in AffectiveAssessor.ALLOWED_LABELS:
            return fallback
        evidence = self._normalize_evidence(value.get("evidence"))
        needs_support = bool(value.get("needs_support", False))
        if label == "support_distress":
            needs_support = True
        return AffectiveAssessmentOutput(
            affect_label=label,
            intensity=self._clamp_float(value.get("intensity"), fallback.intensity),
            needs_support=needs_support,
            confidence=self._clamp_float(value.get("confidence"), fallback.confidence),
            source="ai_perception_classifier",
            evidence=evidence,
        )

    def _extract_fallback_reason(self, raw: dict[str, Any]) -> str | None:
        candidate = str(raw.get(self.FALLBACK_REASON_FIELD, "")).strip().lower()
        if candidate:
            return candidate[:64]
        return None

    def _normalization_failure_reason(self, raw: dict[str, Any]) -> str:
        if not self._normalize_language(raw.get("language")):
            return "invalid_language"
        return "invalid_structured_perception_payload"

    def _clamp_float(self, value: object, fallback: float = 0.0) -> float:
        try:
            numeric = float(value)  # type: ignore[arg-type]
        except (TypeError, ValueError):
            numeric = float(fallback)
        return max(0.0, min(1.0, round(numeric, 2)))

    def _normalize_evidence(self, value: object) -> list[str]:
        if not isinstance(value, list):
            return []
        evidence: list[str] = []
        for item in value:
            text = str(item or "").strip()
            if not text:
                continue
            evidence.append(text[:80])
            if len(evidence) >= 3:
                break
        return evidence
