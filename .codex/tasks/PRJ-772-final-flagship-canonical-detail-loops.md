# Task

## Header
- ID: PRJ-772
- Title: Final Flagship Canonical Detail Loops
- Task Type: design
- Current Stage: implementation
- Status: IN_PROGRESS
- Owner: Frontend Builder
- Depends on: PRJ-743
- Priority: P1

## Context
The current authenticated `dashboard`, `chat`, and `personality` routes are
already structurally aligned with the approved flagship direction, but they
still carry last-mile drift relative to the canonical route references. The
work is now focused on detailed convergence rather than broad redesign.

## Goal
Close the remaining visual and compositional gaps so the flagship shell and the
three canonical routes read as direct product realizations of the approved
reference screens.

## Scope
- `web/src/App.tsx`
- `web/src/index.css`
- `docs/planning/final-flagship-canonical-detail-checklist.md`
- `.codex/tasks/PRJ-743-dashboard-chat-personality-canonical-polish-and-proof.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Deliverable For This Stage
One implementation slice that tightens route rhythm and hierarchy plus a
detailed checklist file that breaks the remaining flagship parity work into
route-specific detail loops.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Implementation Plan
1. Freeze the remaining drift in a detail-level planning checklist tied to the
   canonical assets.
2. Improve dashboard sidebar rhythm and lower-grid pacing so the route reads
   more like one flagship composition.
3. Tighten chat support-column spacing and support-card hierarchy so the
   transcript remains dominant.
4. Refine personality side-stack ordering and hierarchy, with special attention
   to smaller breakpoints.
5. Validate with `npm run build`.
6. Sync task and project context with the new slice and the next smallest
   parity loop.

## Acceptance Criteria
- The repository contains a detailed canonical-detail checklist for the final
  flagship parity loops.
- Dashboard guidance, recent activity, and intention surfaces read with clearer
  hierarchy and less equal-card weight.
- Chat support surfaces are calmer and visually subordinate to the transcript.
- Personality side-stack hierarchy is clearer, with a more obvious highlight
  anchor and quieter recent-activity support.
- Validation evidence is recorded for the touched frontend scope.

## Definition of Done
- [ ] A detailed route-by-route checklist exists for final canonical parity.
- [ ] One additional flagship implementation slice is merged into the web shell.
- [ ] `Push-Location .\web; npm run build; Pop-Location` passes.
- [ ] Task and project context files are updated for the latest parity loop.

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
- Manual checks:
  - pending next deploy compare loop
- Screenshots/logs:
  - canonical references listed in the planning checklist
- High-risk checks:
  - no route topology changes
  - no decorative-fidelity downgrade from raster-backed sections to gradient-only

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/context/TASK_BOARD.md`
  - `docs/ux/visual-direction-brief.md`
  - `docs/ux/screen-quality-checklist.md`
  - `docs/ux/background-and-decorative-asset-strategy.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates:

## UX/UI Evidence (required for UX tasks)
- Design source type: approved_snapshot
- Design source reference:
  - `docs/ux/assets/aion-dashboard-canonical-reference-v2.png`
  - `docs/ux/assets/aion-chat-canonical-reference-v4.png`
  - `docs/ux/assets/aion-personality-canonical-reference-v1.png`
- Canonical visual target:
  - authenticated flagship shell parity
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused:
  - flagship shell surfaces
  - vellum panel family
  - route-specific raster atmosphere
- New shared pattern introduced: no
- Design-memory entry reused:
  - existing flagship route memory
- Design-memory update required: no
- Visual gap audit completed: yes
- Background or decorative asset strategy:
  - existing raster-backed route surfaces remain the source of atmosphere
- Canonical asset extraction required: no
- Screenshot comparison pass completed: no
- Remaining mismatches:
  - dashboard lower pacing
  - chat support-column spacing after deploy
  - personality mobile compression after deploy
- State checks: success
- Responsive checks: desktop | mobile
- Input-mode checks: pointer | keyboard
- Accessibility checks:
  - build-level semantic and attribute integrity only in this slice
- Parity evidence:
  - next deploy loop required

## Deployment / Ops Evidence (required for runtime or infra tasks)
- Deploy impact: low
- Env or secret changes:
- Health-check impact:
- Smoke steps updated:
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
This task intentionally stays within shared route polish. Any remaining final
gaps after deploy should be handled as bounded crop/spacing loops rather than a
new broad redesign.

## Production-Grade Required Contract

Every task must include these mandatory sections before it can move to `READY`
or `IN_PROGRESS`:

- `Goal`
- `Scope` with exact files, modules, routes, APIs, schemas, docs, or runtime
  surfaces
- `Implementation Plan` with step-by-step execution and validation
- `Acceptance Criteria` with testable conditions
- `Definition of Done` using `DEFINITION_OF_DONE.md`
- `Result Report`

## Integration Evidence

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: not applicable
- Endpoint and client contract match: not applicable
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: not applicable
- Regression check performed:
  - `npm run build`

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
  - detailed final-checklist planning was recorded and one new flagship
    hierarchy/rhythm slice was implemented
- Files changed:
  - `web/src/App.tsx`
  - `web/src/index.css`
  - `docs/planning/final-flagship-canonical-detail-checklist.md`
  - `.codex/tasks/PRJ-743-dashboard-chat-personality-canonical-polish-and-proof.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
- What is incomplete:
  - deploy-backed screenshot comparison
  - final tablet parity proof
- Next steps:
  - compare the new route rhythm on deploy and run the next crop/spacing loop
- Decisions made:
  - keep the existing flagship route topology
  - continue converging through bounded rhythm and crop passes instead of
    introducing any new route-local UI systems
