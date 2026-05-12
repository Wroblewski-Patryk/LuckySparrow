# Task

## Header
- ID: PRJ-1159
- Title: Add the v1.5 native mobile chat route
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder + QA/Test
- Depends on: PRJ-1158
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-001
- Risk Rows: RISK-MOB-001
- Iteration: 1159
- Operation Mode: BUILDER
- Mission ID: MISSION-V15-MOBILE-CHAT-ROUTE
- Mission Status: VERIFIED

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.
- [x] Project memory and mobile baseline source-of-truth files were reviewed.
- [x] Mission-control rules were followed for a bounded UI slice.
- [x] Existing mobile contract boundaries were reused.
- [x] Affected module confidence rows were identified.
- [x] Affected requirement, quality scenario, and risk rows were identified.
- [x] The task improves release confidence, not only local code appearance.

## Mission Block
- Mission objective: turn the v1.5 conversation-first shell into a real native chat route.
- Release objective advanced: mobile/native UI can now prove a focused chat screen beyond the home shell.
- Included slices: shared UI primitives, native chat route, home-to-chat link, web-export render proof, state updates.
- Explicit exclusions: final native auth transport, backend API calls, send-message behavior, provider secrets, internal debug surfaces.
- Checkpoint cadence: after code edit, after typecheck, after export/screenshot proof, before handoff.
- Stop conditions: TypeScript failure, Expo export failure, blank or 404 screenshot after fallback hosting, boundary violation.
- Handoff expectation: next mobile slice can add device/simulator proof or wire read-only app-facing chat data once auth transport is decided.

## Context

`PRJ-1158` created the first native shell seed. The next useful UI slice was to
make chat a real Expo route instead of only a preview section on the home
screen.

## Goal

Add a native `/chat` route that keeps the conversation, context cards,
transcript, mode selector, input affordance, and send action visible in a
mobile-first layout without introducing backend behavior.

## Scope

- `mobile/app/_layout.tsx`
- `mobile/app/chat.tsx`
- `mobile/src/ui/chat-screen.tsx`
- `mobile/src/ui/home-screen.tsx`
- `mobile/src/ui/primitives.tsx`
- `.codex/artifacts/prj1159-mobile-chat-route/mobile-chat-390x1200-v2.png`
- source-of-truth state files linked below

## Implementation Plan

1. Extract shared mobile UI primitives used by home and chat.
2. Add `mobile/app/chat.tsx` and register the route in the stack.
3. Add a home-to-chat `Link` using Expo Router.
4. Build the native chat route with context cards, transcript, composer modes,
   text input, and send affordance.
5. Run TypeScript, Expo web export, screenshot capture, cleanup checks, and
   docs/state synchronization.

## Acceptance Criteria

- Mobile TypeScript passes.
- Expo web export passes.
- `/chat` renders through fallback static hosting as a nonblank screenshot.
- Home renders with a visible chat entry point.
- No backend, auth, provider, internal debug, send-message, or cognition
  behavior changes are introduced.

## Definition of Done
- [x] Native chat route is implemented.
- [x] Home links to the chat route.
- [x] Shared UI primitives avoid duplicating message/pill/label behavior.
- [x] TypeScript and Expo web export pass.
- [x] Screenshot proof is stored and reviewed.
- [x] Source-of-truth docs and ledgers are updated.

