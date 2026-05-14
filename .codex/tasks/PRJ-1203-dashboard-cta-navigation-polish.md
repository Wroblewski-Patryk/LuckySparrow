# Task

## Header
- ID: PRJ-1203
- Title: Dashboard CTA navigation polish
- Task Type: design
- Current Stage: post-release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1202
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-WEB-RESP-001
- Requirement Rows: not applicable
- Quality Scenario Rows: web responsive UX quality
- Risk Rows: visual affordance mismatch
- Iteration: 1203
- Operation Mode: BUILDER
- Mission ID: MISSION-WEB-DASHBOARD-1203
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
- Mission objective: make dashboard calls to action behave like real navigation in the existing web route system.
- Release objective advanced: web-first responsive product shell quality.
- Included slices: CTA audit, route wiring, build and responsive proof, state updates.
- Explicit exclusions: new routes, backend/API changes, dashboard data contract changes, production deployment.
- Checkpoint cadence: after audit, after implementation, after validation, before handoff.
- Stop conditions: build fails, responsive audit regresses, or CTA routing would require a new route contract.
- Handoff expectation: concise dashboard UX result, validation evidence, and next route-local visual checkpoint.

## Context
After `PRJ-1201` and `PRJ-1202`, the public Home and shared authenticated chrome are improved. The dashboard still includes several visible buttons that look actionable but do not route anywhere, which weakens the logged-in experience.

## Goal
Wire existing dashboard CTA affordances to existing routes without changing product routes, API contracts, or backend behavior.

## Success Signal
- User or operator problem: dashboard actions should help the user move to the relevant work surface instead of feeling decorative.
- Expected product or reliability outcome: dashboard remains visually calm while CTA clicks navigate through the existing shell.
- How success will be observed: build and responsive audit pass; route wiring is explicit in code.
- Post-launch learning needed: yes

## Deliverable For This Stage
Implemented dashboard CTA navigation polish plus validation evidence.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it
- keep repository artifacts in English

## Scope
- `web/src/App.tsx`
- `web/src/components/dashboard.tsx`
- state/docs updates for task evidence

## Implementation Plan
1. Audit dashboard CTAs that currently render without behavior.
2. Add target route metadata to dashboard guidance cards.
3. Route dashboard buttons through the existing `changeRoute` helper.
4. Keep styling and data composition unchanged.
5. Run build and responsive audit.
6. Update state docs with evidence and remaining UX gaps.

## Acceptance Criteria
- Dashboard CTA buttons navigate to existing routes only.
- No new route contract, API call, or backend behavior is introduced.
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

- Task summary: wired dashboard CTA affordances to existing application routes
  so visible action buttons now move the user to the relevant work surface.
- Files changed:
  - `web/src/App.tsx`
  - `web/src/components/dashboard.tsx`
  - `.codex/tasks/PRJ-1203-dashboard-cta-navigation-polish.md`
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
  - Playwright fallback browser proof clicked 10 dashboard CTAs and verified
    navigation to `/chat`, `/goals`, `/reflections`, `/memory`, and
    `/insights`
  - cleanup check -> no active `chrome_headless_shell`; no listener on `5173`
  - `git diff --check` -> PASS with LF/CRLF warnings only
- What is incomplete: dashboard still needs a deeper canonical content
  composition pass; this slice only made existing CTA affordances real.
- Next steps: continue dashboard visual/content convergence, then move to chat
  or personality route-local polish.
- Decisions made: dashboard action controls should route to existing surfaces
  before additional visual polish creates more decorative affordances.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: dashboard presents multiple CTA-style buttons without click routing.
- Gaps: route-local dashboard UX is less complete than the polished shared shell.
- Inconsistencies: visual affordances imply action but behavior is absent.
- Architecture constraints: use existing routes and `changeRoute`; do not add route contracts.

### 2. Select One Priority Mission Objective
- Selected task: PRJ-1203 dashboard CTA navigation polish.
- Priority rationale: improves the first authenticated route after shared-shell polish with a small, testable UX fix.
- Why other candidates were deferred: dashboard content composition remains a larger canonical pass after CTA behavior is real.

### 3. Plan Implementation
- Files or surfaces to modify: dashboard card data, dashboard list component, route CTA buttons.
- Logic: attach explicit existing route targets and call the existing navigation helper.
- Edge cases: only route to existing `RoutePath` values; keep non-dashboard route behavior unchanged.

### 4. Execute Implementation
- Implementation notes: added route targets to dashboard guidance cards,
  passed the existing navigation helper into the guidance list, and wired
  route-local dashboard buttons to existing `RoutePath` values.

### 5. Verify and Test
- Validation performed: `npm run build`, `npm run audit:ui-responsive`,
  Playwright fallback CTA click proof, validation process cleanup check, and
  `git diff --check`.
- Result: PASS.

### 6. Self-Review
- Simpler option considered: leave decorative buttons until the larger visual
  pass, but that would preserve a misleading affordance on the first
  authenticated route.
- Technical debt introduced: no.
- Scalability assessment: route targets reuse the existing route union and
  shared navigation helper; no new route system or API contract was added.
- Refinements made: kept styling untouched and limited this slice to behavior.

### 7. Update Documentation and Knowledge
- Docs updated: `docs/ux/design-memory.md`.
- Context updated: task board, project state, current focus, next steps,
  system health, and module confidence ledger.
- Learning journal updated: not applicable.
