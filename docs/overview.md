# Overview

## What This Project Is

Personality is a backend-first AION runtime implemented as a FastAPI service with PostgreSQL-backed state, an optional OpenAI reply layer, and Telegram integration.

The repo already ships a real multi-stage runtime, not just a skeleton:

- `POST /event`
- `GET /health`
- `POST /telegram/set-webhook`
- event normalization for API and Telegram payloads
- conscious-loop orchestration with structured stage outputs
- episodic memory persistence plus lightweight semantic conclusions
- durable in-app reflection queue with health visibility
- lightweight goal, task, and milestone state in the runtime result

## Current Runtime Shape

The implemented foreground path is:

`event -> state load -> identity -> perception -> context -> motivation -> role -> planning -> expression -> action -> memory -> reflection enqueue`

Important current-runtime notes:

- identity, profile, conclusions, theta, goals, tasks, milestones, and recent histories are loaded before deeper reasoning
- role selection is dynamic and can use heuristics, reflected preferences, and theta bias
- language is chosen per event and can fall back to recent memory or profile state for ambiguous turns
- reflection is real: it runs through a durable Postgres-backed queue and updates conclusions, theta, and lightweight goal-manager signals in the background
- `POST /event` currently returns a verbose internal `RuntimeResult`, including stage timings and runtime state snapshots

## Current vs Planned

What is already live:

- dynamic language-aware replies
- lightweight identity snapshot
- heuristic but state-aware role selection
- semantic preference memory
- durable reflection with retry and health observability
- lightweight goal, task, progress, and milestone management

What is still planned or intentionally deferred:

- formal database migrations
- a smaller public API contract for `/event`
- vector retrieval / embeddings
- LangGraph or other external orchestration
- a separate reflection worker process
- proactive loops, richer relation systems, and fuller autonomous behavior

## Documentation Intent

Use the docs in layers:

- `docs/overview.md` for the short repo-truth snapshot
- `docs/assumptions/` for current implementation notes and known gaps
- `docs/basics/` for the longer architecture narrative
- `docs/planning/` for the next concrete decisions and slices

When the current implementation and the intended architecture differ, the difference should be made explicit rather than hidden.

## Links

- Quick start: `basics/00_quickstart.md`
- Architecture narrative: `basics/02_architecture.md`
- Runtime flow: `basics/15_runtime_flow.md`
- Agent contracts: `basics/16_agent_contracts.md`
- Memory system: `basics/04_memory_system.md`
- Goal and task system: `basics/21_goal_task_system.md`
- Environment/config: `basics/26_env_and_config.md`
- Repo baseline assumptions: `assumptions/runtime-baseline-2026-04-15.md`
- Open decisions: `planning/open-decisions.md`
- Next implementation slices: `planning/next-iteration-plan.md`
