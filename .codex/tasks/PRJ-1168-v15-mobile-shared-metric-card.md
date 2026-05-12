# Task

## Header
- ID: PRJ-1168
- Title: Add shared v1.5 mobile metric card primitive
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1167
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-001
- Risk Rows: RISK-MOB-001
- Iteration: 1168
- Operation Mode: BUILDER
- Mission ID: v15-mobile-shared-metric-card
- Mission Status: VERIFIED

## Mission Block
- Mission objective: reduce seeded mobile route card drift with a shared metric/fact card primitive.
- Release objective advanced: v1.5 native/mobile UI quality after shared hero adoption.
- Included slices: shared `MetricCard`, adoption in chat/settings/tools, type fix, phone/tablet audit proof.
- Explicit exclusions: Home signal card redesign, native tabs, Expo Go/device proof, backend/API/auth/data wiring.
- Handoff expectation: future simple fact cards should use `MetricCard`.

## Context
Chat, settings, and tools repeated the same small fact-card pattern with local
style objects. Home's signal cards remain slightly different because they carry
a right-aligned tone label inside the landing hero.

## Goal
Add a shared `MetricCard` primitive for standard seeded mobile fact cards and
adopt it where the structure matches.

## Scope
- `mobile/src/ui/primitives.tsx`
- `mobile/src/ui/chat-screen.tsx`
- `mobile/src/ui/settings-screen.tsx`
- `mobile/src/ui/tools-screen.tsx`
- source-of-truth docs/state files

## Implementation Plan
1. Add `MetricCard` to shared mobile primitives.
2. Adopt it in chat context cards.
3. Adopt it in settings facts.
4. Adopt it in tools posture cards.
5. Run typecheck and phone/tablet mobile UI audit.

## Constraints
- preserve route text expected by the audit
- do not alter backend, auth, provider, debug, or data wiring
- keep Home's bespoke signal cards out of this slice

## Acceptance Criteria
- `MetricCard` exists and uses existing shared tokens.
- Chat, settings, and tools use it for matching fact cards.
- `npm run typecheck` passes.
- `npm run audit:ui-mobile` passes with phone/tablet screenshots.

## Definition of Done
- [x] `MetricCard` exists.
- [x] Matching seeded route cards use it.
- [x] mobile typecheck passes.
- [x] mobile UI audit passes.
- [x] representative screenshot was reviewed.
- [x] source-of-truth docs and ledgers are updated.

## Validation Evidence
- Tests:
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
  - `Push-Location .\mobile; npm run audit:ui-mobile; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS; `route_count=5`, `viewport_count=2`, `screenshot_count=10`, `failed_count=0`, `export_cleaned=true`
- Manual checks:
  - reviewed `.codex/artifacts/prj1164-mobile-ui-audit/mobile-settings-phone-390x1200.png`
- High-risk checks:
  - first typecheck caught `minWidth` typing; fixed with React Native `DimensionValue`
  - no backend, auth, provider, internal debug, or data wiring behavior changed
- Reality status: verified

## Result Report
- Task summary: added shared `MetricCard` and adopted it in chat, settings, and tools.
- Files changed: `mobile/src/ui/primitives.tsx`, `mobile/src/ui/chat-screen.tsx`, `mobile/src/ui/settings-screen.tsx`, `mobile/src/ui/tools-screen.tsx`, this task file, and source-of-truth docs/state files.
- How tested: typecheck, phone/tablet mobile UI audit, screenshot review.
- What is incomplete: native device/simulator proof.
- Next steps: keep using shared primitives for future simple route cards.

## Autonomous Loop Evidence
### 1. Analyze Current State
- Small fact cards were duplicated across seeded routes.
### 2. Select One Priority Mission Objective
- Selected task: PRJ-1168.
### 3. Plan Implementation
- Centralize the standard metric card while leaving Home's bespoke signal cards intact.
### 4. Execute Implementation
- Added `MetricCard` and replaced matching local cards.
### 5. Verify and Test
- Typecheck and audit passed after fixing the type of `minWidth`.
### 6. Self-Review
- No runtime, auth, backend, provider, or data behavior changed.
### 7. Update Documentation and Knowledge
- Updated planning and state/context files.
