# Task

## Header
- ID: PRJ-1038
- Title: Audit next frontend cleanup after memory signal extraction
- Task Type: research
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1037
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1038
- Operation Mode: ARCHITECT

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
PRJ-1037 extracted memory signal cards. Remaining frontend cleanup candidates
include dashboard progress rows, goal horizon rows, route data-helper
extraction, and larger visual panel extraction.

## Goal
Select the next frontend cleanup target after memory signal extraction while
preserving visual-sensitive dashboard behavior.

## Scope
- `web/src/App.tsx`
- `web/src/components/shared.tsx`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: progress/value row presentation remains embedded in
  route JSX.
- Expected product or reliability outcome: the next cleanup is explicit,
  route-scoped, and avoids dashboard visual drift.
- How success will be observed: docs select one next implementation task.
- Post-launch learning needed: no

## Deliverable For This Stage
A completed audit selecting the next implementation task.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- avoid dashboard visual changes without a dedicated flagship UI audit

## Implementation Plan
1. Inspect remaining progress-row candidates in `web/src/App.tsx`.
2. Compare dashboard progress rows with `/goals` horizon rows.
3. Select one next implementation slice.
4. Update frontend docs, roadmap, task board, and project state.
5. Run `git diff --check`.

## Acceptance Criteria
- Exactly one next task is selected.
- Deferred candidates and reasons are documented.
- The selected task preserves existing CSS selectors and route data ownership.

## Definition of Done
- [x] `DEFINITION_OF_DONE.md` satisfied for a docs-only planning slice.
- [x] Audit result recorded in frontend docs.
- [x] Task board and project state updated.
- [x] `git diff --check` passes.

## Validation Evidence
- Tests:
  - `git diff --check`
- Manual checks:
  - reviewed `dashboardGoalRows` and `goalHorizonRows` render blocks in
    `web/src/App.tsx`
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
  - add PRJ-1039 as goal horizon progress row extraction

## Notes
Selected next task:
- PRJ-1039: extract `/goals` horizon row presentation behind a shared
  route-keyed progress value row list.

Deferred:
- dashboard progress rows because they are part of the flagship dashboard
  lower-card composition and should be handled in a dedicated dashboard audit.
- route data-helper extraction because it moves broader route semantics.
- visual panel extraction because it needs screenshot/visual evidence.

## Result Report

- Task summary: selected goal horizon progress row extraction as the next
  frontend cleanup.
- Files changed:
  - `.codex/tasks/PRJ-1038-next-cleanup-after-memory-signal-audit.md`
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `git diff --check`
- What is incomplete:
  - implementation is deferred to PRJ-1039
- Next steps:
  - implement a route-keyed progress value row list for `/goals`
- Decisions made:
  - defer dashboard progress rows

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - goal horizon row JSX remains route-local
- Gaps:
  - no shared progress value row presentation exists
- Inconsistencies:
  - simple rows/cards are shared, while goal horizon rows remain inline
- Architecture constraints:
  - goal row data and copy stay in `App()`

### 2. Select One Priority Task
- Selected task:
  - PRJ-1038 audit next cleanup target
- Priority rationale:
  - goal horizon rows are route-scoped and lower risk than dashboard flagship
    rows
- Why other candidates were deferred:
  - dashboard and visual panels need separate visual audits

### 3. Plan Implementation
- Files or surfaces to modify:
  - docs and context only
- Logic:
  - select next implementation task
- Edge cases:
  - avoid broad progress abstraction across dissimilar layouts

### 4. Execute Implementation
- Implementation notes:
  - selected PRJ-1039

### 5. Verify and Test
- Validation performed:
  - `git diff --check`
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - dashboard progress rows, but dashboard has higher visual sensitivity
- Technical debt introduced: no
- Scalability assessment:
  - route-keyed progress value row can remain presentation-only
- Refinements made:
  - dashboard row extraction remains deferred

### 7. Update Documentation and Knowledge
- Docs updated:
  - route cluster audit, v1 roadmap
- Context updated:
  - task board, project state
- Learning journal updated: not applicable
