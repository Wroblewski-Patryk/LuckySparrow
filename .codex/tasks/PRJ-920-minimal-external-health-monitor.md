# Task

## Header
- ID: PRJ-920
- Title: Minimal External Health Monitor
- Task Type: operations
- Current Stage: release
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-918
- Priority: P1
- Coverage Ledger Rows: not applicable
- Iteration: 920
- Operation Mode: TESTER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
The v1 plan required a minimal external health monitor before a broader
public/web-led launch claim. The repo already exposes `/health`; the missing
piece was a scheduled read-only monitor and an operator contract.

## Goal
Create and document a minimal recurring production health monitor.

## Scope
- Codex app automation:
  - `aion-production-health-monitor`
- `docs/operations/production-health-monitor.md`
- `.codex/tasks/PRJ-920-minimal-external-health-monitor.md`
- `docs/planning/v1-minimal-external-health-monitor.md`
- `docs/planning/v1-release-audit-and-execution-plan.md`
- `docs/planning/v1-core-acceptance-bundle.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: production should not rely only on manual checks.
- Expected product or reliability outcome: production `/health` is checked
  hourly with a documented operator response path.
- How success will be observed: active automation exists and runbook records
  schedule, checked fields, and alert criteria.
- Post-launch learning needed: yes, future observability stack can replace or
  augment this minimal monitor.

## Validation Evidence
- Automation created:
  - ID: `aion-production-health-monitor`
  - schedule: hourly
  - target: `https://aviary.luckysparrow.ch/health`
  - status: active
- `git diff --check`
  - result: passed

## Result Report

- Task summary: created and documented the minimal production health monitor.
- Files changed:
  - `docs/operations/production-health-monitor.md`
  - `.codex/tasks/PRJ-920-minimal-external-health-monitor.md`
  - `docs/planning/v1-minimal-external-health-monitor.md`
  - `docs/planning/v1-release-audit-and-execution-plan.md`
  - `docs/planning/v1-core-acceptance-bundle.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Deployment impact: none; read-only automation and documentation.
- Next tiny task: `PRJ-921` Release Evidence Archive Standard.
