# Task

## Header
- ID: PRJ-1014
- Title: Audit next chat extraction target after portrait panel cleanup
- Task Type: documentation
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1013
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1014
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

After portrait/support panel extraction, the chat route has explicit ownership
for topbar, cognitive belt, transcript row, composer, and support panel. The
remaining route-local chat surface is the transcript shell/thread column plus
the data derivation that feeds those components.

## Goal

Choose the next safe chat extraction target without moving message mapping,
delivery-state calculation, markdown rendering, or route data helpers.

## Scope

- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: remaining chat route ownership still mixes
  transcript shell presentation with behavior-sensitive mapping.
- Expected product or reliability outcome: next implementation extracts only a
  thin shell and keeps behavior in `App()`.
- How success will be observed: PRJ-1015 is queued for `ChatTranscriptShell`.
- Post-launch learning needed: no

## Deliverable For This Stage

Record that transcript shell extraction is next, with explicit ref and child
ownership boundaries.

## Constraints
- do not change runtime code in this task
- do not move `visibleTranscriptItems.map(...)`
- do not move message refs or delivery-state calculation
- do not move markdown rendering
- do not move route data helpers

## Implementation Plan
1. Inspect the remaining chat transcript shell/thread column.
2. Compare transcript shell versus route data helper extraction.
3. Select the next smallest extraction boundary.
4. Update route audit, roadmap, and context.
5. Run `git diff --check`.

## Acceptance Criteria
- Next target is selected with rationale.
- Behavior-sensitive ownership that stays in `App()` is documented.
- PRJ-1015 is queued.
- `git diff --check` passes.

## Definition of Done
- [x] Boundary recorded.
- [x] Roadmap and context updated.
- [x] Diff validation completed.

## Validation Evidence
- Tests:
  - `git diff --check`
  - result: passed
- Manual checks:
  - inspected transcript shell, loading fallback, refs, and message mapping
- High-risk checks:
  - message mapping, row refs, delivery labels, timestamp formatting, and
    markdown rendering remain in `App()` for the next slice
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Follow-up architecture doc updates:
  - PRJ-1015 queued for transcript shell extraction

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

- Task summary: selected a thin chat transcript shell extraction as the next
  safe chat route slice.
- Files changed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/tasks/PRJ-1014-next-chat-extraction-after-portrait-audit.md`
- How tested:
  - `git diff --check`
- What is incomplete:
  - implementation is queued as PRJ-1015
- Next steps:
  - extract `ChatTranscriptShell`
- Decisions made:
  - route data-helper extraction remains deferred because it is broader than a
    shell presentation slice

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - transcript shell presentation remains inline with message mapping
- Gaps:
  - route data helpers still need a future audit
- Inconsistencies:
  - PRJ-1014 needed to choose between shell, data helpers, and wrapper work
- Architecture constraints:
  - message mapping and behavior-sensitive transcript calculations stay in `App()`

### 2. Select One Priority Task
- Selected task: PRJ-1014
- Priority rationale: it is the next queued chat route architecture step
- Why other candidates were deferred:
  - data helpers are broader and require their own audit
  - route wrapper extraction provides less value than the transcript shell

### 3. Plan Implementation
- Files or surfaces to modify:
  - docs and context only
- Logic:
  - queue a thin forward-ref transcript shell component
- Edge cases:
  - loading fallback should be passed as a React node

### 4. Execute Implementation
- Implementation notes:
  - queued PRJ-1015 for `ChatTranscriptShell`

### 5. Verify and Test
- Validation performed:
  - `git diff --check`
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - start data-helper extraction now; deferred because it is broader
- Technical debt introduced: no
- Scalability assessment:
  - adequate for one more component extraction
- Refinements made:
  - ref and child ownership are explicit in the next task

### 7. Update Documentation and Knowledge
- Docs updated:
  - frontend route cluster audit
  - v1 roadmap
- Context updated:
  - task board
  - project state
- Learning journal updated: not applicable
