# V1 Reality Audit And Roadmap

Date: 2026-05-03
Task: `PRJ-951`
Status: READY queue created

## Purpose

This audit compares current v1 release claims with code, generated docs,
production health, and the task board. Its goal is to make the path to a real
v1 factual, executable, and resistant to drift.

## Current Reality

| Area | Code or Evidence Checked | Current State | V1 Meaning |
| --- | --- | --- | --- |
| Git source | `git status --short --branch`, `git log`, `git remote -v` | `main` matches `origin/main`; origin is `Wroblewski-Patryk/Aviary`; only local `.codex/tmp/` and `artifacts/` are untracked | Repository truth is ready for deploy work |
| Production revision | `GET https://aviary.luckysparrow.ch/health`, `/settings` meta | Production still reports `ed1c4d981314787d76252985b53c14ea1d7886ed` | Current `origin/main` is not deployed |
| Release smoke | `run_release_smoke.ps1 -WaitForDeployParity` in PRJ-938 | Failed after 900 seconds because production stayed on the older SHA | Release marker remains blocked |
| V1 health gates | `/health.v1_readiness` | Existing deployed SHA reports `core_v1_bundle_ready` and green final gates | Core v1 behavior appears green only for the currently deployed older SHA |
| Deploy policy | `backend/app/core/deployment_policy.py`, `/health.deployment` | Runtime declares source automation and build revision | The proof surface exists; the automation did not converge for the latest push |
| API/routes | `backend/app/api/routes.py`, `docs/api/openapi.json` | App auth, chat, tools, Telegram link, event, debug, health, and webhook routes exist; generated OpenAPI is in sync | API foundation is documented enough for v1 hardening |
| Database/model docs | `backend/app/memory/models.py`, `docs/data/columns.md`, `docs/data/erd.mmd` | Generated column reference and ERD match the current ORM metadata | The previous ERD/model-reference gap is closed |
| Frontend | `web/src/App.tsx`, `web/src/routes.ts`, `web/src/lib/api.ts`, `docs/frontend/route-component-map.md` | Browser shell exists; route contract ownership has been extracted to `web/src/routes.ts`, while route rendering and state remain mostly in `App.tsx` | Usable, with headless route smoke now protecting every current public/authenticated route during further route/component extraction |
| Tests | `backend/tests/*`, focused deployment-trigger tests | Backend coverage is broad; deployment parity tests passed locally | Missing evidence is now mostly live/fixture/e2e, not basic unit coverage |
| AI/security hardening | `docs/security/v1-ai-red-team-scenario-pack.md`, PRJ-932/933 audits | Scenario pack and audits exist; execution evidence gaps remain | Public v1 claim should either run or explicitly defer these |
| Provider integrations | `backend/app/integrations/**`, `docs/integrations/index.md` | Provider docs exist; live provider credentials are still missing for some smokes | Core v1 can proceed, broader organizer/provider claims remain blocked |

## Main Finding

The project is not blocked by missing engineering documentation anymore. The
current blocker is release reality:

- the repository candidate is ahead of production
- Coolify source automation did not converge within the release-smoke window
- the core acceptance bundle still contains historical GO language for an older
  deployed SHA
- the release marker remains correctly blocked until a selected SHA has fresh
  production smoke

## Current Acceptance Boundary

| Claim | Decision | Why |
| --- | --- | --- |
| Historical core no-UI v1 behavior on deployed production SHA | GO with stale-revision caveat | `/health.v1_readiness` is green on the deployed SHA |
| Current `origin/main` as deployed v1 | NO-GO | production revision does not match `origin/main` |
| Final release tag/marker | BLOCKED | PRJ-936 and PRJ-938 correctly block marker creation |
| Telegram-led launch claim | BLOCKED | PRJ-909 needs operator token/secret/chat preconditions |
| Organizer/provider daily-use launch claim | BLOCKED | PRJ-918 needs provider credentials |
| Public/web-led v1 confidence | IMPROVED | frontend exists and `PRJ-966` adds repeatable headless route-mount smoke for root, the login shell, dashboard, chat, personality, and tools |

## Roadmap

### P0: Make V1 Deployable And Truthful

