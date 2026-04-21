from app.core.action_delivery import summarize_action_delivery_envelope
from app.core.contracts import ActionDelivery, ActionResult
from app.integrations.telegram.client import TelegramClient


class DeliveryRouter:
    def __init__(self, telegram_client: TelegramClient):
        self.telegram_client = telegram_client

    async def deliver(self, delivery: ActionDelivery) -> ActionResult:
        envelope_note = summarize_action_delivery_envelope(delivery.execution_envelope)
        if delivery.channel == "api":
            return ActionResult(
                status="success",
                actions=["api_response"],
                notes=self._with_envelope_note("Response returned via API.", envelope_note),
            )

        if delivery.channel == "telegram":
            return await self._deliver_telegram(delivery, envelope_note=envelope_note)

        return ActionResult(
            status="fail",
            actions=[],
            notes=f"Unsupported delivery channel: {delivery.channel}",
        )

    async def _deliver_telegram(self, delivery: ActionDelivery, *, envelope_note: str) -> ActionResult:
        if delivery.chat_id is None:
            return ActionResult(
                status="fail",
                actions=[],
                notes=self._with_envelope_note(
                    "Telegram response requested but chat_id is missing.",
                    envelope_note,
                ),
            )

        try:
            telegram_result = await self.telegram_client.send_message(
                chat_id=delivery.chat_id,
                text=delivery.message,
            )
        except Exception as exc:
            return ActionResult(
                status="fail",
                actions=["send_telegram_message"],
                notes=self._with_envelope_note(
                    f"Telegram delivery exception: {type(exc).__name__}: {exc}",
                    envelope_note,
                ),
            )
        if telegram_result.get("ok"):
            return ActionResult(
                status="success",
                actions=["send_telegram_message"],
                notes=self._with_envelope_note("Telegram message sent.", envelope_note),
            )
        return ActionResult(
            status="fail",
            actions=["send_telegram_message"],
            notes=self._with_envelope_note(f"Telegram API error: {telegram_result}", envelope_note),
        )

    def _with_envelope_note(self, base: str, envelope_note: str) -> str:
        if not envelope_note:
            return base
        return f"{base} Execution envelope: {envelope_note}."
