# Release Evidence Index

Last updated: 2026-05-13

## Purpose

This index is the operator-facing release truth table for the current v1 lane.
It does not replace release smoke, incident evidence, or behavior validation.
It points to the latest committed proof surfaces and records what is currently
deployed.

## Current Snapshot

| Field | Value |
| --- | --- |
| Local branch | `main` |
| Local selected UI candidate | `43837bb183c8975845b99b65a03cea5ccf4903a0` |
| Latest committed closure-proof revision | `c427ab110276c98a122d6c1be3f7d9a02eeffa3c` |
| Local relation to `origin/main` | equal after PRJ-1196 structured-perception deploy |
| Current release tag | `v1.0.1` |
| Current release tag object | `b016c4f33051805cfa09664f79bbe57f5b30811b` |
| Current release tag target commit | `3b46ed3878a8560c3adb147fcadf064818ccc322` |
| Historical release tag | `v1.0.0` |
| Historical release tag object | `b5d8379df1898aa5533bd72a7a1631d6044f2125` |
| Historical release tag target commit | `5e64f494e2aac8d29cea532d95f7039ed6029213` |
| Production backend revision | live `/health` confirmed `c427ab110276c98a122d6c1be3f7d9a02eeffa3c` after PRJ-1196 proof refresh |
| Production web meta revision | release smoke confirmed `c427ab110276c98a122d6c1be3f7d9a02eeffa3c` after PRJ-1196 proof refresh |
| Production health | `ok`; HTTP `200` after PRJ-1196 Coolify redeploy recovery and release smoke |
| Production release readiness | `true` |
| Production v1 final acceptance | `core_v1_bundle_ready` |
| Production deploy parity | `deploy_parity_surface_ready` |
| Selected candidate release verdict | `GO_FOR_SELECTED_SHA`; `v1.0.1` go/no-go `GO` in PRJ-1131 |
| Current workspace local validation | `passed`; backend pytest, web typecheck/build/route smoke, mobile typecheck/preview smoke/device doctor |
| Current packaged UI candidate SHA | `43837bb183c8975845b99b65a03cea5ccf4903a0` |
| Current packaged closure-proof SHA | `07b3b3e5fe3bd37439dd1cafbdc7fb15c4ef3a7b` |
| Post-push deploy parity wait | initially `failed`; recovered by approved Coolify UI redeploy in PRJ-1128 |
| Local Coolify-shape candidate smoke | `passed`; build, migrate, app health, `/health`, and `/settings` |
| Incident evidence export | `available`; PRJ-1128 exported a release-smoke bundle |
| Coolify automation reliability | PRJ-1196 initial deploy failed during `docker compose up -d` with a transient `No such container` after old-container removal; a queued Coolify redeploy of the same commit finished and release smoke passed |
| Coolify fallback readiness | UI fallback executed by explicit operator access; webhook fallback inputs still unavailable locally |
| Organizer daily-use extension | `daily_use_workflows_blocked_by_provider_activation` |

## Current Decision

`v1.0.1` remains the current selected-SHA release marker for tag target commit
`3b46ed3878a8560c3adb147fcadf064818ccc322`; `v1.0.0` remains historical marker
truth for tag target commit `5e64f494e2aac8d29cea532d95f7039ed6029213`.

The current post-marker UI deployment evidence is PRJ-1185. PR #1 merged the
v1.5 mobile/web UI candidate at
`43837bb183c8975845b99b65a03cea5ccf4903a0`, production release smoke passed,
and follow-up browser proof confirmed the public UI render on
`https://aviary.luckysparrow.ch/`. Later evidence-only or cleanup commits may
update the live production revision without changing the v1.5 UI product
candidate; always read `/health` and `/settings` for the latest deployed SHA.
The latest cleanup proof confirmed
`07b3b3e5fe3bd37439dd1cafbdc7fb15c4ef3a7b` in production and stopped the
validation-owned local mobile preview process on `8093`.

PRJ-1115 is retained as historical evidence for the `v1.0.0` marker. PRJ-1128
is the current post-v1 candidate recovery point, PRJ-1131 created and pushed
annotated tag `v1.0.1`, and PRJ-1185 is the current v1.5 UI production evidence
point.

## Required Proof Chain For A New Candidate

