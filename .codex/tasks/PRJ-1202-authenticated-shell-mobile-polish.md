# Task

## Header
- ID: PRJ-1202
- Title: Authenticated shell mobile polish
- Task Type: design
- Current Stage: post-release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1201
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-WEB-RESP-001
- Requirement Rows: not applicable
- Quality Scenario Rows: web responsive UX quality
- Risk Rows: visual parity drift
- Iteration: 1202
- Operation Mode: ARCHITECT
- Mission ID: MISSION-WEB-SHELL-1202
- Mission Status: DONE

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.
- [x] `.agents/core/project-memory-index.md` was reviewed in the active UI mission.
- [x] `.agents/core/mission-control.md` was reviewed in the active UI mission.
- [x] Missing or template-like state tables were bootstrapped from repository sources, or confirmed not needed.
- [x] Affected module confidence rows were identified.
- [x] Affected requirement, quality scenario, and risk rows were identified or marked not applicable.
- [x] The task or mission improves release confidence, not only local code appearance.

## Mission Block
- Mission objective: improve the authenticated shell mobile/tablet experience shared by dashboard, personality, settings, tools, and support routes.
- Release objective advanced: web-first responsive product shell quality.
- Included slices: screenshot audit, authenticated shell polish, responsive proof, state updates.
- Explicit exclusions: dashboard content rewrite, chat v5 body rewrite, backend/API/auth contract changes, production deployment.
- Checkpoint cadence: after audit, after implementation, after validation, before handoff.
- Stop conditions: build fails, responsive audit regresses, or shell changes conflict with canonical sidebar/mobile direction.
- Handoff expectation: concise shared-shell result, validation evidence, and next UX checkpoint.

## Context
After `PRJ-1201` improved public Home, the next visible issue across multiple routes is the authenticated shell. Current mobile/tablet screenshots show technical build copy in the first viewport and a stark fixed bottom tabbar that reads less premium than the canonical visual direction.

## Goal
Polish shared authenticated mobile chrome without changing route contracts or dashboard data composition.

## Success Signal
- User or operator problem: logged-in routes should feel like one premium Aviary shell, not a technical preview with debug-style chrome.
- Expected product or reliability outcome: mobile/tablet authenticated routes keep navigation reachable while feeling calmer and more consistent with the canonical shell.
- How success will be observed: refreshed screenshots show a non-technical mobile header and softer mobile nav; responsive audit passes.
- Post-launch learning needed: yes

## Deliverable For This Stage
Implemented authenticated shell polish plus validation evidence.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it
- keep repository artifacts in English

## Scope
- `web/src/App.tsx`
- `web/src/index.css`
- state/docs updates for task evidence

## Implementation Plan
1. Compare current dashboard screenshots against canonical sidebar/dashboard references.
2. Remove technical build text from authenticated mobile header first viewport.
3. Restyle mobile tabbar to use the Aviary material system instead of a stark black active pill.
4. Keep route navigation behavior unchanged.
5. Run build and responsive audit.
6. Update state docs with evidence and remaining UX gaps.

## Acceptance Criteria
- Authenticated mobile header no longer shows `build dev-local` style technical copy.
- Mobile tabbar uses softer Aviary materials and remains horizontally scrollable for the large route set.
- `npm run build` passes.
- `npm run audit:ui-responsive` passes.
- Cleanup confirms no validation server/headless browser leftovers.

## Definition of Done
- [x] Implementation is merged into the local workspace.
- [x] `npm run build` passes for `web`.
- [x] `npm run audit:ui-responsive` passes for `web`.
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

- Task summary: polished the shared authenticated mobile/tablet shell by
  removing technical build copy from the first viewport and restyling the
  fixed mobile tabbar with Aviary material styling and a teal active state.
- Files changed:
  - `web/src/App.tsx`
  - `web/src/index.css`
  - `.codex/tasks/PRJ-1202-authenticated-shell-mobile-polish.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.agents/state/current-focus.md`
  - `.agents/state/next-steps.md`
  - `.agents/state/system-health.md`
  - `.agents/state/module-confidence-ledger.md`
  - `docs/ux/design-memory.md`
- How tested:
  - `npm run build` in `web/` -> PASS
  - `npm run audit:ui-responsive` in `web/` -> `route_count=14`,
    `viewport_count=3`, `screenshot_count=18`, `failed_count=0`
  - screenshot review covered refreshed dashboard, personality, and settings
    mobile/tablet shell captures
  - cleanup check -> no active `chrome_headless_shell`; no listener on `5173`
  - `git diff --check` -> PASS with LF/CRLF warnings only
- What is incomplete: dashboard content composition still needs a route-local
  canonical convergence pass; the large authenticated route set remains a
  horizontally scrollable nav list on mobile by design.
- Next steps: continue with the dashboard canonical content pass before
  opening chat/personality route-local polish.
- Decisions made: shared shell chrome should not show technical build labels
  in the first viewport; mobile authenticated nav can remain horizontally
  scrollable, but it should use Aviary material styling instead of stark black
  chrome.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: authenticated mobile header exposes technical build copy in the first viewport; mobile tabbar active state is visually stark compared with the canonical warm shell.
- Gaps: authenticated shell mobile polish is behind public Home polish.
- Inconsistencies: visual direction asks for warm guidance and calm utility, while mobile chrome still feels partly diagnostic.
- Architecture constraints: route contracts and backend-owned data must stay unchanged.

### 2. Select One Priority Mission Objective
- Selected task: PRJ-1202 authenticated shell mobile polish.
- Priority rationale: improves multiple logged-in routes after Home without opening route-local dashboard rewrites.
- Why other candidates were deferred: dashboard canonical content composition remains a larger follow-up.

### 3. Plan Implementation
- Files or surfaces to modify: authenticated mobile header markup and shared mobile tabbar CSS.
- Logic: remove technical text, use existing copy/route label, restyle CSS only.
- Edge cases: mobile nav must remain reachable and horizontally scrollable; audit may still report offscreen tabbar children by design.

### 4. Execute Implementation
- Implementation notes: removed the mobile authenticated header build label
  from `web/src/App.tsx` and adjusted `.aion-mobile-tabbar` plus
  `.aion-mobile-tabbar-button` styling in `web/src/index.css`.

### 5. Verify and Test
- Validation performed: `npm run build`, `npm run audit:ui-responsive`,
  representative screenshot review, validation process cleanup check, and
  `git diff --check`.
- Result: PASS.

### 6. Self-Review
- Simpler option considered: removing only the build label would fix the most
  obvious first-viewport issue, but the bottom tabbar still affected every
  logged-in mobile route and was included in the same shared-shell slice.
- Technical debt introduced: none known; route behavior and API contracts were
  unchanged.
- Scalability assessment: styling is scoped to existing shared shell classes
  and keeps the current horizontal overflow model for a large route set.
- Refinements made: preserved navigation reachability while reducing visual
  contrast and aligning the active state with the approved Aviary material
  palette.

### 7. Update Documentation and Knowledge
- Docs updated: `docs/ux/design-memory.md`.
- Context updated: task board, project state, current focus, next steps,
  system health, and module confidence ledger.
- Learning journal updated: not applicable.
