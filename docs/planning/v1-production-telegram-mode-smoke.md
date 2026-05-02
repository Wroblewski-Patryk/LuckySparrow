# V1 Production Telegram Mode Smoke

Last updated: 2026-05-03

## Status

`PRJ-909` is BLOCKED by missing operator preconditions in the current local
session.

Production health is green for Telegram readiness, but the live launch-channel
smoke has not been run.

## Current Production Evidence

Checked on 2026-05-03 against `https://aviary.luckysparrow.ch/health`:

- `status=ok`
- `release_readiness.ready=true`
- `conversation_channels.telegram.policy_owner=telegram_conversation_reliability_telemetry`
- `conversation_channels.telegram.bot_token_configured=true`
- `conversation_channels.telegram.webhook_secret_configured=true`
- `conversation_channels.telegram.round_trip_state=provider_backed_ready`
- `conversation_channels.telegram.delivery_segmentation_state=bounded_transport_segmentation`
- `conversation_channels.telegram.delivery_formatting_state=supported_markdown_to_html_with_plain_text_fallback`
- `conversation_channels.telegram.delivery_failures=0`

This proves production configuration and health posture. It does not prove a
fresh real-user Telegram round trip.

## Blocker

The local operator session does not have:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_WEBHOOK_SECRET`
- `REQUIRED_CHAT_ID`

The existing smoke helper temporarily switches the bot from webhook mode to
listen mode:

`deleteWebhook -> getUpdates -> setWebhook`

Without a bot token, webhook secret, restorable webhook URL, and known chat id,
running that helper would create provider-side risk without satisfying the
launch-channel acceptance condition.

## Required Operator Preconditions

Before rerunning this task:

1. The target user must send `/start` to the production bot.
2. The operator must know the target Telegram `chat_id`.
3. The local shell must have `TELEGRAM_BOT_TOKEN` set without printing it.
4. The local shell must have `TELEGRAM_WEBHOOK_SECRET` set without printing it.
5. The restore URL must be:
   `https://aviary.luckysparrow.ch/event`

## Safe Rerun Command

From the repository root:

```powershell
$env:REQUIRED_CHAT_ID = "<known_chat_id>"
.\backend\scripts\run_telegram_mode_smoke.ps1 `
  -ExpectedWebhookUrl "https://aviary.luckysparrow.ch/event" `
  -RestoreWebhookUrl "https://aviary.luckysparrow.ch/event" `
  -SecretToken $env:TELEGRAM_WEBHOOK_SECRET `
  -RequiredChatId $env:REQUIRED_CHAT_ID
```

The script reads `TELEGRAM_BOT_TOKEN` from the environment if `-BotToken` is not
passed.

## Acceptance Criteria For Unblocking

`PRJ-909` can move from BLOCKED to DONE only when:

- `getWebhookInfo` returns the expected production webhook URL before the
  listen probe
- `getUpdates` sees the required known `chat_id`
- `setWebhook` restores `https://aviary.luckysparrow.ch/event`
- a follow-up production `/health` check is still `status=ok`
- no bot token, webhook secret, or private message payload is committed

## Release Impact

- Core no-UI v1 remains GO through API/runtime evidence.
- Telegram-led launch remains HOLD until this smoke passes or Telegram is
  explicitly waived as the primary launch channel.
- The next locally actionable hardening task is `PRJ-931` unless the operator
  provides the Telegram preconditions.
