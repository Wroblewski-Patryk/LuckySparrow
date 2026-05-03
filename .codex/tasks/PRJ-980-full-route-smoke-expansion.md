# Task

## Header
- ID: PRJ-980
- Title: Expand frontend route smoke before broad stat-card extraction
- Task Type: test
- Current Stage: release
- Status: DONE
- Owner: QA/Test
- Depends on: PRJ-979
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 980
- Operation Mode: TESTER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

`PRJ-979` extracted a dashboard card safely because `/dashboard` was covered by
the headless route smoke. The next planned stat-card extraction affects routes
such as `/memory`, `/reflections`, `/plans`, `/goals`, `/insights`,
`/automations`, `/integrations`, and `/settings`, which were not yet in the
route smoke set.

## Goal

Expand the headless route smoke to every current app route before broad route
card extraction continues.

## Scope

- `web/scripts/route-smoke.mjs`
- `docs/frontend/route-component-map.md`
- `docs/engineering/testing.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: route refactors could miss unmounted secondary
  routes because smoke coverage was partial.
- Expected product or reliability outcome: every current route has a stable
  headless mount marker before further route-component extraction.
- How success will be observed: `npm run smoke:routes` reports all routes
  passing.
- Post-launch learning needed: no

## Deliverable For This Stage

Expand `web/scripts/route-smoke.mjs` from 6 route checks to 14 route checks.

## Constraints
- use existing systems and approved mechanisms
- do not open a visible browser window
- do not change route behavior or mock API semantics beyond route coverage
- do not refactor route components in this task

## Implementation Plan
1. Add all authenticated app routes to `ROUTES` in `route-smoke.mjs`.
2. Reuse existing synthetic app API responses.
3. Run web build and route smoke.
4. Update docs and context.
5. Defer broad stat-card extraction to the next task.

## Acceptance Criteria
- Route smoke covers `/`, `/login`, and every route in `web/src/routes.ts`.
- `npm run build` passes.
- `npm run smoke:routes` passes with `route_count=14`.
- Docs describe full route smoke coverage.

## Definition of Done
- [x] Full route smoke coverage added.
- [x] Build and smoke validation completed.
- [x] Docs and context updated.
- [x] Next extraction task is re-queued behind the stronger gate.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - result: `status=ok`, `route_count=14`
- Manual checks:
  - route list compared with `web/src/routes.ts`
- Screenshots/logs:
  - route smoke JSON output only
- High-risk checks:
  - Chrome/Edge remains headless via existing `windowsHide: true` spawn
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/frontend/route-component-map.md`
  - `docs/engineering/testing.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates:
  - route smoke docs now describe full app-route coverage

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: existing route markers
- Canonical visual target: unchanged
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: not applicable
- Visual-direction brief reviewed: not applicable
- Existing shared pattern reused: existing headless route smoke
- New shared pattern introduced: no
- Design-memory entry reused: not applicable
- Design-memory update required: no
- Visual gap audit completed: not applicable
- Background or decorative asset strategy: unchanged
- Canonical asset extraction required: no
- Screenshot comparison pass completed: no
- Remaining mismatches: route smoke is a mount guard, not screenshot parity
- State checks: success
- Feedback locality checked: unchanged
- Raw technical errors hidden from end users: unchanged
- Responsive checks: not applicable
- Input-mode checks: not applicable
- Accessibility checks: not applicable
- Parity evidence: route smoke only

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: remove added route entries from `route-smoke.mjs`
- Observability or alerting impact: none
- Staged rollout or feature flag: not applicable

## Review Checklist
- [x] Process self-audit completed before implementation.
- [x] Autonomous loop evidence covers all seven steps.
- [x] Exactly one priority task was completed in this iteration.
- [x] Operation mode was selected according to iteration rotation.
- [x] Current stage is declared and respected.
- [x] Deliverable for the current stage is complete.
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated if repository truth changed.
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Notes

The planned shared stat-card extraction was deferred one step because it would
touch routes that lacked route-smoke coverage.

## Production-Grade Required Contract

- Goal: strengthen route refactor safety.
- Scope: headless route smoke coverage only.
- Implementation Plan: see above.
- Acceptance Criteria: see above.
- Definition of Done: see above.
- Result Report: see below.

## Integration Evidence

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: not applicable
- Endpoint and client contract match: synthetic API fixtures still match
  app-facing route needs
- DB schema and migrations verified: not applicable
- Loading state verified: route mount smoke only
- Error state verified: not applicable
- Refresh/restart behavior verified: route smoke starts fresh per run
- Regression check performed: yes

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: future frontend maintainers and agents
- Existing workaround or pain: only 6 routes were covered by route smoke
- Smallest useful slice: add all current route markers to existing smoke
- Success metric or signal: `route_count=14`, `status=ok`
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: no

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: app route entry
- SLI: route smoke pass rate
- SLO: all current routes mount in smoke after production build
- Error budget posture: not applicable
- Health/readiness check: not applicable
- Logs, dashboard, or alert route: route smoke JSON output
- Smoke command or manual smoke: `npm run smoke:routes`
- Rollback or disable path: revert route smoke list expansion

## AI Testing Evidence

Not applicable; no AI behavior changed.

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: synthetic route smoke data only
- Trust boundaries: unchanged
- Permission or ownership checks: unchanged
- Abuse cases: not applicable
- Secret handling: no secrets touched
- Security tests or scans: not applicable
- Fail-closed behavior: route smoke exits non-zero when any marker is missing
- Residual risk: route smoke does not validate interactions or screenshots

## Result Report

- Task summary: expanded `web/scripts/route-smoke.mjs` to cover all current
  public and authenticated routes.
- Files changed:
  - `web/scripts/route-smoke.mjs`
  - `docs/frontend/route-component-map.md`
  - `docs/engineering/testing.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
- What is incomplete:
  - shared stat-card extraction remains queued behind this stronger gate
- Next steps:
  - `PRJ-981` extract shared stat-card component cluster
- Decisions made:
  - strengthen route coverage before broader component extraction

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: planned route-card extraction would affect routes outside smoke
  coverage.
- Gaps: route smoke covered 6 routes, while `web/src/routes.ts` exposes 12
  authenticated routes plus public entry routes.
- Inconsistencies: route map documented all routes, smoke only checked core
  routes.
- Architecture constraints: improve validation before broader refactor.

### 2. Select One Priority Task
- Selected task: PRJ-980 full route smoke expansion.
- Priority rationale: safer prerequisite for shared stat-card extraction.
- Why other candidates were deferred: stat-card extraction can proceed after
  full route mount coverage exists.

### 3. Plan Implementation
- Files or surfaces to modify: route smoke script, testing docs, route map,
  planning/context docs.
- Logic: add current route markers to existing route smoke list.
- Edge cases: public `/` and `/login` remain unauthenticated.

### 4. Execute Implementation
- Implementation notes: reused existing mock API fixtures.

### 5. Verify and Test
- Validation performed: web build and route smoke.
- Result: both passed.

### 6. Self-Review
- Simpler option considered: proceed directly to stat-card extraction.
- Technical debt introduced: no
- Scalability assessment: future route work now has broader mount coverage.
- Refinements made: kept this task to route coverage only.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/frontend/route-component-map.md`
  - `docs/engineering/testing.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
