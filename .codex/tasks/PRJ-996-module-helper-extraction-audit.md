# Task

## Header
- ID: PRJ-996
- Title: Audit module route helper extraction after side-panel cleanup
- Task Type: documentation
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-995
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 996
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

After shared module side-panel extraction, helper ownership is the next source
of `App.tsx` route-local weight. The two obvious candidates are learned-state
summaries and health/channel summaries.

## Goal

Choose the next helper extraction target based on current coupling and risk.

## Scope

- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: helper extraction could target the wrong coupling
  boundary.
- Expected product or reliability outcome: next helper extraction is small and
  behavior-preserving.
- How success will be observed: audit names the next implementation task.

## Deliverable For This Stage

Update the route cluster audit and roadmap with the selected helper extraction.

## Constraints
- do not change runtime code in this task
- base the decision on current `App.tsx` call sites
- prefer pure helpers before telemetry/provider helpers

## Implementation Plan
1. Inspect learned-state helper call sites.
2. Inspect health/channel helper call sites.
3. Compare coupling and choose the next slice.
4. Update docs and context.
5. Run `git diff --check`.

## Acceptance Criteria
- Audit explains why learned-state helpers or health helpers move next.
- Roadmap contains the next implementation task.
- `git diff --check` passes.

## Definition of Done
- [x] Helper extraction target selected.
- [x] Roadmap and context updated.
- [x] Diff validation completed.

## Validation Evidence
- Tests:
  - `git diff --check`
  - result: passed
- Manual checks:
  - confirmed `recentActivityRows` and `summaryLines` are pure learned-state helpers
  - confirmed `conversationChannelStatus` is more coupled to health/provider telemetry

## Result Report

- Task summary: selected learned-state summary helper extraction as PRJ-997.
- Files changed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `git diff --check`
- What is incomplete:
  - PRJ-997 implementation remains next
- Next steps:
  - extract learned-state summary helpers from `App.tsx`
