# Local Windows + Debian 12 (Coolify) Deployment Guide

## Purpose

This guide prepares AION for:
- local development on Windows
- deployment on VPS Debian 12 with Coolify

No GitHub Actions or paid GitHub features are required.

---

## 1) Local Setup on Windows

### Prerequisites

- Python 3.11+
- Docker Desktop

### Setup

Run in project root:

```powershell
.\scripts\setup_windows.ps1
```

Then edit `.env`:

```env
APP_ENV=development
APP_PORT=8000
LOG_LEVEL=INFO

DATABASE_URL=postgresql+asyncpg://aion:aion@db:5432/aion

OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4o-mini

TELEGRAM_BOT_TOKEN=...
TELEGRAM_WEBHOOK_SECRET=your_random_secret
```

### Run tests

```powershell
.\.venv\Scripts\python -m pytest -q
```

### Run app + DB

```powershell
docker compose up --build
```

Health:

```powershell
Invoke-RestMethod http://localhost:8000/health
```

---

## 2) Test OpenAI + Telegram Locally

If `OPENAI_API_KEY` is set, response generation uses OpenAI Responses API.
If key is missing, the app falls back to echo response.

To test Telegram webhook locally, expose `http://localhost:8000` using a tunnel (for example `cloudflared` or `ngrok`) and call:

```powershell
.\scripts\set_telegram_webhook.ps1 -WebhookUrl "https://YOUR_PUBLIC_URL/event" -SecretToken "your_random_secret"
```

Then send a message to your bot in Telegram.

---

## 3) Deploy on Debian 12 with Coolify

### A) VPS prerequisites

- Debian 12 VPS
- Coolify installed
- domain/subdomain pointing to VPS

### B) Create application in Coolify

1. Create new resource from repository.
2. Use Compose file: `docker-compose.coolify.yml`.
3. Set environment variables in Coolify:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL` (optional, default `gpt-4o-mini`)
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_WEBHOOK_SECRET`
   - `DATABASE_URL` (optional if using bundled db service)
4. Expose application port `8000` through Coolify domain.
5. Deploy.

### C) Set production Telegram webhook

After deploy:

```bash
./scripts/set_telegram_webhook.sh "https://YOUR_DOMAIN/event" "https://YOUR_DOMAIN" "your_random_secret"
```

Or call endpoint directly:

```bash
curl -X POST "https://YOUR_DOMAIN/telegram/set-webhook" \
  -H "Content-Type: application/json" \
  -d '{"webhook_url":"https://YOUR_DOMAIN/event","secret_token":"your_random_secret"}'
```

---

## 4) Operational Notes

- In production, `OPENAI_API_KEY` and `TELEGRAM_BOT_TOKEN` are required.
- Telegram webhook requests are validated by `X-Telegram-Bot-Api-Secret-Token` when `TELEGRAM_WEBHOOK_SECRET` is set.
- No GitHub automation is required; deployment is handled by Coolify directly from the repo.

