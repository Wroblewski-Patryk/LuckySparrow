# V1 Release Evidence Archive Standard

Last updated: 2026-05-03

## Status

`PRJ-921` is complete. This standard defines the release-evidence archive
contract for the current v1 lane.

The standard does not create a new evidence system. It organizes the existing
release smoke, behavior-validation, incident-evidence bundle, rollback, and
acceptance documents so future operators can find the latest proof without
committing machine-local generated artifacts by accident.

## Archive Rule

Committed repository docs carry release truth:

- release decision summaries
- latest accepted production revision
- commands used to produce evidence
- local artifact directory pointers
- blocker or waiver decisions
- rollback and recovery notes

Generated evidence directories stay local by default:

- `.codex/artifacts/**`
- `artifacts/**`

Do not commit generated evidence unless an operator explicitly selects a small
sanitized artifact for repository history. Never commit secrets, provider raw
payloads, tokens, or private user data.

## Canonical Evidence Map

| Evidence Class | Committed Pointer | Generated Local Output | Producer | Verification |
| --- | --- | --- | --- | --- |
| Final acceptance bundle | `docs/planning/v1-core-acceptance-bundle.md` | `.codex/artifacts/prj923-final-v1-acceptance/...` | PRJ-923 release task | release smoke with incident bundle |
| Incident evidence bundle | `docs/planning/v1-production-incident-evidence-bundle.md` | `.codex/artifacts/prj922-production-safe-incident-evidence/...` or `artifacts/incident_evidence/...` | `backend/scripts/export_incident_evidence_bundle.py` | `backend/scripts/run_release_smoke.ps1 -IncidentEvidenceBundlePath` |
| Release smoke | `docs/planning/v1-core-acceptance-bundle.md`, `docs/planning/v1-release-audit-and-execution-plan.md` | local shell output or task evidence | `backend/scripts/run_release_smoke.ps1` | smoke exit code and summarized revision parity |
| Behavior validation | `docs/planning/v1-core-acceptance-bundle.md`, `docs/engineering/testing.md` | `artifacts/behavior_validation/report.json` | `backend/scripts/run_behavior_validation.ps1` | behavior-validation gate result |
| Rollback and recovery | `docs/planning/v1-rollback-and-recovery-drill.md` | local operator notes if rerun | Ops/Release task | documented rollback target and recovery smoke |
| External health monitor | `docs/planning/v1-minimal-external-health-monitor.md` | automation run history | Codex automation | hourly read-only production `/health` check |

## Current V1 Archive Pointers

Current core no-UI v1 revision:

- `0984440a8a2a283942e4aa2c190e3964d0dadc9c`

Current committed summary:

- [V1 Core Acceptance Bundle](v1-core-acceptance-bundle.md)
- [V1 Production Incident Evidence Bundle](v1-production-incident-evidence-bundle.md)
- [V1 Release Audit And Execution Plan](v1-release-audit-and-execution-plan.md)
- [Runtime Ops Runbook](../operations/runtime-ops-runbook.md)

Current local evidence roots:

- `.codex/artifacts/prj923-final-v1-acceptance/`
- `.codex/artifacts/prj922-production-safe-incident-evidence/`
- `artifacts/behavior_validation/`
- `artifacts/incident_evidence/`

These paths are operator-local evidence roots. Their existence or contents can
vary by workstation or CI job.

## Retention Baseline

Keep locally:

- latest successful final release bundle
- latest successful production incident-evidence bundle
- latest behavior-validation report used by a release decision
- latest failing release or incident bundle
- active incident bundles until incident closure plus rollback review

Archive externally when available:

- final go/no-go release bundle
- production incident evidence used for a public release decision
- rollback evidence for the selected release marker
- AI/security hardening reports for the selected release marker

External archive storage is not implemented in this repo. Until then, committed
docs are the durable index and generated evidence remains local.

## Refresh Triggers

Refresh the archive pointers when any of these change:

- production deploy revision
- release-smoke script behavior
- incident-evidence bundle schema or producer
- behavior-validation scenarios, gate mode, or schema version
- rollback target or recovery procedure
- final go/no-go decision
- AI/security hardening evidence
- launch-channel posture for Telegram or provider-backed organizer tools

Every new release-candidate commit needs fresh deploy parity evidence before it
can inherit the previous final acceptance claim.

## Handoff Checklist

Before claiming a release marker:

- confirm the intended production SHA in `/health.deployment`
- run release smoke against production
- export or point at the latest incident-evidence bundle
- verify release smoke accepts the bundle path
- attach or reference the behavior-validation report used by the decision
- confirm rollback target and recovery smoke path
- list remaining blocked launch-channel or extension tasks explicitly
- record whether generated artifacts stay local or have been externally
  archived

## Known Gaps

- No external long-term archive storage is configured.
- Generated artifacts are not checksum-indexed in committed docs.
- AI/security reports are still future `PRJ-931..PRJ-933` work.
- `PRJ-930` deployment trigger SLO evidence is still separate.
- `PRJ-909` and `PRJ-918` remain blocked by operator/provider inputs.
