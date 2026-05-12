# Module Confidence Ledger

Last updated: 2026-05-12

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
| AVIARY-MOBILE-UI-001 | Native mobile UI shell | Expo-managed v1.5 conversation-first mobile home, chat, personality, settings, and tools routes over shared `/app/*` contracts | P1 | VERIFIED | Medium | `PRJ-1158`, `PRJ-1159`, `PRJ-1160`, `PRJ-1161`, `PRJ-1162`, `PRJ-1163`, `PRJ-1164`, `PRJ-1165`, `PRJ-1166`, `PRJ-1167`, `PRJ-1168`, `PRJ-1169`, `PRJ-1170`, `PRJ-1171`, `PRJ-1172`, `PRJ-1173`, `PRJ-1174`, `PRJ-1175`, `PRJ-1176`, `PRJ-1177`, `PRJ-1178`, `PRJ-1179`, `PRJ-1180`, `PRJ-1181`; `npm run typecheck`; `npm run audit:ui-mobile`; `npm run export:ui-mobile`; `npm run deploy:ui-mobile-local`; `npm run smoke:ui-mobile-preview`; local preview at `http://127.0.0.1:8093`; `docs/operations/v15-mobile-ui-local-preview-handoff-2026-05-12.md`; `.codex/artifacts/prj1158-mobile-native-shell/mobile-shell-390x1200-v2.png`; `.codex/artifacts/prj1159-mobile-chat-route/mobile-chat-390x1200-v2.png`; `.codex/artifacts/prj1160-mobile-support-routes/`; `.codex/artifacts/prj1161-mobile-personality-route/`; `.codex/artifacts/prj1162-mobile-route-rail/`; `.codex/artifacts/prj1163-mobile-home-route-rail/`; `.codex/artifacts/prj1164-mobile-ui-audit/report.json` -> `route_count=5`, `viewport_count=2`, `screenshot_count=10`, `action_proof_count=3`, `state_proof_count=4`, `failed_count=0`; `.codex/artifacts/prj1176-mobile-ui-preview/` -> Home/Chat/Tools render smoke; `.codex/artifacts/prj1177-mobile-ui-preview-smoke/` -> preview health plus all-route smoke with `preview_health.ok=true`, `viewport_count=2`, `screenshot_count=10`, `failed_count=0`; shared UI primitives, token-aligned Stack header, one-command local deploy, and operations handoff verified. | Device/simulator proof, live data-state wiring, full-page visual CTA proof, and final native auth transport are not yet complete. `adb` is not available in this local session. `emulator` is not available in this local session. `npm audit` reports 4 moderate Expo dependency-chain advisories whose force fix would downgrade Expo. | Capture Expo Go/simulator proof when Android tooling or a device is available. | Frontend Builder + QA/Test | 2026-05-12 |
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
