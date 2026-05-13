from app.agents.perception import PerceptionAgent
from app.core.contracts import Event, EventMeta
from app.perception.assessor import StructuredPerceptionAssessor

from datetime import datetime, timezone


class FakePerceptionClassifierClient:
    def __init__(self, payload: dict | None):
        self.payload = payload
        self.calls: list[dict[str, str]] = []

    async def classify_perception(self, *, user_text: str, fallback_language: str) -> dict | None:
        self.calls.append({"user_text": user_text, "fallback_language": fallback_language})
        return self.payload


def _event(text: str) -> Event:
    return Event(
        event_id="evt-perception",
        source="api",
        subsource="test",
        timestamp=datetime.now(timezone.utc),
        payload={"text": text},
        meta=EventMeta(user_id="u-1", trace_id="trace-perception"),
    )


async def test_structured_perception_assessor_uses_model_payload_across_languages() -> None:
    classifier = FakePerceptionClassifierClient(
        {
            "event_type": "question",
            "language": "es",
            "language_confidence": 0.94,
            "topic": "deployment_help",
            "topic_tags": ["deployment", "debugging"],
            "intent": "ask_for_status",
            "ambiguity": 0.12,
            "initial_salience": 0.76,
            "affective": {
                "affect_label": "positive_engagement",
                "intensity": 0.47,
                "needs_support": False,
                "confidence": 0.81,
                "evidence": ["gracias"],
            },
        }
    )
    fallback = PerceptionAgent().run(_event("Gracias, como va el despliegue?"))

    result = await StructuredPerceptionAssessor(classifier_client=classifier).assess(
        user_text="Gracias, como va el despliegue?",
        fallback=fallback,
    )

    assert result.language == "es"
    assert result.language_source == "ai_classifier"
    assert result.topic == "deployment_help"
    assert result.topic_tags == ["deployment_help", "deployment", "debugging"]
    assert result.intent == "ask_for_status"
    assert result.affective.source == "ai_perception_classifier"
    assert classifier.calls == [
        {"user_text": "Gracias, como va el despliegue?", "fallback_language": fallback.language}
    ]


async def test_structured_perception_assessor_falls_back_on_invalid_payload() -> None:
    classifier = FakePerceptionClassifierClient({"language": "not a code"})
    fallback = PerceptionAgent().run(_event("Dziekuje"))

    result = await StructuredPerceptionAssessor(classifier_client=classifier).assess(
        user_text="Dziekuje",
        fallback=fallback,
    )

    assert result.language == fallback.language
    assert result.language_source == fallback.language_source
    assert result.topic == fallback.topic
    assert result.affective.evidence[0] == "perception_fallback_reason:invalid_language"
