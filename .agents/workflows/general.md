---
description: Workspace rules for Personality / AION
---

# General Workspace Rules

## Stack Snapshot

- Backend: Python 3.11, FastAPI, Pydantic v2, SQLAlchemy async, asyncpg
- Frontend: none in current repository scope
- Mobile: none in current repository scope
- Database: PostgreSQL
- Hosting target: Docker Compose locally, Coolify-targeted deployment flow
- Deployment shape: API-first runtime with app-local reflection worker behavior
- Runtime constraints:
  - event-driven pipeline
  - structured contracts between stages
  - no side effects outside action or integrations
  - reflection currently runs as an app-local durable worker concern

## Architecture Rules

- Keep the runtime aligned with `docs/architecture/02_architecture.md` and
  `docs/architecture/15_runtime_flow.md`.
- Preserve explicit contracts between perception, context, motivation, role,
  planning, action, expression, memory, and reflection.
- Keep heuristics deterministic unless a task explicitly introduces a new
  adaptive behavior.
- Prefer existing modules over inventing new layers for one-off logic.
- Do not remove potentially shared runtime helpers without checking all stage
  consumers first.

## Repository And Docs Rules

- Keep root minimal and intentional.
- Put project documentation under `docs/`.
- Update planning, architecture, or operations docs when behavior or structure
  changes.
- Keep links repository-relative and avoid sibling-repository references.

## Deployment Rules

- Treat Docker Compose and the runtime ops runbook as the current deploy
  contract.
- Keep env ownership, health checks, database assumptions, and Telegram wiring
  explicit.
- When runtime behavior changes, review deploy docs, smoke checks, and rollback
  notes in the same task.
- Record the real deployment artifacts and paths in
  `.codex/context/PROJECT_STATE.md`.

## Delivery Rules

- Keep changes scoped and reversible.
- Require acceptance evidence before completion.
- Keep planning docs and task board synchronized.
- Follow the default loop:
  `plan -> implement -> test -> architecture review -> sync context -> repeat`.
- Apply the validation commands from `.codex/context/PROJECT_STATE.md` before
  every commit.
- Use subagents only according to `.agents/workflows/subagent-orchestration.md`.
