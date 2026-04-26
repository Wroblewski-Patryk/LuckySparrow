# Task

## Header
- ID: PRJ-705
- Title: Freeze responsive tier rules for mobile, tablet, and desktop
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-704
- Priority: P1

## Context
The current shell is clearly mobile-first, but tablet still behaves mostly as a
scaled phone layout. The next iteration needs explicit tier rules so later
visual changes do not regress into one-size-fits-all responsive behavior.

## Goal
Make responsive behavior deliberate:

- define tablet-specific layout posture
- align spacing and typography per tier
- prevent desktop or mobile assumptions from dominating the intermediate tier

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] One explicit responsive posture is defined and implemented for mobile, tablet, and desktop.
- [x] tablet is no longer only a scaled mobile view.
- [x] the chosen tier rules are screenshot-proven across the main routes.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
- Manual checks:
  - tablet now uses top navigation and route-summary quick stats instead of mobile bottom navigation
  - chat, settings, tools, and personality all retain one shared shell while shifting into earlier multi-column postures on wider tiers
  - sticky composer and sticky save bar now drop the mobile bottom offset at `md`, matching the tablet shell posture
- Screenshots/logs:
  - multi-viewport artifact set captured in `.codex/artifacts/prj705-responsive-proof/`
  - saved screenshots:
    - `login-mobile.png`
    - `chat-{mobile,tablet,desktop}.png`
    - `settings-{mobile,tablet,desktop}.png`
    - `tools-{mobile,tablet,desktop}.png`
    - `personality-{mobile,tablet,desktop}.png`
- High-risk checks:
  - confirmed the responsive tier work stayed inside shared shell classes and did not add route-specific layout forks

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
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
Treat `tablet` as its own product tier, not just an interpolation between two extremes.
- Completed on 2026-04-25 with responsive-shell class changes and screenshot proof in `web/src/App.tsx`.
