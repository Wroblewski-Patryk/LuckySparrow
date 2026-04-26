# Task

## Header
- ID: PRJ-730
- Title: Personality Module Implementation On Shared Visual Foundations
- Task Type: design
- Current Stage: planning
- Status: READY
- Owner: Frontend Builder
- Depends on: PRJ-729
- Priority: P0

## Context
Once the dashboard foundation is proven and personality IA is frozen, the
personality route should be rebuilt as the flagship module of the visual
system.

## Goal
Plan the implementation slice that translates the body-map motif and cognitive
layers into a product-facing `personality` route using only shared visual
foundations and approved variants.

## Deliverable For This Stage
- one explicit implementation slice for the personality route
- one inventory of reused shared components and required variants
- one validation plan covering product clarity and responsive behavior

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Definition of Done
- [ ] shared-component reuse is listed
- [ ] personality-specific variants are listed
- [ ] responsive and state expectations are listed

## Stage Exit Criteria
- [ ] The output matches the declared `Current Stage`.
- [ ] Work from later stages was not mixed in without explicit approval.
- [ ] Risks and assumptions for this stage are stated clearly.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval
- implicit stage skipping

## Validation Evidence
- Tests:
- Manual checks:
- Screenshots/logs:
- High-risk checks:

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
- Fits approved architecture: yes | no
- Mismatch discovered: yes | no
- Decision required from user: yes | no
- Approval reference if architecture changed:
- Follow-up architecture doc updates:

## UX/UI Evidence (required for UX tasks)
- Design source type: approved_snapshot
- Design source reference:
- Stitch used: no
- Experience-quality bar reviewed: yes | no
- Visual-direction brief reviewed: yes | no
- Existing shared pattern reused:
- New shared pattern introduced: yes | no
- Design-memory entry reused:
- Design-memory update required: yes | no
- State checks: loading | empty | error | success
- Responsive checks: desktop | tablet | mobile
- Input-mode checks: touch | pointer | keyboard
- Accessibility checks:
- Parity evidence:

## Deployment / Ops Evidence (required for runtime or infra tasks)
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated:
- Rollback note:

## Review Checklist (mandatory)
- [ ] Current stage is declared and respected.
- [ ] Deliverable for the current stage is complete.
- [ ] Architecture alignment confirmed.
- [ ] Existing systems were reused where applicable.
- [ ] No workaround paths were introduced.
- [ ] No logic duplication was introduced.
- [ ] Definition of Done evidence is attached.
- [ ] Relevant validations were run.
- [ ] Docs or context were updated if repository truth changed.
- [ ] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
- The route should feel like the emotional and architectural center of the app
  while still clearly belonging to the shared system.
