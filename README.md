# AION - MVP Iteration 1

This repository contains the first working implementation of the AION runtime loop.

Implemented scope:
- FastAPI API with `POST /event`
- Event normalization (`event_id`, `trace_id`, timestamp)
- Minimal runtime pipeline
- Telegram webhook compatibility
- PostgreSQL memory write and retrieval
- Dockerized app + database

## Quick Start

1. Copy env template:

```bash
cp .env.example .env
```

2. Fill required variables in `.env`:
- `OPENAI_API_KEY`
- `TELEGRAM_BOT_TOKEN`
- `DATABASE_URL`

3. Start with Docker:

```bash
docker compose up --build
```

4. Health check:

```bash
curl http://localhost:8000/health
```

5. Send test event:

```bash
curl -X POST http://localhost:8000/event ^
  -H "Content-Type: application/json" ^
  -d "{\"text\":\"hello AION\"}"
```

## API Endpoints

- `GET /health`
- `POST /event`
- `POST /telegram/set-webhook`

