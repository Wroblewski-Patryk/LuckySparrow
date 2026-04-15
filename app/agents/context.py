from app.core.contracts import ContextOutput, Event, PerceptionOutput


class ContextAgent:
    def _summarize_memory_item(self, memory_item: dict) -> str:
        raw_summary = " ".join(str(memory_item.get("summary", "")).split())
        if not raw_summary:
            return ""

        fields: dict[str, str] = {}
        for part in raw_summary.split(";"):
            if "=" not in part:
                continue
            key, value = part.split("=", 1)
            fields[key.strip()] = value.strip()

        event_text = fields.get("event")
        expression = fields.get("expression")
        if event_text and expression:
            summary = f"user said '{event_text}' and received '{expression}'"
        elif event_text:
            summary = f"user said '{event_text}'"
        else:
            summary = raw_summary

        return summary[:160].rstrip()

    def run(self, event: Event, perception: PerceptionOutput, recent_memory: list[dict]) -> ContextOutput:
        text = str(event.payload.get("text", "")).strip()
        memory_hint = ""
        if recent_memory:
            memory_summaries = [
                self._summarize_memory_item(memory_item)
                for memory_item in recent_memory[:2]
            ]
            memory_summaries = [summary for summary in memory_summaries if summary]
            if memory_summaries:
                memory_hint = " Relevant recent memory: " + " | ".join(memory_summaries) + "."

        summary = f"User said: '{text}' with detected intent '{perception.intent}'." + memory_hint
        risk_level = 0.1 if text else 0.4

        return ContextOutput(
            summary=summary,
            related_goals=[],
            related_tags=[perception.topic],
            risk_level=risk_level,
        )
