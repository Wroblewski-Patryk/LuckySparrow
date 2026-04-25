# Task

## Header
- ID: PRJ-721
- Title: Account Settings Reset UX And Confirmation Flow
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-720
- Priority: P1

## Context
The shared backend cleanup owner and authenticated reset endpoint were already
implemented in `PRJ-720`. The remaining product slice was to expose that
bounded destructive action from the existing settings shell without creating a
parallel admin or workspace-reset flow.

## Goal
Add one explicit reset card in the authenticated settings route with deliberate
confirmation UX, clear retention messaging, and a truthful post-reset logout
handoff.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] Settings screen exposes one destructive reset card separate from normal profile/preferences save.
- [x] The reset flow requires the exact confirmation phrase before submission.
- [x] Success handling returns the user to login after backend session revocation.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: build passed
- Manual checks:
  - settings flow now renders a dedicated destructive card bound to `/app/me/reset-data`
- Screenshots/logs:
  - production bundle build completed after the new reset flow wiring
- High-risk checks:
  - reset CTA remains disabled until the exact confirmation phrase is entered
  - success path clears local authenticated state and redirects to `/login`

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/16_agent_contracts.md`
  - `docs/planning/user-data-reset-and-production-cleanup-plan.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
  - not applicable
- Follow-up architecture doc updates:
  - context and planning truth updated for `PRJ-721` completion and `PRJ-722` handoff

## Review Checklist (mandatory)
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated if repository truth changed.
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
- The web client reuses the backend contract through `web/src/lib/api.ts`.
- The reset card lives in `web/src/App.tsx` inside the existing settings route.
