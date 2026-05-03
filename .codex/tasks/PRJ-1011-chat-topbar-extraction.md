# Task

## Header
- ID: PRJ-1011
- Title: Extract chat topbar presentation from App.tsx
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1010
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1011
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

`PRJ-1010` selected the chat topbar as the next safe presentation extraction.
The topbar is lower risk than the portrait/support panel and transcript shell
because it only displays precomputed labels.

## Goal

Move chat topbar presentation into a typed chat component while keeping active
summary, linked-channel summary, preferred-language formatting, and route data
derivation in `App()`.

## Scope

- `web/src/components/chat.tsx`
- `web/src/App.tsx`
- `docs/frontend/route-component-map.md`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: topbar chrome remained inline in the large chat
  route branch.
- Expected product or reliability outcome: chat route presentation ownership is
  clearer without changing route behavior.
- How success will be observed: build and route smoke pass with `ChatTopbar`.
- Post-launch learning needed: no

## Deliverable For This Stage

Release-ready component extraction with validation and docs/context sync.

## Constraints
- do not move route data derivation out of `App()`
- do not change chat layout classes
- do not touch portrait/support panel composition
- do not touch transcript shell refs or loading state

## Implementation Plan
1. Add `ChatTopbar` to `web/src/components/chat.tsx`.
2. Replace inline topbar JSX in `web/src/App.tsx`.
3. Pass title, active summary, linked-channel label, and preferred-language
   label through explicit props.
4. Update frontend docs and context.
5. Run build, route smoke, and diff validation.

## Acceptance Criteria
- Topbar presentation renders from `ChatTopbar`.
- Active summary and route-posture labels remain computed in `App()`.
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
  - confirmed `ChatTopbar` receives only explicit display labels
- High-risk checks:
  - portrait/support panel and transcript shell remain untouched
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
  - PRJ-1012 queued for the next chat extraction audit

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: existing implemented chat route shell
- Canonical visual target: preserve current chat topbar layout
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
- Accessibility checks: live-status and posture text preserved

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

- Task summary: extracted chat topbar presentation into `ChatTopbar`.
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
  - chat portrait/support panel and transcript shell remain inline
- Next steps:
  - PRJ-1012 audit next chat extraction target
- Decisions made:
  - topbar receives precomputed display labels instead of reading settings or summaries directly

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - topbar JSX remained inline after cognitive belt cleanup
- Gaps:
  - visual-sensitive portrait/support panel still needs a separate audit
- Inconsistencies:
  - PRJ-1011 was queued but implementation was not present
- Architecture constraints:
  - route data derivation remains in `App()`

### 2. Select One Priority Task
- Selected task: PRJ-1011
- Priority rationale: it was the next queued implementation slice
- Why other candidates were deferred:
  - portrait/support panel and transcript shell remain higher risk

### 3. Plan Implementation
- Files or surfaces to modify:
  - chat component module, App usage, frontend docs, context
- Logic:
  - pass precomputed labels into a presentational topbar component
- Edge cases:
  - preserve linked-channel and preferred-language fallback strings

### 4. Execute Implementation
- Implementation notes:
  - removed an extra nested wrapper while preserving existing topbar classes

### 5. Verify and Test
- Validation performed:
  - build
  - route smoke
  - diff check
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - keep topbar inline; rejected because PRJ-1010 selected extraction
- Technical debt introduced: no
- Scalability assessment:
  - adequate for current chat route decomposition
- Refinements made:
  - kept component free of settings or route-derived data reads

### 7. Update Documentation and Knowledge
- Docs updated:
  - frontend route/component map
  - app route cluster audit
  - v1 roadmap
- Context updated:
  - task board
  - project state
- Learning journal updated: not applicable
