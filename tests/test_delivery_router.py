from app.core.contracts import (
    ActionDelivery,
    ActionDeliveryConnectorIntent,
    ActionDeliveryExecutionEnvelope,
)
from app.integrations.delivery_router import DeliveryRouter


class FakeTelegramClient:
    def __init__(self, *, ok: bool = True, error: Exception | None = None):
        self.ok = ok
        self.error = error
        self.calls: list[dict[str, int | str]] = []

    async def send_message(self, chat_id: int | str, text: str) -> dict:
        self.calls.append({"chat_id": chat_id, "text": text})
        if self.error is not None:
            raise self.error
        if self.ok:
            return {"ok": True}
        return {"ok": False, "description": "telegram error"}


async def test_delivery_router_handles_api_channel() -> None:
    router = DeliveryRouter(telegram_client=FakeTelegramClient())

    result = await router.deliver(
        ActionDelivery(
            message="hello",
            tone="supportive",
            channel="api",
            language="en",
        )
    )

    assert result.status == "success"
    assert result.actions == ["api_response"]


async def test_delivery_router_appends_execution_envelope_note_for_connector_safe_delivery() -> None:
    router = DeliveryRouter(telegram_client=FakeTelegramClient())

    result = await router.deliver(
        ActionDelivery(
            message="hello",
            tone="supportive",
            channel="api",
            language="en",
            execution_envelope=ActionDeliveryExecutionEnvelope(
                connector_safe=True,
                connector_intents=[
                    ActionDeliveryConnectorIntent(
                        connector_kind="task_system",
                        provider_hint="clickup",
                        operation="create_task",
                        mode="mutate_with_confirmation",
                        allowed=False,
                        requires_confirmation=True,
                        reason="explicit_user_confirmation_required",
                    )
                ],
            ),
        )
    )

    assert result.status == "success"
    assert "Execution envelope:" in result.notes
    assert "connector_intents=1" in result.notes
    assert "permission_gates=0" in result.notes


async def test_delivery_router_handles_telegram_channel() -> None:
    telegram_client = FakeTelegramClient(ok=True)
    router = DeliveryRouter(telegram_client=telegram_client)

    result = await router.deliver(
        ActionDelivery(
            message="hello",
            tone="supportive",
            channel="telegram",
            language="en",
            chat_id=42,
        )
    )

    assert result.status == "success"
    assert result.actions == ["send_telegram_message"]
    assert telegram_client.calls == [{"chat_id": 42, "text": "hello"}]


async def test_delivery_router_requires_chat_id_for_telegram() -> None:
    router = DeliveryRouter(telegram_client=FakeTelegramClient())

    result = await router.deliver(
        ActionDelivery(
            message="hello",
            tone="supportive",
            channel="telegram",
            language="en",
        )
    )

    assert result.status == "fail"
    assert result.actions == []
    assert "chat_id is missing" in result.notes


async def test_delivery_router_surfaces_telegram_api_errors() -> None:
    telegram_client = FakeTelegramClient(ok=False)
    router = DeliveryRouter(telegram_client=telegram_client)

    result = await router.deliver(
        ActionDelivery(
            message="hello",
            tone="supportive",
            channel="telegram",
            language="en",
            chat_id=42,
        )
    )

    assert result.status == "fail"
    assert result.actions == ["send_telegram_message"]
    assert "telegram error" in result.notes


async def test_delivery_router_handles_telegram_delivery_exception_as_fail_result() -> None:
    telegram_client = FakeTelegramClient(error=TimeoutError("upstream timeout"))
    router = DeliveryRouter(telegram_client=telegram_client)

    result = await router.deliver(
        ActionDelivery(
            message="hello",
            tone="supportive",
            channel="telegram",
            language="en",
            chat_id=42,
        )
    )

    assert result.status == "fail"
    assert result.actions == ["send_telegram_message"]
    assert "TimeoutError" in result.notes
    assert "upstream timeout" in result.notes
