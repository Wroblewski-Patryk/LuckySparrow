# Task

## Header
- ID: PRJ-1174
- Title: Add v1.5 mobile UI state coverage
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1173
- Priority: P1
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-001
- Risk Rows: RISK-MOB-001
- Iteration: 1174
- Operation Mode: BUILDER
- Mission ID: v15-mobile-ui-state-coverage
- Mission Status: VERIFIED

## Mission Block
- Mission objective: add explicit loading, empty, error, and success UI state coverage to the mobile seed.
- Included slices: shared `StateNotice`, Tools state coverage panel, audit state proof rows.
- Explicit exclusions: live data loading, backend/API/auth/data wiring, native device proof.
- Handoff expectation: future app-facing data surfaces should reuse `StateNotice` or provide an equivalent state-specific treatment.

## Context
`docs/ux/screen-quality-checklist.md` requires loading, empty, error, and
success states. The mobile seed had success-like route content but no explicit
shared state treatment.

## Goal
Design and verify a shared mobile state notice pattern without introducing
mocked live integrations or local cognition behavior.

## Scope
- `mobile/src/ui/primitives.tsx`
- `mobile/src/ui/tools-screen.tsx`
- `mobile/scripts/mobile-ui-audit.mjs`
- source-of-truth docs/state files

## Implementation Plan
1. Add `StateNotice` to shared mobile primitives.
2. Add a Tools state coverage panel for loading, empty, error, and success copy.
3. Extend the mobile UI audit with state proof rows.
4. Run typecheck and mobile UI audit.
5. Review representative Tools screenshots.

## Acceptance Criteria
- Loading, empty, error, and success states have explicit mobile UI copy.
- State proof rows are present in `npm run audit:ui-mobile`.
- `npm run typecheck` passes.
- `npm run audit:ui-mobile` passes with `state_proof_count=4`.
- Representative Tools screenshots are reviewed.

## Validation Evidence
- Tests:
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
  - `Push-Location .\mobile; npm run audit:ui-mobile; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS on rerun; `route_count=5`, `viewport_count=2`, `screenshot_count=10`, `action_proof_count=3`, `state_proof_count=4`, `failed_count=0`, `export_cleaned=true`
- Manual checks:
  - reviewed `.codex/artifacts/prj1164-mobile-ui-audit/mobile-tools-phone-390x1200.png`
  - reviewed `.codex/artifacts/prj1164-mobile-ui-audit/mobile-tools-tablet-820x1180.png`
- High-risk checks:
  - no backend, auth, provider, internal debug, interaction state, or data wiring behavior changed
  - first audit attempt timed out and was cleaned before rerun; rerun passed
- Reality status: verified

## Result Report
- Task summary: added shared `StateNotice`, visible Tools state coverage, and repeatable audit proof for loading, empty, error, and success states.
- Files changed: `mobile/src/ui/primitives.tsx`, `mobile/src/ui/tools-screen.tsx`, `mobile/scripts/mobile-ui-audit.mjs`, this task file, and source-of-truth docs/state files.
- How tested: typecheck, mobile UI audit, Tools screenshot review, validation cleanup.
- What is incomplete: native device/simulator proof and live data-state wiring.
- Next steps: capture Expo Go/simulator proof before app-facing data wiring.

## Autonomous Loop Evidence
### 1. Analyze Current State
- Mobile seed lacked explicit loading/empty/error/success treatment.
### 2. Select One Priority Mission Objective
- Selected task: PRJ-1174.
### 3. Plan Implementation
- Add one shared state primitive and one visible state coverage panel.
### 4. Execute Implementation
- Added `StateNotice`, Tools state coverage, and audit state proofs.
### 5. Verify and Test
- Typecheck and mobile UI audit passed with `state_proof_count=4`.
### 6. Self-Review
- State examples are UI copy patterns, not fake live integration states.
### 7. Update Documentation and Knowledge
- Updated planning and state/context files.
