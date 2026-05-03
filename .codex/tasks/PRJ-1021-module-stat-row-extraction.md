# Task

## Header
- ID: PRJ-1021
- Title: Extract shared module stat row wrapper
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1020
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1021
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

`PRJ-1020` selected the repeated module stat-row wrapper after
`ModuleOverviewBar` cleanup. `RouteStatCard` already owns individual stat card
presentation.

## Goal

Move repeated stat-row section wrappers for memory, reflections, plans, and
goals into a shared route-keyed component while keeping stat data in `App()`.

## Scope

- `web/src/components/shared.tsx`
- `web/src/App.tsx`
- `docs/frontend/route-component-map.md`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: route stat-row wrappers were repeated inline.
- Expected product or reliability outcome: shared stat-row shell is explicit,
  but stat data ownership remains visible in `App()`.
- How success will be observed: build and route smoke pass with
  `ModuleStatRow`.
- Post-launch learning needed: no

## Deliverable For This Stage

Release-ready wrapper extraction with validation and docs/context sync.

## Constraints
- do not move stat card data arrays
- preserve route-specific CSS class names
- preserve route-specific aria labels
- do not touch dashboard/personality flagship surfaces

## Implementation Plan
1. Add `ModuleStatRow` to `web/src/components/shared.tsx`.
2. Replace memory/reflections/plans/goals stat-row section wrappers.
3. Keep `RouteStatCard` maps and data arrays in `App()`.
4. Update frontend docs and context.
5. Run build, route smoke, and diff validation.

## Acceptance Criteria
- Four module routes use `ModuleStatRow`.
- Existing selectors and aria labels are preserved.
- Route data ownership stays in `App()`.
- Validation passes.

## Definition of Done
- [x] Component extraction completed.
- [x] Route data ownership preserved in `App()`.
- [x] Docs and context updated.
- [x] Relevant validation completed.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - `git diff --check`
- Manual checks:
  - confirmed `ModuleStatRow` preserves route-keyed selectors and aria labels
- High-risk checks:
  - dashboard/personality routes untouched
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Result Report

- Task summary: extracted repeated module stat-row wrappers into
  `ModuleStatRow`.
- Files changed:
  - `web/src/components/shared.tsx`
  - `web/src/App.tsx`
  - `docs/frontend/route-component-map.md`
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - `git diff --check`
- What is incomplete:
  - inner module panels remain route-local
- Next steps:
  - PRJ-1022 audit next module route cleanup target
- Decisions made:
  - wrapper accepts `children` so individual stat card ownership remains in route context

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - stat-row wrappers repeated across four module routes
- Gaps:
  - inner module panels still need future cleanup
- Inconsistencies:
  - PRJ-1021 was queued but implementation was not present
- Architecture constraints:
  - data ownership remains in `App()`

### 2. Select One Priority Task
- Selected task: PRJ-1021
- Priority rationale: it was the next queued implementation slice
- Why other candidates were deferred:
  - inner panels are more route-specific

### 3. Plan Implementation
- Files or surfaces to modify:
  - shared component module, four route usages, docs, context
- Logic:
  - wrap existing `RouteStatCard` maps in a route-keyed shell
- Edge cases:
  - aria labels must remain exact

### 4. Execute Implementation
- Implementation notes:
  - added `ModuleStatRow`

### 5. Verify and Test
- Validation performed:
  - build
  - route smoke
  - diff check
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - leave wrappers inline; rejected because the pattern is stable and repeated
- Technical debt introduced: no
- Scalability assessment:
  - adequate for route-keyed module cleanup
- Refinements made:
  - wrapper keeps children generic to avoid coupling to stat card data

### 7. Update Documentation and Knowledge
- Docs updated:
  - frontend route/component map
  - app route cluster audit
  - v1 roadmap
- Context updated:
  - task board
  - project state
- Learning journal updated: not applicable