| ID | Task | Status | Definition Of Done |
| --- | --- | --- | --- |
| PRJ-952 | Recover Coolify source automation or run approved fallback | BLOCKED_EXTERNAL | Coolify history shows the pushed SHA or webhook/UI fallback evidence exists; production begins deploying selected SHA |
| PRJ-953 | Rerun production release smoke for selected SHA | READY_AFTER_PRJ-952 | backend revision, web revision, release smoke, and optional fallback evidence all match selected SHA |
| PRJ-954 | Refresh v1 acceptance bundle for current selected SHA | READY_AFTER_PRJ-953 | acceptance bundle no longer implies stale deploy parity and records exact SHA evidence |
| PRJ-955 | Create release marker only after green production evidence | READY_AFTER_PRJ-954 | tag/marker created for selected SHA; task board/project state record evidence |
| PRJ-956 | Add a release reality audit script | DONE | local script checks git SHA, production backend SHA, web meta SHA, release readiness, and v1 gates in one command |
| PRJ-957 | Make production health monitor revision-aware | DONE | monitor can alert on revision drift, not only HTTP health |

### P1: Close Hardening Evidence Gaps

| ID | Task | Status | Definition Of Done |
| --- | --- | --- | --- |
| PRJ-958 | Execute AI red-team scenario pack | DONE_WITH_REVIEW_REQUIRED | runner executed 9 scenarios / 21 steps against production; result is `REVIEW_REQUIRED` because `/event` did not expose assistant reply text for behavioral scoring |
| PRJ-959 | Add cross-user/session regression tests | DONE | app-route two-user transcript, reset, cookie switching, and Telegram relink/conflict ownership scenarios are covered by focused regressions |
| PRJ-960 | Add provider payload sentinel regressions | DONE | backend projections and frontend API types prove raw provider payload sentinels do not leak through app surfaces |
| PRJ-961 | Add strict-mode incident sentinel regression | DONE | strict-mode incident export keeps safe health-derived evidence and excludes debug payload sentinels |
| PRJ-962 | Execute production Telegram live-mode smoke | BLOCKED_EXTERNAL | operator token, webhook secret, and known chat id are provided; smoke passes in live mode |
| PRJ-963 | Execute organizer provider activation smoke | BLOCKED_EXTERNAL | ClickUp, Google Calendar, and Google Drive credentials are configured; provider smoke passes |

### P2: Improve Web And Operator Confidence

