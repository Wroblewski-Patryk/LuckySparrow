# Task

## Header
- ID: PRJ-911
- Title: V1 Rollback And Recovery Drill
- Task Type: release
- Current Stage: verification
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-923
- Priority: P0
- Coverage Ledger Rows: not applicable
- Iteration: 911
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
Core no-UI v1 is accepted, but the release cannot have a credible handoff
without a rollback and recovery plan tied to the current production baseline.

## Goal
Record a concrete rollback target, migration posture, recovery procedure, and
post-rollback validation path for v1.

## Scope
- `docs/planning/v1-rollback-and-recovery-drill.md`
- `docs/planning/v1-release-audit-and-execution-plan.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `.codex/tasks/PRJ-911-v1-rollback-and-recovery-drill.md`

## Success Signal
- User or operator problem: production owner knows how to recover if v1 deploy
  regresses.
- Expected product or reliability outcome: rollback does not depend on hidden
  chat memory.
- How success will be observed: runbook lists current SHA, previous known-good
  SHA, migration head, Coolify target, smoke steps, and recovery steps.
- Post-launch learning needed: no

## Deliverable For This Stage
Rollback/recovery drill document and context updates.

## Constraints
- do not perform an unnecessary production rollback while production is healthy
- do not expose or commit secrets
- do not replace the release smoke contract
- do not claim schema downgrade support where it is not proven

## Implementation Plan
1. Identify current deployed SHA and previous known-good SHA.
2. Confirm local Alembic head.
3. Document rollback triggers, rollback procedure, and recovery procedure.
4. Update release plan and context.
5. Validate with `git diff --check`.

## Acceptance Criteria
- Current and rollback target revisions are named.
- Migration posture is explicit.
- Coolify rollback path and smoke command are documented.
- Strict incident-evidence export is used for rollback triage.

## Definition of Done
- [x] Rollback drill document exists.
- [x] Previous known-good SHA is recorded.
- [x] Migration head is recorded.
- [x] Recovery steps are recorded.
- [x] Context docs are updated.
- [x] `git diff --check` passes.

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
  - docs/runbook-only change; no code tests required
- Manual checks:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m alembic -c alembic.ini heads; Pop-Location`
  - result: `20260426_0012 (head)`
  - production release smoke passed after PRJ-923 commit for
    `69ff531193b782e178f39dd40c1110f3062c946a`
  - `git diff --check` passed
- Screenshots/logs: not applicable
- High-risk checks: no secrets or generated artifacts committed
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/operations/runtime-ops-runbook.md`
  - `docs/planning/v1-release-audit-and-execution-plan.md`
  - `DEPLOYMENT_GATE.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: rollback drill references existing smoke command
- Rollback note: documented in `docs/planning/v1-rollback-and-recovery-drill.md`
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

- Task summary: documented v1 rollback and recovery posture.
- Files changed:
  - `docs/planning/v1-rollback-and-recovery-drill.md`
  - `docs/planning/v1-release-audit-and-execution-plan.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/tasks/PRJ-911-v1-rollback-and-recovery-drill.md`
- How tested: Alembic head check and `git diff --check`.
- What is incomplete: no forced rollback was executed because production is
  healthy.
- Next steps: PRJ-912 data privacy and debug posture check.
- Decisions made: treat this as a tabletop drill, not a disruptive production
  rollback.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: rollback posture was queued but not captured in one release doc.
- Gaps: migration head and previous known-good SHA were not in the v1 handoff.
- Inconsistencies: none.
- Architecture constraints: rollback must use existing Coolify and smoke paths.

### 2. Select One Priority Task
- Selected task: PRJ-911 V1 Rollback And Recovery Drill.
- Priority rationale: rollback evidence is a P0 v1 hardening gate.
- Why other candidates were deferred: privacy/debug follows rollback in the P0
  queue.

### 3. Plan Implementation
- Files or surfaces to modify: planning doc, release plan, context docs.
- Logic: document tabletop rollback without changing production.
- Edge cases: schema rollback is not assumed safe.
- Validation: Alembic head and diff check.

### 4. Execute Implementation
- Added rollback drill document.
- Updated release plan and context.

### 5. Verify And Test
- Alembic head check returned `20260426_0012 (head)`.
- `git diff --check` passed.

### 6. Self-Review
- Architecture alignment: yes.
- Existing system reuse: Coolify, Alembic, release smoke, strict incident
  bundle export.
- Workaround check: no bypass introduced.
- Duplication check: no parallel rollback system.

### 7. Update Documentation And Knowledge
- Updated task board, project state, and release plan.
- Learning journal update: not required.
