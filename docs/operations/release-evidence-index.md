# Release Evidence Index

Last updated: 2026-05-03

## Purpose

This index is the operator-facing release truth table for the current v1 lane.
It does not replace release smoke, incident evidence, or behavior validation.
It points to the latest committed proof surfaces and records what is currently
deployed.

## Current Snapshot

| Field | Value |
| --- | --- |
| Local branch | `main` |
| Local development `HEAD` before this index update | `cd0851aba933c2cb10882690c5609351286f72a8` |
| Local relation to `origin/main` | ahead by 11 commits at refresh |
| Release tag | `v1.0.0` |
| Release tag object | `b5d8379df1898aa5533bd72a7a1631d6044f2125` |
| Release tag target commit | `5e64f494e2aac8d29cea532d95f7039ed6029213` |
| Production backend revision | `5e64f494e2aac8d29cea532d95f7039ed6029213` |
| Production web meta revision | `5e64f494e2aac8d29cea532d95f7039ed6029213` |
| Production health | `status=ok` |
| Production release readiness | `ready=true` |
| Production v1 final acceptance | `core_v1_bundle_ready` |
| Production deploy parity | `deploy_parity_surface_ready` |
| Organizer daily-use extension | `daily_use_workflows_blocked_by_provider_activation` |

## Current Decision

The deployed `v1.0.0` release marker is still coherent with production because
backend and web both report the tag target commit
`5e64f494e2aac8d29cea532d95f7039ed6029213`.

Local `main` has moved ahead after post-v1 hardening and web-confidence work.
This document update will itself advance local `HEAD` once committed. Those
newer commits must not inherit the `v1.0.0` production acceptance claim until
they are pushed, deployed, and proven by fresh release smoke.

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
| New local commits are not deployed | Release marker for current `HEAD` | BLOCKED | Push/deploy selected candidate, then run release smoke |
| Telegram live-mode smoke | Launch-channel extension | BLOCKED_EXTERNAL | Provide operator token, webhook secret, and known chat id |
| Organizer provider activation smoke | Organizer daily-use extension | BLOCKED_EXTERNAL | Configure ClickUp, Google Calendar, and Google Drive credentials |
| AI red-team final scoring | Security evidence | REVIEW_REQUIRED | Use a text-capturing app-chat or authorized incident-evidence runner |

## Proof Sources

| Evidence | Source |
| --- | --- |
| Release smoke and deploy parity | `backend/scripts/run_release_smoke.ps1` |
| Release reality audit | `backend/scripts/audit_release_reality.py` |
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
git for-each-ref refs/tags/v1.0.0 --format='%(objectname) %(objecttype) %(*objectname)'
$health = Invoke-RestMethod -Uri 'https://aviary.luckysparrow.ch/health' -TimeoutSec 30
$health.deployment.runtime_build_revision
$health.release_readiness.ready
$health.v1_readiness.final_acceptance_state
curl.exe -s -L --max-time 30 https://aviary.luckysparrow.ch/settings
Push-Location .\backend; ..\.venv\Scripts\python .\scripts\check_coolify_fallback_readiness.py --print-json; Pop-Location
```

## Latest Refresh Evidence

- `git rev-parse HEAD` before this index update:
  `cd0851aba933c2cb10882690c5609351286f72a8`
- `git status --short --branch`: `main...origin/main [ahead 11]`
- `GET /health.status`: `ok`
- `GET /health.deployment.runtime_build_revision`:
  `5e64f494e2aac8d29cea532d95f7039ed6029213`
- `GET /health.release_readiness.ready`: `true`
- `GET /health.v1_readiness.final_acceptance_state`:
  `core_v1_bundle_ready`
- `GET /settings` web meta revision:
  `5e64f494e2aac8d29cea532d95f7039ed6029213`
