# Task

## Header
- ID: PRJ-766
- Title: Freeze Aviary brand and unnamed personality boundary
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-765
- Priority: P2

## Context
The first branding pass froze typography and the bird mark, but the shell still
used `AION` as the visible product name and also treated the embodied
personality as if it already had a fixed proper name.

## Goal
Freeze `Aviary` as the app-shell brand while keeping the personality
intentionally unnamed in first-party UX until identity work explicitly names it.

## Deliverable For This Stage
Verified documentation and web-shell updates that distinguish product branding
from personality naming and apply the Aviary lockup in the interface.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Definition of Done
- [x] Canonical UX docs describe `Aviary` as the product brand.
- [x] Canonical UX docs describe the personality as intentionally unnamed.
- [x] The web shell uses the Aviary lockup and avoids assigning a fixed proper name to the personality.

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
  - reviewed user-facing shell copy for product-name vs personality-name distinction
- Screenshots/logs:
  - none in this slice
- High-risk checks:
  - kept internal runtime `AION` architecture ownership separate from first-party product branding

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/architecture-source-of-truth.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
  - none
- Follow-up architecture doc updates:
  - clarified that UX docs own product-brand vs personality-name presentation rules

## UX/UI Evidence (required for UX tasks)
- Design source type: approved_snapshot
- Design source reference:
  - user-provided `C:/Users/wrobl/Desktop/UIUX/aion - logotype.svg`
  - user-provided typography guidance for `Cormorant Garamond` and `Inter`
- Canonical visual target:
  - Aviary brand lockup plus unnamed embodied personality inside the product shell
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused:
  - shared shell framing and existing route family
- New shared pattern introduced: no
- Design-memory entry reused:
  - brand logotype and font pairing
- Design-memory update required: yes
- Visual gap audit completed: yes
- Background or decorative asset strategy:
  - reuse the provided bird mark as the logomark and pair it with a code-native `AVIARY` wordmark in the approved typeface
- Canonical asset extraction required: yes
- Screenshot comparison pass completed: no
- Remaining mismatches:
  - no screenshot-proof pass was executed in this slice
- State checks: success
- Responsive checks: desktop | mobile
- Input-mode checks: pointer
- Accessibility checks:
  - brand mark is decorative while visible `AVIARY` text carries the readable brand name
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
  - revert shell-brand copy and lockup wiring if a later naming decision changes the product brand

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
- Internal runtime, schema, and protocol identifiers still use `AION` where
  they represent architecture or implementation truth rather than product-brand
  copy.
