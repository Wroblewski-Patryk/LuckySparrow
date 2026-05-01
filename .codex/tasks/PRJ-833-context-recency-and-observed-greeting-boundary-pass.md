# Task

## Header
- ID: PRJ-833
- Title: Context Recency And Natural Communication Feedback Boundary Pass
- Task Type: fix
- Current Stage: verification
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-778
- Priority: P1

## Context
The user observed that Aviary/AION can greet on every message and may not
understand that only a few minutes passed between turns. The existing
communication-boundary repair already persists explicit user directives such
as "do not greet every message" and expression strips repeated greeting
openings when that relation is active.

## Goal
Close the remaining small behavior gap by making natural observational
communication feedback promote the same existing communication-boundary
relations and by giving context construction a bounded recency hint when loaded
memory has timestamps.

## Scope
- `backend/app/communication/boundary.py`
- `backend/app/agents/context.py`
- `backend/tests/test_communication_boundary.py`
- `backend/tests/test_context_agent.py`
- `backend/tests/test_planning_agent.py`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `docs/implementation/runtime-reality.md`

## Implementation Plan
1. Extend the existing communication-boundary phrase set for repeated-greeting
   observational feedback.
2. Add a context-summary recency hint derived from the latest timestamp in
   already-loaded recent memory.
3. Add focused tests for extraction, planning intent persistence, and context
   recency summary.
4. Run focused backend validation and diff hygiene checks.
5. Sync source-of-truth docs/context.

## Acceptance Criteria
- Observational Polish feedback like "osobowość za kążdą wiadomością się
  wita" emits `interaction_ritual_preference=avoid_repeated_greeting`.
- Loose feedback such as "zawsze zaczyna od hej" and "pisze do mnie zbyt
  często" can emit the same existing interaction/cadence relation families
  without requiring imperative phrasing.
- Planning persists those observations through the existing `maintain_relation`
  intent path.
- Context summary states the approximate gap from the latest remembered turn
  when timestamped recent memory is available and recent.
- No new memory subsystem, workaround path, or duplicated relation owner is
  introduced.

## Success Signal
- User or operator problem: repeated greetings feel like loss of conversational
  continuity.
- Expected product or reliability outcome: the runtime better treats recent
  messages as one ongoing conversation and promotes observed greeting friction
  into the existing relation model.
- How success will be observed: focused unit tests pass and debug/context
  summaries contain the new recency clue.
- Post-launch learning needed: yes

## Deliverable For This Stage
Verified implementation plus source-of-truth sync.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Definition of Done
- [x] Natural communication observations route through the existing
  communication-boundary relation model.
- [x] Recent-memory timestamps produce a bounded short-term recency hint in
  context.
- [x] Focused tests pass.
- [x] Docs and context are synchronized.

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
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_communication_boundary.py tests/test_context_agent.py tests/test_planning_agent.py -k "greeting or recency or communication_boundary"; Pop-Location`
    - `8 passed, 128 deselected`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_communication_boundary.py tests/test_context_agent.py tests/test_planning_agent.py; Pop-Location`
    - `139 passed`
- Manual checks:
  - reviewed architecture contract for expression interaction-ritual relations
  - reviewed existing `PRJ-778` communication-boundary repair
- Screenshots/logs: not applicable
- High-risk checks:
  - no new durable table, scheduler path, or expression-side relation mutation

## Architecture Evidence
- Architecture source reviewed:
  - `docs/architecture/15_runtime_flow.md`
  - `docs/architecture/16_agent_contracts.md`
  - `docs/architecture/29_runtime_behavior_testing.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: not required

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: not required
- Rollback note: revert this slice to remove the extra phrase recognition and
  recency summary.
- Observability or alerting impact: debug/context summaries become more
  explanatory for short-gap conversation turns.
- Staged rollout or feature flag: not applicable

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: first-party chat and linked-channel users
- Existing workaround or pain: user must explicitly phrase "do not greet every
  message" instead of giving natural observational feedback.
- Smallest useful slice: phrase recognition plus context recency hint.
- Success metric or signal: fewer repeated greeting openings after
  observational feedback; better debug explanation of short conversation gaps.
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: observe future chat/debug traces for
  greeting recurrence after the relation is persisted.

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: conversation continuity
- SLI: not applicable
- SLO: not applicable
- Error budget posture: not applicable
- Health/readiness check: not applicable
- Logs, dashboard, or alert route: system debug/context summary
- Smoke command or manual smoke: focused pytest command above
- Rollback or disable path: revert PRJ-833 files

## Integration Evidence
- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: yes
- Endpoint and client contract match: not applicable
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: relation persistence path is unchanged
- Regression check performed: focused backend tests

## AI Testing Evidence
- `AI_TESTING_PROTOCOL.md` reviewed: not applicable for this bounded heuristic
  and context-summary change.
- Memory consistency scenarios: timestamped recent memory influences context
  summary.
- Multi-step context scenarios: observational feedback can become durable
  relation intent for later expression.
- Adversarial or role-break scenarios: not applicable
- Prompt injection checks: no external content or instruction execution added
- Data leakage and unauthorized access checks: no new data surface beyond
  already-loaded memory timestamps
- Result: passed focused regression path

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: already-loaded user conversation metadata
- Trust boundaries: no external provider or permission boundary changed
- Permission or ownership checks: action remains relation-write owner
- Abuse cases: malformed timestamps are ignored fail-closed
- Secret handling: none
- Security tests or scans: not applicable
- Fail-closed behavior: invalid, future, or old timestamps produce no recency
  hint
- Residual risk: phrase detection is still pattern-based and may need future
  expansion from real traces

## Review Checklist
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

## Result Report
- Task summary: Natural repeated-greeting and excessive-contact feedback now
  routes into existing communication-boundary relations, and context summaries
  now include a bounded short-term recency hint from loaded recent-memory
  timestamps.
- Files changed:
  - `backend/app/communication/boundary.py`
  - `backend/app/agents/context.py`
  - `backend/tests/test_communication_boundary.py`
  - `backend/tests/test_context_agent.py`
  - `backend/tests/test_planning_agent.py`
  - `.codex/tasks/PRJ-833-context-recency-and-observed-greeting-boundary-pass.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/context/LEARNING_JOURNAL.md`
  - `docs/implementation/runtime-reality.md`
- How tested:
  - `8 passed, 128 deselected` focused backend tests
  - `139 passed` full communication/context/planning regression slice
- What is incomplete:
  - no live production chat trace was replayed in this slice
- Next steps:
  - replay or inspect a real multi-turn chat where the user gives this
    observational feedback, then confirm later expression avoids greeting
    openings after relation persistence.
- Decisions made:
  - reused relation/context owners instead of adding a parallel short-term
    memory store.
