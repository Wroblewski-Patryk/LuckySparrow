# Task

## Header
- ID: PRJ-1039
- Title: Extract shared module progress value row list for goal horizon
- Task Type: refactor
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1038
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1039
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
PRJ-1038 selected `/goals` horizon rows because they have a bounded
`token/title/detail/progress/value` shape and stable route-specific selectors.
Dashboard progress rows remain deferred because they are part of the flagship
dashboard composition.

## Goal
Move `/goals` horizon row presentation behind a shared route-keyed progress
value row list without changing `goalHorizonRows` data or copy construction.

## Scope
- `web/src/components/shared.tsx`
- `web/src/App.tsx`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/frontend/route-component-map.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: goal horizon row markup remains embedded in
  `App()`.
- Expected product or reliability outcome: route presentation is more
  traceable while visual selectors remain unchanged.
- How success will be observed: build and 14-route smoke pass.
- Post-launch learning needed: no

## Deliverable For This Stage
A verified `ModuleProgressValueRowList` extraction with docs and context synced.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- keep `goalHorizonRows` data and copy construction in `App()`

## Implementation Plan
1. Add `ModuleProgressValueRowList` to `web/src/components/shared.tsx`.
2. Preserve `aion-goals-list`, `aion-goals-row-*`, and
   `aion-goals-progress` selectors.
3. Replace inline `/goals` horizon row JSX in `web/src/App.tsx`.
4. Update docs, roadmap, task board, and project state.
5. Run build, route smoke, and diff validation.

## Acceptance Criteria
- Existing goals horizon CSS selectors remain unchanged.
- `goalHorizonRows` remains in `App()`.
- `npm run build`, `npm run smoke:routes`, and `git diff --check` pass.

## Definition of Done
- [x] `DEFINITION_OF_DONE.md` satisfied for a frontend refactor slice.
- [x] Shared progress value row list component added.
- [x] Goal horizon row JSX replaced.
- [x] Relevant docs and context updated.
- [x] Validation evidence recorded.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - `git diff --check`
- Manual checks:
  - confirmed generated class names match existing goals selectors
- High-risk checks:
  - no API, goal data, auth, persistence, or deployment code changed

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Follow-up architecture doc updates:
  - audit dashboard progress rows and route data-helper extraction separately

## Notes
This is presentation-only. It does not change goal horizon data, percentages,
copy, or progress width values.

## Result Report

- Task summary: added `ModuleProgressValueRowList` and used it for `/goals`
  horizon rows.
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
  - dashboard progress rows remain deferred
- Next steps:
  - audit next frontend cleanup after goal horizon extraction
- Decisions made:
  - preserve current selector contract instead of broad progress abstraction

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - goal horizon row markup was inline
- Gaps:
  - no shared progress value row component existed
- Inconsistencies:
  - simpler route rows/cards were shared, while goals progress rows were inline
- Architecture constraints:
  - goal data remains route-owned in `App()`

### 2. Select One Priority Task
- Selected task:
  - PRJ-1039 extract goal horizon progress value rows
- Priority rationale:
  - direct follow-up from PRJ-1038
- Why other candidates were deferred:
  - dashboard progress rows are flagship UI-sensitive

### 3. Plan Implementation
- Files or surfaces to modify:
  - shared components, `App.tsx`, frontend docs, context
- Logic:
  - route-keyed class-name composition only
- Edge cases:
  - preserve progress aria labels and width values

### 4. Execute Implementation
- Implementation notes:
  - added `ModuleProgressValueRowList`
  - replaced goal horizon row map

### 5. Verify and Test
- Validation performed:
  - frontend build
  - route smoke
  - diff check
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - generic dashboard/goals progress abstraction, but their layouts differ
- Technical debt introduced: no
- Scalability assessment:
  - component is route-keyed and bounded to matching class contracts
- Refinements made:
  - corrected class-name composition to preserve exact goals selectors

### 7. Update Documentation and Knowledge
- Docs updated:
  - route cluster audit, route component map, v1 roadmap
- Context updated:
  - task board, project state
- Learning journal updated: not applicable
