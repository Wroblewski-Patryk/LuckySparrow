# Module Confidence Ledger

Last updated: 2026-05-14

## Project Alias

The product name is Aviary. The repository folder is `Personality`.

## Purpose

This ledger is the quick reality map for Aviary. It tracks whether each
important runtime, memory, reflection, scheduler, action, integration, API, web,
mobile, and operations journey is implemented, verified, broken, blocked, or
unknown. Keep it honest. Do not turn uncertainty into optimism.

## Status Vocabulary

- `NOT_STARTED`: no meaningful implementation exists.
- `IN_PROGRESS`: implementation is actively changing.
- `IMPLEMENTED_NOT_VERIFIED`: code exists, but current proof is missing.
- `PARTIAL`: some scenarios pass, but important scenarios are missing or stale.
- `VERIFIED`: current evidence proves the journey for the target scope.
- `BROKEN`: a reproducible defect exists.
- `BLOCKED`: verification or implementation is blocked by access, decision,
  environment, dependency, or missing input.
- `DEFERRED`: explicitly out of the current release scope.

## Confidence Rules

- `High`: fresh reproducible evidence exists for the real journey.
- `Medium`: good local proof exists, but target, edge-case, or freshness is
  incomplete.
- `Low`: evidence is missing, stale, inferred, or chat-only.

## Ledger

