# v1.5 Mobile UI PR And Production Promotion Handoff

Last updated: 2026-05-12

## Status

The v1.5 mobile UI is implemented and locally preview-deployed, and the branch
has been pushed for review:

| Field | Value |
| --- | --- |
| Local branch | `codex/v15-mobile-ui-deploy-commits` |
| Remote branch | `origin/codex/v15-mobile-ui-deploy-commits` |
| PR creation URL | `https://github.com/Wroblewski-Patryk/Aviary/pull/new/codex/v15-mobile-ui-deploy-commits` |
| Local preview | `http://127.0.0.1:8093` |
| Preview health | `http://127.0.0.1:8093/__preview_health` |
| Production host | `https://aviary.luckysparrow.ch` |
| Production deployed | Not yet. Requires PR creation, review, merge, Coolify deploy, and release smoke. |
| Native device proof | Blocked locally by missing `adb` and `emulator`. |

`gh` is not available in this environment, and no GitHub PR creation tool was
available locally. The branch is pushed, so the PR can be opened from the URL
above.

## Already Verified Locally

Run from the repository root:

```powershell
Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit
```

Expected result: pass.

```powershell
Push-Location .\mobile; npm run smoke:ui-mobile-preview; $exit=$LASTEXITCODE; Pop-Location; exit $exit
```

Expected result:

- `preview_health.ok=true`
- `route_count=5`
- `viewport_count=2`
- `screenshot_count=10`
- `failed_count=0`

Native proof readiness remains a truth-reporting blocker check:

```powershell
Push-Location .\mobile; npm run doctor:ui-mobile-device; $exit=$LASTEXITCODE; Pop-Location; exit $exit
```

Current expected result in this environment: pass with `status=blocked`,
missing `adb` and `emulator`.

## PR Promotion Steps

1. Open the PR from:
   `https://github.com/Wroblewski-Patryk/Aviary/pull/new/codex/v15-mobile-ui-deploy-commits`
2. Use the repository PR template and include:
   - scope: v1.5 mobile UI, local preview/deploy scripts, smoke proof, and
     release handoff
   - risk level: medium, because production promotion and native proof are
     still separate gates
   - automated checks:
     - mobile typecheck
     - mobile preview smoke
     - mobile device proof doctor
     - full backend pytest already passed on this branch before push
     - web route/build gate already passed before push
   - manual smoke:
     - local preview health and five-route preview smoke
3. Review the PR.
4. Merge only after accepting the native-proof blocker as out-of-current-local
   environment or after capturing device/simulator proof.

## Production Promotion Steps

The existing production path is Coolify source-driven deployment from the repo.
After the PR is merged into the deployment source, wait for Coolify and then
verify:

```powershell
.\backend\scripts\run_release_smoke.ps1 `
  -BaseUrl "https://aviary.luckysparrow.ch" `
  -WaitForDeployParity `
  -DeployParityMaxWaitSeconds 120 `
  -DeployParityPollSeconds 15
```

Operator verification order:

1. Confirm the Coolify `migrate` service finished successfully.
2. Confirm the Coolify `app` service is healthy.
3. Run release smoke against `https://aviary.luckysparrow.ch`.
4. Confirm `/health.deployment.runtime_build_revision` matches the merged
   candidate.
5. Confirm the web build revision exposed by `/settings` matches the same
   candidate.
6. Only then call the production promotion green.

If source automation does not converge and the operator chooses the approved
manual webhook fallback, use the existing helper only with real Coolify
operator inputs:

```powershell
.\backend\scripts\trigger_coolify_deploy_webhook.ps1 `
  -WebhookUrl "https://YOUR_COOLIFY_DOMAIN/webhooks/source/github/events/manual" `
  -WebhookSecret "YOUR_WEBHOOK_SECRET"
```

Then rerun release smoke with deploy parity wait.

## Rollback

Before merge:

- close or update the PR branch.

After merge but before production is green:

- stop the rollout in Coolify if possible
- redeploy the previous selected SHA or current release tag
- rerun `run_release_smoke.ps1` against `https://aviary.luckysparrow.ch`
- update `docs/operations/release-evidence-index.md` with the failed candidate
  and recovery evidence

## Residual Risks

| Risk | State | Next action |
| --- | --- | --- |
| Native device/simulator proof | Blocked locally | Install Android platform tools or connect a supported device, then rerun `npm run doctor:ui-mobile-device` and capture Expo Go/simulator proof. |
| Production promotion | Not yet performed | Open PR, merge, wait for Coolify, run release smoke with deploy parity. |
| Coolify source/webhook reliability | Follow-up | Capture source/webhook convergence or approved fallback evidence for this candidate. |
| Expo dependency audit | Open | `npm audit` reports moderate advisories in Expo dependency chain; forced fix would downgrade Expo, so do not apply without an Expo upgrade decision. |

## Evidence Links

- Task: `.codex/tasks/PRJ-1183-v15-mobile-ui-pr-and-production-promotion-handoff.md`
- Local preview handoff:
  `docs/operations/v15-mobile-ui-local-preview-handoff-2026-05-12.md`
- Device proof doctor report:
  `.codex/artifacts/prj1182-mobile-device-proof-doctor/report.json`
- Preview smoke artifacts:
  `.codex/artifacts/prj1177-mobile-ui-preview-smoke/`
- Deployment guide:
  `docs/architecture/28_local_windows_and_coolify_deploy.md`
- Release evidence index:
  `docs/operations/release-evidence-index.md`
