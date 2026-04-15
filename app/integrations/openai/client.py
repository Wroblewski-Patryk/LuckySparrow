from openai import AsyncOpenAI

from app.core.logging import get_logger
from app.utils.language import language_name


class OpenAIClient:
    def __init__(self, api_key: str | None, model: str):
        self.api_key = api_key
        self.model = model
        self.client = AsyncOpenAI(api_key=api_key) if api_key else None
        self.logger = get_logger("aion.openai")

    async def generate_reply(
        self,
        user_text: str,
        context_summary: str,
        role_name: str,
        response_language: str,
        plan_goal: str,
        motivation_mode: str,
    ) -> str | None:
        if not self.client:
            return None

        try:
            response = await self.client.responses.create(
                model=self.model,
                input=[
                    {
                        "role": "system",
                        "content": (
                            "You are AION, a supportive and concise assistant. "
                            f"Your current interaction role is '{role_name}'. "
                            f"The current response mode is '{motivation_mode}'. "
                            f"The immediate goal is '{plan_goal}'. "
                            f"The preferred response language is '{language_name(response_language)}'. "
                            "Respond clearly, preserve momentum, use the context summary when useful, "
                            "and stay in the preferred response language unless the user explicitly asks to switch."
                        ),
                    },
                    {
                        "role": "user",
                        "content": f"Context: {context_summary}\n\nUser message: {user_text}",
                    },
                ],
                max_output_tokens=220,
            )
        except Exception as exc:  # pragma: no cover - defensive network fallback
            self.logger.warning("openai_request_failed model=%s error=%s", self.model, exc)
            return None

        text = getattr(response, "output_text", None)
        if text:
            return text.strip()

        return None
