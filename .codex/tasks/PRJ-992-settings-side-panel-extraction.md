# Task

## Header
- ID: PRJ-992
- Title: Extract settings side panel presentation cluster from `web/src/App.tsx`
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-991
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 992
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

After PRJ-991, the settings preference grid used settings components, but the
proactive, save, and danger side panels still carried route-local presentation
chrome in `web/src/App.tsx`.

## Goal

Move settings side panel presentation into the settings component module without
changing save, reset, toggle, or confirmation behavior.

## Scope

- `web/src/App.tsx`
- `web/src/components/settings.tsx`
- `docs/frontend/route-component-map.md`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: settings side panel chrome was still hidden in the
  app monolith.
- Expected product or reliability outcome: settings route presentation
  ownership is clearer while form behavior remains route-owned.
- How success will be observed: build and full route smoke pass.
- Post-launch learning needed: no

## Deliverable For This Stage

Add settings side panel components and use them for proactive, save, and danger
panels.

## Constraints
- use existing systems and approved mechanisms
- do not move settings state, save/reset handlers, toggle handlers, or
  confirmation input handlers out of `App()`
- do not alter labels, values, route behavior, or visual classes
- do not open a visible browser window

## Implementation Plan
1. Add side panel shell components to `web/src/components/settings.tsx`.
2. Replace proactive, save, and danger panel wrappers in `App.tsx`.
3. Keep all controls and event handlers as children owned by `App()`.
4. Run web build and full route smoke.
5. Update docs and context.

## Acceptance Criteria
- Settings side panel wrappers no longer repeat inline in `App.tsx`.
- `web/src/components/settings.tsx` owns side panel presentation components.
- Settings save/reset/toggle behavior remains in `App.tsx`.
- `npm run build` passes.
- `npm run smoke:routes` passes with `route_count=14`.

## Definition of Done
- [x] Settings side panel shell extracted.
- [x] Settings behavior remains in `App()`.
- [x] Full route smoke validation completed.
- [x] Docs and context updated.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - result: `status=ok`, `route_count=14`
- Manual checks:
  - confirmed `/settings` uses side panel components
- High-risk checks:
  - toggle, submit, and reset handlers were not moved
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/frontend/route-component-map.md`
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Follow-up architecture doc updates:
  - route map now records settings side panel ownership

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: existing settings side panel markup
- Canonical visual target: unchanged
- Fidelity target: structurally_faithful
- Remaining mismatches: settings formatting helpers still live in `App.tsx`
- State checks: proactive toggle, save button, reset confirmation
- Responsive checks: route smoke only
- Accessibility checks: unchanged form controls and buttons
- Parity evidence: route smoke only

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Rollback note: inline settings side panel markup back into `App.tsx`
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

## Result Report

- Task summary: moved settings proactive, save, and danger panel presentation
  into `web/src/components/settings.tsx`.
- Files changed:
  - `web/src/App.tsx`
  - `web/src/components/settings.tsx`
  - `docs/frontend/route-component-map.md`
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
- What is incomplete:
  - settings formatting helpers still live in `App.tsx`
- Next steps:
  - extract settings formatting helpers into a small lib module
- Decisions made:
  - use `children` to keep controls and side effects route-owned

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: settings side panel chrome remained inline.
- Gaps: settings formatting helpers remain inline.
- Inconsistencies: settings preference cards were componentized but side panels
  were not.
- Architecture constraints: keep form side effects in the route owner.

### 2. Select One Priority Task
- Selected task: PRJ-992 settings side panel extraction.
- Priority rationale: direct follow-up to PRJ-991 with low behavior risk.
- Why other candidates were deferred: helper extraction should happen after the
  presentation shell is stable.

### 3. Plan Implementation
- Files or surfaces to modify: `App.tsx`, `components/settings.tsx`, docs/context.
- Logic: move only wrapper/title/body chrome.
- Edge cases: danger panel reset controls must remain route-owned.

### 4. Execute Implementation
- Implementation notes: extracted side panel shells with `children`.

### 5. Verify and Test
- Validation performed: web build and full route smoke.
- Result: both passed.

### 6. Self-Review
- Simpler option considered: extract only the save panel.
- Technical debt introduced: no
- Scalability assessment: settings presentation now has route-local state but
  component-owned shells.
- Refinements made: kept every form control in `App()`.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/frontend/route-component-map.md`
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
