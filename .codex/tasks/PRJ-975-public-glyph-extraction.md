# Task

## Header
- ID: PRJ-975
- Title: Extract public glyph component cluster from `web/src/App.tsx`
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-974
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 975
- Operation Mode: TESTER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

The public/auth shell still kept `PublicGlyph` inside `web/src/App.tsx` after
route, shared-panel, and authenticated shell extraction. The component is pure
presentational SVG selection used by public home proof and feature sections.

## Goal

Move `PublicGlyph` into a small public-shell component module without changing
public route behavior or copy.

## Scope

- `web/src/App.tsx`
- `web/src/components/public-shell.tsx`
- `docs/frontend/route-component-map.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: public-shell glyph markup was hidden in the app
  monolith.
- Expected product or reliability outcome: public shell ownership is clearer
  while route rendering remains behavior-compatible.
- How success will be observed: build and route smoke pass.
- Post-launch learning needed: no

## Deliverable For This Stage

Extract `PublicGlyph` to `web/src/components/public-shell.tsx`.

## Constraints
- use existing systems and approved mechanisms
- do not move auth state or public route render flow out of `App()`
- do not alter SVG markup, copy, route behavior, or visual classes
- do not open a visible browser window

## Implementation Plan
1. Add `web/src/components/public-shell.tsx`.
2. Move `PublicGlyph` unchanged into the new module.
3. Import `PublicGlyph` from `App.tsx`.
4. Run web build and route smoke.
5. Update docs and context.

## Acceptance Criteria
- `PublicGlyph` no longer lives in `App.tsx`.
- `web/src/components/public-shell.tsx` owns `PublicGlyph`.
- Public route usages still render through the imported component.
- `npm run build` passes.
- `npm run smoke:routes` passes.

## Definition of Done
- [x] Public glyph extracted.
- [x] Public/auth state remains in `App()`.
- [x] Behavior-preserving validation completed.
- [x] Docs and context updated.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - result: `status=ok`, `route_count=6`
- Manual checks:
  - confirmed `App.tsx` imports `PublicGlyph` and no longer defines it
- Screenshots/logs:
  - no screenshots; no visible behavior intentionally changed
- High-risk checks:
  - public glyph SVG markup was preserved
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
  - route map now records `PublicGlyph` under public-shell component ownership

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: existing public glyph markup
- Canonical visual target: unchanged
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: not applicable
- Visual-direction brief reviewed: not applicable
- Existing shared pattern reused: exact existing glyph SVG markup
- New shared pattern introduced: no
- Design-memory entry reused: not applicable
- Design-memory update required: no
- Visual gap audit completed: not applicable
- Background or decorative asset strategy: unchanged
- Canonical asset extraction required: no
- Screenshot comparison pass completed: no
- Remaining mismatches: auth modal, chat flow stages, and route-local views
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
- Rollback note: move `PublicGlyph` back into `App.tsx`
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

This is a pure extraction. Public route structure, auth modal flow, and copy
remain in `App()`.

## Production-Grade Required Contract

- Goal: clarify public-shell component ownership.
- Scope: public glyphs only.
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
- Existing workaround or pain: public glyphs embedded in monolith
- Smallest useful slice: one pure SVG component cluster
- Success metric or signal: build and route smoke pass
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: no

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: public route entry
- SLI: route smoke pass rate
- SLO: route smoke remains green after extraction
- Error budget posture: not applicable
- Health/readiness check: not applicable
- Logs, dashboard, or alert route: route smoke JSON output
- Smoke command or manual smoke: `npm run smoke:routes`
- Rollback or disable path: revert public glyph extraction

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
- Residual risk: public/auth render branch still remains in `App.tsx`

## Result Report

- Task summary: moved `PublicGlyph` into `web/src/components/public-shell.tsx`.
- Files changed:
  - `web/src/App.tsx`
  - `web/src/components/public-shell.tsx`
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
- What is incomplete:
  - auth modal, chat flow stages, icon primitives, and route-local views still
    live in `App.tsx`
- Next steps:
  - extract the next pure icon/control cluster or auth modal component cluster
- Decisions made:
  - use a dedicated public-shell component module instead of mixing public
    glyphs into authenticated shell chrome

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: `PublicGlyph` remained in `App.tsx`.
- Gaps: public/auth render branch remains large.
- Inconsistencies: public-shell presentational glyphs did not have a module
  owner.
- Architecture constraints: keep auth state and route flow in `App()`.

### 2. Select One Priority Task
- Selected task: PRJ-975 public glyph extraction.
- Priority rationale: smallest pure extraction after shell ownership work.
- Why other candidates were deferred: auth modal and route-local views have
  broader state coupling.

### 3. Plan Implementation
- Files or surfaces to modify: `App.tsx`, `components/public-shell.tsx`,
  docs/context.
- Logic: move glyph selection unchanged and import it.
- Edge cases: unknown glyph kind keeps the existing fallback SVG.

### 4. Execute Implementation
- Implementation notes: moved SVG selector without changing route render
  branches.

### 5. Verify and Test
- Validation performed: web build and route smoke.
- Result: both passed.

### 6. Self-Review
- Simpler option considered: leave glyph in `App.tsx`.
- Technical debt introduced: no
- Scalability assessment: public-shell ownership is now explicit.
- Refinements made: kept public auth modal out of scope.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
