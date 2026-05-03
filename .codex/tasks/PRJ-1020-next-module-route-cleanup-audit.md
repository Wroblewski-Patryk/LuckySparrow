# Task

## Header
- ID: PRJ-1020
- Title: Audit next module route cleanup target after overview bar extraction
- Task Type: documentation
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1019
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1020
- Operation Mode: TESTER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

`ModuleOverviewBar` now owns repeated module overview-bar chrome for memory,
reflections, plans, and goals. The next repeated module-route pattern is the
stat-row section wrapper around existing `RouteStatCard` cards.

## Goal

Choose the next safe module route cleanup target without touching
dashboard/personality flagship surfaces or provider/health helpers.

## Scope

- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: repeated module stat-row section chrome remains
  inline across module routes.
- Expected product or reliability outcome: next slice removes repeated wrapper
  markup while keeping card data in `App()`.
- How success will be observed: PRJ-1021 is queued for `ModuleStatRow`.
- Post-launch learning needed: no

## Deliverable For This Stage

Record `ModuleStatRow` as the next implementation target.

## Constraints
- do not change runtime code in this task
- do not touch dashboard/personality flagship routes
- do not touch provider/health helper ownership
- keep stat-card data construction in `App()`

## Implementation Plan
1. Inspect module route stat-row sections.
2. Select the next repeated low-risk wrapper pattern.
3. Update route audit, roadmap, and context.
4. Run `git diff --check`.

## Acceptance Criteria
- Next target is selected with rationale.
- Deferred targets are named.
- PRJ-1021 is queued.
- `git diff --check` passes.

## Definition of Done
- [x] Boundary recorded.
- [x] Roadmap and context updated.
- [x] Diff validation completed.

## Validation Evidence
- Tests:
  - `git diff --check`
  - result: passed
- Manual checks:
  - inspected memory/reflections/plans/goals stat-row sections
- High-risk checks:
  - flagship and provider/health work deferred
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Result Report

- Task summary: selected shared module stat-row wrapper extraction.
- Files changed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/tasks/PRJ-1020-next-module-route-cleanup-audit.md`
- How tested:
  - `git diff --check`
- What is incomplete:
  - implementation is queued as PRJ-1021
- Next steps:
  - extract `ModuleStatRow`
- Decisions made:
  - stat-row wrapper is lower risk than inner decorative panels

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - repeated stat-row wrapper markup remains inline
- Gaps:
  - inner module panels still need future audits
- Inconsistencies:
  - PRJ-1020 needed to select the next post-overview target
- Architecture constraints:
  - route data ownership stays in `App()`

### 2. Select One Priority Task
- Selected task: PRJ-1020
- Priority rationale: it is the next queued module route audit
- Why other candidates were deferred:
  - decorative inner panels are more route-specific
  - provider/health helpers need a provider-aware audit

### 3. Plan Implementation
- Files or surfaces to modify:
  - docs and context only
- Logic:
  - queue a route-keyed stat-row wrapper around existing `RouteStatCard`
- Edge cases:
  - aria labels must remain route-specific

### 4. Execute Implementation
- Implementation notes:
  - queued PRJ-1021 for `ModuleStatRow`

### 5. Verify and Test
- Validation performed:
  - `git diff --check`
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - skip to inner panels; deferred because stat-row wrapper is smaller
- Technical debt introduced: no
- Scalability assessment:
  - adequate for one small module-route cleanup slice
- Refinements made:
  - selected wrapper-only extraction to keep data ownership stable

### 7. Update Documentation and Knowledge
- Docs updated:
  - frontend route cluster audit
  - v1 roadmap
- Context updated:
  - task board
  - project state
- Learning journal updated: not applicable
