from pydantic import BaseModel

from app.core.contracts import RuntimeResult


class EventReplyResponse(BaseModel):
    message: str
    language: str
    tone: str
    channel: str


class EventRuntimeResponse(BaseModel):
    role: str
    motivation_mode: str
    action_status: str
    reflection_triggered: bool


class EventResponse(BaseModel):
    event_id: str
    trace_id: str
    source: str
    reply: EventReplyResponse
    runtime: EventRuntimeResponse
    debug: RuntimeResult | None = None


class SetWebhookRequest(BaseModel):
    webhook_url: str
    secret_token: str | None = None
