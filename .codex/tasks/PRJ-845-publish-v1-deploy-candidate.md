# Task

## Header
- ID: PRJ-845
- Title: Publish V1 Deploy Candidate
- Task Type: release
- Current Stage: release
- Status: IN_PROGRESS
- Owner: Ops/Release
- Depends on: PRJ-844
- Priority: P0
- Coverage Ledger Rows: not applicable
- Iteration: 845
- Operation Mode: TESTER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

`PRJ-843` produced a passing behavior-validation artifact and `PRJ-844` proved
the full backend suite is green on the current working tree. The next blocker
for v1 deployment is publishing a deploy candidate to the production-tracked
GitHub remote.

## Goal

Commit and push the validated deploy candidate to `origin/main` without
including local-only generated artifacts.

## Scope

- source, tests, docs, and `.codex` task/context changes for `PRJ-833..PRJ-845`
- `backend/app/**`
- `backend/scripts/run_behavior_validation.*`
- `backend/tests/**`
- `docs/**`
- `.codex/context/**`
- `.codex/tasks/**`

Excluded from commit scope:

- `artifacts/behavior_validation/prj843-report.json`

## Success Signal
- User or operator problem: v1 cannot deploy until the validated candidate is
  published.
- Expected product or reliability outcome: `origin/main` advances to the
  validated candidate.
- How success will be observed: commit hash and push result are recorded.
- Post-launch learning needed: no

## Deliverable For This Stage

A pushed deploy-candidate commit on `origin/main`, plus explicit release
posture for the next smoke task.

## Constraints

- do not push if the current branch is behind `origin/main`
- do not include local-only generated artifacts in the deploy commit
- do not deploy/smoke in this task; smoke is the next task after publish
- do not stage unrelated user changes

## Implementation Plan

1. Verify local `main` matches `origin/main`.
2. Stage the intended source/docs/task/context paths only.
3. Confirm `artifacts/` remains unstaged.
4. Commit with a terse release message.
5. Push `main` to `origin`.
6. Record the commit and push evidence in this task and context.

## Acceptance Criteria

- Local HEAD was checked against `origin/main` before publishing.
- Only intended paths were staged.
- Commit succeeds.
- Push to `origin/main` succeeds.
- Next task is production release smoke against the deployed revision.

## Definition of Done

- [ ] Candidate commit exists locally.
- [ ] Candidate commit is pushed to `origin/main`.
- [ ] Local-only artifacts remain uncommitted.
- [ ] Task board and project state are synchronized.

## Stage Exit Criteria

- [ ] The output matches the declared `release` stage.
- [ ] Work from later stages was not mixed in.
- [ ] Risks and assumptions for this stage are stated clearly.

## Forbidden

- force-pushing
- committing generated local artifacts with machine-specific paths
- pushing while local `main` is behind `origin/main`
- marking v1 deployed before production smoke passes

## Validation Evidence
- Tests:
  - `PRJ-843`: behavior-validation CI gate passed with `19 passed`,
    `gate_status=pass`
  - `PRJ-844`: full backend gate passed with `1009 passed`
- Manual checks:
  - local `HEAD` matched `origin/main` before release work started
- Screenshots/logs: not applicable
- High-risk checks: post-push production smoke remains required
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
- Follow-up architecture doc updates: none expected

## Deployment / Ops Evidence
- Deploy impact: high
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: revert the published commit or redeploy the previous known
  production revision if post-deploy smoke fails
- Observability or alerting impact: none
- Staged rollout or feature flag: repository-driven deployment via `main`

## Review Checklist
- [x] Process self-audit completed before implementation.
- [x] Autonomous loop evidence covers all seven steps.
- [x] Exactly one priority task was selected in this iteration.
- [x] Operation mode was selected according to iteration rotation.
- [x] Current stage is declared and respected.
- [ ] Deliverable for the current stage is complete.
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [ ] Definition of Done evidence is attached.
- [ ] Relevant validations were run.
- [ ] Docs or context were updated if repository truth changed.
- [ ] Learning journal was updated if a recurring pitfall was confirmed.

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: deploy operator
- Existing workaround or pain: validated code is only local until pushed
- Smallest useful slice: publish the validated candidate
- Success metric or signal: pushed commit on `origin/main`
- Feature flag, staged rollout, or disable path: rollback by reverting/redeploying
  previous revision
- Post-launch feedback or metric check: handled by next smoke task

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: production runtime deployment
- SLI: deploy-candidate publication succeeds without losing source parity
- SLO: pushed candidate must match the validated local tree
- Error budget posture: not applicable
- Health/readiness check: next task
- Logs, dashboard, or alert route: not changed
- Smoke command or manual smoke: next task
- Rollback or disable path: revert or redeploy previous revision

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: no secrets in commit scope
- Trust boundaries: unchanged
- Permission or ownership checks: unchanged
- Abuse cases: not applicable
- Secret handling: no secrets accessed
- Security tests or scans: existing backend suite only
- Fail-closed behavior: do not push if branch parity or checks fail
- Residual risk: production smoke still required after deployment

## AI Testing Evidence
- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios: covered by existing backend and behavior suites
- Multi-step context scenarios: covered by existing backend and behavior suites
- Adversarial or role-break scenarios: not in this publish slice
- Prompt injection checks: not in this publish slice
- Data leakage and unauthorized access checks: not in this publish slice
- Result: no new runtime behavior introduced in this publish task

## Result Report

- Task summary: pending
- Files changed: pending final commit scope
- How tested: see PRJ-843 and PRJ-844 validation evidence
- What is incomplete: push and production smoke are pending
- Next steps: run production release smoke after push
- Decisions made: generated `artifacts/` evidence stays local and uncommitted

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - validated runtime changes are still local.
- Gaps:
  - production cannot deploy the candidate until it is pushed.
- Inconsistencies:
  - none; local `HEAD` matched `origin/main` before publish work started.
- Architecture constraints:
  - deployment gate requires checks and smoke; this task only publishes the
    already validated candidate.

### 2. Select One Priority Task
- Selected task:
  - publish the v1 deploy candidate.
- Priority rationale:
  - it is the next blocker before production smoke.
- Why other candidates were deferred:
  - smoke requires a deployed or deploying revision.

### 3. Plan Implementation
- Files or surfaces to modify:
  - git index, commit history, and context/task evidence.
- Logic:
  - stage intended paths, commit, push.
- Edge cases:
  - if push fails or remote moves, stop and report instead of force-pushing.

### 4. Execute Implementation
- Implementation notes:
  - task contract created before staging and commit.

### 5. Verify and Test
- Validation performed:
  - pending
- Result:
  - pending

### 6. Self-Review
- Simpler option considered:
  - direct smoke without push, rejected because production would not contain
    the current local changes.
- Technical debt introduced: no
- Scalability assessment:
  - source publication remains normal GitHub/Coolify flow.
- Refinements made:
  - generated behavior artifact excluded from commit scope.

### 7. Update Documentation and Knowledge
- Docs updated:
  - pending
- Context updated:
  - pending
- Learning journal updated: not applicable unless a recurring pitfall appears.
