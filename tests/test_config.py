from pydantic import ValidationError

from app.core.config import Settings


def test_settings_default_to_migration_first_startup_mode() -> None:
    settings = Settings(database_url="postgresql+asyncpg://u:p@localhost:5432/aion")

    assert settings.startup_schema_mode == "migrate"
    assert settings.production_policy_enforcement == "warn"
    assert settings.event_debug_enabled is None
    assert settings.event_debug_token is None
    assert settings.is_event_debug_enabled() is True


def test_settings_allow_explicit_compatibility_create_tables_mode() -> None:
    settings = Settings(
        database_url="postgresql+asyncpg://u:p@localhost:5432/aion",
        startup_schema_mode="create_tables",
    )

    assert settings.startup_schema_mode == "create_tables"


def test_settings_reject_unknown_startup_schema_mode() -> None:
    try:
        Settings(
            database_url="postgresql+asyncpg://u:p@localhost:5432/aion",
            startup_schema_mode="legacy",  # type: ignore[arg-type]
        )
    except ValidationError as exc:
        assert "startup_schema_mode" in str(exc)
    else:  # pragma: no cover - defensive fallback
        raise AssertionError("Expected Settings validation to reject unknown startup schema mode.")


def test_settings_allow_disabling_event_debug_payload() -> None:
    settings = Settings(
        database_url="postgresql+asyncpg://u:p@localhost:5432/aion",
        event_debug_enabled=False,
    )

    assert settings.event_debug_enabled is False
    assert settings.is_event_debug_enabled() is False


def test_settings_default_to_debug_payload_disabled_in_production() -> None:
    settings = Settings(
        database_url="postgresql+asyncpg://u:p@localhost:5432/aion",
        app_env="production",
    )

    assert settings.event_debug_enabled is None
    assert settings.is_event_debug_enabled() is False


def test_settings_allow_explicit_debug_payload_enablement_in_production() -> None:
    settings = Settings(
        database_url="postgresql+asyncpg://u:p@localhost:5432/aion",
        app_env="production",
        event_debug_enabled=True,
    )

    assert settings.event_debug_enabled is True
    assert settings.is_event_debug_enabled() is True


def test_settings_allow_optional_event_debug_token() -> None:
    settings = Settings(
        database_url="postgresql+asyncpg://u:p@localhost:5432/aion",
        event_debug_token="debug-secret",
    )

    assert settings.event_debug_token == "debug-secret"


def test_settings_allow_strict_production_policy_enforcement_mode() -> None:
    settings = Settings(
        database_url="postgresql+asyncpg://u:p@localhost:5432/aion",
        production_policy_enforcement="strict",
    )

    assert settings.production_policy_enforcement == "strict"


def test_settings_reject_unknown_production_policy_enforcement_mode() -> None:
    try:
        Settings(
            database_url="postgresql+asyncpg://u:p@localhost:5432/aion",
            production_policy_enforcement="legacy",  # type: ignore[arg-type]
        )
    except ValidationError as exc:
        assert "production_policy_enforcement" in str(exc)
    else:  # pragma: no cover - defensive fallback
        raise AssertionError("Expected Settings validation to reject unknown production policy enforcement mode.")
