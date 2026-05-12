# Task

## Header
- ID: PRJ-1183
- Title: v1.5 mobile UI PR and production promotion handoff
- Task Type: release
- Current Stage: release
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-1182
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: v1.5 mobile UI release handoff
- Quality Scenario Rows: mobile UI deployability, release traceability
- Risk Rows: Coolify source/webhook automation reliability, native device proof blocker
- Iteration: v1.5 mobile UI continuation
- Operation Mode: BUILDER
- Mission ID: v15-mobile-ui-deploy-readiness
- Mission Status: VERIFIED

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.
- [x] `.agents/core/project-memory-index.md` was reviewed in the v1.5 mission.
- [x] `.agents/core/mission-control.md` was reviewed for long-running work in the v1.5 mission.
- [x] Missing or template-like state tables were bootstrapped from repository sources, or confirmed not needed.
- [x] Affected module confidence rows were identified.
- [x] Affected requirement, quality scenario, and risk rows were identified or marked not applicable.
- [x] The task or mission improves release confidence, not only local code appearance.

## Mission Block
- Mission objective: make the v1.5 mobile UI branch ready for PR review and production promotion without relying on chat-only deployment knowledge.
- Release objective advanced: v1.5 mobile UI can be opened as a PR, merged through the normal source-driven path, and verified with existing Coolify release-smoke gates.
- Included slices: PR URL, branch, local preview status, validation command pack, production promotion order, rollback notes, residual blockers.
- Explicit exclusions: creating the GitHub PR from this machine, merging to `main`, triggering Coolify without operator credentials, and claiming native device readiness.
- Checkpoint cadence: single bounded release-handoff slice.
- Stop conditions: if production promotion required secrets or a merge action unavailable locally, record the blocker instead of forcing a workaround.
- Handoff expectation: a future operator can open the PR, merge, deploy, and verify with exact commands.

## Context
The v1.5 mobile UI branch has been pushed as `origin/codex/v15-mobile-ui-deploy-commits`.
Local preview proof is green, and native device proof is truthfully blocked by
missing `adb` and `emulator`. The repository's production path is governed by
the Coolify source/deploy baseline and release-smoke scripts.

## Goal
Record the exact PR and production promotion path for the pushed v1.5 mobile UI
branch.

## Scope
- `.codex/tasks/PRJ-1183-v15-mobile-ui-pr-and-production-promotion-handoff.md`
- `docs/operations/v15-mobile-ui-pr-and-production-promotion-handoff-2026-05-12.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `.agents/state/next-steps.md`
- `.agents/state/system-health.md`
- `.agents/state/delivery-map.md`
- `.agents/state/module-confidence-ledger.md`

## Success Signal
- User or operator problem: the branch is pushed, but the PR/deploy boundary and remaining production actions must be explicit.
- Expected product or reliability outcome: no one mistakes local preview deployment for production deployment or native-device readiness.
- How success will be observed: handoff contains exact branch, PR URL, command pack, production smoke order, blockers, and rollback note.
- Post-launch learning needed: yes

## Deliverable For This Stage
A committed operations handoff and updated source-of-truth files.

## Constraints
- use existing Coolify source/deploy and release-smoke mechanisms
- do not introduce a deployment shortcut or new release process
- do not claim production deployment without merge/deploy/smoke evidence
- keep local preview and native proof readiness separate

## Implementation Plan
1. Read existing release/Coolify documentation.
2. Add a handoff that points to the pushed branch and PR URL.
3. Record production promotion steps using existing scripts only.
4. Update task board, project state, next steps, system health, delivery map, and module confidence.
5. Run docs-scope validation and re-run mobile preview smoke.

## Acceptance Criteria
- The handoff identifies the pushed branch and PR URL.
- The handoff states that production deployment is not yet performed.
- The handoff provides exact validation, promotion, smoke, and rollback commands.
- State files point future work to the PR/promotion path and native proof blocker.

## Definition of Done
- [x] `DEFINITION_OF_DONE.md` expectations are met for a docs/release-handoff task.
- [x] No production or native readiness claim is made without evidence.
- [x] Relevant source-of-truth files are updated.
- [x] Validation evidence is recorded.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- new systems without approval
- duplicated logic or parallel deployment implementations
- temporary bypasses, hacks, or workaround-only paths
- triggering production deployment without a selected candidate and operator credentials
- declaring native-device readiness while `adb` and `emulator` are unavailable

## Validation Evidence
- Tests:
  - `Push-Location .\mobile; npm run smoke:ui-mobile-preview; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS; `preview_health.ok=true`, `route_count=5`, `viewport_count=2`, `screenshot_count=10`, `failed_count=0`
  - `git diff --check` -> PASS with LF/CRLF warnings only
