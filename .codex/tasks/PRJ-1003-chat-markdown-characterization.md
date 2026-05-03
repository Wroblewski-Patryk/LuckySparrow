# Task

## Header
- ID: PRJ-1003
- Title: Add focused chat markdown renderer characterization proof
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1002
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1003
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

PRJ-1002 found that chat markdown rendering should not move without focused
characterization because it returns JSX and encodes parser behavior.

## Goal

Move chat markdown rendering behind a module boundary and add a focused proof
for the behavior being preserved, without introducing a broad test framework.

## Scope

- `web/src/App.tsx`
- `web/src/lib/chat-markdown.tsx`
- `web/scripts/chat-markdown-characterization.mjs`
- `web/package.json`
- `docs/frontend/route-component-map.md`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: chat markdown renderer behavior was hard to move
  safely.
- Expected product or reliability outcome: renderer ownership is explicit and
  key markdown cases are characterized.
- How success will be observed: characterization, build, and full route smoke
  pass.

## Deliverable For This Stage

Add `web/src/lib/chat-markdown.tsx`, import `renderChatMarkdown` from it, and
add `npm run test:chat-markdown`.

## Constraints
- do not move composer behavior or optimistic send state
- do not add a broad test framework
- preserve inline code, bold/italic, list, paragraph, and fenced code behavior
- do not open a visible browser window

## Implementation Plan
1. Move markdown renderer into `web/src/lib/chat-markdown.tsx`.
2. Add an esbuild-powered characterization script using `react-dom/server`.
3. Add `test:chat-markdown` script.
4. Run characterization, web build, and full route smoke.
5. Update docs and context.

## Acceptance Criteria
- `renderChatMarkdown` no longer lives in `App.tsx`.
- Characterization proof covers inline code, bold/italic, lists, paragraph line
  breaks, and fenced code blocks.
- `npm run test:chat-markdown` passes.
- `npm run build` passes.
- `npm run smoke:routes` passes with `route_count=14`.

## Definition of Done
- [x] Markdown renderer extracted.
- [x] Focused proof added.
- [x] Full route smoke validation completed.
- [x] Docs and context updated.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run test:chat-markdown; Pop-Location`
  - result: `status=ok`, `case_count=5`
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - result: `status=ok`, `route_count=14`
- Manual checks:
  - confirmed composer behavior remains in `App.tsx`

## Result Report

- Task summary: extracted chat markdown rendering and added a focused
  characterization script.
- Files changed:
  - `web/src/App.tsx`
  - `web/src/lib/chat-markdown.tsx`
  - `web/scripts/chat-markdown-characterization.mjs`
  - `web/package.json`
  - `docs/frontend/route-component-map.md`
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run test:chat-markdown; Pop-Location`
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
- What is incomplete:
  - chat composer route shell remains in `App.tsx`
