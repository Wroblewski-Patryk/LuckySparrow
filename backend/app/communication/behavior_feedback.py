from __future__ import annotations

from app.communication.boundary import interpret_behavior_feedback_from_boundary_signals
from app.core.contracts import BehaviorFeedbackOutput
from app.utils.language import normalize_for_matching


class BehaviorFeedbackAssessor:
    def assess(self, text: str) -> list[BehaviorFeedbackOutput]:
        normalized = normalize_for_matching(text or "")
        if not normalized:
            return []

        outputs = list(interpret_behavior_feedback_from_boundary_signals(text))
        seen = {
            (
                output.feedback_target,
                output.suggested_relation_type or "",
                output.suggested_relation_value or "",
            )
            for output in outputs
        }
        for output in self._broader_behavior_feedback(text=text, normalized=normalized):
            key = (
                output.feedback_target,
                output.suggested_relation_type or "",
                output.suggested_relation_value or "",
            )
            if key in seen:
                continue
            seen.add(key)
            outputs.append(output)
        return outputs

    def _broader_behavior_feedback(self, *, text: str, normalized: str) -> list[BehaviorFeedbackOutput]:
        outputs: list[BehaviorFeedbackOutput] = []
        evidence = _clip_evidence(text)

        if _looks_like_context_continuity_feedback(normalized):
            outputs.append(
                BehaviorFeedbackOutput(
                    feedback_target="context_continuity",
                    feedback_polarity="correction",
                    suggested_relation_value="preserve_recent_conversation_continuity",
                    confidence=0.82,
                    evidence=[evidence],
                    source="behavior_feedback_assessor",
                )
            )

        if _looks_like_formality_correction(normalized):
            outputs.append(
                BehaviorFeedbackOutput(
                    feedback_target="response_style",
                    feedback_polarity="correction",
                    suggested_relation_value="less_formal_direct_style",
                    confidence=0.8,
                    evidence=[evidence],
                    source="behavior_feedback_assessor",
                )
            )

        if _looks_like_direct_style_approval(normalized):
            outputs.append(
                BehaviorFeedbackOutput(
                    feedback_target="response_style",
                    feedback_polarity="approval",
                    suggested_relation_value="direct_style_works",
                    confidence=0.82,
                    evidence=[evidence],
                    source="behavior_feedback_assessor",
                )
            )

        if _looks_like_hands_on_collaboration_approval(normalized):
            outputs.append(
                BehaviorFeedbackOutput(
                    feedback_target="collaboration",
                    feedback_polarity="approval",
                    suggested_relation_value="hands_on_collaboration_works",
                    confidence=0.78,
                    evidence=[evidence],
                    source="behavior_feedback_assessor",
                )
            )

        if not outputs and _looks_like_ambiguous_behavior_feedback(normalized):
            outputs.append(
                BehaviorFeedbackOutput(
                    feedback_target="unknown",
                    feedback_polarity="unclear",
                    confidence=0.32,
                    evidence=[evidence],
                    source="behavior_feedback_assessor_low_confidence",
                )
            )

        return outputs


def _looks_like_context_continuity_feedback(text: str) -> bool:
    subject_markers = {
        "you are",
        "youre",
        "you're",
        "aviary is",
        "aion is",
        "zachowujesz sie",
        "aviary zachowuje sie",
        "aion zachowuje sie",
        "piszesz",
    }
    reset_markers = {
        "acting like this is a new conversation",
        "like this is a new conversation",
        "as if this is a new conversation",
        "forgetting the conversation",
        "forgetting context",
        "lost context",
        "nie pamietasz kontekstu",
        "gubisz kontekst",
        "jakby to byla nowa rozmowa",
        "jak nowa rozmowa",
        "od nowa",
    }
    return _contains_any(text, subject_markers) and _contains_any(text, reset_markers)


def _looks_like_formality_correction(text: str) -> bool:
    behavior_markers = {
        "tone",
        "style",
        "brzmisz",
        "ton",
        "styl",
        "odpowiedz",
        "odpowiadasz",
    }
    formal_markers = {
        "too formal",
        "overly formal",
        "too stiff",
        "too corporate",
        "zbyt formalnie",
        "za formalnie",
        "zbyt sztywno",
        "za sztywno",
        "korpo",
    }
    return _contains_any(text, behavior_markers) and _contains_any(text, formal_markers)


def _looks_like_direct_style_approval(text: str) -> bool:
    approval_markers = {
        "works better",
        "worked better",
        "is better",
        "fits better",
        "tak jest lepiej",
        "dziala lepiej",
        "bardziej mi pasuje",
        "pasuje mi",
    }
    direct_markers = {
        "direct style",
        "direct tone",
        "being direct",
        "plain style",
        "prosto",
        "bezposrednio",
        "konkretnie",
        "wprost",
    }
    return _contains_any(text, direct_markers) and _contains_any(text, approval_markers)


def _looks_like_hands_on_collaboration_approval(text: str) -> bool:
    collaboration_markers = {
        "when you just do it",
        "you doing it",
        "hands on",
        "praca razem",
        "jak robisz to ze mna",
        "jak po prostu to robisz",
        "gdy ogarniasz to ze mna",
    }
    approval_markers = {
        "works better",
        "helps more",
        "is better",
        "tak jest lepiej",
        "bardziej pomaga",
        "lepiej dziala",
    }
    return _contains_any(text, collaboration_markers) and _contains_any(text, approval_markers)


def _looks_like_ambiguous_behavior_feedback(text: str) -> bool:
    subject_markers = {"you", "aviary", "aion", "ty", "osobowosc"}
    vague_feedback_markers = {
        "weird",
        "off",
        "strange",
        "dziwnie",
        "cos jest nie tak",
        "cos nie gra",
        "nie tak",
    }
    return _contains_any(text, subject_markers) and _contains_any(text, vague_feedback_markers)


def _contains_any(text: str, needles: set[str]) -> bool:
    return any(needle in text for needle in needles)


def _clip_evidence(text: str, *, limit: int = 160) -> str:
    normalized = " ".join(str(text or "").split())
    if len(normalized) <= limit:
        return normalized
    return normalized[: limit - 3].rstrip() + "..."
