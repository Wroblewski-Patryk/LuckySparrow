# Task

## Header
- ID: PRJ-572
- Title: Externalize production reflection queue ownership
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-571
- Priority: P0

## Context
Live production `/health.reflection.external_driver_policy` still reports
`selected_runtime_mode=in_process`, so the app process continues to own
reflection queue drain even though the repo already has a deferred external
driver contract and canonical drain entrypoint.

## Goal
Switch the production Coolify baseline to `REFLECTION_RUNTIME_MODE=deferred`,
deploy it, and verify that production no longer starts the app-local reflection
worker while Telegram/API foreground turn handling remains healthy.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] Coolify production compose defaults `REFLECTION_RUNTIME_MODE` to `deferred`.
- [x] production `/health.reflection.external_driver_policy.selected_runtime_mode`
  reports `deferred`.
- [x] Telegram/API foreground turn handling remains healthy after deploy.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `.\.venv\Scripts\python -m pytest -q tests/test_coolify_compose.py tests/test_api_routes.py tests/test_main_lifespan_policy.py`
- Manual checks:
  - forced Coolify deploy `nlcp1kpmxxhvq094fssz7qfk` finished on commit `13d8972`
  - `GET https://personality.luckysparrow.ch/health` returned `200`
  - `/health.reflection.external_driver_policy.selected_runtime_mode` reported `deferred`
  - `/health.conversation_channels.telegram.round_trip_ready` remained `true`
- Screenshots/logs:
  - Coolify app logs recorded `reflection_runtime mode=deferred action=defer_background_worker`
  - production `/health.reflection.external_driver_policy` reported `production_baseline_ready=true`
- High-risk checks:
  - reflection supervision still reports scheduler ownership as transitional; left intentionally for `PRJ-573`

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/16_agent_contracts.md`
  - `docs/operations/runtime-ops-runbook.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates:
  - update deployment/runbook truth for current production reflection mode

## Review Checklist (mandatory)
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated if repository truth changed.
- [ ] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
This slice intentionally changes only reflection runtime ownership. Scheduler
cadence ownership remains for `PRJ-573`.
