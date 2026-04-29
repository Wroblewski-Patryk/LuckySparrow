# Task

## Header
- ID: PRJ-780
- Title: Freeze canonical sidebar layout and plan shell convergence
- Task Type: design
- Current Stage: planning
- Status: READY
- Owner: Frontend Builder
- Depends on: PRJ-776, PRJ-779
- Priority: P1

## Context
The authenticated shell now has a stronger frame and the dashboard has received
another structural pass, but the left sidebar still has drift and the canonical
references show inconsistent sidebar variants. The newly supplied sidebar image
must become the single source of truth for the authenticated layout spine.

## Goal
Freeze one canonical authenticated sidebar layout and produce a detailed
implementation plan that can drive a future pixel-close shell pass.

## Deliverable For This Stage
Planning output only:

- canonical sidebar asset stored in the repo
- canonical screen reference doc updated
- detailed sidebar gap audit and execution plan
- task-ready rollout notes in source-of-truth files

## Scope
- `docs/ux/assets/aviary-sidebar-layout-canonical-reference-v1.png`
- `docs/ux/canonical-web-screen-reference-set.md`
- `docs/ux/design-memory.md`
- `docs/planning/sidebar-layout-canonical-convergence-plan.md`
- `.codex/tasks/PRJ-780-freeze-canonical-sidebar-layout-and-plan-shell-convergence.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Implementation Plan
1. Save the user-supplied sidebar image into canonical UX assets.
2. Register it in the canonical web screen reference set as the sidebar layout
   source of truth.
3. Compare the current authenticated rail in `App.tsx` and `index.css`
   against the new canonical sidebar.
4. Record all visual, structural, and route-contract mismatches.
5. Produce a stepwise implementation queue that starts with layout-safe shell
   work before any route-expansion decision.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Definition of Done
- [ ] Canonical sidebar asset is stored in the repo.
- [ ] Canonical sidebar is recorded in UX source-of-truth docs.
- [ ] Detailed implementation plan exists for the authenticated sidebar shell pass.

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
  - `git diff --check -- docs/ux/canonical-web-screen-reference-set.md docs/ux/design-memory.md docs/planning/sidebar-layout-canonical-convergence-plan.md .codex/tasks/PRJ-780-freeze-canonical-sidebar-layout-and-plan-shell-convergence.md .codex/context/TASK_BOARD.md .codex/context/PROJECT_STATE.md`
- Manual checks:
  - visual inspection of the supplied sidebar asset
  - sidebar code audit in `web/src/App.tsx` and `web/src/index.css`
- Screenshots/logs:
  - canonical sidebar source image
- High-risk checks:
  - route inventory mismatch explicitly documented rather than silently assumed

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/02_architecture.md`
  - `docs/architecture/27_codex_instructions.md`
- Fits approved architecture: yes
- Mismatch discovered: yes
- Decision required from user: yes
- Approval reference if architecture changed:
- Follow-up architecture doc updates:
  - future implementation must decide whether to keep current route inventory
    or expand the authenticated route contract to match the full canonical nav

## UX/UI Evidence (required for UX tasks)
- Design source type: approved_snapshot
- Design source reference:
  - `C:\Users\wrobl\Desktop\UIUX\aion\aion - navigation - dashboard - v2.png`
- Canonical visual target:
  - authenticated sidebar layout for the parent shell
- Fidelity target: pixel_close
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused:
  - window-chrome shell framing
  - flagship shell
- New shared pattern introduced: yes
- Design-memory entry reused:
  - window-chrome shell framing
- Design-memory update required: yes
- Visual gap audit completed: yes
- Background or decorative asset strategy:
  - preserve the warm editorial paper-like sidebar material and lower-card decorative wash
- Canonical asset extraction required: yes
- Screenshot comparison pass completed: no
- Remaining mismatches:
  - current shell rail still diverges in width, nav anatomy, support cards, and route inventory
- State checks: not applicable
- Responsive checks: desktop
- Input-mode checks: pointer | keyboard
- Accessibility checks:
  - future implementation must preserve focus and semantics while changing nav anatomy
- Parity evidence:
  - planning only; no screenshot parity pass yet

## Deployment / Ops Evidence (required for runtime or infra tasks)
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: not applicable
- Rollback note:

## Review Checklist (mandatory)
- [x] Current stage is declared and respected.
- [x] Deliverable for the current stage is complete.
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated if repository truth changed.
- [ ] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
- The canonical sidebar includes more modules than the current route contract.
- That mismatch is documented intentionally and must be resolved explicitly
  before a fully literal implementation.

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

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: not applicable
- Endpoint and client contract match: not applicable
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: not applicable
- Regression check performed:
  - planning artifact only

## AI Testing Evidence (required for AI features)

- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios:
- Multi-step context scenarios:
- Adversarial or role-break scenarios:
- Prompt injection checks:
- Data leakage and unauthorized access checks:
- Result:

## Result Report

- Task summary:
  - saved the supplied sidebar as the canonical authenticated layout spine and
    produced a detailed shell-convergence plan
- Files changed:
  - `docs/ux/assets/aviary-sidebar-layout-canonical-reference-v1.png`
  - `docs/ux/canonical-web-screen-reference-set.md`
  - `docs/ux/design-memory.md`
  - `docs/planning/sidebar-layout-canonical-convergence-plan.md`
  - `.codex/tasks/PRJ-780-freeze-canonical-sidebar-layout-and-plan-shell-convergence.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - visual review of the supplied asset
  - sidebar code audit
  - `git diff --check` on touched planning/docs files
- What is incomplete:
  - actual sidebar implementation
  - explicit decision on future module route expansion
- Next steps:
  - implement the desktop sidebar shell pass using current route contracts
- Decisions made:
  - the supplied image is now the single canonical sidebar layout target
