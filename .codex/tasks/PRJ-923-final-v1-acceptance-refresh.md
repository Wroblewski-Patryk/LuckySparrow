# Task

## Header
- ID: PRJ-923
- Title: Final V1 Acceptance Refresh
- Task Type: release
- Current Stage: verification
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-922, PRJ-929
- Priority: P0
- Coverage Ledger Rows: not applicable
- Iteration: 923
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
PRJ-910 recorded core no-UI v1 as behavior-green but final release declaration
as blocked by PRJ-908. PRJ-922 resolved that evidence-path blocker, and
PRJ-929 cleaned the future task queue. The current production revision now
needs a refreshed acceptance snapshot.

## Goal
Refresh the core v1 acceptance bundle against the current production SHA and
strict-mode incident-evidence bundle.

## Scope
- `docs/planning/v1-core-acceptance-bundle.md`
- `docs/planning/v1-release-audit-and-execution-plan.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `.codex/tasks/PRJ-923-final-v1-acceptance-refresh.md`

## Success Signal
- User or operator problem: release owner can see whether core v1 is now GO
  without reading old blocked PRJ-908 notes.
- Expected product or reliability outcome: core v1 release evidence reflects
  the latest production deployment.
- How success will be observed: acceptance bundle states core no-UI v1 as GO
  for the current SHA and separates remaining hardening tasks from core gates.
- Post-launch learning needed: no

## Deliverable For This Stage
Updated final core v1 acceptance bundle and context records.

## Constraints
- do not claim broader web/extension/AI hardening complete
- do not commit generated evidence artifacts
- keep Telegram live user smoke as an explicit remaining launch-channel check
- keep organizer provider activation as an extension gate

## Implementation Plan
1. Export a fresh strict-mode production incident-evidence bundle for the
   current SHA.
2. Verify the bundle with release smoke and deploy parity.
3. Update the acceptance bundle with current evidence.
4. Update release plan and context with the refreshed GO posture and remaining
   non-core gates.
5. Validate docs with `git diff --check`.

## Acceptance Criteria
- Current evaluated production SHA is recorded.
- Incident bundle path and release smoke evidence are recorded.
- Final core no-UI v1 declaration is GO.
- Remaining hardening/launch-channel items are explicit and not hidden.

## Definition of Done
- [x] Production strict-mode incident bundle exported.
- [x] Release smoke with bundle passed.
- [x] Acceptance bundle updated.
- [x] Context docs updated.
- [x] `git diff --check` passed.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval
- implicit stage skipping

## Validation Evidence
- Tests:
  - planning/docs-only change after evidence capture; no code tests required
- Manual checks:
  - strict-mode bundle export:
    `.codex/artifacts/prj923-final-v1-acceptance/20260502T220616Z_prj923-final-v1-acceptance-0984440`
  - `.\backend\scripts\run_release_smoke.ps1 -BaseUrl "https://aviary.luckysparrow.ch" -IncidentEvidenceBundlePath ".codex\artifacts\prj923-final-v1-acceptance\20260502T220616Z_prj923-final-v1-acceptance-0984440" -WaitForDeployParity -DeployParityMaxWaitSeconds 300 -DeployParityPollSeconds 30 -HealthRetryMaxAttempts 10 -HealthRetryDelaySeconds 10`
  - result: passed
  - current production SHA:
    `0984440a8a2a283942e4aa2c190e3964d0dadc9c`
- Screenshots/logs: not applicable
- High-risk checks: no generated evidence artifacts committed
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/planning/current-v1-release-boundary.md`
  - `docs/planning/v1-core-acceptance-bundle.md`
  - `docs/planning/v1-production-incident-evidence-bundle.md`
  - `docs/planning/v1-release-audit-and-execution-plan.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none

## Deployment / Ops Evidence
- Deploy impact: none for docs; evidence references current production
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: use PRJ-926 rollback drill before final launch marker
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

- Task summary: refreshed core v1 acceptance against current production and
  strict-mode incident evidence.
- Files changed:
  - `docs/planning/v1-core-acceptance-bundle.md`
  - `docs/planning/v1-release-audit-and-execution-plan.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/tasks/PRJ-923-final-v1-acceptance-refresh.md`
- How tested: production bundle export, release smoke with bundle, diff check.
- What is incomplete: launch-channel Telegram smoke, rollback drill, privacy
  and AI/security hardening remain queued.
- Next steps: execute PRJ-909, PRJ-911, PRJ-912, and security hardening before
  tag/release marker.
- Decisions made: core no-UI v1 is GO for the current production SHA.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: PRJ-910 had stale SHA and PRJ-908 blocker language.
- Gaps: acceptance bundle needed PRJ-922 evidence and current production SHA.
- Inconsistencies: core gates were green while final declaration still said
  NO-GO due resolved blocker.
- Architecture constraints: web/extension/security hardening must stay
  separate from core gates.

### 2. Select One Priority Task
- Selected task: PRJ-923 Final V1 Acceptance Refresh.
- Priority rationale: it converts resolved evidence into source-of-truth
  release posture.
- Why other candidates were deferred: rollback/privacy/AI tasks depend on a
  clear current acceptance baseline.

### 3. Plan Implementation
- Files or surfaces to modify: acceptance bundle, release plan, context docs.
- Logic: update GO/NO-GO language and evidence references only.
- Edge cases: do not overclaim web/extension/security completion.
- Validation: production bundle export, release smoke, diff check.

### 4. Execute Implementation
- Exported current strict-mode bundle.
- Verified the bundle with release smoke.
- Updated release documents and context.

### 5. Verify And Test
- Release smoke with bundle passed for current production SHA.
- `git diff --check` passed.

### 6. Self-Review
- Architecture alignment: yes.
- Existing system reuse: yes, no new mechanisms.
- Workaround check: no bypass; uses PRJ-922 approved strict export.
- Duplication check: evidence references point to one bundle.

### 7. Update Documentation And Knowledge
- Updated task board, project state, release plan, and acceptance bundle.
- Learning journal update: not required.
