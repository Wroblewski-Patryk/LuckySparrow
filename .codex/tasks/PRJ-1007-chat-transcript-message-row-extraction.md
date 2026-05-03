# Task

## Header
- ID: PRJ-1007
- Title: Extract chat transcript message row presentation from App.tsx
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1006
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1007
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

`PRJ-1006` selected the chat transcript message-row chrome as the next safe
presentation extraction. The route should still own transcript mapping,
message refs, delivery-state calculation, timestamp formatting, and markdown
rendering.

## Goal

Move chat transcript row/avatar/article/meta/copy presentation into a typed
component while preserving all behavior-sensitive transcript ownership in
`App()`.

## Scope

- `web/src/components/chat.tsx`
- `web/src/App.tsx`
- `docs/frontend/route-component-map.md`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: message-row presentation was hidden in the large
  chat branch.
- Expected product or reliability outcome: transcript presentation ownership is
  explicit and future route decomposition has a smaller surface.
- How success will be observed: build and route smoke pass with
  `ChatTranscriptMessageRow` rendering transcript rows.
- Post-launch learning needed: no

## Deliverable For This Stage

Release-ready component extraction with validation and docs/context sync.

## Constraints
- do not move transcript mapping out of `App()`
- do not move `transcriptMessageRefs`
- do not move markdown rendering or parser behavior
- do not move delivery-state calculation
- do not change chat API behavior

## Implementation Plan
1. Add `ChatTranscriptMessageRow` to `web/src/components/chat.tsx`.
2. Replace inline message-row markup in `web/src/App.tsx`.
3. Pass precomputed speaker, timestamp, delivery state/label, preview flag, and
   rendered markdown content through explicit props.
4. Update frontend docs and context.
5. Run build, route smoke, and diff validation.

## Acceptance Criteria
- Message row/avatar/article/meta/copy presentation renders from
  `ChatTranscriptMessageRow`.
- Transcript mapping, refs, timestamps, delivery state, and markdown rendering
  remain in `App()`.
- Documentation names the new component ownership.
- Validation passes.

## Definition of Done
- [x] Component extraction completed.
- [x] Behavior ownership preserved in `App()`.
- [x] Docs and context updated.
- [x] Relevant validation completed.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- duplicated transcript rendering paths
- temporary bypasses or workaround-only paths
- moving parser, API, or scroll behavior in this slice
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - `git diff --check`
- Manual checks:
  - confirmed `ChatTranscriptMessageRow` receives explicit precomputed props
- Screenshots/logs: not applicable
- High-risk checks:
  - refs, delivery state, timestamp formatting, and markdown rendering remain
    in `App()`
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates:
  - PRJ-1008 queued for the next chat route extraction audit

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: existing implemented chat route shell
- Canonical visual target: preserve current transcript row layout
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: existing chat CSS classes
- New shared pattern introduced: no
- Design-memory entry reused: existing chat route component extraction pattern
- Design-memory update required: no
- Visual gap audit completed: yes
- Background or decorative asset strategy: unchanged
- Canonical asset extraction required: no
- Screenshot comparison pass completed: no
- Remaining mismatches: visual parity not changed by this markup extraction
- State checks: success
- Feedback locality checked: yes
- Raw technical errors hidden from end users: not applicable
- Responsive checks: route smoke only; CSS unchanged
- Input-mode checks: not applicable
- Accessibility checks: delivery indicator labels preserved
- Parity evidence: build and route smoke passed

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: revert this component extraction commit
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

- Task summary: extracted chat transcript row presentation into
  `ChatTranscriptMessageRow`.
- Files changed:
  - `web/src/components/chat.tsx`
  - `web/src/App.tsx`
  - `docs/frontend/route-component-map.md`
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - `git diff --check`
- What is incomplete:
  - remaining chat cognitive/support panel chrome still needs a follow-up audit
- Next steps:
  - PRJ-1008 audit next chat route presentation extraction target
- Decisions made:
  - row component uses `forwardRef` so `App()` keeps transcript message ref ownership

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - message row JSX still lived inline in the chat branch
- Gaps:
  - chat route still has cognitive belt and portrait/support panel chrome inline
- Inconsistencies:
  - docs queued PRJ-1007 but code had not yet added the row component
- Architecture constraints:
  - behavior-sensitive transcript logic stays in `App()`

### 2. Select One Priority Task
- Selected task: PRJ-1007
- Priority rationale: it was the next queued implementation slice
- Why other candidates were deferred:
  - broader chat panel extraction should be audited after row cleanup

### 3. Plan Implementation
- Files or surfaces to modify:
  - chat component module, chat route usage, frontend docs, context
- Logic:
  - keep map calculations in `App()` and pass rendered row content into component
- Edge cases:
  - preserve assistant avatar, user alignment, preview classes, and delivery labels

### 4. Execute Implementation
- Implementation notes:
  - `ChatTranscriptMessageRow` uses `forwardRef` to preserve existing message ref assignment

### 5. Verify and Test
- Validation performed:
  - build
  - route smoke
  - diff check
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - keep the outer ref div in `App()`; rejected because the audit selected row
    chrome extraction and `forwardRef` preserves ownership cleanly
- Technical debt introduced: no
- Scalability assessment:
  - adequate for one more route decomposition step
- Refinements made:
  - delivery-state type is reused from the existing transcript helper module

### 7. Update Documentation and Knowledge
- Docs updated:
  - frontend route/component map
  - app route cluster audit
  - v1 roadmap
- Context updated:
  - task board
  - project state
- Learning journal updated: not applicable