- Manual checks:
  - existing production promotion docs reviewed in `docs/architecture/28_local_windows_and_coolify_deploy.md`
  - existing release evidence reviewed in `docs/operations/release-evidence-index.md`
- Screenshots/logs:
  - `.codex/artifacts/prj1177-mobile-ui-preview-smoke/`
- High-risk checks:
  - production deploy not triggered; promotion remains gated by PR merge, Coolify deploy, and release smoke
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: not applicable
- Module confidence ledger updated: yes
- Module confidence rows closed or changed: AVIARY-MOBILE-UI-001 evidence extended with PR/promotion handoff
- Requirements matrix updated: not applicable
- Requirement rows closed or changed: not applicable
- Quality scenarios updated: not applicable
- Quality scenario rows closed or changed: not applicable
- Risk register updated: not applicable
- Risk rows closed or changed: not applicable
- Reality status: partially verified

## Architecture Evidence
- Architecture source reviewed: `docs/architecture/28_local_windows_and_coolify_deploy.md`; `docs/operations/release-evidence-index.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: not applicable

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: `docs/planning/v1.5-mobile-ui-plan.md`
- Canonical visual target: v1.5 mobile UI preview routes
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes, in the v1.5 UI mission
- Visual-direction brief reviewed: yes, in the v1.5 UI mission
- Existing shared pattern reused: local preview, audit, and smoke scripts
- New shared pattern introduced: no
- Design-memory entry reused: v1.5 mobile plan and existing mobile UI state
- Design-memory update required: no
- Visual gap audit completed: yes, via existing preview smoke
- Background or decorative asset strategy: unchanged
- Canonical asset extraction required: no
- Screenshot comparison pass completed: yes, previous preview smoke evidence reused and rerun
- Remaining mismatches: native device proof still blocked by environment tooling
- State checks: loading | empty | error | success covered in v1.5 mobile Tools seed
- Feedback locality checked: yes
- Raw technical errors hidden from end users: not applicable
- Responsive checks: phone | tablet preview
- Input-mode checks: touch proxy via preview DOM/screenshot; native touch still blocked
- Accessibility checks: unchanged from v1.5 mobile audit scope
- Parity evidence: `.codex/artifacts/prj1177-mobile-ui-preview-smoke/`

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: yes, in the handoff
- Rollback note: revert or close the PR before merge; after production promotion, redeploy the previous selected SHA/tag if smoke fails
- Observability or alerting impact: none
- Staged rollout or feature flag: branch/PR promotion gate

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
- Safe assumption: the PR creation URL can be used by an operator because the branch is already pushed.
- Blocking assumption: production promotion requires merge/Coolify operator access or webhook secrets not present locally.

## Production-Grade Required Contract

## Integration Evidence

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: release operator and product owner
- Existing workaround or pain: branch and local preview existed, but production promotion steps were scattered across docs and chat.
- Smallest useful slice: one explicit PR/promotion handoff.
- Success metric or signal: future operator can execute the deploy path from documented commands.
- Feature flag, staged rollout, or disable path: PR branch gate
- Post-launch feedback or metric check: run production smoke after merge/deploy

## User Feedback Evidence
- `docs/governance/user-feedback-loop.md` reviewed: not applicable
- Feedback item IDs: user asked to continue until UI is deployed
- Feedback accepted: continue UI deploy readiness work
- Feedback needs clarification: none for this handoff
- Feedback conflicts: none
- Feedback deferred or rejected: production deploy cannot be claimed before merge/Coolify/smoke
- Active task changed by feedback: yes
- New task created from feedback: yes
- Design memory updated: no
- Learning journal updated: no

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable for docs-only handoff
- Critical user journey: PR promotion to production and release smoke verification
- SLI: production `/health` and web revision parity after deploy
- SLO: existing release smoke must pass before calling production green
- Error budget posture: not applicable
- Health/readiness check: `backend/scripts/run_release_smoke.ps1`
- Logs, dashboard, or alert route: Coolify service health plus release-smoke output
- Smoke command or manual smoke: documented in handoff
- Rollback or disable path: close PR before merge; redeploy previous selected SHA/tag after merge if smoke fails

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: not applicable
- Endpoint and client contract match: not applicable
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: not applicable
- Regression check performed: mobile preview smoke

## AI Testing Evidence

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: repository metadata and release evidence only
- Trust boundaries: GitHub PR, Coolify deploy source, production public domain
- Permission or ownership checks: production deployment requires operator-controlled merge/Coolify access
- Abuse cases: local environment must not trigger an unreviewed deploy without credentials and selected candidate
- Secret handling: no secrets added or requested
- Security tests or scans: not applicable
- Fail-closed behavior: no production deploy is claimed or triggered
- Residual risk: Coolify source/webhook reliability remains a future-candidate follow-up until a production promotion is observed

- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios: not applicable
- Multi-step context scenarios: not applicable
- Adversarial or role-break scenarios: not applicable
- Prompt injection checks: not applicable
- Data leakage and unauthorized access checks: not applicable
- Result: not applicable

## Result Report

- Task summary: Added a PR and production promotion handoff for the pushed v1.5 mobile UI branch.
- Files changed: task file, operations handoff, and source-of-truth state files.
- How tested: mobile preview smoke and `git diff --check`.
- What is incomplete: PR creation, merge, Coolify deploy, production release smoke, and native device proof.
- Next steps: open the PR from the provided URL, merge after review, wait for Coolify deploy, run release smoke, then capture native device proof when tooling is available.
- Decisions made: production deployment remains gated by existing PR/Coolify/release-smoke process.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: branch is pushed but PR creation and production promotion are not yet completed.
- Gaps: no local `gh`; no Coolify webhook URL/secret; native proof tooling missing.
- Inconsistencies: none.
- Architecture constraints: production deploy must use existing Coolify source/deploy and release-smoke mechanisms.

### 1a. Bootstrap Missing Project Knowledge
- Bootstrap needed: no
- Missing or template-like files: none
- Sources scanned: deployment guide, release evidence index, task board, project state
- Rows created or corrected: PRJ-1183 and handoff references
- Assumptions recorded: PR URL is operator-usable; production promotion requires merge/operator access
- Blocking unknowns: Coolify operator credentials and native device tooling
- Why it was safe to continue: docs-only handoff reduces deployment ambiguity without changing runtime behavior

### 2. Select One Priority Mission Objective
- Selected task: PRJ-1183
- Priority rationale: the UI branch is ready for review but not production-promoted.
- Why other candidates were deferred: native proof is blocked by missing `adb`/`emulator`.

### 3. Plan Implementation
- Files or surfaces to modify: operations handoff and state docs.
- Logic: none.
- Edge cases: avoid claiming production deployment or native readiness without evidence.

### 4. Execute Implementation
- Implementation notes: recorded branch, PR URL, local preview status, validation commands, production promotion path, and rollback.

### 5. Verify and Test
- Validation performed: mobile preview smoke and `git diff --check`.
- Result: PASS.

### 6. Self-Review
- Simpler option considered: only telling the user the PR URL in chat.
- Technical debt introduced: no
- Scalability assessment: handoff reuses existing release scripts and keeps the promotion path reproducible.
- Refinements made: separated local preview, production promotion, and native proof readiness.

### 7. Update Documentation and Knowledge
- Docs updated: operations handoff.
- Context updated: task board, project state, next steps, system health, delivery map, module confidence.
- Learning journal updated: not applicable.
