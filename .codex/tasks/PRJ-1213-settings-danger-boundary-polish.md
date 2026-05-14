# Task

## Header
- ID: PRJ-1213
- Title: Settings danger boundary polish
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1212
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-WEB-RESP-001
- Requirement Rows: not applicable
- Quality Scenario Rows: web responsive UX quality
- Risk Rows: destructive settings action dominates safe daily settings
- Iteration: 1213
- Operation Mode: BUILDER
- Mission ID: MISSION-WEB-SETTINGS-1213
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
- Mission objective: make Settings feel safer and calmer by moving destructive reset details behind an intentional disclosure boundary.
- Release objective advanced: web-first responsive product shell quality.
- Included slices: Settings danger panel hierarchy, responsive audit, screenshot review, state updates.
- Explicit exclusions: reset API changes, auth/session behavior changes, backend changes, production deployment.
- Checkpoint cadence: after implementation, after validation, before handoff.
- Stop conditions: build fails, route smoke fails, reset confirmation fields become inaccessible, or document-level horizontal overflow appears.
- Handoff expectation: Settings danger boundary is verified or exact blockers are recorded.

## Context
Settings is functional, but the destructive runtime reset panel occupies too much default attention, especially on mobile. The safe daily settings should be the primary read, with destructive actions available only after deliberate review.

## Goal
Make the reset action a calm progressive-disclosure boundary while preserving all existing reset form fields, confirmation checks, and submit behavior.

## Success Signal
- User or operator problem: users can adjust safe preferences without the destructive reset form visually competing for attention.
- Expected product or reliability outcome: Settings remains functionally unchanged while feeling safer and more polished across breakpoints.
- How success will be observed: build and audits pass, screenshots show reset content behind an intentional disclosure.
- Post-launch learning needed: yes

## Deliverable For This Stage
Implemented Settings danger boundary polish with validation evidence.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it
- keep repository artifacts in English

## Scope
- `web/src/components/settings.tsx`
- `web/src/index.css`
- state/docs updates after validation

## Implementation Plan
1. Change `SettingsDangerPanel` into a disclosure-style boundary with safe summary content visible by default.
2. Keep reset impact copy, confirmation input, hint, and button inside the disclosure content.
3. Tune CSS for desktop/tablet/mobile so the boundary reads as intentional and compact.
4. Run `npm run build`, `npm run audit:ui-responsive`, and `npm run audit:ui-navigation`.
5. Review refreshed Settings screenshots.
6. Update source-of-truth state files.

## Acceptance Criteria
- Reset runtime data details are behind a visible disclosure boundary by default.
- Existing reset confirmation input and button remain accessible after expansion.
- Settings screenshots across desktop/tablet/mobile show calmer hierarchy.
- `npm run build` passes.
- `npm run audit:ui-responsive` passes.
- `npm run audit:ui-navigation` passes.
- Cleanup confirms no validation server/headless browser leftovers.

## Definition of Done
- [x] Implementation is merged into the local workspace.
- [x] `npm run build` passes for `web`.
- [x] `npm run audit:ui-responsive` passes for `web`.
- [x] `npm run audit:ui-navigation` passes for `web`.
- [x] Refreshed Settings screenshots are reviewed.
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

- Task summary: Settings reset runtime data now uses a native disclosure
  boundary, keeping destructive reset details available but collapsed by
  default so safe account and interface settings dominate the first read.
- Files changed: `web/src/components/settings.tsx`, `web/src/index.css`,
  source-of-truth task/state/docs files.
- How tested: `npm run build`; `npm run audit:ui-responsive` with
  `route_count=14`, `viewport_count=3`, `screenshot_count=18`,
  `failed_count=0`; `npm run audit:ui-navigation` with `status=ok`,
  `step_count=4`, `failed_count=0`; refreshed desktop/tablet/mobile Settings
  screenshots reviewed.
- What is incomplete: no reset API, persistence, auth, or backend behavior was
  changed in this UI slice.
- Next steps: continue route-local Chat v5 or Personality polish while keeping
  responsive and navigation audits as regression gates.
- Decisions made: use progressive disclosure for destructive Settings actions
  and keep destructive form controls inside the boundary.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: destructive reset content dominates the bottom of Settings, especially on mobile.
- Gaps: safe settings and destructive boundary are visually too close in weight.
- Inconsistencies: Tools now hides technical details behind disclosure, while Settings reset exposes destructive details immediately.
- Architecture constraints: reset behavior, API, confirmation text, and session revocation must remain unchanged.

### 1a. Bootstrap Missing Project Knowledge
- Bootstrap needed: no
- Missing or template-like files: none
- Sources scanned: project memory index, screen quality checklist, visual direction brief, experience quality bar, anti-patterns, current Settings screenshots.
- Rows created or corrected: not applicable
- Assumptions recorded: safe assumption that reset details can move behind disclosure because the destructive action should require deliberate review.
- Blocking unknowns: none
- Why it was safe to continue: change is presentational and preserves all reset form controls.

### 2. Select One Priority Mission Objective
- Selected task: PRJ-1213 Settings danger boundary polish.
- Priority rationale: after Tools clarity, Settings is the remaining daily-control surface where hierarchy still feels heavy.
- Why other candidates were deferred: broader Chat and Personality polish are larger visual passes; this is a smaller safety/UX improvement.

### 3. Plan Implementation
- Files or surfaces to modify: `web/src/components/settings.tsx`, `web/src/index.css`.
- Logic: use native disclosure semantics around existing reset content.
- Edge cases: keyboard access to summary, form submission inside details, mobile line wrapping, disabled reset button styling.

### 4. Execute Implementation
- Implementation notes: wrapped the existing reset form body in a native
  `details`/`summary` boundary, preserved the reset confirmation input and
  submit controls, and tuned desktop/tablet/mobile spacing and disclosure icon
  states.

### 5. Verify and Test
- Validation performed: `npm run build`; `npm run audit:ui-responsive`;
  `npm run audit:ui-navigation`; refreshed Settings screenshots reviewed at
  desktop, tablet, and mobile breakpoints.
- Result: PASS.

### 6. Self-Review
- Simpler option considered: only reducing copy length, but that would leave
  the destructive affordance at the same visual level as safe settings.
- Technical debt introduced: none known; native disclosure semantics avoid a
  custom state system.
- Scalability assessment: the same pattern can be reused for future destructive
  account or runtime controls.
- Refinements made: mobile padding was tightened so the collapsed danger
  boundary remains visible without taking over the first read.

### 7. Update Documentation and Knowledge
- Docs updated: `docs/ux/design-memory.md`.
- Context updated: task board, project state, current focus, next steps,
  system health, module confidence ledger, and project memory index.
- Learning journal updated: not applicable.
