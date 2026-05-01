# Task

## Header
- ID: PRJ-846
- Title: Production Release Smoke
- Task Type: release
- Current Stage: release
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-845
- Priority: P0
- Coverage Ledger Rows: not applicable
- Iteration: 846
- Operation Mode: ARCHITECT

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

`PRJ-845` pushed the validated v1 candidate to `origin/main`. Production
needed a post-push smoke test to confirm that Coolify deployed the expected
revision and that the runtime release-readiness contract is green.

## Goal

Confirm that production at `https://aviary.luckysparrow.ch` is serving the
latest pushed revision and passes the release smoke contract.

## Scope

- production `/health`
- production web shell build revision
- production `POST /event` smoke path
- deployment parity against local HEAD `1a04b242b54acd5c09f9e67e009b6d86562ba5e6`
- `.codex/tasks/PRJ-846-production-release-smoke.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: v1 must be verified on production, not only pushed.
- Expected product or reliability outcome: deployed runtime is healthy,
  release-ready, and matches the pushed revision.
- How success will be observed: release smoke output reports `health_status=ok`,
  `release_ready=true`, matching runtime/web build revisions, and
  `runtime_action=success`.
- Post-launch learning needed: no

## Deliverable For This Stage

Production smoke evidence proving v1 deployment parity and runtime readiness.

## Constraints

- use the existing release smoke script
- do not change production configuration
- do not mark v1 deployed if revision parity or release readiness fails
- do not push a docs-only closure commit after smoke, because that would create
  a new production revision and require another smoke cycle

## Implementation Plan

1. Run release smoke with deployment parity wait against
   `https://aviary.luckysparrow.ch`.
2. If production returns transient deploy-time 503, retry with a longer window.
3. Record deployed revision, release readiness, health status, and event result.
4. Update context locally with the deployed posture.

## Acceptance Criteria

- Production `/health` is reachable and healthy.
- Production runtime build revision equals local HEAD.
- Production web shell build revision equals local HEAD.
- Release readiness is true with no release violations.
- Event smoke returns a successful runtime action.

## Definition of Done

- [x] Release smoke passed.
- [x] Revision parity was confirmed.
- [x] Release readiness was confirmed.
- [x] Task board and project state were updated locally.

## Stage Exit Criteria

- [x] The output matches the declared `release` stage.
- [x] Work from later stages was not mixed in.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden

- declaring deployment complete from push alone
- ignoring transient 503 during deploy warmup without retrying
- creating another deploy-triggering commit solely to record smoke evidence

## Validation Evidence
- Tests:
  - `PRJ-843`: behavior-validation gate passed with `19 passed`,
    `gate_status=pass`
  - `PRJ-844`: full backend gate passed with `1009 passed`
- Manual checks:
  - first smoke attempt:
    `.\backend\scripts\run_release_smoke.ps1 -BaseUrl "https://aviary.luckysparrow.ch" -WaitForDeployParity -DeployParityMaxWaitSeconds 600 -DeployParityPollSeconds 20 -HealthRetryMaxAttempts 5 -HealthRetryDelaySeconds 8`
    - result: transient `503 Service Unavailable`
  - retry smoke:
    `.\backend\scripts\run_release_smoke.ps1 -BaseUrl "https://aviary.luckysparrow.ch" -WaitForDeployParity -DeployParityMaxWaitSeconds 900 -DeployParityPollSeconds 30 -HealthRetryMaxAttempts 10 -HealthRetryDelaySeconds 10`
    - result: pass
- Screenshots/logs:
  - smoke output included:
    - `health_status=ok`
    - `release_ready=true`
    - `release_violations=[]`
    - `runtime_action=success`
    - `deployment_runtime_build_revision=1a04b242b54acd5c09f9e67e009b6d86562ba5e6`
    - `web_shell_build_revision=1a04b242b54acd5c09f9e67e009b6d86562ba5e6`
    - `deployment_local_repo_head_sha=1a04b242b54acd5c09f9e67e009b6d86562ba5e6`
