# Task

## Header
- ID: PRJ-993
- Title: Extract settings formatting helpers from `web/src/App.tsx`
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-992
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 993
- Operation Mode: ARCHITECT

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

After settings presentation extraction, language and UTC offset options and
normalization helpers still lived in `web/src/App.tsx`.

## Goal

Move settings formatting types, options, and helper functions into a small lib
module without changing bootstrap, settings, or display behavior.

## Scope

- `web/src/App.tsx`
- `web/src/lib/settings-formatting.ts`
- `docs/frontend/route-component-map.md`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: settings formatting behavior was mixed into the app
  render/state monolith.
- Expected product or reliability outcome: settings helper ownership is explicit
  and reusable.
- How success will be observed: build and full route smoke pass.
- Post-launch learning needed: no

## Deliverable For This Stage

Add `web/src/lib/settings-formatting.ts` and import the settings types, option
lists, and helper functions from it.

## Constraints
- use existing systems and approved mechanisms
- do not change option values, labels, normalization behavior, or settings
  bootstrap behavior
- do not move settings state or handlers out of `App()`
- do not open a visible browser window

## Implementation Plan
1. Create a settings formatting helper module.
2. Move language/UTC option types and constants into the module.
3. Move normalization and display helpers into the module.
4. Import those helpers from `App.tsx`.
5. Run web build and full route smoke.
6. Update docs and context.

## Acceptance Criteria
- Settings formatting helpers no longer live in `App.tsx`.
- `web/src/lib/settings-formatting.ts` owns language/UTC option helpers.
- Settings bootstrap and route behavior remain unchanged.
- `npm run build` passes.
- `npm run smoke:routes` passes with `route_count=14`.

## Definition of Done
- [x] Settings formatting helpers extracted.
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
  - confirmed `App.tsx` imports settings helpers from `web/src/lib/settings-formatting.ts`
- High-risk checks:
  - option labels and UTC generation logic were preserved
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
  - route map now records settings formatting helper ownership

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: existing settings option labels
- Canonical visual target: unchanged
- Fidelity target: structurally_faithful
- Remaining mismatches: broader route rendering remains in `App.tsx`
- State checks: language and UTC option rendering
- Responsive checks: route smoke only
- Accessibility checks: unchanged form controls
- Parity evidence: route smoke only

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Rollback note: inline settings helpers back into `App.tsx`
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

- Task summary: moved settings language and UTC offset helpers into
  `web/src/lib/settings-formatting.ts`.
- Files changed:
  - `web/src/App.tsx`
  - `web/src/lib/settings-formatting.ts`
  - `docs/frontend/route-component-map.md`
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
- What is incomplete:
  - broader route rendering remains in `App.tsx`
- Next steps:
  - audit the next route-local extraction target after settings cleanup
- Decisions made:
  - move option lists with their helpers to avoid split ownership

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: settings helper ownership remained inside `App.tsx`.
- Gaps: route rendering is still broad.
- Inconsistencies: settings components were extracted but their formatter helpers
  were not.
- Architecture constraints: preserve settings bootstrap behavior.

### 2. Select One Priority Task
- Selected task: PRJ-993 settings formatting helper extraction.
- Priority rationale: direct follow-up to settings presentation extraction.
- Why other candidates were deferred: next route work should start after
  settings ownership is coherent.

### 3. Plan Implementation
- Files or surfaces to modify: `App.tsx`, `lib/settings-formatting.ts`,
  docs/context.
- Logic: move types, option constants, and pure formatting functions.
- Edge cases: browser language detection must remain guarded for non-browser
  environments.

### 4. Execute Implementation
- Implementation notes: extracted a lib module and imported its public surface.

### 5. Verify and Test
- Validation performed: web build and full route smoke.
- Result: both passed.

### 6. Self-Review
- Simpler option considered: move only `normalizeUtcOffset`.
- Technical debt introduced: no
- Scalability assessment: settings route now has both component and helper
  ownership split out.
- Refinements made: kept option lists with helpers to avoid drift.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/frontend/route-component-map.md`
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
