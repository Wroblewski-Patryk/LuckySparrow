# App Route Cluster Audit

Last updated: 2026-05-03

This audit maps the remaining `web/src/App.tsx` route-local rendering clusters
after the route contract, shared shell, dashboard signal card, personality
timeline row, and tools component extractions.

## Current Route Branches

| Route branch | Start line in `App.tsx` | Current extraction posture | Recommended next action |
| --- | ---: | --- | --- |
| `/dashboard` | 4058 | Large visual flagship branch; partially uses `DashboardSignalCard` and shared panels | Defer broad moves until a screenshot-parity slice is active |
| `/chat` | 4353 | High-behavior branch now split across chat helpers/components; route state, API calls, send behavior, and message mapping remain in `App()` | No immediate chat extraction before a fresh behavior/state audit |
| `/memory` | 4441 | Module-style overview route using shared cards and `ModuleOverviewBar` | Inner module panels remain future candidates |
| `/reflections` | 4536 | Module-style overview route using shared cards and `ModuleOverviewBar` | Inner module panels remain future candidates |
| `/plans` | 4626 | Module-style overview route using shared cards and `ModuleOverviewBar` | Inner module panels remain future candidates |
| `/goals` | 4716 | Module-style overview route using shared cards and `ModuleOverviewBar` | Inner module panels remain future candidates |
| `/insights` | 4812 | Module-style overview route using shared note/stat/side-panel patterns | Side-panel/row chrome extracted in PRJ-995; broader route module extraction can wait |
| `/automations` | 4911 | Module-style route mixed with health-derived scheduler posture and shared side-panel patterns | Health helper ownership remains a later provider-aware candidate |
| `/integrations` | 5009 | Tools/health provider readiness branch; already benefits from tool helper extraction | Defer until provider/health ownership audit |
| `/settings` | 5112 | Form-heavy branch; preference card/fact and side panel shells live in `web/src/components/settings.tsx`; settings formatting helpers live in `web/src/lib/settings-formatting.ts` | No immediate extraction needed in this cluster |
| `/tools` | 5289 | Tools presentation cluster extracted to `web/src/components/tools.tsx`; route state remains in `App()` | No immediate extraction needed in this cluster |
| `/personality` | 5505 | Visual/personality branch; partially uses `PersonalityTimelineRow` | Defer until callout/card ownership can be split without changing canonical visuals |

## Remaining Helper Clusters

| Helper cluster | Current owner | Routes | Posture |
| --- | --- | --- | --- |
| Markdown rendering | `renderChatMarkdown` in `web/src/lib/chat-markdown.tsx`; characterization in `web/scripts/chat-markdown-characterization.mjs` | `/chat` | Extracted and characterized in PRJ-1003 |
| Chat route display model | `buildChatRouteModel` in `web/src/lib/chat-route-model.ts` | `/chat` | Extracted in PRJ-1017; API calls, state, send behavior, transcript behavior, and rendering remain in `App()` |
| Chat transcript metadata | `transcriptMetadataSummary`, `chatDeliveryState`, `reconcileLocalTranscriptItems` in `web/src/lib/chat-transcript.ts` | `/chat` | Extracted in PRJ-1001 |
| Chat transcript row | `ChatTranscriptMessageRow` in `web/src/components/chat.tsx` | `/chat` | Extracted in PRJ-1007; mapping, refs, delivery, timestamp, and markdown remain in `App()` |
| Chat transcript shell | `ChatTranscriptShell` in `web/src/components/chat.tsx` | `/chat` | Extracted in PRJ-1015; container ref, loading fallback, rows, and composer are passed explicitly |
| Chat composer shell | `ChatComposerShell` in `web/src/components/chat.tsx` | `/chat` | Extracted in PRJ-1005; send behavior remains in `App()` |
| Chat cognitive belt | `ChatCognitiveBelt` in `web/src/components/chat.tsx` | `/chat` | Extracted in PRJ-1009; card data and goal-progress derivation remain in `App()` |
| Chat topbar | `ChatTopbar` in `web/src/components/chat.tsx` | `/chat` | Extracted in PRJ-1011; active summary and posture labels remain in `App()` |
| Chat portrait/support panel | `ChatPortraitPanel` in `web/src/components/chat.tsx` | `/chat` | Extracted in PRJ-1013; focus/emphasis/learned-cue labels remain in `App()` |
| Learned-state summaries | `recentActivityRows`, `summaryLines`, `stringValue`, `formatTimestamp` in `web/src/lib/learned-state-formatting.ts` | dashboard and module routes | Extracted in PRJ-997 |
| Health/channel summaries | `conversationChannelStatus` in `App.tsx` | dashboard, automations, integrations | Deferred in PRJ-998 until provider/integration route ownership is clearer |
| Metric formatting | `numberValue`, `scaledMetricSize` in `web/src/lib/metric-formatting.ts` | dashboard, automations, integrations, tools summary projections | Extracted in PRJ-999 |
| Settings formatting | `normalizeUiLanguage`, `resolveUiLanguage`, `normalizeUtcOffset`, `utcOffsetOption`, `localeOptionDisplay` in `web/src/lib/settings-formatting.ts` | `/settings`, bootstrap | Extracted in PRJ-993 |

