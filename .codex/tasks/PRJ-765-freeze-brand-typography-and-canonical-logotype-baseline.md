# Task

## Header
- ID: PRJ-765
- Title: Freeze brand typography and canonical logotype baseline
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-743
- Priority: P2

## Context
The web shell already has a reusable premium visual system, but the canonical
brand typography and real logotype asset were still implicit. The user has now
provided the approved font pairing and canonical bird logotype assets for
future UX/UI work.

## Goal
Record the approved brand baseline in repo source-of-truth files and wire it
into the first-party web shell without creating a parallel visual system.

## Deliverable For This Stage
Verified doc and web updates that freeze the font pairing, store the canonical
assets in the repository, and replace the current text-only shell logotype with
the provided SVG.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Definition of Done
- [x] Canonical UX docs store the approved typography and logotype rules.
- [x] The provided SVG and PNG assets live in repo-owned canonical paths.
- [x] The web shell uses the canonical SVG logotype and new font pairing.

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
- Manual checks:
  - confirmed canonical logo assets exist in both `docs/ux/assets/` and `web/public/`
- Screenshots/logs:
  - none in this slice
- High-risk checks:
  - verified the change stays inside the existing web visual system rather than introducing a second branding path

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/architecture-source-of-truth.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
  - none
- Follow-up architecture doc updates:
  - clarified that brand and typography truth for first-party surfaces is owned in `docs/ux/`

## UX/UI Evidence (required for UX tasks)
- Design source type: approved_snapshot
- Design source reference:
  - user-provided `C:/Users/wrobl/Desktop/UIUX/aion - logotype.svg`
  - user-provided `C:/Users/wrobl/Desktop/UIUX/aion - logotype - logo.png`
- Canonical visual target:
  - repository-owned brand baseline for first-party shell logotype and typography
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused:
  - shared shell typography and header/rail structure
- New shared pattern introduced: no
- Design-memory entry reused:
  - flagship shell and shared premium route framing
- Design-memory update required: yes
- Visual gap audit completed: yes
- Background or decorative asset strategy:
  - use the provided SVG directly for the canonical logotype instead of approximating it in CSS or text
- Canonical asset extraction required: yes
- Screenshot comparison pass completed: no
- Remaining mismatches:
  - no screenshot-proof pass was executed in this slice
- State checks: success
- Responsive checks: desktop | mobile
- Input-mode checks: pointer
- Accessibility checks:
  - logomark is decorative brand media paired with visible `AVIARY` brand text
- Parity evidence:
  - local production build passed

## Deployment / Ops Evidence (required for runtime or infra tasks)
- Deploy impact: low
- Env or secret changes:
  - none
- Health-check impact:
  - none
- Smoke steps updated:
  - no
- Rollback note:
  - revert web branding files and doc sync if the brand baseline changes again

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
- This slice intentionally freezes the brand baseline and shell usage only.
- Full screenshot-proof parity can still be handled by the broader UX proof lane.