| ID | Task | Status | Definition Of Done |
| --- | --- | --- | --- |
| PRJ-964 | Add provider request/response examples | DONE | provider docs include sanitized examples for ready/failure paths without secrets |
| PRJ-965 | Add OpenAPI-to-web type sync plan or generator | DONE | web API client route/method drift can be checked against generated OpenAPI |
| PRJ-966 | Add stable frontend route e2e smoke | DONE | public, auth, dashboard, chat, personality, and tools routes have repeatable headless smoke coverage |
| PRJ-967 | Split route ownership out of `web/src/App.tsx` | DONE | route type/list/normalization/history helpers live in `web/src/routes.ts`; build and route smoke pass |
| PRJ-971 | Extract first shared panel components from `web/src/App.tsx` | DONE | `StatePanel` and `FeedbackBanner` live in `web/src/components/shared.tsx`; build and route smoke pass |
| PRJ-972 | Extract next shared shell component cluster from `web/src/App.tsx` | DONE | `ModuleEntryCard`, `FlowRail`, `RouteHeroPanel`, and `InsightPanel` live in `web/src/components/shared.tsx`; build and route smoke pass |
| PRJ-973 | Extract shell chrome component cluster from `web/src/App.tsx` | DONE | wordmark, sidebar brand, nav button, and sidebar icon type live in `web/src/components/shell.tsx`; build and route smoke pass |
| PRJ-974 | Extract shell utility bar from `web/src/App.tsx` | DONE | `ShellUtilityBar` lives in `web/src/components/shell.tsx` behind explicit props; build and route smoke pass |
| PRJ-975 | Extract public glyph component cluster from `web/src/App.tsx` | DONE | `PublicGlyph` lives in `web/src/components/public-shell.tsx`; build and route smoke pass |
| PRJ-976 | Extract app icon/control component cluster from `web/src/App.tsx` | DONE | pure icon primitives live in `web/src/components/app-icons.tsx`; build and route smoke pass |
| PRJ-977 | Extract chat flow stage component from `web/src/App.tsx` | DONE | `ChatFlowStage` lives in `web/src/components/chat.tsx`; build and route smoke pass |
| PRJ-978 | Extract personality timeline row component from `web/src/App.tsx` | DONE | `PersonalityTimelineRow` lives in `web/src/components/personality.tsx`; build and route smoke pass |
| PRJ-979 | Extract route summary/card component cluster from `web/src/App.tsx` | DONE | `DashboardSignalCard` lives in `web/src/components/dashboard.tsx`; build and route smoke pass |
| PRJ-980 | Expand frontend route smoke before broad stat-card extraction | DONE | route smoke covers `/`, `/login`, and every current authenticated route with `route_count=14` |
| PRJ-981 | Extract shared stat-card component cluster from `web/src/App.tsx` | DONE | `RouteStatCard` lives in `web/src/components/shared.tsx`; full route smoke passes with `route_count=14` |
| PRJ-982 | Extract route note/side-card component cluster from `web/src/App.tsx` | DONE | `RouteNoteCard` lives in `web/src/components/shared.tsx`; full route smoke passes with `route_count=14` |
| PRJ-983 | Remove or relocate dead frontend component definitions | DONE | live `MotifFigurePanel` was moved to `web/src/components/public-shell.tsx`; unused `PersonalityLayerCard` was removed; full route smoke passes with `route_count=14` |
| PRJ-984 | Extract tool route helper logic from `web/src/App.tsx` | DONE | tool status/link/action formatting helpers live in `web/src/lib/tool-formatting.ts`; full route smoke passes with `route_count=14` |
| PRJ-985 | Extract tools summary card component cluster from `web/src/App.tsx` | DONE | `ToolsSummaryCard` lives in `web/src/components/tools.tsx`; full route smoke passes with `route_count=14` |
| PRJ-986 | Extract tools item fact-card component cluster from `web/src/App.tsx` | DONE | `ToolsFactCard` lives in `web/src/components/tools.tsx`; full route smoke passes with `route_count=14` |
| PRJ-987 | Extract tools detail-card component cluster from `web/src/App.tsx` | DONE | `ToolsDetailCard` lives in `web/src/components/tools.tsx`; full route smoke passes with `route_count=14` |
| PRJ-988 | Extract tools technical-detail panel component cluster from `web/src/App.tsx` | DONE | `ToolsTechnicalDetailPanel` lives in `web/src/components/tools.tsx`; full route smoke passes with `route_count=14` |
| PRJ-989 | Extract tools Telegram link panel from `web/src/App.tsx` | DONE | `ToolsTelegramLinkPanel` lives in `web/src/components/tools.tsx`; route eligibility and link-start handler stay in `App()`; full route smoke passes with `route_count=14` |
| PRJ-990 | Audit remaining `App.tsx` route-local clusters after tools extraction | DONE | `docs/frontend/app-route-cluster-audit.md` maps remaining route branches and selects settings card/fact extraction as the next slice |
| PRJ-991 | Extract settings preference card/fact presentation cluster from `web/src/App.tsx` | DONE | `SettingsCard` and `SettingsFact` live in `web/src/components/settings.tsx`; form state and handlers remain in `App()`; full route smoke passes with `route_count=14` |
| PRJ-992 | Extract settings side panel presentation cluster from `web/src/App.tsx` | DONE | `SettingsProactivePanel`, `SettingsSavePanel`, and `SettingsDangerPanel` live in `web/src/components/settings.tsx`; save/reset/toggle behavior remains in `App()`; full route smoke passes with `route_count=14` |
| PRJ-993 | Extract settings formatting helpers from `web/src/App.tsx` | DONE | language and UTC offset settings helpers live in `web/src/lib/settings-formatting.ts`; bootstrap/settings behavior remains in `App()`; full route smoke passes with `route_count=14` |
| PRJ-994 | Re-audit next route-local extraction target after settings cleanup | DONE | route cluster audit refreshed after tools/settings cleanup and selected insights/automations side-panel extraction as the next slice |
| PRJ-995 | Extract shared module side-panel presentation for insights and automations | DONE | `ModuleRouteSidePanel` and `ModuleRouteSideRow` live in `web/src/components/shared.tsx`; insights/automations side-panel chrome uses route-keyed shared components; full route smoke passes with `route_count=14` |
| PRJ-996 | Audit module route helper extraction after side-panel cleanup | DONE | learned-state summary helpers were selected before health/channel helpers because they are pure projections with lower provider/telemetry coupling |
| PRJ-997 | Extract learned-state summary helpers from `web/src/App.tsx` | DONE | `recentActivityRows`, `summaryLines`, and direct value/timestamp formatting dependencies live in `web/src/lib/learned-state-formatting.ts`; full route smoke passes with `route_count=14` |
| PRJ-998 | Audit remaining health/channel helper extraction | DONE | `conversationChannelStatus` stays in `App()` until provider/integration route ownership is clearer; pure metric helpers were selected next |
| PRJ-999 | Extract metric formatting helpers from `web/src/App.tsx` | DONE | `numberValue` and `scaledMetricSize` live in `web/src/lib/metric-formatting.ts`; full route smoke passes with `route_count=14` |
| PRJ-1000 | Audit next v1 frontend architecture slice after helper cleanup | DONE | chat transcript metadata helper extraction was selected before markdown/composer movement because it is pure and non-JSX |
| PRJ-1001 | Extract chat transcript metadata helpers from `web/src/App.tsx` | DONE | chat transcript metadata/delivery/reconciliation helpers live in `web/src/lib/chat-transcript.ts`; composer and markdown rendering remain in `App()`; full route smoke passes with `route_count=14` |
| PRJ-1002 | Audit chat markdown renderer extraction readiness | DONE | markdown renderer movement needs a focused characterization proof first because it returns JSX and encodes parser behavior |
| PRJ-1003 | Add focused chat markdown renderer characterization proof | DONE | `renderChatMarkdown` lives in `web/src/lib/chat-markdown.tsx`; `npm run test:chat-markdown` covers inline code, bold/italic, lists, paragraph line breaks, and fenced code blocks; full route smoke passes with `route_count=14` |
| PRJ-1004 | Audit chat composer shell extraction after markdown cleanup | READY_AFTER_PRJ-1003 | decide the next safe chat route slice after transcript and markdown helper ownership cleanup |
| PRJ-968 | Add release evidence index | DONE | `docs/operations/release-evidence-index.md` shows current candidate lineage, production SHA, release tag target, blockers, and next action |
| PRJ-969 | Add Coolify fallback secret/runbook readiness check | DONE | `check_coolify_fallback_readiness.py` reports whether approved webhook fallback inputs are present without triggering deploy |
| PRJ-970 | Add release go/no-go command wrapper | DONE | `run_release_go_no_go.py` composes release reality audit with release-smoke posture and prints GO/HOLD |

