# Task

## Header
- ID: PRJ-620
- Title: Add behavior and release proof for live web-knowledge workflows
- Status: DONE
- Owner: QA/Test
- Depends on: PRJ-619
- Priority: P0

## Context
Once website-reading readiness is live, release and behavior proof must show that the personality can actually use bounded web knowledge in the intended way.

## Goal
Prove the bounded website-reading workflow through tests and release evidence.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] Behavior validation covers at least one bounded website-reading scenario.
- [x] Release smoke proves the same website-reading contract from runtime truth.
- [x] Regression coverage pins the key workflow surfaces.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `.\.venv\Scripts\python -m pytest -q tests/test_observability_policy.py tests/test_api_routes.py tests/test_deployment_trigger_scripts.py` -> `122 passed`
  - `.\scripts\run_behavior_validation.ps1 -GateMode ci -ArtifactPath artifacts/behavior_validation/report.json` -> `14 passed`, `gate_status=pass`
- Manual checks: release-smoke proof is now pinned by script regressions and bundle-contract assertions
- Screenshots/logs:
- High-risk checks: prove the workflow without widening provider payload exposure or bypassing planning/action

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/architecture/29_runtime_behavior_testing.md`, `docs/architecture/16_agent_contracts.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates: testing guidance and ops notes likely

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
The target scenario should feel like a real user request, not only a provider-unit test.

Completion notes:

- release-smoke and incident-evidence bundle validation now require the same
  bounded `connectors.web_knowledge_tools.website_reading_workflow` contract
  that `/health` exposes
- incident-evidence export now includes `connectors.web_knowledge_tools`, so
  debug-mode evidence and release bundles no longer trail the public health
  contract
- behavior proof continues to reuse existing bounded web-knowledge and
  tool-grounded-learning scenarios (`T14.1`, `T14.2`, `T17.1`) instead of
  creating a parallel acceptance system
