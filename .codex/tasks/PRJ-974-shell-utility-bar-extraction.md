# Task

## Header
- ID: PRJ-974
- Title: Extract shell utility bar from `web/src/App.tsx`
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-973
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 974
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

`PRJ-973` moved navigation and branding helpers to `web/src/components/shell.tsx`.
`ShellUtilityBar` remained in `App.tsx` because it carried account-state props
and the persona asset dependency. This task moves it with explicit props.

## Goal

Move `ShellUtilityBar` into the shell component module without coupling that
module to app-level constants or changing account menu behavior.

## Scope

- `web/src/App.tsx`
- `web/src/components/shell.tsx`
- `docs/frontend/route-component-map.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: utility chrome still lived in `App.tsx` after
  nav/brand extraction.
- Expected product or reliability outcome: shell chrome ownership is clearer
  while app state remains in `App()`.
- How success will be observed: build and route smoke pass.
- Post-launch learning needed: no

## Deliverable For This Stage

Extract `ShellUtilityBar` to `web/src/components/shell.tsx` with an explicit
`avatarSrc` prop.

## Constraints
- use existing systems and approved mechanisms
- do not move account state out of `App()`
- do not import app-level constants into shell components
- do not alter shell layout, copy, or behavior
- do not open a visible browser window

## Implementation Plan
1. Move `ShellUtilityBar` into `components/shell.tsx`.
2. Add an explicit `avatarSrc` prop for the account portrait asset.
3. Import `ShellUtilityBar` from `App.tsx`.
4. Run web build and route smoke.
5. Update docs and context.

## Acceptance Criteria
- `ShellUtilityBar` no longer lives in `App.tsx`.
- `components/shell.tsx` owns the utility bar.
- `App.tsx` passes `avatarSrc={CANONICAL_PERSONA_FIGURE_SRC}`.
- `npm run build` passes.
- `npm run smoke:routes` passes.

## Definition of Done
- [x] Utility bar extracted.
- [x] Account state remains in `App()`.
- [x] Behavior-preserving validation completed.
- [x] Docs and context updated.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - result: `status=ok`, `route_count=6`
- Manual checks:
  - confirmed `App.tsx` imports `ShellUtilityBar` and no longer defines it
- Screenshots/logs:
  - no screenshots; no visual behavior was intentionally changed
- High-risk checks:
  - shell component receives persona image through explicit prop instead of
    importing app constants
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
  - route map now records `ShellUtilityBar` under shell component ownership

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: existing utility bar markup
- Canonical visual target: unchanged
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: not applicable
- Visual-direction brief reviewed: not applicable
- Existing shared pattern reused: exact existing utility bar markup/classes
- New shared pattern introduced: no
- Design-memory entry reused: not applicable
- Design-memory update required: no
- Visual gap audit completed: not applicable
- Background or decorative asset strategy: unchanged
- Canonical asset extraction required: no
- Screenshot comparison pass completed: no
- Remaining mismatches: public glyphs, chat flow stages, and route-local views
  still live in `App.tsx`
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
- Rollback note: move `ShellUtilityBar` back into `App.tsx`
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

The utility bar is now presentational. Account popover state and behavior stay
in `App()`.

## Production-Grade Required Contract

- Goal: complete shell chrome ownership extraction.
- Scope: utility bar only.
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
- Existing workaround or pain: utility chrome embedded in monolith
- Smallest useful slice: one component with explicit props
- Success metric or signal: build and route smoke pass
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: no

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: shell route entry and account chrome
- SLI: route smoke pass rate
- SLO: route smoke remains green after extraction
- Error budget posture: not applicable
- Health/readiness check: not applicable
- Logs, dashboard, or alert route: route smoke JSON output
- Smoke command or manual smoke: `npm run smoke:routes`
- Rollback or disable path: revert utility bar extraction

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
- Residual risk: route-local monolith still remains

## Result Report

- Task summary: moved `ShellUtilityBar` into `web/src/components/shell.tsx`.
- Files changed:
  - `web/src/App.tsx`
  - `web/src/components/shell.tsx`
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
- What is incomplete:
  - public glyphs, chat flow stages, and route-local views still live in
    `App.tsx`
- Next steps:
  - extract public glyphs or first route-local view cluster
- Decisions made:
  - use explicit `avatarSrc` prop to keep shell module independent from app
    constants

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: utility bar remained in `App.tsx`.
- Gaps: route-local render extraction remains queued.
- Inconsistencies: shell module did not yet own all core chrome.
- Architecture constraints: keep app state in `App()`.

### 2. Select One Priority Task
- Selected task: PRJ-974 shell utility bar extraction.
- Priority rationale: completes shell chrome extraction before route-local work.
- Why other candidates were deferred: route-local extraction has broader data
  and visual risk.

### 3. Plan Implementation
- Files or surfaces to modify: `App.tsx`, `components/shell.tsx`, docs/context.
- Logic: move utility bar and pass avatar source explicitly.
- Edge cases: account panel open state stays in `App()`.

### 4. Execute Implementation
- Implementation notes: shell module receives `avatarSrc`, not app constants.

### 5. Verify and Test
- Validation performed: web build and route smoke.
- Result: both passed.

### 6. Self-Review
- Simpler option considered: leave utility bar in `App.tsx`.
- Technical debt introduced: no
- Scalability assessment: shell component ownership is now coherent.
- Refinements made: kept account popover out of scope.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
