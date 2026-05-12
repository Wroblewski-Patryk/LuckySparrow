# Task

## Header
- ID: PRJ-1179
- Title: Add v1.5 mobile local deploy command
- Task Type: release
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1178
- Priority: P1
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-002
- Risk Rows: RISK-MOB-001
- Iteration: 1179
- Operation Mode: BUILDER
- Mission ID: v15-mobile-local-deploy-command
- Mission Status: VERIFIED

## Mission Block
- Mission objective: make local mobile UI deployment reproducible with one package command.
- Included slices: deploy command alias, isolated test on a non-user preview port, smoke validation, source-of-truth updates.
- Explicit exclusions: public hosting, native device proof, auth transport, app-facing data wiring.
- Handoff expectation: run `npm run deploy:ui-mobile-local` from `mobile/` to export and serve the local preview.

## Context
The local preview path worked, but handoff still required remembering two
steps: export first, then start preview. A release handoff should expose one
obvious command for the local UI deployment path.

## Goal
Add and verify a single local deploy command for the v1.5 mobile UI preview.

## Scope
- `mobile/package.json`
- source-of-truth docs/state files

## Implementation Plan
1. Add `deploy:ui-mobile-local`.
2. Test the deploy command on a separate port so the user preview on `8093` remains available.
3. Verify the deployed preview health payload.
4. Rerun preview smoke and typecheck.
5. Record evidence.

## Acceptance Criteria
- `deploy:ui-mobile-local` exports the mobile web build and starts the preview server.
- The test deploy exposes `/__preview_health` with `app=aviary-mobile-ui-preview` and `route_count=5`.
- The user preview on `8093` remains running.
- Existing preview smoke and typecheck remain green.

## Validation Evidence
- Tests:
  - `PORT=8094 npm run deploy:ui-mobile-local` via `Start-Process` -> PASS; `/__preview_health` returned HTTP 200, `app=aviary-mobile-ui-preview`, `route_count=5`; test process was stopped after verification
  - `Push-Location .\mobile; npm run smoke:ui-mobile-preview; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS; `preview_health.ok=true`, `route_count=5`, `viewport_count=2`, `screenshot_count=10`, `failed_count=0`
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
- High-risk checks:
  - tested on `8094` to preserve the intentional user preview on `8093`
  - no backend, auth, provider, live data, native device, or local cognition behavior changed
- Reality status: verified

## Result Report
- Task summary: local mobile UI deployment now has a one-command package script.
- Files changed: `mobile/package.json`, this task file, and source-of-truth docs/state files.
- How tested: isolated deploy command health check, preview smoke, and mobile typecheck.
- What is incomplete: native Expo Go/simulator proof remains blocked by missing local `adb`; public hosting and native auth transport remain outside this slice.
- Next steps: capture Expo Go/simulator proof when Android tooling or a device is available.

## Autonomous Loop Evidence
### 1. Analyze Current State
- Preview deployment was verified but still split across export and preview commands.
### 2. Select One Priority Mission Objective
- Selected task: PRJ-1179.
### 3. Plan Implementation
- Add one deploy alias and test it without disturbing the active preview.
### 4. Execute Implementation
- Added `deploy:ui-mobile-local`.
### 5. Verify and Test
- Deploy health check, preview smoke, and typecheck passed.
### 6. Self-Review
- The slice improves local deployment handoff without changing runtime behavior.
### 7. Update Documentation and Knowledge
- Updated planning and source-of-truth state files.