1. Select the intended candidate commit.
2. Push the candidate commit to the deployment source.
3. Confirm production backend revision and web meta revision both match the
   candidate.
4. Run production release smoke with deploy parity.
5. Refresh incident-evidence and behavior-validation pointers if the release
   claim depends on them.
6. Update this index with exact SHA, command evidence, blockers, and next
   action.
7. Create or move a release marker only after the selected SHA is green in
   production.

## Current Blockers

| Blocker | Scope | State | Next Action |
| --- | --- | --- | --- |
| Coolify source/webhook automation reliability | Future candidate deploy SLO | FOLLOW_UP | Source automation did not converge in PRJ-1125; UI fallback succeeded in PRJ-1128; webhook fallback remains blocked until URL and secret are provided |
| Telegram live-mode smoke | Launch-channel extension | BLOCKED_EXTERNAL | Provide operator token, webhook secret, and known chat id |
| Organizer provider activation smoke | Organizer daily-use extension | BLOCKED_EXTERNAL | Configure ClickUp, Google Calendar, and Google Drive credentials |
| AI red-team final scoring | Security evidence | REVIEW_REQUIRED | Use a text-capturing app-chat or authorized incident-evidence runner |

## Proof Sources

| Evidence | Source |
| --- | --- |
| Release smoke and deploy parity | `backend/scripts/run_release_smoke.ps1` |
| Release reality audit | `backend/scripts/audit_release_reality.py` |
| Release go/no-go wrapper | `backend/scripts/run_release_go_no_go.py` |
| Coolify fallback readiness | `backend/scripts/check_coolify_fallback_readiness.py` |
| Release archive standard | `docs/planning/v1-release-evidence-archive-standard.md` |
| V1 reality roadmap | `docs/planning/v1-reality-audit-and-roadmap.md` |
| Runtime ops runbook | `docs/operations/runtime-ops-runbook.md` |
| Current release boundary | `docs/planning/current-v1-release-boundary.md` |
| Production backend revision | `GET https://aviary.luckysparrow.ch/health` |
| Production web revision | `GET https://aviary.luckysparrow.ch/settings` meta `aion-web-build-revision` |

## Refresh Commands

```powershell
git rev-parse HEAD
git for-each-ref refs/tags/v1.0.1 --format='%(objectname) %(objecttype) %(*objectname)'
$health = Invoke-RestMethod -Uri 'https://aviary.luckysparrow.ch/health' -TimeoutSec 30
$health.deployment.runtime_build_revision
$health.release_readiness.ready
$health.v1_readiness.final_acceptance_state
curl.exe -s -L --max-time 30 https://aviary.luckysparrow.ch/settings
Push-Location .\backend; ..\.venv\Scripts\python .\scripts\check_coolify_fallback_readiness.py --print-json; Pop-Location
Push-Location .\backend; ..\.venv\Scripts\python .\scripts\run_release_go_no_go.py --base-url https://aviary.luckysparrow.ch --selected-tag v1.0.1 --monitor-mode; Pop-Location
```

## Latest Refresh Evidence