## First Execution Order

1. `PRJ-956` because it is local, unblocked, and turns the current release
   ambiguity into a repeatable command.
2. `PRJ-957` because the external monitor should catch exactly the deploy
   parity drift that blocked PRJ-938.
3. `PRJ-952` when operator/Coolify access is available.
4. `PRJ-953` immediately after a deployment starts or fallback evidence exists.
5. `PRJ-954` and `PRJ-955` only after production is green for the selected SHA.

## Validation Performed During This Audit

```powershell
git status --short --branch
git remote -v
git log --oneline --decorate -5
Invoke-RestMethod -Uri "https://aviary.luckysparrow.ch/health" -TimeoutSec 30
curl.exe -s -L --max-time 30 https://aviary.luckysparrow.ch/settings
Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_deployment_trigger_scripts.py -k "deploy_parity or runtime_build_revision"; Pop-Location
Push-Location .\backend; ..\.venv\Scripts\python .\scripts\export_openapi_schema.py --output ..\.codex\tmp\audit-openapi.json; Pop-Location
Push-Location .\backend; ..\.venv\Scripts\python .\scripts\export_data_model_reference.py --columns-output ..\.codex\tmp\audit-data-model.md --erd-output ..\.codex\tmp\audit-erd.md; Pop-Location
```

Results:

- deployment-trigger focused tests: `6 passed, 46 deselected`
- generated OpenAPI matched `docs/api/openapi.json`
- generated column model matched `docs/data/columns.md`
- generated ERD matched `docs/data/erd.mmd`
- production still served `ed1c4d981314787d76252985b53c14ea1d7886ed`

## Residual Risks

- Coolify source automation may be disconnected, delayed, or pointing at an
  unexpected source configuration despite `/health.deployment` declaring the
  source-automation policy.
- The current core acceptance bundle still needs a fresh SHA refresh after
  deploy parity is recovered.
- Live provider and Telegram smokes remain external-input blockers.
- Frontend confidence now has a stable headless route-mount smoke command, but
  full visual parity and interaction e2e remain separate future work.
