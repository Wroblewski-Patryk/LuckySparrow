# Task

## Header
- ID: PRJ-570
- Title: Restore production migration parity by switching Coolify Postgres to a pgvector-enabled image
- Status: IN_PROGRESS
- Owner: Ops/Release
- Depends on: PRJ-569
- Priority: P0

## Context
Production Telegram traffic reaches the service, but the Coolify deployment
stack still uses plain `postgres:15` in the repository-driven
`docker-compose.coolify.yml`. Full Alembic migration to `head` now requires the
PostgreSQL `vector` extension, so production cannot satisfy the approved
migration-first architecture without a pgvector-capable database image.

## Goal
Switch the production Coolify compose baseline to a pgvector-enabled PostgreSQL
image, deploy it, complete the pending Alembic migrations, and restore
Telegram/API turn handling without introducing a compatibility bypass.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [ ] `docker-compose.coolify.yml` uses a pgvector-capable PostgreSQL 15 image.
- [ ] production deployment completes with Alembic upgraded to `head`.
- [ ] production `/health` is reachable again and no longer fails foreground
  turns because of missing schema columns or missing `vector` extension.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
- Manual checks:
- Screenshots/logs:
- High-risk checks:

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/26_env_and_config.md`
  - `docs/operations/runtime-ops-runbook.md`
- Fits approved architecture: yes
- Mismatch discovered: yes
- Decision required from user: yes
- Approval reference if architecture changed:
  - user selected option 2 on 2026-04-23 to restore migration-first parity by
    switching production DB to a pgvector-enabled image
- Follow-up architecture doc updates:
  - deployment and config docs must explicitly record the pgvector image
    requirement for Coolify production

## Review Checklist (mandatory)
- [ ] Architecture alignment confirmed.
- [ ] Existing systems were reused where applicable.
- [ ] No workaround paths were introduced.
- [ ] No logic duplication was introduced.
- [ ] Definition of Done evidence is attached.
- [ ] Relevant validations were run.
- [ ] Docs or context were updated if repository truth changed.
- [ ] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
This task closes a production-only architecture mismatch: the repo-driven
Coolify compose file was still pinned to `postgres:15` even though semantic
retrieval migrations now require `CREATE EXTENSION vector`.
