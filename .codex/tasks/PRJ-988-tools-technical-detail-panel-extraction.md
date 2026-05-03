# Task

## Header
- ID: PRJ-988
- Title: Extract tools technical-detail panel component cluster from `web/src/App.tsx`
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-987
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 988
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

The tools route still rendered capability and source-of-truth technical panels
inline inside the tools `<details>` disclosure.

## Goal

Move the repeated tools technical-detail panel presentation into the tools
component module without changing disclosure, capability, or source-of-truth
behavior.

## Scope

- `web/src/App.tsx`
- `web/src/components/tools.tsx`
- `docs/frontend/route-component-map.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: tools technical detail presentation was still hidden
  in the app monolith.
- Expected product or reliability outcome: tools route component ownership is
  clearer while details disclosure stays stable.
- How success will be observed: build and full route smoke pass.
- Post-launch learning needed: no

## Deliverable For This Stage

Extract `ToolsTechnicalDetailPanel` to `web/src/components/tools.tsx` and use it
for capability and source-of-truth panels.

## Constraints
- use existing systems and approved mechanisms
- do not move tools overview API calls or state out of `App()`
- do not alter labels, values, route behavior, disclosure behavior, or visual
  classes
- do not open a visible browser window

## Implementation Plan
1. Add a small technical-detail panel component with values and empty state.
2. Preserve the capability and source-of-truth chip styling variants.
3. Replace the two inline panels in `App.tsx`.
4. Run web build and full route smoke.
5. Update docs and context.

## Acceptance Criteria
- Tools capability and source-of-truth technical panels no longer repeat inline
  in `App.tsx`.
- `web/src/components/tools.tsx` owns `ToolsTechnicalDetailPanel`.
- The tools `<details>` disclosure remains in `App.tsx`.
- `npm run build` passes.
- `npm run smoke:routes` passes with `route_count=14`.

## Definition of Done
- [x] Tools technical-detail panel extracted.
- [x] Disclosure behavior and tools overview state remain in `App()`.
- [x] Full route smoke validation completed.
- [x] Docs and context updated.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - result: `status=ok`, `route_count=14`
- Manual checks:
  - confirmed `/tools` uses `ToolsTechnicalDetailPanel`
- High-risk checks:
  - `<details>`/`<summary>` disclosure was not moved
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
  - route map now records tools technical-detail panel ownership

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: existing tools technical-detail panel markup
- Canonical visual target: unchanged
- Fidelity target: structurally_faithful
- Remaining mismatches: Telegram link-code panel still lives in `App.tsx`
- State checks: success and empty data states
- Responsive checks: route smoke only
- Accessibility checks: unchanged disclosure markup
- Parity evidence: route smoke only

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Rollback note: inline `ToolsTechnicalDetailPanel` markup back into `App.tsx`
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

- Task summary: moved tools capability and source-of-truth technical panel
  presentation into `web/src/components/tools.tsx`.
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
  - Telegram link-code panel still lives in `App.tsx`
- Next steps:
  - extract or intentionally leave the Telegram link-code panel after a
    behavior-risk check
- Decisions made:
  - keep the details disclosure in `App()`

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: tools technical panels repeated inline.
- Gaps: Telegram link-code panel remains inline.
- Inconsistencies: tools component ownership was still missing technical panels.
- Architecture constraints: keep tools state/API in `App()`.

### 2. Select One Priority Task
- Selected task: PRJ-988 tools technical-detail panel extraction.
- Priority rationale: small presentational cleanup protected by route smoke.
- Why other candidates were deferred: Telegram link-code panel has action and
  generated-code state, so it needs a separate behavior-risk check.

### 3. Plan Implementation
- Files or surfaces to modify: `App.tsx`, `components/tools.tsx`, docs/context.
- Logic: move only values-to-chip rendering and empty state.
- Edge cases: preserve capability/source chip styling difference.

### 4. Execute Implementation
- Implementation notes: extracted a values-based panel with a `chipTone` option.

### 5. Verify and Test
- Validation performed: web build and full route smoke.
- Result: both passed.

### 6. Self-Review
- Simpler option considered: leave technical panels inline.
- Technical debt introduced: no
- Scalability assessment: tools route presentation now has reusable primitives
  for summary, fact, detail, and technical panels.
- Refinements made: avoided moving details disclosure.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