- PRJ-1185 v1.5 mobile UI production deploy:
  - GitHub PR:
    `https://github.com/Wroblewski-Patryk/Aviary/pull/1`
  - merge commit:
    `43837bb183c8975845b99b65a03cea5ccf4903a0`
  - `git push origin main`:
    `d250142..43837bb  main -> main`
  - pre-merge backend gate:
    `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; $exit=$LASTEXITCODE; Pop-Location; exit $exit`
    -> `1074 passed`
  - pre-merge web gate:
    `Push-Location .\web; npm exec -- tsc -b --pretty false; if ($LASTEXITCODE -eq 0) { npm exec -- vite build }; if ($LASTEXITCODE -eq 0) { npm run smoke:routes }; $exit=$LASTEXITCODE; Pop-Location; exit $exit`
    -> PASS; `route_count=14`, `status=ok`
  - pre-merge mobile gate:
    `Push-Location .\mobile; npm run typecheck; if ($LASTEXITCODE -eq 0) { npm run smoke:ui-mobile-preview }; if ($LASTEXITCODE -eq 0) { npm run doctor:ui-mobile-device }; $exit=$LASTEXITCODE; Pop-Location; exit $exit`
    -> PASS; preview smoke `failed_count=0`; device doctor
    `status=blocked`, missing `adb`, `emulator`
  - first production smoke:
    failed with transient `503 Service Unavailable`
  - second production smoke:
    `.\backend\scripts\run_release_smoke.ps1 -BaseUrl "https://aviary.luckysparrow.ch" -HealthRetryMaxAttempts 12 -HealthRetryDelaySeconds 10 -WaitForDeployParity -DeployParityMaxWaitSeconds 600 -DeployParityPollSeconds 20`
    -> PASS
  - production smoke revision evidence:
    - `health_status=ok`
    - `release_ready=true`
    - `deployment_runtime_build_revision=43837bb183c8975845b99b65a03cea5ccf4903a0`
    - `web_shell_build_revision=43837bb183c8975845b99b65a03cea5ccf4903a0`
    - `deployment_local_repo_head_sha=43837bb183c8975845b99b65a03cea5ccf4903a0`
  - post-evidence commit:
    `1b801d6813d8b6a0763a0ef996466392762e1b37`
  - final post-evidence production smoke:
    `.\backend\scripts\run_release_smoke.ps1 -BaseUrl "https://aviary.luckysparrow.ch" -HealthRetryMaxAttempts 12 -HealthRetryDelaySeconds 10 -WaitForDeployParity -DeployParityMaxWaitSeconds 600 -DeployParityPollSeconds 20`
    -> PASS
  - final post-evidence revision evidence:
    - `health_status=ok`
    - `release_ready=true`
    - `deployment_runtime_build_revision=1b801d6813d8b6a0763a0ef996466392762e1b37`
    - `web_shell_build_revision=1b801d6813d8b6a0763a0ef996466392762e1b37`
    - `deployment_local_repo_head_sha=1b801d6813d8b6a0763a0ef996466392762e1b37`
  - note:
    future evidence-only commits change the production revision without
    changing the v1.5 UI product candidate; verify `/health` before treating
    this snapshot as the latest production SHA
  - final closure proof after evidence wording cleanup:
    - commit:
      `ff48b9b331aa2c924fa2a0025c0813883564b24a`
    - production smoke:
      PASS; `health_status=ok`, `release_ready=true`,
      `deployment_runtime_build_revision=ff48b9b331aa2c924fa2a0025c0813883564b24a`,
      `web_shell_build_revision=ff48b9b331aa2c924fa2a0025c0813883564b24a`
    - production browser proof:
      Chrome headless rendered `https://aviary.luckysparrow.ch/` with
      `<title>Aviary</title>`, `aion-public-home`, `Poznaj Aviary`, production
      JS/CSS assets, and screenshot
      `.codex/artifacts/prj1185-production-ui-browser-proof/production-home-1440x1200.png`
  - residual blocker:
    native Expo Go/simulator proof remains blocked until Android platform tools
    or a supported device is available

- PRJ-1131 current release marker:
  - current release tag: `v1.0.1`
  - tag object: `b016c4f33051805cfa09664f79bbe57f5b30811b`
  - tag target commit:
    `3b46ed3878a8560c3adb147fcadf064818ccc322`
  - tag push: `git push origin v1.0.1` -> `[new tag] v1.0.1 -> v1.0.1`
  - selected-tag go/no-go:
    `run_release_go_no_go.py --selected-tag v1.0.1 --monitor-mode` ->
    `verdict=GO`, audit `GO_FOR_SELECTED_SHA`, smoke `exit_code=0`
- PRJ-1132 Coolify automation reliability truth refresh:
  - selected-tag go/no-go for `v1.0.1`:
    `verdict=GO`, audit `GO_FOR_SELECTED_SHA`, smoke `exit_code=0`
  - fallback readiness for before/after
    `5e64f494e2aac8d29cea532d95f7039ed6029213` ->
    `3b46ed3878a8560c3adb147fcadf064818ccc322`:
    `ready=false`
  - failed checks:
    `webhook_url`, `webhook_secret_present`, `webhook_secret_length`
  - conclusion:
    current release parity is green; source/webhook automation reliability
    remains a future-candidate follow-up, not a `v1.0.1` blocker
