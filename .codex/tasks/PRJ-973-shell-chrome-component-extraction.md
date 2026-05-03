# Task

## Header
- ID: PRJ-973
- Title: Extract shell chrome component cluster from `web/src/App.tsx`
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-972
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 973
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

Shared route panels now live outside `App.tsx`, but shell chrome still had
presentational navigation and branding helpers embedded in the main app file.
This task extracts a narrow shell subcluster while keeping stateful utility
chrome inside `App.tsx`.

## Goal

Move navigation-icon, nav-button, wordmark, and sidebar-brand presentation
helpers to a dedicated shell component module without changing behavior.

## Scope

- `web/src/App.tsx`
- `web/src/components/shell.tsx`
- `docs/frontend/route-component-map.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: shell navigation ownership was still hidden inside
  `App.tsx`.
- Expected product or reliability outcome: shell branding/navigation helpers
  have a small owner module.
- How success will be observed: build and route smoke pass.
- Post-launch learning needed: no

## Deliverable For This Stage

Extract `SidebarIconKind`, `SidebarGlyph`, `ShellNavButton`,
`AviaryWordmark`, and `SidebarBrandBlock` to `web/src/components/shell.tsx`.

## Constraints
- use existing systems and approved mechanisms
- do not alter shell layout, route behavior, or nav state
- do not move `ShellUtilityBar` in this slice
- do not open a visible browser window
- stay within the declared current stage unless explicit approval changes it

## Implementation Plan
1. Add `web/src/components/shell.tsx`.
2. Move the selected pure shell chrome helpers into that module.
3. Import shell helpers and `SidebarIconKind` from `App.tsx`.
4. Run web build and headless route smoke.
5. Update docs and context.

## Acceptance Criteria
- Selected shell helpers no longer live in `App.tsx`.
- `components/shell.tsx` exports shell chrome helpers and icon type.
- `npm run build` passes.
- `npm run smoke:routes` passes.
- Docs record remaining `ShellUtilityBar` and route-rendering ownership.

## Definition of Done
- [x] Shell chrome subcluster extracted.
- [x] Behavior-preserving validation completed.
- [x] Docs and context updated.
- [x] Remaining shell/route extraction target stays explicit.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - result: `status=ok`, `route_count=6`
- Manual checks:
  - confirmed `App.tsx` no longer defines selected shell chrome helpers
- Screenshots/logs:
  - no screenshots; no visual behavior was intentionally changed
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
  - route map now records `web/src/components/shell.tsx`

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: existing shell chrome markup
- Canonical visual target: unchanged
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: not applicable
- Visual-direction brief reviewed: not applicable
- Existing shared pattern reused: exact existing shell markup/classes
- New shared pattern introduced: no
- Design-memory entry reused: not applicable
- Design-memory update required: no
- Visual gap audit completed: not applicable
- Background or decorative asset strategy: unchanged
- Canonical asset extraction required: no
- Screenshot comparison pass completed: no
- Remaining mismatches: `ShellUtilityBar` and route rendering still live in
  `App.tsx`
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
- Rollback note: move the shell helpers back into `App.tsx`
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

`ShellUtilityBar` remains in `App.tsx` because it depends on account state and
the persona asset constant. It can move in a follow-up with explicit props.

## Production-Grade Required Contract

- Goal: continue frontend component ownership extraction.
- Scope: pure shell chrome subcluster only.
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
- Existing workaround or pain: shell chrome helpers were embedded in monolith
- Smallest useful slice: branding/navigation helper extraction
- Success metric or signal: build and route smoke pass
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: no

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: shell navigation and route entry
- SLI: route smoke pass rate
- SLO: route smoke remains green after extraction
- Error budget posture: not applicable
- Health/readiness check: not applicable
- Logs, dashboard, or alert route: route smoke JSON output
- Smoke command or manual smoke: `npm run smoke:routes`
- Rollback or disable path: revert shell extraction

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

- Task summary: moved branding and nav helper components into
  `web/src/components/shell.tsx`.
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
  - `ShellUtilityBar`, public glyphs, chat flow stages, and route-local views
    still live in `App.tsx`
- Next steps:
  - extract `ShellUtilityBar` or a low-risk route-local component cluster
- Decisions made:
  - keep utility bar out of this slice to avoid mixing account-state props

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: shell nav/branding helpers still lived in `App.tsx`.
- Gaps: stateful utility chrome remains.
- Inconsistencies: route map did not yet identify shell module ownership.
- Architecture constraints: preserve route behavior and shell visuals.

### 2. Select One Priority Task
- Selected task: PRJ-973 shell chrome component extraction.
- Priority rationale: next smallest pure component cluster.
- Why other candidates were deferred: utility bar and route-local views have
  broader prop/state surfaces.

### 3. Plan Implementation
- Files or surfaces to modify: `App.tsx`, `components/shell.tsx`, docs/context.
- Logic: move type, icon renderer, nav button, wordmark, and brand block.
- Edge cases: keep icon type exported for route nav entries.

### 4. Execute Implementation
- Implementation notes: moved only pure shell chrome helpers.

### 5. Verify and Test
- Validation performed: web build and route smoke.
- Result: both passed.

### 6. Self-Review
- Simpler option considered: include `ShellUtilityBar` now.
- Technical debt introduced: no
- Scalability assessment: utility bar can move next with explicit props.
- Refinements made: kept account-state utility chrome out of scope.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
