# Task

## Header
- ID: PRJ-1025
- Title: Extract shared module text card list
- Task Type: refactor
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1024
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1025
- Operation Mode: TESTER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
PRJ-1024 selected the repeated module route title/body cards as the next safe
frontend architecture slice. `/reflections`, `/plans`, and `/goals` each had
route-local JSX with the same card structure and route-specific CSS class
names.

## Goal
Move repeated title/body module card-list presentation into a shared component
without changing route data ownership, backend calls, copy, CSS selectors, or
route behavior.

## Scope
- `web/src/components/shared.tsx`
- `web/src/App.tsx`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/frontend/route-component-map.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: repeated module card JSX makes route ownership hard
  to scan.
- Expected product or reliability outcome: route-local rendering shrinks while
  existing visual contracts remain intact.
- How success will be observed: frontend build and 14-route smoke pass.
- Post-launch learning needed: no

## Deliverable For This Stage
A verified shared `ModuleTextCardList` extraction with docs and context synced.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- keep data construction in `App()` for this slice

## Implementation Plan
1. Add `ModuleTextCardList` to `web/src/components/shared.tsx`.
2. Preserve existing route-specific class names via explicit `routeKey` and
   `cardKey` props.
3. Replace reflection prompt, planning step, and goal signal card map markup in
   `web/src/App.tsx`.
4. Update frontend ownership docs, v1 roadmap, task board, and project state.
5. Run build, route smoke, and diff validation.

## Acceptance Criteria
- `ModuleTextCardList` renders the same wrapper/card/title/body class names as
  the previous inline JSX.
- `/reflections`, `/plans`, and `/goals` route data arrays remain owned by
  `App()`.
- `npm run build`, `npm run smoke:routes`, and `git diff --check` pass.

## Definition of Done
- [x] `DEFINITION_OF_DONE.md` satisfied for a frontend refactor slice.
- [x] Shared component added.
- [x] Repeated JSX replaced for the selected routes.
- [x] Relevant docs and context updated.
- [x] Validation evidence recorded.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - `git diff --check`
- Manual checks:
  - confirmed route/card keys preserve existing CSS selectors
- Screenshots/logs: route smoke output
- High-risk checks:
  - no API, state, persistence, auth, or deployment code changed

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Follow-up architecture doc updates:
  - audit the next module cleanup target after `ModuleTextCardList`

## Notes
This is intentionally presentation-only. It does not generalize memory signal
cards or dot-row guidance/context cards because those have different shapes.

## Result Report

- Task summary: added `ModuleTextCardList` and used it for reflection prompt
  cards, planning step cards, and goal signal cards.
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
  - memory signal cards, dot-row context lists, and decorative panels remain
    future audited slices
- Next steps:
  - audit whether module dot-row guidance/context lists or memory signal cards
    should move next
- Decisions made:
  - preserve route-specific CSS through `routeKey` and `cardKey`

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - repeated route-local title/body card JSX remained in three module branches
- Gaps:
  - no shared component owned that exact card-list shape
- Inconsistencies:
  - identical presentation responsibilities were split across routes
- Architecture constraints:
  - `App()` remains the route state and data-derivation owner

### 2. Select One Priority Task
- Selected task:
  - PRJ-1025 extract shared module text card list
- Priority rationale:
  - direct follow-up from PRJ-1024 with low behavior risk
- Why other candidates were deferred:
  - memory signal cards and dot-row lists are different shapes

### 3. Plan Implementation
- Files or surfaces to modify:
  - shared component module, route JSX, frontend docs, context
- Logic:
  - route/card key class-name composition only
- Edge cases:
  - keep existing card title keys semantically equivalent

### 4. Execute Implementation
- Implementation notes:
  - added `ModuleTextCardList`
  - replaced three inline map blocks

### 5. Verify and Test
- Validation performed:
  - frontend build
  - route smoke
  - diff check
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - only extract one route, but three identical shapes made the shared boundary
    worthwhile
- Technical debt introduced: no
- Scalability assessment:
  - accepts route/card keys so future simple module cards can reuse it without
    new CSS contracts
- Refinements made:
  - left other card shapes untouched

### 7. Update Documentation and Knowledge
- Docs updated:
  - route cluster audit, route component map, v1 roadmap
- Context updated:
  - task board, project state
- Learning journal updated: not applicable
