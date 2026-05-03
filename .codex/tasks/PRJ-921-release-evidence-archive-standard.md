# Task

## Header
- ID: PRJ-921
- Title: Release Evidence Archive Standard
- Task Type: release
- Current Stage: release
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-920
- Priority: P1
- Coverage Ledger Rows: not applicable
- Iteration: 921
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
The v1 release plan had a `PRJ-921` slot for defining where latest release
smoke, behavior report, incident bundle, and rollback notes live. The repo
already has incident evidence bundle mechanics and runbook guidance, but the
release archive rule was not captured as one planning standard.

## Goal
Create a release evidence archive standard that separates committed release
truth from machine-local generated artifacts and gives future operators one
stable handoff map.

## Scope
- `.codex/tasks/PRJ-921-release-evidence-archive-standard.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `docs/planning/v1-release-evidence-archive-standard.md`
- `docs/planning/v1-release-audit-and-execution-plan.md`
- `docs/planning/v1-core-acceptance-bundle.md`
- `docs/operations/runtime-ops-runbook.md`
- `docs/README.md`
- `docs/index.md`

## Implementation Plan
1. Inspect existing incident-evidence, release-smoke, behavior-validation, and
   final acceptance docs.
2. Add one planning standard for release archive ownership, artifact roots,
   commit policy, retention, refresh triggers, and handoff checklist.
3. Link the standard from docs entrypoints, the ops runbook, and release
   planning surfaces.
4. Sync task board and project state.
5. Validate links and whitespace.

## Acceptance Criteria
- Release archive standard exists and is linked from planning and ops docs.
- The standard identifies committed docs, local generated evidence, artifact
  roots, retention rules, and refresh triggers.
- Generated local artifacts are explicitly not committed by default.
- The current v1 release plan marks `PRJ-921` as done.

## Definition of Done
- [x] Release evidence archive standard is created.
- [x] Release plan, acceptance bundle, docs index, README, ops runbook, task
  board, and project state are linked or synchronized.
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
- Tests: not applicable for docs-only change
- Manual checks:
  - local markdown link check passed for touched docs
  - `PRJ-921` planning references resolve to the new standard
  - `git diff --check` passed
- Screenshots/logs: not applicable
- High-risk checks: no generated local artifacts were staged or committed
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/architecture/17_logging_and_debugging.md`
  - `docs/operations/runtime-ops-runbook.md`
  - `docs/planning/v1-core-acceptance-bundle.md`
  - `docs/planning/v1-release-audit-and-execution-plan.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none; planning and ops references only.

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: documentation-only archive standard
- Rollback note: revert docs/context changes if superseded
- Observability or alerting impact: release evidence handoff is clearer; no
  runtime monitoring change
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
- [x] Learning journal update was not required; no new recurring pitfall was
  confirmed.

## Production-Grade Required Contract
- Goal: define the release evidence archive standard.
- Scope: docs and context files listed above.
- Implementation Plan: see above.
- Acceptance Criteria: see above.
- Definition of Done: documentation-only applicability.
- Result Report: complete.

## Integration Evidence
- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: not applicable
- Endpoint and client contract match: not applicable
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: not applicable
- Regression check performed: docs link and whitespace checks

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: release owner, future agents, incident reviewers
- Existing workaround or pain: evidence paths were spread across runbook,
  acceptance bundle, task history, and local artifact directories
- Smallest useful slice: one standard document plus release-plan links
- Success metric or signal: a release owner can identify latest committed
  evidence pointers and local artifact roots without scanning task history
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: yes

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: release handoff and incident evidence retrieval
- SLI: not applicable
- SLO: not applicable
- Error budget posture: not applicable
- Health/readiness check: not applicable
- Logs, dashboard, or alert route: not applicable
- Smoke command or manual smoke: docs sanity checks
- Rollback or disable path: revert docs/context changes

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: repository documentation and local generated evidence
  references; no secrets
- Trust boundaries: generated artifacts can include sensitive snapshots and
  stay local by default
- Permission or ownership checks: no runtime change
- Abuse cases: avoid committing tokens, raw provider payloads, or generated
  machine-local evidence by accident
- Secret handling: no secrets included
- Security tests or scans: not applicable
- Fail-closed behavior: not applicable
- Residual risk: operators must still choose when to preserve or promote
  generated local artifacts

## AI Testing Evidence
- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios: not applicable
- Multi-step context scenarios: not applicable
- Adversarial or role-break scenarios: not applicable
- Prompt injection checks: not applicable
- Data leakage and unauthorized access checks: not applicable
- Result: not applicable

## Result Report
- Task summary: created the release evidence archive standard and linked it
  into release planning, acceptance, ops, and docs entrypoints.
- Files changed:
  - `.codex/tasks/PRJ-921-release-evidence-archive-standard.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `docs/planning/v1-release-evidence-archive-standard.md`
  - `docs/planning/v1-release-audit-and-execution-plan.md`
  - `docs/planning/v1-core-acceptance-bundle.md`
  - `docs/operations/runtime-ops-runbook.md`
  - `docs/README.md`
  - `docs/index.md`
- How tested:
  - local markdown link check
  - planning reference check
  - `git diff --check`
- What is incomplete:
  - PRJ-930 deployment trigger SLO evidence remains separate.
  - PRJ-931..PRJ-933 AI/security hardening remains separate.
- Next steps: continue to `PRJ-930` or `PRJ-931` while `PRJ-909` and
  `PRJ-918` wait for operator inputs.
- Decisions made: generated evidence under `.codex/artifacts/` and
  `artifacts/` stays local by default; committed docs carry pointers,
  summaries, commands, and decisions.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - release evidence archive ownership was listed in the v1 plan but had no
    dedicated task file or standard doc.
- Gaps:
  - no single map for committed evidence pointers versus generated local
    artifacts.
- Inconsistencies:
  - none found in bundle mechanics; the missing piece was release handoff
    structure.
- Architecture constraints:
  - keep bundle mechanics in existing scripts/runbook; do not invent another
    evidence system.

### 2. Select One Priority Task
- Selected task: PRJ-921 Release Evidence Archive Standard.
- Priority rationale: it is the next locally actionable Phase 6 task after
  PRJ-920 and reduces release handoff drift.
- Why other candidates were deferred: PRJ-909 and PRJ-918 require operator
  inputs; PRJ-930/PRJ-931 remain next locally actionable tasks.

### 3. Plan Implementation
- Files or surfaces to modify: docs/context files listed in Scope.
- Logic: document ownership, artifact classes, retention, refresh triggers,
  and handoff checklist.
- Edge cases:
  - generated artifacts may contain sensitive snapshots
  - post-commit deploy parity can drift after every new commit

### 4. Execute Implementation
- Implementation notes:
  - added `docs/planning/v1-release-evidence-archive-standard.md`
  - linked `PRJ-921` from release plan, acceptance bundle, docs entrypoints,
    and ops runbook
  - updated context truth and this task file

### 5. Verify and Test
- Validation performed:
  - local markdown link check
  - planning reference check
  - `git diff --check`
- Result: passed.

### 6. Self-Review
- Simpler option considered: only mark `PRJ-921` as done in the release plan;
  rejected because it would not provide a durable archive standard.
- Technical debt introduced: no
- Scalability assessment: the standard can later point at external storage
  when an external observability/archive stack exists.
- Refinements made:
  - kept generated artifact paths local by default
  - separated archive standard from deployment SLO evidence and AI hardening

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/planning/v1-release-evidence-archive-standard.md`
  - `docs/planning/v1-release-audit-and-execution-plan.md`
  - `docs/planning/v1-core-acceptance-bundle.md`
  - `docs/operations/runtime-ops-runbook.md`
  - `docs/README.md`
  - `docs/index.md`
- Context updated:
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/context/TASK_BOARD.md`
- Learning journal updated: not applicable.
