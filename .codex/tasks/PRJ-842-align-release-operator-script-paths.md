# Task

## Header
- ID: PRJ-842
- Title: Align Release Operator Script Paths
- Task Type: release
- Current Stage: release
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-841
- Priority: P1
- Coverage Ledger Rows: not applicable
- Iteration: 842
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
After closing the behavior-feedback learning lane, the next v1 step was to
select a concrete release blocker. Source-of-truth docs still contained active
operator commands that referenced a missing root `scripts/` directory even
though the actual operator scripts live under `backend/scripts/`.

## Goal
Prevent release/deploy operators from copying stale root-script commands that
fail before smoke or behavior validation can run.

## Scope
- `docs/architecture/28_local_windows_and_coolify_deploy.md`
- `docs/engineering/testing.md`
- `docs/operations/runtime-ops-runbook.md`
- `docs/planning/behavior-feedback-learning-system-plan.md`
- `docs/planning/next-iteration-plan.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `.codex/context/LEARNING_JOURNAL.md`

## Success Signal
- User or operator problem: release commands should match the repository layout.
- Expected product or reliability outcome: deploy, smoke, and behavior-validation instructions are copy-pasteable from repo root.
- How success will be observed: active docs point to `backend/scripts/...` from repo root, while commands already inside `backend/` still use `.\scripts\...`.
- Post-launch learning needed: no

## Deliverable For This Stage
Release-ready docs/context update and validation evidence for operator script
paths.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Implementation Plan
1. Confirm the actual operator script location.
2. Update active canonical docs from root `scripts/` to `backend/scripts/`.
3. Preserve `.\scripts\...` commands only when the command first enters `backend/`.
4. Update project context and learning journal.
5. Validate with path scan, script-entrypoint tests, and diff hygiene.

## Acceptance Criteria
- Root-run PowerShell examples use `.\backend\scripts\...`.
- Root-run bash examples use `./backend/scripts/...`.
- Python helper examples use `.\backend\scripts\...` from repo root.
- Backend-working-directory examples still use `.\scripts\...`.
- Validation proves backend operator scripts expose help.

## Definition of Done
- [x] Canonical active docs are aligned to the real script paths.
- [x] Context and task board are updated.
- [x] Learning journal captures the path-drift guardrail.
- [x] Validation evidence is recorded.

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
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_deployment_trigger_scripts.py -k "backend_operator_scripts_expose_help"; Pop-Location`
  - Result: `8 passed, 42 deselected`
  - `git diff --check`
  - Result: pass
- Manual checks:
  - `Select-String` scan over active docs found no remaining root
    `.\scripts\...` or `./scripts/...` operator commands in the touched
    canonical docs, except backend-working-directory examples that intentionally
    run after `Push-Location .\backend`.
- Screenshots/logs: not applicable
- High-risk checks:
  - Verified backend-working-directory cleanup examples still use `.\scripts\...`.
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/architecture/28_local_windows_and_coolify_deploy.md`
  - `docs/operations/runtime-ops-runbook.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: operator path corrections only

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
- Smoke steps updated: yes, command paths now match repo layout
- Rollback note: revert docs/context path updates if root wrappers are later approved
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
Historical task records may still mention older command paths as archival
evidence. This task updates active canonical instructions and current context,
not historical validation transcripts.

## Integration Evidence

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: release/deploy operators and future Codex agents
- Existing workaround or pain: root `scripts/` commands fail because that directory is absent.
- Smallest useful slice: align active release and testing docs.
- Success metric or signal: command examples point to existing files.
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: no

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: deploy and release-smoke execution
- SLI: not applicable
- SLO: not applicable
- Error budget posture: not applicable
- Health/readiness check: not changed
- Logs, dashboard, or alert route: not changed
- Smoke command or manual smoke: script-entrypoint test and path scan
- Rollback or disable path: revert docs/context updates

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: not applicable
- Endpoint and client contract match: not applicable
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: not applicable
- Regression check performed: backend operator script entrypoint test

## AI Testing Evidence

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: documentation-only
- Trust boundaries: no runtime trust boundary changed
- Permission or ownership checks: not applicable
- Abuse cases: not applicable
- Secret handling: no secrets touched
- Security tests or scans: not applicable
- Fail-closed behavior: not applicable
- Residual risk: historical archive entries still show old commands by design

- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios: not applicable
- Multi-step context scenarios: not applicable
- Adversarial or role-break scenarios: not applicable
- Prompt injection checks: not applicable
- Data leakage and unauthorized access checks: not applicable
- Result: not applicable

## Result Report

- Task summary: aligned active operator docs with the real `backend/scripts/` layout.
- Files changed:
  - `docs/architecture/28_local_windows_and_coolify_deploy.md`
  - `docs/engineering/testing.md`
  - `docs/operations/runtime-ops-runbook.md`
  - `docs/planning/behavior-feedback-learning-system-plan.md`
  - `docs/planning/next-iteration-plan.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/context/LEARNING_JOURNAL.md`
- How tested: path scan, backend script-entrypoint pytest
  (`8 passed, 42 deselected`), `git diff --check`.
- What is incomplete: live production deploy was not triggered in this slice.
- Next steps: `PRJ-843` run or prepare the current release evidence bundle against the chosen target.
- Decisions made: fix docs instead of adding root wrapper scripts to keep root minimal.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: active docs referenced a missing root `scripts/` path.
- Gaps: operator commands could fail before validating the release.
- Inconsistencies: actual scripts live under `backend/scripts/`.
- Architecture constraints: keep root minimal and avoid new wrapper systems.

### 2. Select One Priority Task
- Selected task: `PRJ-842`.
- Priority rationale: command-path drift blocks reliable deploy/smoke execution.
- Why other candidates were deferred: UI polish and new feature work are lower signal than release command correctness.

### 3. Plan Implementation
- Files or surfaces to modify: active operator, testing, deployment, planning, context docs.
- Logic: root commands point to `backend/scripts`; backend-working-directory commands stay local.
- Edge cases: avoid rewriting historical task evidence as if it were current guidance.

### 4. Execute Implementation
- Implementation notes: applied mechanical path corrections and one manual cleanup for backend-working-directory examples.

### 5. Verify and Test
- Validation performed: path scan, pytest script-entrypoint coverage, diff hygiene.
- Result: pass.

### 6. Self-Review
- Simpler option considered: adding root wrapper scripts; rejected because repo root should remain minimal.
- Technical debt introduced: no
- Scalability assessment: docs now match the established backend script layout.
- Refinements made: preserved `.\scripts\...` inside `Push-Location .\backend` examples.

### 7. Update Documentation and Knowledge
- Docs updated:
  - deployment guide
  - testing guide
  - ops runbook
  - planning docs
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: yes.
