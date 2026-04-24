# Task

## Header
- ID: PRJ-606
- Title: Add behavior and release evidence for tool-grounded learning
- Status: DONE
- Owner: QA/Test
- Depends on: PRJ-605
- Priority: P1

## Context
Approved external reads already persist bounded tool-grounded conclusions, but
release smoke and behavior-validation still lacked one shared proof path that
showed later cognition reusing those conclusions without bypassing the action
boundary.

## Goal
Prove through runtime behavior, release smoke, and incident-evidence gates that
approved external reads can influence later cognition only through the bounded
tool-grounded learning contract.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] behavior-validation scenarios prove bounded tool-grounded recall through later turns
- [x] release smoke and incident-evidence gates validate the same learned-state tool-grounded contract
- [x] source-of-truth files record `PRJ-606` completion and the next queued slice

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests: `.\.venv\Scripts\python -m pytest -q tests/test_runtime_pipeline.py tests/test_api_routes.py tests/test_deployment_trigger_scripts.py tests/test_behavior_validation_script.py` -> `233 passed`
- Manual checks: `.\scripts\run_behavior_validation.ps1 -GateMode ci -ArtifactPath artifacts/behavior_validation/report.json` -> `14 passed`, `gate_status=pass`
- Screenshots/logs: none
- High-risk checks: behavior scenarios `T17.1..T17.2` plus smoke-level learned-state contract validation

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/architecture/16_agent_contracts.md`, `docs/architecture/29_runtime_behavior_testing.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates: `PRJ-607`

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
The evidence lane intentionally reuses `learned_state`, `v1_readiness`,
behavior-validation, and release-smoke surfaces instead of creating a separate
tool-learning export family.
