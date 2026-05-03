# Task

## Header
- ID: PRJ-960
- Title: Add provider payload sentinel regressions
- Task Type: feature
- Current Stage: verification
- Status: DONE
- Owner: QA/Test
- Depends on: PRJ-933
- Priority: P1
- Coverage Ledger Rows: not applicable
- Iteration: 960
- Operation Mode: TESTER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

`PRJ-933` fixed the confirmed pending-proposal projection leak candidate and
left explicit follow-up coverage for synthetic provider payload sentinels.

## Goal

Add executable regressions proving user-facing backend projections and frontend
API contracts do not expose raw provider payload bodies.

## Scope

- `backend/tests/test_api_routes.py`
- `web/src/lib/api.ts`
- `docs/security/v1-provider-payload-leakage-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Implementation Plan

1. Seed synthetic ClickUp, Google Calendar, Google Drive, and Telegram raw
   payload sentinels into memory/proposal payloads.
2. Assert `/app/personality/overview`, `/app/tools/overview`, and `/health` do
   not serialize those sentinel values.
3. Assert pending proposal projections retain only `payload_present` and sorted
   `payload_keys`.
4. Type the frontend personality overview response so pending proposals expose
   the sanitized metadata contract, not raw `payload`.
5. Update docs and context.

## Acceptance Criteria

- [x] Synthetic provider payload sentinel strings do not appear in public
  projection responses.
- [x] Pending proposal projection still exposes `payload_present` and
  `payload_keys`.
- [x] Frontend API types encode the sanitized pending proposal shape.
- [x] Backend focused tests and frontend build pass.

## Definition of Done
- [x] `DEFINITION_OF_DONE.md` satisfied for this regression slice.
- [x] Tests/build pass.
- [x] Planning/security docs and context are synchronized.

## Validation Evidence
- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py -k "provider_payload_sentinels or personality_overview or tools_overview"; Pop-Location`
  - result: `6 passed, 117 deselected`
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
- Manual checks: not applicable
- Screenshots/logs: not applicable
- High-risk checks: raw provider payload leakage through app projections
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/security/v1-provider-payload-leakage-audit.md`
  - `docs/architecture/16_agent_contracts.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: remove the added test/type/docs if superseded by a generated
  API type system
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

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: yes
- Data classification: synthetic provider payload sentinel strings
- Trust boundaries: stored internal provider payloads versus app-facing
  projections
- Permission or ownership checks: authenticated app overview and tools routes
  remain auth-gated
- Abuse cases: raw provider response body rendered through overview/tools/health
- Secret handling: no real secrets used
- Security tests or scans: focused route sentinel regression
- Fail-closed behavior: sentinel presence would fail the regression
- Residual risk: strict-mode incident bundle sentinel coverage is separate
  `PRJ-961`; live provider credential smoke remains blocked externally

## Result Report

- Task summary: added synthetic provider payload sentinel regressions and typed
  frontend pending proposal snapshots as sanitized metadata.
- Files changed:
  - `backend/tests/test_api_routes.py`
  - `web/src/lib/api.ts`
  - `docs/security/v1-provider-payload-leakage-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested: focused backend route tests and frontend production build.
- What is incomplete: strict-mode incident bundle sentinel regression remains
  `PRJ-961`.
- Next steps: `PRJ-961` strict-mode incident sentinel regression.
- Decisions made: frontend coverage is a type/build contract in this slice
  because the current web workspace has no dedicated test runner.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: raw provider payload storage is intentional internally, so projection
  tests must guard app-visible boundaries.
- Gaps: no explicit multi-provider sentinel regression existed.
- Inconsistencies: none confirmed.
- Architecture constraints: side effects and raw provider bodies stay internal.

### 2. Select One Priority Task
- Selected task: `PRJ-960`
- Priority rationale: next READY P1 security regression after session
  isolation.
- Why other candidates were deferred: incident export and live provider smoke
  are separate surfaces.

### 3. Plan Implementation
- Files or surfaces to modify: backend route tests, frontend API types, docs.
- Logic: seed raw sentinel payloads, assert public response serialization does
  not include them.
- Edge cases: pending proposal metadata must remain useful without exposing
  raw payload bodies.

### 4. Execute Implementation
- Implementation notes: added one focused sentinel regression and explicit
  frontend metadata types.

### 5. Verify and Test
- Validation performed: focused backend route tests and `npm run build`.
- Result: passed.

### 6. Self-Review
- Simpler option considered: docs-only closure.
- Technical debt introduced: no
- Scalability assessment: sentinel list can grow with provider coverage.
- Refinements made: kept strict-mode incident bundle coverage out of this task
  to preserve a small slice.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/security/v1-provider-payload-leakage-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable
