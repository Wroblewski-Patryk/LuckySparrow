# Task

## Header
- ID: PRJ-1006
- Title: Audit chat transcript presentation extraction after composer cleanup
- Task Type: documentation
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1005
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1006
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

Chat transcript helpers, markdown rendering, and composer shell presentation
now have explicit module ownership. The remaining chat transcript row markup
still lives inline in `web/src/App.tsx`.

## Goal

Define the safest next extraction boundary for chat transcript presentation
without moving transcript data ownership, delivery-state calculation, markdown
rendering, or scroll/ref behavior.

## Scope

- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: chat route still has inline message-row chrome that
  hides component ownership inside `App.tsx`.
- Expected product or reliability outcome: next implementation slice is narrow
  and preserves behavior-sensitive transcript logic.
- How success will be observed: roadmap names PRJ-1007 with an explicit
  component boundary.
- Post-launch learning needed: no

## Deliverable For This Stage

Record the message-row extraction boundary and queue the next implementation
task.

## Constraints
- do not change runtime code in this task
- do not move transcript refs or scroll ownership
- do not move markdown parsing/rendering
- do not move delivery-state calculation

## Implementation Plan
1. Inspect current transcript message-row markup in `web/src/App.tsx`.
2. Identify behavior-sensitive values that should stay in `App()`.
3. Record the next component boundary in frontend audit docs.
4. Queue PRJ-1007 in the v1 roadmap and context.
5. Run `git diff --check`.

## Acceptance Criteria
- Message-row extraction boundary is documented.
- Behavior that must stay in `App()` is documented.
- PRJ-1007 is added as the next implementation task.
- `git diff --check` passes.

## Definition of Done
- [x] Boundary recorded.
- [x] Roadmap and context updated.
- [x] Diff validation completed.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- new systems without approval
- implementation changes during this audit task
- duplicated transcript rendering paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `git diff --check`
  - result: passed
- Manual checks:
  - inspected transcript row markup and behavior ownership in `web/src/App.tsx`
- Screenshots/logs: not applicable
- High-risk checks:
  - confirmed refs, markdown rendering, delivery state, and timestamp formatting
    should remain outside the proposed component boundary for now
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates:
  - PRJ-1007 queued for implementation

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: revert this docs-only commit
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

- Task summary: selected a transcript message-row presentation component as the
  next safe chat route slice.
- Files changed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/tasks/PRJ-1006-chat-transcript-presentation-extraction-audit.md`
- How tested:
  - `git diff --check`
- What is incomplete:
  - implementation is queued as PRJ-1007
- Next steps:
  - add `ChatTranscriptMessageRow` to `web/src/components/chat.tsx`
- Decisions made:
  - the component should receive precomputed speaker, timestamp label, delivery
    label/state, preview flag, user/assistant flag, and rendered markdown
    content through explicit props

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - message-row markup remains inline in the chat route branch
- Gaps:
  - no dedicated transcript row component exists
- Inconsistencies:
  - docs now identify chat composer ownership but not transcript row ownership
- Architecture constraints:
  - behavior-sensitive transcript logic stays in `App()` for this next slice

### 2. Select One Priority Task
- Selected task: PRJ-1006
- Priority rationale: it is the next queued small v1 frontend architecture step
- Why other candidates were deferred:
  - implementation should follow only after the boundary is recorded

### 3. Plan Implementation
- Files or surfaces to modify:
  - docs and context only
- Logic:
  - document the smallest safe component boundary
- Edge cases:
  - refs and message IDs must stay available to the transcript container owner

### 4. Execute Implementation
- Implementation notes:
  - recorded PRJ-1007 as the implementation follow-up

### 5. Verify and Test
- Validation performed:
  - `git diff --check`
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - implement immediately; deferred to preserve one-task audit/implementation separation
- Technical debt introduced: no
- Scalability assessment:
  - adequate for one more chat route decomposition slice
- Refinements made:
  - explicitly preserved refs, markdown, delivery, and timestamp ownership

### 7. Update Documentation and Knowledge
- Docs updated:
  - frontend route cluster audit
  - v1 roadmap
- Context updated:
  - task board
  - project state
- Learning journal updated: not applicable
