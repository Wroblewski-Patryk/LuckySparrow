# Overview

## What This Project Is

Personality currently ships the first working AION runtime loop as a Python service built on FastAPI, PostgreSQL, and optional OpenAI and Telegram integrations.

## North Star

Turn incoming user events into a structured internal cycle:

`event -> perception -> context -> motivation -> planning -> action -> expression -> memory`

The current implementation is intentionally small, but it already preserves the event contract, persists memory, and supports API and Telegram entry points.

## Scope Levels

- MVP now:
  - `POST /event`
  - `GET /health`
  - `POST /telegram/set-webhook`
  - event normalization for API and Telegram payloads
  - lightweight multi-stage runtime orchestration
  - memory persistence in PostgreSQL
  - optional OpenAI-generated reply with fallback behavior
- Post-MVP:
  - richer role selection
  - reflection and background workers
  - stronger memory retrieval and ranking
  - more integrations and action types
- Out of scope for the current repo state:
  - a full agent society
  - autonomous long-running planning loops
  - a complete frontend or admin console

## Links

- Quick start: `basics/00_quickstart.md`
- Project overview: `basics/01_project_overview.md`
- Architecture narrative: `basics/02_architecture.md`
- Runtime flow: `basics/15_runtime_flow.md`
- Environment/config: `basics/26_env_and_config.md`
- Repo baseline assumptions: `assumptions/runtime-baseline-2026-04-15.md`
- Next implementation slice: `planning/next-iteration-plan.md`
