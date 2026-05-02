# Task

## Header
- ID: PRJ-863
- Title: Chat Shell Sidebar Canonical Layout
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-862
- Priority: P0
- Coverage Ledger Rows: not applicable
- Iteration: 863
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
The Chat v5 content layout is implemented, but the surrounding authenticated
shell still reads as a visible nested browser/mockup container. The user asked
to reduce the extra outer container and converge the sidebar toward the
canonical dashboard/sidebar visual language.

## Goal
Make the authenticated shell read as two primary visual surfaces: canonical
sidebar and main content. If wrapper elements remain for functional reasons,
they should be visually quiet. Bring the sidebar closer to the approved
canonical reference.

## Scope
- `web/src/App.tsx`
- `web/src/index.css`
- `.codex/tasks/PRJ-863-chat-shell-sidebar-canonical-layout.md`
- context updates if the task closes

## Implementation Plan
1. Keep functional shell wrappers but remove their visible browser/mockup frame.
2. Retune authenticated grid spacing so sidebar and main read as one integrated
   product shell.
3. Improve sidebar proportions, brand lockup, nav rhythm, active pill,
   diagnostics card, identity card, and quote card toward the canonical sidebar.
4. Verify desktop/tablet/mobile screenshots and no overflow.

## Acceptance Criteria
- Desktop no longer reads as an extra outer browser/mockup card around sidebar
  and main.
- Sidebar and main are visually the two primary surfaces.
- Sidebar is at least 97% structurally aligned with the canonical sidebar
  reference in brand, nav stack, support cards, and active state.
- Chat layout remains two-column on desktop and safe on tablet/mobile.

## Definition of Done
- [x] Web build passes.
- [x] `git diff --check` passes.
- [x] Desktop and mobile screenshots are captured.
- [x] Canonical sidebar reference and latest implementation are inspected with
      `view_image`.
- [x] Context is updated or a reason is recorded if not.

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
  - `git diff --check`
  - result: passed with line-ending warnings only
- Manual checks:
  - Playwright Chromium loaded `http://127.0.0.1:5173/chat` with mocked app
    API responses.
  - Verified `.aion-shell-window` has transparent background and `0px` border.
  - Verified no horizontal overflow on desktop or mobile.
  - Verified sidebar brand is `AION` and uses `.aion-sidebar-sunmark`.
- Screenshots/logs:
  - `.codex/artifacts/prj863-shell-sidebar-layout/desktop-1568x1003-v2.png`
  - `.codex/artifacts/prj863-shell-sidebar-layout/mobile-390x844-v2.png`

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference:
  - `docs/ux/assets/aviary-sidebar-layout-canonical-reference-v1.png`
  - `docs/ux/assets/aion-dashboard-canonical-reference-v2.png`
  - `docs/ux/assets/aion-chat-canonical-reference-v5.png`
- Fidelity target: pixel_close for sidebar, structurally faithful for shell
  integration without browser mockup chrome
- Screenshot comparison pass completed: yes
- Remaining mismatches: mobile still uses the existing compact authenticated
  top shell instead of the desktop sidebar; this is the current responsive
  product-shell behavior and avoids forcing a desktop rail onto phone width.

## Result Report
- Task summary: removed the visible authenticated outer/browser-like container
  and retuned the desktop sidebar toward the approved canonical rail.
- Files changed:
  - `web/src/App.tsx`
  - `web/src/index.css`
  - `.codex/tasks/PRJ-863-chat-shell-sidebar-canonical-layout.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested: web build, `git diff --check`, Playwright desktop/mobile
  screenshots, and `view_image` comparison against the sidebar reference.
- What is incomplete: no backend/API changes; production deploy not run in this
  task.
- Next steps: commit and push this focused polish slice when approved.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: visible outer shell container competes with sidebar/main surfaces.
- Gaps: sidebar needs closer canonical proportion and vertical rhythm.
- Architecture constraints: reuse existing shell and sidebar systems.

### 2. Select One Priority Task
- Selected task: chat shell/sidebar canonical layout polish.
- Priority rationale: user explicitly requested it after seeing the deployed
  Chat v5 screen.
- Why other candidates were deferred: route content polish is less important
  until shell/sidebar framing is correct.

### 3. Plan Implementation
- Files or surfaces to modify: authenticated shell and sidebar styles/markup.
- Logic: no API or chat data-flow changes.
- Edge cases: desktop, tablet, mobile, horizontal overflow.

### 4. Execute Implementation
- Implementation notes: kept shell wrapper elements for functional layout and
  popover anchoring but made the outer shell visually transparent; tuned the
  desktop grid, sidebar material, brand lockup, active nav pill, support cards,
  and quote card.

### 5. Verify and Test
- Validation performed: `npm run build`, `git diff --check`, Playwright
  screenshots, and `view_image` inspection.
- Result: passed.

### 6. Self-Review
- Simpler option considered: deleting shell wrapper elements outright.
- Technical debt introduced: no
- Refinements made: preserved functional wrappers while removing visual weight,
  and replaced the sidebar brand image with a code-native AION sunmark.

### 7. Update Documentation and Knowledge
- Docs updated: no canonical docs changed; implementation follows existing
  canonical sidebar/dashboard references.
- Context updated: `.codex/context/TASK_BOARD.md`,
  `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
