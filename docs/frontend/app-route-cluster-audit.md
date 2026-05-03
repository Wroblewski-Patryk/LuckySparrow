# App Route Cluster Audit

Last updated: 2026-05-03

This audit maps the remaining `web/src/App.tsx` route-local rendering clusters
after the route contract, shared shell, dashboard signal card, personality
timeline row, and tools component extractions.

## Current Route Branches

| Route branch | Start line in `App.tsx` | Current extraction posture | Recommended next action |
| --- | ---: | --- | --- |
| `/dashboard` | 4467 | Large visual flagship branch; partially uses `DashboardSignalCard` and shared panels | Defer broad moves until a screenshot-parity slice is active |
| `/chat` | 4762 | High-behavior branch with composer, optimistic transcript, markdown rendering, and delivery state | Extract pure transcript/message presentation only after helper ownership is settled |
| `/memory` | 4968 | Module-style overview route using shared cards | Good later candidate for route module extraction |
| `/reflections` | 5063 | Module-style overview route using shared cards | Good later candidate for route module extraction |
| `/plans` | 5153 | Module-style overview route using shared cards | Good later candidate for route module extraction |
| `/goals` | 5243 | Module-style overview route using shared cards | Good later candidate for route module extraction |
| `/insights` | 5339 | Module-style overview route using shared note/stat patterns | Good later candidate for route module extraction |
| `/automations` | 5436 | Module-style route mixed with health-derived scheduler posture | Extract after health panel ownership is mapped |
| `/integrations` | 5532 | Tools/health provider readiness branch; already benefits from tool helper extraction | Candidate after settings because it has less form state than settings but more health coupling |
| `/settings` | 5635 | Form-heavy branch; preference card/fact and side panel shells now live in `web/src/components/settings.tsx` | Next settings slice can extract formatting helpers while keeping form state in `App()` |
| `/tools` | 5815 | Tools presentation cluster extracted to `web/src/components/tools.tsx`; route state remains in `App()` | No immediate extraction needed in this cluster |
| `/personality` | 6031 | Visual/personality branch; partially uses `PersonalityTimelineRow` | Defer until callout/card ownership can be split without changing canonical visuals |

## Remaining Helper Clusters

| Helper cluster | Current owner | Routes | Posture |
| --- | --- | --- | --- |
| Markdown rendering | `renderInlineMarkdown`, `renderMarkdownLines`, `renderChatMarkdown` in `App.tsx` | `/chat` | Behavior-sensitive; needs focused tests before moving |
| Chat transcript metadata | `transcriptMetadataSummary`, `chatDeliveryState`, `reconcileLocalTranscriptItems` in `App.tsx` | `/chat` | Candidate for `web/src/lib/chat-formatting.ts` after transcript component extraction |
| Learned-state summaries | `recentActivityRows`, `summaryLines` in `App.tsx` | dashboard and module routes | Candidate for helper extraction once route modules are split |
| Health/channel summaries | `conversationChannelStatus` in `App.tsx` | dashboard, automations, integrations | Candidate for a health formatting helper after provider route ownership is clearer |
| Settings formatting | `normalizeUiLanguage`, `resolveUiLanguage`, `normalizeUtcOffset`, `utcOffsetOption` in `App.tsx` | `/settings`, bootstrap | Candidate after settings presentation is extracted |

## Next Slice

`PRJ-991` extracted the settings preference card/fact presentation cluster.
`PRJ-992` extracted the settings side panel shell cluster. The next settings
follow-up should target formatting helpers:

- keep `settingsDraft`, save/reset handlers, reset confirmation, and input
  event handlers in `App()`
- run `npm run build` and the 14-route smoke

These settings slices remain smaller and lower-risk than moving chat transcript
behavior or dashboard flagship visuals.
