from datetime import datetime, timezone

from app.agents.context import ContextAgent
from app.agents.perception import PerceptionAgent
from app.agents.planning import PlanningAgent
from app.core.action import ActionExecutor
from app.core.contracts import Event, EventMeta
from app.core.runtime import RuntimeOrchestrator
from app.expression.generator import ExpressionAgent
from app.motivation.engine import MotivationEngine


class FakeMemoryRepository:
    async def get_recent_for_user(self, user_id: str, limit: int = 5) -> list[dict]:
        return []

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


async def test_runtime_pipeline_api_source() -> None:
    memory = FakeMemoryRepository()
    action = ActionExecutor(memory_repository=memory, telegram_client=FakeTelegramClient())
    runtime = RuntimeOrchestrator(
        perception_agent=PerceptionAgent(),
        context_agent=ContextAgent(),
        motivation_engine=MotivationEngine(),
        planning_agent=PlanningAgent(),
        expression_agent=ExpressionAgent(),
        action_executor=action,
        memory_repository=memory,
    )

    event = Event(
        event_id="evt-1",
        source="api",
        subsource="event_endpoint",
        timestamp=datetime.now(timezone.utc),
        payload={"text": "hello"},
        meta=EventMeta(user_id="u-1", trace_id="t-1"),
    )

    result = await runtime.run(event)

    assert result.action_result.status == "success"
    assert result.expression.message.startswith("Echo")
    assert result.memory_record is not None

