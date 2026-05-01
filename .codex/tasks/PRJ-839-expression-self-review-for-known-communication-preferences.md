# Task

## Header
- ID: PRJ-839
- Title: Add Expression Self-Review For Known Communication Preferences
- Task Type: feature
- Current Stage: release
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-838
- Priority: P1
- Coverage Ledger Rows: not applicable
- Iteration: 839
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
The behavior-feedback lane can now interpret, route, persist, and consolidate
communication preferences. This task makes expression honor known preferences
with a bounded side-effect-free post-generation self-review.

## Goal
Prevent generated wording from violating known communication preferences while
keeping expression unable to mutate durable state.

## Scope
- `backend/app/core/contracts.py`
- `backend/app/expression/generator.py`
- `backend/app/integrations/openai/prompting.py`
- `backend/tests/test_expression_agent.py`
- `backend/tests/test_openai_prompting.py`
- `docs/planning/behavior-feedback-learning-system-plan.md`
- `docs/planning/next-iteration-plan.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: learned communication preferences must affect later wording.
- Expected product or reliability outcome: expression fixes narrow preference violations after generation.
- How success will be observed: focused tests prove greeting, formal-opening, and contact-cadence corrections.
- Post-launch learning needed: yes

## Deliverable For This Stage
Release-ready implementation evidence and source-of-truth sync.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Implementation Plan
1. Add debug-visible self-review notes to `ExpressionOutput`.
2. Extend expression post-generation review for repeated greetings.
3. Remove overly formal openings when concise/direct style is known.
4. Remove unsolicited future contact promises from scheduler replies when contact-cadence relations discourage them.
5. Strengthen OpenAI reply prompt guidance around contact cadence.
6. Add focused expression and prompting tests.

## Acceptance Criteria
- Expression does not write durable state.
- Known preferences are honored even if generated output drifts.
- Adjustments are narrow and test-covered.
- Focused validation passes.

## Definition of Done
- [x] Expression self-review is side-effect-free.
- [x] Debug-visible notes are present on adjusted outputs.
- [x] Repeated greeting, formal opening, and cadence-promise cases are covered.
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
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_expression_agent.py tests/test_openai_prompting.py; Pop-Location`
  - Result: `23 passed`
- Manual checks:
  - Reviewed expression self-review for side-effect-free operation.
- Screenshots/logs: not applicable
- High-risk checks:
  - Confirmed no memory/repository writes were added to expression.
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
- Follow-up architecture doc updates: none required beyond planning/context sync

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
- Rollback note: revert expression self-review and prompt guidance; no data migration required
- Observability or alerting impact: `ExpressionOutput.self_review_notes`
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
This slice adjusts only narrow, high-confidence wording patterns. It does not
add expression-owned persistence or broad rewriting.

## Integration Evidence

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: users whose learned communication preferences should be honored
- Existing workaround or pain: generated output could drift from known preference truth.
- Smallest useful slice: bounded post-generation sanitizer with debug notes.
- Success metric or signal: focused tests pass.
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: end-to-end behavior scenarios in `PRJ-840`

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: learned communication preferences shape later expression
- SLI: not applicable
- SLO: not applicable
- Error budget posture: not applicable
- Health/readiness check: not applicable
- Logs, dashboard, or alert route: expression self-review notes
- Smoke command or manual smoke: focused pytest command above
- Rollback or disable path: revert PRJ-839 files

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: not applicable
- Endpoint and client contract match: not applicable
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: not applicable
- Regression check performed: focused expression/prompt tests

## AI Testing Evidence

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: expression text and relation-derived preferences
- Trust boundaries: no external write or provider permission added
- Permission or ownership checks: expression remains side-effect-free
- Abuse cases: narrow sanitizer avoids broad hidden rewriting
- Secret handling: no secrets touched
- Security tests or scans: not applicable
- Fail-closed behavior: unchanged message if no known preference applies
- Residual risk: end-to-end multi-turn proof remains queued

- `AI_TESTING_PROTOCOL.md` reviewed: yes
- Memory consistency scenarios: deferred to `PRJ-840`
- Multi-step context scenarios: deferred to `PRJ-840`
- Adversarial or role-break scenarios: no new model/tool authority added
- Prompt injection checks: no new prompt execution authority added
- Data leakage and unauthorized access checks: no cross-user path added
- Result: expression self-review covered

## Result Report

- Task summary: added bounded expression self-review for known communication preferences.
- Files changed:
  - `backend/app/core/contracts.py`
  - `backend/app/expression/generator.py`
  - `backend/app/integrations/openai/prompting.py`
  - `backend/tests/test_expression_agent.py`
  - `backend/tests/test_openai_prompting.py`
  - `docs/planning/behavior-feedback-learning-system-plan.md`
  - `docs/planning/next-iteration-plan.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested: `23 passed`.
- What is incomplete: end-to-end behavior learning scenarios remain queued.
- Next steps: `PRJ-840` Add End-To-End Behavior Learning Scenarios.
- Decisions made: keep self-review narrow and side-effect-free.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: expression could drift from learned communication preferences.
- Gaps: self-review notes were absent.
- Inconsistencies: none blocking.
- Architecture constraints: expression must not write durable state.

### 2. Select One Priority Task
- Selected task: `PRJ-839`.
- Priority rationale: next queued slice after reflection accumulation.
- Why other candidates were deferred: scenario proof depends on expression honoring preferences.

### 3. Plan Implementation
- Files or surfaces to modify: expression output contract, generator, OpenAI prompt builder, tests, docs/context.
- Logic: narrow post-generation corrections with notes.
- Edge cases: no relation or style preference leaves output unchanged.

### 4. Execute Implementation
- Implementation notes: extended existing interaction-ritual sanitizer into a bounded self-review pass.

### 5. Verify and Test
- Validation performed: `tests/test_expression_agent.py tests/test_openai_prompting.py`.
- Result: `23 passed`.

### 6. Self-Review
- Simpler option considered: prompt-only guidance; rejected because acceptance requires honoring preferences even when output drifts.
- Technical debt introduced: no
- Scalability assessment: self-review is narrow and can be extended by future approved cases.
- Refinements made: corrected formal Polish opening stripping for `Patryku`.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/planning/behavior-feedback-learning-system-plan.md`
  - `docs/planning/next-iteration-plan.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