- High-risk checks:
  - release parity passed after deploy warmup
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
- Deploy impact: high
- Env or secret changes: none
- Health-check impact: production health is green
- Smoke steps updated: no
- Rollback note: rollback remains reverting/redeploying the previous known
  production revision; not needed because smoke passed
- Observability or alerting impact: none
- Staged rollout or feature flag: repository-driven Coolify source automation

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

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: deploy operator and production user
- Existing workaround or pain: push alone does not prove production parity
- Smallest useful slice: one production release smoke with parity wait
- Success metric or signal: `release_ready=true` and revision parity
- Feature flag, staged rollout, or disable path: rollback by previous revision
- Post-launch feedback or metric check: no

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: production health, web shell, and foreground event
- SLI: release smoke pass
- SLO: pass before declaring v1 deployed
- Error budget posture: healthy
- Health/readiness check: production `/health` passed
- Logs, dashboard, or alert route: not changed
- Smoke command or manual smoke: passed retry command recorded above
- Rollback or disable path: previous production revision if future regression
  appears

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: smoke uses synthetic manual-smoke event only
- Trust boundaries: unchanged
- Permission or ownership checks: unchanged
- Abuse cases: not applicable
- Secret handling: no secrets accessed
- Security tests or scans: existing backend suite and release smoke only
- Fail-closed behavior: release would remain blocked on smoke failure
- Residual risk: organizer daily-use workflows remain blocked by provider
  credential activation, as reported by health, but core release readiness is
  green.

## AI Testing Evidence
- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios: covered by PRJ-843/PRJ-844 evidence
- Multi-step context scenarios: covered by PRJ-843/PRJ-844 evidence
- Adversarial or role-break scenarios: not in this smoke task
- Prompt injection checks: not in this smoke task
- Data leakage and unauthorized access checks: not in this smoke task
- Result: no new AI surface introduced by smoke

## Result Report

- Task summary:
  - production is serving revision
    `1a04b242b54acd5c09f9e67e009b6d86562ba5e6` with release readiness green.
- Files changed:
  - `.codex/tasks/PRJ-846-production-release-smoke.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - production release smoke passed on retry after deploy warmup.
- What is incomplete:
  - local smoke evidence/context is intentionally not pushed to avoid
    triggering a new docs-only production deploy cycle.
- Next steps:
  - monitor production behavior and provider credential activation blockers
    separately from core v1 deployment.
- Decisions made:
  - no additional push after smoke evidence.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - push succeeded but production parity was not yet proven.
- Gaps:
  - production smoke evidence was missing.
- Inconsistencies:
  - none after retry; production revision matched local HEAD.
- Architecture constraints:
  - deployment gate requires smoke result before v1 can be called deployed.

### 2. Select One Priority Task
- Selected task:
  - production release smoke.
- Priority rationale:
  - it is the final blocker after publish.
- Why other candidates were deferred:
  - provider activation and organizer blockers are not release-readiness
    blockers for this core runtime deploy.

### 3. Plan Implementation
- Files or surfaces to modify:
  - task/context evidence only.
- Logic:
  - run release smoke with parity wait and retry if deploy warmup returns 503.
- Edge cases:
  - transient 503 during deploy warmup should be retried with a longer window.

### 4. Execute Implementation
- Implementation notes:
  - first attempt observed transient production 503.
  - second attempt passed after waiting for deployment parity.

### 5. Verify and Test
- Validation performed:
  - production release smoke with parity wait.
- Result:
  - passed; production revision equals local HEAD and release readiness is true.

### 6. Self-Review
- Simpler option considered:
  - checking `/health` only, rejected because release smoke also validates web
    revision and event path.
- Technical debt introduced: no
- Scalability assessment:
  - existing release smoke remains sufficient for this deploy.
- Refinements made:
  - avoided a post-smoke push that would trigger a new deploy cycle.

### 7. Update Documentation and Knowledge
- Docs updated:
  - no canonical docs changed; smoke behavior matched existing runbook.
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable; transient deploy warmup was handled
  by existing retry behavior and did not reveal a new recurring pitfall.
