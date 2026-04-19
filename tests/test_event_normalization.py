from app.core.events import MAX_EVENT_TEXT_LENGTH, looks_like_telegram_update, normalize_event


def test_normalize_api_event() -> None:
    event = normalize_event({"text": "hello"})

    assert event.source == "api"
    assert event.subsource == "event_endpoint"
    assert event.payload["text"] == "hello"
    assert event.event_id
    assert event.meta.trace_id


def test_normalize_api_event_ignores_internal_source_fields_from_client_payload() -> None:
    event = normalize_event(
        {
            "text": "hello from client",
            "source": "telegram",
            "subsource": "user_message",
            "event_id": "evt-client",
            "meta": {"user_id": "u-1", "trace_id": "trace-client"},
        }
    )

    assert event.source == "api"
    assert event.subsource == "event_endpoint"
    assert event.payload == {"text": "hello from client"}
    assert event.meta.user_id == "u-1"
    assert event.meta.trace_id == "trace-client"


def test_normalize_api_event_uses_payload_text_when_top_level_text_is_missing() -> None:
    event = normalize_event({"payload": {"text": "payload text", "extra": "ignored"}})

    assert event.source == "api"
    assert event.payload == {"text": "payload text"}


def test_normalize_api_event_normalizes_text_and_limits_length() -> None:
    raw_text = "   hello   world \n" + ("x" * (MAX_EVENT_TEXT_LENGTH + 30))
    event = normalize_event({"text": raw_text})

    assert event.payload["text"].startswith("hello world")
    assert len(event.payload["text"]) == MAX_EVENT_TEXT_LENGTH


def test_normalize_api_event_normalizes_meta_field_lengths() -> None:
    event = normalize_event(
        {
            "text": "hello",
            "meta": {
                "user_id": "u" * 80,
                "trace_id": "t" * 90,
            },
        }
    )

    assert len(event.meta.user_id) == 64
    assert len(event.meta.trace_id) == 64


def test_normalize_api_event_uses_default_user_id_when_meta_user_id_is_missing() -> None:
    event = normalize_event(
        {"text": "hello"},
        default_user_id="api-user-7",
    )

    assert event.meta.user_id == "api-user-7"


def test_normalize_api_event_prefers_meta_user_id_over_default_user_id() -> None:
    event = normalize_event(
        {
            "text": "hello",
            "meta": {"user_id": "meta-user"},
        },
        default_user_id="header-user",
    )

    assert event.meta.user_id == "meta-user"


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
    assert event.payload["text"] == "ping"
    assert event.meta.user_id == "999"


def test_looks_like_telegram_update_requires_message_shape() -> None:
    assert looks_like_telegram_update({"update_id": 1, "message": {"text": "ping"}}) is True
    assert looks_like_telegram_update({"text": "hello"}) is False
