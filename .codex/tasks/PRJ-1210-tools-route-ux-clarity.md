# Task

## Header
- ID: PRJ-1210
- Title: Tools route UX clarity polish
- Task Type: design
- Current Stage: post-release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1209
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-WEB-RESP-001
- Requirement Rows: not applicable
- Quality Scenario Rows: web responsive UX quality
- Risk Rows: tools route reads as technical implementation list
- Iteration: 1210
- Operation Mode: TESTER
- Mission ID: MISSION-WEB-TOOLS-1210
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
- Mission objective: improve the Tools route so users can understand available capabilities and next actions without first parsing technical facts.
- Release objective advanced: web-first responsive product shell quality.
- Included slices: Tools directory item hierarchy, mobile density, responsive audit, screenshot review, state updates.
- Explicit exclusions: API contract changes, provider behavior changes, backend changes, production deployment, new tool integrations.
- Checkpoint cadence: after implementation, after validation, before handoff.
- Stop conditions: build fails, route smoke fails, document-level horizontal overflow appears, or tool preference controls regress.
- Handoff expectation: Tools route UX is verified or exact blockers are recorded.

## Context
After `PRJ-1209`, shared shell navigation is verified. The next visible UI gap is the Tools route, especially on mobile, where tool cards expose provider/control/link details before the user can quickly understand readiness and next action.

## Goal
Make the Tools route feel like a calm, user-facing capability directory rather than a raw technical list, while preserving all existing controls and data.

## Success Signal
- User or operator problem: users can quickly see what is ready, what needs linking, and what action is safe next.
- Expected product or reliability outcome: Tools remains functionally unchanged but becomes easier to scan across desktop, tablet, and mobile.
- How success will be observed: build and responsive audits pass, screenshots show clearer hierarchy and no mobile overflow.
- Post-launch learning needed: yes

## Deliverable For This Stage
Post-release evidence for Tools route UX hierarchy polish.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it
- keep repository artifacts in English

## Scope
- `web/src/components/tools.tsx`
- `web/src/index.css`
- `web/scripts/route-smoke.mjs`
- task and source-of-truth updates after validation

## Implementation Plan
1. Rework Tools directory item cards so status, availability, link state, and next action are prominent before technical detail.
2. Preserve existing toggle behavior, Telegram linking panel, technical details, and all API data fields.
3. Tune responsive CSS for desktop, tablet, and mobile density.
4. Run `npm run build`, `npm run audit:ui-responsive`, and `npm run audit:ui-navigation`.
5. Review refreshed Tools screenshots.
6. Update source-of-truth state files.

## Acceptance Criteria
- Tools item cards foreground readiness and next action before technical details.
- Existing toggle/link controls remain accessible and named.
- Mobile Tools screenshot has no document-level horizontal overflow and reads as a product surface, not a raw technical dump.
- `npm run build` passes.
- `npm run audit:ui-responsive` passes.
- `npm run audit:ui-navigation` passes.
- Cleanup confirms no validation server/headless browser leftovers.

## Definition of Done
- [x] Implementation is merged into the local workspace.
- [x] `npm run build` passes for `web`.
- [x] `npm run audit:ui-responsive` passes for `web`.
- [x] `npm run audit:ui-navigation` passes for `web`.
- [x] Refreshed Tools screenshot is reviewed.
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

- Task summary: reworked the Tools route item cards so status, availability, link state, provider readiness, next action, and user control read before technical details; full-width single-item groups now avoid desktop dead space.
- Files changed: `web/src/components/tools.tsx`, `web/src/index.css`, `web/scripts/route-smoke.mjs`, `.codex/tasks/PRJ-1210-tools-route-ux-clarity.md`, `.codex/context/TASK_BOARD.md`, `.codex/context/PROJECT_STATE.md`, `.codex/context/LEARNING_JOURNAL.md`, `.agents/core/project-memory-index.md`, `.agents/state/current-focus.md`, `.agents/state/next-steps.md`, `.agents/state/system-health.md`, `.agents/state/module-confidence-ledger.md`, `docs/ux/design-memory.md`.
- How tested: `npm run build`; `npm run audit:ui-responsive`; `npm run audit:ui-navigation`; desktop/tablet/mobile Tools screenshot review; validation cleanup; `git diff --check`.
- What is incomplete: Tools can still receive a deeper canonical art/illustration pass later; this slice only closed hierarchy and scanability.
- Next steps: continue Settings confidence polish or deeper Chat v5 convergence.
- Decisions made: the Tools route keeps existing API data and controls, but foregrounds user-facing readiness and next action before technical implementation details.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: Tools mobile is functionally complete but visually dense and technical.
- Gaps: first-read hierarchy does not clearly privilege readiness and next action.
- Inconsistencies: Tools uses heavier nested fact cards than the calmer dashboard/personality grammar.
- Architecture constraints: no backend, API, or provider behavior changes.

### 1a. Bootstrap Missing Project Knowledge
- Bootstrap needed: no
- Missing or template-like files: none
- Sources scanned: project memory index, screen quality checklist, visual direction brief, experience quality bar, anti-patterns, current screenshots.
- Rows created or corrected: not applicable
- Assumptions recorded: safe assumption that the next UI slice should improve Tools because it is the most visibly technical remaining route among reviewed screenshots.
- Blocking unknowns: none
- Why it was safe to continue: changes are limited to presentation and preserve existing API/control paths.

### 2. Select One Priority Mission Objective
- Selected task: PRJ-1210 Tools route UX clarity polish.
- Priority rationale: shared shell is verified; Tools is a high-signal capability surface and currently reads too much like implementation state.
- Why other candidates were deferred: Personality and Settings are serviceable; Chat v5 is larger and should follow after capability/settings surfaces stop feeling raw.

### 3. Plan Implementation
- Files or surfaces to modify: `web/src/components/tools.tsx`, `web/src/index.css`.
- Logic: reorder and restyle existing data, not the data flow.
- Edge cases: read-only integral tools, disabled provider tools, toggle-allowed provider tools, Telegram linking panel, long provider/source labels.

### 4. Execute Implementation
- Implementation notes: replaced the heavy four-card fact grid with a decision strip and action/control row, retained technical details in the existing disclosure, and added single-item group layout handling. Updated route-smoke Playwright lookup to the current Codex runtime dependency path.

### 5. Verify and Test
- Validation performed: `npm run build`; `npm run audit:ui-responsive`; `npm run audit:ui-navigation`; desktop/tablet/mobile Tools screenshot review; validation process cleanup; `git diff --check`.
- Result: PASS. Responsive audit reported `route_count=14`, `viewport_count=3`, `screenshot_count=18`, `failed_count=0`. Navigation proof reported `status=ok`, `step_count=4`, `failed_count=0`.

### 6. Self-Review
- Simpler option considered: only changing CSS spacing, but that would leave the technical fact hierarchy intact.
- Technical debt introduced: no
- Scalability assessment: the decision strip uses existing item fields and works for read-only integral tools, provider-backed tools, and future linked tools.
- Refinements made: single-item groups now span the directory width on desktop/tablet, and route-smoke uses the current bundled Playwright path.

### 7. Update Documentation and Knowledge
- Docs updated: `docs/ux/design-memory.md`.
- Context updated: `.codex/context/TASK_BOARD.md`, `.codex/context/PROJECT_STATE.md`, `.agents/core/project-memory-index.md`, `.agents/state/current-focus.md`, `.agents/state/next-steps.md`, `.agents/state/system-health.md`, `.agents/state/module-confidence-ledger.md`.
- Learning journal updated: yes.
