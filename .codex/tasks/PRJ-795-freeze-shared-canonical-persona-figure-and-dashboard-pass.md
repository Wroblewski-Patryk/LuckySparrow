# Task

## Header
- ID: PRJ-795
- Title: Freeze shared canonical persona figure and apply it to flagship routes
- Task Type: design
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-784
- Priority: P1

## Context
The product now has a user-approved canonical persona figure sourced from the
existing `tools` artwork. Until now, flagship routes have mixed older figure
assets and route-specific motif treatments without one explicit rule saying the
same persona must remain visible across modules. That drift weakens continuity:
the landing, dashboard, sidebar identity card, and personality preview can
start to feel like adjacent concepts instead of the same Aviary presence.

## Goal
Freeze one shared canonical persona figure for flagship web routes and apply
the first code pass so `landing`, `dashboard`, `sidebar`, and `personality`
visibly reuse the same embodied identity.

## Deliverable For This Stage
One frontend and documentation slice that:
- records the supplied figure as the shared canonical persona asset
- updates route-level visual source-of-truth files to require reuse of that
  persona across flagship modules
- replaces older figure references in the current web shell with the new shared
  asset
- adapts the dashboard hero so the shared persona reads as dashboard-native
  through route-specific callouts instead of a different character

## Scope
- `docs/ux/design-memory.md`
- `docs/ux/canonical-web-screen-reference-set.md`
- `docs/ux/aion-visual-motif-system.md`
- `docs/ux/background-and-decorative-asset-strategy.md`
- `docs/ux/assets/aviary-persona-figure-canonical-reference-v1.png`
- `web/public/aviary-persona-figure-canonical-reference-v1.png`
- `web/src/App.tsx`
- `web/src/index.css`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `.codex/tasks/PRJ-795-freeze-shared-canonical-persona-figure-and-dashboard-pass.md`

## Implementation Plan
1. Record the supplied figure asset as the shared canonical persona in the UX
   source-of-truth documents.
2. Update route translation rules so flagship screens reuse the same persona
   before introducing route-local humanoid art.
3. Replace existing legacy figure references in `landing`, `dashboard`,
   `sidebar`, and `personality` with the new shared asset.
4. Add dashboard-specific anchored callouts around the shared figure so the
   same being reads as an orchestration surface rather than a generic portrait.
5. Validate with frontend build and focused diff checks.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Acceptance Criteria
- the supplied image is frozen as the shared canonical persona figure
- source-of-truth docs explicitly require reuse of that figure across flagship
  routes
- `landing`, `dashboard`, `sidebar`, and `personality` no longer point at the
  older figure asset
- dashboard uses the shared figure with route-specific support cues
- build and focused diff checks pass

## Definition of Done
- [x] Shared persona continuity is explicit in design source-of-truth.
- [x] Current flagship routes use the new canonical figure where already in scope.
- [x] Focused validation evidence is attached.

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
  - `git diff --check -- web/src/App.tsx web/src/index.css docs/ux/design-memory.md docs/ux/canonical-web-screen-reference-set.md docs/ux/aion-visual-motif-system.md docs/ux/background-and-decorative-asset-strategy.md .codex/context/PROJECT_STATE.md .codex/context/TASK_BOARD.md .codex/tasks/PRJ-795-freeze-shared-canonical-persona-figure-and-dashboard-pass.md`
- Manual checks:
  - verified there are no remaining active web-shell references to `aion-personality-figure-reference-v1.png`
  - 2026-05-03 closure sync reviewed `docs/ux/design-memory.md`,
    `docs/ux/flagship-baseline-transfer.md`, `web/src/App.tsx`,
    `web/src/index.css`, `.codex/context/TASK_BOARD.md`, and
    `.codex/context/PROJECT_STATE.md`
  - confirmed current source keeps `CANONICAL_PERSONA_FIGURE_SRC` for shared
    persona identity surfaces and approved route-specific hero assets for
    landing and dashboard
  - confirmed later `PRJ-796`, `PRJ-800F`, `PRJ-870`, `PRJ-871`, and
    `PRJ-875` carry active route adaptation and proof history
  - `git diff --check` passed
- Screenshots/logs:
  - frontend production build completed successfully
- High-risk checks:
  - landing, dashboard, personality, and sidebar still use decorative persona art without replacing primary controls

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
  - `C:/Users/wrobl/Desktop/UIUX/aion/aion-person.png`
- Canonical visual target:
  - shared persona continuity across flagship routes
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused:
  - embodied cognition motif
  - canonical authenticated sidebar spine
  - landing-first public entry
