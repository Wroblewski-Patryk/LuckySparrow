# Task

## Header
- ID: PRJ-869
- Title: Public Home Landing 99 Canonical Pass
- Task Type: design
- Current Stage: post-release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-868
- Priority: P0
- Coverage Ledger Rows: not applicable
- Iteration: 869
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
The user raised canonical convergence to `99%` and asked to restart from shared
public/private layout, then home, dashboard, and personality. `PRJ-868` closed
the shared shell foundation, so the next surface in the canonical workflow is
public home/landing.

## Goal
Bring the public home/landing first viewport materially closer to
`docs/ux/assets/aion-landing-canonical-reference-v1.png` while preserving the
existing public auth flow and landing hero asset.

## Success Signal
- User or operator problem: the public entry route still reads less canonical
  than the approved mockup.
- Expected product or reliability outcome: public home has a stronger browser
  frame, hero composition, proof band, and mobile continuation without changing
  runtime/API behavior.
  - 2026-05-03 supersession: browser/mockup frames in canonical images are
    preview context, not product UI. Current success should be judged on hero
    composition, proof rhythm, mobile continuation, and auth behavior without
    implementing browser chrome.
- How success will be observed: desktop and mobile screenshots compared against
  the canonical reference.
- Post-launch learning needed: no

## Deliverable For This Stage
Implement one focused public home/landing visual pass, then verify with build,
whitespace checks, and screenshot comparison before moving to dashboard.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new public shell systems
- do not change auth API behavior
- do not replace the approved landing hero raster asset with CSS approximations
- keep changes tiny, testable, and reversible

## Scope
- `web/src/App.tsx` if route structure needs a narrow markup adjustment
- `web/src/index.css`
- `.codex/tasks/PRJ-869-public-home-landing-99-pass.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Implementation Plan
1. Capture current desktop/mobile landing screenshots.
2. Compare against the canonical landing reference and record visible gaps.
3. Tighten the public first viewport, product framing, hero/proof rhythm, and
   mobile continuation using existing landing classes and assets.
4. Verify public auth modal still opens and layout has no horizontal overflow.
5. Run build, `git diff --check`, and screenshot comparison.

## Acceptance Criteria
- First viewport has a stronger canonical product-shell read without treating
  browser mockup chrome as implementation guidance.
- Hero copy, hero art, proof cards, and security strip align more closely with
  the approved landing reference.
- Mobile landing remains readable, with no content overlap or horizontal page
  overflow.
- Public auth modal behavior remains intact.
- No backend/API/data-contract changes are introduced.

## Definition of Done
- [x] Web build passes.
- [x] `git diff --check` passes.
- [x] Desktop and mobile landing screenshots are captured.
- [x] Auth modal smoke screenshot is captured.
- [x] Latest implementation screenshots are inspected with `view_image`.

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
- Tests: `Push-Location .\web; npm run build; Pop-Location` passed.
- Manual checks: desktop landing, mobile landing, and mobile auth modal were
  inspected against the approved canonical reference.
- Screenshots/logs:
  - `.codex/artifacts/prj869-public-home-landing-99-pass/landing-desktop-before-1568x1003.png`
  - `.codex/artifacts/prj869-public-home-landing-99-pass/landing-mobile-before-390x844.png`
  - `.codex/artifacts/prj869-public-home-landing-99-pass/landing-desktop-after-1568x1003-v3.png`
  - `.codex/artifacts/prj869-public-home-landing-99-pass/landing-mobile-after-390x844-v2.png`
  - `.codex/artifacts/prj869-public-home-landing-99-pass/landing-auth-modal-mobile-390x844-v2.png`
- High-risk checks: no runtime/data-contract changes in scope
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: not applicable

## Architecture Evidence
- Architecture source reviewed:
  - `docs/ux/canonical-visual-implementation-workflow.md`
  - `docs/ux/visual-direction-brief.md`
  - `docs/ux/screen-quality-checklist.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none expected

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: `docs/ux/assets/aion-landing-canonical-reference-v1.png`
- Canonical visual target: public home/landing first viewport
- Fidelity target: pixel_close
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: public landing shell and approved hero raster
- New shared pattern introduced: no
- Design-memory entry reused: canonical visual workflow sequencing
- Design-memory update required: no
- Visual gap audit completed: yes
- Background or decorative asset strategy: preserve approved raster asset
- Canonical asset extraction required: no
- Screenshot comparison pass completed: yes
- Remaining mismatches: exact canonical copy and exact illustrated figure are
  not pixel-identical because the route preserves the current approved
  AION/Aviary copy and raster asset. Browser chrome micro-icons from reference
  images are ignored as preview/mockup context per the 2026-05-03 user
  clarification recorded in `PRJ-782` and `docs/ux/design-memory.md`.
