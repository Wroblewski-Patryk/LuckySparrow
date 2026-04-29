# Task

## Header
- ID: PRJ-783
- Title: Implement communication-boundary backfill and health contract
- Task Type: implementation
- Current Stage: release
- Status: DONE
- Owner: Codex
- Depends on: PRJ-778
- Priority: P1

## Context
`PRJ-778` implemented the forward runtime model for communication-boundary
relations. New user-authored directives now flow through planning, relation
storage, reflection, proactive policy, and expression.

One architecture gap remains: production may already contain historical
episodic instructions from before that model existed. Those instructions should
not require the user to repeat themselves before proactive delivery starts
respecting the boundary.

## Goal
Close the historical-continuity gap by adding a bounded ops backfill that
promotes existing user-authored episodic communication-boundary instructions
into the same relation-owned truth used by the live runtime.

## Scope
- Add repository-owned communication-boundary relation backfill.
- Add one explicit ops script entrypoint.
- Expose communication-boundary policy ownership in `/health.proactive`.
- Update operations docs and context.
- Add focused tests.

## Implementation Plan
1. Scan recent user-authored API/Telegram episodes.
2. Extract communication-boundary signals with the existing bounded model.
3. Write relation updates only through `MemoryRepository.upsert_relation`.
4. Support `--dry-run`, `--limit`, and optional `--user-id`.
5. Expose the boundary contract in proactive health policy.
6. Validate with focused and full backend tests.

## Acceptance Criteria
- Historical episodic instructions can be promoted without a new memory store.
- Backfill is dry-run capable and bounded by limit/user.
- `/health.proactive` identifies the policy owner, relation types, consumers,
  and backfill entrypoint.
- Existing proactive/expression behavior remains unchanged except for improved
  relation availability.

## Definition of Done
- Focused tests pass.
- Full backend gate passes before commit.
- Docs/context updated.
- No schema migration required.
- No side effects outside explicit ops script execution.

## Forbidden
- No direct DB mutation outside repository methods.
- No new durable memory subsystem.
- No unbounded production scan.
- No scheduler auto-backfill on every tick.

## Result Report
- Task summary:
  - Added a bounded historical communication-boundary backfill so existing
    user-authored episodic instructions can be promoted into the same relation
    truth used by live runtime.
  - Added `/health.proactive.communication_boundary_contract` so operators can
    verify relation families, policy owner, consumers, and the backfill
    entrypoint.
  - Documented production dry-run and write-run commands in the ops runbook.
- Files changed:
  - `backend/app/memory/repository.py`
  - `backend/scripts/run_communication_boundary_backfill_once.py`
  - `backend/app/core/proactive_policy.py`
  - `backend/tests/test_memory_repository.py`
  - `backend/tests/test_api_routes.py`
  - `docs/operations/runtime-ops-runbook.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_communication_boundary.py tests/test_memory_repository.py tests/test_api_routes.py -q; Pop-Location`
  - Result: passed after rerunning one timing-sensitive duplicate-update test.
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; Pop-Location`
  - Result: `971 passed in 100.49s`.
- What is incomplete:
  - Production backfill still needs to be executed after deploy.
- Next steps:
  - Commit, push, deploy, then run the production backfill dry-run and write-run.
