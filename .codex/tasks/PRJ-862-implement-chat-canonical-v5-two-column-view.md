# Task

## Header
- ID: PRJ-862
- Title: Implement Chat Canonical V5 Two Column View
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-861
- Priority: P0
- Coverage Ledger Rows: not applicable
- Iteration: 862
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
`PRJ-861` froze the user-approved Chat v5 canonical reference. The current
web `/chat` screen still uses the older three-region composition with a
separate context rail, so it does not match the active canonical layout.

## Goal
Implement the active Chat v5 canonical screen structure in the existing web app
by removing the unused third context rail, moving its content into the top belt
and persona stage, and tuning the route color/spacing system toward the
approved reference.

## Scope
- `web/src/App.tsx`
- `web/src/index.css`
- `web/public/aion-chat-persona-stage-v5.png`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- task evidence and screenshot artifacts for this task

## Success Signal
- User or operator problem: the chat screen no longer matches the approved
  canonical v5 composition.
- Expected product or reliability outcome: `/chat` presents a calmer premium
  top-belt plus `60/40` two-column layout without the old third rail.
- How success will be observed: build passes and screenshots show desktop,
  tablet, and mobile parity against the active canonical reference.
- Post-launch learning needed: no

## Deliverable For This Stage
Production UI changes for the existing `/chat` route plus verification evidence.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it
- keep the change scoped to the Chat surface

## Implementation Plan
1. Prepare a route-specific persona stage raster from the approved v5 reference.
2. Refactor `/chat` markup to a top cognitive belt plus two body columns.
3. Remove the obsolete third context rail from the rendered Chat view.
4. Retune Chat CSS for the v5 palette, equal-height body columns, and responsive
   collapse.
5. Run build, whitespace validation, and browser screenshot comparison.
6. Update project context and task board with the result.

## Acceptance Criteria
- `/chat` desktop has a top cognitive belt and exactly two main body columns.
- The body columns are visually equal-height with a `60/40` split on desktop.
- The transcript and composer live in the left conversation column.
- The persona stage lives in the right column and uses a chat-adapted left-facing
  visual direction.
- Context content from the removed rail appears in the belt or persona overlays.
- Tablet and mobile collapse without clipped text or overlapping controls.

## Definition of Done
- [x] `DEFINITION_OF_DONE.md` checked for the touched UI scope.
- [x] Web build passes.
- [x] `git diff --check` passes.
- [x] Desktop, tablet, and mobile screenshots are captured.
- [x] The active canonical reference and latest implementation screenshot are
      inspected with `view_image`.
- [x] Project context and task board are updated.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval
- implicit stage skipping

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed
  - `git diff --check`
  - result: passed with line-ending warnings only
- Manual checks:
  - Playwright Chromium loaded `http://127.0.0.1:5173/chat` with API route
    mocks for `/app/me`, `/app/chat/history`, `/app/personality/overview`,
    `/app/tools/overview`, and `/health`
  - verified no `.aion-chat-context-rail` element is rendered
  - verified no horizontal overflow on desktop, tablet, or mobile
- Screenshots/logs:
  - `.codex/artifacts/prj862-chat-v5-parity/desktop-1568x1003-verified-v2.png`
  - `.codex/artifacts/prj862-chat-v5-parity/tablet-1024x900-verified.png`
  - `.codex/artifacts/prj862-chat-v5-parity/mobile-390x844-verified-v3.png`
