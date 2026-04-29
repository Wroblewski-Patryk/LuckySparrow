# Task

## Header
- ID: PRJ-800A
- Title: Implement authenticated shell frame exactness pass
- Task Type: design
- Current Stage: implementation
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-800, PRJ-801
- Priority: P1

## Context
`PRJ-800` and `PRJ-801` froze the remaining parity work for `layout + sidebar +
home + dashboard`. The first execution slice must reduce shell drift before any
route can be pushed toward 1:1 canonical parity. The biggest current frame
problems are an overly generic utility bar, a too-loose rail-to-canvas rhythm,
and a desktop account surface that interrupts the flagship reading.

## Goal
Make the authenticated parent shell materially closer to the canonical premium
frame so `dashboard`, `chat`, and `personality` can inherit a calmer, more
authoritative canvas.

## Deliverable For This Stage
One frontend shell slice in `web/src/App.tsx` and `web/src/index.css` that:
- demotes generic app chrome in the desktop utility bar
- tightens the shell gap and rail-to-canvas relationship
- replaces the wide desktop account panel with a quieter auxiliary popover
- preserves existing route behavior and account access

## Scope
- `web/src/App.tsx`
- `web/src/index.css`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `.codex/tasks/PRJ-800A-authenticated-shell-frame-exactness-pass.md`

## Implementation Plan
1. Rework the desktop utility bar into a calmer flagship framing strip.
2. Tighten shell inset spacing, frame rhythm, and rail-to-canvas proportion.
3. Replace the expanded desktop account panel with a compact anchored popover.
4. Preserve existing mobile account behavior and route switching.
5. Run focused frontend validation and update source-of-truth notes.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Acceptance Criteria
- the authenticated shell feels less app-like and more like one premium frame
- the desktop utility bar reads as framing rather than generic controls
- the expanded desktop account surface no longer interrupts route composition
- build and focused diff checks pass

## Definition of Done
- [x] Desktop shell frame is materially closer to the canonical ledger target.
- [x] Desktop account expansion is quieter and no longer a wide admin panel.
- [x] Focused frontend validation evidence is attached.

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
  - `Push-Location .\web; npm run build; Pop-Location`
  - `git diff --check -- web/src/App.tsx web/src/index.css .codex/context/TASK_BOARD.md .codex/context/PROJECT_STATE.md .codex/tasks/PRJ-800A-authenticated-shell-frame-exactness-pass.md`
- Manual checks:
  - authenticated shell frame reviewed against `PRJ-800` and `PRJ-801`
- Screenshots/logs:
  - screenshot parity remains a follow-up loop after deploy
- High-risk checks:
  - account access remains reachable from desktop and mobile shells

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/02_architecture.md`
  - `docs/architecture/27_codex_instructions.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates:
  - not applicable

## UX/UI Evidence (required for UX tasks)
- Design source type: approved_snapshot
- Design source reference:
  - `docs/planning/layout-sidebar-home-dashboard-canonical-parity-master-ledger.md`
  - `docs/planning/layout-sidebar-home-dashboard-micro-parity-checklist.md`
- Canonical visual target:
  - authenticated shell frame exactness before route-level parity passes
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused:
  - canonical authenticated shell frame
- New shared pattern introduced: no
- Design-memory entry reused:
  - canonical flagship shell direction
- Design-memory update required: no
- Visual gap audit completed: yes
- Background or decorative asset strategy:
  - keep atmosphere supportive and subordinate to the active route
- Canonical asset extraction required: no
- Screenshot comparison pass completed: no
- Remaining mismatches:
  - desktop shell still needs deploy screenshot tuning after this local pass
  - public home and dashboard still require their own structural parity slices
- State checks: success
- Responsive checks: desktop | mobile
- Input-mode checks: pointer | keyboard
- Accessibility checks:
  - shell controls remain button-based and keyboard focusable
- Parity evidence:
  - this slice targets shell structure first; screenshot parity follows after deploy

## Deployment / Ops Evidence (required for runtime or infra tasks)
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: not applicable
- Rollback note:
  - revert the frontend shell slice if desktop account access or route framing regresses

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
- This slice intentionally avoids route-level redesign so the shell can be
  stabilized first.

## Production-Grade Required Contract

Every task must include these mandatory sections before it can move to `READY`
or `IN_PROGRESS`:

- `Goal`
- `Scope` with exact files, modules, routes, APIs, schemas, docs, or runtime surfaces
- `Implementation Plan` with step-by-step execution and validation
- `Acceptance Criteria` with testable conditions
- `Definition of Done` using `DEFINITION_OF_DONE.md`
- `Result Report`

Runtime tasks must be delivered as a vertical slice: UI -> logic -> API -> DB
-> validation -> error handling -> test. Partial implementations, mock-only
paths, placeholders, fake data, and temporary fixes are forbidden.

## Integration Evidence

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: yes
- Endpoint and client contract match: yes
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: yes
- Regression check performed:
  - existing route transitions and account actions stay on the same shell contract

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
-  calmed the authenticated shell frame by tightening shell spacing, demoting
   the generic desktop utility chrome, and moving desktop account expansion
   into a compact anchored popover
- Files changed:
-  `web/src/App.tsx`
-  `web/src/index.css`
-  `.codex/context/TASK_BOARD.md`
-  `.codex/context/PROJECT_STATE.md`
-  `.codex/tasks/PRJ-800A-authenticated-shell-frame-exactness-pass.md`
- How tested:
-  `Push-Location .\web; npm run build; Pop-Location`
-  `git diff --check -- web/src/App.tsx web/src/index.css .codex/context/TASK_BOARD.md .codex/context/PROJECT_STATE.md .codex/tasks/PRJ-800A-authenticated-shell-frame-exactness-pass.md`
- What is incomplete:
-  deploy screenshot parity for the authenticated shell
-  route-level structural convergence for `public home` and `dashboard`
- Next steps:
-  execute the next parity slice on top of this calmer shell:
   `PRJ-800B` sidebar exactness / pixel-close refinement
- Decisions made:
-  preserve the existing mobile account surface for this slice
-  keep shell changes constrained to framing and account behavior before
   route-level redesign
