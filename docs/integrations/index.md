# Provider Integration Reference

Last updated: 2026-05-03

This reference maps provider-specific integration ownership without exposing
secrets. It separates provider readiness from connector authorization policy.

Grounded in:

- `backend/app/integrations/`
- `backend/app/core/connector_execution.py`
- `backend/app/core/connector_policy.py`
- `backend/app/core/app_tools_policy.py`
- `backend/app/api/routes.py`

## Boundary Rules

- Provider credentials are never documented as values.
- Provider readiness means the required settings are configured and the code has
  a live provider-backed path.
- Connector policy capability means the operation has an approved permission
  shape, not that provider execution is ready.
- Mutating external operations require confirmation according to connector
  policy.
- The frontend renders backend-owned readiness and permission posture; it must
  not reconstruct authorization client-side.

## Provider Readiness Matrix

| Provider | Modules | Required Settings | Live Operations | Readiness Source | Tests | Gaps |
| --- | --- | --- | --- | --- | --- | --- |
| ClickUp | `backend/app/integrations/task_system/clickup_client.py` | `CLICKUP_API_TOKEN`, `CLICKUP_LIST_ID` | `task_system.clickup_create_task`, `task_system.clickup_list_tasks`, `task_system.clickup_update_task` | `clickup_task_create_ready`, `connector_execution_baseline_snapshot`, `organizer_tool_stack_snapshot` | `backend/tests/test_action_executor.py`, `backend/tests/test_connector_policy.py`, `backend/tests/test_api_routes.py` | Live smoke depends on credentials; provider-specific response examples are not checked in. |
| Google Calendar | `backend/app/integrations/calendar/google_calendar_client.py` | `GOOGLE_CALENDAR_ACCESS_TOKEN`, `GOOGLE_CALENDAR_CALENDAR_ID`, `GOOGLE_CALENDAR_TIMEZONE` | `calendar.google_calendar_read_availability` | `google_calendar_read_ready`, `connector_execution_baseline_snapshot`, `organizer_tool_stack_snapshot` | `backend/tests/test_action_executor.py`, `backend/tests/test_connector_policy.py` | Calendar mutations are policy-defined but not provider-backed live paths in this pass. |
| Google Drive | `backend/app/integrations/cloud_drive/google_drive_client.py` | `GOOGLE_DRIVE_ACCESS_TOKEN`, `GOOGLE_DRIVE_FOLDER_ID` | `cloud_drive.google_drive_list_files` | `google_drive_list_ready`, `connector_execution_baseline_snapshot`, `organizer_tool_stack_snapshot` | `backend/tests/test_action_executor.py`, `backend/tests/test_connector_policy.py` | Document read/search/upload/update/delete are policy-defined but not provider-backed live paths in this pass. |
| Telegram | `backend/app/integrations/telegram/client.py`, `backend/app/integrations/telegram/telemetry.py` | `TELEGRAM_BOT_TOKEN`; webhook secret for webhook protection | delivery/ingress through Telegram client, app link-code start through `POST /app/tools/telegram/link/start` | Telegram telemetry snapshot and app tools overview | `backend/tests/test_telegram_client.py`, `backend/tests/test_delivery_router.py`, `backend/tests/test_api_routes.py` | Live round-trip depends on bot/webhook configuration and user link state. |
| DuckDuckGo knowledge search | `backend/app/integrations/knowledge_search/duckduckgo_client.py` | none documented in readiness baseline | `knowledge_search.search_web` through `duckduckgo_html` | `connector_execution_baseline_snapshot`, `web_knowledge_tooling_snapshot` | `backend/tests/test_action_executor.py`, `backend/tests/test_connector_policy.py` | Provider/API stability is external; no provider-specific examples checked in. |
| Generic HTTP web browser | `backend/app/integrations/web_browser/generic_http_client.py` | none documented in readiness baseline | `web_browser.read_page` through `generic_http` | `connector_execution_baseline_snapshot`, `web_knowledge_tooling_snapshot` | `backend/tests/test_action_executor.py`, `backend/tests/test_connector_policy.py` | Bounded read-only posture; no browser rendering or login-capable browsing. |
| OpenAI | `backend/app/integrations/openai/client.py`, `backend/app/integrations/openai/prompting.py` | OpenAI provider settings when enabled | model calls, prompting support, embeddings/classification where configured | OpenAI client/config and embedding strategy policies | `backend/tests/test_openai_client.py`, `backend/tests/test_openai_prompting.py`, `backend/tests/test_embedding_strategy.py` | This is not part of connector authorization matrix; provider behavior depends on configured model/feature flags. |
| Delivery router | `backend/app/integrations/delivery_router.py` | provider settings for selected channel | app/Telegram delivery routing | runtime/action delivery path | `backend/tests/test_delivery_router.py`, `backend/tests/test_runtime_pipeline.py` | Delivery success depends on channel readiness and user link/profile state. |

