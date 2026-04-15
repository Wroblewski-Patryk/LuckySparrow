from pydantic import BaseModel


class SetWebhookRequest(BaseModel):
    webhook_url: str

