# Task

## Header
- ID: PRJ-1002
- Title: Audit chat markdown renderer extraction readiness
- Task Type: documentation
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1001
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1002
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

The chat transcript metadata helpers are now extracted, but markdown rendering
still lives in `web/src/App.tsx`. Unlike the previous helpers, it returns JSX
and encodes parser behavior for inline code, bold, italic, lists, paragraphs,
and fenced code blocks.

## Goal

Decide the next safe slice for chat markdown renderer ownership.

## Scope

- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: moving markdown rendering without a boundary could
  silently change chat message rendering.
- Expected product or reliability outcome: next markdown work has a clear
  characterization target.
- How success will be observed: roadmap names the next test/proof slice.

## Deliverable For This Stage

Record that markdown renderer movement should be preceded by a characterization
proof.

## Constraints
- do not move runtime code in this task
- do not add a broad test framework
- keep the next slice small and aligned with current web tooling

## Implementation Plan
1. Inspect markdown renderer behavior and web tooling.
2. Record the readiness decision.
3. Add the next roadmap task.
4. Run `git diff --check`.

## Acceptance Criteria
- Markdown renderer risk is documented.
- Roadmap contains the next characterization/proof task.
- `git diff --check` passes.

## Definition of Done
- [x] Readiness decision recorded.
- [x] Roadmap and context updated.
- [x] Diff validation completed.

## Validation Evidence
- Tests:
  - `git diff --check`
  - result: passed
- Manual checks:
  - confirmed web has no existing test runner
  - confirmed markdown renderer returns JSX and should not move without a
    focused proof

## Result Report

- Task summary: selected a focused markdown renderer characterization proof as
  PRJ-1003 before extraction.
- Files changed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `git diff --check`
- What is incomplete:
  - PRJ-1003 proof remains next
