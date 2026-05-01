# Task

## Header
- ID: PRJ-848
- Title: Precise Organizer Activation Next Actions
- Task Type: fix
- Current Stage: implementation
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-847
- Priority: P1
- Coverage Ledger Rows: not applicable
- Iteration: 848
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

The post-deploy production health snapshot shows organizer provider activation
as the next non-core-v1 blocker. The live Google Calendar activation snapshot
reports only `GOOGLE_CALENDAR_ACCESS_TOKEN` and `GOOGLE_CALENDAR_CALENDAR_ID`
as missing, but the `next_action` still asks the operator to configure
timezone as well. Timezone has a configured/default value in production, so
the next action should match the actual missing settings.

## Goal

Make organizer activation `next_action` values precise when only a subset of
provider settings is missing, without changing connector execution boundaries
or readiness semantics.

## Scope

- `backend/app/core/connector_execution.py`
- `backend/tests/test_api_routes.py`
- `.codex/tasks/PRJ-848-precise-organizer-activation-next-actions.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: production activation guidance should not ask for
  already-present settings.
- Expected product or reliability outcome: operator next actions are exact and
  still machine-stable.
- How success will be observed: tests prove Google Calendar next action omits
  timezone when timezone is present and only token/calendar id are missing.
- Post-launch learning needed: no

## Deliverable For This Stage

A small backend readiness-message fix with focused regression coverage.

## Constraints

- reuse the existing organizer activation snapshot
- do not change approved operations, opt-in gates, mutation confirmation, or
  provider readiness rules
- do not expose secret values
- do not make organizer activation part of core v1 final blocker set

## Implementation Plan

1. Add a small helper that derives configure-style action slugs from actual
   missing settings.
2. Use that helper for provider activation and daily-use next actions when a
   provider is not ready.
3. Add a regression where Google Calendar has timezone configured but token and
   calendar id are missing.
4. Run focused API route tests.
5. Sync task board and project state.

## Acceptance Criteria

- Google Calendar activation still reports required settings including
  `GOOGLE_CALENDAR_TIMEZONE`.
- Missing settings remain truthful.
- If timezone is present, Google Calendar next action does not include
  timezone.
- Fully missing settings still produce the existing broad next-action slug.
- Ready providers keep their existing ready next-action slug.

## Definition of Done

- [x] Code change is implemented.
- [x] Focused regression tests pass.
- [x] No readiness boundary is widened.
- [x] Task board and project state are synchronized.

## Stage Exit Criteria

- [x] The output matches the declared `implementation` stage.
- [x] Work from later stages was not mixed in.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden

- changing provider credential names
- treating default timezone as a credential secret
- enabling provider execution without required token/id credentials
- moving organizer daily use into the core v1 acceptance gate

## Validation Evidence
- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py -k "organizer_activation_next_actions or organizer_tool_stack or provider_backed_google_calendar_readiness"; Pop-Location`
    - `3 passed, 115 deselected`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py; Pop-Location`
    - first run exposed three snapshot failures because the all-missing Google
      Calendar slug changed unintentionally
    - rerun after preserving the broad all-missing slug: `118 passed`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_deployment_trigger_scripts.py -k "organizer_tool_activation or release_smoke"; Pop-Location`
    - `40 passed, 11 deselected`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; Pop-Location`
    - `1010 passed in 103.38s`
- Manual checks: production health snapshot from PRJ-847
- Screenshots/logs: not applicable
- High-risk checks: provider readiness semantics must remain unchanged
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: not applicable

## Architecture Evidence
- Architecture source reviewed:
  - `docs/operations/runtime-ops-runbook.md`
  - `docs/planning/next-iteration-plan.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none expected

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: clearer `connectors.organizer_tool_stack` guidance
- Smoke steps updated: no
- Rollback note: revert this commit if operator automation depends on the old
  broad next-action slug
- Observability or alerting impact: none
- Staged rollout or feature flag: not applicable

