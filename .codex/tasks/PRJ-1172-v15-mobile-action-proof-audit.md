# Task

## Header
- ID: PRJ-1172
- Title: Add v1.5 mobile CTA proof to the UI audit
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: QA/Test
- Depends on: PRJ-1171
- Priority: P1
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-001
- Risk Rows: RISK-MOB-001
- Iteration: 1172
- Operation Mode: BUILDER
- Mission ID: v15-mobile-action-proof-audit
- Mission Status: VERIFIED

## Mission Block
- Mission objective: make seeded mobile CTA proof repeatable inside `npm run audit:ui-mobile`.
- Included slices: action proof rows for Chat, Settings, and Tools; Chromium timeout guard; audit report update.
- Explicit exclusions: full-page visual CTA screenshot, native device proof, press behavior, backend/API/auth/data wiring.
- Handoff expectation: future CTA proof should extend the committed audit script, not use one-off local servers.

## Context
`PRJ-1171` centralized mobile CTAs with `ActionButton`. Standard screenshots
proved route rendering, but lower-page CTA text needed a repeatable audit row
instead of ad hoc long-viewport screenshots.

## Goal
Extend `mobile/scripts/mobile-ui-audit.mjs` so it proves seeded CTA text exists
for Chat, Settings, and Tools in the same repeatable validation command.

## Scope
- `mobile/scripts/mobile-ui-audit.mjs`
- source-of-truth docs/state files

## Implementation Plan
1. Add action proof definitions for Chat, Settings, and Tools.
2. Add a timeout guard around Chromium invocations.
3. Include `action_proof_count` and `action_proofs` in the audit report.
4. Run typecheck and mobile UI audit.
5. Clean validation processes and export output.

## Acceptance Criteria
- `npm run audit:ui-mobile` reports `action_proof_count=3`.
- Chat `Send`, Settings `Review reset boundary`, and Tools `Review preferences` are checked through DOM proof.
- Existing route screenshot proof remains `screenshot_count=10`.
- `failed_count=0`.
- Validation cleanup leaves no headless browser or audit port listener.

## Validation Evidence
- Tests:
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
  - `Push-Location .\mobile; npm run audit:ui-mobile; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS; `route_count=5`, `viewport_count=2`, `screenshot_count=10`, `action_proof_count=3`, `failed_count=0`, `export_cleaned=true`
- Manual checks:
  - audit report readback shows `/chat` -> `Send`, `/settings` -> `Review reset boundary`, `/tools` -> `Review preferences` with `dom_ok=true`
- High-risk checks:
  - no backend, auth, provider, internal debug, interaction state, or data wiring behavior changed
- Reality status: verified

## Result Report
- Task summary: extended the repeatable mobile UI audit with CTA DOM proof and Chromium timeout protection.
- Files changed: `mobile/scripts/mobile-ui-audit.mjs`, this task file, and source-of-truth docs/state files.
- How tested: typecheck, mobile UI audit, cleanup checks.
- What is incomplete: native device/simulator proof and full-page visual CTA screenshot proof.
- Next steps: capture Expo Go/simulator proof before app-facing data wiring, or add Playwright-based full-page visual proof if route-lower CTA screenshots become a required gate.

## Autonomous Loop Evidence
### 1. Analyze Current State
- CTA existence was visually reviewed but not represented as repeatable audit report rows.
### 2. Select One Priority Mission Objective
- Selected task: PRJ-1172.
### 3. Plan Implementation
- Extend the existing audit script rather than add a parallel local capture path.
### 4. Execute Implementation
- Added action proof rows and timeout handling to Chromium invocations.
### 5. Verify and Test
- Typecheck and mobile UI audit passed with `action_proof_count=3`.
### 6. Self-Review
- The script remains a validation tool and does not alter runtime behavior.
### 7. Update Documentation and Knowledge
- Updated planning and state/context files.
