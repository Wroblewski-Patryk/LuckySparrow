# Task

## Header
- ID: PRJ-1176
- Title: Add v1.5 mobile UI local preview deployment
- Task Type: release
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1175
- Priority: P1
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-001, QA-MOB-002
- Risk Rows: RISK-MOB-001
- Iteration: 1176
- Operation Mode: BUILDER
- Mission ID: v15-mobile-ui-local-preview
- Mission Status: VERIFIED

## Mission Block
- Mission objective: provide a stable local preview deployment path for the verified mobile UI shell.
- Included slices: Expo export script, fallback static preview server, HTTP/render smoke proof, preview URL.
- Explicit exclusions: public hosting, native device proof, app-facing data wiring, auth transport.
- Handoff expectation: use `npm run export:ui-mobile` plus `npm run preview:ui-mobile` for local static UI preview.

## Context
The mobile UI audit proves routes through Expo web export, but there was no
simple reusable local preview command for inspecting the exported UI with
fallback routing.

## Goal
Add and verify a local static preview path for the v1.5 mobile UI.

## Scope
- `mobile/package.json`
- `mobile/scripts/serve-mobile-preview.mjs`
- source-of-truth docs/state files

## Implementation Plan
1. Add `export:ui-mobile` and `preview:ui-mobile` scripts.
2. Add a fallback static server for Expo web export routes.
3. Export the mobile UI.
4. Start the local preview on `127.0.0.1:8093`.
5. Verify `/`, `/chat`, and `/tools` through HTTP and Chromium screenshots.

## Acceptance Criteria
- Export command succeeds.
- Preview server serves `/` and deep links with HTTP 200.
- Render smoke captures screenshots for Home, Chat, and Tools.
- Existing typecheck and mobile audit remain green.
- Preview URL is available for manual inspection.

## Validation Evidence
- Tests:
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
  - `Push-Location .\mobile; npm run audit:ui-mobile; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS; `route_count=5`, `viewport_count=2`, `screenshot_count=10`, `action_proof_count=3`, `state_proof_count=4`, `failed_count=0`, `export_cleaned=true`
  - `Push-Location .\mobile; npm run export:ui-mobile; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
- Manual checks:
  - local preview started at `http://127.0.0.1:8093`
  - HTTP smoke: `/` -> 200, `/chat` -> 200 with fallback root content
  - Chromium render smoke captured:
    - `.codex/artifacts/prj1176-mobile-ui-preview/preview-home-390x1200.png`
    - `.codex/artifacts/prj1176-mobile-ui-preview/preview-chat-390x1200.png`
    - `.codex/artifacts/prj1176-mobile-ui-preview/preview-tools-390x1200.png`
  - reviewed the Tools preview screenshot
- High-risk checks:
  - preview is local-only on `127.0.0.1`
  - Expo Go/device proof remains blocked because `adb` is not available
  - no backend, auth, provider, live data, or local cognition behavior changed
- Reality status: verified
- Handoff status: local preview process intentionally remains running for user inspection.

## Result Report
- Task summary: added a repeatable local static preview deployment for the mobile UI.
- Files changed: `mobile/package.json`, `mobile/scripts/serve-mobile-preview.mjs`, this task file, and source-of-truth docs/state files.
- How tested: typecheck, mobile UI audit, export, local HTTP smoke, Chromium screenshot smoke.
- What is incomplete: public hosting and native device/simulator proof.
- Next steps: capture Expo Go/simulator proof when Android tooling or a device is available.

## Autonomous Loop Evidence
### 1. Analyze Current State
- Export/audit existed, but local preview deployment required ad hoc hosting.
### 2. Select One Priority Mission Objective
- Selected task: PRJ-1176.
### 3. Plan Implementation
- Add a small fallback server over the existing Expo export output.
### 4. Execute Implementation
- Added scripts and preview server.
### 5. Verify and Test
- Typecheck, audit, export, HTTP smoke, and render smoke passed.
### 6. Self-Review
- Preview is local-only and does not imply public deployment or native-device proof.
### 7. Update Documentation and Knowledge
- Updated planning and state/context files.
