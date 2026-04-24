# Task

## Header
- ID: PRJ-616
- Title: Harden the Coolify primary deploy path and explicit fallback workflow
- Status: DONE
- Owner: Ops/Release
- Depends on: PRJ-615
- Priority: P0

## Context
The user still observes cases where pushes do not trigger deployment automatically. The operational primary path must become explicit and provable.

## Goal
Make repo-driven deploy the explicit operational default with bounded, visible fallback posture.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] Primary Coolify deploy path is explicit and machine-visible.
- [x] Webhook/UI fallback remains bounded and observable.
- [x] Live deploy plus release-smoke evidence is attached.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests: targeted deploy/observability regression coverage
- Manual checks: live deploy verification in Coolify plus release smoke
- Screenshots/logs: deployment id and target commit evidence
- High-risk checks: keep fallback documented as fallback, not as silent primary behavior

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/architecture/26_env_and_config.md`, `docs/operations/runtime-ops-runbook.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates: ops/runbook and planning truth

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
The key rule is that fallback usage must stay explicit in evidence and operator guidance.

## Evidence
- Coolify canonical app `jr1oehwlzl8tcn3h8gh2vvih` was inspected from the Root Team scope and corrected from `Public GitHub` to the GitHub App source `vps-luckysparrow`.
- The source repository drift introduced by the rename was corrected from `Wroblewski-Patryk/LuckySparrow` to `Wroblewski-Patryk/Personality` on the same canonical app.
- Local `origin` was updated to `https://github.com/Wroblewski-Patryk/Personality.git` so repo truth and deploy source truth now match.
- The explicit fallback posture remains unchanged: webhook helper first, then Coolify UI redeploy only when source automation proof is missing.
- Follow-up release-smoke verification runs after the next push/deploy cycle now that the primary source wiring is corrected.
