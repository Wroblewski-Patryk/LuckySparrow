# TASK_BOARD

Last updated: 2026-04-19

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
- The current planned queue through `PRJ-028` is complete.
- Next executable slices should be derived from:
  - `docs/planning/next-iteration-plan.md`
  - `docs/planning/open-decisions.md`
- Additional architecture-alignment work should be appended after that queue so
  the backlog stays explicitly open for later discovery instead of pretending
  the plan is complete.

## READY

- [ ] (none)

## BACKLOG

- [ ] (none)

## FUTURE

- [ ] (none)

## IN_PROGRESS

- [ ] (none)

## BLOCKED

- [ ] (none)

## REVIEW

- [ ] (none)

## DONE

- [x] PRJ-029 Split canonical architecture docs from transitional runtime reality
  - Status: DONE
  - Group: Documentation Integrity
  - Owner: Product Docs
  - Depends on: PRJ-028
  - Priority: P2
  - Result:
    - `docs/architecture/` now again describes the canonical AION architecture
      and human-oriented cognitive flow
    - transitional runtime details were moved into
      `docs/implementation/runtime-reality.md`
    - docs index and project context now describe the two-layer documentation
      model explicitly
  - Validation:
    - doc-only change, no automated validation required
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
- [x] PRJ-015 Tighten the event normalization and public API boundary
  - Status: DONE
  - Group: Observability And Runtime Honesty
  - Owner: Planner
  - Depends on: none
  - Priority: P2
  - Result:
    - API event normalization now enforces explicit source/subsource and a small payload boundary
    - text normalization and meta fallback rules are test-covered, including length caps aligned with persistence limits
    - `EventRuntimeResponse` now uses shared `MotivationMode` contract typing
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q tests/test_event_normalization.py tests/test_api_routes.py`
- [x] PRJ-016 Move startup toward migration-first schema ownership
  - Status: DONE
  - Group: Observability And Runtime Honesty
  - Owner: DB/Migrations
  - Depends on: none
  - Priority: P2
  - Result:
    - app startup now defaults to migration-first behavior
    - startup `create_tables()` moved behind explicit compatibility mode (`STARTUP_SCHEMA_MODE=create_tables`)
    - migration and deployment expectations were synchronized in docs and context
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q tests/test_schema_baseline.py tests/test_config.py`
    - `.\.venv\Scripts\python -m alembic upgrade head --sql`
