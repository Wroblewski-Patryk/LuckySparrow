# Task

## Header
- ID: PRJ-707
- Title: Freeze locale metadata foundation for GUI language UX
- Status: DONE
- Owner: Planning Agent
- Depends on: PRJ-706
- Priority: P1

## Context
`ui_language` is now a valid product contract, but the current selector still
acts as a light proof-of-concept. Future web-to-mobile reuse needs one stable
metadata model for locale label, native label, icon asset posture, and fallback
semantics.

## Goal
Plan a durable locale UX foundation for first-party clients without changing
the runtime-owned conversation-language boundary.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] One locale metadata model is documented for web and later mobile reuse.
- [x] GUI language remains explicitly separate from runtime-owned conversation language.
- [x] flag or locale-icon rendering posture is described without relying on implicit system emoji behavior.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
- Manual checks:
  - reviewed current `ui_language` contract in frontend and app-facing settings API
  - selector now renders from one metadata model carrying value, native label, localized label, icon token, and fallback posture
  - GUI locale remains explicitly separate from runtime-owned conversation language
- Screenshots/logs:
  - selector foundation now lives in `web/src/App.tsx`
  - planning contract updated in `docs/planning/open-decisions.md` and `docs/planning/web-ux-ui-productization-plan.md`
- High-risk checks:
  - confirmed no locale planning change overloads `preferred_language` or conversation-language control

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/16_agent_contracts.md`
  - `docs/planning/open-decisions.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
  - not applicable
- Follow-up architecture doc updates:
  - planning and context sync completed in this slice

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
This slice is about durable UX metadata planning, not about introducing a new
translation subsystem.
- Completed on 2026-04-25 with shared locale metadata in `web/src/App.tsx`.
