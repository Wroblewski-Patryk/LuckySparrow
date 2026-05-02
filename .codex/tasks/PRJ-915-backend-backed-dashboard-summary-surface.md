# Task

## Header
- ID: PRJ-915
- Title: Backend-Backed Dashboard Summary Surface
- Task Type: implementation
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-914
- Priority: P1
- Coverage Ledger Rows: not applicable
- Iteration: 915
- Operation Mode: TESTER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
The Personality route no longer exposes static product metrics. The dashboard
still had route-local values that looked like operational truth: fixed goal
percentages, weekday memory bars, static reflection highlights, and a fixed
current phase.

## Goal
Ground the dashboard summary surface in existing runtime data without changing
the route layout or adding a new backend contract.

## Scope
- `web/src/App.tsx`
- `.codex/tasks/PRJ-915-backend-backed-dashboard-summary-surface.md`
- `docs/planning/v1-backend-backed-dashboard-summary-surface.md`
- `docs/planning/v1-release-audit-and-execution-plan.md`
- `docs/planning/v1-core-acceptance-bundle.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: dashboard should not imply real progress,
  weekday history, or reflection outcomes when those values are not backed by
  runtime data.
- Expected product or reliability outcome: summary cards remain useful while
  showing counts and scaled visuals from existing overview/tool data.
- How success will be observed: web build and focused dashboard smoke pass on
  desktop and mobile.
- Post-launch learning needed: no

## Deliverable For This Stage
A frontend-only dashboard summary update with local smoke evidence.

## Constraints
- reuse `/app/personality/overview`, `/app/tools/overview`, and current health
  state already loaded by the shell
- do not introduce new endpoints
- do not invent progress percentages, time series, or fake reflection content
- do not alter unrelated goal-route static horizon work in this slice
- do not commit generated screenshots, local databases, or temporary scripts

## Implementation Plan
1. Replace dashboard fixed goal percentages with runtime planning counts.
2. Replace weekday memory bars with scaled runtime signal counts.
3. Replace static reflection highlights with learned-state counts.
4. Derive current phase from the active runtime layer.
5. Build the web app.
6. Run a focused desktop/mobile smoke for `/dashboard` against a local real
   backend.
7. Record evidence and update source-of-truth docs.

## Acceptance Criteria
- Dashboard no longer renders fixed `72%`, `58%`, `41%`, or `33%` goal rows.
- Dashboard no longer renders weekday memory bars as fake history.
- Reflection highlights are derived from learned-state counts.
- Current phase is derived from active task, goal, reflection, or memory state.
- Desktop and mobile focused smoke pass without overflow or raw technical
  leakage.

## Definition of Done
- [x] Dashboard summary rows use runtime counts and scaled widths.
- [x] Dashboard memory bars use runtime signal counts and scaled heights.
- [x] Dashboard reflection rows use learned-state counts.
- [x] `npm run build` passed.
- [x] Focused `/dashboard` desktop/mobile smoke passed.
- [x] Context and planning docs were updated.
- [x] `git diff --check` passed.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
  - bundled Node + Playwright focused dashboard summary smoke
  - result: passed:
    - `checks=2`
    - `failures=0`
    - `unexpectedConsoleIssueCount=0`
    - `benignConsoleIssueCount=2`
    - `screenshots=2`
  - `git diff --check`
  - result: passed
- Manual checks:
  - local backend `/health` returned `200`
  - smoke used a local registered user and real `/app/*` endpoints through
    Vite proxy
  - removed static dashboard claims were not present in the rendered route
- Screenshots/logs:
  - `.codex/artifacts/prj915-dashboard-summary/dashboard-summary-smoke-results.json`
  - `.codex/artifacts/prj915-dashboard-summary/dashboard-desktop.png`
  - `.codex/artifacts/prj915-dashboard-summary/dashboard-mobile.png`
- High-risk checks:
  - production was not mutated
  - temporary local backend was stopped
  - generated `.codex/tmp` and screenshot artifacts remain uncommitted

## Result Report

- Task summary: replaced dashboard summary demo metrics with runtime-derived
  counts and scaled visual indicators.
- Files changed:
  - `web/src/App.tsx`
  - `.codex/tasks/PRJ-915-backend-backed-dashboard-summary-surface.md`
  - `docs/planning/v1-backend-backed-dashboard-summary-surface.md`
  - `docs/planning/v1-release-audit-and-execution-plan.md`
  - `docs/planning/v1-core-acceptance-bundle.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Tests run:
  - `Push-Location .\web; npm run build; Pop-Location`
  - bundled Node + Playwright focused dashboard summary smoke
  - `git diff --check`
- Deployment impact: frontend-only dashboard display binding change; requires
  normal web redeploy after push.
- Next tiny task: `PRJ-916` Web Empty And Error State Audit.
