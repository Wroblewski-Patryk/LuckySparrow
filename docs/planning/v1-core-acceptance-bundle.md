# V1 Core Acceptance Bundle

Last updated: 2026-05-02

## Status

Core no-UI `v1` behavior is production-green for the current deployed
candidate, but final release declaration remains blocked by the PRJ-908
incident-evidence export gap.

Update after PRJ-922: the PRJ-908 export-path blocker now has a passing
strict-mode production bundle. This document remains the PRJ-910 acceptance
snapshot; the final v1 declaration should be refreshed in a follow-up release
task against the PRJ-922 bundle.

Current evaluated production revision:

- `0e0929670fb669a94dd52498129147ef11281d66`

## Acceptance Summary

| Gate | Health Surface | Production State | Evidence | Residual Risk |
| --- | --- | --- | --- | --- |
| Conversation reliability | `/health.conversation_channels.telegram` | `provider_backed_ready` | Release smoke passed; bot token and webhook secret configured | Telegram live user round-trip smoke remains P1/PRJ-909 |
| Learned-state inspection | `/health.learned_state` | `inspection_surface_ready` | Health snapshot exposes internal inspection posture and required sections | Production incident bundle unavailable until PRJ-908 fix |
| Website reading | `/health.connectors.web_knowledge_tools.website_reading_workflow` | `ready_for_direct_and_search_first_review` | Health and release smoke expose direct and search-first page review readiness | No new risk for core gate |
| Tool-grounded learning | `/health.learned_state.tool_grounded_learning` | `tool_grounded_learning_surface_ready` | Health exposes action-owned external read summaries only, semantic memory layer, and no raw payload storage | Production incident bundle unavailable until PRJ-908 fix |
| Time-aware planned work | `/health.v1_readiness` | `foreground_due_delivery_and_recurring_reevaluation_ready` | Behavior validation and health expose planned-work policy owner, delivery path, and recurrence owner | No new risk for core gate |
| Deploy parity | `/health.deployment` and release smoke | runtime/web/local SHA match | Release smoke passed with deploy parity for `0e0929670fb669a94dd52498129147ef11281d66` | Every later commit requires fresh deploy parity smoke |

## Evidence Set

Local candidate validation:

- PRJ-905 backend tests: `1019 passed`
- PRJ-905 web production build: passed
- PRJ-905 behavior validation: `19 passed, 209 deselected`

Production validation:

- PRJ-907 release smoke with deploy parity passed for the published candidate
- PRJ-908 restoration release smoke passed after the failed temporary debug
  window
- Post-PRJ-908 documentation release smoke passed for
  `0e0929670fb669a94dd52498129147ef11281d66`

Current production health snapshot:

- `.codex/artifacts/prj910-health-snapshot.json`

The health snapshot is local evidence output and is not committed by default.

## Behavior Scenario Coverage

The current `v1_readiness.required_behavior_scenarios` list is:

- `T13.1`
- `T14.1`
- `T14.2`
- `T14.3`
- `T15.1`
- `T15.2`
- `T16.1`
- `T16.2`
- `T16.3`
- `T17.1`
- `T17.2`
- `T18.1`
- `T18.2`
- `T19.1`
- `T19.2`

PRJ-905 behavior validation passed with `19 passed, 209 deselected`.

## Extension Gates

The following are not core no-UI `v1` blockers:

- organizer daily-use workflows:
  `daily_use_workflows_blocked_by_provider_activation`
- provider credentials for ClickUp, Google Calendar, and Google Drive
- multimodal Telegram
- mobile/Expo restart
- richer web-v1 product honesty work

These remain explicit extension or P1/P2 tasks.

## Blocking Evidence Gap

PRJ-908 remains blocked:

- the canonical incident-evidence bundle helper requires
  `/internal/event/debug`
- production correctly returns `403` when debug payload access is disabled
- enabling `EVENT_DEBUG_ENABLED=true` under strict production policy made the
  runtime unhealthy during redeploy
- production was restored to `EVENT_DEBUG_ENABLED=false`
- release smoke passed after restoration

This means the core runtime gates are green, but the final release acceptance
bundle is not complete until a production-safe incident-evidence export path is
implemented or the bundle contract is explicitly revised.

## Go / No-Go

- Core no-UI v1 behavior: GO
- Production deploy parity: GO
- Final v1 release declaration: NO-GO until PRJ-908 is resolved or explicitly
  waived by a documented release decision

## Recommended Next Step

Start a narrow implementation task for a production-safe incident-evidence
export route that does not require full debug payload exposure. This is safer
than repeating a temporary debug window under strict production policy.