## Sanitized Examples

Provider request/response examples now live in:

- [Provider Request/Response Examples](provider-request-response-examples.md)

The examples cover current provider-backed paths and known failure shapes
without exposing secrets, raw provider payload bodies, or private user data.

## Connector Authorization Matrix

These operations are defined by `_OPERATION_POLICIES` in
`backend/app/core/connector_policy.py`.

| Operation ID | Mode | Confirmation | Provider-Backed Live Path |
| --- | --- | --- | --- |
| `calendar.read_availability` | `read_only` | no | `google_calendar_read_availability` when configured |
| `calendar.suggest_slots` | `suggestion_only` | no | policy-only |
| `calendar.create_event` | `mutate_with_confirmation` | yes | policy-only |
| `calendar.update_event` | `mutate_with_confirmation` | yes | policy-only |
| `calendar.cancel_event` | `mutate_with_confirmation` | yes | policy-only |
| `task_system.list_tasks` | `read_only` | no | `clickup_list_tasks` when configured |
| `task_system.suggest_sync` | `suggestion_only` | no | policy-only |
| `task_system.create_task` | `mutate_with_confirmation` | yes | `clickup_create_task` when configured |
| `task_system.update_task` | `mutate_with_confirmation` | yes | `clickup_update_task` when configured |
| `task_system.link_internal_task` | `suggestion_only` | no | policy-only |
| `cloud_drive.list_files` | `read_only` | no | `google_drive_list_files` when configured |
| `cloud_drive.search_documents` | `read_only` | no | policy-only |
| `cloud_drive.read_document` | `read_only` | no | policy-only |
| `cloud_drive.suggest_file_plan` | `suggestion_only` | no | policy-only |
| `cloud_drive.upload_file` | `mutate_with_confirmation` | yes | policy-only |
| `cloud_drive.update_document` | `mutate_with_confirmation` | yes | policy-only |
| `cloud_drive.delete_file` | `mutate_with_confirmation` | yes | policy-only |
| `knowledge_search.search_web` | `read_only` | no | `duckduckgo_html` |
| `knowledge_search.suggest_search` | `suggestion_only` | no | policy-only |
| `web_browser.read_page` | `read_only` | no | `generic_http` |
| `web_browser.suggest_page_review` | `suggestion_only` | no | policy-only |

## App Tools Surface

The tools overview is assembled by `app_tools_overview_snapshot` from:

- connector execution baseline
- organizer tool stack
- web knowledge tooling
- Telegram telemetry
- user profile and runtime preferences

Future provider ideas are not listed as active tools until their bounded
runtime/API/configuration contract exists. Roadmap candidates belong in
planning docs, not in `/app/tools/overview`.

Routes:

- `GET /app/tools/overview`
- `PATCH /app/tools/preferences`
- `POST /app/tools/telegram/link/start`

Frontend:

- `web/src/App.tsx`
- `web/src/lib/api.ts`
- [Frontend Route And Component Map](../frontend/route-component-map.md)

## Failure Modes

- Credentials missing: provider-specific live operations remain blocked even
  when connector policy knows the operation shape.
- Policy-only operation: the operation can be proposed or described but does
  not have a live provider-backed execution path.
- Confirmation required: external mutations must not execute without explicit
  user confirmation.
- User opt-in missing: user-controlled integrations should not be treated as
  enabled until preferences and provider readiness align.
- Telegram link missing: Telegram delivery/ingress requires provider readiness
  plus user profile link state.
- Provider API failure: external HTTP/provider failures must be handled at the
  integration/action boundary, not in reasoning stages.

## Related Docs

- [Tools Pipeline](../pipelines/tools.md)
- [API Reference](../api/index.md)
- [Frontend Route And Component Map](../frontend/route-component-map.md)
- [Test Ownership Ledger](../engineering/test-ownership-ledger.md)
- [Runtime Ops Runbook](../operations/runtime-ops-runbook.md)
- [Organizer Provider Activation Runbook](../operations/organizer-provider-activation-runbook.md)

## Known Gaps

- Live provider smoke is blocked when credentials are not configured.
- Calendar and Drive mutation operations are policy-defined but not
  provider-backed live paths in this pass.
- No generated provider capability matrix exists beyond this manually curated
  reference and runtime snapshots.
