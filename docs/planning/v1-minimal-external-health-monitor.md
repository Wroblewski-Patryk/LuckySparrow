# V1 Minimal External Health Monitor

Last updated: 2026-05-03

## Status

`PRJ-920` is DONE.

## Monitor

- Name: `AION production health monitor`
- Automation ID: `aion-production-health-monitor`
- Schedule: hourly
- Target: `https://aviary.luckysparrow.ch/health`
- Status: active

## Evidence

Runbook:

- `docs/operations/production-health-monitor.md`

Validation:

- `git diff --check`
  - passed

## Notes

This is a minimal v1 operational guard. It does not replace a full external
observability stack, but it closes the immediate gap of relying only on manual
production health checks.
