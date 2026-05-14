import json
from typing import Any

from openai import AsyncOpenAI

from app.core.logging import get_logger
from app.integrations.openai.prompting import OpenAIPromptBuilder
from app.integrations.openai.response_budget import ResponseBudgetPolicy


class OpenAIClient:
    AFFECTIVE_FALLBACK_REASON_FIELD = "_aion_affective_fallback_reason"
    PERCEPTION_FALLBACK_REASON_FIELD = "_aion_perception_fallback_reason"

    def __init__(self, api_key: str | None, model: str):
        self.api_key = api_key
        self.model = model
        self.client = AsyncOpenAI(api_key=api_key) if api_key else None
        self.logger = get_logger("aion.openai")
        self.prompt_builder = OpenAIPromptBuilder()

    async def generate_reply(
        self,
        user_text: str,
        context_summary: str,
        foreground_awareness_summary: str,
        role_name: str,
        response_language: str,
        response_style: str | None,
        plan_goal: str,
        motivation_mode: str,
        response_tone: str,
        collaboration_preference: str | None,
        communication_boundary_summary: str = "",
        identity_summary: str = "",
        current_turn_timestamp: str = "",
        delivery_channel: str = "api",
    ) -> str | None:
        if not self.client:
            return None

        try:
            response_budget = ResponseBudgetPolicy.for_turn(
                delivery_channel=delivery_channel,
                response_style=response_style,
                motivation_mode=motivation_mode,
                role_name=role_name,
                plan_goal=plan_goal,
            )
            messages = self.prompt_builder.build_reply_messages(
                user_text=user_text,
                context_summary=context_summary,
                foreground_awareness_summary=foreground_awareness_summary,
                role_name=role_name,
                response_language=response_language,
                response_style=response_style,
                plan_goal=plan_goal,
                motivation_mode=motivation_mode,
                response_tone=response_tone,
                collaboration_preference=collaboration_preference,
                communication_boundary_summary=communication_boundary_summary,
                identity_summary=identity_summary,
                current_turn_timestamp=current_turn_timestamp,
                response_budget_contract=response_budget.contract_summary,
            )
            response = await self.client.responses.create(
                model=self.model,
                input=messages,
                max_output_tokens=response_budget.max_output_tokens,
            )
        except Exception as exc:  # pragma: no cover - defensive network fallback
            self.logger.warning("openai_request_failed model=%s error=%s", self.model, exc)
            return None

        text = getattr(response, "output_text", None)
        if text:
            return text.strip()

        return None

    async def classify_affective_state(
        self,
        *,
        user_text: str,
        response_language: str,
    ) -> dict[str, Any] | None:
        if not self.client:
            return None

        try:
            messages = self.prompt_builder.build_affective_messages(
                user_text=user_text,
                response_language=response_language,
            )
            response = await self.client.responses.create(
                model=self.model,
                input=messages,
                max_output_tokens=120,
            )
        except Exception as exc:  # pragma: no cover - defensive network fallback
            self.logger.warning("openai_affective_request_failed model=%s error=%s", self.model, exc)
            return None

        text = getattr(response, "output_text", None)
        if not text:
            return self._affective_fallback_payload("openai_affective_empty_response")

        payload = self._parse_affective_payload(text=text)
        if payload is None:
            return self._affective_fallback_payload("openai_affective_parse_failed")

        validation_error = self._validate_affective_payload_schema(payload)
        if validation_error is not None:
            self.logger.warning(
                "openai_affective_schema_invalid model=%s reason=%s payload_type=%s",
                self.model,
                validation_error,
                type(payload).__name__,
            )
            return self._affective_fallback_payload(validation_error)
        return payload

    async def classify_perception(
        self,
        *,
        user_text: str,
        fallback_language: str,
    ) -> dict[str, Any] | None:
        if not self.client:
            return None

        try:
            messages = self.prompt_builder.build_perception_messages(
                user_text=user_text,
                fallback_language=fallback_language,
            )
            response = await self.client.responses.create(
                model=self.model,
                input=messages,
                max_output_tokens=180,
            )
        except Exception as exc:  # pragma: no cover - defensive network fallback
            self.logger.warning("openai_perception_request_failed model=%s error=%s", self.model, exc)
            return None

        text = getattr(response, "output_text", None)
        if not text:
            return self._perception_fallback_payload("openai_perception_empty_response")

        payload = self._parse_json_payload(text=text, log_prefix="openai_perception")
        if payload is None:
            return self._perception_fallback_payload("openai_perception_parse_failed")

        validation_error = self._validate_perception_payload_schema(payload)
        if validation_error is not None:
            self.logger.warning(
                "openai_perception_schema_invalid model=%s reason=%s payload_type=%s",
                self.model,
                validation_error,
                type(payload).__name__,
            )
            return self._perception_fallback_payload(validation_error)
        return payload

    def _parse_affective_payload(self, *, text: str) -> dict[str, Any] | None:
        return self._parse_json_payload(text=text, log_prefix="openai_affective")

    def _parse_json_payload(self, *, text: str, log_prefix: str) -> dict[str, Any] | None:
        candidate = str(text or "").strip()
        if not candidate:
            return None

        try:
            payload = json.loads(candidate)
        except Exception:
            start = candidate.find("{")
            end = candidate.rfind("}")
            if start == -1 or end == -1 or end <= start:
                return None
            try:
                payload = json.loads(candidate[start : end + 1])
            except Exception as exc:  # pragma: no cover - defensive parse fallback
                self.logger.warning("%s_parse_failed model=%s error=%s", log_prefix, self.model, exc)
                return None
        if not isinstance(payload, dict):
            return None
        return payload

    def _validate_affective_payload_schema(self, payload: dict[str, Any]) -> str | None:
        required_keys = ("affect_label", "intensity", "needs_support", "confidence", "evidence")
        missing = [key for key in required_keys if key not in payload]
        if missing:
            return "openai_affective_schema_missing_keys"

        if not isinstance(payload.get("affect_label"), str):
            return "openai_affective_schema_invalid_affect_label_type"
        if not isinstance(payload.get("needs_support"), bool):
            return "openai_affective_schema_invalid_needs_support_type"
        if not isinstance(payload.get("evidence"), list):
            return "openai_affective_schema_invalid_evidence_type"
        if not self._is_numeric(payload.get("intensity")):
            return "openai_affective_schema_invalid_intensity_type"
        if not self._is_numeric(payload.get("confidence")):
            return "openai_affective_schema_invalid_confidence_type"
        return None

    def _affective_fallback_payload(self, reason: str) -> dict[str, str]:
        return {self.AFFECTIVE_FALLBACK_REASON_FIELD: reason}

    def _validate_perception_payload_schema(self, payload: dict[str, Any]) -> str | None:
        required_keys = (
            "event_type",
            "language",
            "language_confidence",
            "topic",
            "topic_tags",
            "intent",
            "ambiguity",
            "initial_salience",
        )
        missing = [key for key in required_keys if key not in payload]
        if missing:
            return "openai_perception_schema_missing_keys"

        string_keys = ("event_type", "language", "topic", "intent")
        for key in string_keys:
            if not isinstance(payload.get(key), str):
                return f"openai_perception_schema_invalid_{key}_type"
        if not isinstance(payload.get("topic_tags"), list):
            return "openai_perception_schema_invalid_topic_tags_type"
        for key in ("language_confidence", "ambiguity", "initial_salience"):
            if not self._is_numeric(payload.get(key)):
                return f"openai_perception_schema_invalid_{key}_type"

        affective = payload.get("affective")
        if affective is not None and not isinstance(affective, dict):
            return "openai_perception_schema_invalid_affective_type"
        return None

    def _perception_fallback_payload(self, reason: str) -> dict[str, str]:
        return {self.PERCEPTION_FALLBACK_REASON_FIELD: reason}

    def _is_numeric(self, value: Any) -> bool:
        return isinstance(value, (int, float)) and not isinstance(value, bool)
