# Proactive And Subconscious Decision Evidence

## Header
- ID: PRJ-792
- Title: Proactive And Subconscious Decision Evidence
- Task Type: feature
- Current Stage: verification
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-785
- Priority: P1

## Context

`PRJ-785` identified that proactive and subconscious wakeups need clearer
operator-visible decision evidence. The communication-boundary repair already
prevents unwanted outreach, but the scheduler summary should explain why a
candidate was delivered, blocked, or failed.

## Goal

Expose bounded proactive decision evidence through the existing scheduler
summary and `/health.proactive.scheduler_tick_summary` without creating a new
proactive subsystem or bypassing the normal runtime path.

## Scope

- `backend/app/workers/scheduler.py`
- `backend/tests/test_scheduler_worker.py`
- `backend/tests/test_api_routes.py`

## Implementation Plan

1. Keep proactive ticks flowing through the existing scheduler event and
   runtime path.
2. After each runtime result, summarize:
   - decision reason
   - delivery guard reason
   - action status and actions
   - candidate trigger
   - recent outbound and unanswered counters
3. Store aggregate reason counts plus a bounded evidence list in the existing
   proactive tick summary.
4. Verify the same evidence is visible through `/health`.

## Acceptance Criteria

- Proactive summaries include `decision_reason_counts`.
- Proactive summaries include `delivery_guard_reason_counts`.
- Proactive summaries include bounded `decision_evidence` for considered
  candidates.
- `/health.proactive.scheduler_tick_summary` exposes the same evidence.
- No scheduler wakeup bypasses planning, expression, or action.

## Definition of Done

- [x] Code builds without errors.
- [x] The feature works through the real scheduler summary and health surface.
- [x] No mock-only behavior or temporary bypass remains in the delivered path.
- [x] Backend errors are handled deliberately in summary evidence.
- [x] No existing documented behavior is broken.
- [x] Changes are documented in the relevant source of truth.
- [x] Behavior is reproducible using recorded validation steps.

## Validation Evidence

- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_scheduler_worker.py -k "proactive"; Pop-Location`
    - result: `4 passed, 15 deselected`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py -k "external_scheduler_cutover_proof"; Pop-Location`
    - result: `1 passed, 116 deselected`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_runtime_pipeline.py -k "proactive"; Pop-Location`
    - result: `5 passed, 102 deselected`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; Pop-Location`
    - result: `981 passed in 106.20s`
- Manual checks:
  - not applicable
- Screenshots/logs:
  - not applicable
- High-risk checks:
  - evidence does not include candidate text or chat id

## Architecture Evidence

- Architecture source reviewed:
  - `docs/architecture/15_runtime_flow.md`
  - `docs/architecture/16_agent_contracts.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates:
  - no contract change; existing health/scheduler summary surface was expanded

## Deployment / Ops Evidence

- Deploy impact: low
- Env or secret changes: none
- Health-check impact:
  - `/health.proactive.scheduler_tick_summary` may now include bounded
    proactive decision evidence after a tick runs
- Smoke steps updated:
  - not required
- Rollback note:
  - revert scheduler summary evidence fields if health payload consumers reject
    new optional fields

## Review Checklist

- [x] Current stage is declared and respected.
- [x] Deliverable for the current stage is complete.
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated.
- [x] Learning journal was not updated because no new recurring pitfall was
  confirmed.

## Result Report

- Task summary:
  - proactive scheduler summaries now explain delivered and blocked candidates
- Files changed:
  - `backend/app/workers/scheduler.py`
  - `backend/tests/test_scheduler_worker.py`
  - `backend/tests/test_api_routes.py`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - scheduler proactive tests, health cutover proof test, runtime proactive
    tests
- What is incomplete:
  - deeper incident evidence bundle integration remains a future slice
- Next steps:
  - continue with behavior-neutral owner extraction in `PRJ-789..PRJ-791`
- Decisions made:
  - evidence stays inside existing scheduler/health surfaces rather than a new
    proactive observability subsystem
