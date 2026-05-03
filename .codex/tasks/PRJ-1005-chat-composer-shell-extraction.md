# Task

## Header
- ID: PRJ-1005
- Title: Extract chat composer shell from App.tsx
- Task Type: refactor
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1004
- Priority: P2
- Coverage Ledger Rows: not applicable
- Iteration: 1005
- Operation Mode: TESTER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

`PRJ-1004` selected the chat composer shell as the next safe chat route
extraction. Chat transcript helpers and markdown rendering already have module
ownership, but the action tray, mode tabs, textarea chrome, and composer note
still lived inline in `web/src/App.tsx`.

## Goal

Move chat composer presentation chrome behind a chat component without moving
send state, optimistic transcript behavior, or API calls out of `App()`.

## Scope

- `web/src/components/chat.tsx`
- `web/src/App.tsx`
- `docs/frontend/route-component-map.md`
- `docs/frontend/app-route-cluster-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Success Signal
- User or operator problem: chat route ownership was too broad inside
  `App.tsx`, making future v1 alignment harder to reason about.
- Expected product or reliability outcome: composer markup has explicit
  component ownership while behavior remains traceable to the existing route.
- How success will be observed: build and route smoke pass with the composer
  rendered through `ChatComposerShell`.
- Post-launch learning needed: no

## Deliverable For This Stage

Release-ready small refactor with validation evidence and docs/context sync.

## Constraints
- use existing chat styles and icon components
- do not move `handleSendMessage`
- do not move `chatText`, `sendingMessage`, or optimistic transcript state
- do not change chat API behavior

## Implementation Plan
1. Add a typed `ChatComposerShell` component to `web/src/components/chat.tsx`.
2. Replace the inline composer block in `web/src/App.tsx` with explicit props.
3. Update frontend ownership docs and v1 roadmap.
4. Run build, route smoke, and diff validation.

## Acceptance Criteria
- Chat composer action tray, mode tabs, textarea chrome, send button, and note
  render from `ChatComposerShell`.
- Chat route state and send behavior remain owned by `App()`.
- Documentation names the new component ownership and next slice.
- Validation passes.

## Definition of Done
- [x] Component extraction completed.
- [x] Behavior ownership preserved in `App()`.
- [x] Docs and context updated.
- [x] Relevant validation completed.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- new systems without approval
- duplicated composer implementations
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval
- moving send behavior out of the existing route owner

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - `git diff --check`
- Manual checks:
  - confirmed `ChatComposerShell` receives behavior through explicit props
- Screenshots/logs: not applicable
- High-risk checks:
  - send handler, local transcript reconciliation, and history refresh remain
    in `App()`
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/frontend/route-component-map.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates:
  - next chat transcript presentation extraction audit queued as PRJ-1006

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: existing implemented chat route shell
- Canonical visual target: preserve current chat composer layout
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: existing chat CSS classes and app icons
- New shared pattern introduced: no
- Design-memory entry reused: existing chat route component extraction pattern
- Design-memory update required: no
- Visual gap audit completed: yes
- Background or decorative asset strategy: unchanged
- Canonical asset extraction required: no
- Screenshot comparison pass completed: no
- Remaining mismatches: visual parity not changed by this markup extraction
- State checks: success
- Feedback locality checked: yes
- Raw technical errors hidden from end users: not applicable
- Responsive checks: route smoke only; CSS unchanged
- Input-mode checks: pointer | keyboard
- Accessibility checks: existing labels preserved for add, voice, send, and mode tabs
- Parity evidence: build and route smoke passed

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: revert this component extraction commit
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

This is a presentational extraction only. The next useful slice is to audit the
remaining chat transcript presentation chrome after composer cleanup.

## Production-Grade Required Contract

### Goal

Reduce chat route ownership drift in `App.tsx` while preserving the existing
composer behavior contract.

### Scope

The scope is limited to chat composer presentation ownership and source-of-truth
documentation for that ownership.

### Implementation Plan

See the implementation plan above.

### Acceptance Criteria

See the acceptance criteria above.

### Definition of Done

`DEFINITION_OF_DONE.md` was applied at the slice level: the change is small,
validated, documented, and reversible.

### Result Report

See the result report below.

## Integration Evidence

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: future engineering agents maintaining v1 chat route
- Existing workaround or pain: composer markup was embedded in the large app route branch
- Smallest useful slice: move only composer shell chrome
- Success metric or signal: route smoke remains green
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: not applicable

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: authenticated chat route render and send composer
- SLI: not applicable
- SLO: not applicable
- Error budget posture: not applicable
- Health/readiness check: not applicable
- Logs, dashboard, or alert route: not applicable
- Smoke command or manual smoke: `npm run smoke:routes`
- Rollback or disable path: revert the refactor commit

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: yes
- Endpoint and client contract match: yes
- DB schema and migrations verified: not applicable
- Loading state verified: route smoke
- Error state verified: not applicable
- Refresh/restart behavior verified: build and route smoke
- Regression check performed: build and route smoke

## AI Testing Evidence

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: no new data
- Trust boundaries: unchanged
- Permission or ownership checks: unchanged
- Abuse cases: not applicable
- Secret handling: none
- Security tests or scans: not applicable
- Fail-closed behavior: unchanged
- Residual risk: low

- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios: not applicable
- Multi-step context scenarios: not applicable
- Adversarial or role-break scenarios: not applicable
- Prompt injection checks: not applicable
- Data leakage and unauthorized access checks: not applicable
- Result: not applicable

## Result Report

- Task summary: extracted chat composer shell chrome into `ChatComposerShell`.
- Files changed:
  - `web/src/components/chat.tsx`
  - `web/src/App.tsx`
  - `docs/frontend/route-component-map.md`
  - `docs/frontend/app-route-cluster-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `Push-Location .\web; npm run smoke:routes; Pop-Location`
  - `git diff --check`
