# Task

## Header
- ID: PRJ-837
- Title: Route Feedback Evidence Through Planning And Action
- Task Type: feature
- Current Stage: release
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-836
- Priority: P1
- Coverage Ledger Rows: not applicable
- Iteration: 837
- Operation Mode: ARCHITECT

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
`PRJ-835` added the contract and `PRJ-836` added the assessor. This task routes
structured behavior feedback through the existing planning/action boundary.

## Goal
Make high-confidence relation-backed behavior feedback become typed planning
intents while keeping low-confidence feedback descriptive-only.

## Scope
- `backend/app/agents/planning.py`
- `backend/app/core/graph_adapters.py`
- `backend/tests/test_planning_agent.py`
- `backend/tests/test_action_executor.py`
- `backend/tests/test_runtime_pipeline.py`
- `docs/architecture/16_agent_contracts.md`
- `docs/planning/behavior-feedback-learning-system-plan.md`
- `docs/planning/next-iteration-plan.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: behavior learning must not rely on action-layer raw text parsing.
- Expected product or reliability outcome: durable adaptation still flows through typed planning intent and action-owned persistence.
- How success will be observed: planning/action/runtime tests prove high-confidence routing and low-confidence non-routing.
- Post-launch learning needed: yes

## Deliverable For This Stage
Release-ready implementation evidence and source-of-truth updates.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Implementation Plan
1. Add `behavior_feedback` as a planning input.
2. Pass `perception.behavior_feedback` from graph adapters into planning.
3. Convert only confidence-gated relation-backed feedback into `MaintainRelationDomainIntent`.
4. Keep low-confidence/unknown feedback descriptive-only.
5. Add focused planning/action/runtime tests.
6. Update architecture and context evidence.

## Acceptance Criteria
- Durable writes still require typed planning intents.
- Relation persistence does not reparse raw text in action.
- Confidence thresholds are test-covered.
- Focused validation passes.

## Definition of Done
- [x] Planning consumes structured behavior feedback.
- [x] Action persists only typed relation intents.
- [x] Low-confidence feedback remains descriptive.
- [x] Tests and source-of-truth updates are complete.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval
- implicit stage skipping

## Validation Evidence
- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_planning_agent.py tests/test_action_executor.py tests/test_runtime_pipeline.py; Pop-Location`
  - Result: `236 passed`
- Manual checks:
  - Reviewed planning graph handoff and action persistence path.
- Screenshots/logs: not applicable
- High-risk checks:
  - Confirmed action does not parse raw event text for relation persistence.
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/architecture/16_agent_contracts.md`
  - `docs/planning/behavior-feedback-learning-system-plan.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates:
  - planning input now includes `behavior_feedback`

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
- Health-check impact: none
- Smoke steps updated: not required
- Rollback note: revert planning graph handoff and relation-intent helper; no migration required
- Observability or alerting impact: debug plan intents now show routed behavior-feedback relations
- Staged rollout or feature flag: not applicable

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
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
Only relation-backed behavior feedback is routed in this slice. Response style,
collaboration, and context-continuity feedback remain descriptive until their
approved persistence route is defined.

## Integration Evidence

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: users giving feedback that should shape later behavior
- Existing workaround or pain: relation writes were tied to raw-text boundary extraction.
- Smallest useful slice: planning consumes structured feedback and action persists typed intents.
- Success metric or signal: targeted tests prove routing and non-routing behavior.
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: scenario proof in `PRJ-840`

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: behavior feedback becomes learned relation truth
- SLI: not applicable
- SLO: not applicable
- Error budget posture: not applicable
- Health/readiness check: not applicable
- Logs, dashboard, or alert route: `system_debug.plan.domain_intents`
- Smoke command or manual smoke: focused pytest command above
- Rollback or disable path: revert helper and graph handoff

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: not applicable
- Endpoint and client contract match: not applicable
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: not applicable
- Regression check performed: focused backend tests

## AI Testing Evidence

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: current-turn behavior feedback and relation intent metadata
- Trust boundaries: no external access or new secret path
- Permission or ownership checks: action persists only typed domain intents
- Abuse cases: low-confidence/unknown feedback remains descriptive-only
- Secret handling: no secrets touched
- Security tests or scans: not applicable
- Fail-closed behavior: feedback without relation type/value is ignored by routing
- Residual risk: reflection accumulation is still future work

- `AI_TESTING_PROTOCOL.md` reviewed: yes
- Memory consistency scenarios: deferred to `PRJ-840`
- Multi-step context scenarios: deferred to `PRJ-840`
- Adversarial or role-break scenarios: low-confidence routing gate covered
- Prompt injection checks: no new model/tool execution path
- Data leakage and unauthorized access checks: no cross-user read/write path added
- Result: planning/action routing covered

## Result Report

- Task summary: routed structured behavior feedback through planning/action.
- Files changed:
  - `backend/app/agents/planning.py`
  - `backend/app/core/graph_adapters.py`
  - `backend/tests/test_planning_agent.py`
  - `backend/tests/test_action_executor.py`
  - `backend/tests/test_runtime_pipeline.py`
  - `docs/architecture/16_agent_contracts.md`
  - `docs/planning/behavior-feedback-learning-system-plan.md`
  - `docs/planning/next-iteration-plan.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested: `236 passed` via focused backend validation.
- What is incomplete: evidence accumulation and reflection consolidation remain queued.
- Next steps: `PRJ-838` Add Evidence Accumulation And Reflection Consolidation.
- Decisions made: route only relation-backed behavior feedback in this slice.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: planning did not yet accept structured behavior feedback.
- Gaps: low-confidence feedback needed explicit non-routing coverage.
- Inconsistencies: action relation persistence already used typed intents.
- Architecture constraints: action owns durable persistence.

### 2. Select One Priority Task
- Selected task: `PRJ-837`.
- Priority rationale: next sequential slice after assessor.
- Why other candidates were deferred: reflection accumulation depends on routed evidence.

### 3. Plan Implementation
- Files or surfaces to modify: planning, graph adapters, tests, architecture docs, context.
- Logic: confidence-gated conversion from structured feedback to relation intent.
- Edge cases: missing relation type/value and unclear polarity are ignored.

### 4. Execute Implementation
- Implementation notes: added routing helper and graph handoff.

### 5. Verify and Test
- Validation performed: `tests/test_planning_agent.py tests/test_action_executor.py tests/test_runtime_pipeline.py`.
- Result: `236 passed`.

### 6. Self-Review
- Simpler option considered: keep raw text extraction in planning only; rejected because the new contract needs structured stage handoff.
- Technical debt introduced: no
- Scalability assessment: sufficient for relation-backed feedback; non-relation targets stay descriptive pending approved route.
- Refinements made: fixed internal helper parameter wiring after first validation failure.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/architecture/16_agent_contracts.md`
  - `docs/planning/behavior-feedback-learning-system-plan.md`
  - `docs/planning/next-iteration-plan.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
