# Task

## Header
- ID: PRJ-1034
- Title: Audit next live frontend route/helper cleanup after dead channel helper removal
- Task Type: research
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1033
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1034
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
PRJ-1033 removed the unused channel-status helper. Remaining live frontend
cleanup candidates include integrations provider rows, memory signal cards,
goal horizon rows, dashboard progress rows, route data helpers, and decorative
panels.

## Goal
Select the next live frontend cleanup target that improves architecture while
staying within a small, testable, presentation-only slice.

## Scope
- `web/src/App.tsx`
- `web/src/components/shared.tsx`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: live route-local presentation still hides behavior
  shape inside `App()`.
- Expected product or reliability outcome: the next slice reduces route-local
  JSX without moving provider semantics or visual-sensitive panels.
- How success will be observed: docs select one next implementation task.
- Post-launch learning needed: no

## Deliverable For This Stage
A completed audit selecting the next implementation task.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- keep provider/tool data derivation in `App()`

## Implementation Plan
1. Inspect remaining live route-local row/card candidates.
2. Compare provider rows, memory signal cards, progress rows, and decorative
   panels by shape and risk.
3. Select one next implementation slice.
4. Update frontend docs, roadmap, task board, and project state.
5. Run `git diff --check`.

## Acceptance Criteria
- Exactly one next task is selected.
- Deferred candidates and reasons are documented.
- The selected task can preserve existing CSS selectors and route data
  ownership.

## Definition of Done
- [x] `DEFINITION_OF_DONE.md` satisfied for a docs-only planning slice.
- [x] Audit result recorded in frontend docs.
- [x] Task board and project state updated.
- [x] `git diff --check` passes.

## Validation Evidence
- Tests:
  - `git diff --check`
- Manual checks:
  - reviewed `integrationProviderRows`, `memorySignalCards`,
    `goalHorizonRows`, and `dashboardGoalRows` usages in `web/src/App.tsx`
- High-risk checks:
  - no runtime code changed

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Follow-up architecture doc updates:
  - add PRJ-1035 as integrations provider row presentation extraction

## Notes
Selected next task:
- PRJ-1035: extract a shared route-keyed value-row list for `/integrations`
  provider rows.

This covers a live route-local list with a stable `token/title/detail/value`
shape and keeps `integrationProviderRows`, fallback row selection, provider
readiness values, and provider semantics in `App()`.

Deferred:
- memory signal cards because they remain a single-route `meta/title/body`
  shape.
- goal horizon rows and dashboard progress rows because they include progress
  bars and visual-sensitive sizing.
- route data-helper extraction because it would move more semantics than this
  presentation-only slice.
- decorative panels because they require separate visual audits.

## Result Report

- Task summary: selected integrations provider row presentation extraction as
  the next live frontend cleanup.
- Files changed:
  - `.codex/tasks/PRJ-1034-next-live-frontend-cleanup-after-dead-helper-audit.md`
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `git diff --check`
- What is incomplete:
  - implementation is deferred to PRJ-1035
- Next steps:
  - implement `ModuleValueRowList` for integrations provider rows
- Decisions made:
  - keep provider semantics in `App()`

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - integrations provider rows are still inline in `App()`
- Gaps:
  - no shared value-row presentation owns the token/title/detail/value shape
- Inconsistencies:
  - route shell is shared, but provider row presentation remains local
- Architecture constraints:
  - provider truth and fallback selection stay in `App()`

### 2. Select One Priority Task
- Selected task:
  - PRJ-1034 audit next live frontend cleanup
- Priority rationale:
  - provider rows are live and lower risk than decorative/progress panels
- Why other candidates were deferred:
  - they are single-route or visual-sensitive shapes

### 3. Plan Implementation
- Files or surfaces to modify:
  - docs and context only
- Logic:
  - select next implementation task
- Edge cases:
  - avoid moving provider readiness semantics

### 4. Execute Implementation
- Implementation notes:
  - selected PRJ-1035

### 5. Verify and Test
- Validation performed:
  - `git diff --check`
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - extract memory signal cards, but they are less reusable today
- Technical debt introduced: no
- Scalability assessment:
  - a route-keyed value-row component can remain presentation-only
- Refinements made:
  - progress-row candidates were excluded

### 7. Update Documentation and Knowledge
- Docs updated:
  - route cluster audit, v1 roadmap
- Context updated:
  - task board, project state
- Learning journal updated: not applicable
