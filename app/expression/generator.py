from app.core.contracts import (
    ContextOutput,
    Event,
    ExpressionOutput,
    MotivationOutput,
    PlanOutput,
    RoleOutput,
)


class ExpressionAgent:
    def run(
        self,
        event: Event,
        context: ContextOutput,
        plan: PlanOutput,
        role: RoleOutput,
        motivation: MotivationOutput,
    ) -> ExpressionOutput:
        text = str(event.payload.get("text", "")).strip()
        if not text:
            message = "I did not receive text content. Please send a message."
        else:
            message = f"Echo ({role.selected}): {text}"

        channel = "telegram" if event.source == "telegram" else "api"
        return ExpressionOutput(message=message, tone="supportive", channel=channel)

