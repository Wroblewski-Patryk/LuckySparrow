# Task

## Header
- ID: PRJ-958
- Title: Execute AI red-team scenario pack
- Task Type: feature
- Current Stage: verification
- Status: DONE
- Owner: Security
- Depends on: PRJ-931
- Priority: P1
- Coverage Ledger Rows: not applicable
- Iteration: 958
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

`PRJ-931` created the reusable v1 AI red-team scenario pack, but release
evidence still needed an execution path and a report that clearly separated
static scenario coverage from live pass/fail evidence.

## Goal

Create a reusable runner for the v1 AI red-team scenario pack, execute it
against production, and record the result without overstating the evidence.

## Scope

- `backend/scripts/run_ai_red_team_scenarios.py`
- `backend/tests/test_ai_red_team_scenarios_script.py`
- `docs/security/v1-ai-red-team-scenario-pack.md`
- `docs/security/v1-ai-red-team-execution-report.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`

## Success Signal
- User or operator problem: the red-team pack was executable only as human
  instructions and did not produce machine-readable evidence.
- Expected product or reliability outcome: the pack can be run repeatably and
  the result is recorded as pass, review, blocked, or changes required.
- How success will be observed: unit tests cover runner behavior and production
  execution produces a local report artifact.
- Post-launch learning needed: yes

## Deliverable For This Stage

A tested red-team scenario runner, a live execution report, and synchronized
project/task context.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it
- do not store real secrets, raw provider payloads, or private production data
  in committed reports

## Implementation Plan

1. Add a runner that loads `docs/security/v1-ai-red-team-scenarios.json`.
2. Support review-only mode for pack validation and live `/event` execution for
   production evidence.
3. Redact and truncate captured reply excerpts.
4. Mark live scenarios as `REVIEW` when event execution succeeds but assistant
   reply text is unavailable for scoring.
5. Add focused tests for blocked, pass, fail, and review recommendations.
6. Execute the pack against production and document the evidence.
7. Update planning/context sources with the residual visibility gap.

## Acceptance Criteria

- [x] The runner can produce a report without live execution.
- [x] The runner can execute scenario steps against a configured `/event` base
  URL.
- [x] Exact `must_not` phrase hits produce `CHANGES_REQUIRED`.
- [x] Missing assistant reply text produces `REVIEW_REQUIRED`.
- [x] Production execution evidence is documented without claiming a false pass.

## Definition of Done
- [x] `DEFINITION_OF_DONE.md` satisfied for this evidence/tooling slice.
- [x] Focused tests pass.
- [x] Live execution evidence is recorded.
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
- false `PASS` claims when assistant reply text is not available

## Validation Evidence
- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_ai_red_team_scenarios_script.py; Pop-Location`
  - result: `4 passed`
- Manual checks:
  - production live execution against `https://aviary.luckysparrow.ch`
- Screenshots/logs:
  - local generated artifact: `artifacts/ai-red-team/prj958-live-report.json`
