# Task

## Header
- ID: PRJ-979
- Title: Extract route summary/card component cluster from `web/src/App.tsx`
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-978
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 979
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

The dashboard hero rendered the same signal-card markup in both left and right
columns directly inside `web/src/App.tsx`. Route smoke coverage protects the
dashboard mount path.

## Goal

Move the repeated dashboard signal card renderer into a dashboard component
module without changing dashboard data derivation, placement filtering, or
route behavior.

## Scope

- `web/src/App.tsx`
- `web/src/components/dashboard.tsx`
- `docs/frontend/route-component-map.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: repeated dashboard card markup was duplicated in
  the app monolith.
- Expected product or reliability outcome: dashboard card ownership is clearer
  while dashboard data logic remains unchanged.
- How success will be observed: build and route smoke pass.
- Post-launch learning needed: no

## Deliverable For This Stage

Extract `DashboardSignalCard` to `web/src/components/dashboard.tsx`.

## Constraints
- use existing systems and approved mechanisms
- do not move dashboard data derivation out of `App()`
- do not alter markup, copy, route behavior, or visual classes
- do not open a visible browser window

## Implementation Plan
1. Add `web/src/components/dashboard.tsx`.
2. Move repeated dashboard signal-card markup into `DashboardSignalCard`.
3. Keep placement filtering and data construction in `App()`.
4. Run web build and route smoke.
5. Update docs and context.

## Acceptance Criteria
- Dashboard signal-card markup is no longer duplicated in `App.tsx`.
- `web/src/components/dashboard.tsx` owns `DashboardSignalCard`.
- Left and right dashboard columns still render from the same data.
- `npm run build` passes.
- `npm run smoke:routes` passes.

## Definition of Done
- [x] Dashboard signal card extracted.
- [x] Dashboard data derivation remains in `App()`.
- [x] Behavior-preserving validation completed.
- [x] Docs and context updated.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - result: `status=ok`, `route_count=6`
- Manual checks:
  - confirmed both dashboard signal columns use `DashboardSignalCard`
- Screenshots/logs:
  - no screenshots; no visible behavior intentionally changed
- High-risk checks:
  - dashboard signal data and placement filtering were untouched
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates:
  - route map now records `DashboardSignalCard` under dashboard component
    ownership

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: existing dashboard signal-card markup
- Canonical visual target: unchanged
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: not applicable
- Visual-direction brief reviewed: not applicable
- Existing shared pattern reused: exact existing signal-card markup/classes
- New shared pattern introduced: no
- Design-memory entry reused: not applicable
- Design-memory update required: no
- Visual gap audit completed: not applicable
- Background or decorative asset strategy: unchanged
- Canonical asset extraction required: no
- Screenshot comparison pass completed: no
- Remaining mismatches: route-local view bodies still live in `App.tsx`
- State checks: success
- Feedback locality checked: unchanged
- Raw technical errors hidden from end users: unchanged
- Responsive checks: route smoke only
- Input-mode checks: unchanged
- Accessibility checks: unchanged markup
- Parity evidence: route smoke only

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: inline `DashboardSignalCard` markup back into `App.tsx`
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

The route still owns dashboard signal data construction. This task only removes
duplicated presentational markup.

## Production-Grade Required Contract

- Goal: clarify dashboard card ownership.
- Scope: dashboard signal card renderer only.
- Implementation Plan: see above.
- Acceptance Criteria: see above.
- Definition of Done: see above.
- Result Report: see below.

## Integration Evidence

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: not applicable
- Endpoint and client contract match: unchanged
- DB schema and migrations verified: not applicable
- Loading state verified: unchanged
- Error state verified: unchanged
- Refresh/restart behavior verified: route smoke starts fresh per run
- Regression check performed: yes

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: future frontend maintainers and agents
- Existing workaround or pain: repeated dashboard card markup in monolith
- Smallest useful slice: one pure repeated dashboard card component
- Success metric or signal: build and route smoke pass
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: no

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: dashboard route entry
- SLI: route smoke pass rate
- SLO: route smoke remains green after extraction
- Error budget posture: not applicable
- Health/readiness check: not applicable
- Logs, dashboard, or alert route: route smoke JSON output
- Smoke command or manual smoke: `npm run smoke:routes`
- Rollback or disable path: revert dashboard signal-card extraction

## AI Testing Evidence

Not applicable; no AI behavior changed.

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: no data changed
- Trust boundaries: unchanged
- Permission or ownership checks: unchanged
- Abuse cases: not applicable
- Secret handling: no secrets touched
- Security tests or scans: not applicable
- Fail-closed behavior: unchanged
- Residual risk: route-local view bodies still remain in `App.tsx`

## Result Report

- Task summary: moved repeated dashboard signal card markup into
  `web/src/components/dashboard.tsx`.
- Files changed:
  - `web/src/App.tsx`
  - `web/src/components/dashboard.tsx`
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
- What is incomplete:
  - route-local view bodies and several repeated card shapes still live in
    `App.tsx`
- Next steps:
  - extract a small reusable stat-card component or continue route module
    decomposition behind the route-smoke gate
- Decisions made:
  - keep dashboard signal data and placement filtering in `App()`

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: dashboard signal-card markup was duplicated in left and right
  columns.
- Gaps: dashboard route module ownership is still partial.
- Inconsistencies: dashboard presentational cards had no component module
  owner.
- Architecture constraints: keep route data derivation unchanged.

### 2. Select One Priority Task
- Selected task: PRJ-979 dashboard signal-card extraction.
- Priority rationale: small repeated component with route-smoke coverage.
- Why other candidates were deferred: motif and auth components have asset,
  overlay, or state coupling.

### 3. Plan Implementation
- Files or surfaces to modify: `App.tsx`, `components/dashboard.tsx`,
  docs/context.
- Logic: replace duplicated article markup with `DashboardSignalCard`.
- Edge cases: left/right placement filtering remains unchanged.

### 4. Execute Implementation
- Implementation notes: extracted only stateless card markup.

### 5. Verify and Test
- Validation performed: web build and route smoke.
- Result: both passed.

### 6. Self-Review
- Simpler option considered: leave duplicated markup.
- Technical debt introduced: no
- Scalability assessment: dashboard component ownership can now grow gradually.
- Refinements made: avoided moving dashboard data construction.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
