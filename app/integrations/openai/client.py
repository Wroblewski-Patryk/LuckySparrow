from openai import AsyncOpenAI


class OpenAIClient:
    def __init__(self, api_key: str | None, model: str):
        self.api_key = api_key
        self.model = model
        self.client = AsyncOpenAI(api_key=api_key) if api_key else None

    async def generate_reply(self, user_text: str, context_summary: str) -> str | None:
        if not self.client:
            return None

        response = await self.client.responses.create(
            model=self.model,
            input=[
                {
                    "role": "system",
                    "content": (
                        "You are AION, a supportive and concise assistant. "
                        "Respond clearly and use the context summary when useful."
                    ),
                },
                {
                    "role": "user",
                    "content": f"Context: {context_summary}\n\nUser message: {user_text}",
                },
            ],
            max_output_tokens=220,
        )

        text = getattr(response, "output_text", None)
        if text:
            return text.strip()

        return None

