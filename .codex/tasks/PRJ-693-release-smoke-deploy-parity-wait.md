# Task

## Header
- ID: PRJ-693
- Title: Add deploy-parity wait mode to release smoke for repo-driven Coolify pushes
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-692
- Priority: P1

## Context
After `PRJ-692` landed, live production still served the older commit
`00ae4eadcca0afe46ce13e88366ab2c744695a36` for at least 45 seconds after
`origin/main` already pointed to `b514a01c3b68d55edecfa247429e5db29867effe`.
The canonical `run_release_smoke.ps1` script failed immediately on repo-to-
production parity drift, which is correct for final proof but too strict when
operators need to wait briefly for a source-automation deploy to finish.

## Goal
Keep release smoke strict by default, but add one optional wait mode that polls
for deploy parity before running the rest of the smoke checks.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] `backend/scripts/run_release_smoke.ps1` supports an optional deploy-parity
  wait mode with bounded timeout and poll interval.
- [x] regression tests cover both wait-until-success and wait-until-timeout
  behavior.
- [x] ops docs and context truth describe the new polling posture and the live
  observation that source automation can lag briefly after push.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_deployment_trigger_scripts.py; Pop-Location`
- Manual checks:
  - `.\backend\scripts\run_release_smoke.ps1 -BaseUrl "https://personality.luckysparrow.ch" -WaitForDeployParity -DeployParityMaxWaitSeconds 120 -DeployParityPollSeconds 15`
- Screenshots/logs:
  - initial immediate smoke after push failed on deployed revision
    `00ae4eadcca0afe46ce13e88366ab2c744695a36` versus local `b514a01c3b68d55edecfa247429e5db29867effe`
  - follow-up wait-mode smoke passed once production reached
    `b514a01c3b68d55edecfa247429e5db29867effe`
- High-risk checks:
  - default release smoke still fails immediately on parity drift unless the
    operator opts into wait mode explicitly

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/28_local_windows_and_coolify_deploy.md`
  - `docs/operations/runtime-ops-runbook.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
  - none
- Follow-up architecture doc updates:
  - Coolify deploy guidance and ops runbook now mention the optional
    `run_release_smoke.ps1` wait mode for source-automation lag

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
The new wait mode is intentionally opt-in. Final release proof stays strict by
default, while operators can now use the same script to observe short Coolify
source-automation lag before declaring deployment drift.
