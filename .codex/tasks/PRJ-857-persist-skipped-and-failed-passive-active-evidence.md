# Task

## Header
- ID: PRJ-857
- Title: Persist Skipped And Failed Passive/Active Evidence
- Task Type: feature
- Current Stage: verification
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-856
- Priority: P0
- Coverage Ledger Rows: not applicable
- Iteration: 857
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
`PRJ-856` made proactive cadence no-op when observer admission finds no due/actionable work. This task preserves evidence for observer-admitted work that is skipped, delayed, blocked, or fails so learning can happen later without user-visible failure chatter.

## Goal
Persist bounded passive/active execution evidence through existing scheduler cadence evidence.

## Success Signal
- User or operator problem: failures should teach the system without spamming the user.
- Expected product or reliability outcome: blocked/skipped/failed due work remains inspectable as structured evidence.
- How success will be observed: proactive cadence summaries include `passive_active_evidence` and `passive_active_evidence_count`.
- Post-launch learning needed: yes

## Deliverable For This Stage
Scheduler-generated passive/active evidence, persistence proof, docs, and context updates.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it
- do not expose raw provider payloads or require user-visible expression for failures

## Scope
- `backend/app/workers/scheduler.py`
- `backend/tests/test_scheduler_worker.py`
- `backend/tests/test_memory_repository.py`
- `docs/architecture/17_logging_and_debugging.md`
- `docs/implementation/runtime-reality.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `.codex/tasks/PRJ-857-persist-skipped-and-failed-passive-active-evidence.md`

## Implementation Plan
1. Add bounded evidence objects for skipped, delayed, blocked, and failed planned-work observer paths.
2. Attach evidence to proactive cadence summaries.
3. Persist evidence through the existing scheduler cadence evidence contract store.
4. Add scheduler and repository regression tests.
5. Update logging/debugging and runtime reality docs.
6. Update task board and project state.
7. Run focused action/reflection/memory/scheduler validation.

## Acceptance Criteria
- [x] Failed admitted work leaves durable scheduler evidence.
- [x] Expression silence does not erase action/scheduler evidence.
- [x] Repeated blocked outreach has structured metadata for future reflection learning.
- [x] No raw provider payloads are persisted.
- [x] Focused validation passes.

## Definition of Done
- [x] DEFINITION_OF_DONE.md posture is satisfied for this evidence slice.
- [x] Code, tests, docs, task board, and project state are updated.
- [x] Validation evidence is attached.
- [x] No unrelated dirty worktree changes are staged.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- direct background delivery
- schema changes
- raw provider payload persistence
- user-visible failure spam
- unrelated UI/context staging

## Validation Evidence
- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_scheduler_worker.py tests/test_memory_repository.py -k "passive_active or scheduler_cadence_evidence or proactive"; Pop-Location`
  - result: `9 passed, 76 deselected`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_action_executor.py tests/test_reflection_worker.py tests/test_memory_repository.py tests/test_scheduler_worker.py; Pop-Location`
  - result: `182 passed`
  - `git diff --check`
  - result: passed
- Manual checks: diff review confirms evidence contains metadata only.
- Screenshots/logs: not applicable.
- High-risk checks: `expression_visible=false` is preserved for blocked/skipped/failure evidence.
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/architecture/17_logging_and_debugging.md`
  - `docs/planning/passive-active-trigger-implementation-plan.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: `PRJ-853`
- Follow-up architecture doc updates: logging/debugging evidence note updated.

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
- Health-check impact: scheduler/proactive summaries can include passive-active evidence metadata.
- Smoke steps updated: future `PRJ-859`
- Rollback note: revert evidence fields; behavior from `PRJ-856` remains separately revertible.
- Observability or alerting impact: cadence evidence now includes bounded failure/skipped metadata.
- Staged rollout or feature flag: `PROACTIVE_ENABLED=false` remains outreach rollback.

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
- [x] Learning journal update remains lane-level work for `PRJ-859`.

## Notes
Reflection consumption scenarios remain `PRJ-858`; this task persists evidence through the existing cadence evidence store.

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
- User or operator affected: user should not receive failure chatter.
- Existing workaround or pain: failures could be invisible unless they surfaced as user-facing chatter.
- Smallest useful slice: metadata-only scheduler cadence evidence.
- Success metric or signal: passive-active evidence count is persisted.
- Feature flag, staged rollout, or disable path: `PROACTIVE_ENABLED=false`
- Post-launch feedback or metric check: repeated blocked/skipped outcomes.

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: due planned-work outreach.
- SLI: blocked/skipped/failed observer-admitted work has durable metadata.
- SLO: not defined in this slice.
- Error budget posture: not applicable
- Health/readiness check: scheduler cadence evidence and proactive summaries.
- Logs, dashboard, or alert route: scheduler evidence only.
- Smoke command or manual smoke: focused pytest.
- Rollback or disable path: revert fields or disable proactive outreach.

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: scheduler cadence evidence store.
- Endpoint and client contract match: not applicable
- DB schema and migrations verified: no schema change.
- Loading state verified: not applicable
- Error state verified: metadata evidence for blocked/failed paths.
- Refresh/restart behavior verified: repository persistence test.
- Regression check performed: scheduler/memory/action/reflection tests.

## AI Testing Evidence

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: metadata-only operational evidence.
- Trust boundaries: background evidence is not user-visible expression.
- Permission or ownership checks: no provider payloads added.
- Abuse cases: failure chatter or private payload leakage.
- Secret handling: no secrets touched.
- Security tests or scans: not applicable
- Fail-closed behavior: blocked/failed work records evidence with `expression_visible=false`.
- Residual risk: scenario-level proof remains `PRJ-858`.

- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios: future `PRJ-858`
- Multi-step context scenarios: future `PRJ-858`
- Adversarial or role-break scenarios: future hardening
- Prompt injection checks: not applicable
- Data leakage and unauthorized access checks: evidence shape is metadata-only.
- Result: pass

## Result Report

- Task summary: persisted passive-active skipped/blocked/failed evidence through scheduler cadence evidence.
- Files changed:
  - `backend/app/workers/scheduler.py`
  - `backend/tests/test_scheduler_worker.py`
  - `backend/tests/test_memory_repository.py`
  - `docs/architecture/17_logging_and_debugging.md`
  - `docs/implementation/runtime-reality.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/tasks/PRJ-857-persist-skipped-and-failed-passive-active-evidence.md`
- How tested: focused evidence tests, action/reflection/memory/scheduler
  suite, and `git diff --check`.
- What is incomplete: behavior scenarios remain `PRJ-858`.
- Next steps: `PRJ-858`.
- Decisions made: use existing scheduler cadence evidence store instead of a new table.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: skipped/blocked/failed observer work had counts but not bounded learning metadata.
- Gaps: evidence did not explicitly state expression visibility.
- Inconsistencies: passive/active architecture expects silent failure learning.
- Architecture constraints: no direct background delivery or new store.

### 2. Select One Priority Task
- Selected task: `PRJ-857`
- Priority rationale: evidence must exist before scenario-level behavior proof.
- Why other candidates were deferred: scenarios and smoke belong to later tasks.

### 3. Plan Implementation
- Files or surfaces to modify: scheduler evidence, repository persistence test, docs/context.
- Logic: append bounded metadata evidence for skipped/delayed/blocked/failed planned-work paths.
- Edge cases: runtime unavailable, foreground not required, quiet hours, action noop/fail.

### 4. Execute Implementation
- Implementation notes: reused scheduler cadence evidence store.

### 5. Verify and Test
- Validation performed: focused evidence tests, action/reflection/memory/scheduler suite, and `git diff --check`.
- Result: pass.

### 6. Self-Review
- Simpler option considered: only increasing failure counters.
- Technical debt introduced: no
- Scalability assessment: evidence list is bounded to 8 entries per tick.
- Refinements made: sanitized reason text and avoided raw summary/provider payloads.

### 7. Update Documentation and Knowledge
- Docs updated: yes
- Context updated: yes
- Learning journal updated: deferred to `PRJ-859`.
