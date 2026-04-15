from app.core.contracts import ContextOutput, Event, MotivationOutput, PlanOutput, RoleOutput


class PlanningAgent:
    def run(
        self,
        event: Event,
        context: ContextOutput,
        motivation: MotivationOutput,
        role: RoleOutput,
    ) -> PlanOutput:
        text = str(event.payload.get("text", "")).strip()
        needs_response = bool(text) and motivation.mode != "ignore"

        steps = ["interpret_event", "prepare_response"]
        if event.source == "telegram":
            steps.append("send_telegram_message")

        return PlanOutput(
            goal="Provide a clear and useful response to the user event.",
            steps=steps,
            needs_action=event.source == "telegram",
            needs_response=needs_response,
        )

