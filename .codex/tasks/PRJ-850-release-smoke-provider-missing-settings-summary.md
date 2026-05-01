# Task

## Header
- ID: PRJ-850
- Title: Release Smoke Provider Missing Settings Summary
- Task Type: fix
- Current Stage: implementation
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-849
- Priority: P1
- Coverage Ledger Rows: not applicable
- Iteration: 850
- Operation Mode: TESTER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

Production now exposes precise organizer activation next actions. The release
smoke script validates `activation_snapshot.provider_requirements.*.missing_settings`,
but its JSON summary only returns the top-level next actions and credential-gap
operations. Operators still have to inspect full `/health` to see the exact
per-provider missing settings after a smoke run.

## Goal

Expose per-provider organizer activation missing settings in the existing
release-smoke summary without changing readiness semantics or provider
execution boundaries.

## Scope

- `backend/scripts/run_release_smoke.ps1`
- `backend/tests/test_deployment_trigger_scripts.py`
- `.codex/tasks/PRJ-850-release-smoke-provider-missing-settings-summary.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: release smoke should directly tell operators which
  provider settings are missing.
- Expected product or reliability outcome: smoke output contains
  `organizer_tool_activation_missing_settings_by_provider` and matching
  incident/bundle variants.
- How success will be observed: release-smoke tests assert the new summary
  fields.
- Post-launch learning needed: no

## Deliverable For This Stage

A small release-smoke summary enhancement with targeted tests.

## Constraints

- reuse existing organizer-tool contract validation
- do not expose secret values, only setting names already present in `/health`
- do not change readiness states, approved operations, opt-in, or confirmation
  boundaries
- do not add a new operator subsystem

## Implementation Plan

1. Extend `Assert-OrganizerToolStackContract` to return a hashtable of
   provider -> missing settings.
2. Add health, incident-evidence, and incident-bundle summary fields that carry
   the same data.
3. Extend release-smoke tests to assert those fields.
4. Run focused deployment-trigger script tests.
5. Sync task/context evidence.

## Acceptance Criteria

- Release-smoke summary includes missing settings by provider for health.
- Debug incident-evidence summary includes the same shape when debug is used.
- Incident-bundle summary includes the same shape when a bundle is provided.
- Existing release smoke contract tests still pass.

## Definition of Done

- [x] Script change is implemented.
- [x] Focused release-smoke tests pass.
- [x] No secret values are exposed.
- [x] Task board and project state are synchronized.

## Stage Exit Criteria

- [x] The output matches the declared `implementation` stage.
- [x] Work from later stages was not mixed in.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden

- logging credential values
- changing provider readiness semantics
- creating a second activation surface outside the existing smoke summary
- making organizer activation a core v1 blocker

## Validation Evidence
- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_deployment_trigger_scripts.py -k "release_smoke_includes_debug_incident_evidence_when_requested or release_smoke_verifies_incident_evidence_bundle_when_bundle_path_is_provided or organizer_tool_activation"; Pop-Location`
    - `2 passed, 49 deselected`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_deployment_trigger_scripts.py -k "organizer_tool_activation or release_smoke"; Pop-Location`
    - `40 passed, 11 deselected`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_deployment_trigger_scripts.py; Pop-Location`
    - `51 passed in 65.16s`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; Pop-Location`
    - `1010 passed in 105.03s`
- Manual checks: not applicable
- Screenshots/logs: not applicable
- High-risk checks: only setting names are surfaced
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: not applicable

## Architecture Evidence
- Architecture source reviewed:
  - `docs/operations/runtime-ops-runbook.md`
  - `DEPLOYMENT_GATE.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none expected

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: release smoke summary becomes more informative
- Rollback note: revert the smoke summary patch if downstream automation cannot
  tolerate new JSON fields
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
- User or operator affected: release operator
- Existing workaround or pain: inspect full `/health` after smoke to get
  provider-specific missing settings
- Smallest useful slice: add per-provider missing settings to smoke summary
- Success metric or signal: targeted tests pass
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: no

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: production release and provider activation triage
- SLI: release-smoke evidence completeness
- SLO: smoke summary includes actionable missing settings
- Error budget posture: not applicable
- Health/readiness check: smoke summary contract tests
- Logs, dashboard, or alert route: not changed
- Smoke command or manual smoke: focused tests
- Rollback or disable path: revert patch

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: configuration setting names only
- Trust boundaries: unchanged
- Permission or ownership checks: unchanged
- Abuse cases: avoid leaking secret values
- Secret handling: no secret values are read beyond existing `/health` names
- Security tests or scans: tests assert shape, not values
- Fail-closed behavior: smoke still fails on contract drift
- Residual risk: downstream JSON consumers should ignore unknown fields

## AI Testing Evidence
- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios: not in this task
- Multi-step context scenarios: not in this task
- Adversarial or role-break scenarios: not in this task
- Prompt injection checks: not in this task
- Data leakage and unauthorized access checks: no secret values exposed
- Result: not applicable

## Result Report

- Task summary:
  - added per-provider organizer activation missing-settings fields to release
    smoke summary output.
- Files changed:
  - `backend/scripts/run_release_smoke.ps1`
  - `backend/tests/test_deployment_trigger_scripts.py`
  - `.codex/tasks/PRJ-850-release-smoke-provider-missing-settings-summary.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - focused and full deployment-trigger script tests, plus the full backend
    gate.
- What is incomplete:
  - the change is local and not yet published/deployed.
- Next steps:
  - run the normal backend/release validation before publishing if this
    operator-smoke improvement should go live.
- Decisions made: use existing release smoke summary instead of adding a new
  operator script

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - release smoke validates missing settings but does not summarize them.
- Gaps:
  - provider activation triage still requires a separate `/health` read.
- Inconsistencies:
  - none in runtime truth; this is a reporting completeness gap.
- Architecture constraints:
  - reuse `/health.connectors.organizer_tool_stack` and release smoke.

### 2. Select One Priority Task
- Selected task:
  - add missing-settings summary to release smoke.
- Priority rationale:
  - it makes the next provider-activation step clearer without secrets.
- Why other candidates were deferred:
  - actual provider activation needs credentials outside code.

### 3. Plan Implementation
- Files or surfaces to modify:
  - release smoke script and tests.
- Logic:
  - return provider missing settings from the existing assertion helper.
- Edge cases:
  - debug and incident bundle paths should expose the same summary shape.

### 4. Execute Implementation
- Implementation notes:
  - `Assert-OrganizerToolStackContract` now returns
    `activation_missing_settings_by_provider`.
  - the top-level smoke summary, debug incident-evidence summary, and incident
    bundle summary now expose the same provider -> missing settings shape.

### 5. Verify and Test
- Validation performed:
  - focused and full deployment-trigger script tests.
  - full backend gate.
- Result:
  - all selected tests passed.

### 6. Self-Review
- Simpler option considered:
  - new standalone activation script, rejected because release smoke already
    validates the contract.
- Technical debt introduced: no
- Scalability assessment:
  - extra JSON fields are additive.
- Refinements made:
  - used existing contract output rather than adding a new operator script.

### 7. Update Documentation and Knowledge
- Docs updated:
  - no canonical docs changed; release smoke already owns this evidence path.
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable; no recurring pitfall was confirmed.
