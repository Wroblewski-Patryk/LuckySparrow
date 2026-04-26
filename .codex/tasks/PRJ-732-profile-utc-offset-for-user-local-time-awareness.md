# Task

## Header
- ID: PRJ-732
- Title: Profile UTC Offset For User Local Time Awareness
- Task Type: feature
- Current Stage: release
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-717
- Priority: P1

## Context
The authenticated profile already owns stable user-facing continuity such as
`preferred_language` and `ui_language`, but the runtime still answers
date-and-time questions from the raw event timestamp without any explicit
profile-owned local offset.

That creates wrong local date or hour answers for users outside UTC even when
their first-party identity is already known through `/app/*` auth and linked
Telegram continuity.

## Goal
Add one bounded profile-owned UTC offset setting that:

- can be managed from authenticated profile settings
- stays inside the existing profile ownership boundary
- localizes current-turn timestamp truth before runtime reasoning
- avoids inventing a broader timezone-region or scheduling subsystem

## Deliverable For This Stage
- backend persistence, API contract, and runtime localization for
  profile-owned `utc_offset`
- web settings control for explicit `UTC±HH:MM` selection
- regression tests plus source-of-truth updates in task board, project state,
  and architecture/docs

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Definition of Done
- [x] Profile settings persist one explicit `utc_offset` value.
- [x] Runtime uses the stored offset to localize current-turn timestamp truth.
- [x] Tests and repository truth files are updated for the new contract.

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
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py tests/test_memory_repository.py tests/test_expression_agent.py tests/test_schema_baseline.py; Pop-Location`
  - `Push-Location .\web; npm run build; Pop-Location`
- Manual checks:
  - verified `/app/me/settings` now carries `utc_offset`
  - verified runtime event timestamp is localized from profile-owned offset
- Screenshots/logs:
  - none
- High-risk checks:
  - confirmed the change reuses `aion_profile` instead of adding a new timezone system

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/16_agent_contracts.md`
  - `docs/architecture/26_env_and_config.md`
  - `docs/overview.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates:
  - `docs/architecture/16_agent_contracts.md`
  - `docs/overview.md`

## UX/UI Evidence (required for UX tasks)
- Design source type: approved_snapshot
- Design source reference:
  - existing authenticated settings surface in `web/src/App.tsx`
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused:
  - authenticated settings cards
  - backend-owned `/app/me/settings` contract
- New shared pattern introduced: no
- Design-memory entry reused:
  - existing settings-card composition
- Design-memory update required: no
- State checks: success
- Responsive checks: desktop | tablet | mobile
- Input-mode checks: touch | pointer | keyboard
- Accessibility checks:
  - native `select` control used for bounded offset choices
- Parity evidence:
  - one shared offset control now feeds both app-auth and linked-runtime time truth

## Deployment / Ops Evidence (required for runtime or infra tasks)
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: revert the profile column, API field, and UI control together

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
- This task intentionally stores explicit UTC offset only.
- Region timezones and DST-aware automation remain outside this slice.
