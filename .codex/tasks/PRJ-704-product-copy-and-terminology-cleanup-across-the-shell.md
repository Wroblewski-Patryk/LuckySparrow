# Task

## Header
- ID: PRJ-704
- Title: Product Copy And Terminology Cleanup Across The Shell
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-703
- Priority: P0

## Context
Current UI copy still contains architecture-oriented terms such as `backend
truth`, `live contract`, endpoint references, and other internal framing that
belongs in docs or inspect mode rather than primary product surfaces.

## Goal
Replace system wording with user-facing product language across login, shell,
settings, tools, and personality surfaces while preserving truthful behavior.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] Primary shell copy no longer references backend contracts or raw endpoints as user-facing value.
- [x] Shared terminology across routes reads consistently as product copy.
- [x] Any remaining technical detail is explicitly secondary or inspect-only.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
- Manual checks:
  - copy review across `/login`, `/chat`, `/settings`, `/tools`, and `/personality`
  - route descriptions, loading copy, saved-state labels, and inspect labels now avoid backend/contract/endpoint framing
  - remaining technical detail stays inside secondary detail areas such as collapsible details panels
- Screenshots/logs:
  - `vite build` passed after the shared copy cleanup
- High-risk checks:
  - product wording stays truthful and does not imply new capabilities or client-owned logic

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
The user-facing shell should describe outcomes, actions, and states rather than
internal implementation posture.
- Completed on 2026-04-25 with shared copy cleanup in `web/src/App.tsx`.
