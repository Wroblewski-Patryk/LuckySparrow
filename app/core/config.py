from functools import lru_cache
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    openai_api_key: str | None = None
    openai_model: str = "gpt-4o-mini"
    telegram_bot_token: str | None = None
    telegram_webhook_secret: str | None = None
    database_url: str | None = None
    app_env: str = "development"
    app_port: int = 8000
    log_level: str = "INFO"
    event_debug_enabled: bool | None = None
    event_debug_token: str | None = None
    startup_schema_mode: Literal["migrate", "create_tables"] = "migrate"
    production_policy_enforcement: Literal["warn", "strict"] = "warn"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    def validate_required(self) -> None:
        environment = self.app_env.lower()
        if environment in {"testing", "test"}:
            return

        missing: list[str] = []
        if not self.database_url:
            missing.append("DATABASE_URL")
        if environment == "production":
            if not self.openai_api_key:
                missing.append("OPENAI_API_KEY")
            if not self.telegram_bot_token:
                missing.append("TELEGRAM_BOT_TOKEN")
        if missing:
            joined = ", ".join(missing)
            raise ValueError(f"Missing required environment variables: {joined}")

    def is_event_debug_enabled(self) -> bool:
        if self.event_debug_enabled is not None:
            return self.event_debug_enabled
        return self.app_env.lower() != "production"


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
