# Runtime Script Entrypoint And Ops Consistency

## Header
- ID: PRJ-794
- Title: Runtime Script Entrypoint And Ops Consistency
- Task Type: fix
- Current Stage: verification
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-785
- Priority: P2

## Context

`PRJ-785` identified script entrypoint consistency as a backend ops hardening
lane. Direct script execution should work from the documented backend working
directory.

## Goal

Ensure documented backend operator scripts expose help successfully when run as
direct Python files from `backend/`.

## Scope

- `backend/scripts/export_incident_evidence_bundle.py`
- `backend/scripts/run_maintenance_tick_once.py`
- `backend/scripts/run_proactive_tick_once.py`
- `backend/scripts/run_reflection_queue_once.py`
- `backend/scripts/trigger_coolify_deploy_webhook.py`
- `backend/tests/test_deployment_trigger_scripts.py`

## Implementation Plan

1. Add explicit backend-root path bootstrap to scripts that import `app.*`.
2. Add a regression test that runs `python scripts/<name>.py --help` from
   `backend/`.
3. Keep runtime execution semantics unchanged.

## Acceptance Criteria

- Every listed script returns help with exit code `0`.
- No script connects to production or mutates state during `--help`.
- Existing deployment trigger tests keep passing.

## Definition of Done

- [x] Code builds without errors.
- [x] Operator script help paths are tested.
- [x] No temporary bypass was introduced.
- [x] Validation evidence is recorded.

## Validation Evidence

- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_deployment_trigger_scripts.py -k "backend_operator_scripts_expose_help"; Pop-Location`
    - result: `8 passed, 42 deselected`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; Pop-Location`
    - result: `980 passed in 105.96s`
- Manual checks:
  - not applicable
- Screenshots/logs:
  - not applicable
- High-risk checks:
  - test only invokes `--help`, so no production side effects occur

## Architecture Evidence

- Architecture source reviewed:
  - `docs/operations/runtime-ops-runbook.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: not required

## Deployment / Ops Evidence

- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: not required
- Rollback note:
  - revert script bootstrap additions if direct execution regresses

## Result Report

- Task summary:
  - hardened direct operator script help entrypoints
- Files changed:
  - listed script files
  - `backend/tests/test_deployment_trigger_scripts.py`
- How tested:
  - targeted deployment script regression
- What is incomplete:
  - production backfill execution still requires production shell/database
    access
- Next steps:
  - run `PRJ-786` in Coolify shell
- Decisions made:
  - use local script-level backend-root bootstrap to preserve direct execution
