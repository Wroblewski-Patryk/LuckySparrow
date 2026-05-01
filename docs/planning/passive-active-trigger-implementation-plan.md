# Passive/Active Trigger Implementation Plan

## Purpose

This plan turns the `PRJ-853` passive/active architecture contract into a
small, testable implementation queue.

The target is not to remove relational proactivity. The target is to stop
treating scheduler time passing as a generic conscious stimulus.

The implementation must preserve two separate concepts:

- external future-facing planning:
  contact, care, check-ins, reminders, routines, research windows, and other
  work that may become relevant later
- internal foreground execution:
  the already-admitted path from stimulus through planning, expression, action,
  memory, and reflection evidence

## Current Baseline

Live implementation already has the required building blocks:

- `backend/app/workers/scheduler.py`
  - runs maintenance and proactive ticks
  - already reevaluates due planned work
  - currently can still run proactive candidates through full runtime execution
- `backend/app/memory/repository.py`
  - stores planned work
  - exposes `get_due_planned_work(...)`
  - stores and loads subconscious proposals
  - exposes `get_proactive_scheduler_candidates(...)`
- `backend/app/proactive/engine.py`
  - evaluates proactive interruption and delivery guards once a scheduler event
    reaches foreground planning
- `backend/app/core/proactive_policy.py`
  - exposes proactive runtime posture
- `backend/app/core/scheduler_contracts.py`
  - owns cadence normalization and dispatch decisions
- `backend/app/core/runtime.py`
  - loads pending proposals into foreground planning
  - resolves proposal handoff decisions after conscious planning
- `backend/tests/test_scheduler_worker.py`,
  `backend/tests/test_runtime_pipeline.py`, and
  `backend/tests/test_api_routes.py`
  already cover much of the scheduler/planned-work/proactive surface

The main gap is ownership shape:

- passive cadence should cheaply observe whether anything is due or actionable
- empty observations should no-op without a full foreground runtime run
- relation-backed care should become planned work or a proposal first
- foreground execution should begin only after due work or actionable proposal
  crosses attention/observer boundaries

## Implementation Principles

1. Reuse planned work and subconscious proposals.
2. Do not introduce a second scheduler, reminder engine, or background
   delivery path.
3. Keep all user-visible delivery inside conscious
   `planning -> expression -> action`.
4. Preserve failure/skipped evidence for reflection even when expression stays
   silent.
5. Make observer posture machine-visible before behavior is rerouted through
   it.
6. Keep rollback simple: `PROACTIVE_ENABLED=false` remains the safe outreach
   fallback.

## Target Runtime Shape

Passive cadence:

```text
scheduler/external cadence
  -> planned-action observer
  -> if empty: record cheap no-op evidence and stop
  -> if due planned work: mark due / create proposal / hand off through attention
  -> if actionable proposal: hand off through attention
  -> conscious runtime only after due/actionable admission
```

Active foreground:

```text
admitted event or due/actionable handoff
  -> perception
  -> context
  -> motivation
  -> role
  -> planning
  -> expression
  -> action
  -> memory
  -> reflection trigger
```

## Data Model Impact

The first implementation should avoid schema changes.

Use existing durable entities:

- `aion_planned_work_item`
- `aion_subconscious_proposal`
- scheduler cadence evidence
- episodic memory payloads
- proactive state updates through existing typed intents

Add schema only if implementation inspection proves that observer evidence
cannot be represented through existing scheduler cadence evidence or episode
payloads.

## Detailed Task Queue

### PRJ-855 - Add Planned-Action Observer Policy And Diagnostics

Goal:

- Add one shared observer policy owner that classifies passive cadence results
  before full foreground runtime execution.

Files:

- `backend/app/core/planned_action_observer.py`
- `backend/app/core/proactive_policy.py`
- `backend/app/core/scheduler_contracts.py`
- `backend/app/api/routes.py`
- `backend/tests/test_planned_action_observer.py`
- `backend/tests/test_api_routes.py`
- `docs/implementation/runtime-reality.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

Implementation notes:

- Create a small pure policy module, not a new scheduler.
- Normalize observer states:
  - `empty_noop`
  - `due_planned_work`
  - `actionable_proposal`
  - `blocked_by_policy`
  - `observer_unavailable`
- Expose health/debug posture through existing health policy surfaces.
- Include counts, not raw payloads:
  - due planned work count
  - actionable proposal count
  - last observer result
  - last no-op reason

Acceptance:

- empty observer result is visible as a no-op posture
- observer policy does not execute runtime or delivery
- health/debug output contains no raw private planned-work text

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_planned_action_observer.py tests/test_api_routes.py; Pop-Location`

### PRJ-856 - Route Proactive Cadence Through Observer Admission

Goal:

- Change proactive cadence so it starts foreground runtime only when observer
  finds due planned work or actionable proposal input.

Files:

- `backend/app/workers/scheduler.py`
- `backend/app/core/events.py`
- `backend/app/memory/repository.py`
- `backend/tests/test_scheduler_worker.py`
- `backend/tests/test_runtime_pipeline.py`
- `docs/implementation/runtime-reality.md`
- `docs/operations/runtime-ops-runbook.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

Implementation notes:

- Keep maintenance due planned-work reevaluation intact.
- Replace generic proactive candidate emission with observer-admitted handoff.
- Keep relation-backed proactive reasoning as proposal/planned-work input.
- Do not remove `ProactiveDecisionEngine`; it still evaluates admitted
  scheduler-originated foreground turns.
- Ensure no full `runtime.run(...)` call happens for empty proactive cadence.

Acceptance:

- proactive tick with no due/actionable work records no-op and emits zero
  foreground events
- due planned work still reaches conscious planning and can deliver after gates
- actionable proposal still reaches conscious planning and can be accepted,
  deferred, or discarded
- user-authored turns remain unaffected

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_scheduler_worker.py tests/test_runtime_pipeline.py; Pop-Location`

