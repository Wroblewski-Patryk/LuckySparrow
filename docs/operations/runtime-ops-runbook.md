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

`GET /health` now includes a `runtime_policy` object with non-secret active
runtime flags (for example `startup_schema_mode`, `event_debug_enabled`, and
`event_debug_source`) plus strict-rollout readiness signals
(`production_policy_mismatches`, `production_policy_mismatch_count`,
`strict_startup_blocked`, and `strict_rollout_ready`) plus rollout guidance
signals (`recommended_production_policy_enforcement`, `strict_rollout_hint`),
so operators can verify active policy posture, detect strict-mode startup
risks, and assess strict-rollout readiness during incident triage and release
smoke.

On startup, production now emits an explicit warning when
`EVENT_DEBUG_ENABLED=true`. Treat this warning as a release-hardening signal:
disable debug payload exposure in production unless there is a short-lived,
intentional incident-debug window.

When production debug payload exposure is enabled without `EVENT_DEBUG_TOKEN`,
startup also emits a warning recommending token configuration for debug access
hardening.

On startup, production also emits an explicit warning when
`STARTUP_SCHEMA_MODE=create_tables`. Treat this as a temporary compatibility
path warning: production should normally run migration-first startup mode.

`PRODUCTION_POLICY_ENFORCEMENT` controls whether these production-policy
mismatches are warning-only (`warn`, default) or startup-blocking (`strict`).
Use `strict` when production hardening requires fail-fast policy enforcement.

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
- `EVENT_DEBUG_ENABLED` to control whether `POST /event?debug=true` can expose
  full internal runtime payloads (production default is disabled unless
  explicitly enabled)
- `EVENT_DEBUG_TOKEN` (optional) to require `X-AION-Debug-Token` for
  `POST /event?debug=true` access
- `PRODUCTION_POLICY_ENFORCEMENT` (`warn|strict`) to decide whether production
  policy mismatches remain warning-only or block startup

## Common Operator Flows

### Start Local Stack

```powershell
docker compose up --build
```

### Run Repeatable Manual Smoke

Windows PowerShell:

```powershell
.\scripts\run_release_smoke.ps1 -BaseUrl "http://localhost:8000"
```

Windows PowerShell with UTF-8 payload check:

```powershell
.\scripts\run_release_smoke.ps1 `
  -BaseUrl "http://localhost:8000" `
  -Text "zażółć gęślą jaźń"
```

Debian / bash:

```bash
./scripts/run_release_smoke.sh "http://localhost:8000"
```

Optional debug payload:

```powershell
.\scripts\run_release_smoke.ps1 -BaseUrl "http://localhost:8000" -IncludeDebug
```

Optional debug payload with token:

```powershell
curl -X POST "http://localhost:8000/event?debug=true" `
  -H "Content-Type: application/json" `
  -H "X-AION-Debug-Token: <token>" `
  -d "{\"text\":\"debug check\"}"
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

For multi-user API traffic, prefer sending `X-AION-User-Id` (or explicit
`meta.user_id` in payload) so profile and memory signals stay user-scoped
instead of defaulting to shared `anonymous` state.

Use the smoke helper when you want a repeatable operator check instead of crafting requests manually.

### Configure Telegram Webhook

Use the helper script or call:

`POST /telegram/set-webhook`

with a webhook URL and optional secret token.

## Known Operational Limits

- there is no background queue or worker isolation yet
- reflection is durable but still app-local, not isolated into a separate worker process yet
- startup now defaults to migration-first schema ownership; `create_tables()` remains only as a compatibility path behind `STARTUP_SCHEMA_MODE=create_tables`
- runtime logging is present, but there is no external observability stack yet
- proactive systems are still architectural intent, not live ops surfaces

## Incident Triage Shortlist

If a request path fails:

1. check whether the app booted with valid env vars
2. verify Postgres health and connection string
3. confirm whether OpenAI fallback behavior is acceptable for the failing scenario
4. for Telegram issues, verify webhook secret, bot token, and `chat_id` presence
5. inspect structured logs for `event_id`, `trace_id`, and action status
