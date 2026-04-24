# Task

## Header
- ID: PRJ-621
- Title: Sync docs/context for live web-knowledge workflows
- Status: DONE
- Owner: Product Docs Agent
- Depends on: PRJ-620
- Priority: P1

## Context
After website-reading becomes a named production workflow with evidence, docs and context must describe the same user-facing truth.

## Goal
Synchronize runtime reality, testing, ops, and planning/context for the live web-knowledge workflow.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] Canonical docs reflect the website-reading workflow baseline.
- [x] Runtime reality/testing/ops reflect the same proof path.
- [x] Repository context reflects the same lane completion state.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests: doc-and-context sync based on completed `PRJ-620` validation evidence
- Manual checks: cross-review against runtime truth plus behavior/release proof surfaces
- Screenshots/logs:
- High-risk checks: avoid mixing website-reading baseline with future unrestricted browsing claims

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/architecture/10_future_vision.md`, `docs/architecture/16_agent_contracts.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates: runtime reality/testing/runbook/planning/context

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
This slice should make it obvious to a later UI/admin layer what "website reading" actually means in `v1`.

Completion notes:

- runtime reality, testing guidance, ops notes, planning truth, and project
  context now all describe the same bounded website-reading workflow
- the proof path is now explicit across:
  - `/health.connectors.web_knowledge_tools.website_reading_workflow`
  - `incident_evidence.policy_posture["connectors.web_knowledge_tools"]`
  - `health_snapshot.json.connectors.web_knowledge_tools`
  - behavior-validation scenarios `T14.1`, `T14.2`, and `T17.1`
