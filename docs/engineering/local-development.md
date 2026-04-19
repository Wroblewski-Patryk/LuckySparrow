# Local Development

## Prerequisites

- Python 3.11+
- Docker Desktop or another local Docker environment
- PowerShell on Windows for the provided helper scripts

## Recommended Setup On Windows

1. Create the virtual environment and install dependencies:

```powershell
.\scripts\setup_windows.ps1
```

2. Fill required values in `.env`:

- `DATABASE_URL`
- `OPENAI_API_KEY` if OpenAI replies should be enabled
- `TELEGRAM_BOT_TOKEN` if Telegram delivery should be enabled
- `TELEGRAM_WEBHOOK_SECRET` for webhook protection
- `EVENT_DEBUG_ENABLED` (optional) to override debug payload exposure:
  - default in local/non-production is enabled
  - production default is disabled unless explicitly enabled
- `EVENT_DEBUG_TOKEN` (optional) to require `X-AION-Debug-Token` for
  `POST /event?debug=true`

3. Run tests:

```powershell
.\.venv\Scripts\python -m pytest -q
```

4. Start the local stack:

```powershell
docker compose up --build
```

## Database Migrations

The repo now has an Alembic baseline for the current schema.

Recommended local command:

```powershell
.\scripts\run_db_migrations.ps1
```

Equivalent direct command:

```powershell
.\.venv\Scripts\python -m alembic upgrade head
```

Important current behavior:

- startup defaults to migration-first schema ownership (`STARTUP_SCHEMA_MODE=migrate`)
- Alembic is the formal path for schema evolution
- compatibility bootstrap still exists behind `STARTUP_SCHEMA_MODE=create_tables` and should only be used for controlled fallback scenarios

## Useful Commands

Run app locally with Docker:

```powershell
docker compose up --build
```

Run tests inside the virtual environment:

```powershell
.\.venv\Scripts\python -m pytest -q
```

Generate a Telegram webhook secret and optionally update `.env`:

```powershell
.\scripts\generate_telegram_webhook_secret.ps1 -UpdateEnv
```

Set the Telegram webhook:

```powershell
.\scripts\set_telegram_webhook.ps1 -WebhookUrl https://your-host.example/event
```

## Local Verification

- Health check:

```powershell
curl http://localhost:8000/health
```

- Sample event:

```powershell
curl -X POST http://localhost:8000/event `
  -H "Content-Type: application/json" `
  -d "{\"text\":\"hello AION\"}"
```

- Sample event with explicit API user identity (recommended for multi-user API
  usage):

```powershell
curl -X POST http://localhost:8000/event `
  -H "Content-Type: application/json" `
  -H "X-AION-User-Id: demo-user-42" `
  -d "{\"text\":\"hello AION\"}"
```

- Sample debug event with token (when `EVENT_DEBUG_TOKEN` is configured):

```powershell
curl -X POST "http://localhost:8000/event?debug=true" `
  -H "Content-Type: application/json" `
  -H "X-AION-Debug-Token: your-debug-token" `
  -d "{\"text\":\"debug hello\"}"
```

## Troubleshooting

- If startup fails immediately, check missing environment variables first.
- If OpenAI replies fall back to echo behavior, verify `OPENAI_API_KEY`.
- If Telegram delivery fails, confirm `chat_id` is present in the normalized event and that the bot token is valid.
- If database access fails, verify `DATABASE_URL` and whether the Postgres container is healthy.
