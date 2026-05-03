# Task

## Header
- ID: PRJ-1001
- Title: Extract chat transcript metadata helpers from `web/src/App.tsx`
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1000
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1001
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

PRJ-1000 selected pure chat transcript metadata helpers before moving markdown
rendering or composer behavior.

## Goal

Move chat transcript metadata, delivery-state, and local/durable reconciliation
helpers into a small lib module without changing chat route behavior.

## Scope

- `web/src/App.tsx`
- `web/src/lib/chat-transcript.ts`
- `docs/frontend/route-component-map.md`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: pure transcript helper logic was mixed into
  `App.tsx`.
- Expected product or reliability outcome: chat helper ownership is clearer
  while composer and markdown behavior stay route-owned.
- How success will be observed: build and full route smoke pass.

## Deliverable For This Stage

Add `web/src/lib/chat-transcript.ts` and import transcript helpers from it.

## Constraints
- do not move markdown rendering
- do not move composer behavior or optimistic send state
- preserve transcript metadata and reconciliation behavior
- do not open a visible browser window

## Implementation Plan
1. Add a chat transcript helper module.
2. Move `transcriptMetadataSummary`, `chatDeliveryState`, and
   `reconcileLocalTranscriptItems`.
3. Import helpers from `App.tsx`.
4. Run web build and full route smoke.
5. Update docs and context.

## Acceptance Criteria
- Transcript metadata helpers no longer live in `App.tsx`.
- `web/src/lib/chat-transcript.ts` owns pure transcript helpers.
- `npm run build` passes.
- `npm run smoke:routes` passes with `route_count=14`.

## Definition of Done
- [x] Chat transcript helpers extracted.
- [x] Markdown rendering and composer behavior remain in `App()`.
- [x] Full route smoke validation completed.
- [x] Docs and context updated.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - result: `status=ok`, `route_count=14`
- Manual checks:
  - confirmed markdown helpers remain in `App.tsx`

## Result Report

- Task summary: moved pure chat transcript helpers into
  `web/src/lib/chat-transcript.ts`.
- Files changed:
  - `web/src/App.tsx`
  - `web/src/lib/chat-transcript.ts`
  - `docs/frontend/route-component-map.md`
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
- What is incomplete:
  - chat markdown rendering still lives in `App.tsx`
