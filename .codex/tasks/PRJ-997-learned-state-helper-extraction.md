# Task

## Header
- ID: PRJ-997
- Title: Extract learned-state summary helpers from `web/src/App.tsx`
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-996
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 997
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

PRJ-996 selected learned-state helper extraction before health/channel helper
extraction because learned-state projections are pure and lower coupling.

## Goal

Move learned-state summary and recent-activity formatting helpers into a small
lib module without changing dashboard/module/personality route behavior.

## Scope

- `web/src/App.tsx`
- `web/src/lib/learned-state-formatting.ts`
- `docs/frontend/route-component-map.md`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: learned-state projection logic was mixed into
  `App.tsx`.
- Expected product or reliability outcome: learned-state formatting ownership is
  explicit and route rendering gets thinner.
- How success will be observed: build and full route smoke pass.

## Deliverable For This Stage

Add `web/src/lib/learned-state-formatting.ts` and import learned-state
formatting helpers from it.

## Constraints
- preserve string fallback and timestamp formatting behavior
- keep route-specific data assembly and UI copy in `App()`
- do not move health/channel telemetry helpers in this slice
- do not open a visible browser window

## Implementation Plan
1. Add a learned-state formatting module.
2. Move `recentActivityRows` and `summaryLines` into it.
3. Move their direct formatting dependencies with them.
4. Import the helpers from `App.tsx`.
5. Run web build and full route smoke.
6. Update docs and context.

## Acceptance Criteria
- `recentActivityRows` and `summaryLines` no longer live in `App.tsx`.
- Learned-state formatting helpers live in `web/src/lib/learned-state-formatting.ts`.
- `npm run build` passes.
- `npm run smoke:routes` passes with `route_count=14`.

## Definition of Done
- [x] Learned-state helpers extracted.
- [x] Route behavior remains in `App()`.
- [x] Full route smoke validation completed.
- [x] Docs and context updated.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - result: `status=ok`, `route_count=14`
- Manual checks:
  - confirmed `App.tsx` imports learned-state helpers
  - confirmed health/channel helpers remain in `App.tsx`

## Result Report

- Task summary: extracted learned-state formatting helpers into a new lib
  module.
- Files changed:
  - `web/src/App.tsx`
  - `web/src/lib/learned-state-formatting.ts`
  - `docs/frontend/route-component-map.md`
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
- What is incomplete:
  - health/channel helpers still live in `App.tsx`
- Next steps:
  - audit or extract health/channel formatting when provider route ownership is clearer
