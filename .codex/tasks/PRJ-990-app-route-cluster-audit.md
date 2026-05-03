# Task

## Header
- ID: PRJ-990
- Title: Audit remaining `App.tsx` route-local clusters after tools extraction
- Task Type: documentation
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-989
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 990
- Operation Mode: TESTER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

The tools route presentation cluster is now extracted, but `web/src/App.tsx`
still owns most route rendering. The next extraction should be chosen from the
current code shape, not guessed.

## Goal

Create a grounded audit of remaining route-local clusters and select the next
small implementation slice.

## Scope

- `docs/frontend/app-route-cluster-audit.md`
- `docs/frontend/route-component-map.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: next frontend refactor work could drift into a
  broad rewrite.
- Expected product or reliability outcome: next work is explicitly scoped and
  traceable to current code.
- How success will be observed: docs identify remaining clusters and name the
  next task.
- Post-launch learning needed: no

## Deliverable For This Stage

Add a route cluster audit and update planning/context docs.

## Constraints
- base the audit on current `web/src/App.tsx`
- do not invent architecture
- do not change runtime code in this task
- keep the next implementation slice small and behavior-preserving

## Implementation Plan
1. Inspect current route branches and helper clusters in `App.tsx`.
2. Record remaining ownership and risk posture.
3. Select the next smallest implementation slice.
4. Update route map, roadmap, task board, and project state.
5. Run documentation/diff validation.

## Acceptance Criteria
- Remaining route branches are listed with extraction posture.
- Remaining helper clusters are listed with recommended timing.
- The next task is explicitly selected.
- `git diff --check` passes.

## Definition of Done
- [x] Route cluster audit added.
- [x] Roadmap and context updated.
- [x] Diff validation completed.

## Validation Evidence
- Tests:
  - `git diff --check`
  - result: passed
- Manual checks:
  - confirmed route branch line anchors in `web/src/App.tsx`
- High-risk checks:
  - no runtime code changed
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Follow-up architecture doc updates:
  - route cluster audit now records next extraction priority

## UX/UI Evidence
- Design source type: not applicable
- Design source reference: no UI code changed
- Canonical visual target: unchanged
- Fidelity target: not applicable
- Remaining mismatches: broad route rendering remains in `App.tsx`
- State checks: not applicable
- Responsive checks: not applicable
- Accessibility checks: not applicable
- Parity evidence: not applicable

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Rollback note: remove the audit doc and planning/context updates
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

- Task summary: added a route cluster audit and selected settings card/fact
  extraction as the next slice.
- Files changed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `git diff --check`
- What is incomplete:
  - implementation of PRJ-991 remains next
- Next steps:
  - `PRJ-991` extract settings preference card/fact presentation cluster
- Decisions made:
  - settings is the next lower-risk slice than chat or dashboard

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: `App.tsx` still owns many route branches.
- Gaps: route-local cluster priorities were not recorded after tools cleanup.
- Inconsistencies: tools had a component module, while settings still repeated
  card/fact presentation inline.
- Architecture constraints: avoid broad rewrites and keep state/API ownership
  stable.

### 2. Select One Priority Task
- Selected task: PRJ-990 route cluster audit.
- Priority rationale: planning needed to keep the next extraction grounded.
- Why other candidates were deferred: implementation should follow the audit.

### 3. Plan Implementation
- Files or surfaces to modify: frontend docs and planning/context docs.
- Logic: map route branches and helper clusters.
- Edge cases: avoid claiming visual parity or code movement.

### 4. Execute Implementation
- Implementation notes: documented route branch line anchors and next slice.

### 5. Verify and Test
- Validation performed: `git diff --check`.
- Result: passed.

### 6. Self-Review
- Simpler option considered: jump directly into another extraction.
- Technical debt introduced: no
- Scalability assessment: future slices can now use the audit.
- Refinements made: selected settings before chat/dashboard because it is
  smaller and less behavior-sensitive.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
