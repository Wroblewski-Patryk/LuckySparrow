# Task

## Header
- ID: PRJ-680
- Title: Sync web stabilization docs, context, and ops truth after the repairs
- Status: DONE
- Owner: Product Docs Agent
- Depends on: PRJ-679
- Priority: P1

## Context
The next lane is product-facing stabilization work. Once the broken routes,
client truthfulness, and proof surfaces are repaired, repo truth must be
updated in the same cycle so later work starts from a stable documented
baseline instead of rediscovering the same issues.

## Goal
Synchronize planning, context, testing, and ops truth with the repaired web
production baseline.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] Task board and project state reflect the repaired stabilization lane.
- [x] Testing and ops docs describe the current smoke and acceptance evidence.
- [x] Learning journal captures any confirmed recurring pitfall discovered
      during the repair wave.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `Push-Location backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py tests/test_web_routes.py tests/test_deployment_trigger_scripts.py; Pop-Location`
- Manual checks:
  - 2026-04-25 production smoke and authenticated web-shell checks passed after deploy on `https://personality.luckysparrow.ch/`
- Screenshots/logs:
  - `.\backend\scripts\run_release_smoke.ps1 -BaseUrl https://personality.luckysparrow.ch`
- High-risk checks:
  - confirmed the repo-owned source of truth now records the frontend build-revision parity pitfall and the backend-owned fix

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: docs/architecture/17_logging_and_debugging.md;
  docs/engineering/testing.md; docs/operations/runtime-ops-runbook.md
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
This task closes the lane only after repaired product truth is documented.
