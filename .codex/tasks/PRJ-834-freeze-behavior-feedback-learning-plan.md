# Task

## Header
- ID: PRJ-834
- Title: Freeze Behavior Feedback Learning Plan
- Task Type: planning
- Current Stage: planning
- Status: DONE
- Owner: Planning Agent
- Depends on: PRJ-833
- Priority: P1

## Context
The user approved the direction that Aviary should learn from natural feedback
about its own behavior rather than only from rigid commands. `PRJ-833` already
made the repeated-greeting and excessive-contact feedback path less command-
bound, but the broader learning loop still needs an execution-ready plan.

## Goal
Create a concrete implementation plan for a behavior-feedback learning lane
that an execution agent can follow without reopening the architecture analysis.

## Scope
- `docs/planning/behavior-feedback-learning-system-plan.md`
- `.codex/tasks/PRJ-834-freeze-behavior-feedback-learning-plan.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `docs/planning/next-iteration-plan.md`

## Implementation Plan
1. Record current implemented learning foundations and remaining gaps.
2. Define the target feedback-learning loop using existing runtime owners.
3. Split implementation into bounded follow-up tasks.
4. Record acceptance criteria and validation commands for each slice.
5. Sync task board and project state.

## Acceptance Criteria
- The plan explicitly covers:
  - behavior-feedback interpretation contract
  - feedback assessor
  - planning/action persistence route
  - evidence accumulation and reflection consolidation
  - expression self-review
  - end-to-end behavior scenarios
  - docs/context closure
- The plan forbids parallel memory, expression-owned writes, and command-only
  parsing.
- The next execution task is clearly identified as `PRJ-835`.

## Success Signal
- User or operator problem: Aviary should learn from natural feedback instead
  of requiring exact commands.
- Expected product or reliability outcome: future implementation work can add
  this capability in small, verifiable slices.
- How success will be observed: execution agent can start `PRJ-835` directly
  from the recorded plan.
- Post-launch learning needed: yes

## Deliverable For This Stage
Planning artifacts only. No runtime implementation in this task.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Definition of Done
- [x] Planning document exists.
- [x] Follow-up implementation queue is explicit.
- [x] Task board and project state are synchronized.
- [x] No implementation code is mixed into this planning task.

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
  - not run; planning/docs-only task
- Manual checks:
  - reviewed `PRJ-833` result and current architecture/runtime ownership
- Screenshots/logs:
  - not applicable
- High-risk checks:
  - plan preserves planning -> action as the durable mutation boundary

## Architecture Evidence
- Architecture source reviewed:
  - `docs/architecture/15_runtime_flow.md`
  - `docs/architecture/16_agent_contracts.md`
  - `docs/architecture/29_runtime_behavior_testing.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates:
  - planned in `PRJ-835` if the contract surface is widened

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: not applicable
- Rollback note: revert planning files if this queue is superseded
- Observability or alerting impact: planned future debug visibility in `PRJ-835`
- Staged rollout or feature flag: not applicable

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: conversation users who give natural behavioral
  feedback
- Existing workaround or pain: user must phrase feedback as a command for some
  behavior changes to be learned reliably
- Smallest useful slice: contract and debug visibility in `PRJ-835`
- Success metric or signal: later behavior changes after natural feedback are
  explainable through system debug and tests
- Feature flag, staged rollout, or disable path: not applicable in planning
- Post-launch feedback or metric check: inspect real chat traces for behavior
  feedback that was missed by deterministic rules

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: conversation continuity and learned behavior
- SLI: not applicable
- SLO: not applicable
- Error budget posture: not applicable
- Health/readiness check: planned future debug evidence
- Logs, dashboard, or alert route: planned future system-debug fields
- Smoke command or manual smoke: not applicable
- Rollback or disable path: planning rollback only

## Integration Evidence
- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: not applicable
- Endpoint and client contract match: not applicable
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: not applicable
- Regression check performed: planning review

## AI Testing Evidence
- `AI_TESTING_PROTOCOL.md` reviewed: not applicable for planning only
- Memory consistency scenarios:
  - planned in `PRJ-840`
- Multi-step context scenarios:
  - planned in `PRJ-840`
- Adversarial or role-break scenarios:
  - planned negative scenario in `PRJ-840`
- Prompt injection checks:
  - planned if an LLM-assisted assessor is added in `PRJ-836`
- Data leakage and unauthorized access checks:
  - no new data access in planning
- Result:
  - planning complete

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: user-authored conversational feedback
- Trust boundaries: no new boundary in planning
- Permission or ownership checks: future writes remain action-owned
- Abuse cases: overfitting one ambiguous comment is listed as a forbidden
  implementation outcome
- Secret handling: none
- Security tests or scans: not applicable
- Fail-closed behavior: planned low-confidence descriptive-only posture
- Residual risk: implementation must keep interpretation confidence-gated

## Review Checklist
- [x] Current stage is declared and respected.
- [x] Deliverable for the current stage is complete.
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run or marked not applicable.
- [x] Docs or context were updated if repository truth changed.
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Result Report
- Task summary:
  - froze the behavior-feedback learning execution plan and follow-up queue
- Files changed:
  - `docs/planning/behavior-feedback-learning-system-plan.md`
  - `.codex/tasks/PRJ-834-freeze-behavior-feedback-learning-plan.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `docs/planning/next-iteration-plan.md`
- How tested:
  - planning/docs-only; no automated tests run
- What is incomplete:
  - implementation begins at `PRJ-835`
- Next steps:
  - execute `PRJ-835 - Add Behavior Feedback Interpretation Contract`
- Decisions made:
  - keep durable behavior learning inside existing perception/context,
    planning, action, memory, reflection, and expression owners
