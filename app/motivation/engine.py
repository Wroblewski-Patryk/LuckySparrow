from app.core.contracts import ContextOutput, Event, MotivationOutput


class MotivationEngine:
    def run(self, event: Event, context: ContextOutput) -> MotivationOutput:
        text = str(event.payload.get("text", "")).strip()
        if not text:
            return MotivationOutput(
                importance=0.2,
                urgency=0.1,
                valence=0.0,
                arousal=0.1,
                mode="ignore",
            )

        return MotivationOutput(
            importance=0.7,
            urgency=0.4,
            valence=0.1,
            arousal=0.5,
            mode="respond",
        )

