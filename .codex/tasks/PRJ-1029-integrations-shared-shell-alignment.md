# Task

## Header
- ID: PRJ-1029
- Title: Align integrations route with shared module shell components
- Task Type: refactor
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1028
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1029
- Operation Mode: ARCHITECT

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
PRJ-1028 selected `/integrations` shared-shell alignment because the route still
had inline overview/stat/readiness-row wrappers that matched already approved
shared module components. Provider/tool data and health semantics remain route
owned in `App()`.

## Goal
Reuse existing shared module shell components in `/integrations` without
changing provider readiness semantics, API calls, state ownership, or route
behavior.

## Scope
- `web/src/App.tsx`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/frontend/route-component-map.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: `/integrations` presentation was disconnected from
  the shared module shell pattern.
- Expected product or reliability outcome: `/integrations` is easier to trace
  alongside other module routes.
- How success will be observed: build and 14-route smoke pass.
- Post-launch learning needed: no

## Deliverable For This Stage
A verified integrations shared-shell alignment with docs and context synced.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- keep provider/tool/health data derivation in `App()`

## Implementation Plan
1. Replace inline integrations overview bar with `ModuleOverviewBar`.
2. Replace inline integrations stat-row wrapper with `ModuleStatRow`.
3. Replace readiness-detail health rows with `ModuleDotRowList`.
4. Keep integration provider rows, provider map visual, boundary cards, and all
   data derivation in `App()`.
5. Update frontend docs, roadmap, task board, and project state.
6. Run build, route smoke, and diff validation.

## Acceptance Criteria
- Existing `aion-integrations-overview-*`, `aion-integrations-stat-*`, and
  `aion-integrations-health-*` selectors remain available through shared
  route-keyed components.
- Provider/tool data ownership remains in `App()`.
- `npm run build`, `npm run smoke:routes`, and `git diff --check` pass.

## Definition of Done
- [x] `DEFINITION_OF_DONE.md` satisfied for a frontend refactor slice.
- [x] Shared integrations shell components are used.
- [x] Route behavior and data ownership are unchanged.
- [x] Relevant docs and context updated.
- [x] Validation evidence recorded.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - `git diff --check`
- Manual checks:
  - confirmed shared route keys preserve integrations CSS selectors
- High-risk checks:
  - no API, provider, health, auth, persistence, or deployment code changed

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Follow-up architecture doc updates:
  - audit next route/helper cleanup target after integrations shell alignment

## Notes
This is presentation-only. It intentionally defers:
- `conversationChannelStatus`
- provider/health helper extraction
- integrations provider-map visual extraction

## Result Report

- Task summary: aligned `/integrations` overview, stat row, and readiness rows
  with shared module shell components.
- Files changed:
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
  - provider/health helper ownership remains a later audited slice
- Next steps:
  - audit whether to address integrations provider rows, provider/health
    helpers, or another route-local presentation cluster next
- Decisions made:
  - reuse existing shared components instead of adding integrations-specific
    components

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - integrations route repeated shell wrappers already solved elsewhere
- Gaps:
  - route-shell alignment was incomplete for `/integrations`
- Inconsistencies:
  - other module routes used shared shell components while `/integrations` did
    not
- Architecture constraints:
  - provider/tool truth remains in backend/API and route-derived data in
    `App()`

### 2. Select One Priority Task
- Selected task:
  - PRJ-1029 integrations shared-shell alignment
- Priority rationale:
  - low-risk follow-up from PRJ-1028
- Why other candidates were deferred:
  - provider helper movement and decorative provider map require separate audit

### 3. Plan Implementation
- Files or surfaces to modify:
  - `App.tsx`, frontend docs, context
- Logic:
  - route-keyed shared component usage only
- Edge cases:
  - preserve route-specific CSS selectors

### 4. Execute Implementation
- Implementation notes:
  - replaced overview/stat wrappers and readiness health rows

### 5. Verify and Test
- Validation performed:
  - frontend build
  - route smoke
  - diff check
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - leave integrations untouched, but the shared component coverage is now a
    direct fit
- Technical debt introduced: no
- Scalability assessment:
  - keeps integrations aligned with shared module-shell architecture
- Refinements made:
  - moved readiness row items into a named `integrationReadinessRows` array in
    `App()`

### 7. Update Documentation and Knowledge
- Docs updated:
  - route cluster audit, route component map, v1 roadmap
- Context updated:
  - task board, project state
- Learning journal updated: not applicable
