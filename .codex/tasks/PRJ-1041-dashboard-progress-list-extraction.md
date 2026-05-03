# Task

## Header
- ID: PRJ-1041
- Title: Extract dashboard progress list component
- Task Type: refactor
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1040
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1041
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
PRJ-1040 selected a dashboard-specific progress list extraction because the
dashboard is a flagship surface and should not force a broader shared
abstraction for a visually specific row group.

## Goal
Move dashboard progress row presentation into `web/src/components/dashboard.tsx`
without changing dashboard data, sizing calculations, CSS selectors, or route
behavior.

## Scope
- `web/src/components/dashboard.tsx`
- `web/src/App.tsx`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/frontend/route-component-map.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: dashboard progress row JSX is route-local even
  though dashboard components already exist.
- Expected product or reliability outcome: dashboard presentation ownership is
  clearer while the flagship layout remains stable.
- How success will be observed: build and 14-route smoke pass.
- Post-launch learning needed: no

## Deliverable For This Stage
A verified `DashboardProgressList` extraction with docs and context synced.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- keep `dashboardGoalRows` and `scaledMetricSize(...)` in `App()`

## Implementation Plan
1. Add `DashboardProgressList` to `web/src/components/dashboard.tsx`.
2. Preserve existing dashboard progress row markup, classes, and width style.
3. Replace inline dashboard progress row map in `web/src/App.tsx`.
4. Update docs, roadmap, task board, and project state.
5. Run build, route smoke, and diff validation.

## Acceptance Criteria
- Existing `aion-dashboard-progress` selector remains unchanged.
- `dashboardGoalRows` and width calculations remain in `App()`.
- `npm run build`, `npm run smoke:routes`, and `git diff --check` pass.

## Definition of Done
- [x] `DEFINITION_OF_DONE.md` satisfied for a frontend refactor slice.
- [x] Dashboard progress component added.
- [x] Inline dashboard progress row JSX replaced.
- [x] Relevant docs and context updated.
- [x] Validation evidence recorded.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - `git diff --check`
- Manual checks:
  - confirmed `aion-dashboard-progress` markup and width style are preserved
- High-risk checks:
  - no API, dashboard data, auth, persistence, or deployment code changed

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Follow-up architecture doc updates:
  - audit route data-helper extraction or visual panels separately

## Notes
This is dashboard-specific presentation only. It does not broaden the shared
component surface and does not alter the dashboard lower-card layout.

## Result Report

- Task summary: added `DashboardProgressList` and used it for dashboard progress
  rows.
- Files changed:
  - `web/src/components/dashboard.tsx`
  - `web/src/App.tsx`
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `npm run build`
  - `npm run smoke:routes`
  - `git diff --check`
- What is incomplete:
  - broader dashboard visual/layout extraction remains deferred
- Next steps:
  - audit next frontend cleanup after dashboard progress extraction
- Decisions made:
  - use dashboard-specific ownership rather than shared module ownership

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - dashboard progress rows were inline in `App()`
- Gaps:
  - dashboard component module did not own the progress list
- Inconsistencies:
  - dashboard signal card was extracted, progress list was not
- Architecture constraints:
  - keep dashboard data and widths in `App()`

### 2. Select One Priority Task
- Selected task:
  - PRJ-1041 extract dashboard progress list
- Priority rationale:
  - direct follow-up from PRJ-1040
- Why other candidates were deferred:
  - broader route helpers and visual panels need separate audit

### 3. Plan Implementation
- Files or surfaces to modify:
  - dashboard component module, `App.tsx`, frontend docs, context
- Logic:
  - presentation-only component extraction
- Edge cases:
  - preserve inline width style

### 4. Execute Implementation
- Implementation notes:
  - added `DashboardProgressList`
  - replaced inline dashboard progress map

### 5. Verify and Test
- Validation performed:
  - frontend build
  - route smoke
  - diff check
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - keep inline, but dashboard module already owns comparable card components
- Technical debt introduced: no
- Scalability assessment:
  - dashboard-specific ownership avoids premature generic abstraction
- Refinements made:
  - data and width calculations stay in `App()`

### 7. Update Documentation and Knowledge
- Docs updated:
  - route cluster audit, route component map, v1 roadmap
- Context updated:
  - task board, project state
- Learning journal updated: not applicable
