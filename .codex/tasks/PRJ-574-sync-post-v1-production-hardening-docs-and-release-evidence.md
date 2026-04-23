# Task

## Header
- ID: PRJ-574
- Title: Sync post-v1 production-hardening docs and release evidence
- Status: DONE
- Owner: Product Docs Agent
- Depends on: PRJ-573
- Priority: P1

## Context
`PRJ-572` and `PRJ-573` externalized the production reflection queue drain and
the production maintenance/proactive cadence owner baseline on Coolify.
Canonical docs, planning truth, and context now need to stop describing those
lanes as live operational drift and instead record the verified production
baseline plus its release evidence path.

## Goal
Synchronize runtime reality, testing guidance, planning truth, and repository
context so they all describe the same externalized production ownership
baseline and the same evidence path for verifying it.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] runtime reality describes production reflection and cadence ownership as
      externalized baseline rather than open production drift.
- [x] testing guidance records the current release-evidence path for the
      externalized production-owner baseline.
- [x] planning/context truth marks the post-v1 production-hardening queue as
      complete through `PRJ-574`.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - docs-only slice; no new runtime code paths changed
- Manual checks:
  - cross-review against completed production evidence from `PRJ-572` and
    `PRJ-573`
  - production proof baseline remains:
    - `/health.reflection.external_driver_policy.selected_runtime_mode=deferred`
    - `/health.reflection.supervision.production_supervision_ready=true`
    - `/health.scheduler.external_owner_policy.selected_execution_mode=externalized`
    - `/health.scheduler.external_owner_policy.cutover_proof_ready=true`
    - `/health.scheduler.external_owner_policy.production_baseline_ready=true`
    - `.\scripts\run_release_smoke.ps1 -BaseUrl 'https://personality.luckysparrow.ch'` -> passed
- Screenshots/logs:
  - source-of-truth sync in runtime reality, testing guidance, planning docs,
    task board, and project state
- High-risk checks:
  - none beyond truth-sync drift; runtime and deployment behavior were not
    modified in this slice

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/16_agent_contracts.md`
  - `docs/operations/runtime-ops-runbook.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates:
  - none expected; this slice syncs implementation/planning truth only

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
This slice is docs/context only. Runtime and deployment evidence were produced
in `PRJ-572` and `PRJ-573`; this task records them as the canonical post-v1
production-hardening baseline.