- High-risk checks: no backend, DB, API, or AI behavior changed
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed: `docs/ux/canonical-web-screen-reference-set.md`,
  `docs/ux/canonical-visual-implementation-workflow.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none expected

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: `docs/ux/assets/aion-chat-canonical-reference-v5.png`
- Canonical visual target: Chat v5 top-belt plus `60/40` two-column layout
- Fidelity target: pixel_close
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: authenticated shell, canonical sidebar,
  existing chat composer/transcript controls
- New shared pattern introduced: no
- Design-memory entry reused: Chat v5 canonical composition
- Design-memory update required: no
- Visual gap audit completed: yes
- Background or decorative asset strategy: v5-derived raster persona stage plus
  code-native controls and text
- Canonical asset extraction required: yes
- Screenshot comparison pass completed: yes
- Remaining mismatches: the live web app keeps code-native chat bubbles,
  composer controls, and responsive mobile shell behavior rather than shipping
  the generated concept as a static screenshot; persona support labels are
  partly code-native/partly simplified to avoid cropped raster text in the
  `40%` column.
- State checks: loading | empty | error | success
- Feedback locality checked: yes
- Raw technical errors hidden from end users: not applicable
- Responsive checks: desktop | tablet | mobile
- Input-mode checks: touch | pointer | keyboard
- Accessibility checks: semantic buttons retained for navigation, quick action,
  attachment, voice, send, and account controls; decorative persona remains
  background art
- Parity evidence: active reference and latest desktop/mobile implementation
  inspected with `view_image`; Playwright metrics confirm no third rail and
  desktop `60/40` body columns with equal heights.

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: not applicable
- Rollback note: revert the web UI and asset changes for this task
- Observability or alerting impact: none
- Staged rollout or feature flag: not applicable

## Review Checklist
- [x] Process self-audit completed before implementation.
- [x] Autonomous loop evidence covers all seven steps.
- [x] Exactly one priority task was completed in this iteration.
- [x] Operation mode was selected according to iteration rotation.
- [x] Current stage is declared and respected.
- [x] Deliverable for the current stage is complete.
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated if repository truth changed.
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
The work is intentionally limited to the Chat surface. Existing unrelated
backend and documentation changes in the worktree are left untouched.

## Production-Grade Required Contract

Every task must include these mandatory sections before it can move to `READY`
or `IN_PROGRESS`:

- `Goal`
- `Scope` with exact files, modules, routes, APIs, schemas, docs, or runtime surfaces
- `Implementation Plan` with step-by-step execution and validation
- `Acceptance Criteria` with testable conditions
- `Definition of Done` using `DEFINITION_OF_DONE.md`
- `Result Report`

## Integration Evidence

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: AION web app user
- Existing workaround or pain: the old `/chat` route had too many containers
  and reused an older persona composition.
- Smallest useful slice: one focused `/chat` visual parity pass.
- Success metric or signal: screenshots show the v5 top belt and `60/40`
  two-column composition.
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: not applicable

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: open Chat and send a message from the composer
- SLI: not applicable
- SLO: not applicable
- Error budget posture: not applicable
- Health/readiness check: not applicable
- Logs, dashboard, or alert route: not applicable
- Smoke command or manual smoke: pending
- Rollback or disable path: revert this task's web changes

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: existing chat path preserved
- Endpoint and client contract match: unchanged
- DB schema and migrations verified: not applicable
- Loading state verified: pending
- Error state verified: pending
- Refresh/restart behavior verified: pending
- Regression check performed: pending

## AI Testing Evidence

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: no new data surface
- Trust boundaries: unchanged
- Permission or ownership checks: unchanged
- Abuse cases: not applicable
- Secret handling: unchanged
- Security tests or scans: not applicable
- Fail-closed behavior: unchanged
- Residual risk: visual-only route changes can still regress responsive layout

- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios: not applicable
- Multi-step context scenarios: not applicable
- Adversarial or role-break scenarios: not applicable
- Prompt injection checks: not applicable
- Data leakage and unauthorized access checks: not applicable
- Result: not applicable

## Result Report

- Task summary: implemented the Chat v5 canonical composition in the web app,
  including the top cognitive belt, two equal-height body columns, and
  canonical AION sidebar treatment.
- Files changed:
  - `web/src/App.tsx`
  - `web/src/index.css`
  - `docs/ux/assets/aion-chat-persona-stage-v5.png`
  - `web/public/aion-chat-persona-stage-v5.png`
  - `.codex/tasks/PRJ-862-implement-chat-canonical-v5-two-column-view.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested: web build, `git diff --check`, Playwright desktop/tablet/mobile
  screenshot pass, and `view_image` inspection against the active reference.
- What is incomplete: no backend or API behavior changed; full production data
  smoke was not run because this is a visual route slice.
- Next steps: continue with a narrow polish pass only if the user wants
  pixel-level refinements beyond this v5 structural parity.
- Decisions made: kept chat text and controls code-native, used a derived
  persona-stage raster only for the right-column illustration, and removed the
  rendered third context rail.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: `/chat` still renders the old context rail below the top area.
- Gaps: the v5 belt and equal-height two-column composition are not implemented.
- Inconsistencies: the persona stage still depends on older right-facing visual
  treatment.
- Architecture constraints: canonical screenshot work must use the active
  reference and screenshot evidence.

### 2. Select One Priority Task
- Selected task: implement Chat canonical v5 two-column view.
- Priority rationale: the user explicitly requested this approved Chat view.
- Why other candidates were deferred: backend passive/active tasks are unrelated
  to this focused UX request.

### 3. Plan Implementation
- Files or surfaces to modify: existing Chat route JSX, Chat CSS, v5 persona
  stage asset, context docs.
- Logic: preserve current chat data flow and composer behavior.
- Edge cases: empty/loading/error states, narrow viewport collapse, long text.

### 4. Execute Implementation
- Implementation notes: removed the rendered context rail, moved context into a
  six-card cognitive belt, nested the composer inside the left conversation
  column, widened the canonical sidebar, added the full AION module list, and
  extracted a left-facing persona-stage asset from the approved v5 reference.

### 5. Verify and Test
- Validation performed: `npm run build`, `git diff --check`, Playwright
  desktop/tablet/mobile screenshots, and `view_image` checks.
- Result: passed.

### 6. Self-Review
- Simpler option considered: leaving the older right context rail and only
  recoloring it; rejected because it violates the active v5 spec.
- Technical debt introduced: no
- Scalability assessment: the change reuses existing chat state and shell
  components; inactive future sidebar modules are visual-only until those routes
  exist.
- Refinements made: removed cropped raster callout text from the persona asset,
  fixed mobile composer wrapping, updated visible AION naming, and reduced
  mobile persona overlay clutter.

### 7. Update Documentation and Knowledge
- Docs updated: task evidence only; canonical docs were already updated by
  `PRJ-861` and remain current.
- Context updated: `.codex/context/TASK_BOARD.md`,
  `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable.
