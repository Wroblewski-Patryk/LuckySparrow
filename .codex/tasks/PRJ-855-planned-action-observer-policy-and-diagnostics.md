# Task

## Header
- ID: PRJ-855
- Title: Add Planned-Action Observer Policy And Diagnostics
- Task Type: feature
- Current Stage: verification
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-854
- Priority: P0
- Coverage Ledger Rows: not applicable
- Iteration: 855
- Operation Mode: TESTER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
`PRJ-853` froze the passive/active trigger boundary and `PRJ-854` detailed the implementation lane. This slice adds the shared observer policy and health/debug posture before changing proactive cadence behavior.

## Goal
Expose one counts-only planned-action observer policy that can describe whether passive cadence found no work, due planned work, actionable proposals, policy blockage, or missing evidence.

## Success Signal
- User or operator problem: operators need to see whether proactive cadence is moving toward observer-gated behavior.
- Expected product or reliability outcome: health/debug surfaces can distinguish empty no-op posture from due/actionable posture without exposing raw private planned-work text.
- How success will be observed: `/health.proactive.planned_action_observer` exposes policy owner, state, reason, counts, and raw-payload posture.
- Post-launch learning needed: yes

## Deliverable For This Stage
Implemented observer policy and diagnostics; no cadence reroute yet.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it
- do not change runtime cadence behavior in this slice

## Scope
- `backend/app/core/planned_action_observer.py`
- `backend/app/core/proactive_policy.py`
- `backend/app/api/routes.py`
- `backend/tests/test_planned_action_observer.py`
- `backend/tests/test_api_routes.py`
- `docs/implementation/runtime-reality.md`
- `docs/planning/next-iteration-plan.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `.codex/tasks/PRJ-855-planned-action-observer-policy-and-diagnostics.md`

## Implementation Plan
1. Add pure observer policy snapshot helper.
2. Include observer posture in proactive runtime policy.
3. Expose observer posture through `/health.proactive` and debug incident proactive posture.
4. Add focused observer unit tests.
5. Add health regression coverage.
6. Update runtime reality, planning, task board, and project state.
7. Run focused API/scheduler/observer validation.

## Acceptance Criteria
- [x] Observer states include `empty_noop`, `due_planned_work`, `actionable_proposal`, `blocked_by_policy`, and `observer_unavailable`.
- [x] Health output exposes observer policy owner and counts only.
- [x] Proactive candidate selection baseline now points at observer-admitted due/actionable work.
- [x] Runtime cadence behavior is unchanged.
- [x] Focused tests pass.

## Definition of Done
- [x] DEFINITION_OF_DONE.md posture is satisfied for this narrow backend diagnostics slice.
- [x] Code, tests, docs, task board, and project state are updated.
- [x] Validation evidence is attached.
- [x] No unrelated dirty worktree changes are staged.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- routing proactive cadence through observer admission in this task
- direct background delivery
- raw planned-work payload exposure in health/debug
- schema changes
- unrelated UI/context staging

## Validation Evidence
- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_planned_action_observer.py tests/test_api_routes.py -k "planned_action_observer or health_endpoint_returns_ok"; Pop-Location`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_scheduler_worker.py -k "snapshot_exposes_live_proactive_policy"; Pop-Location`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_planned_action_observer.py tests/test_api_routes.py tests/test_scheduler_worker.py; Pop-Location`
  - `git diff --check`
- Manual checks: staged diff review before commit.
- Screenshots/logs: not applicable.
- High-risk checks: observer exposes counts only and no raw private planned-work text.
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/architecture/16_agent_contracts.md`
  - `docs/planning/passive-active-trigger-implementation-plan.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: `PRJ-853`
- Follow-up architecture doc updates: none

## UX/UI Evidence
- Design source type: not applicable
- Design source reference: not applicable
- Canonical visual target: not applicable
- Fidelity target: not applicable
- Stitch used: no
- Experience-quality bar reviewed: not applicable
- Visual-direction brief reviewed: not applicable
- Existing shared pattern reused: not applicable
- New shared pattern introduced: no
- Design-memory entry reused: not applicable
- Design-memory update required: no
- Visual gap audit completed: not applicable
- Background or decorative asset strategy: not applicable
- Canonical asset extraction required: no
- Screenshot comparison pass completed: not applicable
- Remaining mismatches: none
- State checks: not applicable
- Feedback locality checked: not applicable
- Raw technical errors hidden from end users: not applicable
- Responsive checks: not applicable
- Input-mode checks: not applicable
- Accessibility checks: not applicable
- Parity evidence: not applicable

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: `/health.proactive.planned_action_observer` added
- Smoke steps updated: future `PRJ-859`
- Rollback note: revert observer policy/health exposure; runtime behavior unchanged
- Observability or alerting impact: health/debug posture only
- Staged rollout or feature flag: `PROACTIVE_ENABLED=false` remains outreach rollback

