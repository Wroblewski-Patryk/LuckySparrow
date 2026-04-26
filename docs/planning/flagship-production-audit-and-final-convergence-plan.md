# Flagship Production Audit And Final Convergence Plan

## Purpose

This document records one logged-in production audit against the canonical
flagship route targets and turns the visual drift into a bounded final
convergence queue for:

- shared authenticated shell
- `dashboard`
- `chat`
- `personality`

## Audit Evidence

- production host audited:
  - `https://aviary.luckysparrow.ch`
- canonical references compared:
  - `docs/ux/assets/aion-dashboard-canonical-reference-v2.png`
  - `docs/ux/assets/aion-chat-canonical-reference-v2.png`
  - `docs/ux/assets/aion-personality-canonical-reference-v1.png`
- authenticated screenshots captured on 2026-04-26:
  - `.codex/artifacts/production-audit-2026-04-26/dashboard-desktop.png`
  - `.codex/artifacts/production-audit-2026-04-26/chat-desktop.png`
  - `.codex/artifacts/production-audit-2026-04-26/personality-desktop.png`
  - `.codex/artifacts/production-audit-2026-04-26/dashboard-mobile.png`
  - `.codex/artifacts/production-audit-2026-04-26/chat-mobile.png`
  - `.codex/artifacts/production-audit-2026-04-26/personality-mobile.png`

## Shared Shell Drift

### What the production shell still gets wrong

- the left rail still reads heavier and wider than the canonical flagship frame
- shell narration repeats too much:
  - large route banners
  - large route hero sections
  - then large route bodies
- top chrome was closer than before, but the route family still felt stacked
  rather than composed
- some visible copy and labels still mixed shell utility language with route
  storytelling language too aggressively

### What the canonical shell does instead

- one premium frame
- one calm top utility rhythm
- one strong left rail
- route content begins immediately with the real flagship surface

### Required shell response

- remove redundant route-hero banners from flagship routes
- keep the top utility bar premium but lighter
- compress the desktop rail slightly so the central route canvas dominates

## Dashboard Drift

### Production gaps observed

- the route was still too long vertically compared with the canonical dashboard
- the dashboard hero and the lower card family were separated by too many
  equally strong sections
- the final module-entry area pushed the route toward "product brochure"
  instead of a canonical overview
- the cognitive-flow band still sat too low and inherited too much card logic
- the guidance column hierarchy was directionally correct, but the whole route
  still felt more like a sequence of blocks than one editorial composition

### Canonical target behavior

- hero stage dominates immediately
- guidance column remains clearly secondary but premium
- cognition rail is one orchestration object
- lower analytics/support cards are compact enough to keep the route within one
  flagship read
- no extra generic module-entry band below the main flagship narrative

### Required dashboard response

- start immediately with the hero stage
- keep hero chips inside the hero instead of above it
- remove the extra module-entry and route-highlight row
- tighten hero, guidance, and flow proportions
- shorten the lower card family so the route feels closer to one-screen

## Chat Drift

### Production gaps observed

- a brand-new account still produced too much empty space in the transcript
- the right column was visually rich, but the portrait sat too low relative to
  the canonical composition
- the route title and status copy felt duplicated
- the send affordance was visually present but too weak semantically for test
  automation and accessibility
- the route needed a premium empty state, not a literal empty state

### Canonical target behavior

- transcript still looks complete even before a long history exists
- portrait and cognition-support surfaces help the transcript instead of
  waiting below it
- the route feels intimate, finished, and alive on first load

### Required chat response

- render a designed starter transcript when history is empty
- shorten transcript height so the route feels denser and calmer
- move the portrait stage upward in the right column
- simplify support cards
- keep the feature strip, but let the workspace carry the primary magic

## Personality Drift

### Production gaps observed

- the route still had an oversized banner before the actual canonical preview
- the lower payload-inspector section made the route far longer than the
  approved canonical personality preview
- the top preview was strong, but the deep technical card grid diluted the
  ceremonial reading of the screen

### Canonical target behavior

- route opens directly into a compact route title and the embodied preview
- the hero, side insight panels, and timeline carry the route
- deeper payload inspection does not dominate the flagship surface

### Required personality response

- replace the large route hero with a compact route intro
- keep the preview tabs, hero, side panels, and timeline
- remove the long payload-browser section from the flagship route

## Execution Queue

### Slice A: Shell Compression

- keep the shared flagship utility bar
- reduce left-rail width and padding slightly
- eliminate redundant flagship route banners

### Slice B: Dashboard Canonical Height And Rhythm

- move dashboard chips into the hero body
- remove module-entry and route-highlight blocks
- tighten hero and flow spacing
- keep the scenic summary band as the closing note

### Slice C: Chat First-Load Beauty

- add starter transcript cards for zero-history sessions
- reduce transcript vertical emptiness
- move portrait support higher in the right column
- simplify chat support cards
- strengthen send-button semantics

### Slice D: Personality Preview-Only Convergence

- use compact title treatment instead of a large hero banner
- preserve the preview system
- remove the generic lower payload-browser section

### Slice E: Deploy Proof And Final Crop Pass

- redeploy
- capture fresh logged-in screenshots
- compare against the three canonical targets again
- if still needed:
  - tune dashboard hero crop
  - tune chat portrait crop
  - strengthen personality connector visibility

## Progress In This Turn

The current local implementation now already covers most of Slices A through D:

- shared shell utility chrome is lighter and more canonical
- dashboard no longer starts with a redundant route hero
- dashboard no longer ends with the extra module-entry brochure row
- chat now has a designed starter transcript for empty history
- chat portrait support is moved higher in the support column
- personality now opens with a compact route intro and no longer carries the
  long payload-browser section

## Remaining Final Proof

The next loop after deploy should answer only these questions:

- is the dashboard now compact enough relative to the canonical reference?
- does the chat empty-state transcript feel premium enough on first load?
- does the personality preview now stop at the right depth?
- does any remaining mismatch require one more dedicated raster background or
  just a final crop/spacing pass?
