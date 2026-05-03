# Task

## Header
- ID: PRJ-965
- Title: Add OpenAPI-to-web type sync plan or generator
- Task Type: feature
- Current Stage: verification
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-956
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 965
- Operation Mode: TESTER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

Generated OpenAPI exists in `docs/api/openapi.json`, and the web client has a
manual TypeScript API wrapper in `web/src/lib/api.ts`. Before a larger type
generator or `App.tsx` split, the repo needs a cheap drift guard that proves the
web client does not call routes missing from OpenAPI.

## Goal

Add a reusable OpenAPI-to-web sync checker and document how to run it.

## Scope

- `backend/scripts/check_web_api_openapi_sync.py`
- `backend/tests/test_web_api_openapi_sync_script.py`
- `docs/api/index.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Implementation Plan

1. Parse `requestJson(...)` endpoint/method calls from `web/src/lib/api.ts`.
2. Load generated OpenAPI operations from `docs/api/openapi.json`.
3. Fail when the web client references a route/method pair missing from
   OpenAPI.
4. Add focused tests for extraction, pass, and drift cases.
5. Document the checker and residual limitation.

## Acceptance Criteria

- [x] The checker reports `ok` for the current web client/OpenAPI pair.
- [x] Missing endpoint/method pairs produce `drift`.
- [x] Focused tests cover extraction and drift behavior.
- [x] API docs describe the command and limitation.

## Definition of Done
- [x] `DEFINITION_OF_DONE.md` satisfied for this drift-check slice.
- [x] Focused tests pass.
- [x] Real repo checker run passes.
- [x] Docs and context are synchronized.

## Validation Evidence
- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_web_api_openapi_sync_script.py; Pop-Location`
  - result: `3 passed`
- Manual checks:
  - `Push-Location .\backend; ..\.venv\Scripts\python .\scripts\check_web_api_openapi_sync.py --openapi ..\docs\api\openapi.json --web-api ..\web\src\lib\api.ts --print-json; Pop-Location`
  - result: `status=ok`, `missing_operations=[]`, `web_call_count=13`,
    `openapi_operation_count=18`
- Screenshots/logs: not applicable
- High-risk checks: API/web route drift
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/api/index.md`
  - `docs/api/openapi.json`
  - `web/src/lib/api.ts`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates:
  - `docs/api/index.md`

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: remove the checker/test/docs if replaced by a full generator
- Observability or alerting impact: none
- Staged rollout or feature flag: not applicable

## Review Checklist
- [x] Process self-audit completed before implementation.
- [x] Autonomous loop evidence covers all seven steps.
- [x] Exactly one priority task was completed in this iteration.
- [x] Operation mode was selected according to iteration rotation.
- [x] Current stage is declared and respected.
- [x] Deliverable for the current stage is complete.
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated if repository truth changed.
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Result Report

- Task summary: added an OpenAPI/web API route-method drift checker.
- Files changed:
  - `backend/scripts/check_web_api_openapi_sync.py`
  - `backend/tests/test_web_api_openapi_sync_script.py`
  - `docs/api/index.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested: focused pytest and real checker command.
- What is incomplete: full TypeScript response type generation remains future
  work.
- Next steps: `PRJ-966` stable frontend route e2e smoke.
- Decisions made: choose a route/method drift guard first because it is smaller
  and safer than introducing a generator into the current monolithic web client.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: web client endpoint calls were manually maintained.
- Gaps: no command checked web API route/method drift against OpenAPI.
- Inconsistencies: none found in current web/OpenAPI pair.
- Architecture constraints: generated OpenAPI remains backend-owned.

### 2. Select One Priority Task
- Selected task: `PRJ-965`
- Priority rationale: next READY P2 after provider examples.
- Why other candidates were deferred: frontend e2e smoke should build on a
  stable API drift guard.

### 3. Plan Implementation
- Files or surfaces to modify: script, tests, API docs, context.
- Logic: regex extraction of web `requestJson` calls plus OpenAPI path/method
  comparison.
- Edge cases: multiline typed `requestJson<T>(...)` calls and duplicate calls.

### 4. Execute Implementation
- Implementation notes: added checker and focused tests.

### 5. Verify and Test
- Validation performed: pytest and real repo checker run.
- Result: passed.

### 6. Self-Review
- Simpler option considered: documentation-only plan.
- Technical debt introduced: no
- Scalability assessment: checker can be extended to response schema/type drift.
- Refinements made: documented limitation clearly.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/api/index.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable
