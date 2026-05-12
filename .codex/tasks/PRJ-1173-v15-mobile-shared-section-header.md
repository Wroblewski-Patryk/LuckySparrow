# Task

## Header
- ID: PRJ-1173
- Title: Add shared v1.5 mobile section header primitive
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1172
- Priority: P1
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-001
- Risk Rows: RISK-MOB-001
- Iteration: 1173
- Operation Mode: BUILDER
- Mission ID: v15-mobile-shared-section-header
- Mission Status: VERIFIED

## Mission Block
- Mission objective: reduce seeded mobile panel-header drift with a shared `SectionHeader` primitive.
- Included slices: shared label/title/description header, adoption in Home, Personality, Settings, and Tools.
- Explicit exclusions: hero redesign, route content changes, backend/API/auth/data wiring, native device proof.
- Handoff expectation: future simple panel headers should use `SectionHeader`.

## Context
Several seeded mobile panels repeated the same `SectionLabel`, title, and
optional description structure. This made panel rhythm easier to drift over
time.

## Goal
Introduce `SectionHeader` and use it for matching mobile panel headers without
changing product behavior.

## Scope
- `mobile/src/ui/primitives.tsx`
- `mobile/src/ui/home-screen.tsx`
- `mobile/src/ui/personality-screen.tsx`
- `mobile/src/ui/settings-screen.tsx`
- `mobile/src/ui/tools-screen.tsx`
- source-of-truth docs/state files

## Implementation Plan
1. Add `SectionHeader` to shared mobile primitives.
2. Adopt it for Home chat and contract panel headers.
3. Adopt it for Personality panel headers.
4. Adopt it for Settings panel headers.
5. Adopt it for Tools group headers.
6. Run typecheck and mobile UI audit.
7. Review representative screenshots.

## Acceptance Criteria
- `SectionHeader` exists and uses shared tokens.
- Matching Home, Personality, Settings, and Tools headers use it.
- `npm run typecheck` passes.
- `npm run audit:ui-mobile` passes with CTA proof intact.
- Representative screenshots are reviewed.

## Validation Evidence
- Tests:
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
  - `Push-Location .\mobile; npm run audit:ui-mobile; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS; `route_count=5`, `viewport_count=2`, `screenshot_count=10`, `action_proof_count=3`, `failed_count=0`, `export_cleaned=true`
- Manual checks:
  - reviewed `.codex/artifacts/prj1164-mobile-ui-audit/mobile-settings-tablet-820x1180.png`
  - reviewed `.codex/artifacts/prj1164-mobile-ui-audit/mobile-personality-phone-390x1200.png`
- High-risk checks:
  - no backend, auth, provider, internal debug, interaction state, or data wiring behavior changed
- Reality status: verified

## Result Report
- Task summary: added shared `SectionHeader` and adopted it for matching seeded mobile panel headers.
- Files changed: `mobile/src/ui/primitives.tsx`, `mobile/src/ui/home-screen.tsx`, `mobile/src/ui/personality-screen.tsx`, `mobile/src/ui/settings-screen.tsx`, `mobile/src/ui/tools-screen.tsx`, this task file, and source-of-truth docs/state files.
- How tested: typecheck, mobile UI audit, screenshot review, validation cleanup.
- What is incomplete: native device/simulator proof.
- Next steps: capture Expo Go/simulator proof before app-facing data wiring.

## Autonomous Loop Evidence
### 1. Analyze Current State
- Panel header markup was duplicated across seeded mobile routes.
### 2. Select One Priority Mission Objective
- Selected task: PRJ-1173.
### 3. Plan Implementation
- Centralize matching label/title/description headers without changing route content.
### 4. Execute Implementation
- Added `SectionHeader` and replaced matching local panel headers.
### 5. Verify and Test
- Typecheck and mobile UI audit passed; Settings and Personality screenshots were reviewed.
### 6. Self-Review
- No runtime, contract, API, or data behavior changed.
### 7. Update Documentation and Knowledge
- Updated planning and state/context files.
