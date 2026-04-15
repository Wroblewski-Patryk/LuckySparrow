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
        summary = (
            f"event={event.payload.get('text', '')}; "
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