### PRJ-857 - Persist Skipped And Failed Passive/Active Evidence

Goal:

- Preserve evidence for skipped, blocked, or failed observer-admitted work so
  reflection can learn without forcing user-visible failure chatter.

Files:

- `backend/app/workers/scheduler.py`
- `backend/app/core/action.py`
- `backend/app/memory/repository.py`
- `backend/app/reflection/worker.py`
- `backend/tests/test_action_executor.py`
- `backend/tests/test_reflection_worker.py`
- `backend/tests/test_memory_repository.py`
- `docs/architecture/17_logging_and_debugging.md`
- `docs/implementation/runtime-reality.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

Implementation notes:

- Use existing scheduler cadence evidence where possible.
- Preserve structured fields:
  - observer result
  - due/actionable source
  - delivery guard outcome
  - action status
  - failure reason
  - whether expression reported or stayed silent
- Reflection should consume repeated failure/friction evidence only through
  existing relation/conclusion update paths.

Acceptance:

- failed admitted work leaves durable evidence
- expression silence does not erase action/scheduler evidence
- repeated blocked outreach can become future relation/planning evidence
- no raw provider payloads are persisted

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_action_executor.py tests/test_reflection_worker.py tests/test_memory_repository.py; Pop-Location`

### PRJ-858 - Add Behavior Scenarios For Observer-Gated Proactivity

Goal:

- Prove behavior across time, not only module output.

Files:

- `backend/tests/test_runtime_pipeline.py`
- `backend/tests/test_scheduler_worker.py`
- `docs/architecture/29_runtime_behavior_testing.md`
- `docs/engineering/testing.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

Scenarios:

- silent no-op:
  - proactive cadence runs
  - no due planned work
  - no actionable proposal
  - no foreground event emitted
  - no user-visible transcript item appears
- due outreach:
  - planned work is due
  - observer admits it
  - conscious planning evaluates it
  - action delivers only if gates allow it
- relational care:
  - reflection/proposal path infers care/check-in candidate from relation
    evidence
  - candidate is saved as proposal or planned work
  - later observer admits it only when due/actionable
- failure learning:
  - admitted work fails or is blocked
  - failure evidence persists
  - expression does not need to spam the user with failure details
  - reflection can learn from accumulated evidence

Acceptance:

- all scenarios are deterministic
- no live wall-clock dependency in tests
- no user-visible pseudo-turn is created from empty scheduler cadence

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_runtime_pipeline.py tests/test_scheduler_worker.py -k "observer or proactive or planned_work"; Pop-Location`

### PRJ-859 - Sync Ops, Release Smoke, And Observability

Goal:

- Make operator evidence and release smoke consume the observer posture.

Files:

- `backend/scripts/run_release_smoke.ps1`
- `backend/scripts/run_release_smoke.py` if present for matching parser logic
- `backend/tests/test_deployment_trigger_scripts.py`
- `docs/operations/runtime-ops-runbook.md`
- `docs/architecture/17_logging_and_debugging.md`
- `docs/implementation/runtime-reality.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `.codex/context/LEARNING_JOURNAL.md`

Implementation notes:

- Release smoke should report:
  - observer policy owner
  - latest observer state
  - empty no-op support
  - due/admitted counts when available
  - proactive cadence no-op versus foreground-emitted counts
- Incident evidence should distinguish:
  - passive no-op
  - due handoff
  - conscious delivery blocked
  - conscious delivery executed

Acceptance:

- smoke and incident evidence expose observer posture without reading raw
  private planned-work text
- rollout and rollback notes are clear
- learning journal records the anti-spam/passive-trigger guardrail

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_deployment_trigger_scripts.py tests/test_api_routes.py; Pop-Location`

### PRJ-860 - Final Backend Gate And Context Closure

Goal:

- Prove the full observer-gated proactive lane against the primary backend
  gate and close docs/context.

Files:

- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `docs/planning/next-iteration-plan.md`
- `docs/engineering/testing.md`
- `docs/operations/runtime-ops-runbook.md`

Acceptance:

- primary backend gate passes
- docs and context describe the same runtime truth
- remaining implementation gaps are explicit

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; Pop-Location`

## Rollout Strategy

1. Merge observer policy and health/debug visibility first.
2. Deploy with behavior unchanged except observability.
3. Route proactive cadence through observer in a narrow follow-up.
4. Verify no-op cadence does not emit foreground events.
5. Keep `PROACTIVE_ENABLED=false` as the operational rollback if outreach
   behavior drifts.

## Non-Goals

- no new scheduler engine
- no new reminder subsystem
- no background direct delivery
- no generic hard-coded "contact after N hours" duty
- no schema change unless evidence proves it is required
- no change to user-authored turn handling
- no change to the internal foreground execution sequence once admitted

## Definition Of Done For The Lane

- empty proactive/relationship cadence can no-op cheaply
- due planned work and actionable proposals can still reach conscious planning
- generic time-passing cannot create user-visible outreach by itself
- blocked and failed attempts are persisted as learning evidence
- behavior scenarios prove no-op, due outreach, relational care, and failure
  learning
- health, incident evidence, and release smoke expose observer posture
- docs, context, and tests agree on the passive/active boundary
