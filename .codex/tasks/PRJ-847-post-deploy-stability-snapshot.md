# Task

## Header
- ID: PRJ-847
- Title: Post-Deploy Stability Snapshot
- Task Type: release
- Current Stage: verification
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-846
- Priority: P1
- Coverage Ledger Rows: not applicable
- Iteration: 847
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

`PRJ-846` verified the deployed v1 revision with a full release smoke after a
transient deploy-time 503. A non-invasive follow-up health snapshot confirms
that production remains stable after the deployment has had time to settle.

## Goal

Capture a post-deploy production stability snapshot without posting another
synthetic runtime event.

## Scope

- production `GET /health`
- production web shell build revision
- `.codex/tasks/PRJ-847-post-deploy-stability-snapshot.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: v1 should remain healthy after the deploy smoke,
  not only immediately during the release window.
- Expected product or reliability outcome: health and web revision remain
  aligned with the deployed v1 revision.
- How success will be observed: health status, release readiness, violations,
  and build revisions are recorded.
- Post-launch learning needed: no

## Deliverable For This Stage

One recorded non-invasive production stability snapshot.

## Constraints

- do not mutate production state
- do not post another `/event` smoke in this task
- do not push docs-only evidence if that would trigger another deployment cycle

## Implementation Plan

1. Read production `/health`.
2. Read production web shell HTML and extract the build revision meta tag.
3. Compare both revisions with local `HEAD`.
4. Record evidence and next operational follow-up.

## Acceptance Criteria

- Production `/health` returns `status=ok`.
- `release_readiness.ready` is true.
- `release_readiness.violations` is empty.
- Runtime and web shell build revisions match local `HEAD`.
- No production event is posted.

## Definition of Done

- [x] Health snapshot is recorded.
- [x] Web shell revision is recorded.
- [x] Revision parity is confirmed or blocker is recorded.
- [x] Task board and project state are synchronized locally.

## Stage Exit Criteria

- [x] The output matches the declared `verification` stage.
- [x] Work from later stages was not mixed in.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden

- posting synthetic user events in this stability-only task
- masking release-readiness violations
- pushing local evidence if it would create a new deployment revision that
  invalidates the just-captured production parity

## Validation Evidence
- Tests: not applicable; production health snapshot only
- Manual checks:
  - `GET https://aviary.luckysparrow.ch/health`
  - `GET https://aviary.luckysparrow.ch/`
  - `git rev-parse HEAD`
- Screenshots/logs:
  - health:
    - `status=ok`
    - `release_ready=true`
    - `release_violations=[]`
    - `runtime_build_revision=1a04b242b54acd5c09f9e67e009b6d86562ba5e6`
    - `runtime_build_revision_state=runtime_build_revision_declared`
    - `deployment_runtime_provenance_state=primary_runtime_provenance_declared`
  - web shell:
    - `status_code=200`
    - `web_shell_build_revision=1a04b242b54acd5c09f9e67e009b6d86562ba5e6`
  - local:
    - `HEAD=1a04b242b54acd5c09f9e67e009b6d86562ba5e6`
- High-risk checks: no production mutation
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: not applicable

## Architecture Evidence
- Architecture source reviewed:
  - `DEPLOYMENT_GATE.md`
  - `docs/operations/runtime-ops-runbook.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: read-only verification
- Smoke steps updated: no
- Rollback note: rollback remains prior production revision if later
  monitoring finds a regression
- Observability or alerting impact: none
- Staged rollout or feature flag: not applicable

## Review Checklist
- [x] Process self-audit completed before implementation.
- [x] Autonomous loop evidence covers all seven steps.
- [x] Exactly one priority task was selected in this iteration.
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

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: production operator
- Existing workaround or pain: immediate smoke does not prove settled stability
- Smallest useful slice: read-only health and web revision snapshot
- Success metric or signal: health/release readiness remain green
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: no

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: production health and web shell availability
- SLI: production health status and release readiness
- SLO: green after deploy settle
- Error budget posture: healthy
- Health/readiness check: production `/health` is green
- Logs, dashboard, or alert route: not changed
- Smoke command or manual smoke: pending read-only snapshot
- Rollback or disable path: previous known production revision

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: public health/readiness response only
- Trust boundaries: unchanged
- Permission or ownership checks: unchanged
- Abuse cases: not applicable
- Secret handling: no secrets accessed
- Security tests or scans: not applicable
- Fail-closed behavior: record blocker if health is not green
- Residual risk: read-only snapshot cannot prove all user journeys

## AI Testing Evidence
- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios: not in this task
- Multi-step context scenarios: not in this task
- Adversarial or role-break scenarios: not in this task
- Prompt injection checks: not in this task
- Data leakage and unauthorized access checks: not in this task
- Result: not applicable

## Result Report

- Task summary:
  - captured a read-only post-deploy production stability snapshot.
- Files changed: this task file and local context updates
- How tested:
  - production `/health` and web shell revision were read without posting a
    production event.
- What is incomplete:
  - provider credential activation remains a separate non-core-v1 operational
    blocker for organizer workflows.
- Next steps:
  - open a separate provider activation lane for ClickUp, Google Calendar, and
    Google Drive readiness if those workflows should become part of the next
    usable release increment.
- Decisions made: no production event will be posted in this task

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - production deploy was verified, but settled read-only health evidence is
    not yet recorded.
- Gaps:
  - no post-warmup snapshot after the transient initial 503.
- Inconsistencies:
  - none known.
- Architecture constraints:
  - use release/readiness health surfaces rather than inventing new monitoring.

### 2. Select One Priority Task
- Selected task:
  - post-deploy stability snapshot.
- Priority rationale:
  - validates v1 after deploy settle without triggering another deploy.
- Why other candidates were deferred:
  - provider credential activation is a separate operational lane.

### 3. Plan Implementation
- Files or surfaces to modify:
  - task/context evidence only.
- Logic:
  - read `/health`, read web shell revision, compare to local HEAD.
- Edge cases:
  - record blocker if revision parity drifts or health readiness regresses.

### 4. Execute Implementation
- Implementation notes:
  - task contract created before running the read-only checks.

### 5. Verify and Test
- Validation performed:
  - read-only production health and web shell revision snapshot.
- Result:
  - production remains stable and revision-aligned with local HEAD.

### 6. Self-Review
- Simpler option considered:
  - rerun full release smoke, rejected because this task should avoid another
    synthetic event.
- Technical debt introduced: no
- Scalability assessment:
  - read-only snapshot complements the existing release smoke.
- Refinements made:
  - recorded provider activation blockers as a separate follow-up rather than
    treating them as a v1 deployment regression.

### 7. Update Documentation and Knowledge
- Docs updated:
  - no canonical docs changed; this task records release evidence only.
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable; no recurring pitfall was confirmed.
