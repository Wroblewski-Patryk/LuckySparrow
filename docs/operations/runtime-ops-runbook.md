# Runtime Ops Runbook

## Scope

This runbook covers the currently implemented AION MVP service, not the full long-term architecture described in the numbered docs.

## Service Responsibilities

- accept incoming events through FastAPI
- normalize incoming payloads
- run the in-process orchestration pipeline
- persist short-term episode memory in PostgreSQL
- optionally send Telegram replies
- optionally generate replies with OpenAI

## Health And Readiness

- App health endpoint:
  - `GET /health`
- Docker compose stack includes health checks for Postgres and, in the Coolify variant, the app container.

## Required Environment Variables

- `DATABASE_URL`
- `APP_ENV`
- `APP_PORT`
- `LOG_LEVEL`

Production-only required in practice:

- `OPENAI_API_KEY`
- `TELEGRAM_BOT_TOKEN`

Recommended when Telegram webhooks are enabled:

- `TELEGRAM_WEBHOOK_SECRET`

## Common Operator Flows

### Start Local Stack

```powershell
docker compose up --build
```

### Run Health Check

```powershell
curl http://localhost:8000/health
```

### Send Manual Event

```powershell
curl -X POST http://localhost:8000/event `
  -H "Content-Type: application/json" `
  -d "{\"text\":\"hello AION\"}"
```

### Configure Telegram Webhook

Use the helper script or call:

`POST /telegram/set-webhook`

with a webhook URL and optional secret token.

## Known Operational Limits

- there is no background queue or worker isolation yet
- there is no migration framework in place yet
- startup table creation is convenient but not ideal for complex production schema changes
- runtime logging is present, but there is no external observability stack yet
- reflection and proactive systems are still architectural intent, not live ops surfaces

## Incident Triage Shortlist

If a request path fails:

1. check whether the app booted with valid env vars
2. verify Postgres health and connection string
3. confirm whether OpenAI fallback behavior is acceptable for the failing scenario
4. for Telegram issues, verify webhook secret, bot token, and `chat_id` presence
5. inspect structured logs for `event_id`, `trace_id`, and action status