## Next Slice

`PRJ-991` extracted the settings preference card/fact presentation cluster.
`PRJ-992` extracted the settings side panel shell cluster. `PRJ-993` extracted
the settings formatting helpers.

`PRJ-995` extracted shared module route side-panel/row presentation for
`/insights` and `/automations`.

Chat transcript behavior and dashboard flagship visuals remain higher risk than
these module-style side-panel shells.

## Helper Extraction Decision

`PRJ-996` compared the remaining helper clusters after module side-panel
cleanup. `PRJ-997` extracted learned-state summary helpers:

- moved `recentActivityRows` and `summaryLines` behind a small learned-state
  formatting module
- keep route-specific derived arrays and UI copy in `App()`
- keep health/channel telemetry helpers in `App()` until integrations/provider
  route ownership is clearer

`PRJ-998` deferred `conversationChannelStatus` because it encodes Telegram
provider and health semantics. `PRJ-999` extracted pure metric formatting
helpers while keeping `conversationChannelStatus` in `App()`.

`PRJ-1000` selected chat transcript metadata helper extraction as the next
frontend architecture slice. `PRJ-1001` extracted it:

- moved `transcriptMetadataSummary`, `chatDeliveryState`, and
  `reconcileLocalTranscriptItems` to a small chat transcript module
- keep markdown rendering, composer behavior, optimistic send state, and route
  rendering in `App()`
- run `npm run build` and the 14-route smoke

`PRJ-1002` reviewed markdown renderer extraction readiness. `PRJ-1003` moved
the renderer to `web/src/lib/chat-markdown.tsx` and added
`npm run test:chat-markdown`, a focused characterization proof for inline code,
bold/italic, lists, paragraph line breaks, and fenced code blocks.

`PRJ-1004` selected chat composer shell extraction as the next safe chat route
slice:

- move action tray, mode tabs, composer shell, and composer note behind a chat
  component
- keep `handleSendMessage`, `chatText`, `sendingMessage`, and optimistic send
  state in `App()`
- pass quick-action, textarea, and submit behavior through explicit props

`PRJ-1005` implemented that slice with `ChatComposerShell` in
`web/src/components/chat.tsx`. The component owns only composer presentation
chrome and receives quick actions, textarea value, labels, icons, and handlers
through explicit props. `App()` still owns `handleSendMessage`, `chatText`,
`sendingMessage`, optimistic local transcript reconciliation, and durable
history refresh. The next safe chat route step is to audit transcript
message-row presentation extraction now that helper, renderer, and composer
boundaries are explicit.

`PRJ-1006` selected transcript message-row presentation extraction as the next
safe implementation slice:

- move the avatar, row alignment class, message article class, metadata chrome,
  delivery indicator element, and copy wrapper behind a chat transcript message
  row component
- keep `visibleTranscriptItems.map(...)`, `transcriptMessageRefs`,
  `chatDeliveryState`, `deliveryLabel` selection, `formatTimestamp(...)`, and
  `renderChatMarkdown(...)` in `App()` for this slice