- New shared pattern introduced: yes
- Design-memory entry reused:
  - embodied cognition motif
- Design-memory update required: yes
- Visual gap audit completed: yes
- Background or decorative asset strategy:
  - reuse the approved raster persona asset instead of inventing route-local
    characters
- Canonical asset extraction required: yes
- Screenshot comparison pass completed: no
- Remaining mismatches:
  - chat still needs its own module-adapted persona pass
  - dashboard will still need deploy screenshot tuning after this first shared-asset pass
- State checks: success
- Responsive checks: desktop
- Input-mode checks: pointer | keyboard
- Accessibility checks:
  - persona art remains decorative and does not replace primary controls
- Parity evidence:
  - to be captured after the slice is built and reviewed locally or on deploy

## Deployment / Ops Evidence (required for runtime or infra tasks)
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: not applicable
- Rollback note:
  - revert the shared-asset swap if any route loses readability or composition balance

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
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
- This slice focuses on freezing the shared persona rule and applying it where
  current flagship routes already host an embodied figure.
- Later route-specific hero assets such as the approved landing and dashboard
  rasters are allowed when they preserve one coherent Aviary identity and
  adapt the props/crop to route purpose.

## 2026-05-03 Closure Sync

- This is a historical shared-persona freeze slice, no longer an active
  `IN_PROGRESS` task.
- Current durable rule lives in `docs/ux/design-memory.md`: reuse one approved
  Aviary persona family across flagship routes, then adapt crop, callout map,
  and supporting objects to the route context.
- Current source still exposes `CANONICAL_PERSONA_FIGURE_SRC` for shared
  persona identity surfaces, while `LANDING_HERO_ART_SRC` and
  `DASHBOARD_HERO_ART_SRC` represent later approved route-specific hero
  artwork derived from the same identity direction.
- Later proof owners:
  - `PRJ-796` chat shared-persona adaptation
  - `PRJ-800F` dashboard route-corrected hero artwork
  - `PRJ-870` dashboard `99%` evidence pass
  - `PRJ-871` personality `99%` canonical pass
  - `PRJ-875` final canonical UI route sweep

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
- Real API/service path used: yes
- Endpoint and client contract match: yes
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: yes
- Regression check performed:
  - current flagship routes still render their existing success-state content

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
  - froze the supplied `tools` persona as the shared canonical Aviary figure,
    updated UX source-of-truth to require cross-route reuse, and applied the
    first implementation pass across landing, sidebar, dashboard, and
    personality
- Files changed:
  - `docs/ux/design-memory.md`
  - `docs/ux/canonical-web-screen-reference-set.md`
  - `docs/ux/aion-visual-motif-system.md`
  - `docs/ux/background-and-decorative-asset-strategy.md`
  - `docs/ux/assets/aviary-persona-figure-canonical-reference-v1.png`
  - `web/public/aviary-persona-figure-canonical-reference-v1.png`
  - `web/src/App.tsx`
  - `web/src/index.css`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/tasks/PRJ-795-freeze-shared-canonical-persona-figure-and-dashboard-pass.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - focused `git diff --check`
  - active-reference check for the older personality figure path in the web shell
- What is incomplete:
  - chat still needs its own module-adapted pass using the same persona
  - dashboard note positions and crop still need screenshot-tuned refinement after deploy
- Next steps:
  - compare the deployed dashboard against the canonical reference
  - adapt the same persona into `chat` with route-specific composition instead of a different being
- Decisions made:
  - the shared canonical persona now comes from the user-approved `tools`
    artwork and supersedes the older route-local figure asset for current
    flagship reuse

## Closure Result Report

- Goal:
  - close stale `PRJ-795` after confirming shared persona continuity is now a
    durable design rule with later route-specific proof
- Scope:
  - task status, task evidence, and context sync only
- Implementation Plan:
  - verify current design memory and source constants
  - record later proof owners
  - mark the historical task done
  - update project context and task board
- Acceptance Criteria:
  - no stale `IN_PROGRESS` state remains for `PRJ-795`
  - shared persona continuity remains explicit
  - later route-specific hero assets are not mistaken for drift when they keep
    the same Aviary identity direction
- Definition of Done:
  - original validation evidence is preserved
  - current source review is recorded
  - later proof ownership is recorded
  - context files are updated
  - `git diff --check` passes
- Next:
  - review `PRJ-800F` dashboard editorial parity lane, which remains the next
    visible active flagship surface in the historical queue
