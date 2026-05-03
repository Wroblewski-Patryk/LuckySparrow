# Task

## Header
- ID: PRJ-951
- Title: V1 Reality Audit And Roadmap
- Task Type: release
- Current Stage: verification
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-938
- Priority: P0
- Coverage Ledger Rows: not applicable
- Iteration: 951
- Operation Mode: ARCHITECT

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
The user asked to keep working until v1 becomes real by auditing current
state, comparing it with code, and planning many executable tasks. PRJ-938
proved that the latest pushed candidate is not deployed yet.

## Goal
Create a code-grounded v1 reality audit and a large executable roadmap that
separates deploy blockers, hardening evidence, provider blockers, and web
confidence work.

## Scope
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/tasks/PRJ-951-v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Implementation Plan
1. Inspect current task board and project state.
2. Compare production health/revision with local repository state.
3. Inspect current route, data model, OpenAPI, frontend, deployment, and test
   surfaces.
4. Verify generated API/data artifacts against code.
5. Write a roadmap that can drive future one-slice iterations.
6. Update context files.

## Acceptance Criteria
- [x] Audit records what is real in code and production.
- [x] Audit identifies stale or over-broad v1 claims.
- [x] Roadmap includes P0/P1/P2 tasks with statuses and definitions of done.
- [x] Validation evidence is recorded.
- [x] No runtime behavior changes are introduced.

## Definition of Done
- [x] `DEFINITION_OF_DONE.md` relevant checks are satisfied for planning scope.
- [x] Current v1 blocker is not hidden.
- [x] Future tasks are executable and ordered.
- [x] Context is updated.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- claiming v1 deployed without deploy parity
- creating a release marker
- inventing provider readiness without credentials
- changing runtime code in this audit slice

## Validation Evidence
- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_deployment_trigger_scripts.py -k "deploy_parity or runtime_build_revision"; Pop-Location`
  - result: `6 passed, 46 deselected`
- Manual checks:
  - `git status --short --branch`
  - `git remote -v`
  - production `/health`
  - production `/settings` web revision meta
  - generated OpenAPI compare
  - generated data model and ERD compare
- Screenshots/logs: not applicable
- High-risk checks:
  - no tag or release marker created
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/operations/runtime-ops-runbook.md`
  - `docs/planning/v1-release-marker-blocker.md`
  - `docs/planning/v1-core-acceptance-bundle.md`
  - `docs/planning/documentation-system-gap-repair-plan.md`
- Fits approved architecture: yes
- Mismatch discovered: yes
- Decision required from user: no; mismatch is already represented as a
  release blocker
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates:
  - roadmap created for future execution

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: not applicable
- Observability or alerting impact: planned follow-up PRJ-957
- Staged rollout or feature flag: not applicable

## Result Report
- Task summary:
  - created v1 reality audit and roadmap
- Files changed:
  - listed in Scope
- How tested:
  - focused deployment-trigger tests, production revision checks, generated
    OpenAPI/data reference compares, `git diff --check`
- What is incomplete:
  - roadmap execution remains future work
- Next steps:
  - PRJ-956 release reality audit script
- Decisions made:
  - current deploy parity remains the first release blocker

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - production is green for an older SHA but not current `origin/main`
- Gaps:
  - release reality checks are spread across scripts/docs/health
- Inconsistencies:
  - older acceptance bundle language can read as GO despite current candidate
    deploy parity being blocked
- Architecture constraints:
  - release marker follows production evidence

### 2. Select One Priority Task
- Selected task:
  - PRJ-951 V1 Reality Audit And Roadmap
- Priority rationale:
  - the user requested a fresh audit and queue before continuing execution
- Why other candidates were deferred:
  - implementation tasks need an updated source-of-truth queue

### 3. Plan Implementation
- Files or surfaces to modify:
  - planning and context docs
- Logic:
  - documentation-only audit
- Edge cases:
  - do not mark blocked production as deployed

### 4. Execute Implementation
- Implementation notes:
  - created a release-reality roadmap with P0/P1/P2 tasks

### 5. Verify And Test
- Validation performed:
  - focused tests, production checks, generated artifact compares
- Result:
  - audit completed; deployment remains blocked

### 6. Self-Review
- Simpler option considered:
  - only retrying deploy smoke was rejected because the user asked for an audit
    and task plan after the blocker
- Technical debt introduced: no
- Scalability assessment:
  - roadmap supports future one-task iterations
- Refinements made:
  - separated external blockers from locally executable tasks

### 7. Update Documentation And Knowledge
- Docs updated:
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - task board and project state
- Learning journal updated: not applicable
