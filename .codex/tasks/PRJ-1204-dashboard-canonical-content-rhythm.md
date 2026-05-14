# Task

## Header
- ID: PRJ-1204
- Title: Dashboard canonical content rhythm
- Task Type: design
- Current Stage: post-release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1203
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-WEB-RESP-001
- Requirement Rows: not applicable
- Quality Scenario Rows: web responsive UX quality
- Risk Rows: visual parity drift
- Iteration: 1204
- Operation Mode: BUILDER
- Mission ID: MISSION-WEB-DASHBOARD-1204
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
- Mission objective: improve dashboard content rhythm against the canonical dashboard reference without changing runtime contracts.
- Release objective advanced: web-first responsive product shell quality.
- Included slices: dashboard visual audit, content-rhythm polish, responsive proof, state updates.
- Explicit exclusions: backend/API changes, new routes, new dashboard data contracts, production deployment.
- Checkpoint cadence: after audit, after implementation, after validation, before handoff.
- Stop conditions: build fails, responsive audit regresses, or the pass requires new product routes or data.
- Handoff expectation: concise dashboard visual result, validation evidence, and next route-local checkpoint.

## Context
After `PRJ-1203`, dashboard CTAs behave correctly. The next dashboard gap is visual/content rhythm: the first authenticated screen should read closer to the canonical composed dashboard, with clearer top greeting, richer right-column rows, and less generic utility-card rhythm.

## Goal
Polish dashboard content presentation while reusing existing data, route helpers, components, and assets.

## Success Signal
- User or operator problem: the dashboard should feel like a coherent cockpit, not only a stack of similar cards.
- Expected product or reliability outcome: stronger first-read hierarchy and more intentional guidance/activity rows across desktop, tablet, and mobile.
- How success will be observed: refreshed screenshots and responsive audit pass without route/API changes.
- Post-launch learning needed: yes

## Deliverable For This Stage
Implemented dashboard content-rhythm polish plus validation evidence.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it
- keep repository artifacts in English

## Scope
- `web/src/components/dashboard.tsx`
- `web/src/index.css`
- state/docs updates for task evidence

## Implementation Plan
1. Compare refreshed dashboard screenshots against the canonical dashboard reference.
2. Improve dashboard top greeting width on larger screens.
3. Give guidance rows a stronger three-column action rhythm on desktop/tablet.
4. Add visual tokens to recent activity rows so the right column reads closer to the canonical reference.
5. Run build and responsive audit.
6. Update source-of-truth state files with evidence.

## Acceptance Criteria
- Dashboard heading no longer feels artificially cramped on desktop.
- Guidance rows keep action buttons aligned as intentional controls.
- Recent activity rows have a clearer visual token rhythm.
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

- Task summary: improved dashboard content rhythm by widening the desktop
  greeting, refining guidance row action alignment, and adding recent-activity
  visual tokens.
- Files changed:
  - `web/src/components/dashboard.tsx`
  - `web/src/index.css`
  - `.codex/tasks/PRJ-1204-dashboard-canonical-content-rhythm.md`
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
  - screenshot review covered refreshed desktop dashboard against the
    canonical dashboard reference
  - cleanup check -> no active `chrome_headless_shell`; no listener on `5173`
  - `git diff --check` -> PASS with LF/CRLF warnings only
- What is incomplete: dashboard is improved but not at a final 95% canonical
  parity gate; remaining work is deeper content/tableau composition and then
  route-local chat/personality polish.
- Next steps: continue with chat canonical route polish or a deeper dashboard
  tableau pass, depending on release priority.
- Decisions made: dashboard right-column rows should preserve readable text
  over forcing desktop-only action alignment into a narrow sidebar.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: dashboard heading wraps too early on desktop; guidance rows and recent activity rows read more generic than the canonical right column.
- Gaps: dashboard composition is closer after prior passes, but right-column content rhythm still lacks canonical polish.
- Inconsistencies: action-looking guidance rows now route correctly, but their layout still underplays the action column.
- Architecture constraints: no route, API, or data-contract changes.

### 2. Select One Priority Mission Objective
- Selected task: PRJ-1204 dashboard canonical content rhythm.
- Priority rationale: closes the next dashboard-specific visual gap after behavior was made real.
- Why other candidates were deferred: chat and personality route-local polish should wait until the dashboard first-read is stronger.

### 3. Plan Implementation
- Files or surfaces to modify: dashboard component markup and dashboard CSS.
- Logic: add presentational tokens and responsive layout refinements only.
- Edge cases: mobile layout must remain readable and avoid overflow.

### 4. Execute Implementation
- Implementation notes: widened desktop dashboard title rhythm, added recent
  activity tokens, and refined guidance/recent grid behavior after screenshot
  review caught cramped text in the first version.

### 5. Verify and Test
- Validation performed: `npm run build`, `npm run audit:ui-responsive`,
  refreshed dashboard screenshot review, validation process cleanup check, and
  `git diff --check`.
- Result: PASS.

### 6. Self-Review
- Simpler option considered: keep the first three-column guidance layout, but
  screenshot review showed it made the narrow right sidebar worse.
- Technical debt introduced: no.
- Scalability assessment: changes are scoped to existing dashboard component
  classes and do not change data contracts.
- Refinements made: adjusted guidance and recent activity rows after direct
  screenshot comparison.

### 7. Update Documentation and Knowledge
- Docs updated: `docs/ux/design-memory.md`.
- Context updated: task board, project state, current focus, next steps,
  system health, and module confidence ledger.
- Learning journal updated: not applicable.
