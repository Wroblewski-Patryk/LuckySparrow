# Task

## Header
- ID: PRJ-1208
- Title: Shared shell navigation layout polish
- Task Type: design
- Current Stage: post-release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1207
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-WEB-RESP-001
- Requirement Rows: not applicable
- Quality Scenario Rows: web responsive UX quality
- Risk Rows: sidebar and mobile menu usability
- Iteration: 1208
- Operation Mode: BUILDER
- Mission ID: MISSION-WEB-SHELL-1208
- Mission Status: DONE

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
- Mission objective: improve the shared web shell navigation before deeper route-local polishing.
- Release objective advanced: web-first responsive product shell quality.
- Included slices: desktop sidebar polish, mobile menu polish, responsive build/audit, screenshot review, state updates.
- Explicit exclusions: route content redesign, backend/API changes, production deployment.
- Checkpoint cadence: after inspection, after implementation, after validation, before handoff.
- Stop conditions: build fails, responsive audit regresses, or navigation creates document-level horizontal overflow.
- Handoff expectation: concise layout result, validation evidence, and next route-local checkpoint.

## Context
The user called out that the sidebar and mobile menu feel weak. This is shared product chrome and should be improved before continuing route-local polishing.

## Goal
Make desktop sidebar and mobile route navigation feel calmer, more intentional, and easier to scan across the current web breakpoints.

## Success Signal
- User or operator problem: navigation should feel like polished product chrome, not a cramped list of pills.
- Expected product or reliability outcome: shared layout is more stable before route-level UI polish continues.
- How success will be observed: refreshed desktop/mobile screenshots and responsive audit pass.
- Post-launch learning needed: yes

## Deliverable For This Stage
Implemented shared shell navigation polish plus validation evidence.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it
- keep repository artifacts in English

## Scope
- `web/src/components/shell.tsx`
- `web/src/App.tsx`
- `web/src/index.css`
- state/docs updates for task evidence

## Implementation Plan
1. Add mobile-specific short route labels while preserving accessible full labels.
2. Add route icons to the mobile navigation using the existing shell glyph set.
3. Restyle the mobile menu as a compact dock instead of text-only pills.
4. Refine desktop sidebar spacing and active state to reduce visual heaviness.
5. Run build and responsive route audit.
6. Review refreshed desktop and mobile screenshots.
7. Update source-of-truth state files with evidence.

## Acceptance Criteria
- Mobile menu shows compact icon+label items and avoids clipped long route text.
- Desktop sidebar is visually calmer and easier to scan.
- Existing route navigation behavior is preserved.
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

- Task summary: shared navigation now uses a lighter desktop sidebar and a
  mobile in-header icon rail with short localized labels, replacing the
  previous bottom overlay dock that could cover content.
- Files changed: `web/src/components/shell.tsx`, `web/src/App.tsx`,
  `web/src/index.css`, `.codex/tasks/PRJ-1208-shared-shell-navigation-layout.md`,
  `.codex/context/TASK_BOARD.md`, `.codex/context/PROJECT_STATE.md`,
  `.agents/state/current-focus.md`, `.agents/state/next-steps.md`,
  `.agents/state/system-health.md`, `.agents/state/module-confidence-ledger.md`,
  `docs/ux/design-memory.md`.
- How tested: `npm run build` in `web/` -> PASS; `npm run audit:ui-responsive`
  -> `route_count=14`, `viewport_count=3`, `screenshot_count=18`,
  `failed_count=0`; refreshed desktop Dashboard plus mobile Dashboard/Chat
  screenshots reviewed; Browser plugin attempt failed on missing kernel assets,
  so local Playwright fallback was attempted for interaction proof but the real
  dev server stopped at the auth modal; cleanup found no active
  `chrome_headless_shell` and no listener on `5173`; `git diff --check` -> PASS
  with LF/CRLF warnings only.
- What is incomplete: route-switch interaction proof should be added against
  the mock route-smoke harness or an authenticated local session; tablet
  secondary route switcher still uses the older text-pill style.
- Next steps: polish tablet route switcher, then continue route-local
  Personality/Settings/Tools layout passes.
- Decisions made: mobile route navigation now lives in the header flow rather
  than as a fixed bottom overlay.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: mobile menu is text-only and cramped, and desktop sidebar feels heavy relative to the calm canonical shell direction.
- Gaps: shared navigation polish lags behind the route-local Home/Dashboard/Chat/Personality work.
- Inconsistencies: sidebar already has glyphs, while mobile navigation does not reuse them.
- Architecture constraints: no route, API, data, or runtime behavior changes.

### 2. Select One Priority Mission Objective
- Selected task: PRJ-1208 shared shell navigation layout polish.
- Priority rationale: shared chrome affects every authenticated route and should be stable before deeper route-local polish.
- Why other candidates were deferred: route-local content polish is lower leverage until the shell navigation feels correct.

### 3. Plan Implementation
- Files or surfaces to modify: shell component, route label helper, shared shell CSS.
- Logic: reuse existing shell nav item data and glyphs for mobile, add short labels, preserve full labels through accessible labels.
- Edge cases: long localized route labels, horizontal mobile dock overflow, active-route scroll behavior.

### 4. Execute Implementation
- Implementation notes: reused `ShellNavButtonItem` and the existing sidebar
  glyph set for mobile navigation; added short mobile route labels; restyled
  the sidebar with tighter spacing and a lighter active state; moved mobile
  navigation into the header flow.

### 5. Verify and Test
- Validation performed: `npm run build`; `npm run audit:ui-responsive`;
  refreshed desktop/mobile screenshot review; Browser plugin attempt; local
  Playwright fallback attempt; validation cleanup; `git diff --check`.
- Result: PARTIALLY_VERIFIED. Build, responsive route rendering, screenshots,
  and cleanup passed. Direct route-switch interaction proof was blocked by the
  real dev server auth modal and should be covered in a future mock-harness or
  authenticated-session check.

### 6. Self-Review
- Simpler option considered: keeping the fixed bottom dock and only adding
  icons was rejected after screenshot review showed it could still cover
  content.
- Technical debt introduced: tablet route switcher still uses older text-pill
  styling.
- Scalability assessment: short labels and icons make the mobile rail more
  tolerant of the large route count, while preserving accessible full labels.
- Refinements made: moved mobile navigation into the header flow and removed
  the previous Personality-specific fixed-nav clearance.

### 7. Update Documentation and Knowledge
- Docs updated: `docs/ux/design-memory.md`.
- Context updated: task board, project state, current focus, next steps,
  system health, and module confidence ledger.
- Learning journal updated: not applicable.
