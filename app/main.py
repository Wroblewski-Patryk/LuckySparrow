from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.agents.context import ContextAgent
from app.agents.perception import PerceptionAgent
from app.agents.planning import PlanningAgent
from app.agents.role import RoleAgent
from app.api.routes import router
from app.core.action import ActionExecutor
from app.core.config import get_settings
from app.core.database import Database
from app.core.logging import get_logger, setup_logging
from app.core.runtime_policy import production_policy_mismatches, runtime_policy_snapshot, strict_startup_blocked
from app.core.runtime import RuntimeOrchestrator
from app.expression.generator import ExpressionAgent
from app.integrations.openai.client import OpenAIClient
from app.integrations.telegram.client import TelegramClient
from app.memory.repository import MemoryRepository
from app.motivation.engine import MotivationEngine
from app.reflection.worker import ReflectionWorker


def _log_runtime_policy_warnings(*, settings, logger) -> None:
    policy = runtime_policy_snapshot(settings)
    violations = production_policy_mismatches(settings)
    if "event_debug_enabled=true" in violations:
        logger.warning(
            "runtime_policy_warning env=%s event_debug_enabled=%s source=%s recommendation=disable_debug_payload_in_production",
            settings.app_env,
            policy["event_debug_enabled"],
            policy["event_debug_source"],
        )
    if "startup_schema_mode=create_tables" in violations:
        logger.warning(
            "runtime_policy_warning env=%s startup_schema_mode=%s recommendation=use_migration_first_startup_in_production",
            settings.app_env,
            policy["startup_schema_mode"],
        )
    if strict_startup_blocked(settings):
        violation_summary = ",".join(violations)
        logger.error(
            "runtime_policy_block env=%s enforcement=%s violations=%s",
            settings.app_env,
            policy["production_policy_enforcement"],
            violation_summary,
        )
        raise RuntimeError(
            "Production runtime policy strict-mode violation: "
            f"{violation_summary}. Resolve policy mismatch or set PRODUCTION_POLICY_ENFORCEMENT=warn."
        )


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    settings.validate_required()

    setup_logging(settings.log_level)
    logger = get_logger("aion.app")
    _log_runtime_policy_warnings(settings=settings, logger=logger)

    database = Database(settings.database_url)  # type: ignore[arg-type]
    memory_repository = MemoryRepository(database.session_factory)
    if settings.startup_schema_mode == "create_tables":
        await memory_repository.create_tables(database.engine)
        logger.warning(
            "schema_bootstrap mode=%s action=create_tables note=compatibility_path",
            settings.startup_schema_mode,
        )
    else:
        logger.info(
            "schema_bootstrap mode=%s action=skip_create_tables note=expect_migrations",
            settings.startup_schema_mode,
        )

    telegram_client = TelegramClient(settings.telegram_bot_token)
    openai_client = OpenAIClient(
        api_key=settings.openai_api_key,
        model=settings.openai_model,
    )
    action_executor = ActionExecutor(
        memory_repository=memory_repository,
        telegram_client=telegram_client,
    )
    reflection_worker = ReflectionWorker(memory_repository=memory_repository)
    await reflection_worker.start()

    runtime = RuntimeOrchestrator(
        perception_agent=PerceptionAgent(),
        context_agent=ContextAgent(),
        motivation_engine=MotivationEngine(),
        role_agent=RoleAgent(),
        planning_agent=PlanningAgent(),
        expression_agent=ExpressionAgent(openai_client=openai_client),
        action_executor=action_executor,
        memory_repository=memory_repository,
        reflection_worker=reflection_worker,
    )

    app.state.settings = settings
    app.state.database = database
    app.state.memory_repository = memory_repository
    app.state.telegram_client = telegram_client
    app.state.reflection_worker = reflection_worker
    app.state.runtime = runtime

    logger.info(
        "AION started env=%s port=%s openai_enabled=%s telegram_enabled=%s",
        settings.app_env,
        settings.app_port,
        bool(settings.openai_api_key),
        bool(settings.telegram_bot_token),
    )
    try:
        yield
    finally:
        await reflection_worker.stop()
        await telegram_client.close()
        await database.dispose()
        logger.info("AION stopped")


app = FastAPI(title="AION MVP", version="0.1.0", lifespan=lifespan)
app.include_router(router)
