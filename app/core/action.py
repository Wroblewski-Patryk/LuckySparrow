from app.core.contracts import (
    ActionResult,
    ContextOutput,
    Event,
    ExpressionOutput,
    MemoryRecord,
    MotivationOutput,
    PlanOutput,
)
from app.integrations.telegram.client import TelegramClient
from app.memory.repository import MemoryRepository


class ActionExecutor:
    def __init__(self, memory_repository: MemoryRepository, telegram_client: TelegramClient):
        self.memory_repository = memory_repository
        self.telegram_client = telegram_client

    async def execute(self, plan: PlanOutput, event: Event, expression: ExpressionOutput) -> ActionResult:
        if not plan.needs_response:
            return ActionResult(status="noop", actions=[], notes="No response required.")

        if event.source == "telegram":
            chat_id = event.payload.get("chat_id")
            if chat_id is None:
                return ActionResult(
                    status="fail",
                    actions=[],
                    notes="Telegram response requested but chat_id is missing.",
                )

            telegram_result = await self.telegram_client.send_message(chat_id=chat_id, text=expression.message)
            if telegram_result.get("ok"):
                return ActionResult(
                    status="success",
                    actions=["send_telegram_message"],
                    notes="Telegram message sent.",
                )
            return ActionResult(
                status="fail",
                actions=["send_telegram_message"],
                notes=f"Telegram API error: {telegram_result}",
            )

        return ActionResult(status="success", actions=["api_response"], notes="Response returned via API.")

    async def persist_episode(
        self,
        event: Event,
        context: ContextOutput,
        motivation: MotivationOutput,
        plan: PlanOutput,
        action_result: ActionResult,
        expression: ExpressionOutput,
    ) -> MemoryRecord:
        memory_kind = self._memory_kind(event)
        memory_topics = self._memory_topics(event)
        summary = (
            f"event={event.payload.get('text', '')}; "
            f"memory_kind={memory_kind}; "
            f"memory_topics={','.join(memory_topics)}; "
            f"response_language={expression.language}; "
            f"context={context.summary}; "
            f"plan_goal={plan.goal}; "
            f"action={action_result.status}; "
            f"expression={expression.message}"
        )
        summary = summary[:1000]

        stored = await self.memory_repository.write_episode(
            event_id=event.event_id,
            trace_id=event.meta.trace_id,
            source=event.source,
            user_id=event.meta.user_id,
            event_timestamp=event.timestamp,
            summary=summary,
            importance=motivation.importance,
        )

        return MemoryRecord(
            id=stored["id"],
            event_id=stored["event_id"],
            timestamp=stored["timestamp"],
            summary=stored["summary"],
            importance=stored["importance"],
        )

    def _memory_kind(self, event: Event) -> str:
        text = str(event.payload.get("text", "")).strip()
        return "semantic" if len(self._memory_topics(event)) >= 2 else "continuity"

    def _memory_topics(self, event: Event) -> list[str]:
        text = str(event.payload.get("text", "")).strip().lower()
        canonical = "".join(char if char.isalnum() or char.isspace() else " " for char in text)
        stopwords = {
            "a",
            "an",
            "and",
            "are",
            "do",
            "for",
            "how",
            "i",
            "in",
            "is",
            "it",
            "me",
            "my",
            "now",
            "or",
            "please",
            "the",
            "this",
            "to",
            "we",
            "what",
            "with",
            "you",
            "czy",
            "co",
            "jak",
            "mi",
            "mnie",
            "na",
            "po",
            "prosze",
            "sie",
            "teraz",
            "to",
            "w",
            "z",
        }
        topics: list[str] = []
        seen: set[str] = set()
        for token in canonical.split():
            if len(token) < 3 or token in stopwords or token in seen:
                continue
            seen.add(token)
            topics.append(token)
            if len(topics) >= 4:
                break
        return topics
