from typing import Any

from fastapi import APIRouter, Request

from app.api.schemas import SetWebhookRequest
from app.core.events import normalize_event
from app.core.runtime import RuntimeOrchestrator
from app.integrations.telegram.client import TelegramClient

router = APIRouter()


def _runtime_from_request(request: Request) -> RuntimeOrchestrator:
    return request.app.state.runtime  # type: ignore[return-value]


def _telegram_from_request(request: Request) -> TelegramClient:
    return request.app.state.telegram_client  # type: ignore[return-value]


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@router.post("/event")
async def event_endpoint(payload: dict[str, Any], request: Request) -> dict[str, Any]:
    event = normalize_event(payload)
    runtime = _runtime_from_request(request)
    result = await runtime.run(event)
    return result.model_dump(mode="json")


@router.post("/telegram/set-webhook")
async def set_webhook(body: SetWebhookRequest, request: Request) -> dict[str, Any]:
    telegram_client = _telegram_from_request(request)
    return await telegram_client.set_webhook(webhook_url=body.webhook_url)

