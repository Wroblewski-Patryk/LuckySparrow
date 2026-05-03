# Task

## Header
- ID: PRJ-820
- Title: Home Live Crop And Closure Pass
- Task Type: design
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-819
- Priority: P1

## Context
The public `home` surface already uses the full-bleed shell and route-correct
landing artwork, but the latest live reading still shows a small amount of
wide-screen drift in the scenic crop, note-card placement, and the closure
rhythm between `feature bridge` and `trust band`.

## Goal
Close one more bounded `home`-only parity slice by refining scenic crop,
desktop copy width, note-card placement, and lower closure spacing without
opening new structure or touching other flagship surfaces.

## Success Signal
- User or operator problem:
  - the landing still feels slightly too inset and card-like on wide screens
- Expected product or reliability outcome:
  - the hero reads more like one calm scenic composition, with tighter copy,
    quieter notes, and a better connected lower closure
- How success will be observed:
  - desktop `home` keeps stronger scenic authority and calmer `bridge + trust`
    rhythm after build validation
- Post-launch learning needed: no

## Deliverable For This Stage
A CSS-only refinement pass plus source-of-truth updates describing the new
`home` crop and closure tuning.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Scope
- `web/src/index.css`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Implementation Plan
1. Tighten the desktop public-nav and hero-copy width so the scenic stage gains
   more authority.
2. Retune the landing-scene crop and note-card positions to better match the
   canonical home reading on wide screens.
3. Narrow and slightly raise `feature bridge` and `trust band` so the lower
   closure reads like one continuation.
4. Run focused build and diff validation, then sync task board and project
   state.

## Acceptance Criteria
- `home` desktop hero has a stronger scenic crop and calmer note-card rhythm
- `feature bridge` and `trust band` feel more connected and less card-heavy
- no JSX structure changes are required for this slice
- focused validation passes

## Definition of Done
- [x] `home` crop and closure CSS refinements are implemented
- [x] task board and project state describe the bounded slice
- [x] focused validation evidence is recorded

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
  - reviewed the desktop `home` CSS structure against the current canonical
    crop target before applying the slice
- Screenshots/logs:
  - build completed successfully after the CSS-only pass
- High-risk checks:
  - `git diff --check -- web/src/index.css .codex/tasks/PRJ-820-home-live-crop-and-closure-pass.md .codex/context/TASK_BOARD.md .codex/context/PROJECT_STATE.md`

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/ux/canonical-visual-implementation-workflow.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates:

## UX/UI Evidence (required for UX tasks)
- Design source type: approved_snapshot
- Design source reference: `docs/ux/assets/aion-landing-canonical-reference-v1.png`
- Canonical visual target: `home`
- Fidelity target: pixel_close
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: full-bleed public shell and scenic landing hero
- New shared pattern introduced: no
- Design-memory entry reused: yes
- Design-memory update required: no
- Visual gap audit completed: yes
- Background or decorative asset strategy: reuse route-specific landing hero art
- Canonical asset extraction required: no
- Screenshot comparison pass completed: no
- Remaining mismatches: live proof still needed after deploy
- State checks: success
- Feedback locality checked: yes
- Raw technical errors hidden from end users: yes
- Responsive checks: desktop
- Input-mode checks: pointer
- Accessibility checks: not in this bounded visual slice
- Parity evidence:

## Deployment / Ops Evidence (required for runtime or infra tasks)
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: revert CSS-only slice if scenic rhythm regresses
- Observability or alerting impact: none
- Staged rollout or feature flag: no

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
- [x] Learning journal update was not required; no new recurring pitfall was
  confirmed in this closure sync.

## Notes
This slice stays strictly on `home` and should be followed by a live compare
before opening another flagship surface.

## Closure Sync - 2026-05-03

- Current release status:
  - DONE as a historical public-home CSS refinement slice.
- Current source truth:
  - `web/src/App.tsx` keeps `LANDING_HERO_ART_SRC`,
    `aion-public-hero`, `aion-public-feature-bridge`, and
    `aion-public-trust-band` as the public-home structure.
  - `web/src/index.css` keeps the route-local crop, copy-width, note-card,
    feature-bridge, and trust-band refinements from this slice.
- Superseding proof owners:
  - `PRJ-869` public home landing `99%` canonical pass.
  - `PRJ-875` canonical UI final route sweep.
  - `PRJ-782` shell-frame decision resolution.
- Browser/mockup note:
  - any older canonical screenshot browser frame is presentation context only.
  - product UI must stay free of simulated browser controls, title bars, or
    fake window chrome.
- Closure evidence:
  - reviewed this task history, current public landing source, design memory,
    user clarification, and later project/board proof.
  - `Select-String -Path web\src\App.tsx,web\src\index.css -Pattern
    "aion-public-browser|WindowChrome|aion-window-chrome"` returned no
    matches in the current source.
  - no runtime files were changed by this closure sync.

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

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: public visitors and authenticated users entering via `/`
- Existing workaround or pain: the landing still feels slightly too inset on wide screens
- Smallest useful slice: CSS-only crop and closure refinement
- Success metric or signal: calmer scenic read and stronger continuity between hero and closure
- Feature flag, staged rollout, or disable path: no
- Post-launch feedback or metric check: visual deploy check

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: first public landing impression
- SLI: visual parity only
- SLO: not applicable
- Error budget posture: not applicable
- Health/readiness check: not applicable
- Logs, dashboard, or alert route: not applicable
- Smoke command or manual smoke: `Push-Location .\web; npm run build; Pop-Location`
- Rollback or disable path: revert CSS changes

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: not applicable
- Endpoint and client contract match: not applicable
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: not applicable
- Regression check performed: focused CSS/build validation

## AI Testing Evidence (required for AI features)

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: none
- Trust boundaries: unchanged
- Permission or ownership checks: not applicable
- Abuse cases: not applicable
- Secret handling: none
- Security tests or scans: not applicable
- Fail-closed behavior: not applicable
- Residual risk: low

- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios:
- Multi-step context scenarios:
- Adversarial or role-break scenarios:
- Prompt injection checks:
- Data leakage and unauthorized access checks:
- Result:

## Result Report

- Task summary:
  - performed one bounded `home`-only crop and closure refinement pass focused
    on wide-screen hero authority and lower continuation rhythm
- Files changed:
  - `web/src/index.css`
  - `.codex/tasks/PRJ-820-home-live-crop-and-closure-pass.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `git diff --check -- web/src/index.css .codex/tasks/PRJ-820-home-live-crop-and-closure-pass.md .codex/context/TASK_BOARD.md .codex/context/PROJECT_STATE.md`
- What is incomplete:
  - deploy-side screenshot proof still needs to confirm whether one final
    `home` micro-pass is necessary
- Next steps:
  - compare the deployed `home`
  - if note positions or crop still drift, do one final visual-only pass
- Decisions made:
  - kept the slice CSS-only to respect the current one-surface-at-a-time
    parity loop and avoid reopening structure changes