| ID | Module | Journey / function | Priority | Status | Confidence | Evidence | Missing proof or defect | Next smallest action | Owner | Last verified |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AVIARY-STATUS-001 | Project status radar | Generated project status dashboard and architecture implementation map | P0 | VERIFIED | High | `PRJ-933`; `docs/operations/project-status-dashboard.md`, `docs/operations/project-status-dashboard.json`, `docs/operations/architecture-implementation-map-2026-05-10.csv`, `docs/planning/current-v1-release-boundary.md`. | Extension rows remain visible but outside selected-scope readiness. | Keep the dashboard/audit refreshed after each architecture or release-boundary change. | Planning + QA/Test | 2026-05-11 |
| AVIARY-WEB-UX-001 | Web shell route evidence | Public and authenticated route-state smoke with lightweight accessibility checks | P1 | VERIFIED | High | `PRJ-931`; `npm exec -- tsc -b --pretty false`; `npm exec -- vite build`; `npm run smoke:routes` -> `route_count=14`, `status=ok`, zero visible unnamed interactive controls. | Visual parity and responsive screenshot comparison were not in this evidence slice. | Keep the command pack in route-shell validation; collect screenshot parity only when a UX/UI polish task requires it. | Frontend Builder + QA/Test | 2026-05-11 |
| AVIARY-WEB-RESP-001 | Web responsive UI baseline | Web shell route rendering across desktop, tablet, and mobile web for selected public/authenticated surfaces | P1 | VERIFIED | High | `PRJ-1150`, `PRJ-1151`, `PRJ-1152`, `PRJ-1153`, `PRJ-1154`, `PRJ-1155`, `PRJ-1156`, `PRJ-1157`, `PRJ-1200`, `PRJ-1201`, `PRJ-1202`, `PRJ-1203`, `PRJ-1204`, `PRJ-1205`, `PRJ-1206`, `PRJ-1207`, `PRJ-1208`, `PRJ-1209`, `PRJ-1210`, `PRJ-1211`, `PRJ-1213`, `PRJ-1214`, `PRJ-1215`, `PRJ-1216`, `PRJ-1217`, `PRJ-1218`, `PRJ-1219`, `PRJ-1220`, `PRJ-1221`, `PRJ-1222`, `PRJ-1223`, `PRJ-1224`, `PRJ-1225`, `PRJ-1226`, `PRJ-1227`; `node --check scripts/route-smoke.mjs`; `npm run build`; `npm run audit:ui-responsive`; latest responsive audit -> `route_count=14`, `ui_audit.viewport_count=3`, `ui_audit.screenshot_count=18`, `ui_audit.status=ok`, `failed_count=0`; `npm run audit:ui-navigation` -> `status=ok`, `navigation_proof.step_count=4`, `navigation_proof.failed_count=0`; selected routes covered across desktop/tablet/mobile: `/`, `/dashboard`, `/chat`, `/personality`, `/settings`, `/tools`; public Home polish proof verified no presentation-only landing tag, no nested-window frame, real section anchors, localized auth placeholders, and zero unnamed interactive controls; authenticated shell proof verified no technical build label in the mobile/tablet first viewport and calmer Aviary material styling for the fixed mobile tabbar; dashboard CTA proof clicked 10 action controls and verified navigation to `/chat`, `/goals`, `/reflections`, `/memory`, and `/insights`; dashboard content-rhythm proof verified no artificial desktop greeting wrap, readable guidance actions, and recent-activity token rhythm; dashboard recent-activity proof verified compact right-rail timestamp readability across desktop/tablet/mobile screenshots; dashboard memory-growth proof verified compact chart labels stay visually separated across desktop/tablet/mobile screenshots; tools clarity proof verified capability cards foreground readiness, next action, and user control before technical details across desktop/tablet/mobile screenshots; tools numeric proof verified summary count values render as unambiguous UI numerals across desktop/tablet/mobile screenshots; tools status proof verified duplicate integral/status badges are suppressed when their visible labels match; chat brand-copy proof verified Aviary assistant/safety/sidebar signature copy; chat mobile first-read proof verified the cognitive belt as a horizontal rail with no document-level horizontal overflow; chat response readability proof verified a longer numbered answer with list continuation across desktop/tablet/mobile screenshots and viewport-bounded desktop Chat stage; chat cognitive-belt proof verified Motivation metrics render as compact structured lines instead of truncated slash-separated copy; chat tablet-clearance proof verified the long assistant answer clears the composer more cleanly on tablet while desktop/mobile remain stable; chat mobile assistant-width proof verified assistant answers use the full transcript width on narrow screens while tablet/desktop remain stable; settings danger-boundary proof verified reset runtime data details behind progressive disclosure while preserving reset controls across desktop/tablet/mobile screenshots; settings save-action proof verified normal persistence uses calm teal primary hierarchy while reset remains visually distinct; personality embodied-map proof verified count-heavy callouts and compact mobile timeline context across desktop/tablet/mobile screenshots; personality mobile nav-clearance proof verified the fixed tabbar no longer covers first timeline rows; shared shell proof verified lighter desktop sidebar, mobile in-header icon rail screenshots, tablet icon+label route rail, mobile route-switch clicks to Chat, Settings, Personality, and Dashboard, and PRJ-1224 route-rail affordance proof verified tablet/mobile right-edge continuation, scroll snapping, and end padding while the desktop sidebar stayed structurally stable; PRJ-1225 account-trigger proof verified the mobile/tablet header account trigger uses shell material styling, exposes `aria-expanded`, and opens the account panel through `--account-proof`; PRJ-1226 tablet-header proof verified the tablet header aligns wordmark, route identity, and account trigger in one compact row above the route rail, and route-smoke waits for route markers before screenshot capture; PRJ-1227 sidebar-support proof verified desktop support cards follow navigation with a canonical modest gap while tablet/mobile guardrails stayed stable. | Browser preview without route-smoke mock auth redirects `/chat` to `/login`; richer Chat composer state coverage remains outside this focused proof. Native app proof is outside current scope. | Continue route-local polish only from concrete screenshot evidence while preserving `audit:ui-responsive` and `audit:ui-navigation` as regression gates. | Frontend Builder + QA/Test | 2026-05-14 |
| AVIARY-MOBILE-UI-001 | Native mobile UI shell | Expo-managed v1.5 native app groundwork over shared `/app/*` contracts | P2 | DEFERRED_BY_CURRENT_SCOPE | High | `PRJ-1158..1199` evidence is preserved, including local preview, production web-supported proof, and hardened device doctor. `PRJ-1200` user rescope moved current UI target to web mobile/tablet/desktop breakpoints and regenerated `ARCH-MOBILE-001` as `DEFERRED`. | Native app proof is outside current scope; do not claim native readiness or pursue Android SDK/device proof unless native app scope is reactivated. | Keep native app evidence parked; validate current UI through `AVIARY-WEB-RESP-001`. | Frontend Builder + QA/Test | 2026-05-14 |
| AVIARY-COGNITIVE-RUNTIME-001 | Digital-being runtime layers | Event/attention -> identity -> AI-assisted perception/fallback -> affective assessment -> context -> motivation -> role/skills -> planning -> expression -> action -> memory/reflection -> debug visibility | P0 | VERIFIED | High | `PRJ-1195`; `PRJ-1196`; `PRJ-1211`; `PRJ-1212`; `docs/operations/aion-runtime-layer-audit-2026-05-13.md`; `tests/test_runtime_pipeline.py::test_runtime_pipeline_api_source`; `tests/test_runtime_pipeline.py::test_runtime_pipeline_contract_smoke_pins_stage_and_action_boundary_invariants`; `tests/test_runtime_pipeline.py::test_runtime_pipeline_uses_ai_assisted_structured_perception_before_context`; `tests/test_perception_assessor.py`; `tests/test_affective_contract.py::test_perception_agent_emits_positive_affect_for_polish_thanks`; `tests/test_language_runtime.py::test_detect_language_uses_polish_thanks_keyword_without_diacritics`; `tests/test_response_budget_policy.py`; `tests/test_openai_client.py::test_openai_client_generate_reply_uses_api_chat_response_budget`; `tests/test_openai_client.py::test_openai_client_generate_reply_uses_telegram_budget_for_telegram_turn`; focused PRJ-1196 structured-perception pack -> `2 passed, 115 deselected`; config/policy/lifespan pack -> `70 passed`; PRJ-1212 response-budget/prompt/client pack -> `14 passed`; PRJ-1212 expression/client/prompt/budget/delivery pack -> `53 passed`; PRJ-1212 runtime channel pack -> `3 passed, 112 deselected`; PRJ-1212 graph/API focused rerun -> `6 passed`; full backend pytest -> `1105 passed`; Coolify production revision `c427ab110276c98a122d6c1be3f7d9a02eeffa3c`; release smoke `release_ready=true`; `/health.runtime_policy.structured_perception_posture=ai_assisted_active`. | Native device proof and external provider activation remain separate module gaps. Live response-length/cost telemetry is not yet implemented. | Monitor response quality/cost from real use; extend `ResponseBudgetPolicy` only from evidence or explicit product modes. | Backend Builder + QA/Test | 2026-05-14 |
| AVIARY-MEMORY-001 | Runtime memory flow | Completed event -> episodic write -> later retrieval -> compressed context -> expression influence -> next episodic write | P0 | VERIFIED | High | `PRJ-1186`; `PRJ-1189`; `PRJ-1190`; `PRJ-1191`; `PRJ-1192`; `PRJ-1193`; `PRJ-1194`; runtime constants `RECENT_MEMORY_LIMIT=6`, `RECENT_MESSAGE_LIMIT=12`, `SEMANTIC_MEMORY_TOP_K=5`, `CONTEXT_TOKEN_BUDGET=2500`; `tests/test_runtime_pipeline.py::test_runtime_recalls_pet_name_from_previous_event_response`; `tests/test_runtime_pipeline.py::test_runtime_applies_concise_response_preference_on_following_turn`; `tests/test_memory_repository.py::test_memory_repository_builds_query_embedding_with_configured_openai_provider`; `tests/test_memory_repository.py::test_memory_repository_includes_vector_matched_episodic_memory_outside_recent_window`; `tests/test_memory_repository.py::test_memory_repository_similarity_fallback_scores_beyond_small_recent_candidate_window`; `tests/test_memory_repository.py::test_memory_repository_includes_vector_matched_relation_when_relation_source_enabled`; `tests/test_reflection_worker.py::test_reflection_worker_consolidates_repeated_memory_topics_into_semantic_summary`; `tests/test_context_agent.py::test_context_summary_includes_long_term_memory_topic_summary_from_conclusions`; `tests/test_runtime_pipeline.py::test_runtime_pipeline_merges_vector_matched_relations_into_debug_state`; `tests/test_context_agent.py::test_context_summary_keeps_vector_retrieved_memory_without_lexical_overlap`; targeted memory/API suite -> `151 passed`; PRJ-1192 relation memory pack -> `4 passed`; PRJ-1192 runtime relation debug pack -> `2 passed`; PRJ-1192 Coolify compose pack -> `12 passed`; PRJ-1192 full backend pytest -> `1086 passed`; PRJ-1193 reflection/context/repository pack -> `177 passed`; PRJ-1193 full backend pytest -> `1088 passed`; PRJ-1194 focused topic-scope pack -> `4 passed`; PRJ-1194 broader memory/runtime pack -> `293 passed`; PRJ-1194 full backend pytest -> `1091 passed`; production Coolify commit `d4d2911be77d1966803d85e052c94175f0da8e18` answered `Roki` after 15 filler episodes and `memory_flow` retrieved original episode `id=4`; production Coolify commit `27324e6b8746d13d80c92e83f8c423887dc558db` wrote/recalled `Roki` and controlled pgvector repository proof ranked `old-relevant|1.0` before 250 newer noise vectors; production Coolify commit `2b6bf01b795a3d0b5a3ca055db39702f0c847b01` replied `Your dog's name is Roki.`; production Coolify commit `f36955646c0271ee1d5bfa30be81c024f260e6e9` reported `semantic_embedding_source_kinds=episodic,semantic,affective,relation`, `retrieval_lifecycle_relation_source_state=optional_family_enabled`, controlled relation-vector proof returned `RELATION_COUNT 1`, `VECTOR_RELATION_HITS 1`, `retrieval_source=vector`, `retrieval_similarity=1.0`, cleaned synthetic rows with `CLEANUP 1 1`, and release smoke returned `release_ready=true`; production Coolify commit `8d0e36e0bcd59d91bf6f0ed0d976875f979c8b3b` release smoke returned `release_ready=true` and controlled topic-summary proof returned `SUMMARY_KIND memory_topic_summary`, `SEMANTIC_EMBEDDINGS 1`, `CONTEXT_HAS_LONG_TERM True`, `CONTEXT_HAS_ROKI True`, cleanup `0 0 0`; production Coolify commit `c11377c00a935d5e49ab13a7364c0d87405436c0` release smoke returned `release_ready=true` and controlled topic-bucket proof returned `SUMMARY_BUCKETS topic:deployment topic:dog`, `TOPIC_SUMMARY_COUNT 2`, `SEMANTIC_EMBEDDINGS 3`, `CONTEXT_HAS_LONG_TERM True`, `CONTEXT_HAS_ROKI True`, `CONTEXT_HAS_DEPLOYMENT True`, cleanup `0 0 0 0`; `/health.memory_retrieval.retrieval_depth_policy` aligned to 6/5; `memory_flow` runtime log includes write status, retrieval counts, retrieved IDs, duration, and context token estimate. | ANN/index policies remain future scale-triggered work; no current latency evidence requires them. | Move to non-memory work unless production retrieval volume makes ANN/index migration necessary. | Backend Builder + QA/Test | 2026-05-13 |
| AVIARY-BLOCKER-001 | External providers | Provider credential activation smoke for connector readiness | P1 | DEFERRED | Medium | `PRJ-933`; `PRJ-1197`; `docs/planning/current-v1-release-boundary.md` keeps organizer activation outside the achieved core/web-supported marker; `/app/tools/overview` now excludes future-only Trello/Nest placeholders and focused tools-overview test passed. | External credentials/input needed before an expanded organizer launch claim; future provider candidates need bounded runtime contracts before appearing in the active tools catalog. | Run provider activation smoke only when credentials exist and organizer scope expands. | Ops/Release + QA/Test | 2026-05-14 |

