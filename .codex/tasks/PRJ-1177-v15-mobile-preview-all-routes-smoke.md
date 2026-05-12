# Task

## Header
- ID: PRJ-1177
- Title: Add v1.5 mobile preview smoke for all seeded routes
- Task Type: verification
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1176
- Priority: P1
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-002
- Risk Rows: RISK-MOB-001
- Iteration: 1177
- Operation Mode: BUILDER
- Mission ID: v15-mobile-preview-all-routes-smoke
- Mission Status: VERIFIED

## Mission Block
- Mission objective: prove the running local mobile UI preview serves every seeded route, not only a partial subset.
- Included slices: preview smoke command, all-route HTTP/DOM/screenshot proof, source-of-truth updates.
- Explicit exclusions: native device proof, public hosting, auth transport, app-facing data wiring.
- Handoff expectation: run `npm run smoke:ui-mobile-preview` while the local preview is available at `http://127.0.0.1:8093`.

## Context
`PRJ-1176` deployed a local static preview and captured Home, Chat, and Tools
screenshots. The deployed preview still needed a repeatable all-route smoke
command for Home, Chat, Personality, Settings, and Tools.

## Goal
Add a repeatable smoke check that validates all seeded mobile preview routes
through the running local preview URL across phone and tablet widths.

## Scope
- `mobile/package.json`
- `mobile/scripts/mobile-preview-smoke.mjs`
- source-of-truth docs/state files

## Implementation Plan
1. Add `smoke:ui-mobile-preview`.
2. Add a preview smoke script that checks HTTP 200, route DOM text, and phone screenshots for all seeded routes.
3. Run the smoke against `http://127.0.0.1:8093`.
4. Run mobile TypeScript validation.
5. Record evidence in task, planning, and state files.

## Acceptance Criteria
- The preview smoke covers Home, Chat, Personality, Settings, and Tools.
- The preview smoke covers phone and tablet viewports.
- Each route returns HTTP 200 from the deployed preview URL.
- Each route exposes expected DOM text.
- Each route has a nonblank phone screenshot artifact.
- TypeScript remains green.

## Validation Evidence
- Tests:
  - `Push-Location .\mobile; npm run smoke:ui-mobile-preview; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS; `route_count=5`, `viewport_count=2`, `screenshot_count=10`, `failed_count=0`
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
- Manual checks:
  - reviewed `.codex/artifacts/prj1177-mobile-ui-preview-smoke/preview-personality-phone-390x1200.png`
  - reviewed `.codex/artifacts/prj1177-mobile-ui-preview-smoke/preview-tools-tablet-820x1180.png`
- High-risk checks:
  - smoke targets the local preview URL only
  - no backend, auth, provider, live data, native device, or local cognition behavior changed
- Reality status: verified

## Result Report
- Task summary: added repeatable all-route phone/tablet smoke proof for the deployed local mobile UI preview.
- Files changed: `mobile/package.json`, `mobile/scripts/mobile-preview-smoke.mjs`, this task file, and source-of-truth docs/state files.
- How tested: local preview smoke and mobile typecheck.
- What is incomplete: native Expo Go/simulator proof remains blocked by missing local `adb`; public hosting and native auth transport remain outside this slice.
- Next steps: capture Expo Go/simulator proof when Android tooling or a device is available.

## Autonomous Loop Evidence
### 1. Analyze Current State
- Local preview existed, but all-route deployed-preview proof was still partial.
### 2. Select One Priority Mission Objective
- Selected task: PRJ-1177.
### 3. Plan Implementation
- Add a smoke command over the running preview URL.
### 4. Execute Implementation
- Added the preview smoke script and package command.
### 5. Verify and Test
- Preview smoke and typecheck passed.
### 6. Self-Review
- The slice strengthens deployed-preview evidence without implying native-device readiness.
### 7. Update Documentation and Knowledge
- Updated planning and source-of-truth state files.
