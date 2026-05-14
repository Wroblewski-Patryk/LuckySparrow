# Task

## Header
- ID: PRJ-1201
- Title: Public home canonical polish and UX gap list
- Task Type: design
- Current Stage: post-release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1200
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-WEB-RESP-001
- Requirement Rows: not applicable
- Quality Scenario Rows: web responsive UX quality
- Risk Rows: visual parity drift
- Iteration: 1201
- Operation Mode: BUILDER
- Mission ID: MISSION-WEB-HOME-1201
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
- Mission objective: improve the public Home surface against the approved landing reference while recording the next UX/UI planning gaps.
- Release objective advanced: web-first responsive product shell quality.
- Included slices: Home source audit, first Home polish, responsive proof, browser proof, state updates.
- Explicit exclusions: authenticated dashboard rewrite, chat/personality route polish, backend/API/auth contract changes, production deployment.
- Checkpoint cadence: after audit, after implementation, after validation, before handoff.
- Stop conditions: canonical references conflict with user feedback, build fails, responsive audit regresses, or browser proof cannot render.
- Handoff expectation: concise UX gap list, changed files, validation evidence, and next checkpoint.

## Context
The user asked to continue web UI/UX work, check whether app-building best practices are preserved, use the canonical beautiful images and notes, and start by making Home beautiful. Current scope is web across mobile, tablet, and desktop breakpoints.

## Goal
Make the unauthenticated public Home surface more faithful to the canonical landing direction and leave a prioritized list of remaining UX/UI improvement gaps.

## Success Signal
- User or operator problem: Home should not feel like a temporary auth panel or a framed mockup artifact.
- Expected product or reliability outcome: Home reads as a polished landing-first Aviary entry with clear actions, real navigation anchors, and preserved canonical artwork.
- How success will be observed: desktop/tablet/mobile screenshots render without overflow, build passes, and Browser proof can open the public Home.
- Post-launch learning needed: yes

## Deliverable For This Stage
An implemented Home polish slice with task evidence and a planning list for follow-up UX/UI changes.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it
- keep repository artifacts in English
- preserve the canonical landing raster asset rather than replacing it with CSS approximation

## Scope
- `web/src/App.tsx`
- `web/src/components/public-shell.tsx`
- `web/src/components/shell.tsx`
- `web/src/index.css`
- `.codex/context/*` and `.agents/state/*` task/state updates

## Implementation Plan
1. Compare current Home screenshot against `docs/ux/assets/aion-landing-canonical-reference-v1.png` and `docs/ux/assets/aviary-landing-hero-canonical-reference-v1.png`.
2. Remove presentation-only landing tag and reduce nested-window framing on public Home.
3. Convert public nav labels into real section anchors.
4. Align the visible wordmark with the Aviary product-name source of truth.
5. Add focused interaction polish for public actions and anchors.
6. Run build, responsive audit, and Browser proof.
7. Update task/state docs with evidence and remaining UX gaps.

## Acceptance Criteria
- Public Home keeps the canonical landing hero artwork as the primary scenic asset.
- Public Home no longer shows the `Landing Page` presentation label in the running UI.
- Public navigation anchors move to real sections.
- Desktop/tablet/mobile responsive audit passes.
- Browser proof opens Home and exercises the auth modal path.

## Definition of Done
- [x] Implementation is merged into the local workspace.
- [x] `npm run build` passes for `web`.
- [x] `npm run audit:ui-responsive` passes for `web`.
- [x] Browser/IAB proof is recorded or a fallback proof is recorded after a Browser plugin attempt.
- [x] Source-of-truth state files are updated.

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

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: `docs/ux/assets/aion-landing-canonical-reference-v1.png`; `docs/ux/assets/aviary-landing-hero-canonical-reference-v1.png`
- Canonical visual target: public landing
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: public shell, MotifFigurePanel, canonical raster hero, trust band
- New shared pattern introduced: no
- Design-memory entry reused: Landing-first public entry; Public auth as modal continuation; Landing hero stage composition; Frame-first flagship shell
- Design-memory update required: yes
- Visual gap audit completed: yes
- Background or decorative asset strategy: preserve canonical raster artwork; no gradient replacement
- Canonical asset extraction required: no
- Screenshot comparison pass completed: yes
- Remaining mismatches: Home is structurally closer, but future parity work should deepen the public proof/social rhythm and then move to authenticated shell/dashboard convergence.
- State checks: success
- Feedback locality checked: yes
- Raw technical errors hidden from end users: not applicable
- Responsive checks: desktop | tablet | mobile
- Input-mode checks: pointer | keyboard focus-visible styles
- Accessibility checks: route audit reports `unnamedInteractiveCount=0`
- Parity evidence: `.codex/artifacts/prj1150-v11-ui-responsive-audit/desktop-home.png`; `.codex/artifacts/prj1150-v11-ui-responsive-audit/tablet-home.png`; `.codex/artifacts/prj1150-v11-ui-responsive-audit/mobile-home.png`; `.codex/artifacts/prj1201-home-browser-proof.png`

