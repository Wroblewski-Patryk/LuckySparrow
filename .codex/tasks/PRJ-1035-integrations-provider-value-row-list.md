# Task

## Header
- ID: PRJ-1035
- Title: Extract shared module value-row list for integrations providers
- Task Type: refactor
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1034
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1035
- Operation Mode: TESTER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
PRJ-1034 selected integrations provider row presentation as the next live
frontend cleanup. The route already keeps provider/tool data and fallback
selection in `App()`, while the row JSX is a stable `token/title/detail/value`
shape.

## Goal
Move integrations provider row presentation behind a shared route-keyed value
row list without changing provider data ownership or readiness semantics.

## Scope
- `web/src/components/shared.tsx`
- `web/src/App.tsx`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/frontend/route-component-map.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: provider row presentation remains route-local even
  after the integrations shell alignment.
- Expected product or reliability outcome: `/integrations` presentation is
  easier to trace while provider logic remains explicit.
- How success will be observed: build and 14-route smoke pass.
- Post-launch learning needed: no

## Deliverable For This Stage
A verified `ModuleValueRowList` extraction with docs and context synced.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- keep provider data and fallback selection in `App()`

## Implementation Plan
1. Add route-keyed `ModuleValueRowList` to `web/src/components/shared.tsx`.
2. Preserve `aion-integrations-provider-*` selectors through `routeKey` and
   `rowKey`.
3. Keep `integrationProviderRows` and fallback row selection in `App()`.
4. Replace inline provider row JSX in `/integrations`.
5. Update docs, roadmap, task board, and project state.
6. Run build, route smoke, and diff validation.

## Acceptance Criteria
- Existing integrations provider row CSS selectors remain unchanged.
- Provider data derivation and fallback selection remain in `App()`.
- `npm run build`, `npm run smoke:routes`, and `git diff --check` pass.

## Definition of Done
- [x] `DEFINITION_OF_DONE.md` satisfied for a frontend refactor slice.
- [x] Shared value-row list component added.
- [x] Integrations provider row JSX replaced.
- [x] Relevant docs and context updated.
- [x] Validation evidence recorded.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - `git diff --check`
- Manual checks:
  - confirmed `routeKey="integrations"` and `rowKey="provider"` preserve the
    existing CSS class names
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
  - audit next live frontend cleanup target

## Notes
This is presentation-only. It does not move provider readiness values, provider
row projection, or fallback selection out of `App()`.

## Result Report

- Task summary: added `ModuleValueRowList` and used it for integrations
  provider rows.
- Files changed:
  - `web/src/components/shared.tsx`
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
  - next live route/helper cleanup still needs audit
- Next steps:
  - audit memory signal cards, progress rows, route data helpers, and visual
    panels
- Decisions made:
  - keep provider semantics in `App()`

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - integrations provider rows were still inline in `App()`
- Gaps:
  - no shared value-row component existed
- Inconsistencies:
  - route shell used shared components, provider rows did not
- Architecture constraints:
  - provider truth stays in API-derived route data

### 2. Select One Priority Task
- Selected task:
  - PRJ-1035 extract shared module value-row list
- Priority rationale:
  - direct follow-up from PRJ-1034
- Why other candidates were deferred:
  - progress/decorative panels are higher visual risk

### 3. Plan Implementation
- Files or surfaces to modify:
  - shared components, `App.tsx`, frontend docs, context
- Logic:
  - route-keyed class-name composition only
- Edge cases:
  - preserve fallback provider row

### 4. Execute Implementation
- Implementation notes:
  - added `ModuleValueRowList`
  - added `integrationProviderDisplayRows`
  - replaced inline provider row map

### 5. Verify and Test
- Validation performed:
  - frontend build
  - route smoke
  - diff check
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - leave provider rows inline, but the row shape is stable and already isolated
- Technical debt introduced: no
- Scalability assessment:
  - route-keyed component can support future value rows with the same shape
- Refinements made:
  - fallback selection remains visible in `App()`

### 7. Update Documentation and Knowledge
- Docs updated:
  - route cluster audit, route component map, v1 roadmap
- Context updated:
  - task board, project state
- Learning journal updated: not applicable
