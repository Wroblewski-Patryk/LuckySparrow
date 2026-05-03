# Frontend Route And Component Map

Last updated: 2026-05-03

This map documents the current browser shell without requiring a broad
component refactor. It is grounded in `web/src/App.tsx`,
`web/src/routes.ts`, `web/src/components/shared.tsx`, `web/src/lib/api.ts`,
`web/src/components/shell.tsx`, `web/src/components/public-shell.tsx`, and
`web/src/components/app-icons.tsx`, `web/src/components/chat.tsx`, and
`web/src/components/dashboard.tsx`, `web/src/components/personality.tsx`, and
`web/src/index.css`.

## Headless Route Smoke

`web/scripts/route-smoke.mjs` provides the current route-mount smoke. Run it
after a production build:

```powershell
Push-Location .\web
npm run build
npm run smoke:routes
Pop-Location
```

The smoke serves `web/dist`, supplies synthetic app-facing API responses, runs
Chrome or Edge headlessly, and checks stable top-level route container markers
for `/`, `/login`, and every current authenticated app route in
`web/src/routes.ts`: `/dashboard`, `/chat`, `/memory`, `/reflections`,
`/plans`, `/goals`, `/insights`, `/automations`, `/integrations`, `/settings`,
`/tools`, and `/personality`. It is a route-mount guard, not a screenshot
parity suite.

## Current Ownership Model

| Area | Owner File | Responsibility |
| --- | --- | --- |
| Route list and route normalization | `web/src/routes.ts` | `RoutePath`, `ROUTES`, `normalizeRoute`, `navigate`, `navigatePublicEntry` |
| Public/auth shell | `web/src/App.tsx` | Public home, login/register modal, session bootstrap, logout/reset redirects |
| Public shell helpers | `web/src/components/public-shell.tsx` | `PublicGlyph` SVG selection used by public proof and feature sections |
| Authenticated product shell | `web/src/App.tsx` | Sidebar layout, mobile tab bar, route rendering, route copy |
| Shell chrome helpers | `web/src/components/shell.tsx` | `SidebarIconKind`, `ShellNavButton`, `AviaryWordmark`, `SidebarBrandBlock`, `ShellUtilityBar` |
| App icon primitives | `web/src/components/app-icons.tsx` | `ChevronDownIcon`, `CloseIcon`, `PlusIcon`, `MicrophoneIcon`, `SendArrowIcon` |
| Chat components | `web/src/components/chat.tsx` | `ChatFlowStage` |
| Dashboard components | `web/src/components/dashboard.tsx` | `DashboardSignalCard` |
| Personality components | `web/src/components/personality.tsx` | `PersonalityTimelineRow` |
| Shared presentational panels | `web/src/components/shared.tsx` | `StatePanel`, `FeedbackBanner`, `ModuleEntryCard`, `FlowRail`, `RouteHeroPanel`, `InsightPanel` |
| API client | `web/src/lib/api.ts` | Typed fetch wrapper and app-facing endpoint methods |
| Styling | `web/src/index.css` | Route layouts, product shell visuals, responsive behavior, state styling |

`GAP`: route rendering and many route-local UI fragments are still mostly
inside `web/src/App.tsx`; this document maps current ownership but does not
claim component-level separation beyond the extracted route contract.

## API Client Surface

| API Client Method | Endpoint | Main Consumers |
| --- | --- | --- |
| `api.getMe()` | `GET /app/me` | bootstrap, settings refresh |
| `api.register()` | `POST /app/auth/register` | auth modal |
| `api.login()` | `POST /app/auth/login` | auth modal |
| `api.logout()` | `POST /app/auth/logout` | utility bar/sign out |
| `api.patchSettings()` | `PATCH /app/me/settings` | settings route |
| `api.resetData()` | `POST /app/me/reset-data` | settings reset section |
| `api.getChatHistory()` | `GET /app/chat/history` | chat route load and post-send refresh |
| `api.sendChatMessage()` | `POST /app/chat/message` | chat composer |
| `api.getPersonalityOverview()` | `GET /app/personality/overview` | dashboard, personality, memory, reflections, plans, goals, insights, automations |
| `api.getToolsOverview()` | `GET /app/tools/overview` | tools and integrations route data |
| `api.patchToolsPreferences()` | `PATCH /app/tools/preferences` | tools route toggles |
| `api.startTelegramLink()` | `POST /app/tools/telegram/link/start` | tools route Telegram link start |
| `api.getHealth()` | `GET /health` | dashboard/automation/integration health-derived panels |

