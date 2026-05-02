# V1 Rollback And Recovery Drill

Last updated: 2026-05-02

## Status

Rollback and recovery posture is documented for v1.

This is a tabletop drill and runbook confirmation, not an executed production
rollback. Production is currently healthy, so forcing a rollback would add
risk without a live incident.

## Current Baseline

- production URL:
  - `https://aviary.luckysparrow.ch`
- current deployed revision at the time of this drill:
  - `69ff531193b782e178f39dd40c1110f3062c946a`
- previous known-good revision:
  - `0984440a8a2a283942e4aa2c190e3964d0dadc9c`
- previous known-good evidence:
  - production release smoke passed with deploy parity after PRJ-929
  - `GET /settings` returned web shell revision metadata for the same SHA
- current known-good evidence:
  - production release smoke passed with deploy parity after PRJ-923

## Migration Posture

- local Alembic head:
  - `20260426_0012`
- latest migration file:
  - `backend/migrations/versions/20260426_0012_add_utc_offset_to_profile.py`
- current v1 docs-only rollback drill does not introduce a schema change
- the Coolify production baseline keeps one explicit migration owner:
  - service: `migrate`
  - command: `python -m alembic -c /app/backend/alembic.ini upgrade head`
- rollback posture for schema-affecting future changes:
  - do not assume downgrade safety unless the specific migration documents it
  - prefer forward-fix when data migration has already run in production
  - record migration head before and after rollback/recovery smoke

## Rollback Trigger

Rollback is appropriate when one of these happens after a release:

- `/health.status != ok`
- `/health.release_readiness.ready != true`
- release smoke fails after deploy convergence
- runtime or web build revision does not match intended SHA
- foreground `/event` smoke fails
- auth or app shell routes return raw errors or blank pages
- a security/privacy boundary is violated

## Rollback Procedure

1. Freeze further deploys until owner decides rollback or forward-fix.
2. Identify the intended previous known-good SHA:
   - current rollback target: `0984440a8a2a283942e4aa2c190e3964d0dadc9c`
3. In Coolify, redeploy the canonical app from the selected known-good commit.
4. Verify production health:
   - `GET https://aviary.luckysparrow.ch/health`
5. Run release smoke with deploy parity:
   - `.\backend\scripts\run_release_smoke.ps1 -BaseUrl "https://aviary.luckysparrow.ch" -WaitForDeployParity -DeployParityMaxWaitSeconds 900 -DeployParityPollSeconds 30 -HealthRetryMaxAttempts 10 -HealthRetryDelaySeconds 10`
6. If the incident involved the incident-evidence path, export a strict-mode
   bundle and verify it:
   - `Push-Location .\backend; ..\.venv\Scripts\python .\scripts\export_incident_evidence_bundle.py --base-url "https://aviary.luckysparrow.ch" --capture-mode incident --trace-id "<incident-id>" --output-root "..\.codex\artifacts\incident-evidence"; Pop-Location`
   - `.\backend\scripts\run_release_smoke.ps1 -BaseUrl "https://aviary.luckysparrow.ch" -IncidentEvidenceBundlePath "<bundle-dir>" -WaitForDeployParity`
7. Confirm the web shell exposes the selected revision on primary routes:
   - `/`
   - `/app`
   - `/dashboard`
   - `/chat`
   - `/settings`
8. Record:
   - rollback SHA
   - health result
   - smoke result
   - incident bundle path if created
   - remaining user-visible risk

## Recovery Procedure

After rollback stabilizes production:

1. Create a narrow fix branch or commit on `main`.
2. Run the relevant local gate:
   - backend code: `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; Pop-Location`
   - web code: `Push-Location .\web; npm run build; Pop-Location`
   - release behavior: behavior validation plus release smoke script tests
3. Push the fix.
4. Wait for Coolify deploy parity.
5. Run production release smoke.
6. Export and verify incident evidence if the incident affected runtime,
   observability, privacy, or release gates.
7. Update task board, project state, and the relevant release docs.

## Recovery Owner Notes

- Canonical production app:
  - project: `Aviary`
  - environment: `production`
  - application id: `jr1oehwlzl8tcn3h8gh2vvih`
- Team selection in Coolify may matter:
  - the app was found under `Root Team`
- Manual UI redeploy is acceptable only as documented fallback when source
  automation does not converge.
- Do not enable full debug payload exposure in production for rollback triage;
  use strict-mode incident bundle export from PRJ-922.

## Result

Rollback path is known and documented for the current v1 candidate. The next
hardening gate is the data privacy and debug posture check.
