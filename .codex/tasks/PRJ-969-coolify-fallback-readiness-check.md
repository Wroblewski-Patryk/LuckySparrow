# Task

## Header
- ID: PRJ-969
- Title: Add Coolify fallback secret and runbook readiness check
- Task Type: release
- Current Stage: release
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-968
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 969
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

The repo already had an approved Coolify webhook fallback trigger and release
smoke evidence validation. Operators still needed a safe readiness command that
checks whether fallback inputs are present before any deploy-triggering action
is run.

## Goal

Add a read-only Coolify fallback readiness check and document how it fits into
the release runbook.

## Scope

- `backend/scripts/check_coolify_fallback_readiness.py`
- `backend/scripts/check_coolify_fallback_readiness.ps1`
- `backend/tests/test_deployment_trigger_scripts.py`
- `docs/operations/runtime-ops-runbook.md`
- `docs/operations/release-evidence-index.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: fallback deploy readiness could only be discovered
  at trigger time.
- Expected product or reliability outcome: operator can see missing webhook
  URL/secret or SHA inputs without triggering a deploy.
- How success will be observed: readiness report prints `ready=true` only when
  required fallback inputs are present.
- Post-launch learning needed: no

## Deliverable For This Stage

A tested readiness command, PowerShell wrapper, and runbook guidance.

## Constraints
- use existing systems and approved mechanisms
- do not trigger a deploy
- do not print or persist secrets
- do not replace source automation as the primary deployment path
- stay within the declared current stage unless explicit approval changes it

## Implementation Plan
1. Add a Python readiness checker beside the existing Coolify trigger.
2. Add a PowerShell wrapper that reads optional environment defaults.
3. Validate URL, secret presence, secret length, repo, branch, SHA shape, and
   canonical Coolify app metadata.
4. Add tests for ready, blocked, main-output, and help paths.
5. Update runbook, release evidence index, roadmap, task board, and project
   state.

## Acceptance Criteria
- Readiness command exits ready only with required safe inputs.
- Missing or unsafe inputs are reported by named checks.
- Secret value is redacted from command hints and reports.
- Focused tests pass.
- Runbook documents readiness before trigger and release smoke after trigger.

## Definition of Done
- [x] Readiness script exists.
- [x] PowerShell wrapper exists.
- [x] Tests cover ready and blocked paths.
- [x] Runbook and release index are updated.
- [x] Task board and project state are synchronized.

## Validation Evidence
- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_deployment_trigger_scripts.py -k "coolify_fallback_readiness or backend_operator_scripts_expose_help"; Pop-Location`
  - result: `13 passed, 47 deselected`
- Manual checks:
  - `Push-Location .\backend; ..\.venv\Scripts\python .\scripts\check_coolify_fallback_readiness.py --print-json; Pop-Location`
  - result: `readiness_state=blocked` because webhook URL and secret are not
    present in the local environment
- Screenshots/logs:
  - not applicable
- High-risk checks:
  - readiness check does not call the Coolify webhook
  - report uses `secret_redacted=true`
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/operations/runtime-ops-runbook.md`
  - `docs/operations/release-evidence-index.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates:
  - runbook now documents readiness check before fallback trigger

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: runbook documents release smoke after fallback trigger
- Rollback note: remove readiness script and wrapper if fallback process is
  replaced by a different approved mechanism
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

## Notes

The current local readiness report is expected to be blocked because
`COOLIFY_DEPLOY_WEBHOOK_URL` and `COOLIFY_DEPLOY_WEBHOOK_SECRET` are not set in
this workspace.

## Production-Grade Required Contract

- Goal: make fallback deploy readiness checkable before trigger time.
- Scope: release script, wrapper, tests, docs/context.
- Implementation Plan: see above.
- Acceptance Criteria: see above.
- Definition of Done: see above.
- Result Report: see below.

## Integration Evidence

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: no, read-only local validation only
- Endpoint and client contract match: not applicable
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: not applicable
- Regression check performed: yes

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: release operator
- Existing workaround or pain: fallback readiness was mixed with trigger time
- Smallest useful slice: input readiness check
- Success metric or signal: named checks explain ready or blocked state
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: no

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: fallback deployment recovery
- SLI: fallback readiness check accuracy
- SLO: no fallback trigger without ready inputs
- Error budget posture: not applicable
- Health/readiness check: local readiness report
- Logs, dashboard, or alert route: JSON output
- Smoke command or manual smoke: release smoke after any actual trigger
- Rollback or disable path: remove wrapper and script

## AI Testing Evidence

Not applicable; no AI behavior changed.

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: deploy metadata and secret presence only
- Trust boundaries: local operator environment and Coolify fallback trigger
- Permission or ownership checks: no deploy call is made
- Abuse cases: accidental deploy trigger, secret leakage
- Secret handling: secret is checked for presence/length and redacted
- Security tests or scans: tests assert secret is absent from command hint
- Fail-closed behavior: missing/unsafe inputs return blocked/non-zero
- Residual risk: operators still need to protect actual webhook secret outside
  git

## Result Report

- Task summary: added read-only Coolify fallback readiness check.
- Files changed:
  - `backend/scripts/check_coolify_fallback_readiness.py`
  - `backend/scripts/check_coolify_fallback_readiness.ps1`
  - `backend/tests/test_deployment_trigger_scripts.py`
  - `docs/operations/runtime-ops-runbook.md`
  - `docs/operations/release-evidence-index.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - focused deployment-trigger tests
  - local readiness command
- What is incomplete:
  - actual fallback trigger remains operator-controlled and requires secrets
- Next steps:
  - `PRJ-970` release go/no-go command wrapper
- Decisions made:
  - readiness check validates fallback inputs but never calls the webhook

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: trigger existed, readiness check did not.
- Gaps: fallback URL/secret readiness was not machine-visible before trigger.
- Inconsistencies: runbook described release smoke and trigger evidence but not
  pre-trigger readiness.
- Architecture constraints: source automation remains primary path.

### 2. Select One Priority Task
- Selected task: PRJ-969 Coolify fallback readiness check.
- Priority rationale: it is local, unblocked, and prepares PRJ-970.
- Why other candidates were deferred: PRJ-970 should compose existing checks
  after this fallback readiness surface exists.

### 3. Plan Implementation
- Files or surfaces to modify: scripts, tests, ops docs, context.
- Logic: validate inputs and print JSON report.
- Edge cases: missing secret, non-HTTPS URL, invalid SHA, secret redaction.

### 4. Execute Implementation
- Implementation notes: reused deployment policy snapshot for canonical
  Coolify app truth.

### 5. Verify and Test
- Validation performed: focused pytest and local blocked readiness output.
- Result: tests passed; local environment correctly reports blocked.

### 6. Self-Review
- Simpler option considered: docs-only checklist.
- Technical debt introduced: no
- Scalability assessment: report can be consumed by PRJ-970 wrapper.
- Refinements made: command hint redacts the secret placeholder.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/operations/runtime-ops-runbook.md`
  - `docs/operations/release-evidence-index.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
