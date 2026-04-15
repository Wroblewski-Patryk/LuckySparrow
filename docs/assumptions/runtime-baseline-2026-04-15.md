# Runtime Baseline Assumptions - 2026-04-15

## Audit Intent

This note records the current implementation baseline derived from the repository on 2026-04-15. It is meant to support later updates to the higher-level docs without losing what the code actually does today.

## Repo Facts Confirmed From Code

- The application entrypoint is `app.main:app`, served by FastAPI.
- Startup validates configuration, initializes logging, creates database tables, and wires dependencies into a `RuntimeOrchestrator`.
- The runtime path is linear and in-process:
  - perception
  - context
  - motivation
  - fixed role selection
  - planning
  - expression
  - action
  - memory persistence
- Current external entry points are:
  - `GET /health`
  - `POST /event`
  - `POST /telegram/set-webhook`
- Event normalization supports plain API payloads and Telegram webhook payloads.
- Memory persistence uses SQLAlchemy async sessions and currently stores short episode summaries.
- Telegram output is the only side-effecting action integration currently implemented.
- OpenAI is optional. If no API key is configured, expression falls back to a simple echo-style reply.

## Current Behavioral Assumptions

- Role selection is not dynamic yet. The runtime currently hardcodes `advisor` with confidence `0.6`.
- Perception, context, motivation, and planning are deterministic heuristic steps, not model-driven agent modules.
- A reply is only sent when the incoming event contains text and motivation mode is not `ignore`.
- Telegram webhook secret validation is enforced only when the payload looks like Telegram and a secret is configured.
- Database table creation currently happens automatically on app startup rather than through migrations.
- The response returned from `POST /event` is the full serialized `RuntimeResult`, not a minimal public DTO.

## Gaps Between Narrative Docs And Current Repo

- Several docs in `docs/basics/` describe broader systems such as reflection, proactive behavior, relation systems, theta dynamics, and subconscious processing.
- The current codebase does not yet implement those systems as concrete runtime modules.
- `RuntimeResult.reflection_triggered` is currently always `True`, which reads like a placeholder rather than a measured runtime fact.
- `app/workers/` and `app/identity/` exist structurally, but the first iteration implementation is still concentrated in API, core runtime, memory, expression, and integrations.

## Recommended Promotion Targets

If these assumptions stay true after future work, the most likely canonical docs to update are:

- `docs/basics/01_project_overview.md`
- `docs/basics/02_architecture.md`
- `docs/basics/13_repository_structure.md`
- `docs/basics/15_runtime_flow.md`
- `docs/basics/26_env_and_config.md`
- `docs/basics/28_local_windows_and_coolify_deploy.md`
