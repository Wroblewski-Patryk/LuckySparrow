# Task

## Header
- ID: PRJ-578
- Title: Add durable-attention release and behavior evidence
- Status: DONE
- Owner: QA/Test
- Depends on: PRJ-577
- Priority: P1

## Context
Production already runs `ATTENTION_COORDINATION_MODE=durable_inbox`, but the
cutover still needs machine-readable proof through release smoke,
`incident_evidence`, and behavior validation. The baseline and rollback posture
were frozen in `PRJ-576`, and the runtime switch was completed in `PRJ-577`.

## Goal
Prove the durable-attention production baseline through existing observability
and behavior-validation mechanisms so burst-message coalescing no longer relies
on manual operator inspection.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [ ] release smoke fails when durable-attention production posture drifts
- [ ] incident evidence requires durable-attention and runtime-topology attention proof
- [ ] behavior validation includes a durable-attention burst-coalescing proof path

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `.\.venv\Scripts\python -m pytest -q tests/test_observability_policy.py tests/test_api_routes.py tests/test_deployment_trigger_scripts.py tests/test_behavior_validation_script.py` -> `124 passed`
  - `.\scripts\run_behavior_validation.ps1 -GateMode ci -ArtifactPath artifacts/behavior_validation/report.json` -> `12 passed`, `gate_status=pass`
- Manual checks:
  - pre-deploy production smoke failed with `attention is missing attention_policy_owner`, confirming the live stack had not picked up the new durable-attention evidence contract yet
- Screenshots/logs:
  - CI behavior artifact written to `artifacts/behavior_validation/report.json`
- High-risk checks:
  - release smoke contract now requires `attention` and `runtime_topology.attention_switch` from `/health`, debug `incident_evidence`, and incident-evidence bundles

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/16_agent_contracts.md`
  - `docs/architecture/17_logging_and_debugging.md`
  - `docs/architecture/29_runtime_behavior_testing.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates:

## Review Checklist (mandatory)
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated if repository truth changed.
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
Extend the existing observability export owner, release smoke script, and
behavior-validation gate rather than introducing a new proof subsystem.
