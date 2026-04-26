# Task

## Header
- ID: PRJ-703
- Title: Login Value Framing And Trust Cleanup
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-722
- Priority: P1

## Context
The second-pass UX/UI lane now starts with the public login route. The current
shell is functional, but the first viewport still leads with architecture
language, system framing, and build chrome instead of fast product value and
trust.

## Goal
Reframe the public login experience around product value, trust, and quick
session entry while removing build-oriented chrome and architecture-heavy
language from the primary public view.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] Public login first viewport emphasizes product value and trust over architecture framing.
- [x] Build revision chrome is removed from the primary unauthenticated entry experience.
- [x] Web build passes after the login-route refresh.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
- Manual checks:
  - public `/login` hero now leads with return-to-conversation value framing
  - public technical badges and public build badge were removed from the unauthenticated entry screen
  - supporting public cards now reinforce trust, ownership, and preference control instead of backend contract wording
- Screenshots/logs:
  - `vite build` passed for the refreshed login route
- High-risk checks:
  - localized auth copy shape remains aligned across `en`, `pl`, and `de`

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
- Keep this slice limited to the unauthenticated entry experience.
- Completed on 2026-04-25 with login-only copy and layout changes in `web/src/App.tsx`.