## Shared State Owners

| State | Owner | Used By |
| --- | --- | --- |
| `route` | `App()` | route rendering, sidebar, mobile tab bar |
| `authMode`, `authModalOpen`, `authBusy`, `me`, `settingsDraft` | `App()` | public/auth shell and settings route |
| `history`, `localTranscriptItems`, `chatText`, `chatSending`, `historyLoading` | `App()` | chat route |
| `overview`, `overviewLoading` | `App()` | dashboard, personality, memory, reflections, plans, goals, insights, automations |
| `toolsOverview`, `toolsLoading`, `telegramLinkStart`, `toolPreferenceBusy` | `App()` | tools and integrations routes |
| `healthSnapshot`, `healthLoading`, `healthError` | `App()` | dashboard, automations, integrations, health-status panels |
| `error`, `toast` | `App()` | global feedback banners |

## Route Map

| Route | Public/Auth | Data Source | Route Behavior | Backend Feature/Pipeline | Test Evidence |
| --- | --- | --- | --- | --- | --- |
| `/` | public | no API until auth action | Public home; `normalizeRoute("/")` maps product route state to `/login` while `navigatePublicEntry("/")` can show public entry | Public shell | `backend/tests/test_web_routes.py` |
| `/login` | public/auth | `api.login`, `api.register`, `api.getMe` bootstrap | Login/register modal and auth session bootstrap | App auth session | `backend/tests/test_api_routes.py`, `backend/tests/test_web_routes.py` |
| `/dashboard` | auth required | `api.getPersonalityOverview`, `api.getHealth`, `api.getToolsOverview` | Flagship overview assembled from learned state, health, and tool readiness summaries | Learned state overview, release/health, tools | `backend/tests/test_api_routes.py`, `backend/tests/test_web_routes.py` |
| `/chat` | auth required | `api.getChatHistory`, `api.sendChatMessage` | Optimistic local transcript, backend chat send, durable history refresh, markdown rendering | App Chat Pipeline | `backend/tests/test_api_routes.py`, `backend/tests/test_runtime_pipeline.py`, `backend/tests/test_web_routes.py` |
| `/personality` | auth required | `api.getPersonalityOverview` | Personality layers and recent learned-state presentation | Learned state overview | `backend/tests/test_api_routes.py`, `backend/tests/test_web_routes.py` |
| `/memory` | auth required | `api.getPersonalityOverview` | Memory-style route using learned-state/recent activity projections | Learned state overview, retrieval context | `backend/tests/test_api_routes.py`, `backend/tests/test_web_routes.py` |
| `/reflections` | auth required | `api.getPersonalityOverview` | Reflection-oriented route using learned-state summaries | Deferred reflection, learned state overview | `backend/tests/test_api_routes.py`, `backend/tests/test_web_routes.py` |
| `/plans` | auth required | `api.getPersonalityOverview` | Planning route assembled from current planning/continuity summaries | Foreground runtime, goals/tasks | `backend/tests/test_api_routes.py`, `backend/tests/test_web_routes.py` |
| `/goals` | auth required | `api.getPersonalityOverview` | Goal route assembled from learned-state and goal signal summaries | Goals/tasks/planned work | `backend/tests/test_api_routes.py`, `backend/tests/test_web_routes.py` |
| `/insights` | auth required | `api.getPersonalityOverview` | Insight route assembled from learned knowledge/preference summaries | Learned state overview | `backend/tests/test_api_routes.py`, `backend/tests/test_web_routes.py` |
| `/automations` | auth required | `api.getPersonalityOverview`, `api.getHealth` | Automation/proactive status route using overview and health-derived scheduler/proactive posture | Scheduler/proactive/planned work | `backend/tests/test_scheduler_worker.py`, `backend/tests/test_web_routes.py` |
| `/integrations` | auth required | `api.getToolsOverview`, `api.getHealth` | Integration readiness route using backend-owned tool/provider truth | Tools Pipeline, provider readiness | `backend/tests/test_connector_policy.py`, `backend/tests/test_web_routes.py` |
| `/tools` | auth required | `api.getToolsOverview`, `api.patchToolsPreferences`, `api.startTelegramLink` | Tool directory, preference toggles, Telegram link-code start | Tools Pipeline, Telegram linking | `backend/tests/test_api_routes.py`, `backend/tests/test_connector_policy.py`, `backend/tests/test_web_routes.py` |
| `/settings` | auth required | `api.patchSettings`, `api.resetData`, `api.logout` | Account/interface settings and destructive reset flow | Profile/settings, user data reset, auth session | `backend/tests/test_api_routes.py`, `backend/tests/test_preferences.py`, `backend/tests/test_web_routes.py` |

