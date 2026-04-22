# Task

## Header
- ID: PRJ-568
- Title: Repair durable attention wiring for production Telegram ingress
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-567
- Priority: P0

## Context
Production Telegram replies stopped after the no-UI `v1` queue closed. The repo
already supports `ATTENTION_COORDINATION_MODE=durable_inbox`, but startup wiring
must keep the attention coordinator connected to the repository-backed contract
store so Telegram ingress can assemble and finalize turns in production.

## Goal
Restore production-safe Telegram reply handling when durable attention inbox mode
is enabled, without regressing in-process attention behavior or other delivery
paths.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [ ] app startup wires the durable attention coordinator to the shared memory repository
- [ ] regression coverage pins the durable-inbox startup wiring path
- [ ] task board and project state record the production hotfix slice and validation evidence

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `.\.venv\Scripts\python -m pytest -q tests/test_main_lifespan_policy.py tests/test_api_routes.py`
- Manual checks:
  - pending production redeploy plus `/health.conversation_channels.telegram`
    and `/health.attention` verification on Coolify
- Screenshots/logs:
- High-risk checks:

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/15_runtime_flow.md`
  - `docs/architecture/16_agent_contracts.md`
  - `docs/operations/runtime-ops-runbook.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates:

## Review Checklist (mandatory)
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated if repository truth changed.
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
- Production symptom: Telegram accepted user messages, but no reply was observed.
- Strong candidate root cause: `AttentionTurnCoordinator` created in `app.main`
  without `memory_repository`, which disables repository-backed durable inbox
  behavior even when production selects `ATTENTION_COORDINATION_MODE=durable_inbox`.
- Result:
  - `app.main` now wires `memory_repository` into the shared attention
    coordinator during lifespan startup
  - a lifespan-level regression now pins that `durable_inbox` startup wiring
    uses the same repository-backed contract store dependency as route-level
    tests
