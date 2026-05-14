# Task

## Header
- ID: PRJ-1197
- Title: Remove roadmap placeholders from active tools overview
- Task Type: fix
- Current Stage: verification
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-1196
- Priority: P1
- Coverage Ledger Rows: ARCH-CONNECTORS-001
- Module Confidence Rows: AVIARY-BLOCKER-001
- Requirement Rows: not applicable
- Quality Scenario Rows: maintainability, product truthfulness
- Risk Rows: provider activation scope clarity
- Iteration: 1197
- Operation Mode: BUILDER
- Mission ID: PRJ-1197-tools-overview-placeholder-removal
- Mission Status: VERIFIED

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.
- [x] `.agents/core/project-memory-index.md` was reviewed.
- [x] `.agents/core/mission-control.md` was reviewed for long-running work.
- [x] Missing or template-like state tables were bootstrapped from repository sources, or confirmed not needed.
- [x] Affected module confidence rows were identified.
- [x] Affected requirement, quality scenario, and risk rows were identified or marked not applicable.
- [x] The task or mission improves release confidence, not only local code appearance.

## Mission Block
- Mission objective: keep the active tools overview limited to runtime-backed tools and integrations, not future roadmap placeholders.
- Release objective advanced: product truthfulness and connector-readiness clarity.
- Included slices: backend tools overview contract, focused tests, source-of-truth updates.
- Explicit exclusions: implementing Trello, Nest, provider credentials, or new roadmap APIs.
- Checkpoint cadence: one implementation checkpoint plus validation.
- Stop conditions: architecture mismatch, failing focused tests, or need for a new roadmap surface.
- Handoff expectation: concise status, changed files, validation, and remaining deferred provider work.

## Context
The repo-wide temporary-solution scan found only one product-facing placeholder in production code: `/app/tools/overview` lists Trello and Nest as `planned_placeholder` items in the active task-management tools group.

## Goal
Remove future-only Trello and Nest entries from the active tools overview so the route reports only tools with an implemented runtime/API/configuration contract.

## Scope
- `backend/app/core/app_tools_policy.py`
- `backend/tests/test_api_routes.py`
- relevant project state/context docs

## Success Signal
- User or operator problem: inactive future integrations should not appear as active catalog entries.
- Expected product or reliability outcome: tools overview counts reflect real runtime-backed tools only.
- How success will be observed: focused tools-overview test passes and `planned_placeholder_count` is zero.
- Post-launch learning needed: no

## Deliverable For This Stage
Implementation and validation evidence for removing active tools roadmap placeholders.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Implementation Plan
1. Remove Trello and Nest `planned_placeholder` items from the active task-management group.
2. Update the group copy to describe runtime-backed task integrations only.
3. Update focused API contract assertions and counts.
4. Run the focused backend API test.
5. Update source-of-truth state with evidence and residual deferred provider scope.

## Acceptance Criteria
- `/app/tools/overview` no longer returns Trello or Nest as active items.
- Summary `total_items` and `provider_blocked_count` shrink accordingly.
- Summary `planned_placeholder_count` is `0`.
- Focused API test passes.

## Definition of Done
- [x] Implementation matches approved architecture and action/tool boundaries.
- [x] Focused validation evidence is recorded.
- [x] Relevant docs/state are updated.

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
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py -k "app_tools_overview"; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> `3 passed, 129 deselected`
  - `Push-Location .\web; npm exec -- tsc -b --pretty false; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
- Manual checks:
  - repo-wide temporary-solution scan identified active tools placeholders as the narrow implementation target
  - production-code scan for `planned_placeholder`, `task_plan_placeholder`, and old placeholder descriptions across `backend/app`, `backend/tests`, and `web/src` returned no active-path matches
- Screenshots/logs: not applicable
- High-risk checks: no provider credentials, side effects, or deployment settings changed.
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none
- Module confidence ledger updated: yes
- Module confidence rows closed or changed: AVIARY-BLOCKER-001 evidence note only
- Requirements matrix updated: not applicable
- Requirement rows closed or changed: none
- Quality scenarios updated: not applicable
- Quality scenario rows closed or changed: none
- Risk register updated: not applicable
- Risk rows closed or changed: none
- Reality status: verified

## Architecture Evidence
- Architecture source reviewed: `docs/architecture/20_action_system.md`; `.agents/state/module-confidence-ledger.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: not expected

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: not applicable
- Rollback note: restore the removed planned items and previous test counts if the product later approves roadmap entries in this API.
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
The change intentionally does not remove deferred connector planning from docs. It only prevents future-only candidates from being returned as active product tools.

## Result Report
- Removed Trello and Nest future-only entries from the active task-management tools overview.
- Removed planned-placeholder status handling and copy from the web tools formatter.
- Preserved deferred provider activation as `ARCH-CONNECTORS-001`; no provider credential, side-effect, or deployment behavior changed.
- Updated `docs/pipelines/tools.md`, `docs/integrations/index.md`, `.codex/context/TASK_BOARD.md`, `.codex/context/PROJECT_STATE.md`, `.agents/state/system-health.md`, `.agents/state/module-confidence-ledger.md`, `.agents/state/next-steps.md`, and `.agents/core/project-memory-index.md`.
