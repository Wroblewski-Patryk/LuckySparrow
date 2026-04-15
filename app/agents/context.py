from app.core.contracts import ContextOutput, Event, PerceptionOutput


class ContextAgent:
    def run(self, event: Event, perception: PerceptionOutput, recent_memory: list[dict]) -> ContextOutput:
        text = str(event.payload.get("text", "")).strip()
        memory_hint = ""
        if recent_memory:
            memory_hint = f" Recent memory count: {len(recent_memory)}."

        summary = f"User said: '{text}' with detected intent '{perception.intent}'." + memory_hint
        risk_level = 0.1 if text else 0.4

        return ContextOutput(
            summary=summary,
            related_goals=[],
            related_tags=[perception.topic],
            risk_level=risk_level,
        )

