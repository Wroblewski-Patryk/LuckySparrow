# Task

## Header
- ID: PRJ-708
- Title: Harden visual hierarchy and badge semantics across the shell
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-707
- Priority: P1

## Context
The current visual system is coherent, but too many badges and bordered cards
share similar emphasis. This flattens hierarchy and makes state chips feel more
decorative than semantic.

## Goal
Refine the design system so that emphasis, status, and action are easier to
scan across routes.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] badge usage is reduced or made more semantic across public and authenticated routes.
- [x] visual hierarchy between title, body, state, and action is clearer across key cards.
- [x] updated system still fits the existing Tailwind and daisyUI-based stack.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests: `Push-Location .\web; npm run build; Pop-Location`
- Manual checks: visual review against refreshed login and authenticated route screenshots after hierarchy cleanup
- Screenshots/logs: refreshed proof set under `.codex/artifacts/prj708-visual-hierarchy-proof/`
- High-risk checks: preserved status chips only where they still communicate tool state or required action

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/architecture/02_architecture.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: n/a
- Follow-up architecture doc updates: none expected

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
This is a semantic pass, not a theme replacement.

Completed on 2026-04-25 by reducing decorative badge usage in `web/src/App.tsx`
and shifting emphasis back to overlines, headings, metric tiles, and status-only
chips. Refreshed browser proof was captured against the local Vite shell with
routed fixture responses in `.codex/artifacts/prj708-visual-hierarchy-proof/`.
