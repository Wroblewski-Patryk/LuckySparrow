from pydantic import BaseModel, ConfigDict, Field
from typing import Any

from app.core.contracts import MotivationMode, RuntimeResult, RuntimeSystemDebugOutput


class EventReplyResponse(BaseModel):
    message: str
    language: str
    tone: str
    channel: str


class EventRuntimeResponse(BaseModel):
    role: str
    motivation_mode: MotivationMode
    action_status: str
    reflection_triggered: bool


class EventQueueResponse(BaseModel):
    queued: bool
    reason: str
    turn_id: str | None = None
    source_count: int | None = None


class EventResponse(BaseModel):
    event_id: str
    trace_id: str
    source: str
    reply: EventReplyResponse | None = None
    runtime: EventRuntimeResponse | None = None
    queue: EventQueueResponse | None = None
    debug: RuntimeResult | None = None
    system_debug: RuntimeSystemDebugOutput | None = None
    incident_evidence: dict[str, Any] | None = None


class SetWebhookRequest(BaseModel):
    webhook_url: str
    secret_token: str | None = None


class AppRegisterRequest(BaseModel):
    email: str = Field(min_length=3, max_length=320)
    password: str = Field(min_length=8, max_length=128)
    display_name: str | None = Field(default=None, max_length=120)


class AppLoginRequest(BaseModel):
    email: str = Field(min_length=3, max_length=320)
    password: str = Field(min_length=8, max_length=128)


class AppSettingsPatchRequest(BaseModel):
    preferred_language: str | None = Field(default=None, min_length=2, max_length=8)
    ui_language: str | None = Field(default=None, min_length=2, max_length=16)
    utc_offset: str | None = Field(default=None, min_length=1, max_length=16)
    proactive_opt_in: bool | None = None
    display_name: str | None = Field(default=None, max_length=120)


class AppResetDataRequest(BaseModel):
    confirmation_text: str = Field(min_length=1, max_length=64)


class AppChatMessageRequest(BaseModel):
    text: str = Field(min_length=1, max_length=4000)


class AppAuthUserResponse(BaseModel):
    id: str
    email: str
    display_name: str | None = None


class AppSettingsResponse(BaseModel):
    preferred_language: str | None = None
    ui_language: str | None = None
    utc_offset: str | None = None
    proactive_opt_in: bool | None = None


class AppResetDataResponse(BaseModel):
    status: str
    scope: str
    target_user_id: str | None = None
    total_deleted_records: int
    revoked_session_count: int
    cleared_categories: list[str]
    preserved_categories: list[str]
    preserved_conclusion_kinds: list[str]


class AppMeResponse(BaseModel):
    model_config = ConfigDict(extra="allow")

    user: AppAuthUserResponse
    settings: AppSettingsResponse


class AppChatHistoryEntry(BaseModel):
    message_id: str
    event_id: str
    role: str
    text: str
    channel: str
    timestamp: Any
    metadata: dict[str, Any] | None = None


class AppChatHistoryResponse(BaseModel):
    items: list[AppChatHistoryEntry]


class AppChatMessageResponse(BaseModel):
    reply: EventReplyResponse
    runtime: EventRuntimeResponse | None = None
    event_id: str
    trace_id: str


class AppPersonalityOverviewResponse(BaseModel):
    model_config = ConfigDict(extra="allow")


class AppToolsOverviewResponse(BaseModel):
    model_config = ConfigDict(extra="allow")


class AppToolsPreferencesPatchRequest(BaseModel):
    telegram_enabled: bool | None = None
    clickup_enabled: bool | None = None
    google_calendar_enabled: bool | None = None
    google_drive_enabled: bool | None = None


class AppTelegramLinkStartResponse(BaseModel):
    link_code: str
    instruction_text: str
    link_state: str
    expires_in_seconds: int
