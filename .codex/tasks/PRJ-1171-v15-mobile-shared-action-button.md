# Task

## Header
- ID: PRJ-1171
- Title: Add shared v1.5 mobile action button primitive
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1170
- Priority: P1
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-001
- Risk Rows: RISK-MOB-001
- Iteration: 1171
- Operation Mode: BUILDER
- Mission ID: v15-mobile-shared-action-button
- Mission Status: VERIFIED

## Mission Block
- Mission objective: reduce seeded mobile CTA drift with a shared `ActionButton` primitive.
- Included slices: shared primary/danger action button, adoption in Chat, Settings, and Tools, phone/tablet audit proof.
- Explicit exclusions: button press behavior, backend/API/auth/data wiring, native device proof.
- Handoff expectation: future full-width seeded mobile CTAs should use `ActionButton`.

## Context
Chat, Settings, and Tools each rendered full-width CTA buttons locally. The
visual pattern could be centralized while preserving the current no-op seeded
behavior.

## Goal
Introduce a shared `ActionButton` primitive with primary and danger tones, then
adopt it for matching seeded mobile CTAs.

## Scope
- `mobile/src/ui/primitives.tsx`
- `mobile/src/ui/chat-screen.tsx`
- `mobile/src/ui/settings-screen.tsx`
- `mobile/src/ui/tools-screen.tsx`
- source-of-truth docs/state files

## Implementation Plan
1. Add `ActionButton` to shared mobile primitives.
2. Adopt it for Chat send.
3. Adopt it for Settings reset-boundary review.
4. Adopt it for Tools review preferences.
5. Run typecheck and phone/tablet audit.
6. Review representative screenshots.

## Acceptance Criteria
- `ActionButton` exists and uses shared tokens.
- Chat, Settings, and Tools matching CTAs use it.
- `npm run typecheck` passes.
- `npm run audit:ui-mobile` passes.
- Representative screenshots are reviewed.

## Validation Evidence
- Tests:
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
  - `Push-Location .\mobile; npm run audit:ui-mobile; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS; `route_count=5`, `viewport_count=2`, `screenshot_count=10`, `failed_count=0`, `export_cleaned=true`
- Manual checks:
  - reviewed `.codex/artifacts/prj1164-mobile-ui-audit/mobile-chat-tablet-820x1180.png`
  - reviewed `.codex/artifacts/prj1164-mobile-ui-audit/mobile-settings-tablet-820x1180.png`
  - reviewed `.codex/artifacts/prj1164-mobile-ui-audit/mobile-tools-tablet-820x1180.png`
- High-risk checks:
  - no backend, auth, provider, internal debug, interaction state, or data wiring behavior changed
  - attempted one-off long-viewport CTA capture was stopped and cleaned; future full-page CTA proof should be a repeatable audit-script enhancement
- Reality status: verified

## Result Report
- Task summary: added shared `ActionButton` and adopted it for Chat, Settings, and Tools CTAs.
- Files changed: `mobile/src/ui/primitives.tsx`, `mobile/src/ui/chat-screen.tsx`, `mobile/src/ui/settings-screen.tsx`, `mobile/src/ui/tools-screen.tsx`, this task file, and source-of-truth docs/state files.
- How tested: typecheck, phone/tablet mobile UI audit, tablet screenshot review, validation cleanup.
- What is incomplete: native device/simulator proof and full-page scroll CTA audit.
- Next steps: extend `npm run audit:ui-mobile` for scroll/full-page CTA coverage if lower-page CTA proof becomes required.

## Autonomous Loop Evidence
### 1. Analyze Current State
- Full-width CTA styles were duplicated across seeded mobile routes.
### 2. Select One Priority Mission Objective
- Selected task: PRJ-1171.
### 3. Plan Implementation
- Centralize the visual CTA primitive while preserving no-op seeded behavior.
### 4. Execute Implementation
- Added `ActionButton` and replaced matching local buttons.
### 5. Verify and Test
- Typecheck and mobile UI audit passed; tablet screenshots were reviewed.
### 6. Self-Review
- No runtime, contract, API, or data behavior changed.
### 7. Update Documentation and Knowledge
- Updated planning and state/context files; recorded the one-off capture pitfall in the learning journal.
