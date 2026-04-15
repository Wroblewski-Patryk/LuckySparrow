from app.core.contracts import (
    ContextOutput,
    Event,
    ExpressionOutput,
    MotivationOutput,
    PerceptionOutput,
    PlanOutput,
    RoleOutput,
)
from app.integrations.openai.client import OpenAIClient
from app.utils.language import fallback_message


class ExpressionAgent:
    def __init__(self, openai_client: OpenAIClient):
        self.openai_client = openai_client

    async def run(
        self,
        event: Event,
        perception: PerceptionOutput,
        context: ContextOutput,
        plan: PlanOutput,
        role: RoleOutput,
        motivation: MotivationOutput,
    ) -> ExpressionOutput:
        text = str(event.payload.get("text", "")).strip()
        message: str
        if not text:
            message = self._build_fallback_message(
                perception=perception,
                context=context,
                plan=plan,
                role=role,
                motivation=motivation,
            )
        else:
            llm_reply = await self.openai_client.generate_reply(
                user_text=text,
                context_summary=context.summary,
                role_name=role.selected,
                response_language=perception.language,
                plan_goal=plan.goal,
                motivation_mode=motivation.mode,
            )
            message = llm_reply or self._build_fallback_message(
                perception=perception,
                context=context,
                plan=plan,
                role=role,
                motivation=motivation,
            )

        channel = "telegram" if event.source == "telegram" else "api"
        return ExpressionOutput(
            message=message,
            tone="supportive",
            channel=channel,
            language=perception.language,
        )

    def _build_fallback_message(
        self,
        perception: PerceptionOutput,
        context: ContextOutput,
        plan: PlanOutput,
        role: RoleOutput,
        motivation: MotivationOutput,
    ) -> str:
        if motivation.mode == "clarify":
            return fallback_message(perception.language, "clarify", plan.goal)

        if motivation.mode == "support" or role.selected == "friend":
            return fallback_message(perception.language, "support", plan.goal)

        if motivation.mode == "execute" or role.selected == "executor":
            return fallback_message(perception.language, "execute", plan.goal)

        if motivation.mode == "analyze" or role.selected == "analyst":
            return fallback_message(perception.language, "analyze", plan.goal)

        if role.selected == "mentor":
            return fallback_message(perception.language, "mentor", plan.goal)

        if "Relevant recent memory:" in context.summary:
            return fallback_message(perception.language, "memory", plan.goal)

        return fallback_message(perception.language, "default", plan.goal)
