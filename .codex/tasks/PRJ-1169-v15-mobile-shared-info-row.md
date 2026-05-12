# Task

## Header
- ID: PRJ-1169
- Title: Add shared v1.5 mobile info row primitive
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1168
- Priority: P1
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-001
- Risk Rows: RISK-MOB-001
- Iteration: 1169
- Operation Mode: BUILDER
- Mission ID: v15-mobile-shared-info-row
- Mission Status: VERIFIED

## Mission Block
- Mission objective: reduce seeded mobile list-row drift with a shared `InfoRow` primitive.
- Included slices: shared `InfoRow`, adoption in personality and tools, phone/tablet audit proof.
- Explicit exclusions: Home contract row redesign, backend/API/auth/data wiring, native device proof.
- Handoff expectation: future simple label/value/detail rows should use `InfoRow`.

## Context
Personality mind-layer rows, personality foreground rows, and tools item rows
used similar local row styling. Home contract rows remain separate because
they optimize for long endpoint strings.

## Goal
Introduce a shared `InfoRow` primitive and use it where seeded mobile rows
match the standard label/value/detail pattern.

## Scope
- `mobile/src/ui/primitives.tsx`
- `mobile/src/ui/personality-screen.tsx`
- `mobile/src/ui/tools-screen.tsx`
- source-of-truth docs/state files

## Implementation Plan
1. Add `InfoRow` to shared mobile primitives.
2. Adopt it for personality layer rows.
3. Adopt it for personality foreground rows.
4. Adopt it for tools item rows.
5. Run typecheck and phone/tablet audit.

## Acceptance Criteria
- `InfoRow` exists and uses shared tokens.
- Personality and tools matching rows use it.
- `npm run typecheck` passes.
- `npm run audit:ui-mobile` passes.
- Representative screenshot is reviewed.

## Validation Evidence
- Tests:
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
  - `Push-Location .\mobile; npm run audit:ui-mobile; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS; `route_count=5`, `viewport_count=2`, `screenshot_count=10`, `failed_count=0`, `export_cleaned=true`
- Manual checks:
  - reviewed `.codex/artifacts/prj1164-mobile-ui-audit/mobile-personality-phone-390x1200.png`
- High-risk checks:
  - no backend, auth, provider, internal debug, or data wiring behavior changed
- Reality status: verified

## Result Report
- Task summary: added shared `InfoRow` and adopted it for matching personality/tools rows.
- Files changed: `mobile/src/ui/primitives.tsx`, `mobile/src/ui/personality-screen.tsx`, `mobile/src/ui/tools-screen.tsx`, this task file, and source-of-truth docs/state files.
- How tested: typecheck, phone/tablet mobile UI audit, screenshot review.
- What is incomplete: native device/simulator proof.
- Next steps: keep Home contract rows separate unless a dedicated endpoint-row primitive is needed.

## Autonomous Loop Evidence
### 1. Analyze Current State
- Matching row styles were duplicated across seeded routes.
### 2. Select One Priority Mission Objective
- Selected task: PRJ-1169.
### 3. Plan Implementation
- Centralize standard label/value/detail rows while leaving endpoint rows out.
### 4. Execute Implementation
- Added `InfoRow` and replaced matching local rows.
### 5. Verify and Test
- Typecheck and mobile UI audit passed.
### 6. Self-Review
- No runtime or contract behavior changed.
### 7. Update Documentation and Knowledge
- Updated planning and state/context files.
