# Task

## Header
- ID: PRJ-1016
- Title: Audit chat route data-helper extraction after shell cleanup
- Task Type: documentation
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1015
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1016
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

Chat presentation components now own the visible route chrome. The remaining
chat-specific weight in `App()` is mostly derived display data assembled from
planning, preference, knowledge, channel, and UI-copy summaries.

## Goal

Choose the next safe data-helper extraction without hiding route/API ownership
or moving stateful chat behavior.

## Scope

- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: route-derived chat display data still increases
  `App.tsx` size and makes ownership harder to scan.
- Expected product or reliability outcome: next implementation extracts pure
  display-model helpers while preserving API/state ownership.
- How success will be observed: PRJ-1017 is queued for a focused
  `chat-route-model` helper.
- Post-launch learning needed: no

## Deliverable For This Stage

Record the helper boundary and queue the implementation slice.

## Constraints
- do not change runtime code in this task
- do not move chat API calls or chat state
- do not move send behavior or transcript reconciliation
- do not move route rendering

## Implementation Plan
1. Inspect chat-derived display data in `App()`.
2. Select the pure helper boundary.
3. Document values that must remain in `App()`.
4. Update roadmap and context.
5. Run `git diff --check`.

## Acceptance Criteria
- Helper extraction boundary is documented.
- PRJ-1017 is queued.
- Deferred route/API/state ownership is explicit.
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
  - inspected chat focus, intent, motivation, goal, related-memory, and quick
    action derivation
- High-risk checks:
  - API calls, chat state, transcript behavior, and route rendering remain
    deferred from helper extraction
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
  - PRJ-1017 queued for helper implementation

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

- Task summary: selected a focused chat route display-model helper extraction.
- Files changed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/tasks/PRJ-1016-chat-route-data-helper-audit.md`
- How tested:
  - `git diff --check`
- What is incomplete:
  - implementation is queued as PRJ-1017
- Next steps:
  - add `web/src/lib/chat-route-model.ts`
- Decisions made:
  - helper should produce current focus, linked channel fallback, intent card,
    motivation metrics, goal card, related memory cards, and quick actions from
    explicit summary inputs

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - route-derived chat display data remains inline
- Gaps:
  - no chat route display-model helper exists
- Inconsistencies:
  - presentation components are extracted but their data model is still embedded
    in `App()`
- Architecture constraints:
  - route API/state ownership stays in `App()`

### 2. Select One Priority Task
- Selected task: PRJ-1016
- Priority rationale: it is the next queued chat architecture step
- Why other candidates were deferred:
  - route wrapper extraction is lower value after component cleanup
  - API/state extraction is out of scope

### 3. Plan Implementation
- Files or surfaces to modify:
  - docs and context only
- Logic:
  - queue a pure helper module with explicit summary inputs
- Edge cases:
  - fallback values should remain identical to current route behavior

### 4. Execute Implementation
- Implementation notes:
  - queued PRJ-1017 for `chat-route-model`

### 5. Verify and Test
- Validation performed:
  - `git diff --check`
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - leave data derivation inline; rejected because components now have a clear
    display-model boundary
- Technical debt introduced: no
- Scalability assessment:
  - adequate for one focused helper extraction
- Refinements made:
  - API/state ownership remains explicit

### 7. Update Documentation and Knowledge
- Docs updated:
  - frontend route cluster audit
  - v1 roadmap
- Context updated:
  - task board
  - project state
- Learning journal updated: not applicable
