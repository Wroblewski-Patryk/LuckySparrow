# Task

## Header
- ID: PRJ-679
- Title: Add regression and production smoke proof for the repaired web shell
- Status: DONE
- Owner: QA/Test
- Depends on: PRJ-675, PRJ-676, PRJ-677, PRJ-678
- Priority: P0

## Context
Production already proved that deploy parity alone is not enough. The current
browser shell needs stronger proof that backend-owned `/app/*` flows and the
main route-loading paths remain healthy after local changes and after deploy.

## Goal
Add automated and manual proof that the repaired shell stays healthy across the
current product-critical user flows.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] Regression coverage protects chat history, settings persistence, tools
      loading, and personality loading.
- [x] Release or smoke guidance includes the current first-party web shell
      route checks.
- [x] The repaired baseline is proven locally and in production-oriented smoke
      evidence.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `Push-Location backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py tests/test_web_routes.py tests/test_deployment_trigger_scripts.py; Pop-Location`
  - `Push-Location web; npm run build; Pop-Location`
- Manual checks:
  - 2026-04-25 production smoke passed after deploy on commit `ddb327f`
  - authenticated production checks passed for login, me/settings read-write, chat history, tools overview, personality overview, chat send, and logout using the test account `ai@luckysparrow.ch`
- Screenshots/logs:
  - `.\backend\scripts\run_release_smoke.ps1 -BaseUrl https://personality.luckysparrow.ch`
- High-risk checks:
  - release smoke now catches web-shell revision drift separately from backend runtime parity

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: docs/engineering/testing.md;
  docs/operations/runtime-ops-runbook.md
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
The smoke should explicitly catch `500` responses and spinner-without-render
posture for the current `web/` routes.
