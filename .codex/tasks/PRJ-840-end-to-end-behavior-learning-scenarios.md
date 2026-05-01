# Task

## Header
- ID: PRJ-840
- Title: Add End-To-End Behavior Learning Scenarios
- Task Type: feature
- Current Stage: release
- Status: DONE
- Owner: QA/Test
- Depends on: PRJ-839
- Priority: P1
- Coverage Ledger Rows: not applicable
- Iteration: 840
- Operation Mode: TESTER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
`PRJ-835..PRJ-839` implemented the behavior-feedback learning loop across
contract, assessor, planning/action routing, reflection accumulation, and
expression self-review. This task proves the loop through runtime scenarios.

## Goal
Prove behavior learning across time, not only isolated module output.

## Scope
- `backend/tests/test_runtime_pipeline.py`
- `docs/architecture/29_runtime_behavior_testing.md`
- `docs/planning/behavior-feedback-learning-system-plan.md`
- `docs/planning/next-iteration-plan.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: behavior learning must be demonstrable as a multi-turn runtime behavior.
- Expected product or reliability outcome: feedback changes later expression and repeated weak feedback consolidates.
- How success will be observed: behavior scenarios `T21.1..T21.3` pass.
- Post-launch learning needed: yes

## Deliverable For This Stage
Release-ready scenario evidence and source-of-truth sync.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Implementation Plan
1. Add scenario for repeated-greeting feedback becoming relation truth.
2. Verify a later generated greeting is removed by expression self-review.
3. Add scenario for repeated weak behavior-feedback evidence consolidating through reflection.
4. Add negative scenario for unclear feedback remaining descriptive-only.
5. Update behavior-testing docs and context.

## Acceptance Criteria
- Behavior is proven across time.
- `system_debug` evidence explains the interpreted feedback and plan route.
- No hidden state path appears.
- Focused validation passes.

## Definition of Done
- [x] Scenario `T21.1` proves later expression change.
- [x] Scenario `T21.2` proves reflection consolidation.
- [x] Scenario `T21.3` proves unclear feedback stays descriptive-only.
- [x] Docs/context are updated.

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
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_runtime_pipeline.py -k "behavior_learning_feedback_scenarios"; Pop-Location`
  - Result: `1 passed, 108 deselected`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_runtime_pipeline.py tests/test_communication_boundary.py tests/test_reflection_worker.py; Pop-Location`
  - Result: `174 passed`
- Manual checks:
  - Reviewed scenario notes and source-of-truth updates.
- Screenshots/logs: not applicable
- High-risk checks:
  - Negative unclear-feedback scenario proves no relation mutation.
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/architecture/29_runtime_behavior_testing.md`
  - `docs/planning/behavior-feedback-learning-system-plan.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates:
  - scenario anchors added to runtime behavior testing

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
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: not required
- Rollback note: revert scenario tests/docs only
- Observability or alerting impact: scenario anchors added
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
The first scenario uses the real runtime path with a test OpenAI client that
intentionally emits a greeting, proving expression self-review reacts to
learned relation truth rather than only to prompt compliance.

## Integration Evidence

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: users expecting behavior feedback to change later behavior
- Existing workaround or pain: module tests alone did not prove full loop behavior.
- Smallest useful slice: three behavior scenarios.
- Success metric or signal: `T21.1..T21.3` pass.
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: future live transcript proof

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: feedback changes future expression behavior
- SLI: not applicable
- SLO: not applicable
- Error budget posture: not applicable
- Health/readiness check: not applicable
- Logs, dashboard, or alert route: behavior validation scenario anchors
- Smoke command or manual smoke: focused pytest commands above
- Rollback or disable path: revert scenario tests/docs

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
- Data classification: user behavior feedback in test runtime memory
- Trust boundaries: no external providers or cross-user reads
- Permission or ownership checks: relation writes use existing action/reflection owners
- Abuse cases: unclear feedback cannot mutate relation truth
- Secret handling: no secrets touched
- Security tests or scans: not applicable
- Fail-closed behavior: negative scenario passes
- Residual risk: live production transcript proof remains future post-launch evidence

- `AI_TESTING_PROTOCOL.md` reviewed: yes
- Memory consistency scenarios: `T21.1` covers feedback persistence affecting a later turn.
- Multi-step context scenarios: `T21.1` covers multi-turn behavior change.
- Adversarial or role-break scenarios: `T21.3` covers unclear feedback non-mutation.
- Prompt injection checks: no new tool/model authority added.
- Data leakage and unauthorized access checks: no cross-user access added.
- Result: behavior-learning scenario proof passes.

## Result Report

- Task summary: added `T21.1..T21.3` end-to-end behavior-learning scenarios.
- Files changed:
  - `backend/tests/test_runtime_pipeline.py`
  - `docs/architecture/29_runtime_behavior_testing.md`
  - `docs/planning/behavior-feedback-learning-system-plan.md`
  - `docs/planning/next-iteration-plan.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested: `1 passed, 108 deselected`; `174 passed`.
- What is incomplete: final docs/ops/learning-journal closure remains queued.
- Next steps: `PRJ-841` Sync Runtime Docs, Ops Notes, And Learning Journal.
- Decisions made: scenario ids `T21.1..T21.3` anchor the behavior-feedback lane.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: behavior-feedback lane lacked scenario-level proof.
- Gaps: full loop needed runtime validation.
- Inconsistencies: none blocking.
- Architecture constraints: behavior proof must use existing runtime owners.

### 2. Select One Priority Task
- Selected task: `PRJ-840`.
- Priority rationale: next verification slice after expression self-review.
- Why other candidates were deferred: docs closure depends on scenario evidence.

### 3. Plan Implementation
- Files or surfaces to modify: runtime pipeline tests and behavior-testing docs.
- Logic: add three behavior scenarios.
- Edge cases: unclear feedback must not mutate relation state.

### 4. Execute Implementation
- Implementation notes: used existing behavior harness.

### 5. Verify and Test
- Validation performed: focused scenario and broader runtime/communication/reflection test set.
- Result: `1 passed, 108 deselected`; `174 passed`.

### 6. Self-Review
- Simpler option considered: only unit tests; rejected because acceptance requires behavior across time.
- Technical debt introduced: no
- Scalability assessment: scenario anchors are reusable for release/incident evidence.
- Refinements made: switched scenario repo to relation-capable fake memory so the later runtime loads learned truth.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/architecture/29_runtime_behavior_testing.md`
  - `docs/planning/behavior-feedback-learning-system-plan.md`
  - `docs/planning/next-iteration-plan.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
