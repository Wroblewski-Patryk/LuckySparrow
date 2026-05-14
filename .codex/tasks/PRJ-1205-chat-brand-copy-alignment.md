# Task

## Header
- ID: PRJ-1205
- Title: Chat brand copy alignment
- Task Type: design
- Current Stage: post-release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1204
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-WEB-RESP-001
- Requirement Rows: not applicable
- Quality Scenario Rows: web responsive UX quality
- Risk Rows: brand inconsistency
- Iteration: 1205
- Operation Mode: TESTER
- Mission ID: MISSION-WEB-CHAT-1205
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
- Mission objective: align visible chat brand copy with the Aviary product shell.
- Release objective advanced: web-first responsive product shell quality.
- Included slices: chat screenshot audit, copy alignment, build and responsive proof, state updates.
- Explicit exclusions: runtime response behavior, backend/API changes, chat layout rewrite, production deployment.
- Checkpoint cadence: after audit, after implementation, after validation, before handoff.
- Stop conditions: build fails, responsive audit regresses, or copy change would conflict with approved product naming.
- Handoff expectation: concise chat copy result and validation evidence.

## Context
The product shell now uses Aviary, but the chat route still shows AION in the assistant speaker label and composer note. `AGENTS.md` states the product is called Aviary while the folder remains Personality.

## Goal
Replace visible chat-route product copy with localized Aviary-aligned copy while preserving runtime behavior.

## Success Signal
- User or operator problem: the main conversation surface should not contradict the product brand used by the shell.
- Expected product or reliability outcome: chat feels part of Aviary, not a leftover AION-branded prototype.
- How success will be observed: build and responsive audit pass; screenshot shows Aviary speaker/note copy.
- Post-launch learning needed: no

## Deliverable For This Stage
Implemented chat brand-copy alignment plus validation evidence.

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
1. Add localized chat assistant label and safety note copy.
2. Use existing `copy.chat` values in the chat route.
3. Run build and responsive audit.
4. Update state docs with evidence and remaining UX gaps.

## Acceptance Criteria
- Chat assistant speaker label uses Aviary-aligned copy.
- Composer safety note uses localized Aviary-aligned copy.
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

- Task summary: aligned visible chat and shared sidebar brand copy with
  Aviary by localizing the chat assistant label and safety note and updating
  the sidebar quote signature.
- Files changed:
  - `web/src/App.tsx`
  - `web/src/index.css`
  - `.codex/tasks/PRJ-1205-chat-brand-copy-alignment.md`
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
  - refreshed desktop chat screenshot reviewed and shows Aviary speaker/note
    copy
  - cleanup check -> no active `chrome_headless_shell`; no listener on `5173`
  - `git diff --check` -> PASS with LF/CRLF warnings only
- What is incomplete: full chat v5 layout parity remains a larger route-local
  polish pass.
- Next steps: continue with chat layout/composer/transcript canonical polish
  or personality route-local polish.
- Decisions made: product-shell copy should use Aviary; AION can remain in
  architecture/runtime terminology where it is not user-facing product chrome.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: chat still renders `AION` in visible speaker/safety copy while the shell uses Aviary.
- Gaps: brand consistency is not complete across core routes.
- Inconsistencies: product source of truth says Aviary; chat route still carries legacy AION copy.
- Architecture constraints: runtime behavior and message payloads must remain unchanged.

### 2. Select One Priority Mission Objective
- Selected task: PRJ-1205 chat brand copy alignment.
- Priority rationale: starts route-local chat polish with a low-risk, visible inconsistency fix.
- Why other candidates were deferred: chat layout parity is a larger follow-up after copy consistency.

### 3. Plan Implementation
- Files or surfaces to modify: localized UI copy and chat route props.
- Logic: use existing copy object rather than hardcoded strings.
- Edge cases: all active UI languages should have a value.

### 4. Execute Implementation
- Implementation notes: added localized `assistantLabel` and `safetyNote`
  fields to chat copy, replaced hardcoded chat route strings, and updated the
  shared sidebar quote signature.

### 5. Verify and Test
- Validation performed: `npm run build`, `npm run audit:ui-responsive`,
  refreshed desktop chat screenshot review, validation process cleanup check,
  and `git diff --check`.
- Result: PASS.

### 6. Self-Review
- Simpler option considered: replace hardcoded strings directly, but using the
  existing localized copy object keeps the route consistent across UI
  languages.
- Technical debt introduced: no.
- Scalability assessment: copy now follows the existing UI localization
  pattern.
- Refinements made: fixed the shared sidebar quote signature after screenshot
  review revealed a second visible legacy brand label.

### 7. Update Documentation and Knowledge
- Docs updated: `docs/ux/design-memory.md`.
- Context updated: task board, project state, current focus, next steps,
  system health, and module confidence ledger.
- Learning journal updated: not applicable.