- What is incomplete:
  - chat transcript presentation row ownership still needs a follow-up audit
- Next steps:
  - PRJ-1006 audit chat transcript presentation extraction
- Decisions made:
  - send behavior remains in `App()` and is passed through explicit props

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues:
  - composer shell chrome was still embedded in the large chat route branch
- Gaps:
  - chat transcript row markup still remains inline
- Inconsistencies:
  - docs named composer extraction as next but implementation had not yet been
    wired into `App.tsx`
- Architecture constraints:
  - presentation may move; send behavior and optimistic transcript ownership stay in `App()`

### 2. Select One Priority Task
- Selected task: PRJ-1005
- Priority rationale: it was the next queued v1 frontend architecture slice
- Why other candidates were deferred:
  - transcript row extraction needs a follow-up audit after this component boundary exists
  - provider/health helper ownership remains coupled to integrations

### 3. Plan Implementation
- Files or surfaces to modify:
  - chat component module, chat route usage, frontend docs, context docs
- Logic:
  - pass quick actions, text, labels, icons, and handlers into the shell
- Edge cases:
  - preserve disabled send state, textarea updates, and explicit submit handler

### 4. Execute Implementation
- Implementation notes:
  - `ChatComposerShell` receives all behavior through props and owns only markup

### 5. Verify and Test
- Validation performed:
  - build
  - route smoke
  - diff check
- Result:
  - passed

### 6. Self-Review
- Simpler option considered:
  - leave composer inline; rejected because docs already selected the extraction
- Technical debt introduced: no
- Scalability assessment:
  - adequate for the next chat route decomposition slice
- Refinements made:
  - imported `FormEvent` explicitly for local type clarity

### 7. Update Documentation and Knowledge
- Docs updated:
  - frontend route/component map
  - app route cluster audit
  - v1 roadmap
- Context updated:
  - task board
  - project state
- Learning journal updated: not applicable
