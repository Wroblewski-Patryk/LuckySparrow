# Task

## Header
- ID: PRJ-1209
- Title: Shared shell navigation proof and tablet polish
- Task Type: design
- Current Stage: post-release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1208
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-WEB-RESP-001
- Requirement Rows: not applicable
- Quality Scenario Rows: web responsive UX quality
- Risk Rows: navigation behavior proof gap
- Iteration: 1209
- Operation Mode: ARCHITECT
- Mission ID: MISSION-WEB-SHELL-1209
- Mission Status: DONE

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.
- [x] `.agents/core/project-memory-index.md` was reviewed in the active shell mission.
- [x] `.agents/core/mission-control.md` was reviewed in the active shell mission.
- [x] Missing or template-like state tables were bootstrapped from repository sources, or confirmed not needed.
- [x] Affected module confidence rows were identified.
- [x] Affected requirement, quality scenario, and risk rows were identified or marked not applicable.
- [x] The task or mission improves release confidence, not only local code appearance.

## Mission Block
- Mission objective: close the shared shell navigation proof gap and align tablet navigation with the new icon system.
- Release objective advanced: web-first responsive product shell quality.
- Included slices: mock-harness navigation interaction proof, tablet switcher icon polish, build/audit, state updates.
- Explicit exclusions: route content redesign, backend/API changes, production deployment.
- Checkpoint cadence: after implementation, after validation, before handoff.
- Stop conditions: build fails, route smoke fails, or navigation creates document-level horizontal overflow.
- Handoff expectation: navigation status upgraded with evidence or clearly blocked.

## Context
`PRJ-1208` improved the shared shell visually, but direct route-switch proof stayed pending because the Browser plugin failed on missing kernel assets and the real dev server stopped at the auth modal. The tablet switcher also still uses older text-pill styling.

## Goal
Add repeatable mock-harness interaction proof for mobile shell navigation and align tablet route switching with the same icon-and-label language.

## Success Signal
- User or operator problem: shared navigation should be trusted as functional, not only visually improved.
- Expected product or reliability outcome: mobile route switching is proven in the same mocked authenticated route-smoke environment used for responsive screenshots.
- How success will be observed: route smoke reports passing navigation interaction proof and responsive screenshots remain green.
- Post-launch learning needed: yes

## Deliverable For This Stage
Post-release evidence for navigation proof plus tablet switcher polish.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it
- keep repository artifacts in English

## Scope
- `web/scripts/route-smoke.mjs`
- `web/package.json`
- `web/src/components/shell.tsx`
- `web/src/App.tsx`
- `web/src/index.css`
- state/docs updates for task evidence

## Implementation Plan
1. Extend `route-smoke.mjs` with an optional authenticated mobile navigation interaction proof.
2. Add a package script for the navigation proof.
3. Update tablet `ShellRouteSwitcher` to reuse shell nav items and glyphs.
4. Restyle tablet switcher as an icon rail consistent with mobile and sidebar.
5. Run build, responsive audit, and navigation proof.
6. Review refreshed tablet/mobile screenshots.
7. Update source-of-truth state files.

## Acceptance Criteria
- Mock-harness mobile navigation proof clicks at least two route switches and verifies the expected route markers.
- Tablet switcher uses icon+label route items instead of old generic text pills.
- `npm run build` passes.
- `npm run audit:ui-responsive` passes.
- Navigation proof script passes.
- Cleanup confirms no validation server/headless browser leftovers.

## Definition of Done
- [x] Implementation is merged into the local workspace.
- [x] `npm run build` passes for `web`.
- [x] `npm run audit:ui-responsive` passes for `web`.
- [x] Navigation interaction proof passes for `web`.
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

## Result Report

