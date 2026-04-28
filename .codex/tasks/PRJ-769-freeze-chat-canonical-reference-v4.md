# Task

## Header
- ID: PRJ-769
- Title: Freeze Chat Canonical Reference V4
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Product Docs Agent
- Depends on: PRJ-743
- Priority: P0

## Context
The active flagship route convergence lane already treats canonical route
screenshots as the source of truth for UX/UI parity work. A newer approved chat
reference has been supplied to make the `chat` target more precise before the
next implementation comparison loop.

## Goal
Replace the active canonical `chat` visual target with the supplied v4
approved snapshot and synchronize the planning/context surfaces that future
chat parity work reads.

## Deliverable For This Stage
- verification evidence that the v4 chat asset exists in the canonical assets
  folder
- active UX/planning references point at the v4 chat target
- no route implementation is changed in this docs-and-asset slice

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Definition of Done
- [x] The supplied v4 chat snapshot is stored under `docs/ux/assets/`.
- [x] Canonical UX docs and active convergence plans point to the v4 chat
      target.
- [x] Project context and task board record the changed target.

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
  - not run; docs-and-asset-only change
- Manual checks:
  - `Test-Path docs/ux/assets/aion-chat-canonical-reference-v4.png`
  - active canonical and planning references reviewed for the chat target
- Screenshots/logs:
  - source image: `C:\Users\wrobl\Desktop\UIUX\aion - chat - v4.png`
  - canonical asset: `docs/ux/assets/aion-chat-canonical-reference-v4.png`
- High-risk checks:
  - no `web/src/` implementation files changed by this slice

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/context/TASK_BOARD.md`
  - `docs/ux/canonical-web-screen-reference-set.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
  - not applicable
- Follow-up architecture doc updates:
  - none; this is UX target synchronization, not architecture change

## UX/UI Evidence (required for UX tasks)
- Design source type: approved_snapshot
- Design source reference:
  - `C:\Users\wrobl\Desktop\UIUX\aion - chat - v4.png`
- Canonical visual target:
  - `docs/ux/assets/aion-chat-canonical-reference-v4.png`
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused:
  - canonical route-screen reference set
  - screenshot-parity workflow
- New shared pattern introduced: no
- Design-memory entry reused:
  - `docs/ux/design-memory.md`
- Design-memory update required: no
- Visual gap audit completed: no
- Background or decorative asset strategy:
  - preserve image-based embodied-stage fidelity from the approved snapshot
- Canonical asset extraction required: no
- Screenshot comparison pass completed: no
- Remaining mismatches:
  - next implementation loop must compare the live route against v4 instead of
    the previous v2 reference
- State checks: loading | empty | error | success
- Responsive checks: desktop | tablet | mobile
- Input-mode checks: touch | pointer | keyboard
- Accessibility checks:
  - not in scope for this source-of-truth swap
- Parity evidence:
  - pending next implementation/proof loop

## Deployment / Ops Evidence (required for runtime or infra tasks)
- Deploy impact: none
- Env or secret changes:
  - none
- Health-check impact:
  - none
- Smoke steps updated:
  - none
- Rollback note:
  - restore active chat canonical references to
    `docs/ux/assets/aion-chat-canonical-reference-v2.png`

## Review Checklist (mandatory)
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
This task only replaces the canonical visual target for future chat parity
work. It does not claim that the current implementation already matches the
new reference.
