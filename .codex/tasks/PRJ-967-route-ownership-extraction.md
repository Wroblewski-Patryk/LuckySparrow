# Task

## Header
- ID: PRJ-967
- Title: Split route ownership out of `web/src/App.tsx`
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-966
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 967
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

`web/src/App.tsx` remains the main browser-shell monolith. `PRJ-966` added a
headless route smoke, so the first safe split can move route ownership out of
the file without changing any UI surface or data flow.

## Goal

Create a dedicated route module for route types, route ordering,
normalization, and browser-history helpers while preserving current behavior.

## Scope

- `web/src/App.tsx`
- `web/src/routes.ts`
- `docs/frontend/route-component-map.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: route ownership was hidden inside a 300k+ line
  app shell file.
- Expected product or reliability outcome: route contract changes have a small
  owner file and can be smoke-tested directly.
- How success will be observed: build and route smoke pass after extraction.
- Post-launch learning needed: no

## Deliverable For This Stage

A behavior-preserving route ownership extraction and synchronized documentation.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it
- do not alter route copy, route UI, or visual layout

## Implementation Plan
1. Add `web/src/routes.ts`.
2. Move `RoutePath`, `ROUTES`, `normalizeRoute`, `navigate`, and
   `navigatePublicEntry` into the route module.
3. Import the route contract from `App.tsx`.
4. Run web build and headless route smoke.
5. Update frontend route map, roadmap, task board, and project state.

## Acceptance Criteria
- `App.tsx` no longer owns route type/list/history helpers.
- `web/src/routes.ts` owns route contract helpers.
- `npm run build` passes.
- `npm run smoke:routes` passes.
- Documentation records the new ownership split and remaining monolith gap.

## Definition of Done
- [x] Route ownership extracted.
- [x] Behavior-preserving validation completed.
- [x] Docs and context updated.
- [x] Remaining component-extraction gap stays explicit.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - result: `status=ok`, `route_count=6`
- Manual checks:
  - reviewed diff to confirm only route ownership moved
- Screenshots/logs:
  - no screenshots; no visual behavior changed
- High-risk checks:
  - route smoke proved root, login, dashboard, chat, personality, and tools
    still mount
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
  - route map now names `web/src/routes.ts` as route owner

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: existing app route shell
- Canonical visual target: unchanged
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: not applicable
- Visual-direction brief reviewed: not applicable
- Existing shared pattern reused: existing route helpers
- New shared pattern introduced: no
- Design-memory entry reused: not applicable
- Design-memory update required: no
- Visual gap audit completed: not applicable
- Background or decorative asset strategy: unchanged
- Canonical asset extraction required: no
- Screenshot comparison pass completed: no
- Remaining mismatches: route views and state still mostly live in `App.tsx`
- State checks: success
- Feedback locality checked: not applicable
- Raw technical errors hidden from end users: not applicable
- Responsive checks: not applicable
- Input-mode checks: not applicable
- Accessibility checks: not applicable
- Parity evidence: route smoke only

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no new smoke beyond PRJ-966 command
- Rollback note: move route helpers back into `App.tsx`
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

This intentionally does not extract route UI components yet. The next safe
frontend split should pick one route surface at a time behind the route smoke.

## Production-Grade Required Contract

- Goal: reduce route ownership hidden inside `App.tsx`.
- Scope: route contract extraction only.
- Implementation Plan: see above.
- Acceptance Criteria: see above.
- Definition of Done: see above.
- Result Report: see below.

## Integration Evidence

- `INTEGRATION_CHECKLIST.md` reviewed: yes
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
- Existing workaround or pain: route ownership was embedded in the monolith
- Smallest useful slice: route contract extraction
- Success metric or signal: build and route smoke pass
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: no

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: route entry and navigation
- SLI: route smoke pass rate
- SLO: route smoke remains green after route refactors
- Error budget posture: not applicable
- Health/readiness check: not applicable
- Logs, dashboard, or alert route: route smoke JSON output
- Smoke command or manual smoke: `npm run smoke:routes`
- Rollback or disable path: revert route module extraction

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
- Residual risk: component-level monolith still remains

## Result Report

- Task summary: moved route type/list/normalization/history helpers into
  `web/src/routes.ts`.
- Files changed:
  - `web/src/App.tsx`
  - `web/src/routes.ts`
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
- What is incomplete:
  - route-local components and state remain mostly inside `App.tsx`
- Next steps:
  - extract one low-risk route view or shared shell cluster behind route smoke
- Decisions made:
  - keep route labels and localized copy in `App.tsx` for this slice to avoid
    a broad copy/data refactor

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: route ownership was still mixed into the large app shell.
- Gaps: component-level ownership remains broad.
- Inconsistencies: route map still named `App.tsx` as route-list owner after
  route smoke became available.
- Architecture constraints: preserve thin client behavior and existing UI.

### 2. Select One Priority Task
- Selected task: PRJ-967 route ownership extraction.
- Priority rationale: it is the smallest safe `App.tsx` split after PRJ-966.
- Why other candidates were deferred: deeper component extraction has larger
  visual and state risk.

### 3. Plan Implementation
- Files or surfaces to modify: `App.tsx`, new `routes.ts`, docs/context.
- Logic: move pure route contract helpers and import them.
- Edge cases: root route still normalizes to `/login`; unknown routes still
  return `/login`.

### 4. Execute Implementation
- Implementation notes: no route copy, render branch, API call, or style was
  changed.

### 5. Verify and Test
- Validation performed: web build and route smoke.
- Result: both passed.

### 6. Self-Review
- Simpler option considered: leave route helpers in `App.tsx`.
- Technical debt introduced: no
- Scalability assessment: future route changes now have a smaller owner file.
- Refinements made: kept localized route copy out of scope to avoid churn.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
