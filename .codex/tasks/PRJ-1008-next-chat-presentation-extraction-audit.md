# Task

## Header
- ID: PRJ-1008
- Title: Audit next chat route presentation extraction after transcript row cleanup
- Task Type: documentation
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1007
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1008
- Operation Mode: ARCHITECT

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

The chat route now has explicit helper/component ownership for transcript
metadata, markdown rendering, transcript rows, and composer shell. Remaining
inline presentation includes the topbar, cognitive belt, transcript container,
and portrait/support panel.

## Goal

Choose the next smallest chat route extraction that reduces `App.tsx` ownership
without disturbing behavior-sensitive transcript logic or canonical visual
composition.

## Scope

- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: remaining chat route chrome still hides ownership
  in a large route branch.
- Expected product or reliability outcome: the next implementation slice is
  narrow, visual-only, and traceable.
- How success will be observed: roadmap queues PRJ-1009 with a clear component
  boundary.
- Post-launch learning needed: no

## Deliverable For This Stage

Record that the cognitive belt is the next safe extraction target and queue the
implementation task.

## Constraints
- do not change runtime code in this task
- do not move transcript container refs or transcript state
- do not move portrait/support panel before a visual-specific audit
- do not introduce a new route module yet

## Implementation Plan
1. Inspect remaining chat route presentation clusters.
2. Compare cognitive belt, portrait/support panel, and transcript shell risk.
3. Select one next safe implementation slice.
4. Update roadmap and context.
5. Run `git diff --check`.

## Acceptance Criteria
- Next target is selected with rationale.
- Deferred targets are named.
- PRJ-1009 is queued.
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
  - inspected chat topbar, cognitive belt, transcript shell, and portrait panel
- High-risk checks:
  - portrait/support panel deferred because it is more tightly coupled to
    canonical visual composition
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
  - PRJ-1009 queued for cognitive belt extraction

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

- Task summary: selected chat cognitive belt extraction as the next safe route
  presentation slice.
- Files changed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/tasks/PRJ-1008-next-chat-presentation-extraction-audit.md`
- How tested:
  - `git diff --check`
- What is incomplete:
  - implementation is queued as PRJ-1009
- Next steps:
  - extract `ChatCognitiveBelt`
- Decisions made:
  - cognitive belt is lower risk than portrait/support panel because it is a
    pure card list with one explicit progress value

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - chat cognitive belt remains inline after row/composer cleanup
- Gaps:
  - no dedicated component owns conversation context cards
- Inconsistencies:
  - remaining chat route extraction queue needed a new next target
- Architecture constraints:
  - canonical visual composition should not be changed during extraction

### 2. Select One Priority Task
- Selected task: PRJ-1008
- Priority rationale: it is the next queued chat route architecture step
- Why other candidates were deferred:
  - portrait/support panel is more visual and should wait for a focused audit
  - transcript shell touches refs and loading state

### 3. Plan Implementation
- Files or surfaces to modify:
  - docs and context only
- Logic:
  - choose a pure presentation card-list component boundary
- Edge cases:
  - goal progress bar width should be passed explicitly

### 4. Execute Implementation
- Implementation notes:
  - queued PRJ-1009 for `ChatCognitiveBelt`

### 5. Verify and Test
- Validation performed:
  - `git diff --check`
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - extract the whole chat top section; rejected as too broad
- Technical debt introduced: no
- Scalability assessment:
  - adequate for another small `App.tsx` reduction slice
- Refinements made:
  - deferred visual-heavy portrait panel explicitly

### 7. Update Documentation and Knowledge
- Docs updated:
  - frontend route cluster audit
  - v1 roadmap
- Context updated:
  - task board
  - project state
- Learning journal updated: not applicable