## Recent Evidence Notes

- `AVIARY-WEB-RESP-001` also includes `PRJ-1227`: desktop sidebar support
  rhythm passed `npm run build`, `npm run audit:ui-responsive`
  (`route_count=14`, `viewport_count=3`, `screenshot_count=18`,
  `failed_count=0`), `npm run audit:ui-navigation` (`step_count=4`,
  `failed_count=0`), `node scripts/route-smoke.mjs --account-proof --report
  .codex/artifacts/prj1225-account-proof/report.json`
  (`account_proof.status=ok`, `step_count=1`, `failed_count=0`,
  `panel_visible=true`), representative screenshot review, and validation
  cleanup with no leftovers. Desktop support cards now follow the nav stack
  with a canonical modest gap instead of being pushed to the viewport bottom.

- `AVIARY-WEB-RESP-001` also includes `PRJ-1226`: tablet route header rhythm
  passed `node --check scripts/route-smoke.mjs`, `npm run build`, `npm run
  audit:ui-responsive` (`route_count=14`, `viewport_count=3`,
  `screenshot_count=18`, `failed_count=0`), `npm run audit:ui-navigation`
  (`step_count=4`, `failed_count=0`), `node scripts/route-smoke.mjs
  --account-proof --report .codex/artifacts/prj1225-account-proof/report.json`
  (`account_proof.status=ok`, `step_count=1`, `failed_count=0`,
  `panel_visible=true`), representative screenshot review, and validation
  cleanup with no leftovers. Tablet headers now align wordmark, route identity,
  and account trigger in one compact row above the shared route rail.

