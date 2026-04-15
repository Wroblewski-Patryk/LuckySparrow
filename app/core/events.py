from datetime import datetime, timezone
from uuid import uuid4

from app.core.contracts import Event, EventMeta


def normalize_event(raw: dict) -> Event:
    if "message" in raw and isinstance(raw["message"], dict):
        message = raw["message"]
        chat = message.get("chat", {})
        user = message.get("from", {})
        payload = {
            "text": message.get("text", ""),
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
                user_id=str(user.get("id", "anonymous")),
                trace_id=str(uuid4()),
            ),
        )

    payload = raw.get("payload", {})
    if not isinstance(payload, dict):
        payload = {}

    if "text" in raw and "text" not in payload:
        payload["text"] = raw["text"]

    meta = raw.get("meta", {})
    if not isinstance(meta, dict):
        meta = {}

    return Event(
        event_id=str(uuid4()),
        source=str(raw.get("source", "api")),
        subsource=str(raw.get("subsource", "event_endpoint")),
        timestamp=datetime.now(timezone.utc),
        payload=payload,
        meta=EventMeta(
            user_id=str(meta.get("user_id", "anonymous")),
            trace_id=str(meta.get("trace_id", uuid4())),
        ),
    )