## Review Checklist
- [x] Process self-audit completed before implementation.
- [x] Autonomous loop evidence covers all seven steps.
- [x] Exactly one priority task was completed in this iteration.
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
- [x] Learning journal update was not required because no recurring pitfall was confirmed.

## Notes
`PRJ-856` is the behavior-changing slice that should route proactive cadence through observer admission.

## Production-Grade Required Contract

Every task must include these mandatory sections before it can move to `READY` or `IN_PROGRESS`:

- `Goal`
- `Scope` with exact files, modules, routes, APIs, schemas, docs, or runtime surfaces
- `Implementation Plan` with step-by-step execution and validation
- `Acceptance Criteria` with testable conditions
- `Definition of Done` using `DEFINITION_OF_DONE.md`
- `Result Report`

Runtime tasks must be delivered as a vertical slice: UI -> logic -> API -> DB -> validation -> error handling -> test. Partial implementations, mock-only paths, placeholders, fake data, and temporary fixes are forbidden.

## Integration Evidence

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: user receiving unwanted repeated outreach
- Existing workaround or pain: cadence could still drive outreach even after communication feedback
- Smallest useful slice: observer policy and diagnostics
- Success metric or signal: health/debug posture exposes observer state
- Feature flag, staged rollout, or disable path: existing proactive disable posture
- Post-launch feedback or metric check: future observer no-op/admission counts

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: proactive outreach and planned-work follow-up
- SLI: observer no-op versus due/actionable counts
- SLO: not defined in this slice
- Error budget posture: not applicable
- Health/readiness check: `/health.proactive.planned_action_observer`
- Logs, dashboard, or alert route: health/debug only
- Smoke command or manual smoke: focused API health tests
- Rollback or disable path: `PROACTIVE_ENABLED=false`

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: yes, `/health`
- Endpoint and client contract match: yes
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: not applicable
- Regression check performed: focused tests

## AI Testing Evidence

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: counts-only health/debug metadata
- Trust boundaries: background remains passive; action remains side-effect owner
- Permission or ownership checks: no raw planned-work text exposed
- Abuse cases: unwanted scheduler-driven outreach
- Secret handling: no secrets touched
- Security tests or scans: not applicable
- Fail-closed behavior: observer can report `blocked_by_policy` or `observer_unavailable`
- Residual risk: cadence routing still pending in `PRJ-856`

- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios: future `PRJ-858`
- Multi-step context scenarios: future `PRJ-858`
- Adversarial or role-break scenarios: future implementation hardening
- Prompt injection checks: not applicable
- Data leakage and unauthorized access checks: health exposes counts only
- Result: pass

## Result Report

- Task summary: added planned-action observer policy and health/debug diagnostics.
- Files changed:
  - `backend/app/core/planned_action_observer.py`
  - `backend/app/core/proactive_policy.py`
  - `backend/app/api/routes.py`
  - `backend/tests/test_planned_action_observer.py`
  - `backend/tests/test_api_routes.py`
  - `docs/implementation/runtime-reality.md`
  - `docs/planning/next-iteration-plan.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/tasks/PRJ-855-planned-action-observer-policy-and-diagnostics.md`
- How tested: focused observer/API/scheduler tests listed above, including
  the combined observer/API/scheduler suite with `143 passed`.
- What is incomplete: proactive cadence is not yet routed through observer admission.
- Next steps: `PRJ-856`.
- Decisions made: observer diagnostics are counts-only and live under proactive posture.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: observer target existed only in docs.
- Gaps: no machine-visible observer policy or health posture.
- Inconsistencies: proactive cadence still advertises generic candidate selection.
- Architecture constraints: passive loops cannot directly execute.

### 2. Select One Priority Task
- Selected task: `PRJ-855`
- Priority rationale: visibility first makes later behavior reroute safer.
- Why other candidates were deferred: cadence behavior changes belong in `PRJ-856`.

### 3. Plan Implementation
- Files or surfaces to modify: core policy, proactive policy, health route, tests, docs/context.
- Logic: classify current counts into observer states.
- Edge cases: disabled proactive and missing evidence.

### 4. Execute Implementation
- Implementation notes: added pure policy helper and health/debug wiring.

### 5. Verify and Test
- Validation performed: focused pytest commands and `git diff --check`.
- Result: pass.

### 6. Self-Review
- Simpler option considered: only changing docs/health strings.
- Technical debt introduced: no
- Scalability assessment: pure policy helper can be reused by scheduler reroute.
- Refinements made: kept raw payload exposure as `counts_only`.

### 7. Update Documentation and Knowledge
- Docs updated: yes
- Context updated: yes
- Learning journal updated: not applicable
