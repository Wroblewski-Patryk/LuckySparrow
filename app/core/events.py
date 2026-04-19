from datetime import datetime, timezone
from typing import Any
from uuid import uuid4

from app.core.contracts import Event, EventMeta

MAX_EVENT_TEXT_LENGTH = 4000
MAX_META_ID_LENGTH = 64
ANONYMOUS_USER_ID = "anonymous"


def looks_like_telegram_update(raw: dict[str, Any]) -> bool:
    message = raw.get("message")
    if not isinstance(message, dict):
        return False
    return any(key in message for key in {"chat", "from", "text"}) or "update_id" in raw


def normalize_event(
    raw: dict[str, Any],
    *,
    default_user_id: str | None = None,
    default_trace_id: str | None = None,
) -> Event:
    if looks_like_telegram_update(raw):
        message = raw["message"]
        chat = message.get("chat", {})
        user = message.get("from", {})
        payload = {
            "text": _normalize_text(message.get("text", "")),
            "chat_id": chat.get("id"),
            "update_id": raw.get("update_id"),
        }
        return Event(
            event_id=str(uuid4()),
            source="telegram",
            subsource="user_message",
            timestamp=datetime.now(timezone.utc),
            payload=payload,
            meta=EventMeta(
                user_id=_normalize_user_id(user.get("id")),
                trace_id=str(uuid4()),
            ),
        )

    payload = raw.get("payload", {})
    if not isinstance(payload, dict):
        payload = {}

    text_source = raw.get("text") if "text" in raw else payload.get("text", "")
    normalized_text = _normalize_text(text_source)
    payload = {"text": normalized_text}

    meta = raw.get("meta", {})
    if not isinstance(meta, dict):
        meta = {}

    return Event(
        event_id=str(uuid4()),
        source="api",
        subsource="event_endpoint",
        timestamp=datetime.now(timezone.utc),
        payload=payload,
        meta=EventMeta(
                user_id=_normalize_user_id(meta.get("user_id") or default_user_id),
                trace_id=_normalize_trace_id(meta.get("trace_id") or default_trace_id),
        ),
    )


def _normalize_text(value: object) -> str:
    text = str(value) if value is not None else ""
    normalized = " ".join(text.split())
    return normalized[:MAX_EVENT_TEXT_LENGTH]


def _normalize_user_id(value: object) -> str:
    candidate = str(value or "").strip()
    if not candidate:
        return ANONYMOUS_USER_ID
    return candidate[:MAX_META_ID_LENGTH]


def _normalize_trace_id(value: object) -> str:
    candidate = str(value or "").strip()
    if not candidate:
        return str(uuid4())
    return candidate[:MAX_META_ID_LENGTH]