- PRJ-1133 current v1 acceptance bundle refresh:
  - `docs/planning/v1-core-acceptance-bundle.md` now points at `v1.0.1`
  - monitor docs now use `--selected-tag v1.0.1`
  - selected-tag go/no-go for `v1.0.1`:
    `verdict=GO`, audit `GO_FOR_SELECTED_SHA`, smoke `exit_code=0`
  - monitor-mode audit for `v1.0.1`:
    `GO_FOR_SELECTED_SHA`
- PRJ-1134 release handoff marker blocker stale path cleanup:
  - selected-tag go/no-go for `v1.0.1`:
    `verdict=GO`, audit `GO_FOR_SELECTED_SHA`, smoke `exit_code=0`
  - `docs/planning/v1-release-notes-and-operator-handoff.md` no longer lists
    marker creation for
    `3b46ed3878a8560c3adb147fcadf064818ccc322` as a next path
  - `docs/planning/v1-release-marker-blocker.md` now records `v1.0.1` as the
    current resolved marker and `v1.0.0` as historical
  - `docs/operations/runtime-ops-runbook.md` current monitor-mode example now
    uses `--selected-tag v1.0.1`
- PRJ-1129 current-truth refresh:
  - current selected SHA:
    `3b46ed3878a8560c3adb147fcadf064818ccc322`
  - current production backend and web revisions:
    `3b46ed3878a8560c3adb147fcadf064818ccc322`
  - current selected-SHA verdict:
    `GO_FOR_SELECTED_SHA`
  - current release smoke:
    passed with deploy parity
  - historical PRJ-1125 through PRJ-1127 drift/503 entries below are retained
    as incident history and are superseded by PRJ-1128

### Historical Refresh Evidence

- `git rev-parse HEAD` before this index update:
  `5ff12953289bbca680fd5d9f8b3d8780a8f4be55`
- `git status --short --branch`: `main...origin/main [ahead 86]`
- `GET /health.status`: `ok`
- `GET /health.deployment.runtime_build_revision`:
  `5e64f494e2aac8d29cea532d95f7039ed6029213`
- `GET /health.release_readiness.ready`: `true`
- `GET /health.v1_readiness.final_acceptance_state`:
  `core_v1_bundle_ready`
- `GET /settings` web meta revision:
  `5e64f494e2aac8d29cea532d95f7039ed6029213`
- `run_release_go_no_go.py --selected-tag v1.0.0 --monitor-mode`:
  `verdict=GO`; release smoke was skipped because the selected tag differs
  from local `HEAD` and `run_release_smoke.ps1` is local-HEAD-bound
- `audit_release_reality.py` for local `HEAD`:
  `verdict=HOLD_REVISION_DRIFT`; selected SHA
  `5ff12953289bbca680fd5d9f8b3d8780a8f4be55`, production backend and web
  revisions `5e64f494e2aac8d29cea532d95f7039ed6029213`
- `check_coolify_fallback_readiness.py --print-json`:
  `ready=false`; missing `webhook_url`, `webhook_secret_present`, and
  `webhook_secret_length`
- `pytest -q tests/test_deployment_trigger_scripts.py`:
  `64 passed`
- PRJ-1121 operator preflight:
  do not trigger Coolify fallback for an inferred `HEAD` unless that SHA is the
  selected pushed candidate; if the current working-tree changes are part of
  the release, commit and push them first, then rerun fallback readiness,
  deploy parity, and release smoke for the new selected SHA
- PRJ-1122 local validation refresh:
  - backend baseline:
    `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; Pop-Location`
    -> `1045 passed`
  - web build:
    `Push-Location .\web; npm run build; Pop-Location` -> passed
  - tools directory characterization:
    `Push-Location .\web; npm run test:tools-directory; Pop-Location` ->
    `status=ok`
  - chat transcript characterization:
    `Push-Location .\web; npm run test:chat-transcript; Pop-Location` ->
    `status=ok`
  - route smoke:
    `Push-Location .\web; npm run smoke:routes; Pop-Location` ->
    `status=ok`, `route_count=14`
  - diff hygiene:
    `git diff --check` -> passed
