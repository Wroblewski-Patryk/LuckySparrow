# Task

## Header
- ID: PRJ-617
- Title: Sync docs/context for production truth and deploy automation closure
- Status: DONE
- Owner: Product Docs Agent
- Depends on: PRJ-616
- Priority: P1

## Context
After the deploy-parity and Coolify primary-path baseline is real, the same truth must be visible in docs and repository context.

## Goal
Synchronize planning, ops, testing, and context for the final deploy-truth baseline.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] Planning docs reflect the deploy-truth and parity contract.
- [x] Ops/testing guidance reflects the same primary/fallback deploy posture.
- [x] Repository context reflects the current production-truth baseline.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests: doc-and-context sync
- Manual checks: cross-review against live deploy evidence and smoke contract
- Screenshots/logs:
- High-risk checks: avoid leaving old deploy assumptions in planning/context

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/architecture/17_logging_and_debugging.md`, `docs/architecture/26_env_and_config.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates: runtime reality/runbook/testing/planning/context

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
This slice should close the lane, not reopen deploy behavior as an open decision.

## Evidence
- Planning truth now records `PRJ-616` as the operational slice that corrected the canonical Coolify source wiring after the repository rename.
- Ops guidance now explicitly treats `Public GitHub` on the canonical production app as drift and `vps-luckysparrow` plus `Wroblewski-Patryk/Personality` as the required source baseline.
- Repository context now captures the recurring pitfall that team-scope selection and source-type drift can hide the real deploy failure mode even while production itself remains healthy.
