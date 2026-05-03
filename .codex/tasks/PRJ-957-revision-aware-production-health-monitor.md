# Task

## Header
- ID: PRJ-957
- Title: Revision-Aware Production Health Monitor
- Task Type: release
- Current Stage: verification
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-956
- Priority: P0
- Coverage Ledger Rows: not applicable
- Iteration: 957
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
PRJ-938 showed that HTTP health can be green while production runs a stale SHA.
PRJ-956 added a release reality audit command. The hourly production monitor
needs an explicit revision-aware contract for the `v1.0.0` release tag.

## Goal
Make the production health monitor revision-aware by adding a monitor mode that
checks production against a selected release tag without failing just because
local `HEAD` or `origin/main` have moved beyond that tag.

## Scope
- `backend/scripts/audit_release_reality.py`
- `backend/scripts/audit_release_reality.ps1`
- `backend/tests/test_deployment_trigger_scripts.py`
- `docs/operations/production-health-monitor.md`
- `docs/planning/v1-minimal-external-health-monitor.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `.codex/tasks/PRJ-957-revision-aware-production-health-monitor.md`

## Implementation Plan
1. Extend the release reality audit script with selected-tag and monitor mode.
2. Keep normal release preflight strict against local `HEAD`/`origin/main`.
3. Let monitor mode compare production backend/web revisions against the
   selected release SHA while allowing newer local commits.
4. Add tests for monitor mode.
5. Update monitor docs and context.

## Acceptance Criteria
- [x] Monitor can target `v1.0.0`.
- [x] Monitor mode remains read-only and secret-free.
- [x] Revision drift returns a non-zero `HOLD_*` verdict.
- [x] A production check for `v1.0.0` passes.
- [x] Documentation records the hourly automation contract.

## Definition of Done
- [x] Script supports revision-aware monitor mode.
- [x] Tests pass.
- [x] Production monitor command passes against `v1.0.0`.
- [x] Docs/context are updated.

## Validation Evidence
- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_deployment_trigger_scripts.py -k "release_reality_audit or backend_operator_scripts_expose_help"; Pop-Location`
  - result: `12 passed, 44 deselected`
- Manual checks:
  - `Push-Location .\backend; ..\.venv\Scripts\python .\scripts\audit_release_reality.py --base-url "https://aviary.luckysparrow.ch" --selected-tag v1.0.0 --monitor-mode; Pop-Location`
  - result: `GO_FOR_SELECTED_SHA`
- Screenshots/logs: not applicable
- High-risk checks:
  - read-only production GETs only
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/operations/production-health-monitor.md`
  - `docs/operations/runtime-ops-runbook.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates:
  - monitor docs updated

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: monitor reads existing health surface
- Smoke steps updated: monitor docs only
- Rollback note: not applicable
- Observability or alerting impact:
  - monitor now detects revision drift from selected release tag
- Staged rollout or feature flag: not applicable

## Result Report
- Task summary:
  - added selected-tag monitor mode to the release reality audit and documented
    it as the revision-aware production monitor check
- Files changed:
  - listed in Scope
- How tested:
  - focused pytest and live production monitor-mode audit
- What is incomplete:
  - existing Codex automation prompt should be updated to run the documented
    monitor command if it still only checks `/health`
- Next steps:
  - PRJ-958 AI red-team scenario execution or automation prompt update when
    connector state allows editing the existing monitor
- Decisions made:
  - monitor mode compares production to the selected tag and does not require
    local `HEAD`/`origin/main` to equal the release tag

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - monitor docs checked revision parity only when present, but not against a
    selected release marker
- Gaps:
  - local `HEAD` can advance after release docs without meaning production
    drifted from `v1.0.0`
- Inconsistencies:
  - none
- Architecture constraints:
  - monitor must be read-only

### 2. Select One Priority Task
- Selected task:
  - PRJ-957 Revision-Aware Production Health Monitor
- Priority rationale:
  - next ready P0 after PRJ-956
- Why other candidates were deferred:
  - provider/live smokes need external inputs

### 3. Plan Implementation
- Files or surfaces to modify:
  - release audit script, tests, monitor docs, context
- Logic:
  - selected tag resolution and monitor-mode verdict selection
- Edge cases:
  - annotated tags resolve to commit SHA
  - local `HEAD` newer than tag
  - production backend/web drift

### 4. Execute Implementation
- Implementation notes:
  - added `--selected-tag` and `--monitor-mode`

### 5. Verify And Test
- Validation performed:
  - focused pytest and live production monitor-mode audit
- Result:
  - green; production backend and web revisions match `v1.0.0`

### 6. Self-Review
- Simpler option considered:
  - documenting manual SHA comparison only; rejected because automation needs a
    stable command
- Technical debt introduced: no
- Scalability assessment:
  - future release tags can reuse the same mode
- Refinements made:
  - normal release preflight remains strict by default

### 7. Update Documentation And Knowledge
- Docs updated:
  - monitor and roadmap docs
- Context updated:
  - task board and project state
- Learning journal updated: not applicable
