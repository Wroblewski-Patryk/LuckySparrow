from typing import Any

from fastapi import APIRouter, HTTPException, Request

from app.api.schemas import SetWebhookRequest
from app.core.events import normalize_event
from app.core.runtime import RuntimeOrchestrator
from app.integrations.telegram.client import TelegramClient

router = APIRouter()


def _runtime_from_request(request: Request) -> RuntimeOrchestrator:
    return request.app.state.runtime  # type: ignore[return-value]


def _telegram_from_request(request: Request) -> TelegramClient:
    return request.app.state.telegram_client  # type: ignore[return-value]


def _settings_from_request(request: Request):
    return request.app.state.settings


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@router.post("/event")
async def event_endpoint(payload: dict[str, Any], request: Request) -> dict[str, Any]:
    settings = _settings_from_request(request)
    looks_like_telegram = isinstance(payload.get("message"), dict) or "update_id" in payload
    if looks_like_telegram and settings.telegram_webhook_secret:
        received_secret = request.headers.get("X-Telegram-Bot-Api-Secret-Token")
        if received_secret != settings.telegram_webhook_secret:
            raise HTTPException(status_code=403, detail="Invalid Telegram webhook secret token.")

    event = normalize_event(payload)
    runtime = _runtime_from_request(request)
    result = await runtime.run(event)
    return result.model_dump(mode="json")


@router.post("/telegram/set-webhook")
async def set_webhook(body: SetWebhookRequest, request: Request) -> dict[str, Any]:
    telegram_client = _telegram_from_request(request)
    settings = _settings_from_request(request)
    token = body.secret_token or settings.telegram_webhook_secret
    return await telegram_client.set_webhook(webhook_url=body.webhook_url, secret_token=token)
