from app.core.events import normalize_event


def test_normalize_api_event() -> None:
    event = normalize_event({"text": "hello"})

    assert event.source == "api"
    assert event.subsource == "event_endpoint"
    assert event.payload["text"] == "hello"
    assert event.event_id
    assert event.meta.trace_id


def test_normalize_telegram_event() -> None:
    raw = {
        "update_id": 1,
        "message": {
            "text": "ping",
            "chat": {"id": 123},
            "from": {"id": 999},
        },
    }
    event = normalize_event(raw)

    assert event.source == "telegram"
    assert event.subsource == "user_message"
    assert event.payload["chat_id"] == 123
    assert event.meta.user_id == "999"

