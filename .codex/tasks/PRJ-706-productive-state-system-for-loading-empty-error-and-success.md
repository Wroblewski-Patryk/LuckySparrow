# Task

## Header
- ID: PRJ-706
- Title: Normalize product-facing loading, empty, error, and success states
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-705
- Priority: P1

## Context
The current routes already have loading and error affordances, but their tone
still feels system-first. Product quality now depends on making these states
clear, brief, and supportive instead of merely truthful transport feedback.

## Goal
Create one coherent product-state system across the shell while keeping current
backend-owned behavior and error truth.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] loading, empty, success, and error states share a consistent product posture across routes.
- [x] state messaging is shorter and more user-facing without hiding truthful failure detail.
- [x] route states remain thin wrappers over current backend-owned contracts.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
- Manual checks:
  - login now uses the same product-facing error wrapper as the authenticated shell
  - loading and empty states across chat continuity, tools, personality, and app bootstrap now share one state-panel posture
  - success and error banners now lead with short product guidance while keeping truthful detail expandable
- Screenshots/logs:
  - local route evidence captured by build verification and shell review in `web/src/App.tsx`
- High-risk checks:
  - failure detail remains available through expandable error details instead of being hidden or replaced

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/planning/web-ux-ui-productization-plan.md`
  - `docs/planning/next-iteration-plan.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
  - not applicable
- Follow-up architecture doc updates:
  - context sync after implementation

## Review Checklist (mandatory)
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated if repository truth changed.
- [ ] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
Truthful failure detail stays available, but the first line of feedback should
help the user recover.
- Completed on 2026-04-25 with shared state wrappers in `web/src/App.tsx`.