## Review Checklist
- [x] Process self-audit completed before implementation.
- [x] Autonomous loop evidence covers all seven steps.
- [x] Exactly one priority task was selected in this iteration.
- [x] Operation mode was selected according to iteration rotation.
- [x] Current stage is declared and respected.
- [x] Deliverable for the current stage is complete.
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated if repository truth changed.
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: production operator
- Existing workaround or pain: operator guidance overstates missing settings
- Smallest useful slice: derive next action from missing settings
- Success metric or signal: focused regression passes
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: no

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: provider activation readiness triage
- SLI: next-action accuracy against missing settings
- SLO: no false missing setting in next-action guidance
- Error budget posture: not applicable
- Health/readiness check: focused test coverage
- Logs, dashboard, or alert route: not changed
- Smoke command or manual smoke: not needed for local fix
- Rollback or disable path: revert patch

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: configuration names only, no values
- Trust boundaries: unchanged
- Permission or ownership checks: unchanged
- Abuse cases: not applicable
- Secret handling: no secret values logged or exposed
- Security tests or scans: existing route tests
- Fail-closed behavior: readiness remains false until required settings exist
- Residual risk: slugs are operator-facing strings and may be consumed by
  external automation

## AI Testing Evidence
- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios: not in this task
- Multi-step context scenarios: not in this task
- Adversarial or role-break scenarios: not in this task
- Prompt injection checks: not in this task
- Data leakage and unauthorized access checks: not in this task
- Result: not applicable

## Result Report

- Task summary:
  - made organizer activation next-action slugs derive from actual missing
    settings while preserving existing broad slugs for fully missing states.
- Files changed:
  - `backend/app/core/connector_execution.py`
  - `backend/tests/test_api_routes.py`
  - `.codex/tasks/PRJ-848-precise-organizer-activation-next-actions.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - focused and full API route tests, release-smoke organizer parser tests, and
    the full backend gate.
- What is incomplete:
  - production still needs provider credentials before organizer workflows are
    daily-use ready.
- Next steps:
  - choose whether to publish this low-risk operator-readiness improvement and
    run the normal backend/release validation.
- Decisions made: readiness semantics stay unchanged; only next-action
  precision changes

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - production health guidance includes timezone in Google Calendar next action
    even though timezone is not missing.
- Gaps:
  - no regression pins partial-missing provider next actions.
- Inconsistencies:
  - `missing_settings` and `next_action` disagree for the production-like
    Google Calendar partial configuration.
- Architecture constraints:
  - action execution remains provider-backed only when required credentials are
    configured; this task only changes guidance text.

### 2. Select One Priority Task
- Selected task:
  - precise organizer activation next actions.
- Priority rationale:
  - it is a small operator-facing fix discovered from live post-deploy evidence.
- Why other candidates were deferred:
  - actual credential activation requires operator secrets and cannot be
    completed from code alone.

### 3. Plan Implementation
- Files or surfaces to modify:
  - connector readiness policy and API route tests.
- Logic:
  - derive configure next-action slug from actual missing settings.
- Edge cases:
  - all settings missing should preserve the current broad slug.
  - ready providers should preserve ready slugs.

### 4. Execute Implementation
- Implementation notes:
  - added `_configure_next_action()` and reused the existing `missing_settings`
    lists for activation and daily-use guidance.
  - preserved `configure_google_calendar_access_token_calendar_id_and_timezone`
    for the all-missing state to avoid breaking existing snapshot consumers.

### 5. Verify and Test
- Validation performed:
  - focused organizer readiness tests
  - full API route tests
  - focused release-smoke parser tests
  - full backend gate
- Result:
  - all selected tests passed after one refinement.

### 6. Self-Review
- Simpler option considered:
  - hard-code a Google Calendar token/id-only slug, but a helper keeps behavior
    aligned with actual missing settings.
- Technical debt introduced: no
- Scalability assessment:
  - helper can support other providers if partial missing states appear.
- Refinements made:
  - preserved the existing all-missing Google Calendar slug after full API route
    tests caught unintended snapshot drift.

### 7. Update Documentation and Knowledge
- Docs updated:
  - no canonical docs changed; behavior is a precision fix to existing health
    guidance.
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable; no recurring pitfall was confirmed.
