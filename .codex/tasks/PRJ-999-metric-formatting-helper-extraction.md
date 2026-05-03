# Task

## Header
- ID: PRJ-999
- Title: Extract metric formatting helpers from `web/src/App.tsx`
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-998
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 999
- Operation Mode: ARCHITECT

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

PRJ-998 selected pure metric helper extraction before moving health/channel
telemetry helpers.

## Goal

Move generic metric formatting helpers into a small lib module without changing
dashboard, automations, integrations, or tools route behavior.

## Scope

- `web/src/App.tsx`
- `web/src/lib/metric-formatting.ts`
- `docs/frontend/route-component-map.md`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: generic metric formatting was mixed into `App.tsx`.
- Expected product or reliability outcome: metric helper ownership is explicit.
- How success will be observed: build and full route smoke pass.

## Deliverable For This Stage

Add `web/src/lib/metric-formatting.ts` and import `numberValue` and
`scaledMetricSize` from it.

## Constraints
- preserve numeric fallback and metric size behavior
- do not move `conversationChannelStatus`
- do not change route data assembly
- do not open a visible browser window

## Implementation Plan
1. Add a metric formatting module.
2. Move `numberValue` and `scaledMetricSize`.
3. Import helpers from `App.tsx`.
4. Run web build and full route smoke.
5. Update docs and context.

## Acceptance Criteria
- `numberValue` and `scaledMetricSize` no longer live in `App.tsx`.
- `web/src/lib/metric-formatting.ts` owns metric formatting helpers.
- `npm run build` passes.
- `npm run smoke:routes` passes with `route_count=14`.

## Definition of Done
- [x] Metric helpers extracted.
- [x] Health/channel helper remains in `App()`.
- [x] Full route smoke validation completed.
- [x] Docs and context updated.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - result: `status=ok`, `route_count=14`
- Manual checks:
  - confirmed `conversationChannelStatus` remains in `App.tsx`

## Result Report

- Task summary: moved generic metric formatting helpers to
  `web/src/lib/metric-formatting.ts`.
- Files changed:
  - `web/src/App.tsx`
  - `web/src/lib/metric-formatting.ts`
  - `docs/frontend/route-component-map.md`
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
- What is incomplete:
  - health/channel telemetry helper remains in `App.tsx`
