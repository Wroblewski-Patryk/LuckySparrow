# Task

## Header
- ID: PRJ-1175
- Title: Align v1.5 mobile Stack header and stabilize audit DOM proof
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1174
- Priority: P1
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-001
- Risk Rows: RISK-MOB-001
- Iteration: 1175
- Operation Mode: TESTER
- Mission ID: v15-mobile-stack-header-audit-cache
- Mission Status: VERIFIED

## Mission Block
- Mission objective: align the native Stack header with mobile UI tokens and keep the expanded audit stable.
- Included slices: shared Stack header screen options, DOM cache in the mobile UI audit, validation proof.
- Explicit exclusions: native device/emulator proof, native tabs, app-facing data wiring, auth transport.
- Handoff expectation: keep route chrome token-driven and avoid repeated DOM dumps for the same route in validation.

## Context
The seeded route content used shared tokens, but the Expo Router Stack header
still used default platform styling. The expanded audit also repeated DOM dumps
for the same routes, which made validation slow enough to hit command timeouts.

## Goal
Align the Stack header with the existing canvas/text tokens and stabilize the
repeatable mobile UI audit without changing route behavior.

## Scope
- `mobile/app/_layout.tsx`
- `mobile/scripts/mobile-ui-audit.mjs`
- source-of-truth docs/state files

## Implementation Plan
1. Add Stack `screenOptions` using existing theme tokens.
2. Cache route DOM dumps inside the audit script.
3. Run typecheck and mobile UI audit.
4. Review representative header screenshots.
5. Clean validation processes and export output.

## Acceptance Criteria
- Stack header background, title color, shadow, and title weight align with mobile tokens.
- `npm run audit:ui-mobile` still proves route screenshots, CTA proof, and state proof.
- Audit avoids repeated DOM dumps for the same route.
- `npm run typecheck` passes.
- Validation cleanup leaves no headless browser, audit port listener, or Expo export.

## Validation Evidence
- Tests:
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
  - `Push-Location .\mobile; npm run audit:ui-mobile; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS; `route_count=5`, `viewport_count=2`, `screenshot_count=10`, `action_proof_count=3`, `state_proof_count=4`, `failed_count=0`, `export_cleaned=true`
- Manual checks:
  - reviewed `.codex/artifacts/prj1164-mobile-ui-audit/mobile-home-phone-390x1200.png`
  - reviewed `.codex/artifacts/prj1164-mobile-ui-audit/mobile-chat-tablet-820x1180.png`
- High-risk checks:
  - Expo Go/device proof remains blocked in this local session because `adb` is not available
  - no backend, auth, provider, internal debug, interaction state, or data wiring behavior changed
- Reality status: verified

## Result Report
- Task summary: aligned the native Stack header with mobile UI tokens and cached DOM dumps in the audit script.
- Files changed: `mobile/app/_layout.tsx`, `mobile/scripts/mobile-ui-audit.mjs`, this task file, and source-of-truth docs/state files.
- How tested: typecheck, mobile UI audit, header screenshot review, validation cleanup.
- What is incomplete: Expo Go/device proof and live data wiring.
- Next steps: capture Expo Go/simulator proof when Android tooling or a device is available.

## Autonomous Loop Evidence
### 1. Analyze Current State
- Stack route chrome was not token-aligned, and audit DOM proof repeated route dumps.
### 2. Select One Priority Mission Objective
- Selected task: PRJ-1175.
### 3. Plan Implementation
- Keep the change local to route chrome and validation harness stability.
### 4. Execute Implementation
- Added Stack screen options and audit DOM cache.
### 5. Verify and Test
- Typecheck and mobile UI audit passed with state and action proof intact.
### 6. Self-Review
- No route behavior, backend contract, or data behavior changed.
### 7. Update Documentation and Knowledge
- Updated planning and state/context files.
