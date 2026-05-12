# Task

## Header
- ID: PRJ-1178
- Title: Add v1.5 mobile preview health gate
- Task Type: verification
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1177
- Priority: P1
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-002
- Risk Rows: RISK-MOB-001
- Iteration: 1178
- Operation Mode: BUILDER
- Mission ID: v15-mobile-preview-health-gate
- Mission Status: VERIFIED

## Mission Block
- Mission objective: make the local mobile UI preview identifiable and health-checkable before route screenshot smoke runs.
- Included slices: preview health endpoint, smoke health gate, preview restart, validation evidence.
- Explicit exclusions: public hosting, native device proof, auth transport, app-facing data wiring.
- Handoff expectation: `npm run smoke:ui-mobile-preview` fails if `http://127.0.0.1:8093` is not the Aviary mobile UI preview.

## Context
The local preview smoke validated routes and screenshots, but a generic HTTP
200 on the preview port could still be ambiguous. The preview needed an
explicit identity and route-count health contract.

## Goal
Add a health gate to the local mobile UI preview deployment path.

## Scope
- `mobile/scripts/serve-mobile-preview.mjs`
- `mobile/scripts/mobile-preview-smoke.mjs`
- source-of-truth docs/state files

## Implementation Plan
1. Add `/__preview_health` to the local preview server.
2. Return the Aviary preview identity and seeded route count.
3. Make the preview smoke validate the health payload before route screenshots.
4. Restart the local preview server on `127.0.0.1:8093`.
5. Run preview smoke and typecheck.

## Acceptance Criteria
- Health endpoint returns HTTP 200.
- Health payload includes `app=aviary-mobile-ui-preview`, `status=ok`, and `route_count=5`.
- Preview smoke records `preview_health.ok=true`.
- All seeded route screenshots still pass on phone and tablet.
- TypeScript remains green.

## Validation Evidence
- Tests:
  - preview restart health check -> HTTP 200; `app=aviary-mobile-ui-preview`; `route_count=5`
  - `Push-Location .\mobile; npm run smoke:ui-mobile-preview; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS; `preview_health.ok=true`, `route_count=5`, `viewport_count=2`, `screenshot_count=10`, `failed_count=0`
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
- High-risk checks:
  - preview remains local-only on `127.0.0.1`
  - no backend, auth, provider, live data, native device, or local cognition behavior changed
- Reality status: verified

## Result Report
- Task summary: local mobile UI preview now has an explicit health identity and smoke gate.
- Files changed: `mobile/scripts/serve-mobile-preview.mjs`, `mobile/scripts/mobile-preview-smoke.mjs`, this task file, and source-of-truth docs/state files.
- How tested: preview health check, preview smoke, and mobile typecheck.
- What is incomplete: native Expo Go/simulator proof remains blocked by missing local `adb`; public hosting and native auth transport remain outside this slice.
- Next steps: capture Expo Go/simulator proof when Android tooling or a device is available.

## Autonomous Loop Evidence
### 1. Analyze Current State
- Running preview proof existed, but preview identity was implicit.
### 2. Select One Priority Mission Objective
- Selected task: PRJ-1178.
### 3. Plan Implementation
- Add a local-only health endpoint and smoke assertion.
### 4. Execute Implementation
- Added `/__preview_health` and preview health validation.
### 5. Verify and Test
- Health check, preview smoke, and typecheck passed.
### 6. Self-Review
- The slice improves deployment confidence without changing product behavior.
### 7. Update Documentation and Knowledge
- Updated planning and source-of-truth state files.
