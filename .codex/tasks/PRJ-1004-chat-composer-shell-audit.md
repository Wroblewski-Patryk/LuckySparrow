# Task

## Header
- ID: PRJ-1004
- Title: Audit chat composer shell extraction after markdown cleanup
- Task Type: documentation
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1003
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1004
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

Chat transcript metadata and markdown rendering now have module ownership. The
chat composer still lives inline in `App.tsx`.

## Goal

Choose the next safe chat route slice after markdown cleanup.

## Scope

- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: chat composer extraction could accidentally move
  send behavior.
- Expected product or reliability outcome: next chat slice keeps behavior in
  `App()` and moves only presentation chrome.
- How success will be observed: roadmap names the next implementation task.

## Deliverable For This Stage

Record that composer shell presentation can move next while send state and
handlers remain in `App()`.

## Constraints
- do not change runtime code in this task
- do not move `handleSendMessage`
- do not move optimistic send state

## Implementation Plan
1. Inspect composer JSX and handler boundaries.
2. Choose the next smallest chat slice.
3. Update docs and context.
4. Run `git diff --check`.

## Acceptance Criteria
- Composer shell extraction boundary is documented.
- PRJ-1005 is added to the roadmap.
- `git diff --check` passes.

## Definition of Done
- [x] Composer shell boundary recorded.
- [x] Roadmap and context updated.
- [x] Diff validation completed.

## Validation Evidence
- Tests:
  - `git diff --check`
  - result: passed
- Manual checks:
  - confirmed composer shell can be moved with explicit props

## Result Report

- Task summary: selected chat composer shell extraction as PRJ-1005.
- Files changed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `git diff --check`
- What is incomplete:
  - PRJ-1005 implementation remains next
