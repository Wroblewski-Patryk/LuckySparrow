# Task

## Header
- ID: PRJ-922
- Title: Production-Safe Incident Evidence Export
- Task Type: fix
- Current Stage: verification
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-908, PRJ-910
- Priority: P0
- Coverage Ledger Rows: not applicable
- Iteration: 922
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
PRJ-908 proved that production strict policy must not be weakened just to
export an incident-evidence bundle. PRJ-910 kept core v1 evidence green but
left the final v1 declaration blocked by the missing production-safe bundle.

## Goal
Allow the existing incident-evidence bundle helper to export a release-smoke
bundle from strict production without enabling full debug payload exposure.

## Scope
- `backend/app/core/observability_policy.py`
- `backend/scripts/export_incident_evidence_bundle.py`
- `backend/tests/test_observability_policy.py`
- `backend/tests/test_incident_evidence_bundle_script.py`
- `docs/architecture/17_logging_and_debugging.md`
- `docs/operations/runtime-ops-runbook.md`
- `docs/planning/v1-production-incident-evidence-bundle.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `.codex/tasks/PRJ-922-production-safe-incident-evidence-export.md`

## Success Signal
- User or operator problem: release owner can produce the canonical bundle
  while production debug payload access remains disabled.
- Expected product or reliability outcome: strict production safety and release
  evidence collection no longer conflict.
- How success will be observed: export helper falls back to `/health` only when
  `/internal/event/debug` returns the expected disabled-debug 403, and release
  smoke accepts the bundle.
- Post-launch learning needed: no

## Deliverable For This Stage
Production-safe health-derived incident-evidence fallback, tests, docs, and
production bundle validation.

## Constraints
- do not enable `EVENT_DEBUG_ENABLED=true`
- do not expose full debug or `system_debug` payloads
- fallback only on the explicit disabled-debug 403
- keep the existing bundle file contract unchanged
- do not commit generated evidence artifacts

## Implementation Plan
1. Add a policy helper that builds `runtime_incident_evidence` from the same
   `/health` policy surfaces used by release smoke.
2. Update the bundle exporter to try the debug route first and fall back to the
   health-derived evidence only for the disabled-debug 403.
3. Add narrow unit tests for the policy helper and exporter fallback.
4. Export a production bundle in strict mode and verify it with release smoke.
5. Update source-of-truth docs and context.

## Acceptance Criteria
- Debug-enabled environments still export from `/internal/event/debug`.
- Strict production exports from `/health` without debug payload exposure.
- Invalid debug-token or unrelated HTTP failures still fail closed.
- The generated bundle passes release smoke with `-IncidentEvidenceBundlePath`.

## Definition of Done
- [x] Health-derived incident evidence helper exists.
- [x] Exporter fallback is implemented and fail-closed.
- [x] Focused tests pass.
- [x] Production bundle export succeeds in strict mode.
- [x] Release smoke accepts the production bundle.
- [x] Docs and context are updated.

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
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_observability_policy.py tests/test_incident_evidence_bundle_script.py; Pop-Location`
  - result: `8 passed`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_observability_policy.py tests/test_incident_evidence_bundle_script.py tests/test_deployment_trigger_scripts.py; Pop-Location`
  - result: `60 passed`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; Pop-Location`
  - result: `1021 passed`
- Manual checks:
  - production bundle export used `incident_evidence_source=health_snapshot_strict_mode`
  - production bundle path:
    `.codex/artifacts/prj922-production-safe-incident-evidence/20260502T213839Z_prj922-strict-production-evidence-08dda30`
  - `.\backend\scripts\run_release_smoke.ps1 -BaseUrl "https://aviary.luckysparrow.ch" -IncidentEvidenceBundlePath ".codex\artifacts\prj922-production-safe-incident-evidence\20260502T213839Z_prj922-strict-production-evidence-08dda30" -WaitForDeployParity -DeployParityMaxWaitSeconds 300 -DeployParityPollSeconds 30 -HealthRetryMaxAttempts 10 -HealthRetryDelaySeconds 10`
  - post-push production smoke without bundle also passed for
    `08dda306b554d55183d7cd675bc0f9aaf95480a5`
  - result: passed
- Screenshots/logs: not applicable
- High-risk checks:
  - no production env or secret change
  - no debug payload enabled
  - generated evidence remains local-only
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/architecture/17_logging_and_debugging.md`
  - `docs/operations/runtime-ops-runbook.md`
  - `docs/planning/v1-production-incident-evidence-bundle.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: completed in this task

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: yes, documented strict-mode helper behavior
- Rollback note: remove the exporter fallback to restore previous behavior
- Observability or alerting impact: incident bundle export no longer requires
  debug payload exposure in strict production
- Staged rollout or feature flag: `--disable-health-only-fallback` can force
  the previous fail-fast behavior

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

- Task summary: added a production-safe strict-mode incident evidence export
  fallback.
- Files changed:
  - `backend/app/core/observability_policy.py`
  - `backend/scripts/export_incident_evidence_bundle.py`
  - `backend/tests/test_observability_policy.py`
  - `backend/tests/test_incident_evidence_bundle_script.py`
  - `docs/architecture/17_logging_and_debugging.md`
  - `docs/operations/runtime-ops-runbook.md`
  - `docs/planning/v1-production-incident-evidence-bundle.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/tasks/PRJ-922-production-safe-incident-evidence-export.md`
- How tested: focused pytest suite, deployment/smoke script regression suite,
  production export, release smoke with bundle.
- What is incomplete: final v1 declaration should be refreshed in the next
  release task against the now-available PRJ-922 bundle.
- Next steps: update final v1 acceptance/declaration from NO-GO to GO if no new
  blocker appears.
- Decisions made: strict production bundle export may use `/health` policy
  surfaces when debug payload exposure is intentionally disabled.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: PRJ-908 bundle export depended on full debug payload access.
- Gaps: no strict-production export path existed for the same policy surfaces.
- Inconsistencies: PRJ-910 core gates were green while final release remained
  blocked by evidence export.
- Architecture constraints: production debug payload exposure must remain off.

### 2. Select One Priority Task
- Selected task: PRJ-922 Production-Safe Incident Evidence Export.
- Priority rationale: it resolves the P0 blocker preventing final v1 evidence.
- Why other candidates were deferred: UI and extension polish are lower
  priority until release evidence can close.

### 3. Plan Implementation
- Files or surfaces to modify: observability helper, export script, tests,
  planning/context docs.
- Logic: build `runtime_incident_evidence` from `/health` policy surfaces only
  when the debug endpoint reports disabled debug payload.
- Edge cases: invalid debug token and unrelated HTTP errors still raise.
- Validation: focused pytest, production export, release smoke with bundle.

### 4. Execute Implementation
- Added `build_runtime_incident_evidence_from_health_snapshot`.
- Added exporter fallback and `--disable-health-only-fallback`.
- Added tests for helper and strict-mode export.
- Exported and verified a production bundle.

### 5. Verify And Test
- Focused tests, deployment/smoke script regressions, and full backend baseline
  passed.
- Production bundle export succeeded without env changes.
- Release smoke accepted the generated bundle.

### 6. Self-Review
- Architecture alignment: yes, reuses existing health policy surfaces and
  bundle contract.
- Existing system reuse: yes, no new route or storage mechanism.
- Workaround check: the fallback is a documented strict-mode export path, not a
  temporary bypass.
- Duplication check: policy surface mapping stays centralized in the helper.

### 7. Update Documentation And Knowledge
- Updated planning and ops docs.
- Updated task board and project state.
- Learning journal update: not required; no new recurring pitfall discovered.
