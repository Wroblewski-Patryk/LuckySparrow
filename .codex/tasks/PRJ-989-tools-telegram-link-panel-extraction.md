# Task

## Header
- ID: PRJ-989
- Title: Extract tools Telegram link panel from `web/src/App.tsx`
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-988
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 989
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

After the tools card extractions, the Telegram link-code panel was the last
large route-local tools presentation block. It contains a button but the
side-effect owner is the existing `handleStartTelegramLink()` route handler.

## Goal

Move the Telegram link-code panel presentation into the tools component module
without changing the link-start API path, busy state, generated-code rendering,
or route-level eligibility conditions.

## Scope

- `web/src/App.tsx`
- `web/src/components/tools.tsx`
- `docs/frontend/route-component-map.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: the remaining Telegram link panel made tools route
  ownership harder to scan.
- Expected product or reliability outcome: Telegram linking remains route-owned
  while presentation is reusable and isolated.
- How success will be observed: build and full route smoke pass.
- Post-launch learning needed: no

## Deliverable For This Stage

Extract `ToolsTelegramLinkPanel` to `web/src/components/tools.tsx` and keep
route conditions, busy state, and handler ownership in `App()`.

## Constraints
- use existing systems and approved mechanisms
- do not move tools overview API calls or state out of `App()`
- do not alter labels, values, route behavior, link-start behavior, or visual
  classes
- keep side effects in the existing route handler
- do not open a visible browser window

## Implementation Plan
1. Add `ToolsTelegramLinkPanel` with explicit text, state, and callback props.
2. Replace the inline Telegram link-code panel in `App.tsx`.
3. Keep eligibility conditions and `handleStartTelegramLink()` in `App()`.
4. Run web build and full route smoke.
5. Update docs and context.

## Acceptance Criteria
- Telegram link-code panel markup no longer lives inline in `App.tsx`.
- `web/src/components/tools.tsx` owns `ToolsTelegramLinkPanel`.
- Route-level eligibility and side-effect handler remain in `App.tsx`.
- `npm run build` passes.
- `npm run smoke:routes` passes with `route_count=14`.

## Definition of Done
- [x] Telegram link panel extracted.
- [x] Link-start side effect remains in `App()`.
- [x] Full route smoke validation completed.
- [x] Docs and context updated.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - result: `status=ok`, `route_count=14`
- Manual checks:
  - confirmed `/tools` uses `ToolsTelegramLinkPanel`
- High-risk checks:
  - route eligibility condition and `handleStartTelegramLink()` were not moved
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Follow-up architecture doc updates:
  - route map now records Telegram tools panel ownership

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: existing Telegram link-code panel markup
- Canonical visual target: unchanged
- Fidelity target: structurally_faithful
- Remaining mismatches: none in the tools card/panel extraction cluster
- State checks: no-code and generated-code states
- Responsive checks: route smoke only
- Accessibility checks: unchanged button and text semantics
- Parity evidence: route smoke only

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Rollback note: inline `ToolsTelegramLinkPanel` markup back into `App.tsx`
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

- Task summary: moved Telegram link-code panel presentation into
  `web/src/components/tools.tsx`.
- Files changed:
  - `web/src/App.tsx`
  - `web/src/components/tools.tsx`
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
- What is incomplete:
  - broader route splitting remains a future slice
- Next steps:
  - audit remaining `App.tsx` route-local clusters and choose the next
    highest-value extraction
- Decisions made:
  - component receives an `onStart` callback; API side effects stay route-owned

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: Telegram link-code panel remained route-local.
- Gaps: broader `App.tsx` route rendering is still large.
- Inconsistencies: tools presentation was split across component module and
  route monolith.
- Architecture constraints: side effects belong in action/integration owners,
  not inside generic presentation.

### 2. Select One Priority Task
- Selected task: PRJ-989 tools Telegram link panel extraction.
- Priority rationale: closes the tools presentation cluster started in PRJ-985.
- Why other candidates were deferred: other routes need separate audits.

### 3. Plan Implementation
- Files or surfaces to modify: `App.tsx`, `components/tools.tsx`, docs/context.
- Logic: move presentational panel and pass explicit labels/state/callback.
- Edge cases: generated-code and no-code states must render identically.

### 4. Execute Implementation
- Implementation notes: extracted panel while retaining route eligibility and
  handler ownership.

### 5. Verify and Test
- Validation performed: web build and full route smoke.
- Result: both passed.

### 6. Self-Review
- Simpler option considered: leave Telegram panel inline because it has a
  button.
- Technical debt introduced: no
- Scalability assessment: tools presentation is now concentrated in one module
  without moving route state.
- Refinements made: used a structural `linkStart` prop instead of importing API
  response types into the component module.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
