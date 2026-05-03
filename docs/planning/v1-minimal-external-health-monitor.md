# V1 Minimal External Health Monitor

Last updated: 2026-05-03

## Status

`PRJ-920` is DONE. `PRJ-957` upgraded the monitor contract to revision-aware
checks against the selected release marker.

## Monitor

- Name: `AION production health monitor`
- Automation ID: `aion-production-health-monitor`
- Schedule: hourly
- Target: `https://aviary.luckysparrow.ch/health`
- Release marker target: `v1.0.0`
- Status: active

## Evidence

Runbook:

- `docs/operations/production-health-monitor.md`

Revision-aware command:

```powershell
Push-Location .\backend
..\.venv\Scripts\python .\scripts\audit_release_reality.py `
  --base-url "https://aviary.luckysparrow.ch" `
  --selected-tag v1.0.0 `
  --monitor-mode
Pop-Location
```

Validation:

- `git diff --check`
  - passed

## Notes

This is a minimal v1 operational guard. It does not replace a full external
observability stack, but it now catches the revision drift class that blocked
PRJ-938 instead of relying only on manual production health checks.
