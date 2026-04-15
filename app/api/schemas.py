from pydantic import BaseModel


class SetWebhookRequest(BaseModel):
    webhook_url: str
    secret_token: str | None = None