- Task summary: added a repeatable route-smoke mobile navigation interaction proof and upgraded the tablet route switcher to reuse shared shell nav items, glyphs, and short labels.
- Files changed: `web/scripts/route-smoke.mjs`, `web/package.json`, `web/src/components/shell.tsx`, `web/src/App.tsx`, `web/src/index.css`, `.codex/tasks/PRJ-1209-shared-shell-navigation-proof-and-tablet.md`, `.codex/context/TASK_BOARD.md`, `.codex/context/PROJECT_STATE.md`, `.agents/state/current-focus.md`, `.agents/state/next-steps.md`, `.agents/state/system-health.md`, `.agents/state/module-confidence-ledger.md`, `docs/ux/design-memory.md`.
- How tested: `node --check scripts/route-smoke.mjs`; `npm run build`; `npm run audit:ui-responsive`; `npm run audit:ui-navigation`; screenshot review for desktop, tablet, and mobile Dashboard; cleanup check for `chrome_headless_shell` and port `5173`; `git diff --check`.
- What is incomplete: Browser plugin remains unavailable in this local runtime because of missing kernel assets, but the mock-authenticated Playwright route-smoke harness now provides the missing interaction proof.
- Next steps: continue route-local layout polish, especially Personality, Settings, Tools, and deeper Chat v5 convergence.
- Decisions made: route-smoke no longer waits for global `networkidle`; it uses `domcontentloaded` plus route markers because the SPA can keep network activity open while the target screen is already ready.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: mobile navigation visual proof exists, but route-switch interaction proof is missing; tablet switcher still uses older text-pill styling.
- Gaps: `AVIARY-WEB-RESP-001` was downgraded to `PARTIALLY_VERIFIED` by the missing interaction proof.
- Inconsistencies: desktop and mobile now share glyph language, while tablet does not.
- Architecture constraints: no route, API, data, or runtime behavior changes.

### 2. Select One Priority Mission Objective
- Selected task: PRJ-1209 shared shell navigation proof and tablet polish.
- Priority rationale: closes the residual acceptance gap from the user's layout critique.
- Why other candidates were deferred: route-local polish should wait until shared navigation is verified.

### 3. Plan Implementation
- Files or surfaces to modify: route-smoke script, package script, shell switchers, shared CSS.
- Logic: use the existing route-smoke mock server and Playwright path to click mobile nav buttons and verify route markers.
- Edge cases: horizontal rail items outside the first viewport, route labels with localized short names, mock-authenticated routes.

### 4. Execute Implementation
- Implementation notes: `ShellRouteSwitcher` now receives shared shell nav items and renders icon+label buttons; `route-smoke.mjs` supports `--navigation-proof`; `web/package.json` exposes `npm run audit:ui-navigation`; navigation proof waits for route markers after click.

### 5. Verify and Test
- Validation performed: `node --check scripts/route-smoke.mjs`; `npm run build`; `npm run audit:ui-responsive`; `npm run audit:ui-navigation`; desktop/tablet/mobile Dashboard screenshot review; validation process cleanup; `git diff --check`.
- Result: PASS. Responsive audit reported `route_count=14`, `viewport_count=3`, `screenshot_count=18`, `failed_count=0`. Navigation proof reported `status=ok`, `step_count=4`, `failed_count=0` for Chat, Settings, Personality, and Dashboard mobile route switches.

### 6. Self-Review
- Simpler option considered: only visually styling the tablet switcher, but that would not close the missing interaction proof.
- Technical debt introduced: none known; the proof extends the existing route-smoke harness instead of adding a parallel browser test system.
- Scalability assessment: the proof is opt-in and uses the existing mock-authenticated route table, so new routes can be added without changing the app runtime.
- Refinements made: replaced `networkidle` waits with `domcontentloaded` plus root/marker checks after the audit timed out on a healthy SPA.

### 7. Update Documentation and Knowledge
- Docs updated: `docs/ux/design-memory.md`.
- Context updated: `.codex/context/TASK_BOARD.md`, `.codex/context/PROJECT_STATE.md`, `.agents/state/current-focus.md`, `.agents/state/next-steps.md`, `.agents/state/system-health.md`, `.agents/state/module-confidence-ledger.md`.
- Learning journal updated: not applicable.
