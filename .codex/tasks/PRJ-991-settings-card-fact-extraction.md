# Task

## Header
- ID: PRJ-991
- Title: Extract settings preference card/fact presentation cluster from `web/src/App.tsx`
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-990
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 991
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

`PRJ-990` selected settings preference cards as the next low-risk extraction
because the branch repeats card and fact chrome while keeping form state in
`App()`.

## Goal

Move settings preference card and fact presentation into a settings component
module without changing form state, handlers, labels, or route behavior.

## Scope

- `web/src/App.tsx`
- `web/src/components/settings.tsx`
- `docs/frontend/route-component-map.md`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: settings route presentation was hidden in the app
  monolith.
- Expected product or reliability outcome: settings component ownership begins
  without moving form behavior.
- How success will be observed: build and full route smoke pass.
- Post-launch learning needed: no

## Deliverable For This Stage

Add `SettingsCard` and `SettingsFact` and use them in the settings preference
card grid.

## Constraints
- use existing systems and approved mechanisms
- do not move settings state, save/reset handlers, or input event handlers out
  of `App()`
- do not alter labels, values, route behavior, or visual classes
- do not open a visible browser window

## Implementation Plan
1. Add `web/src/components/settings.tsx`.
2. Move repeated settings card chrome into `SettingsCard`.
3. Move settings fact chrome into `SettingsFact`.
4. Keep all form controls and event handlers in `App.tsx`.
5. Run web build and full route smoke.
6. Update docs and context.

## Acceptance Criteria
- Settings preference card wrappers no longer repeat inline in `App.tsx`.
- `web/src/components/settings.tsx` owns `SettingsCard` and `SettingsFact`.
- Settings form state and handlers remain in `App.tsx`.
- `npm run build` passes.
- `npm run smoke:routes` passes with `route_count=14`.

## Definition of Done
- [x] Settings preference card/fact shell extracted.
- [x] Settings state and handlers remain in `App()`.
- [x] Full route smoke validation completed.
- [x] Docs and context updated.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - result: `status=ok`, `route_count=14`
- Manual checks:
  - confirmed `/settings` uses `SettingsCard` and `SettingsFact`
- High-risk checks:
  - save/reset/form handlers were not moved
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
  - route map now records settings component ownership

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: existing settings preference card markup
- Canonical visual target: unchanged
- Fidelity target: structurally_faithful
- Remaining mismatches: settings side panels still live in `App.tsx`
- State checks: form, fact, and static preference cards
- Responsive checks: route smoke only
- Accessibility checks: unchanged form controls
- Parity evidence: route smoke only

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Rollback note: inline settings card/fact markup back into `App.tsx`
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

- Task summary: moved settings preference card and fact presentation into
  `web/src/components/settings.tsx`.
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
  - settings side panels still live in `App.tsx`
- Next steps:
  - extract settings side panel chrome or settings formatting helpers
- Decisions made:
  - keep settings form controls and handlers route-owned

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: settings cards repeated wrapper/fact markup inline.
- Gaps: settings side panels remain inline.
- Inconsistencies: tools had component ownership while settings did not.
- Architecture constraints: keep form side effects in the route owner.

### 2. Select One Priority Task
- Selected task: PRJ-991 settings card/fact extraction.
- Priority rationale: selected by PRJ-990 as the next lower-risk slice.
- Why other candidates were deferred: chat/dashboard are more behavior or visual
  parity sensitive.

### 3. Plan Implementation
- Files or surfaces to modify: `App.tsx`, `components/settings.tsx`, docs/context.
- Logic: move only presentation wrappers and fact shell.
- Edge cases: accessory header and lead card class must preserve markup.

### 4. Execute Implementation
- Implementation notes: extracted `SettingsCard` with optional accessory and
  `SettingsFact`.

### 5. Verify and Test
- Validation performed: web build and full route smoke.
- Result: both passed.

### 6. Self-Review
- Simpler option considered: extract only facts.
- Technical debt introduced: no
- Scalability assessment: settings component ownership can now grow gradually.
- Refinements made: avoided moving form controls or settings helpers.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/frontend/route-component-map.md`
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
