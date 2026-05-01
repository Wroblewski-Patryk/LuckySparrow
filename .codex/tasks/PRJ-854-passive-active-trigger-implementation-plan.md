# Task

## Header
- ID: PRJ-854
- Title: Detail Passive/Active Trigger Implementation Plan
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Planning Agent
- Depends on: PRJ-853
- Priority: P0
- Coverage Ledger Rows: not applicable
- Iteration: 854
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
`PRJ-853` froze the passive/active architecture contract. The user then asked for a detailed implementation plan based on the full conversation, with the plan written into repository files and committed.

## Goal
Create a concrete file-by-file implementation plan for the passive/active runtime trigger lane, including observer policy, proactive cadence routing, failure evidence, behavior scenarios, ops visibility, validation commands, and rollout order.

## Success Signal
- User or operator problem: the next implementation agent can execute the passive/active trigger lane without reopening the architectural question.
- Expected product or reliability outcome: proactive/care behavior becomes observer-gated and learning-friendly rather than time-passing-driven.
- How success will be observed: `docs/planning/passive-active-trigger-implementation-plan.md` defines tasks, files, acceptance criteria, validations, non-goals, and rollout.
- Post-launch learning needed: yes

## Deliverable For This Stage
Detailed implementation plan only. No runtime code changes.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it
- avoid committing unrelated dirty worktree changes

## Scope
- `docs/planning/passive-active-trigger-implementation-plan.md`
- `docs/planning/next-iteration-plan.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `.codex/tasks/PRJ-854-passive-active-trigger-implementation-plan.md`

## Implementation Plan
1. Inspect existing scheduler, proactive, planned-work, proposal, and test surfaces.
2. Write a detailed implementation plan that reuses those existing owners.
3. Seed the implementation queue as `PRJ-855..PRJ-860`.
4. Sync task board and project state.
5. Validate docs diff with `git diff --check`.
6. Commit only this planning slice.

## Acceptance Criteria
- [x] Plan identifies concrete backend files to modify.
- [x] Plan identifies concrete tests and validation commands.
- [x] Plan keeps passive external planning separate from internal foreground execution.
- [x] Plan preserves relationship-based care without hard-coded contact obligations.
- [x] Plan includes rollout, rollback, non-goals, and Definition of Done.

## Definition of Done
- [x] DEFINITION_OF_DONE.md posture is satisfied for a docs-only planning task.
- [x] Detailed plan exists in `docs/planning/`.
- [x] Task board and project state are updated.
- [x] Validation evidence is attached.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- runtime code changes
- new scheduler/reminder subsystem
- background direct delivery
- hard-coded contact duties
- staging unrelated UI/context artifacts

## Validation Evidence
- Tests: not applicable; docs-only planning slice.
- Manual checks: inspected existing scheduler/proactive/planned-work/proposal/test surfaces.
- Screenshots/logs: not applicable.
- High-risk checks: commit scope must exclude unrelated `web/*`, `PRJ-851`, `PRJ-852`, and `artifacts/`.
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/architecture/02_architecture.md`
  - `docs/architecture/15_runtime_flow.md`
  - `docs/architecture/16_agent_contracts.md`
  - `docs/architecture/23_proactive_system.md`
- Fits approved architecture: yes
- Mismatch discovered: yes
- Decision required from user: no
- Approval reference if architecture changed: `PRJ-853`
- Follow-up architecture doc updates: none in this planning slice

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
- Health-check impact: future `PRJ-855`
- Smoke steps updated: future `PRJ-859`
- Rollback note: revert docs-only plan; runtime unchanged
- Observability or alerting impact: future observer posture
- Staged rollout or feature flag: future implementation keeps `PROACTIVE_ENABLED=false` as rollback

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
This task deliberately does not implement `PRJ-855`; it gives the next execution step a narrow and testable runway.

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
- Existing workaround or pain: asking AION not to message repeatedly was not enough while cadence could still drive outreach
- Smallest useful slice: detailed implementation plan
- Success metric or signal: next implementation tasks are file-scoped and validation-scoped
- Feature flag, staged rollout, or disable path: yes
- Post-launch feedback or metric check: future observer no-op/admission evidence

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: proactive outreach and planned-work follow-up
- SLI: future observer no-op versus due handoff counts
- SLO: future implementation decision
- Error budget posture: not applicable
- Health/readiness check: planned in `PRJ-855`
- Logs, dashboard, or alert route: planned in `PRJ-859`
- Smoke command or manual smoke: planned in `PRJ-859`
- Rollback or disable path: `PROACTIVE_ENABLED=false`

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: not applicable
- Endpoint and client contract match: not applicable
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: not applicable
- Regression check performed: docs diff validation

## AI Testing Evidence

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: docs only
- Trust boundaries: background remains passive; action remains side-effect owner
- Permission or ownership checks: no code changed
- Abuse cases: unwanted scheduler-driven outreach
- Secret handling: no secrets touched
- Security tests or scans: not applicable
- Fail-closed behavior: planned no-op when observer finds no due/actionable item
- Residual risk: runtime implementation remains pending

- `AI_TESTING_PROTOCOL.md` reviewed: not applicable for planning slice
- Memory consistency scenarios: planned in `PRJ-858`
- Multi-step context scenarios: planned in `PRJ-858`
- Adversarial or role-break scenarios: future implementation hardening
- Prompt injection checks: not applicable
- Data leakage and unauthorized access checks: not applicable
- Result: planning-only

## Result Report

- Task summary: created a detailed file-level implementation plan for observer-gated passive/active triggers.
- Files changed:
  - `docs/planning/passive-active-trigger-implementation-plan.md`
  - `docs/planning/next-iteration-plan.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/tasks/PRJ-854-passive-active-trigger-implementation-plan.md`
- How tested: `git diff --check`
- What is incomplete: runtime implementation is intentionally deferred.
- Next steps: execute `PRJ-855` observer policy and diagnostics.
- Decisions made: detailed implementation queue is `PRJ-855..PRJ-860`.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: architecture is frozen, but implementation plan needed file-level detail.
- Gaps: no execution-ready queue beyond the high-level `PRJ-853` follow-up.
- Inconsistencies: current runtime still has generic proactive cadence path.
- Architecture constraints: passive loops cannot directly wake conscious outreach.

### 2. Select One Priority Task
- Selected task: `PRJ-854`
- Priority rationale: implementation without a detailed plan risks reintroducing scheduler drift.
- Why other candidates were deferred: code changes should start after the plan is explicit.

### 3. Plan Implementation
- Files or surfaces to modify: planning docs, task board, project state, task file.
- Logic: convert the conversation and `PRJ-853` contract into a detailed queue.
- Edge cases: preserve relational care without hard-coded contact cadence.

### 4. Execute Implementation
- Implementation notes: wrote a docs-only implementation plan.

### 5. Verify and Test
- Validation performed: `git diff --check`
- Result: pass

### 6. Self-Review
- Simpler option considered: jump directly into `scheduler.py`.
- Technical debt introduced: no
- Scalability assessment: file-level queue reduces implementation ambiguity.
- Refinements made: shifted implementation task numbering to `PRJ-855..PRJ-860`.

### 7. Update Documentation and Knowledge
- Docs updated: yes
- Context updated: yes
- Learning journal updated: not applicable
