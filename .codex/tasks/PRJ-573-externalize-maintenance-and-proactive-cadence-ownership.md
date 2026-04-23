# Task

## Header
- ID: PRJ-573
- Title: Externalize maintenance and proactive cadence ownership
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-572
- Priority: P0

## Context
Production `/health.scheduler.external_owner_policy` still reports
`selected_execution_mode=in_process`, which keeps maintenance and proactive
cadence ownership inside the app process even though the repo already exposes
canonical external entrypoints and cutover-proof posture for both cadence
families.

## Goal
Switch the repository-driven Coolify production baseline to
`SCHEDULER_EXECUTION_MODE=externalized`, add dedicated external cadence
services that invoke the canonical maintenance and proactive entrypoints, and
verify that production `/health.scheduler.external_owner_policy` reports the
externalized baseline without regressing Telegram foreground handling.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] Coolify production compose defaults `SCHEDULER_EXECUTION_MODE` to
      `externalized`.
- [x] repository-driven Coolify production includes dedicated cadence services
      that run the canonical `run_maintenance_tick_once.py` and
      `run_proactive_tick_once.py` entrypoints.
- [x] production `/health.scheduler.external_owner_policy` reports
      `selected_execution_mode=externalized`.
- [x] production reflection supervision no longer reports
      `external_scheduler_owner_not_selected`.
- [x] Telegram/API foreground turn handling remains healthy after deploy.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `.\.venv\Scripts\python -m pytest -q tests/test_coolify_compose.py tests/test_scheduler_worker.py tests/test_api_routes.py` -> `102 passed`
  - `docker compose -f docker-compose.coolify.yml config` -> OK
  - `.\scripts\run_release_smoke.ps1 -BaseUrl 'https://personality.luckysparrow.ch'` -> passed
- Manual checks:
  - Coolify deploy `wjcj54cm9boemh851cy8o8if` on commit `8a839f2` switched production
    to `SCHEDULER_EXECUTION_MODE=externalized`
  - Coolify deploy `rbcv9u835f1d72w8z4pw0trc` on commit `31cf351` added the shared
    cadence-evidence table in production
  - Coolify deploy `m8jd7i3sqiv8f8fuvlo367ki` on commit `2a4a573` added short
    failure-backoff retries for cadence sidecars after migration-race failures
  - production `/health.scheduler.external_owner_policy.selected_execution_mode=externalized`
  - production `/health.scheduler.external_owner_policy.cutover_proof_ready=true`
  - production `/health.reflection.supervision.blocking_signals=[]`
  - production `/health.conversation_channels.telegram.round_trip_ready=true`
- Screenshots/logs:
  - production `/health.scheduler.external_owner_policy.maintenance_run_evidence.last_run_at`
    is now populated from the shared cadence-evidence store
  - production `/health.scheduler.external_owner_policy.proactive_run_evidence.last_run_at`
    is now populated and reports `recent_external_run_non_success` while proactive
    remains disabled by policy
- High-risk checks:
  - external cadence sidecars now retry quickly after pre-migration failures
    instead of sleeping for the full cadence interval

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/16_agent_contracts.md`
  - `docs/operations/runtime-ops-runbook.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates:
  - update deployment/runbook truth for external cadence ownership baseline

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
This slice intentionally externalizes cadence ownership only. Broader doc sync
for post-v1 production hardening remains in `PRJ-574`.
