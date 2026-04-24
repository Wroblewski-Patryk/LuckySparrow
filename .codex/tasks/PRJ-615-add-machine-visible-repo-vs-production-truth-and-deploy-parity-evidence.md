# Task

## Header
- ID: PRJ-615
- Title: Add machine-visible repo-vs-production truth and deploy-parity evidence
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-614
- Priority: P0

## Context
Deploy provenance exists, but the user still needs clearer evidence that live production actually matches the intended repository baseline for the current no-UI `v1` slice.

## Goal
Expose machine-visible parity evidence for repository-intended versus live deployed baseline.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] Existing health or observability surfaces expose deploy-parity truth.
- [x] Release evidence consumes the same parity contract.
- [x] Regression coverage pins the new evidence path.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests: `.\.venv\Scripts\python -m pytest -q tests/test_api_routes.py tests/test_deployment_trigger_scripts.py tests/test_coolify_compose.py`
- Manual checks:
  - `.\scripts\run_release_smoke.ps1 -BaseUrl 'https://personality.luckysparrow.ch'`
  - live smoke now fails explicitly when production is still behind repo truth instead of passing without deploy-parity evidence
- Screenshots/logs:
- High-risk checks: do not invent a second deployment-truth system separate from existing deployment/observability owners

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/architecture/17_logging_and_debugging.md`, `docs/architecture/26_env_and_config.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates: likely runtime reality/runbook/testing if the contract widens

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
The target is operator-readable parity evidence, not a new deployment controller.

Completed in this slice:

- `/health.deployment` and exported `incident_evidence.policy_posture["deployment"]`
  now expose:
  - `runtime_build_revision`
  - `runtime_build_revision_state`
  - `runtime_trigger_mode`
  - `runtime_trigger_class`
  - `runtime_provenance_state`
  - `repo_to_production_parity_surface`
- repository-driven Coolify runtime now receives `APP_BUILD_REVISION` and
  `DEPLOYMENT_TRIGGER_MODE` through build args and runtime env
- release smoke now compares live production `runtime_build_revision` against:
  - local `git rev-parse HEAD`
  - optional deployment evidence `after_sha`
- live production smoke currently fails with:
  - `deployment is missing deployment_automation_policy_owner`
  which is the intended machine-visible proof that deployed truth is still
  behind repo truth until the next deploy lands
