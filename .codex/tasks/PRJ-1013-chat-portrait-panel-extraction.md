# Task

## Header
- ID: PRJ-1013
- Title: Extract chat portrait support panel from App.tsx
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1012
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1013
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

`PRJ-1012` selected the chat portrait/support panel because it is
self-contained and ref-free. Transcript shell and data-helper extraction remain
deferred.

## Goal

Move chat portrait/support panel presentation into a typed component while
keeping current-focus, emphasis, learned-cue count, and route data derivation in
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
- User or operator problem: support-side chat presentation remained embedded
  in the route branch.
- Expected product or reliability outcome: chat support panel ownership is
  explicit while canonical layout remains unchanged.
- How success will be observed: build and route smoke pass with
  `ChatPortraitPanel`.
- Post-launch learning needed: no

## Deliverable For This Stage

Release-ready component extraction with validation and docs/context sync.

## Constraints
- do not move route data derivation out of `App()`
- do not change portrait/support panel CSS classes or visual copy
- do not touch transcript shell refs or loading state
- do not extract broader chat data helpers in this slice

## Implementation Plan
1. Add `ChatPortraitPanel` to `web/src/components/chat.tsx`.
2. Replace inline portrait/support panel JSX in `web/src/App.tsx`.
3. Pass current focus, emphasis, and learned-cue count through explicit props.
4. Update frontend docs and context.
5. Run build, route smoke, and diff validation.

## Acceptance Criteria
- Portrait/support panel presentation renders from `ChatPortraitPanel`.
- Dynamic values remain computed in `App()`.
- Documentation names the new component ownership.
- Validation passes.

## Definition of Done
- [x] Component extraction completed.
- [x] Data ownership preserved in `App()`.
- [x] Docs and context updated.
- [x] Relevant validation completed.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - `git diff --check`
- Manual checks:
  - confirmed `ChatPortraitPanel` receives only explicit display values
- High-risk checks:
  - transcript shell, refs, loading state, and data-helper derivation are untouched
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
- Follow-up architecture doc updates:
  - PRJ-1014 queued for next chat extraction audit

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: existing implemented chat route shell
- Canonical visual target: preserve current portrait/support panel layout
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: existing chat CSS classes
- New shared pattern introduced: no
- Design-memory update required: no
- Visual gap audit completed: yes
- Screenshot comparison pass completed: no
- Remaining mismatches: visual parity not changed by this markup extraction
- State checks: success
- Feedback locality checked: yes
- Raw technical errors hidden from end users: not applicable
- Responsive checks: route smoke only; CSS unchanged
- Accessibility checks: static/support copy preserved

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

- Task summary: extracted chat portrait/support panel presentation into
  `ChatPortraitPanel`.
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
  - transcript shell and chat data-helper extraction remain deferred
- Next steps:
  - PRJ-1014 audit next chat extraction target
- Decisions made:
  - portrait panel receives precomputed display values instead of deriving route state

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - portrait/support panel JSX remained inline
- Gaps:
  - transcript shell and route data helpers still need future ownership decisions
- Inconsistencies:
  - PRJ-1013 was queued but implementation was not present
- Architecture constraints:
  - preserve canonical chat layout and avoid transcript ref movement

### 2. Select One Priority Task
- Selected task: PRJ-1013
- Priority rationale: it was the next queued implementation slice
- Why other candidates were deferred:
  - transcript shell and data helpers remain higher risk

### 3. Plan Implementation
- Files or surfaces to modify:
  - chat component module, App usage, frontend docs, context
- Logic:
  - pass precomputed current-focus, emphasis, and learned-cue count into component
- Edge cases:
  - preserve all static support notes and portrait copy

### 4. Execute Implementation
- Implementation notes:
  - `ChatPortraitPanel` owns only presentation and static support copy

### 5. Verify and Test
- Validation performed:
  - build
  - route smoke
  - diff check
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - leave panel inline; rejected because PRJ-1012 selected extraction
- Technical debt introduced: no
- Scalability assessment:
  - adequate for current chat decomposition
- Refinements made:
  - learned-cue count is passed as a label to avoid data reads in the component

### 7. Update Documentation and Knowledge
- Docs updated:
  - frontend route/component map
  - app route cluster audit
  - v1 roadmap
- Context updated:
  - task board
  - project state
- Learning journal updated: not applicable