## Result Report

- Task summary: polished public Home toward the canonical landing reference by removing presentation-only UI, dropping the nested-window frame, preserving the scenic raster hero, wiring real nav anchors, aligning the wordmark to Aviary, and localizing auth placeholders.
- Files changed: `web/src/App.tsx`; `web/src/components/public-shell.tsx`; `web/src/components/shell.tsx`; `web/src/index.css`; `.codex/context/TASK_BOARD.md`; `.codex/context/PROJECT_STATE.md`; `.agents/state/current-focus.md`; `.agents/state/next-steps.md`; `.agents/state/system-health.md`; `.agents/state/module-confidence-ledger.md`; `docs/ux/design-memory.md`; `.codex/tasks/PRJ-1201-public-home-canonical-polish.md`.
- How tested: `npm run build`; `npm run audit:ui-responsive`; Browser plugin attempt; Playwright fallback proof for Home render and CTA -> register modal; cleanup checks for `5173` and `chrome-headless-shell`.
- What is incomplete: full 95% landing parity still needs richer proof/social section depth and later authenticated shell/dashboard canonical convergence.
- Next steps: continue public landing section depth or move to authenticated shell/dashboard canonical convergence.
- Decisions made: canonical-reference labels are presentation context, not production UI; tablet hero micro-proof should show fewer items rather than overlap callouts.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: current Home is visually strong but still carries a visible canonical presentation tag and a large framed-window treatment, while design memory asks for full-width public shell framing without fake mockup chrome.
- Gaps: public nav labels all point to the same `#aviary-home` anchor; Home parity has not been refreshed after PRJ-1200.
- Inconsistencies: product source-of-truth says Aviary, while the visible wordmark still renders `AION`.
- Architecture constraints: public Home is the unauthenticated `!me` branch in `web/src/App.tsx`; auth remains modal continuation.

### 2. Select One Priority Mission Objective
- Selected task: PRJ-1201 public Home canonical polish.
- Priority rationale: the user explicitly selected Home as the first web UI/UX surface.
- Why other candidates were deferred: dashboard, chat, and shell convergence are larger dependent follow-ups.

### 3. Plan Implementation
- Files or surfaces to modify: public Home React markup, public-shell component types, shell wordmark, public Home CSS, state docs.
- Logic: preserve current data-free public surface; improve structure, anchors, and visual framing only.
- Edge cases: mobile nav wrapping, button focus, modal opening path, screenshot overflow.

### 4. Execute Implementation
- Implementation notes: removed `aion-public-canonical-tag` from the public Home markup and CSS; turned nav labels into `{ label, href }` items; gave feature/proof/trust sections stable anchors; updated the shared wordmark to `AVIARY`; removed desktop public nested-window framing; tuned tablet hero spacing and micro-proof density; added focus-visible treatment; localized auth placeholders.

### 5. Verify and Test
- Validation performed: `Push-Location .\web; npm run build; ...`; `Push-Location .\web; npm run audit:ui-responsive; ...`; Browser plugin setup attempt; Playwright fallback proof at `http://127.0.0.1:5173/`.
- Result: verified. Build passed; responsive audit passed with `route_count=14`, `viewport_count=3`, `screenshot_count=18`, `failed_count=0`; fallback proof returned `wordmark=AVIARY`, nav hrefs for features/proof/trust, Polish placeholders, modal title `Załóż konto`, and `unnamedButtons=0`.

### 6. Self-Review
- Simpler option considered: only removing the tag; rejected because nav anchors, language placeholders, and tablet overlap were part of the same visible Home polish.
- Technical debt introduced: no
- Scalability assessment: changes reuse the existing public shell, MotifFigurePanel, trust band, and copy model; no new design system was introduced.
- Refinements made: fixed tablet nav/headline overlap and tablet micro-proof/callout overlap after screenshot review.

### 7. Update Documentation and Knowledge
- Docs updated: `docs/ux/design-memory.md`
- Context updated: `.codex/context/TASK_BOARD.md`; `.codex/context/PROJECT_STATE.md`; `.agents/state/current-focus.md`; `.agents/state/next-steps.md`; `.agents/state/system-health.md`; `.agents/state/module-confidence-ledger.md`
- Learning journal updated: not applicable.