- pass `isUser`, preview state, speaker label, timestamp label, delivery
  state/label, and rendered markdown content through explicit props

`PRJ-1007` implemented that slice with `ChatTranscriptMessageRow` in
`web/src/components/chat.tsx`. The component owns row alignment, avatar,
message article classing, metadata chrome, delivery indicator element, and the
copy wrapper. `App()` still owns transcript mapping, `transcriptMessageRefs`,
delivery-state calculation, delivery-label selection, timestamp formatting,
and markdown rendering. The next safe chat route step is to audit whether the
cognitive belt or portrait/support-panel chrome can move behind explicit data
props without changing the canonical chat layout.

`PRJ-1008` selected the cognitive belt as the next implementation slice:

- move the `aion-chat-cognitive-belt` card-list presentation behind a
  `ChatCognitiveBelt` component
- keep `chatCognitiveBelt` data construction, goal-progress derivation, and
  planning/health summaries in `App()`
- defer the portrait/support panel because it is more tightly coupled to the
  canonical chat composition and should be audited separately
- defer the transcript shell/container because it owns loading state and refs

`PRJ-1009` implemented the cognitive belt slice with `ChatCognitiveBelt` in
`web/src/components/chat.tsx`. The component owns only the card-list
presentation and progress-bar element. `App()` still owns `chatCognitiveBelt`
data construction, planning/health summary derivation, and `chatGoalCard`
progress calculation. The next safe chat step is another audit before touching
topbar, portrait/support panel, or transcript shell ownership.

`PRJ-1010` selected chat topbar extraction as the next implementation slice:

- move `aion-chat-topbar`, headline/title/live-status chrome, and route-posture
  labels behind a `ChatTopbar` component
- keep `chatActiveSummary`, linked-channel summary, preferred-language
  formatting, and all route data derivation in `App()`
- defer portrait/support panel because it is visual-composition sensitive
- defer transcript shell/container because it owns loading state and refs

`PRJ-1011` implemented that slice with `ChatTopbar` in
`web/src/components/chat.tsx`. The component owns only headline, live-status,
and route-posture presentation. `App()` still owns `chatActiveSummary`,
`chatLinkedChannelsStatus`, preferred-language fallback formatting, and all
route data derivation. Portrait/support panel and transcript shell remain
deferred until separate audits.

`PRJ-1012` selected the chat portrait/support panel as the next implementation
slice:

- move `aion-chat-portrait-panel`, support notes, planning overlay, focus
  summary, learned-cue count display, and portrait copy behind a
  `ChatPortraitPanel` component
- keep `chatCurrentFocus`, `chatIntentCard.emphasis`, learned-cue count
  formatting, and all route data derivation in `App()`
- defer transcript shell/container because it owns loading state and refs
- defer chat route data-helper extraction because it is broader than a single
  presentational slice

`PRJ-1013` implemented the portrait/support panel slice with
`ChatPortraitPanel` in `web/src/components/chat.tsx`. The component owns support
notes, planning overlay chrome, learned-cue display chrome, and portrait copy.
`App()` still owns `chatCurrentFocus`, `chatIntentCard.emphasis`,
learned-cue count fallback formatting, and all route data derivation.
Transcript shell/container and chat data-helper extraction remain deferred.

`PRJ-1014` selected a thin transcript shell extraction as the next
implementation slice:

- move the thread column and `aion-chat-transcript` container into a
  `ChatTranscriptShell` component
- pass the transcript container ref, loading fallback, message rows, and
  composer as explicit props/children
- keep `visibleTranscriptItems.map(...)`, `transcriptMessageRefs`,
  `chatDeliveryState`, delivery-label selection, timestamp formatting, and
  `renderChatMarkdown(...)` in `App()`
- defer chat route data-helper extraction because it is broader than a shell
  presentation slice

