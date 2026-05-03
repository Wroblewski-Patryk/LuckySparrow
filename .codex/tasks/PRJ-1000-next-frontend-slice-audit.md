# Task

## Header
- ID: PRJ-1000
- Title: Audit next v1 frontend architecture slice after helper cleanup
- Task Type: documentation
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-999
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1000
- Operation Mode: TESTER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

After tools, settings, module side panels, learned-state helpers, and metric
helpers were extracted, `App.tsx` still owns chat helpers, route labels,
health/channel posture, and large route render branches.

## Goal

Choose the next behavior-preserving frontend architecture slice.

## Scope

- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: remaining `App.tsx` work could drift into a broad
  chat/dashboard rewrite.
- Expected product or reliability outcome: next slice is narrow and testable.
- How success will be observed: audit selects the next implementation task.

## Deliverable For This Stage

Update docs and context with the next slice decision.

## Constraints
- do not change runtime code in this task
- avoid broad chat composer or markdown renderer movement
- avoid dashboard/personality flagship visual moves without screenshot-parity
  scope

## Implementation Plan
1. Inspect remaining route branches and helper clusters.
2. Compare chat transcript helpers, health/channel helpers, route label helpers,
   and visual route branches.
3. Select the smallest next implementation slice.
4. Update docs and context.
5. Run `git diff --check`.

## Acceptance Criteria
- Audit records current route/helper posture after PRJ-999.
- PRJ-1001 is added to the roadmap.
- `git diff --check` passes.

## Definition of Done
- [x] Next frontend slice selected.
- [x] Roadmap and context updated.
- [x] Diff validation completed.

## Validation Evidence
- Tests:
  - `git diff --check`
  - result: passed
- Manual checks:
  - confirmed `App.tsx` is now 5969 lines
  - confirmed chat transcript metadata helpers are pure and non-JSX

## Result Report

- Task summary: selected chat transcript metadata helper extraction as PRJ-1001.
- Files changed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `git diff --check`
- What is incomplete:
  - PRJ-1001 implementation remains next
