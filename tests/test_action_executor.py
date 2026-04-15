from datetime import datetime, timezone

from app.core.action import ActionExecutor
from app.core.contracts import ContextOutput, Event, EventMeta, ExpressionOutput, MotivationOutput, PlanOutput


class FakeMemoryRepository:
    async def write_episode(self, **kwargs) -> dict:
        return {
            "id": 1,
            "event_id": kwargs["event_id"],
            "timestamp": kwargs["event_timestamp"],
            "summary": kwargs["summary"],
            "importance": kwargs["importance"],
        }


class FakeTelegramClient:
    async def send_message(self, chat_id: int | str, text: str) -> dict:
        return {"ok": True}


def _event(text: str) -> Event:
    return Event(
        event_id="evt-1",
        source="api",
        subsource="event_endpoint",
        timestamp=datetime.now(timezone.utc),
        payload={"text": text},
        meta=EventMeta(user_id="u-1", trace_id="t-1"),
    )


def _context() -> ContextOutput:
    return ContextOutput(summary="ctx", related_goals=[], related_tags=["general"], risk_level=0.1)


def _motivation() -> MotivationOutput:
    return MotivationOutput(
        importance=0.7,
        urgency=0.3,
        valence=0.1,
        arousal=0.4,
        mode="respond",
    )


def _plan() -> PlanOutput:
    return PlanOutput(goal="reply", steps=["reply"], needs_action=False, needs_response=True)


def _expression() -> ExpressionOutput:
    return ExpressionOutput(message="hello", tone="supportive", channel="api", language="en")


async def test_persist_episode_marks_specific_request_as_semantic_memory() -> None:
    executor = ActionExecutor(memory_repository=FakeMemoryRepository(), telegram_client=FakeTelegramClient())

    record = await executor.persist_episode(
        event=_event("deploy the fix to production now"),
        context=_context(),
        motivation=_motivation(),
        plan=_plan(),
        action_result=await executor.execute(_plan(), _event("deploy the fix to production now"), _expression()),
        expression=_expression(),
    )

    assert "memory_kind=semantic" in record.summary
    assert "memory_topics=deploy,fix,production" in record.summary


async def test_persist_episode_marks_short_follow_up_as_continuity_memory() -> None:
    executor = ActionExecutor(memory_repository=FakeMemoryRepository(), telegram_client=FakeTelegramClient())

    record = await executor.persist_episode(
        event=_event("ok"),
        context=_context(),
        motivation=_motivation(),
        plan=_plan(),
        action_result=await executor.execute(_plan(), _event("ok"), _expression()),
        expression=_expression(),
    )

    assert "memory_kind=continuity" in record.summary
    assert "memory_topics=" in record.summary
