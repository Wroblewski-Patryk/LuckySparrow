# Task

## Header
- ID: PRJ-577
- Title: Switch production attention ownership to durable inbox
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-576
- Priority: P0

## Context
Durable attention cutover criteria are frozen in `PRJ-576`. Production still
uses `ATTENTION_COORDINATION_MODE=in_process`, even though repository-backed
durable inbox is implemented and readiness is green.

## Goal
Switch the production deployment baseline to `ATTENTION_COORDINATION_MODE=durable_inbox`
without regressing Telegram burst coalescing or reply delivery.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] Coolify production defaults to `ATTENTION_COORDINATION_MODE=durable_inbox`
- [x] production `/health.attention` reports repository-backed durable posture
- [x] release smoke and focused regressions remain green after the switch

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `.\.venv\Scripts\python -m pytest -q tests/test_coolify_compose.py tests/test_api_routes.py tests/test_main_lifespan_policy.py`
  - `docker compose -f docker-compose.coolify.yml config`
- Manual checks:
  - pushed commit `d3707a0` to `main`
  - selected `Root Team` in Coolify before opening the canonical production app
  - manually force-started queued deployment `amz31iyapwr3t9z9tanpe2jb`
  - verified production `/health.attention`
  - ran release smoke against production
- Screenshots/logs:
  - deployment `amz31iyapwr3t9z9tanpe2jb` imported commit
    `d3707a0f7f55f12f6a12b9bbbb584a7e0c96c325`
  - public `/health` temporarily returned non-JSON during container
    replacement, then stabilized on the durable-attention posture
- High-risk checks:
  - Telegram round-trip remained healthy after the switch
  - no duplicate-reply or burst-assembly regression was visible in smoke

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/15_runtime_flow.md`
  - `docs/architecture/16_agent_contracts.md`
  - `docs/operations/runtime-ops-runbook.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
  - not applicable
- Follow-up architecture doc updates:
  - broader docs sync remains in `PRJ-579`

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
The intended implementation path is deployment-only: change the Coolify
production default, pin the compose regression, deploy, and verify the live
health posture. Broader canonical-doc sync belongs to `PRJ-579`.

Production evidence:

- focused validation:
  - `.\.venv\Scripts\python -m pytest -q tests/test_coolify_compose.py tests/test_api_routes.py tests/test_main_lifespan_policy.py` -> `93 passed`
  - `docker compose -f docker-compose.coolify.yml config` -> OK
  - `.\scripts\run_release_smoke.ps1 -BaseUrl 'https://personality.luckysparrow.ch'` -> passed
- Coolify deployment:
  - application:
    `project/icmgqml9uw3slzch9m9ok23z/environment/qxooi9coxat272krzjx221fv/application/jr1oehwlzl8tcn3h8gh2vvih`
  - deployment `amz31iyapwr3t9z9tanpe2jb`
  - imported commit `d3707a0f7f55f12f6a12b9bbbb584a7e0c96c325`
- production `/health` after cutover:
  - `attention.coordination_mode=durable_inbox`
  - `attention.contract_store_mode=repository_backed`
  - `attention.deployment_readiness.contract_store_state=repository_backed_contract_store_active`
  - `conversation_channels.telegram.round_trip_ready=true`
