# V1 Backend-Backed Dashboard Summary Surface

Last updated: 2026-05-03

## Status

`PRJ-915` is DONE.

The dashboard summary surface no longer uses fixed demo percentages, weekday
memory bars, static reflection highlights, or a fixed current phase.

## Evidence

Validation commands and results:

- `Push-Location .\web; npm run build; Pop-Location`
  - passed
- bundled Node + Playwright focused `/dashboard` summary smoke against local
  Vite and local backend:
  - `checks=2`
  - `failures=0`
  - `unexpectedConsoleIssueCount=0`
  - `benignConsoleIssueCount=2`
  - `screenshots=2`
- `git diff --check`
  - passed

The two benign console issues were expected unauthenticated `401` responses
from `/app/me` while checking `/login` before local registration.

## Product-Honesty Changes

`web/src/App.tsx` now derives dashboard summary values from already-loaded
runtime surfaces:

- active goals, active tasks, blocked tasks, and pending proposals from
  `planning_state.continuity_summary`
- learned memory, affective conclusions, preferences, and relations from
  `learned_knowledge` and `identity_state`
- ready tool count from `/app/tools/overview`
- current phase from the strongest active runtime layer: action, planning,
  reflection, or context

The previous fixed values were removed from `/dashboard`:

- `72%`
- `58%`
- `41%`
- `33%`
- `Mon` through `Sun` fake memory history labels

## Evidence Artifacts

Local, uncommitted artifacts:

- `.codex/artifacts/prj915-dashboard-summary/dashboard-summary-smoke-results.json`
- `.codex/artifacts/prj915-dashboard-summary/dashboard-desktop.png`
- `.codex/artifacts/prj915-dashboard-summary/dashboard-mobile.png`

## Notes

This task intentionally stayed inside the dashboard summary surface. Broader
route empty/error state behavior remains in `PRJ-916`.

Production route evidence still requires a fresh deploy parity smoke after the
commit is pushed and deployed.