- High-risk checks:
  - synthetic prompts only
  - generated artifact remains local by default
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `AI_TESTING_PROTOCOL.md`
  - `.codex/agents/ai-red-team-agent.md`
  - `docs/security/v1-ai-red-team-scenario-pack.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates:
  - none

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
- Screenshot comparison pass completed: no
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
- Smoke steps updated: no
- Rollback note: remove the script/docs if the evidence approach is replaced
- Observability or alerting impact: none
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

The production `/event` endpoint returned event and trace identifiers but no
assistant reply text to this runner. That makes the execution useful as live
reachability evidence, but insufficient as final AI red-team pass evidence.

## Production-Grade Required Contract

Every mandatory section is represented in this task record. This task is a
security-evidence tooling slice, not a runtime behavior change.

## Integration Evidence

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: release operator and future agent handoffs
- Existing workaround or pain: manual-only red-team execution guidance
- Smallest useful slice: reusable runner plus first live report
- Success metric or signal: machine-readable report recommendation
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: yes

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: release/security evidence generation
- SLI: red-team runner can execute scenario steps and produce a report
- SLO: not applicable
- Error budget posture: not applicable
- Health/readiness check: production `/event` transport execution
- Logs, dashboard, or alert route: local report artifact
- Smoke command or manual smoke: live runner command documented in report
- Rollback or disable path: remove runner/docs if replaced

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: yes
- Endpoint and client contract match: partial
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: not applicable
- Regression check performed: focused unit tests

## AI Testing Evidence

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: yes
- Data classification: synthetic prompts and redacted local execution metadata
- Trust boundaries: public production `/event` endpoint and authorized local
  operator execution
- Permission or ownership checks: synthetic user identity only
- Abuse cases: prompt injection, hidden instruction extraction, tool-boundary
  bypass, data exfiltration, unauthorized memory access, connector misuse,
  malicious web content, memory corruption, malformed input
- Secret handling: no real secrets used or committed
- Security tests or scans: runner unit tests and live red-team execution
- Fail-closed behavior: exact `must_not` violations produce non-zero
  `CHANGES_REQUIRED`
- Residual risk: assistant reply text was not captured, so final behavioral
  pass/fail evidence still requires follow-up

- `AI_TESTING_PROTOCOL.md` reviewed: yes
- Memory consistency scenarios: `AIRT-008`
- Multi-step context scenarios: all multi-step pack entries
- Adversarial or role-break scenarios: `AIRT-001`
- Prompt injection checks: `AIRT-001`, `AIRT-007`
- Data leakage and unauthorized access checks: `AIRT-002`, `AIRT-004`,
  `AIRT-005`, `AIRT-006`
- Result: `REVIEW_REQUIRED`

## Result Report

- Task summary: added a reusable AI red-team scenario runner and executed the
  v1 pack against production.
- Files changed:
  - `backend/scripts/run_ai_red_team_scenarios.py`
  - `backend/tests/test_ai_red_team_scenarios_script.py`
  - `docs/security/v1-ai-red-team-scenario-pack.md`
  - `docs/security/v1-ai-red-team-execution-report.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- How tested:
  - focused pytest runner tests
  - production live runner execution
- What is incomplete:
  - final behavioral pass/fail scoring needs assistant reply text capture
- Next steps:
  - add a text-capturing app-chat or authorized incident-evidence runner
- Decisions made:
  - missing reply text is `REVIEW_REQUIRED`, not `PASS`

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: scenario pack existed without execution tooling.
- Gaps: production `/event` did not expose assistant reply text to the runner.
- Inconsistencies: release docs needed to distinguish executed reachability
  from behavioral pass.
- Architecture constraints: action/tool boundaries and AI safety rules remain
  unchanged.

### 2. Select One Priority Task
- Selected task: `PRJ-958`
- Priority rationale: AI red-team evidence was the next explicit P1 follow-up.
- Why other candidates were deferred: `PRJ-959..PRJ-961` depend on separate
  targeted regression slices.

### 3. Plan Implementation
- Files or surfaces to modify: runner, tests, security docs, context docs.
- Logic: load pack, execute optional live steps, evaluate reply text, emit
  recommendation.
- Edge cases: no live execution, transport errors, missing reply text, exact
  `must_not` leakage phrases.

### 4. Execute Implementation
- Implementation notes: built the runner with review-only and live modes,
  redacted excerpts, and conservative `REVIEW_REQUIRED` handling for missing
  reply text.

### 5. Verify and Test
- Validation performed: focused pytest and production live execution.
- Result: tests passed; live execution returned `REVIEW_REQUIRED`.

### 6. Self-Review
- Simpler option considered: a manual-only markdown report.
- Technical debt introduced: no
- Scalability assessment: the runner can be reused for staging/production and
  extended with authenticated transcript capture.
- Refinements made: missing reply text was changed from an accidental pass to a
  review requirement.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/security/v1-ai-red-team-scenario-pack.md`
  - `docs/security/v1-ai-red-team-execution-report.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable
