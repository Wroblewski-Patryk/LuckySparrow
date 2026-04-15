from app.core.contracts import Event, PerceptionOutput
from app.utils.language import detect_language, normalize_for_matching


class PerceptionAgent:
    def run(self, event: Event, recent_memory: list[dict] | None = None) -> PerceptionOutput:
        text = str(event.payload.get("text", "")).strip()
        lowered = normalize_for_matching(text)
        planning_keywords = {"plan", "zaplanuj", "rollout", "wdrozenie", "krok", "steps"}
        language = detect_language(text=text, recent_memory=recent_memory)

        event_type = "question" if text.endswith("?") else "statement"
        topic = "planning" if any(keyword in lowered for keyword in planning_keywords) else "general"
        intent = "request_help" if event_type == "question" else "share_information"
        ambiguity = 0.6 if not text else 0.1
        initial_salience = 0.8 if event_type == "question" else 0.5

        return PerceptionOutput(
            event_type=event_type,
            topic=topic,
            intent=intent,
            language=language.code,
            language_confidence=language.confidence,
            ambiguity=ambiguity,
            initial_salience=initial_salience,
        )
