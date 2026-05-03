# App Route Cluster Audit

Last updated: 2026-05-03

This audit maps the remaining `web/src/App.tsx` route-local rendering clusters
after the route contract, shared shell, dashboard signal card, personality
timeline row, and tools component extractions.

## Current Route Branches

| Route branch | Start line in `App.tsx` | Current extraction posture | Recommended next action |
| --- | ---: | --- | --- |
| `/dashboard` | 4388 | Large visual flagship branch; partially uses `DashboardSignalCard` and shared panels | Defer broad moves until a screenshot-parity slice is active |
| `/chat` | 4683 | High-behavior branch with composer, optimistic transcript, markdown rendering, and delivery state | Extract pure transcript/message presentation only after helper ownership is settled |
| `/memory` | 4889 | Module-style overview route using shared cards | Good later candidate for route module extraction |
| `/reflections` | 4984 | Module-style overview route using shared cards | Good later candidate for route module extraction |
| `/plans` | 5074 | Module-style overview route using shared cards | Good later candidate for route module extraction |
| `/goals` | 5164 | Module-style overview route using shared cards | Good later candidate for route module extraction |
| `/insights` | 5260 | Module-style overview route using shared note/stat/side-panel patterns | Side-panel/row chrome extracted in PRJ-995; broader route module extraction can wait |
| `/automations` | 5357 | Module-style route mixed with health-derived scheduler posture and shared side-panel patterns | Side-panel/row chrome extracted in PRJ-995; health helper ownership remains a later candidate |
| `/integrations` | 5453 | Tools/health provider readiness branch; already benefits from tool helper extraction | Candidate after module side-panel extraction because it has provider/health coupling |
| `/settings` | 5556 | Form-heavy branch; preference card/fact and side panel shells live in `web/src/components/settings.tsx`; settings formatting helpers live in `web/src/lib/settings-formatting.ts` | No immediate extraction needed in this cluster |
| `/tools` | 5733 | Tools presentation cluster extracted to `web/src/components/tools.tsx`; route state remains in `App()` | No immediate extraction needed in this cluster |
| `/personality` | 5949 | Visual/personality branch; partially uses `PersonalityTimelineRow` | Defer until callout/card ownership can be split without changing canonical visuals |

## Remaining Helper Clusters

| Helper cluster | Current owner | Routes | Posture |
| --- | --- | --- | --- |
| Markdown rendering | `renderInlineMarkdown`, `renderMarkdownLines`, `renderChatMarkdown` in `App.tsx` | `/chat` | Behavior-sensitive; needs focused tests before moving |
| Chat transcript metadata | `transcriptMetadataSummary`, `chatDeliveryState`, `reconcileLocalTranscriptItems` in `App.tsx` | `/chat` | Candidate for `web/src/lib/chat-formatting.ts` after transcript component extraction |
| Learned-state summaries | `recentActivityRows`, `summaryLines` in `App.tsx` | dashboard and module routes | Selected for PRJ-997 because the helpers are pure projections and less coupled than health/provider telemetry |
| Health/channel summaries | `conversationChannelStatus` in `App.tsx` | dashboard, automations, integrations | Defer until provider/integration route ownership is clearer |
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
cleanup. The next implementation slice is `PRJ-997`, which should extract
learned-state summary helpers:

- move `recentActivityRows` and `summaryLines` behind a small learned-state
  formatting module
- keep route-specific derived arrays and UI copy in `App()`
- keep health/channel telemetry helpers in `App()` until integrations/provider
  route ownership is clearer
