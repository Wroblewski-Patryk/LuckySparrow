from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.agents.context import ContextAgent
from app.agents.perception import PerceptionAgent
from app.agents.planning import PlanningAgent
from app.api.routes import router
from app.core.action import ActionExecutor
from app.core.config import get_settings
from app.core.database import Database
from app.core.logging import get_logger, setup_logging
from app.core.runtime import RuntimeOrchestrator
from app.expression.generator import ExpressionAgent
from app.integrations.telegram.client import TelegramClient
from app.memory.repository import MemoryRepository
from app.motivation.engine import MotivationEngine


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    settings.validate_required()

    setup_logging(settings.log_level)
    logger = get_logger("aion.app")

    database = Database(settings.database_url)  # type: ignore[arg-type]
    memory_repository = MemoryRepository(database.session_factory)
    await memory_repository.create_tables(database.engine)

    telegram_client = TelegramClient(settings.telegram_bot_token)
    action_executor = ActionExecutor(
        memory_repository=memory_repository,
        telegram_client=telegram_client,
    )

    runtime = RuntimeOrchestrator(
        perception_agent=PerceptionAgent(),
        context_agent=ContextAgent(),
        motivation_engine=MotivationEngine(),
        planning_agent=PlanningAgent(),
        expression_agent=ExpressionAgent(),
        action_executor=action_executor,
        memory_repository=memory_repository,
    )

    app.state.settings = settings
    app.state.database = database
    app.state.memory_repository = memory_repository
    app.state.telegram_client = telegram_client
    app.state.runtime = runtime

    logger.info("AION started env=%s port=%s", settings.app_env, settings.app_port)
    try:
        yield
    finally:
        await telegram_client.close()
        await database.dispose()
        logger.info("AION stopped")


app = FastAPI(title="AION MVP", version="0.1.0", lifespan=lifespan)
app.include_router(router)

