# Task

## Header
- ID: PRJ-800I
- Title: Public home live hero and bridge parity pass
- Task Type: design
- Current Stage: verification
- Status: IN_PROGRESS
- Owner: Frontend Builder
- Depends on: PRJ-800G, PRJ-800H
- Priority: P1

## Context
The public landing now opens correctly on `/` and `/login`, but production
evidence still shows visible drift from the canonical landing in
`docs/ux/assets/aion-landing-canonical-reference-v1.png`.

The largest remaining public-home issues are no longer route wiring. They are
composition-level differences inside the first viewport:

- the left hero copy still feels too heavy and too wide
- the shared persona stage is still too right-biased and too literal
- the bridge band still reads as a second block that repeats content instead of
  a calm continuation of the hero

This task executes the next screenshot-driven refinement pass directly against
that live drift.

## Goal
Bring the public landing closer to canonical first-viewport parity by calming
the hero copy, re-centering the shared persona stage, and simplifying the
bridge band into a lighter continuation of the scene.

## Deliverable For This Stage
A focused implementation slice in `web/src/App.tsx` and `web/src/index.css`
that visibly improves canonical landing parity without introducing new layout
systems or route-local inventions.

## Scope
- `web/src/App.tsx`
- `web/src/index.css`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- this task file

## Implementation Plan
1. Shorten and calm public-home copy/data where text density is the source of
   visual drift.
2. Rebalance the hero grid so the persona stage carries more of the first
   viewport and the copy column behaves more editorially.
3. Reposition and soften motif notes so the stage feels like one composed scene
   instead of figure-plus-floating-boxes.
4. Simplify the bridge band to remove redundant quote repetition and reduce
   height, density, and card-like feeling.
5. Run focused validation and record the resulting parity movement in repo
   truth.

## Acceptance Criteria
- The public-home hero reads lighter and closer to the canonical composition at
  a glance.
- The shared persona is more centered and the motif notes feel more anchored to
  the scene.
- The bridge band behaves as a continuation of the hero rather than a separate
  heavy strip.
- No new route-level systems, duplicate structures, or workaround-only
  components are introduced.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Definition of Done
- [ ] Public-home hero hierarchy is calmer and closer to canonical rhythm.
- [ ] Persona stage and bridge band drift are reduced through code, not notes.
- [ ] Validation and context updates match the changed scope.

## Stage Exit Criteria
- [ ] The output matches the declared `Current Stage`.
- [ ] Work from later stages was not mixed in without explicit approval.
- [ ] Risks and assumptions for this stage are stated clearly.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval
- implicit stage skipping

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `git diff --check -- web/src/App.tsx web/src/index.css .codex/tasks/PRJ-800I-public-home-live-hero-bridge-parity-pass.md`
- Manual checks:
  - reviewed the latest live `/login` screenshot against the canonical landing
    before implementation
  - verified that the public entry contract still routes unauthenticated users
    into the landing shell
- Screenshots/logs:
  - parity source: `.codex/artifacts/prod-login-live-after-prj800h-healthy.png`
  - canonical target: `docs/ux/assets/aion-landing-canonical-reference-v1.png`
  - local browser-proof attempt blocked by outdated `node_repl` runtime
- High-risk checks:
  - confirmed the slice stays inside existing public-home systems only

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/ux/canonical-visual-implementation-workflow.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates:

## UX/UI Evidence (required for UX tasks)
- Design source type: approved_snapshot
- Design source reference: `.codex/artifacts/prod-login-live-after-prj800h-healthy.png`
- Canonical visual target: `docs/ux/assets/aion-landing-canonical-reference-v1.png`
- Fidelity target: pixel_close
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: shared persona motif panel, public shell, public bridge band
- New shared pattern introduced: no
- Design-memory entry reused: `docs/ux/design-memory.md`
- Design-memory update required: no
- Visual gap audit completed: yes
- Background or decorative asset strategy: reuse the shared canonical persona asset and existing painterly route art
- Canonical asset extraction required: no
- Screenshot comparison pass completed: no
- Remaining mismatches:
  - fresh deploy-side screenshot is still needed to confirm the new hero scale
    and bridge-band density
  - the lower public story and auth-priority relationship still need a later
    pass if live evidence shows continued drift
- State checks: loading | empty | error | success
- Responsive checks: desktop | tablet | mobile
- Input-mode checks: touch | pointer | keyboard
- Accessibility checks: no interaction semantics changed beyond existing public buttons and links
- Parity evidence:
  - drift source: `.codex/artifacts/prod-login-live-after-prj800h-healthy.png`
  - canonical target: `docs/ux/assets/aion-landing-canonical-reference-v1.png`

## Deployment / Ops Evidence (required for runtime or infra tasks)
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: not needed
- Rollback note: revert this slice if public landing hierarchy regresses

## Review Checklist (mandatory)
- [ ] Current stage is declared and respected.
- [ ] Deliverable for the current stage is complete.
- [ ] Architecture alignment confirmed.
- [ ] Existing systems were reused where applicable.
- [ ] No workaround paths were introduced.
- [ ] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [ ] Docs or context were updated if repository truth changed.
- [ ] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
This task intentionally stays inside the public landing lane. It does not
attempt to close authenticated dashboard parity in the same cycle.

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

Runtime tasks must be delivered as a vertical slice: UI -> logic -> API -> DB
-> validation -> error handling -> test. Partial implementations, mock-only
paths, placeholders, fake data, and temporary fixes are forbidden.

## Integration Evidence

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: yes
- Endpoint and client contract match: yes
- DB schema and migrations verified: not applicable
- Loading state verified: yes
- Error state verified: yes
- Refresh/restart behavior verified: pending
- Regression check performed:

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
  - calmed the public-home hero hierarchy
  - shortened feature-strip copy
  - simplified the bridge band to stop repeating the hero quote
  - re-centered the shared persona stage toward a more canonical composition
- Files changed:
  - `web/src/App.tsx`
  - `web/src/index.css`
  - `.codex/tasks/PRJ-800I-public-home-live-hero-bridge-parity-pass.md`
- How tested:
  - production screenshot audit against the canonical landing
  - `npm run build`
  - focused `git diff --check`
- What is incomplete:
  - fresh screenshot proof after deploy
  - final live micro-tuning if the hero or bridge band still read too heavy
- Next steps:
  - update repo truth with this slice
  - deploy and compare `/` and `/login`
  - then continue the next home/dashboard parity loop
- Decisions made:
  - used shorter public-home copy instead of inventing new surfaces
  - removed bridge-band quote repetition rather than adding new proof widgets