## Validation Evidence
- Tests:
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
  - `Push-Location .\mobile; npx expo export --platform web --output-dir .expo-web-export; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
- Manual checks:
  - reviewed `.codex/artifacts/prj1159-mobile-chat-route/mobile-chat-390x1200-v2.png`
  - reviewed `.codex/artifacts/prj1159-mobile-chat-route/mobile-home-390x1200.png`
- Screenshots/logs:
  - `.codex/artifacts/prj1159-mobile-chat-route/mobile-chat-390x1200-v2.png`
  - `.codex/artifacts/prj1159-mobile-chat-route/mobile-home-390x1200.png`
- High-risk checks:
  - first `/chat` screenshot against plain static hosting returned `404`; rerun with fallback-to-index static hosting produced a valid route screenshot
  - no `chrome-headless-shell` process remained
  - validation ports `8084` and `8085` had no active listeners after cleanup
- Module confidence ledger updated: yes
- Module confidence rows closed or changed: AVIARY-MOBILE-UI-001
- Requirements matrix updated: yes
- Requirement rows closed or changed: REQ-MOB-002
- Quality scenarios updated: yes
- Quality scenario rows closed or changed: QA-MOB-001
- Risk register updated: yes
- Risk rows closed or changed: RISK-MOB-001
- Reality status: verified

## Architecture Evidence
- Architecture source reviewed: `docs/planning/mobile-client-baseline.md`; `docs/planning/v1.5-mobile-ui-plan.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Follow-up architecture doc updates: none

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: v1.1 responsive screenshot set and `docs/ux/visual-direction-brief.md`
- Canonical visual target: native mobile chat route seed
- Fidelity target: structurally_faithful
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: v1.5 shell primitives, conversation-first hierarchy, Expo Router
- New shared pattern introduced: shared `mobile/src/ui/primitives.tsx` extracted from existing screen behavior
- Visual gap audit completed: yes for this chat route slice
- Screenshot comparison pass completed: yes for local web-export proof
- Remaining mismatches: device/simulator proof and live API-backed chat remain future slices.
- State checks: success
- Feedback locality checked: yes
- Raw technical errors hidden from end users: not applicable
- Responsive checks: mobile-width web export
- Input-mode checks: touch-sized controls by visual inspection; pointer render proxy
- Accessibility checks: text input has `accessibilityLabel`; pressables have labels and button roles
- Parity evidence: `.codex/artifacts/prj1159-mobile-chat-route/mobile-chat-390x1200-v2.png`

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: keep `npm run typecheck`, Expo export, and fallback-hosted route screenshot for mobile route additions
- Rollback note: revert the chat route, chat UI screen, primitive extraction, and home link
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

- Task summary: mobile now has a focused native chat route with a home entry point.
- Files changed: mobile route, shared primitives, chat UI, home link, v1.5 planning/state docs.
- How tested: TypeScript, Expo web export, fallback-hosted route screenshot, cleanup checks.
- What is incomplete: live app-facing chat data, final native auth transport, and device/simulator proof remain future slices.
- Next steps: capture Expo Go/simulator proof or wire read-only app-facing chat data after auth transport posture is selected.
- Decisions made: static export route screenshots need fallback-to-index hosting for deep links.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: chat existed only as a home preview after `PRJ-1158`.
- Gaps: no separate native route proof existed for the primary conversation flow.
- Inconsistencies: none against mobile baseline.
- Architecture constraints: no local cognition or provider behavior; mobile remains thin client.

### 2. Select One Priority Mission Objective
- Selected task: native mobile chat route.
- Priority rationale: direct continuation of the conversation-first v1.5 lane.
- Why other candidates were deferred: settings/tools native summaries are secondary until chat has a route.

### 3. Plan Implementation
- Files or surfaces to modify: Expo route stack, chat route, shared UI primitives, home entry point.
- Logic: no backend or send-message logic changed.
- Edge cases: deep-link static export fallback, touch target size, text input label.

### 4. Execute Implementation
- Implementation notes: extracted primitives and added `/chat` route with route-level screenshot proof.

### 5. Verify and Test
- Validation performed: typecheck, Expo export, screenshot capture, cleanup.
- Result: PASS after rerunning `/chat` through fallback hosting.

### 6. Self-Review
- Simpler option considered: duplicate chat UI inside the home screen, but that would make the second route harder to maintain.
- Technical debt introduced: no
- Scalability assessment: primitives can support future settings/tools mobile summaries.
- Refinements made: removed the bad 404 screenshot artifact after valid proof was captured.

### 7. Update Documentation and Knowledge
- Docs updated: v1.5 mobile UI plan, task board, project state, state registers
- Context updated: yes
- Learning journal updated: not applicable; fallback-hosting note is recorded in this task.