- PRJ-1124 candidate packaging:
  - selected candidate SHA:
    `3b46ed3878a8560c3adb147fcadf064818ccc322`
  - included audited scope from
    `docs/planning/current-workspace-candidate-scope-audit.md`
  - excluded `.codex/tmp/` and `artifacts/`
  - pushed to `origin/main`
  - next action: recover Coolify source automation or approved fallback for
    this SHA, then run production release smoke with deploy parity
- PRJ-1125 post-push deploy trigger blocker evidence:
  - `git log -1 --oneline --decorate`:
    `3b46ed3 (HEAD -> main, origin/main, origin/HEAD) release: package post-v1 candidate`
  - `audit_release_reality.py --selected-sha 3b46ed3878a8560c3adb147fcadf064818ccc322`:
    `verdict=HOLD_REVISION_DRIFT`
  - production backend revision:
    `5e64f494e2aac8d29cea532d95f7039ed6029213`
  - production web meta revision:
    `5e64f494e2aac8d29cea532d95f7039ed6029213`
  - `run_release_smoke.ps1 -WaitForDeployParity -DeployParityMaxWaitSeconds 900`:
    failed after 900 seconds because production stayed on the old revision
  - `check_coolify_fallback_readiness.py --before-sha 5e64f494e2aac8d29cea532d95f7039ed6029213 --after-sha 3b46ed3878a8560c3adb147fcadf064818ccc322`:
    `ready=false`; missing `webhook_url`, `webhook_secret_present`, and
    `webhook_secret_length`
  - no webhook or UI fallback was triggered from this environment
- PRJ-1126 production 503 local Coolify-shape smoke:
  - production `/health`:
    `503 Service Unavailable`; body `no available server`
  - production `/settings`:
    `503 Service Unavailable`; body `no available server`
  - targeted tests:
    `pytest -q tests/test_deployment_trigger_scripts.py tests/test_web_routes.py`
    -> `69 passed`
  - local candidate smoke:
    `docker-compose.coolify.yml` built and started `db`, `migrate`, and `app`
    with a dummy non-secret env-file
  - local app container status:
    `healthy`
  - local container `/health` and `/settings`:
    `200`
  - local Compose project:
    torn down after verification
  - conclusion:
    the selected repo candidate has no reproduced local Coolify-shape startup
    failure; production recovery needs operator-side Coolify logs/history,
    source binding, redeploy, or approved webhook fallback inputs
- PRJ-1127 production 503 operator handoff:
  - release audit:
    `HOLD_HEALTH_OR_WEB_REVISION_MISSING`
  - incident evidence export:
    blocked because `/health` returns `HTTP 503 ... no available server`
  - deploy/Coolify webhook environment:
    no `COOLIFY`, `DEPLOY`, `WEBHOOK`, or `AVIARY` deploy variables available
  - runbook update:
    repeated `503 no available server` now has a Coolify operator checklist
  - next action:
    inspect Coolify canonical app `jr1oehwlzl8tcn3h8gh2vvih`, restore a
    healthy app backend, then rerun release smoke for selected candidate
    `3b46ed3878a8560c3adb147fcadf064818ccc322`
- PRJ-1128 Coolify UI redeploy release smoke recovery:
  - Coolify app:
    Root Team / Aviary / production / `aviary (localhost)`,
    application `jr1oehwlzl8tcn3h8gh2vvih`
  - latest manual deployment:
    commit `3b46ed3`, started `2026-05-03 22:57:33 UTC`, ended
    `2026-05-03 22:59:10 UTC`, duration `01m 37s`, status `Success`
  - production `/health`:
    HTTP `200`
  - release audit:
    `GO_FOR_SELECTED_SHA`, `release_marker_allowed=true`
  - production backend revision:
    `3b46ed3878a8560c3adb147fcadf064818ccc322`
  - production web meta revision:
    `3b46ed3878a8560c3adb147fcadf064818ccc322`
  - release smoke:
    `run_release_smoke.ps1 -BaseUrl https://aviary.luckysparrow.ch -WaitForDeployParity`
    -> passed
  - incident evidence:
    `export_incident_evidence_bundle.py --capture-mode release_smoke` created
    `.codex/tmp/incident-evidence-after-coolify-ui/20260503T230011Z_incident-bundle-20260503T230011Z/`
  - no runtime code, environment variables, or tracked secrets were changed
