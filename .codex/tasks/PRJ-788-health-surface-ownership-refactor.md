# Health Surface Ownership Refactor

## Header
- ID: PRJ-788
- Title: Health Surface Ownership Refactor
- Task Type: refactor
- Current Stage: verification
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-785
- Priority: P1

## Context

`backend/app/api/routes.py` is one of the largest backend files. The first safe
health refactor should preserve the `/health` contract while moving response
assembly into a dedicated owner.

## Goal

Reduce API route health-response ownership risk without changing the public
health payload shape.

## Scope

- `backend/app/api/routes.py`
- `backend/app/api/health_response.py`
- `backend/tests/test_api_routes.py`

## Implementation Plan

1. Add a typed health response section container.
2. Move final `/health` payload assembly into `build_health_response`.
3. Keep all runtime snapshot collection in the existing route for this first
   behavior-neutral slice.

## Acceptance Criteria

- `/health` returns the same top-level contract.
- Health route tests pass.
- No runtime policy, scheduler, reflection, or memory-retrieval behavior
  changes.

## Definition of Done

- [x] Code builds without errors.
- [x] Existing health API tests pass.
- [x] No workaround or duplicate health contract was introduced.
- [x] Validation evidence is recorded.

## Validation Evidence

- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py -k "health"; Pop-Location`
    - result: `51 passed, 66 deselected`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; Pop-Location`
    - result: `980 passed in 105.96s`
- Manual checks:
  - production `/health` was checked during `PRJ-785`
- Screenshots/logs:
  - not applicable
- High-risk checks:
  - health payload assembly only; no policy inputs changed

## Architecture Evidence

- Architecture source reviewed:
  - `docs/architecture/17_logging_and_debugging.md`
  - `docs/architecture/16_agent_contracts.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: not required

## Result Report

- Task summary:
  - extracted `/health` response assembly into `backend/app/api/health_response.py`
- Files changed:
  - `backend/app/api/health_response.py`
  - `backend/app/api/routes.py`
- How tested:
  - health route regression slice
- What is incomplete:
  - deeper snapshot-composition extraction remains future work
- Next steps:
  - continue reducing `routes.py` in later small slices
- Decisions made:
  - first slice is deliberately behavior-neutral
