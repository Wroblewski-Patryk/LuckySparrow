# Task

## Header
- ID: PRJ-1012
- Title: Audit next chat extraction target after topbar cleanup
- Task Type: documentation
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1011
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1012
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

Chat topbar, cognitive belt, transcript rows, markdown rendering, transcript
helpers, and composer shell now have explicit ownership. Remaining inline chat
work includes the portrait/support panel, transcript shell/container, and
route-local chat data derivation.

## Goal

Choose the next safe chat extraction target after topbar cleanup.

## Scope

- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: remaining chat work has different risk profiles and
  needs a clear next slice.
- Expected product or reliability outcome: next implementation is visual-only
  and avoids ref/data-helper sprawl.
- How success will be observed: PRJ-1013 is queued for a portrait/support panel
  extraction with explicit props.
- Post-launch learning needed: no

## Deliverable For This Stage

Record that the chat portrait/support panel is the next implementation target.

## Constraints
- do not change runtime code in this task
- do not touch transcript shell/container before a ref/loading audit
- do not move route-local chat data helpers before a dedicated helper audit
- do not change canonical chat visual composition

## Implementation Plan
1. Compare remaining chat portrait/support panel, transcript shell, and data
   helper risks.
2. Select the next smallest extraction.
3. Update route audit, roadmap, and context.
4. Run `git diff --check`.

## Acceptance Criteria
- Next target is selected with rationale.
- Deferred targets are named.
- PRJ-1013 is queued.
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
  - inspected portrait/support panel, transcript shell, and chat data helpers
- High-risk checks:
  - transcript shell and data-helper extraction explicitly deferred
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
  - PRJ-1013 queued for portrait/support panel extraction

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

- Task summary: selected chat portrait/support panel extraction as the next
  safe chat route slice.
- Files changed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/tasks/PRJ-1012-next-chat-extraction-after-topbar-audit.md`
- How tested:
  - `git diff --check`
- What is incomplete:
  - implementation is queued as PRJ-1013
- Next steps:
  - extract `ChatPortraitPanel`
- Decisions made:
  - portrait/support panel is the next slice because it is self-contained and
    ref-free; transcript shell and data helpers remain deferred

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - portrait/support panel remains inline in the chat branch
- Gaps:
  - no dedicated component owns chat support-side presentation
- Inconsistencies:
  - PRJ-1012 needed to choose between three remaining target types
- Architecture constraints:
  - preserve canonical chat layout and avoid ref-sensitive transcript movement

### 2. Select One Priority Task
- Selected task: PRJ-1012
- Priority rationale: it is the next queued chat route architecture step
- Why other candidates were deferred:
  - transcript shell is ref/loading-sensitive
  - data helpers are broader and should have a dedicated helper audit

### 3. Plan Implementation
- Files or surfaces to modify:
  - docs and context only
- Logic:
  - queue a visual-only support panel component boundary
- Edge cases:
  - learned-cue count should be passed as a precomputed label

### 4. Execute Implementation
- Implementation notes:
  - queued PRJ-1013 for `ChatPortraitPanel`

### 5. Verify and Test
- Validation performed:
  - `git diff --check`
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - extract transcript shell next; deferred because it touches refs and loading
- Technical debt introduced: no
- Scalability assessment:
  - adequate for one more presentation extraction
- Refinements made:
  - kept route data helpers as a separate future audit

### 7. Update Documentation and Knowledge
- Docs updated:
  - frontend route cluster audit
  - v1 roadmap
- Context updated:
  - task board
  - project state
- Learning journal updated: not applicable
