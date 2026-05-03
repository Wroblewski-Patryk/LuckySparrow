# Production Health Monitor

Last updated: 2026-05-03

## Purpose

This document records the minimal production health monitor for AION.

The monitor is intentionally read-only. It checks production readiness and
reports degraded state without mutating production or provider configuration.

## Monitor

- Name: `AION production health monitor`
- Automation ID: `aion-production-health-monitor`
- Schedule: hourly
- Target: `https://aviary.luckysparrow.ch/health`
- Environment: local Codex automation
- Status: active

## Checked Fields

The monitor checks and reports through the revision-aware release reality audit:

- endpoint availability
- `status`
- `release_readiness.ready`
- deployment revision and web build revision parity against the selected
  release marker
- `conversation_channels.telegram.round_trip_state`
- `connectors.organizer_tool_stack.readiness_state`
- obvious failed or degraded readiness fields

Canonical v1.0.0 monitor command:

```powershell
Push-Location .\backend
..\.venv\Scripts\python .\scripts\audit_release_reality.py `
  --base-url "https://aviary.luckysparrow.ch" `
  --selected-tag v1.0.0 `
  --monitor-mode
Pop-Location
```

`--monitor-mode` intentionally allows local `HEAD` or `origin/main` to advance
after the release marker. It still fails when production backend or web shell
revisions drift from the selected release tag.

## Alert Criteria

Treat the run as needing operator attention when:

- the endpoint cannot be reached
- response parsing fails
- `status` is not healthy
- `release_readiness.ready=false`
- deployment revision or web build revision differs from the selected release
  marker
- release reality audit returns any `HOLD_*` verdict
- Telegram round-trip state regresses from provider-backed ready
- organizer state changes unexpectedly outside planned provider activation

## Operator Response

1. Open the latest monitor report.
2. Compare failing fields with `docs/operations/runtime-ops-runbook.md`.
3. For deploy parity failures, run the production release smoke.
4. For Telegram regressions, use
   `docs/planning/v1-production-telegram-mode-smoke.md`.
5. For organizer readiness changes, use
   `docs/operations/organizer-provider-activation-runbook.md`.
6. Attach the monitor report to the release or incident record if it informs a
   go/no-go decision.

## Limits

This monitor is a minimal v1 operational guard, not a full observability stack.
It does not replace centralized logs, tracing, alert routing, or external SLO
dashboards.
