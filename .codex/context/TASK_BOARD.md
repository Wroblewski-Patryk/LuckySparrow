# TASK_BOARD

Last updated: 2026-04-18

## Agent Workflow Refresh (2026-04-18)

- This board is the canonical execution queue for Personality / AION.
- If no task is `READY`, the Planning Agent should derive the next smallest
  executable task from:
  - `docs/planning/next-iteration-plan.md`
  - `docs/planning/open-decisions.md`
- Default delivery loop for every execution slice:
  - plan
  - implement
  - run relevant tests and validations
  - capture architecture follow-up if discovered
  - sync task state, project state, and learning journal when needed

## READY

- [ ] PRJ-015 Tighten the event normalization and public API boundary
  - Status: READY
  - Group: Observability And Runtime Honesty
  - Owner: Planner
  - Depends on: none
  - Priority: P2
  - Files:
    - `app/core/events.py`
    - `app/api/routes.py`
    - `app/api/schemas.py`
    - `tests/test_event_normalization.py`
    - `tests/test_api_routes.py`
  - Done when:
    - input normalization rules are explicit and test-covered
    - the public `/event` contract stays small and intentional
    - debug behavior remains clearly internal
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q tests/test_event_normalization.py tests/test_api_routes.py`

## BACKLOG

- [ ] PRJ-016 Move startup toward migration-first schema ownership
  - Status: BACKLOG
  - Group: Observability And Runtime Honesty
  - Owner: DB/Migrations
  - Depends on: none
  - Priority: P2

## IN_PROGRESS

- [ ] (none)

## BLOCKED

- [ ] (none)

## REVIEW

- [ ] (none)

## DONE

- [x] PRJ-000 Establish Personality-specific agent workflow scaffolding
- [x] PRJ-001..PRJ-010 Runtime contract, release-smoke, memory, and motivation alignment slices completed and captured in docs and tests
- [x] PRJ-014 Add a reusable stage-level structured logging scaffold
  - Status: DONE
  - Group: Observability And Runtime Honesty
  - Owner: Backend Builder
  - Depends on: none
  - Priority: P2
  - Files:
    - `app/core/runtime.py`
    - `app/core/logging.py`
  - Done when:
    - each runtime stage logs success or failure with `event_id`, `trace_id`, stage, and duration
    - stage logs include short summaries instead of raw payload dumps
    - related docs or project state mention the new observability surface if it changes repo truth
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q tests/test_runtime_pipeline.py tests/test_api_routes.py`
- [x] PRJ-011 Extract shared goal/task selection helpers
  - Status: DONE
  - Group: Shared Signal Engine Extraction
  - Owner: Backend Builder
  - Depends on: none
  - Priority: P1
  - Done when:
    - tokenization, priority ranking, task-status ranking, and related-goal selection no longer live in multiple copies
    - behavior stays unchanged
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q tests/test_context_agent.py tests/test_motivation_engine.py tests/test_planning_agent.py tests/test_runtime_pipeline.py`
- [x] PRJ-012 Extract shared goal-progress and milestone-history signal helpers
  - Status: DONE
  - Group: Shared Signal Engine Extraction
  - Owner: Backend Builder
  - Depends on: PRJ-011
  - Priority: P1
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q tests/test_motivation_engine.py tests/test_planning_agent.py tests/test_reflection_worker.py tests/test_runtime_pipeline.py`
- [x] PRJ-013 Split oversized heuristic modules after helper extraction
  - Status: DONE
  - Group: Shared Signal Engine Extraction
  - Owner: Backend Builder
  - Depends on: PRJ-011, PRJ-012
  - Priority: P2
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q`