- `AVIARY-WEB-RESP-001` also includes `PRJ-1225`: mobile/tablet account
  trigger polish passed `node --check scripts/route-smoke.mjs`, `npm run
  build`, `npm run audit:ui-responsive` (`route_count=14`,
  `viewport_count=3`, `screenshot_count=18`, `failed_count=0`), `npm run
  audit:ui-navigation` (`step_count=4`, `failed_count=0`), `node
  scripts/route-smoke.mjs --account-proof --report
  .codex/artifacts/prj1225-account-proof/report.json`
  (`account_proof.status=ok`, `step_count=1`, `failed_count=0`,
  `panel_visible=true`), representative screenshot review, and validation
  cleanup with no leftovers.

- `AVIARY-WEB-RESP-001` also includes `PRJ-1224`: shared shell navigation
  affordance passed `npm run build`, `npm run audit:ui-responsive`
  (`route_count=14`, `viewport_count=3`, `screenshot_count=18`,
  `failed_count=0`), `npm run audit:ui-navigation` (`step_count=4`,
  `failed_count=0`), representative desktop/tablet/mobile screenshot review,
  and validation cleanup with no leftovers. Tablet/mobile route rails now
  communicate horizontal continuation while desktop sidebar structure remains
  stable.

- `AVIARY-WEB-RESP-001` also includes `PRJ-1223`: Dashboard Memory Growth
  label polish passed `npm run build`, `npm run audit:ui-responsive`
  (`route_count=14`, `viewport_count=3`, `screenshot_count=18`,
  `failed_count=0`), focused `/dashboard` route-smoke
  (`screenshot_count=3`, `failed_count=0`), `npm run audit:ui-navigation`,
  desktop/tablet/mobile Dashboard screenshot review, and validation cleanup with no
  browser/server leftovers.

## Maintenance Rules

- Update this file when a feature ships, a bug is fixed, a regression appears,
  architecture changes, validation proves a journey, or a module is deferred.
- Prefer verification missions before fix missions when the only problem is
  missing evidence.
- Mark a journey `VERIFIED` only when evidence is current and reproducible.
- Mark a journey `BROKEN` when a real user journey fails, even if related tests
  pass.
- Link evidence to test names, commands, screenshots, smoke notes, commits, or
  task IDs. Chat-only evidence is not enough.