`PRJ-1015` implemented the shell slice with `ChatTranscriptShell` in
`web/src/components/chat.tsx`. The component owns the thread-column and
transcript-container classes and forwards the container ref. `App()` still owns
loading fallback selection, message mapping, message refs, delivery-state and
delivery-label calculation, timestamp formatting, markdown rendering, composer
state/handlers, and chat route data helpers.

`PRJ-1016` selected a focused chat route display-model helper extraction as the
next implementation slice:

- create `web/src/lib/chat-route-model.ts`
- move pure display projections for quick actions, current focus, linked-channel
  fallback, intent card, motivation metrics, goal card, and related-memory
  cards behind explicit summary inputs
- keep chat API calls, chat state, transcript mapping, send behavior, and route
  rendering in `App()`
- preserve current fallback strings and route display behavior

`PRJ-1017` implemented that slice with `buildChatRouteModel` in
`web/src/lib/chat-route-model.ts`. The helper owns quick actions, current
focus, linked-channel fallback, intent card, motivation metrics, goal card, and
related-memory projections from explicit summary inputs. `App()` still owns chat
API calls, chat state, transcript reconciliation, send behavior, message
mapping, and route rendering.

`PRJ-1018` re-checked current route anchors after the chat cleanup lane. The
next safe frontend architecture slice is a shared module overview bar:

- add a route-keyed `ModuleOverviewBar` shared component
- replace the repeated overview bar chrome for `/memory`, `/reflections`,
  `/plans`, and `/goals`
- preserve route-specific CSS classes, copy, status labels, values, and aria
  labels through explicit props
- defer dashboard/personality because they are flagship visual surfaces
- defer provider/health helpers until a provider-aware ownership audit

`PRJ-1019` implemented that slice with `ModuleOverviewBar` in
`web/src/components/shared.tsx`. `/memory`, `/reflections`, `/plans`, and
`/goals` now pass route key, copy, status label/value, and aria label explicitly
while preserving existing route-specific selectors and route data ownership.

`PRJ-1020` selected the repeated stat-row wrapper as the next implementation
slice:

- add a route-keyed `ModuleStatRow` shared component
- replace the repeated stat-row section wrappers for `/memory`, `/reflections`,
  `/plans`, and `/goals`
- keep stat card arrays and `RouteStatCard` usage in `App()`
- preserve route-specific aria labels and CSS selectors through explicit props

`PRJ-1021` implemented that slice with `ModuleStatRow` in
`web/src/components/shared.tsx`. `/memory`, `/reflections`, `/plans`, and
`/goals` now use a route-keyed stat-row wrapper while keeping stat card arrays
and `RouteStatCard` mapping in `App()`.

`PRJ-1022` selected the recent activity list as the next implementation slice:

- add a route-keyed `ModuleActivityList` shared component
- replace repeated recent activity row markup for `/memory` and `/reflections`
- keep `personalityRecentActivity` data ownership and slicing in `App()`
- defer decorative main panels because their visual structure is more
  route-specific

`PRJ-1023` implemented that slice with `ModuleActivityList` in
`web/src/components/shared.tsx`. `/memory` and `/reflections` now share
route-keyed recent activity row chrome while keeping panel headings,
`personalityRecentActivity` ownership, and slicing in `App()`.

`PRJ-1024` reviewed the remaining module-route inner card clusters after
activity-list extraction. The next safe implementation slice is a shared
route-keyed title/body card-list component for:

- `/reflections` prompt cards
- `/plans` next-step cards
- `/goals` signal cards

This target preserves the current route-specific class names through explicit
route/card keys, keeps all card data and copy construction in `App()`, and
avoids the higher-risk decorative goal horizon panel. Memory signal cards are
deferred because they include a `meta` field; plans/goals dot-row context lists
are deferred because their chrome differs from the simple title/body cards.

`PRJ-1025` implemented that slice with `ModuleTextCardList` in
`web/src/components/shared.tsx`. `/reflections` prompt cards, `/plans`
next-step cards, and `/goals` signal cards now share the same title/body
card-list component while preserving their route-specific class selectors and
keeping all route data arrays in `App()`. The next module cleanup target should
be audited separately before touching memory signal cards, dot-row
guidance/context lists, or decorative route panels.
