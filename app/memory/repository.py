from datetime import datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, async_sessionmaker

from app.memory.models import AionMemory, Base


class MemoryRepository:
    def __init__(self, session_factory: async_sessionmaker[AsyncSession]):
        self.session_factory = session_factory

    async def create_tables(self, engine: AsyncEngine) -> None:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

    async def write_episode(
        self,
        event_id: str,
        trace_id: str,
        source: str,
        user_id: str,
        event_timestamp: datetime,
        summary: str,
        importance: float,
    ) -> dict:
        async with self.session_factory() as session:
            row = AionMemory(
                event_id=event_id,
                trace_id=trace_id,
                source=source,
                user_id=user_id,
                event_timestamp=event_timestamp,
                summary=summary,
                importance=importance,
            )
            session.add(row)
            await session.commit()
            await session.refresh(row)

        return {
            "id": row.id,
            "event_id": row.event_id,
            "timestamp": row.event_timestamp,
            "summary": row.summary,
            "importance": row.importance,
        }

    async def get_recent_for_user(self, user_id: str, limit: int = 5) -> list[dict]:
        async with self.session_factory() as session:
            statement = (
                select(AionMemory)
                .where(AionMemory.user_id == user_id)
                .order_by(AionMemory.id.desc())
                .limit(limit)
            )
            result = await session.execute(statement)
            rows = result.scalars().all()

        return [
            {
                "id": row.id,
                "event_id": row.event_id,
                "summary": row.summary,
                "importance": row.importance,
                "event_timestamp": row.event_timestamp,
            }
            for row in rows
        ]

