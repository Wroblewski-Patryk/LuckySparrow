# Task

## Header
- ID: PRJ-849
- Title: Publish And Smoke Organizer Guidance Fix
- Task Type: release
- Current Stage: release
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-848
- Priority: P1
- Coverage Ledger Rows: not applicable
- Iteration: 849
- Operation Mode: ARCHITECT

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

`PRJ-848` fixed organizer activation next-action precision and passed the full
backend gate. The validated fix then needed to be published and smoke-verified
in production.

## Goal

Publish the organizer activation guidance fix and verify that production serves
the new revision with release readiness still green.

## Scope

- commit and push `PRJ-846..PRJ-848` source/context/task evidence
- production release smoke against `https://aviary.luckysparrow.ch`
- `.codex/tasks/PRJ-849-publish-and-smoke-organizer-guidance-fix.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: the operator-readiness fix should be live, not only
  local.
- Expected product or reliability outcome: production health shows the precise
  Google Calendar next action while release readiness remains green.
- How success will be observed: pushed commit and release smoke evidence.
- Post-launch learning needed: no

## Deliverable For This Stage

A pushed and smoke-verified production revision containing the organizer
guidance fix.

## Constraints

- do not commit local generated `artifacts/`
- do not force-push
- do not mark release verified without parity smoke

## Implementation Plan

1. Confirm `origin/main` matched local `HEAD`.
2. Stage task/context evidence and the organizer guidance fix.
3. Commit and push.
4. Run release smoke with deploy parity wait.
5. Record smoke result locally without pushing a docs-only follow-up revision.

## Acceptance Criteria

- Commit is pushed to `origin/main`.
- Production runtime/web revision matches the pushed commit.
- Release smoke reports `release_ready=true`.
- Production organizer activation next actions include the precise Google
  Calendar token/calendar-id slug.

## Definition of Done

- [x] Candidate commit exists and is pushed.
- [x] Release smoke passed.
- [x] Revision parity was confirmed.
- [x] Local generated artifacts remain uncommitted.

## Stage Exit Criteria

- [x] The output matches the declared `release` stage.
- [x] Work from later stages was not mixed in.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden

- force-pushing
- committing generated local artifacts
- publishing without full backend validation
- treating provider credential gaps as solved by this guidance fix

## Validation Evidence
- Tests:
  - `PRJ-848` full backend gate:
    - `1010 passed in 103.38s`
- Manual checks:
  - `git diff --cached --check`
  - `git commit -m "fix: refine organizer activation guidance"`
  - `git push origin main`
  - release smoke:
    `.\backend\scripts\run_release_smoke.ps1 -BaseUrl "https://aviary.luckysparrow.ch" -WaitForDeployParity -DeployParityMaxWaitSeconds 900 -DeployParityPollSeconds 30 -HealthRetryMaxAttempts 10 -HealthRetryDelaySeconds 10`
- Screenshots/logs:
  - pushed commit:
    - `bdd3dcf` (`fix: refine organizer activation guidance`)
  - smoke:
    - `health_status=ok`
    - `release_ready=true`
    - `release_violations=[]`
    - `runtime_action=success`
    - `deployment_runtime_build_revision=bdd3dcfa01aad3c737fa46ef610d2e787976f3a3`
    - `web_shell_build_revision=bdd3dcfa01aad3c737fa46ef610d2e787976f3a3`
    - `deployment_local_repo_head_sha=bdd3dcfa01aad3c737fa46ef610d2e787976f3a3`
    - `organizer_tool_activation_next_actions` includes
      `configure_google_calendar_access_token_and_calendar_id`
- High-risk checks:
  - provider credential gaps remain visible and unsolved by this change
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
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: production release readiness remains green
- Smoke steps updated: no
- Rollback note: revert `bdd3dcf` if an external automation depends on the old
  partial-missing next-action slug
- Observability or alerting impact: none
- Staged rollout or feature flag: repository-driven Coolify source deployment

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
- User or operator affected: production operator
- Existing workaround or pain: operator guidance overstated missing settings
- Smallest useful slice: publish the precise next-action fix
- Success metric or signal: production smoke includes precise next action
- Feature flag, staged rollout, or disable path: revert commit
- Post-launch feedback or metric check: no

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: production readiness and organizer activation triage
- SLI: release smoke pass and next-action precision
- SLO: smoke green after deploy
- Error budget posture: healthy
- Health/readiness check: release smoke passed
- Logs, dashboard, or alert route: not changed
- Smoke command or manual smoke: recorded above
- Rollback or disable path: revert `bdd3dcf`

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: config names only, no secret values
- Trust boundaries: unchanged
- Permission or ownership checks: unchanged
- Abuse cases: not applicable
- Secret handling: no secrets accessed
- Security tests or scans: backend suite
- Fail-closed behavior: readiness remains false without credentials
- Residual risk: organizer workflows still require provider credentials

## AI Testing Evidence
- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios: not in this release task
- Multi-step context scenarios: not in this release task
- Adversarial or role-break scenarios: not in this release task
- Prompt injection checks: not in this release task
- Data leakage and unauthorized access checks: not in this release task
- Result: no AI behavior changed

## Result Report

- Task summary:
  - published and smoke-verified the organizer activation guidance fix.
- Files changed:
  - `.codex/tasks/PRJ-846-production-release-smoke.md`
  - `.codex/tasks/PRJ-847-post-deploy-stability-snapshot.md`
  - `.codex/tasks/PRJ-848-precise-organizer-activation-next-actions.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `backend/app/core/connector_execution.py`
  - `backend/tests/test_api_routes.py`
- How tested:
  - full backend gate before publish
  - production release smoke after publish
- What is incomplete:
  - PRJ-849 itself is local evidence and intentionally not pushed to avoid a
    docs-only redeploy cycle.
- Next steps:
  - provider credentials remain the next operational blocker if organizer
    workflows should become daily-use ready.
- Decisions made:
  - local generated `artifacts/` remains uncommitted.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - the validated fix was local until published.
- Gaps:
  - production smoke for the new revision was missing.
- Inconsistencies:
  - none after smoke; production revision matches local HEAD.
- Architecture constraints:
  - release gate requires production smoke after publish.

### 2. Select One Priority Task
- Selected task:
  - publish and smoke the organizer guidance fix.
- Priority rationale:
  - it closes the operator-readiness fix end-to-end.
- Why other candidates were deferred:
  - credentials require operator secret setup and cannot be completed by code.

### 3. Plan Implementation
- Files or surfaces to modify:
  - git history and release evidence.
- Logic:
  - commit/push, then release smoke with parity wait.
- Edge cases:
  - avoid a follow-up docs-only push after smoke evidence.

### 4. Execute Implementation
- Implementation notes:
  - committed `bdd3dcf` and pushed to `origin/main`.

### 5. Verify and Test
- Validation performed:
  - production release smoke with parity wait.
- Result:
  - passed.

### 6. Self-Review
- Simpler option considered:
  - relying on GitHub push only, rejected because production parity matters.
- Technical debt introduced: no
- Scalability assessment:
  - normal release flow remains intact.
- Refinements made:
  - kept smoke evidence local to avoid a new deploy cycle.

### 7. Update Documentation and Knowledge
- Docs updated:
  - no canonical docs changed.
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable; no recurring pitfall was confirmed.