## Component And Helper Clusters

| Cluster | Functions/Components | Main Routes |
| --- | --- | --- |
| Routing and labels | `normalizeRoute`, `navigate`, `routeLabel`, `routeDescription` | all routes |
| Dashboard components | `DashboardSignalCard` in `web/src/components/dashboard.tsx` | dashboard |
| Public shell | public home render branch in `web/src/App.tsx`, `AviaryWordmark` in `web/src/components/shell.tsx`, `PublicGlyph` in `web/src/components/public-shell.tsx` | `/`, `/login` |
| Shell chrome | `SidebarGlyph`, `ShellNavButton`, `SidebarBrandBlock`, `AviaryWordmark`, `ShellUtilityBar` in `web/src/components/shell.tsx` | authenticated routes |
| App control icons | `ChevronDownIcon`, `CloseIcon`, `PlusIcon`, `MicrophoneIcon`, `SendArrowIcon` in `web/src/components/app-icons.tsx` | public auth modal, sidebar, chat composer |
| Shared panels | `StatePanel`, `FeedbackBanner`, `ModuleEntryCard`, `FlowRail`, `RouteHeroPanel`, `InsightPanel` in `web/src/components/shared.tsx` | dashboard and module routes |
| Chat helpers | `renderChatMarkdown`, `transcriptMetadataSummary`, `chatDeliveryState`, `reconcileLocalTranscriptItems` in `web/src/App.tsx`; `ChatFlowStage` in `web/src/components/chat.tsx` | `/chat` |
| Personality route components | `PersonalityTimelineRow` in `web/src/components/personality.tsx` | memory, reflections, plans, personality |
| Tool helpers | `toolStatusClass`, `formatToolState`, `formatToolLinkState`, `summarizeToolAction` | `/tools`, `/integrations` |
| Profile/settings helpers | `normalizeUiLanguage`, `resolveUiLanguage`, `normalizeUtcOffset`, `utcOffsetOption` | `/settings`, bootstrap |
| Learned-state helpers | `recentActivityRows`, `summaryLines`, `conversationChannelStatus`, dashboard/personality derived summaries | dashboard, personality, memory, reflections, plans, goals, insights, automations |

## Gaps

- `web/src/App.tsx` remains the route-rendering/component/state owner for most
  of the browser shell, while route type/list/history helpers now live in
  `web/src/routes.ts` and the first shared panels now live in
  `web/src/components/shared.tsx`. Shell branding, nav helpers, and the utility
  bar now live in `web/src/components/shell.tsx`; public glyphs now live in
  `web/src/components/public-shell.tsx`; pure control icons now live in
  `web/src/components/app-icons.tsx`; the first chat presentational component
  now lives in `web/src/components/chat.tsx`; dashboard signal cards now live
  in `web/src/components/dashboard.tsx`; the first personality presentational
  row now lives in `web/src/components/personality.tsx`.
- Static/fallback copy still exists for several module routes when backend
  overview fields are absent.
- The current dedicated frontend route smoke covers the public shell and core
  authenticated routes, but full interaction e2e and screenshot parity remain
  separate future work.
- Route-level data dependencies are documented here, but component extraction
  ownership is not yet a code convention.
