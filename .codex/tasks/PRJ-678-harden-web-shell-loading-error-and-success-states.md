# Task

## Header
- ID: PRJ-678
- Title: Harden web-shell loading, error, empty, and success states across the current routes
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-677
- Priority: P1

## Context
Once backend route health and route loading are repaired, the shell still needs
one consistent UX pass so errors do not bleed across screens, loading states do
not persist without end, and success states remain understandable for the
current product surface.

## Goal
Polish the existing web shell so auth, chat, settings, tools, and personality
have coherent user-visible state handling aligned with backend truth.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] Each current route has a truthful loading, error, empty, and success
      state where applicable.
- [x] Stale global errors do not incorrectly dominate later healthy screens.
- [x] The repaired shell feels coherent without inventing new product
      subsystems or UI-only truth.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `Push-Location web; npm run build; Pop-Location`
  - `Push-Location backend; ..\.venv\Scripts\python -m pytest -q tests/test_web_routes.py tests/test_deployment_trigger_scripts.py; Pop-Location`
- Manual checks:
  - route navigation now clears stale errors and successful tool/personality
    loads can complete
  - 2026-04-25 production verification on `https://personality.luckysparrow.ch/` confirmed login, `/app/me`, `/app/chat/history`, `/app/me/settings`, `/app/tools/overview`, `/app/personality/overview`, chat send, and logout all complete without stale parser errors or endless loading posture
- Screenshots/logs:
  - `.\backend\scripts\run_release_smoke.ps1 -BaseUrl https://personality.luckysparrow.ch`
- High-risk checks:
  - backend-owned SPA serving now rewrites the web-shell build revision meta to runtime `APP_BUILD_REVISION`, so deploy parity no longer depends on frontend build-time variable propagation

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: docs/architecture/16_agent_contracts.md;
  docs/overview.md
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates:

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
This is a polish pass only after the current broken product paths are restored.
