# V1 Production Incident Evidence Bundle

Last updated: 2026-05-02

## Status

`PRJ-908` was originally blocked for the current production configuration.
`PRJ-922` resolves the export-path blocker by adding a strict-mode helper
fallback that builds `runtime_incident_evidence` from `/health` policy surfaces
when `/internal/event/debug` is intentionally disabled.

Production remains healthy, full debug payload access remains disabled, and
release smoke accepts the generated production bundle.

## Attempted Flow

The intended PRJ-908 flow was:

1. export a production incident-evidence bundle with
   `backend/scripts/export_incident_evidence_bundle.py`
2. attach the latest behavior-validation report from PRJ-905
3. verify the bundle with `backend/scripts/run_release_smoke.ps1`

The first export attempt failed with:

```text
HTTP 403 while calling https://aviary.luckysparrow.ch/internal/event/debug:
{"detail":"Debug payload is disabled for this environment."}
```

An operator-approved temporary debug window was then attempted by adding
temporary Coolify environment variables for the `Aviary / production / aviary`
application. The redeploy did not produce an exportable debug window. Instead,
production strict policy kept the runtime from becoming healthy while debug
payload exposure was enabled.

## Restoration Evidence

The temporary debug flag was reverted to disabled in Coolify and the
application was redeployed.

Restoration checks:

- `/health` returned to `health_status=ok`
- `runtime_policy.event_debug_enabled=false`
- `release_readiness.ready=true`
- runtime build revision:
  `948e7f6245c9dd4c5e767e0c8b840223b141cfa4`
- web shell build revision:
  `948e7f6245c9dd4c5e767e0c8b840223b141cfa4`
- release smoke passed after restoration

The temporary local debug-token artifact was deleted. The user reported the
Coolify-side token cleanup complete.

## Decision

Do not attempt PRJ-908 again by enabling `EVENT_DEBUG_ENABLED=true` in the
current production strict-policy posture.

## Required Fix Before PRJ-908 Can Close

Implemented by `PRJ-922`:

- `backend/scripts/export_incident_evidence_bundle.py` first attempts the
  existing debug-backed export
- if the endpoint returns the expected disabled-debug `403`, the helper builds
  `incident_evidence.json` from `/health` policy surfaces
- unrelated HTTP failures and invalid-token cases still fail closed
- operators can pass `--disable-health-only-fallback` to force the previous
  fail-fast behavior

Validation:

- focused and deployment/smoke script tests passed: `60 passed`
- full backend baseline passed: `1021 passed`
- production bundle export succeeded with
  `incident_evidence_source=health_snapshot_strict_mode`
- generated bundle:
  `.codex/artifacts/prj922-production-safe-incident-evidence/20260502T213839Z_prj922-strict-production-evidence-08dda30`
- release smoke with `-IncidentEvidenceBundlePath` passed
- production runtime and web shell build revision:
  `08dda306b554d55183d7cd675bc0f9aaf95480a5`

## Next Task

Refresh the final v1 acceptance/declaration now that the production strict-mode
incident-evidence bundle is available.
