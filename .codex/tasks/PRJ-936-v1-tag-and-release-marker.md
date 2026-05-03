# Task

## Header
- ID: PRJ-936
- Title: V1 Tag And Release Marker
- Task Type: release
- Current Stage: release
- Status: BLOCKED
- Owner: Ops/Release
- Depends on: PRJ-934, PRJ-935
- Priority: P1
- Coverage Ledger Rows: not applicable
- Iteration: 936
- Operation Mode: ARCHITECT

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
PRJ-936 is the planned release marker step. PRJ-934 returned `NO-GO / HOLD`
because production is not serving the current local candidate SHA. PRJ-935
created the operator handoff under that HOLD posture.

## Goal
Create a release tag and marker only after the selected release SHA has green
production evidence.

## Scope
- `.codex/tasks/PRJ-936-v1-tag-and-release-marker.md`
- `docs/planning/v1-release-marker-blocker.md`
- `docs/planning/v1-release-audit-and-execution-plan.md`
- `docs/planning/v1-core-acceptance-bundle.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Implementation Plan
1. Confirm PRJ-934 decision.
2. Confirm PRJ-935 handoff exists.
3. Do not create a tag while release marker prerequisites are unmet.
4. Record blockers and exact unblock checklist.
5. Update release docs and context.

## Acceptance Criteria
- No release tag or marker is created while evidence is not green.
- Blockers are concrete and operator-actionable.
- Release docs point to the blocker record.
- Context makes the next action clear.

## Definition of Done
- [x] Marker creation was intentionally skipped.
- [x] Blocking evidence is recorded.
- [x] Unblock checklist is recorded.
- [x] Release docs and context are updated.
- [x] Workspace has no staged marker/tag change.

## Validation Evidence
- Tests:
  - not applicable; blocked release-marker task
- Manual checks:
  - reviewed `docs/planning/v1-final-go-no-go-review.md`
  - reviewed `docs/planning/v1-release-notes-and-operator-handoff.md`
  - verified no tag command was run
- Screenshots/logs: not applicable
- High-risk checks: release marker was not created
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/planning/v1-final-go-no-go-review.md`
  - `docs/planning/v1-release-notes-and-operator-handoff.md`
  - `docs/operations/runtime-ops-runbook.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: not required

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: not applicable because no release was created
- Observability or alerting impact: none
- Staged rollout or feature flag: not applicable

## Result Report
- Task summary:
  - PRJ-936 remains blocked; no release marker created
- Files changed:
  - listed in Scope
- How tested:
  - documentation cross-check
  - `git tag --points-at HEAD` returned no tag
  - `git diff --check` passed with existing CRLF normalization warnings only
- What is incomplete:
  - production deploy parity for selected release SHA
  - final production release smoke
  - release tag/marker
- Next steps:
  - choose/deploy release SHA
  - rerun production release smoke with deploy parity
  - rerun or waive remaining launch-channel/security evidence as needed
  - create tag only after green evidence
- Decisions made:
  - preserving HOLD posture is safer than creating a misleading marker

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - production is not serving local `HEAD`
- Gaps:
  - release marker prerequisites are unmet
- Inconsistencies:
  - none
- Architecture constraints:
  - marker follows evidence

### 2. Select One Priority Task
- Selected task: PRJ-936 V1 Tag And Release Marker
- Priority rationale: final planned release step after PRJ-935
- Why other candidates were deferred: this step must be explicitly blocked
  before the queue can be considered safely processed

### 3. Plan Implementation
- Files or surfaces to modify: blocker docs and context only
- Logic: record no-tag decision and unblock checklist
- Edge cases: do not run `git tag`

### 4. Execute Implementation
- Added PRJ-936 blocker record.
- Updated release plan, acceptance bundle, task board, and project state.

### 5. Verify And Test
- Documentation cross-check passed.
- `git tag --points-at HEAD` returned no tag.
- Diff check passed with CRLF normalization warnings only.

### 6. Self-Review
- No tag was created.
- No release marker was created.
- Blockers are explicit.

### 7. Update Documentation And Knowledge
- Final release queue now has an explicit blocked terminal step.
