# Module Confidence Ledger

Last updated: 2026-05-13

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
| AVIARY-WEB-RESP-001 | Web responsive UI baseline | v1.1 web shell route rendering across desktop, tablet, and mobile web for selected public/authenticated surfaces | P1 | VERIFIED | High | `PRJ-1150`, `PRJ-1151`, `PRJ-1152`, `PRJ-1153`, `PRJ-1154`, `PRJ-1155`, `PRJ-1156`, `PRJ-1157`; `npm run build`; `npm run audit:ui-responsive`; `.codex/artifacts/prj1150-v11-ui-responsive-audit/report.json` -> `route_count=14`, `ui_audit.screenshot_count=18`, `ui_audit.status=ok`, `failed_count=0`; representative desktop/tablet/mobile screenshots reviewed; no `chrome-headless-shell` process or `5173` listener remained after cleanup checks. | Loading/empty/error screenshot sets and native/mobile implementation are outside this v1.1 web responsive milestone. | Use v1.1 evidence to plan `v1.5` mobile or start a new explicit UI polish slice from feedback. | Frontend Builder + QA/Test | 2026-05-11 |
| AVIARY-MOBILE-UI-001 | Native mobile UI shell | Expo-managed v1.5 conversation-first mobile home, chat, personality, settings, and tools routes over shared `/app/*` contracts | P1 | VERIFIED_PRODUCTION_NATIVE_BLOCKED | High | `PRJ-1158`, `PRJ-1159`, `PRJ-1160`, `PRJ-1161`, `PRJ-1162`, `PRJ-1163`, `PRJ-1164`, `PRJ-1165`, `PRJ-1166`, `PRJ-1167`, `PRJ-1168`, `PRJ-1169`, `PRJ-1170`, `PRJ-1171`, `PRJ-1172`, `PRJ-1173`, `PRJ-1174`, `PRJ-1175`, `PRJ-1176`, `PRJ-1177`, `PRJ-1178`, `PRJ-1179`, `PRJ-1180`, `PRJ-1181`, `PRJ-1182`, `PRJ-1183`, `PRJ-1184`, `PRJ-1185`; production UI merge commit `43837bb183c8975845b99b65a03cea5ccf4903a0`; production closure proof is tracked in `docs/operations/release-evidence-index.md` and PR #1 comments, with live revision read from `/health` and `/settings`; latest cleanup proof confirmed `07b3b3e5fe3bd37439dd1cafbdc7fb15c4ef3a7b`; production smoke -> `health_status=ok`, `release_ready=true`, runtime/web revisions matched the tested SHA; production browser proof rendered `https://aviary.luckysparrow.ch/` with `Poznaj Aviary`; `npm run typecheck`; `npm run audit:ui-mobile`; `npm run export:ui-mobile`; `npm run deploy:ui-mobile-local`; `npm run smoke:ui-mobile-preview`; `npm run doctor:ui-mobile-device` -> `status=blocked`, missing `adb`, `emulator`; GitHub PR `https://github.com/Wroblewski-Patryk/Aviary/pull/1`; validation-owned local preview on `8093` was stopped after cleanup; `docs/operations/v15-mobile-ui-local-preview-handoff-2026-05-12.md`; `docs/operations/v15-mobile-ui-pr-and-production-promotion-handoff-2026-05-12.md`; `.codex/artifacts/prj1177-mobile-ui-preview-smoke/`; `.codex/artifacts/prj1182-mobile-device-proof-doctor/report.json`; `.codex/artifacts/prj1185-production-ui-browser-proof/production-home-1440x1200.png`; shared UI primitives, token-aligned Stack header, one-command local deploy, operations handoff, and production deployment verified. | Device/simulator proof, live data-state wiring, full-page visual CTA proof, and final native auth transport are not yet complete. `adb` and `emulator` are unavailable in this local session. `npm audit` reports 4 moderate Expo dependency-chain advisories whose force fix would downgrade Expo. | Install Android platform tools or connect a supported device, then capture Expo Go/simulator proof. | Frontend Builder + QA/Test | 2026-05-12 |
| AVIARY-MEMORY-001 | Runtime memory flow | Completed event -> episodic write -> later retrieval -> compressed context -> expression influence -> next episodic write | P0 | VERIFIED | High | `PRJ-1186`; `PRJ-1189`; runtime constants `RECENT_MEMORY_LIMIT=6`, `RECENT_MESSAGE_LIMIT=12`, `SEMANTIC_MEMORY_TOP_K=5`, `CONTEXT_TOKEN_BUDGET=2500`; `tests/test_runtime_pipeline.py::test_runtime_recalls_pet_name_from_previous_event_response`; `tests/test_runtime_pipeline.py::test_runtime_applies_concise_response_preference_on_following_turn`; `tests/test_memory_repository.py::test_memory_repository_builds_query_embedding_with_configured_openai_provider`; `tests/test_memory_repository.py::test_memory_repository_includes_vector_matched_episodic_memory_outside_recent_window`; targeted memory/API suite -> `151 passed`; PRJ-1189 targeted memory packs -> `4 passed`, `17 passed`, `3 passed`; full backend pytest -> `1080 passed`; `/health.memory_retrieval.retrieval_depth_policy` aligned to 6/5; `memory_flow` runtime log includes write status, retrieval counts, retrieved IDs, duration, and context token estimate. | Native pgvector SQL/operator ranking remains outside this local slice; current semantic path uses stored embeddings through repository-level cosine similarity over fetched rows. | Deploy PRJ-1189 and run production non-temporal semantic recall proof with OpenAI embeddings. | Backend Builder + QA/Test | 2026-05-13 |
| AVIARY-BLOCKER-001 | External providers | Provider credential activation smoke for connector readiness | P1 | DEFERRED | Medium | `PRJ-933`; `docs/planning/current-v1-release-boundary.md` keeps organizer activation outside the achieved core/web-supported marker. | External credentials/input needed before an expanded organizer launch claim. | Run provider activation smoke only when credentials exist and organizer scope expands. | Ops/Release + QA/Test | 2026-05-11 |

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
