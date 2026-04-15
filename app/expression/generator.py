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
from app.utils.preferences import apply_response_style, preferred_response_style


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
        user_preferences: dict | None = None,
    ) -> ExpressionOutput:
        text = str(event.payload.get("text", "")).strip()
        response_style = preferred_response_style(user_preferences)
        message: str
        if not text:
            message = self._build_fallback_message(
                perception=perception,
                context=context,
                plan=plan,
                role=role,
                motivation=motivation,
                response_style=response_style,
            )
        else:
            llm_reply = await self.openai_client.generate_reply(
                user_text=text,
                context_summary=context.summary,
                role_name=role.selected,
                response_language=perception.language,
                response_style=response_style,
                plan_goal=plan.goal,
                motivation_mode=motivation.mode,
            )
            message = llm_reply or self._build_fallback_message(
                perception=perception,
                context=context,
                plan=plan,
                role=role,
                motivation=motivation,
                response_style=response_style,
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
        response_style: str | None = None,
    ) -> str:
        if motivation.mode == "clarify":
            return apply_response_style(
                fallback_message(perception.language, "clarify", plan.goal),
                response_style,
            )

        if motivation.mode == "support" or role.selected == "friend":
            return apply_response_style(
                fallback_message(perception.language, "support", plan.goal),
                response_style,
            )

        if motivation.mode == "execute" or role.selected == "executor":
            return apply_response_style(
                fallback_message(perception.language, "execute", plan.goal),
                response_style,
            )

        if motivation.mode == "analyze" or role.selected == "analyst":
            return apply_response_style(
                fallback_message(perception.language, "analyze", plan.goal),
                response_style,
            )

        if role.selected == "mentor":
            return apply_response_style(
                fallback_message(perception.language, "mentor", plan.goal),
                response_style,
            )

        if "Relevant recent memory:" in context.summary:
            return apply_response_style(
                fallback_message(perception.language, "memory", plan.goal),
                response_style,
            )

        return apply_response_style(
            fallback_message(perception.language, "default", plan.goal),
            response_style,
        )