- [x] PRJ-017 Make the expression-to-action handoff explicit and test-covered
  - Status: DONE
  - Group: Stage Boundary Alignment
  - Owner: Backend Builder
  - Depends on: PRJ-016
  - Priority: P2
  - Result:
    - runtime now materializes an explicit `ActionDelivery` handoff between
      expression and action
    - action side effects consume the handoff contract instead of implicit
      expression/event coupling
    - runtime and action tests pin Telegram/API delivery behavior through the
      explicit contract
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q tests/test_runtime_pipeline.py tests/test_action_executor.py tests/test_expression_agent.py`
- [x] PRJ-019 Add runtime stage ownership and architecture-to-code traceability
  - Status: DONE
  - Group: Architecture Traceability And Contract Tests
  - Owner: Product Docs
  - Depends on: PRJ-016
  - Priority: P3
  - Result:
    - runtime stage ownership and primary validation surfaces are now documented
      in overview and architecture docs
    - runtime-contract docs now explicitly distinguish public `/event` response
      from debug-only internal payload shape
    - current-runtime differences versus intended architecture are explicit and
      searchable in canonical docs
  - Validation:
    - doc-only change, no automated validation required
- [x] PRJ-018 Reduce expression/action integration coupling without changing behavior
  - Status: DONE
  - Group: Stage Boundary Alignment
  - Owner: Backend Builder
  - Depends on: PRJ-017
  - Priority: P2
  - Result:
    - action execution now delegates channel delivery to integration-level
      `DeliveryRouter`
    - integration delivery consumes explicit `ActionDelivery` contract instead
      of runtime-local channel assumptions
    - API and Telegram delivery behavior remains stable under regression tests
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q tests/test_runtime_pipeline.py tests/test_api_routes.py tests/test_action_executor.py tests/test_delivery_router.py`
- [x] PRJ-020 Add contract-level runtime flow smoke tests for architecture invariants
  - Status: DONE
  - Group: Architecture Traceability And Contract Tests
  - Owner: QA/Test
  - Depends on: PRJ-017, PRJ-019
  - Priority: P2
  - Result:
    - runtime flow invariants now have dedicated contract smoke tests across
      runtime pipeline, API boundary shape, and stage-logger payload contract
    - architectural drift on stage order, action boundary, or trace/log payload
      keys now causes fast regression failures
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q tests/test_runtime_pipeline.py tests/test_api_routes.py tests/test_logging.py`
- [x] PRJ-021 Add explicit debug payload exposure gate for `/event`
  - Status: DONE
  - Group: Public API Shape
  - Owner: Backend Builder
  - Depends on: none
  - Priority: P3
  - Result:
    - debug payload exposure for `POST /event?debug=true` is now controlled by
      explicit config (`EVENT_DEBUG_ENABLED`)
    - API behavior is test-covered for both debug-enabled and debug-disabled
      paths
    - environment and operations docs now describe the gate and policy surface
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q tests/test_api_routes.py tests/test_config.py`
- [x] PRJ-022 Expose runtime policy flags in `/health` for operator traceability
  - Status: DONE
  - Group: Runtime Ops Visibility
  - Owner: Ops/Release
  - Depends on: none
  - Priority: P3
  - Result:
    - `/health` now includes non-secret runtime policy flags (`startup_schema_mode`, `event_debug_enabled`)
    - API tests pin the added health payload contract
    - runtime ops and planning docs now describe the policy visibility surface
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q tests/test_api_routes.py`
- [x] PRJ-023 Add production visibility warning for debug payload policy
  - Status: DONE
  - Group: Runtime Ops Visibility
  - Owner: Backend Builder
  - Depends on: none
  - Priority: P3
  - Result:
    - startup now emits an explicit warning when `APP_ENV=production` and
      `EVENT_DEBUG_ENABLED=true`
    - warning behavior is pinned with targeted startup policy tests
    - runtime ops and planning docs now explain how operators should interpret
      and clear this warning
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q tests/test_api_routes.py tests/test_config.py tests/test_main_runtime_policy.py`
- [x] PRJ-024 Add production visibility warning for schema compatibility mode
  - Status: DONE
  - Group: Runtime Ops Visibility
  - Owner: Backend Builder
  - Depends on: none
  - Priority: P3
  - Result:
    - startup now emits an explicit warning when `APP_ENV=production` and
      `STARTUP_SCHEMA_MODE=create_tables`
    - warning behavior is pinned with targeted startup policy tests
    - runtime ops and planning docs now explain why schema compatibility mode
      should remain temporary in production
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q tests/test_main_runtime_policy.py tests/test_config.py`
- [x] PRJ-025 Harden production default for debug payload exposure policy
  - Status: DONE
  - Group: Runtime Ops Visibility
  - Owner: Backend Builder
  - Depends on: PRJ-023
  - Priority: P3
  - Result:
    - event debug exposure now uses environment-aware effective policy
      (enabled by default in non-production, disabled by default in production)
    - `/health` now exposes `event_debug_source` so operators can distinguish
      explicit config from environment-derived default behavior
    - startup warnings and docs were aligned with explicit-vs-default policy
      semantics
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q tests/test_api_routes.py tests/test_config.py tests/test_main_runtime_policy.py`
- [x] PRJ-026 Add optional strict production policy enforcement for startup
  - Status: DONE
  - Group: Runtime Ops Visibility
  - Owner: Backend Builder
  - Depends on: PRJ-024, PRJ-025
  - Priority: P3
  - Result:
    - startup runtime-policy checks now support `PRODUCTION_POLICY_ENFORCEMENT=warn|strict`
    - production mismatch cases (`EVENT_DEBUG_ENABLED=true`, `STARTUP_SCHEMA_MODE=create_tables`) can now fail fast in strict mode
    - `/health` now exposes `production_policy_enforcement` so operators can verify active enforcement posture
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q tests/test_config.py tests/test_api_routes.py tests/test_main_runtime_policy.py`
- [x] PRJ-027 Add lifespan-level fail-fast regression test for strict policy mode
  - Status: DONE
  - Group: Runtime Ops Visibility
  - Owner: QA/Test
  - Depends on: PRJ-026
  - Priority: P3
  - Result:
    - startup strict-policy fail-fast behavior is now pinned at `lifespan` entry, not only in helper-level policy tests
    - regression test confirms mismatch block happens before database initialization side effects
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q tests/test_main_lifespan_policy.py tests/test_main_runtime_policy.py tests/test_config.py tests/test_api_routes.py`
- [x] PRJ-028 Add lifespan-level fail-fast regression coverage for strict schema mismatch
  - Status: DONE
  - Group: Runtime Ops Visibility
  - Owner: QA/Test
  - Depends on: PRJ-027
  - Priority: P3
  - Result:
    - startup strict-policy fail-fast behavior is now lifecycle-covered for both mismatch families
      (`EVENT_DEBUG_ENABLED=true` and `STARTUP_SCHEMA_MODE=create_tables`)
    - regression tests confirm strict-mode mismatch blocks runtime before database initialization in both cases
  - Validation:
    - `.\.venv\Scripts\python -m pytest -q tests/test_main_lifespan_policy.py tests/test_main_runtime_policy.py tests/test_config.py tests/test_api_routes.py`
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
