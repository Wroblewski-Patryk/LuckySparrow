# Task

## Header
- ID: PRJ-1162
- Title: Add shared v1.5 mobile route rail
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder + QA/Test
- Depends on: PRJ-1161
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-001
- Risk Rows: RISK-MOB-001
- Iteration: 1162
- Operation Mode: BUILDER
- Mission ID: MISSION-V15-MOBILE-ROUTE-RAIL
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
- Mission objective: make the v1.5 mobile route set navigable from every seeded route.
- Release objective advanced: mobile/native UI now has a shared route navigation pattern.
- Included slices: shared route rail primitive, route rail on chat/personality/settings/tools, web-export screenshot proof, state updates.
- Explicit exclusions: native tab library migration, auth changes, backend data wiring, final device proof.
- Checkpoint cadence: after primitive extraction, after typecheck/export, after screenshot review, before handoff.
- Stop conditions: TypeScript failure, Expo export failure, cramped touch targets, route rail hiding primary route content.
- Handoff expectation: next mobile slice can capture Expo Go/simulator proof or decide native auth transport before app-facing data wiring.

## Context

The v1.5 route seed set covered home, chat, personality, settings, and tools,
but non-home routes did not yet share an explicit in-screen route navigation
pattern.

## Goal

Add a shared route rail for chat, personality, settings, and tools so users can
move across seeded mobile routes without depending only on stack headers.

## Scope

- `mobile/src/ui/primitives.tsx`
- `mobile/src/ui/chat-screen.tsx`
- `mobile/src/ui/personality-screen.tsx`
- `mobile/src/ui/settings-screen.tsx`
- `mobile/src/ui/tools-screen.tsx`
- `.codex/artifacts/prj1162-mobile-route-rail/`
- source-of-truth state files linked below

## Implementation Plan

1. Add `RouteRail` to shared mobile primitives using existing Expo `Link`.
2. Insert the rail into chat, personality, settings, and tools.
3. Preserve home route links as the first-entry navigation surface.
4. Run TypeScript, Expo web export, fallback-hosted screenshots, cleanup
   checks, and docs/state synchronization.

## Acceptance Criteria

- Mobile TypeScript passes.
- Expo web export passes.
- Chat, personality, settings, and tools screenshots show a visible active
  route rail.
- Rail touch targets remain readable at `390px` width.
- No backend, auth, provider, internal debug, or data wiring behavior changes.

## Definition of Done
- [x] Shared `RouteRail` primitive is implemented.
- [x] Rail appears on chat, personality, settings, and tools routes.
- [x] TypeScript and Expo web export pass.
- [x] Screenshot proof is stored and reviewed.
- [x] Source-of-truth docs and ledgers are updated.

## Validation Evidence
- Tests:
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
  - `Push-Location .\mobile; npx expo export --platform web --output-dir .expo-web-export; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
- Manual checks:
  - reviewed `.codex/artifacts/prj1162-mobile-route-rail/mobile-chat-rail-390x1200.png`
  - reviewed `.codex/artifacts/prj1162-mobile-route-rail/mobile-tools-rail-390x1200.png`
- Screenshots/logs:
  - `.codex/artifacts/prj1162-mobile-route-rail/`
- High-risk checks:
  - screenshots captured through fallback-to-index static hosting for Expo deep links
  - no `chrome-headless-shell` process remained
  - validation port `8088` had no active listener after cleanup
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
- Design source reference: v1.5 route screenshot sequence and `docs/ux/visual-direction-brief.md`
- Canonical visual target: native mobile route navigation coherence
- Fidelity target: structurally_faithful
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: Expo Router links, v1.5 mobile route set, shared theme tokens
- New shared pattern introduced: shared `RouteRail` primitive for seeded routes
- Visual gap audit completed: yes for route navigation slice
- Screenshot comparison pass completed: yes for local web-export proof
- Remaining mismatches: device/simulator proof remains future slice.
- State checks: success
- Feedback locality checked: yes
- Raw technical errors hidden from end users: not applicable
- Responsive checks: mobile-width web export
- Input-mode checks: touch-sized route links by visual inspection; pointer render proxy
- Accessibility checks: route rail buttons have text labels and button roles
- Parity evidence: `.codex/artifacts/prj1162-mobile-route-rail/`

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: keep `npm run typecheck`, Expo export, and fallback-hosted screenshots for mobile route navigation changes
- Rollback note: remove `RouteRail` and route screen insertions
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

- Task summary: seeded mobile routes now share a touch-sized route rail.
- Files changed: shared primitives and route screens plus v1.5 planning/state docs.
- How tested: TypeScript, Expo web export, fallback-hosted route screenshots, cleanup checks.
- What is incomplete: native tab migration and device/simulator proof remain future slices.
- Next steps: capture Expo Go/simulator proof or decide native auth transport before app-facing data wiring.
- Decisions made: keep route rail as a simple shared primitive instead of introducing a tab library in this slice.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: non-home routes lacked an explicit shared route navigation pattern.
- Gaps: route transitions depended on stack/back behavior or returning home.
- Inconsistencies: none against mobile baseline.
- Architecture constraints: navigation only; no data or auth changes.

### 2. Select One Priority Mission Objective
- Selected task: shared mobile route rail.
- Priority rationale: improves usability across all seeded v1.5 routes.
- Why other candidates were deferred: native tabs and auth/data wiring are broader decisions.

### 3. Plan Implementation
- Files or surfaces to modify: shared primitives and seeded route screens.
- Logic: no backend or mutation logic changed.
- Edge cases: rail must not crowd route hero content.

### 4. Execute Implementation
- Implementation notes: added a two-row wrapping rail with active route state.

### 5. Verify and Test
- Validation performed: typecheck, Expo export, screenshots, cleanup.
- Result: PASS

### 6. Self-Review
- Simpler option considered: keep home-only links, but route-to-route travel would remain weak.
- Technical debt introduced: no
- Scalability assessment: rail can later be replaced by native tabs if that becomes the selected navigation model.
- Refinements made: active state and minimum widths keep route links readable.

### 7. Update Documentation and Knowledge
- Docs updated: v1.5 mobile UI plan, task board, project state, state registers
- Context updated: yes
- Learning journal updated: not applicable; no new recurring pitfall confirmed.