- State checks: loading | success
- Feedback locality checked: not applicable
- Raw technical errors hidden from end users: not applicable
- Responsive checks: desktop | mobile
- Input-mode checks: pointer | touch | keyboard
- Accessibility checks: semantic buttons/links preserved
- Parity evidence:
  - reference inspected:
    - `docs/ux/assets/aion-landing-canonical-reference-v1.png`
  - render inspected:
    - `.codex/artifacts/prj869-public-home-landing-99-pass/landing-desktop-after-1568x1003-v3.png`
    - `.codex/artifacts/prj869-public-home-landing-99-pass/landing-mobile-after-390x844-v2.png`
    - `.codex/artifacts/prj869-public-home-landing-99-pass/landing-auth-modal-mobile-390x844-v2.png`
  - comparison ledger:
    - historical browser-window container: this PR originally added desktop
      canonical frame, border, radius, chrome, address bar, and top
      `Landing Page` tag
    - 2026-05-03 supersession: browser chrome and address-bar treatment were
      later removed because canonical browser mockups are preview context, not
      product UI
    - first viewport rhythm: hero, feature bridge, proof copy, and trust strip
      now sit inside one framed composition
    - imagery: existing approved landing raster remains primary and is not
      replaced by CSS approximations
    - mobile: native full-width readability and no horizontal overflow were
      preserved
    - auth modal: public bootstrap no longer preloads a technical `/app/me`
      error into the modal before user action

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: not applicable
- Rollback note: revert public landing JSX/CSS changes
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

## Result Report
- Task summary: completed the public home/landing `99%` canonical pass with
  stronger first-viewport containment, mobile readability preservation, and
  cleaner public auth-modal startup. Historical browser-window framing from
  this task was superseded on 2026-05-03 by the explicit no-browser-mockup
  product decision.
- Files changed:
  - `web/src/App.tsx`
  - `web/src/index.css`
  - `.codex/tasks/PRJ-869-public-home-landing-99-pass.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `git diff --check -- web/src/App.tsx web/src/index.css .codex/tasks/PRJ-869-public-home-landing-99-pass.md`
  - Chrome CDP screenshots for desktop landing, mobile landing, and mobile
    auth modal
  - `view_image` inspection of the approved reference and latest renders
- What is incomplete: dashboard and personality `99%` route passes remain.
- Next steps: start dashboard `99%` canonical pass after this public home
  surface.
- Decisions made:
  - historical: desktop used the canonical browser-window mockup and mobile
    kept a native full-width flow because the browser frame would reduce
    readability
  - 2026-05-03 supersession: browser-window mockups in canonical images are
    generated preview context and must be ignored in implementation

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: public home needed stronger canonical composition and auth modal
  could inherit a technical bootstrap error. Historical concern about lacking a
  browser-window mockup is superseded by the 2026-05-03 no-browser-mockup
  decision.
- Gaps: public home needed a dedicated `99%` pass after shared shell foundation.
- Inconsistencies: desktop lacked the then-targeted canonical frame/chrome
  while mobile already used a native flow. This framing target was superseded
  on 2026-05-03.
- Architecture constraints: public landing only; no auth/API changes.

### 2. Select One Priority Task
- Selected task: public home/landing 99 canonical pass.
- Priority rationale: canonical workflow closes public home before dashboard and
  personality.
- Why other candidates were deferred: dashboard/personality depend on the
  shared foundation and should wait for public home closure.

### 3. Plan Implementation
- Files or surfaces to modify: public landing JSX/CSS only if needed.
- Logic: no runtime logic changes expected.
- Edge cases: mobile hero overlap, auth modal, horizontal overflow.

### 4. Execute Implementation
- Implementation notes: historically added desktop canonical landing tag,
  browser chrome, framed public window treatment, tightened first-viewport
  height/bridge rhythm, preserved the existing landing raster asset, hid the
  desktop mockup frame on mobile, and prevented public bootstrap errors from
  preloading into auth. The browser chrome and mockup-frame treatment were
  later removed after user clarification.

### 5. Verify and Test
- Validation performed: web build, diff whitespace check, Chrome CDP screenshot
  pass, and direct `view_image` inspection.
- Result: passed for the historical slice; latest desktop render at that time
  showed the then-targeted browser chrome and `bodyWidth` did not exceed
  viewport width. Latest mobile auth modal showed no preloaded `Request failed
  with status 500` error. The browser chrome expectation is now superseded.

### 6. Self-Review
- Simpler option considered: CSS-only first-viewport spacing without browser
  chrome; originally rejected because the approved landing reference appeared
  to structurally depend on the browser mockup frame. This rejection is
  superseded by the 2026-05-03 user clarification that browser frames in
  canonical images are preview context.
- Technical debt introduced: none expected; changes stay within existing public
  landing components and styles.
- Refinements made: fixed the top tag number rendering and cleaned public auth
  modal startup error presentation.

### 7. Update Documentation and Knowledge
- Docs updated: task contract, task board, and project state.
- Context updated: yes.

## 2026-05-03 Supersession Note

- User clarified that browser chrome in canonical images is generated
  browser/mockup preview context and must be ignored in implementation.
- `PRJ-782` removed public `aion-public-browser-*` chrome and updated
  `docs/ux/design-memory.md` with the durable rule.
- This task remains `DONE` as landing proof history, but its browser-frame
  wording is historical and no longer guides implementation.
- Learning journal updated: not required; no recurring pitfall was confirmed.
