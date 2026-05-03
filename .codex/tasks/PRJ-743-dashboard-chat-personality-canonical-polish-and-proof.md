# Task

## Header
- ID: PRJ-743
- Title: Dashboard Chat Personality Canonical Polish And Proof
- Task Type: design
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-742
- Priority: P0

## Context
The authenticated shell now has a real `/dashboard` route and the flagship
overview is materially closer to the canonical dashboard reference. The main
remaining gap is no longer route topology, but visual parity and premium
material polish across `dashboard`, `chat`, and `personality`.

## Goal
Close the next explicit parity gap between the implemented route family and the
canonical route assets through material polish, responsive proof, and deploy
comparison.

## Deliverable For This Stage
- one execution-ready parity task after `PRJ-742`
- explicit drift categories for `dashboard`, `chat`, and `personality`
- validation and evidence expectations for the next implementation slice

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Definition of Done
- [x] The next parity slice is concretely bounded.
- [x] Remaining drift to the canonical dashboard, chat, and personality assets
      is described in implementation terms.
- [x] Validation expectations are explicit for local and deployed proof.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval
- implicit stage skipping

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
  - Not rerun in the 2026-05-03 closure sync; later route-proof tasks already record successful web builds.
- Manual checks:
  - reviewed canonical dashboard, chat, and personality references
  - confirmed public production runtime build revision parity through:
    - `GET /health`
    - root HTML build meta tag
  - 2026-05-03 closure sync reviewed:
    - `docs/ux/flagship-baseline-transfer.md`
    - `docs/ux/dashboard-proof-matrix.md`
    - `docs/ux/personality-module-map.md`
    - `docs/ux/design-memory.md`
    - `.codex/context/TASK_BOARD.md`
  - confirmed later PRJ-875 final route sweep supersedes this in-progress task as the current cross-route proof anchor
  - confirmed remaining proof gaps are now explicit in durable UX docs instead of hidden in this task body
  - `git diff --check` passed
- Screenshots/logs:
  - authenticated deployed screenshot proof now exists in:
    - `.codex/artifacts/production-audit-2026-04-26/dashboard-desktop.png`
    - `.codex/artifacts/production-audit-2026-04-26/chat-desktop.png`
    - `.codex/artifacts/production-audit-2026-04-26/personality-desktop.png`
    - `.codex/artifacts/production-audit-2026-04-26/dashboard-mobile.png`
    - `.codex/artifacts/production-audit-2026-04-26/chat-mobile.png`
    - `.codex/artifacts/production-audit-2026-04-26/personality-mobile.png`
- High-risk checks:
  - no new backend contract added
  - no parallel dashboard system introduced

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/02_architecture.md`
  - `docs/architecture/16_agent_contracts.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
  - not applicable
- Follow-up architecture doc updates:
  - none expected

## UX/UI Evidence (required for UX tasks)
- Design source type: approved_snapshot
- Design source reference:
  - `docs/ux/assets/aion-dashboard-canonical-reference-v2.png`
  - `docs/ux/assets/aion-chat-canonical-reference-v4.png`
  - `docs/ux/assets/aion-personality-canonical-reference-v1.png`
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused:
  - flagship overview stage
  - flagship utility bar
  - integrated composer tray
  - embodied cognition motif
- New shared pattern introduced: no
- Design-memory entry reused:
  - `docs/ux/design-memory.md`
- Design-memory update required: possible
- State checks: loading | empty | success
- Responsive checks: desktop | tablet | mobile
- Input-mode checks: pointer | keyboard | touch
- Accessibility checks:
  - hierarchy readability
  - image should support the route, not carry the route alone
- Parity evidence:
  - local screenshot proof
  - deployed screenshot proof

## Deployment / Ops Evidence (required for runtime or infra tasks)
- Deploy impact: low
- Env or secret changes:
  - none
- Health-check impact:
  - none
- Smoke steps updated:
  - none
- Rollback note:
  - revert `web/src/` shell and route polish changes

## Review Checklist (mandatory)
- [x] Current stage is declared and respected.
- [x] Deliverable for the current stage is complete.
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated if repository truth changed.
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
This task is now active. The first execution pass added:

- a dashboard-specific convergence loop plan:
  - `docs/planning/dashboard-canonical-convergence-loop-plan.md`
- another dashboard polish slice:
  - stronger rail support surfaces
  - recent-activity tier inside guidance
  - a more integrated flow-band layout
- a further asset-backed dashboard slice now also exists:
  - scenic intention-card artwork
  - scenic summary-band artwork
  - live wiring of those assets into the dashboard route

Remaining work is still mainly visual parity quality, not architecture or
backend contract shape.

Latest implementation pass in this task:

- shared shell utility chrome now moves closer to the canonical references
  through:
  - continuity
  - language
  - linked-channel signal pills
- dashboard now has a dedicated hero-stage atmosphere asset:
  - `docs/ux/assets/aion-dashboard-hero-atmosphere-reference-v1.png`
  - `web/public/aion-dashboard-hero-atmosphere-reference-v1.png`
- dashboard hero stage now adds:
  - scenic cognition-field depth
  - a lower figure caption
  - stronger perceived connective detail from signal cards toward the figure
- chat now gets a calmer ambient shell overlay instead of relying only on
  panel styling
- personality now gets explicit connective callout lines so the hero reads
  more like one embodied system and less like floating cards

Next smallest remaining parity slice after this pass:

- browser-verified proportion tuning for dashboard hero stage
- cognitive-flow band simplification if it still reads too modular
- post-deploy screenshot comparison for dashboard, chat, and personality

Additional refinement pass now complete:

- the dashboard cognitive-flow row now uses a tighter, less card-heavy visual
  rhythm
- the dashboard current-phase sidecard now reads more like one premium
  orchestration object
- personality side insight panels now use a more editorial surface family
  instead of reading like four equal generic boxes
- chat support surfaces now also use a softer premium material treatment so
  the right column supports the transcript more quietly
- the flagship route proportions are now closer to the canonical references:
  - wider dashboard hero center
  - slightly calmer guidance-column share
  - larger personality hero figure stage
  - slightly more transcript-first chat stage balance
- the shared flagship shell and panel tiering were also tightened:
  - utility bar now feels more inset and premium
  - dashboard guidance, recent, and intention tiers are more distinct
  - personality side panels now read less like equal cards and more like one
    curated editorial stack
- visible route-family branding is also being normalized toward AION so old
  naming does not undercut the premium canonical presentation

Production-audit-backed refinement pass now also complete:

- one logged-in production audit was executed on:
  - `https://aviary.luckysparrow.ch`
- detailed audit findings and the bounded final convergence queue now live in:
  - `docs/planning/flagship-production-audit-and-final-convergence-plan.md`
- the current local implementation now responds to the highest-value audited
  gaps through:
  - removing redundant route-hero banners from `dashboard` and `personality`
  - shortening the dashboard by removing the extra module-entry / route
    highlights row
  - moving dashboard hero chips into the actual flagship stage
  - adding a premium starter transcript for zero-history `chat`
  - moving the `chat` portrait panel higher in the support column
  - removing the long payload-browser section from the flagship
    `personality` route

Latest calming-and-compression pass now also complete:

- `dashboard` now has a simpler scenic closure:
  - the lower closure has been reduced to one premium summary band
  - the scenic half now carries more visual weight than the stats half
- `chat` is now closer to the canonical conversation-first target:
  - transcript metadata is reduced to calmer time-first cues
  - raw payload details no longer crowd the flagship transcript surface
  - the support column no longer ends with the extra `response path` card
  - the send control and headline emblem are now visually normalized through
    route CSS treatment
- `personality` is now shorter and closer to the canonical preview route:
  - the extra `layer map` explainer block below the hero and timeline has been
    removed
  - the flagship route now centers the figure stage, timeline, and right-side
    conscious / subconscious / recent-activity stack
- one environment constraint is now explicit for proof planning:
  - in-app browser automation is currently blocked locally because the
    available `node_repl` runtime reports Node `v22.13.0`, while the browser
    runtime requires `>= v22.22.0`
  - until that is upgraded, live compare loops should continue using manual
    deploy review plus stored screenshot evidence

Latest hero-stage-and-callout pass now also complete:

- `dashboard` now gives the canonical embodied center more authority:
  - signal cards use stronger premium material and longer visual connectors
  - the hero figure stage is larger and carries more internal atmosphere
  - the desktop stage split now gives more room to the central cognition scene
- `chat` now moves closer to the canonical portrait posture:
  - the portrait crop is warmer and less left-heavy
  - the planning overlay now sits lower and reads more like one calm inset
  - the desktop support column now yields slightly more space back to the
    transcript
- `personality` now improves embodied-map readability:
  - the figure stage is taller
  - anchored callouts are brighter and easier to locate
  - connector endpoints are now more legible, so the route reads more like one
    symbolic system instead of floating labels

Latest shell-tiering-and-highlight pass now also complete:

- `dashboard` guidance now reads more like an editorial stack:
  - the first guidance card is visually promoted as the lead recommendation
  - the following cards are calmer and less equal-weight, closer to the
    canonical curated-column feel
- `chat` top controls now feel less app-heavy:
  - control pills are denser, quieter, and better tiered
  - the continuity pill carries the strongest emphasis while linked channels
    no longer dominates the row
- `personality` right-column highlights now have stronger hierarchy:
  - the key signal card becomes the anchor tile in the metric grid
  - the remaining summary cards now read as supporting signals instead of four
    equal blocks

Latest rhythm-and-side-stack pass now also complete:

- `dashboard` now tightens the lower editorial rhythm:
  - guidance cards, recent activity, and the intention surface are now more
    clearly tiered
  - the lower trio of cards now carries distinct material roles instead of
    reading like one repeated family
  - the summary band now gives slightly more authority back to the scenic side
- `chat` now further subordinates support context to the transcript:
  - the support column gap is tighter
  - the context panel is calmer
  - the first support card reads as the lead cue while the final card fades
    into a quieter closing note
- `personality` now uses a clearer side-stack narrative:
  - conscious signals still open the stack
  - highlights now act as the summary anchor
  - subconscious remains secondary
  - recent activity now closes the stack as the quietest support block

Latest closure-and-mobile-compression pass now also complete:

- `dashboard` now smooths the flagship descent from hero into closure:
  - the flow band reads more like a bridge between the hero and the lower grid
  - lower-grid pacing is denser
  - the final scenic closure now reads more like a true ending than another
    generic card family
- `chat` now improves portrait posture:
  - the portrait panel sits slightly higher and taller
  - the planning inset is placed lower with a calmer relationship to the face
  - mobile crop now preserves more of the portrait while keeping the overlay
    readable
- `personality` now compresses more gracefully on mobile:
  - callout cards are narrower and lighter
  - planning and skills are pulled inward
  - the role card and knowledge card now avoid the heavier stacked-card feel

Latest proportion-and-density pass now also complete:

- `dashboard` now reinforces central-stage authority:
  - the middle hero scene is slightly larger
  - side signal columns are tighter
  - connectors now travel farther toward the figure so the composition reads
    more like one system
- `chat` now stays more transcript-first during longer reads:
  - assistant and user bubbles now use more intentional max widths
  - desktop allocates a little more room to the transcript than the support
    column
  - portrait crop on mobile is slightly calmer around the face and overlay
- `personality` now gains extra embodied balance:
  - the hero stage is slightly taller
  - mobile callouts compress further inward
  - planning, skills, and role are less likely to overpower the figure at
    smaller widths
- validation after this pass:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed on 2026-04-28

Production deploy drift check:

- `GET https://aviary.luckysparrow.ch/health` returned `status=ok` and
  `release_readiness.ready=true`
- production runtime build revision:
  - `35727c8f0451d9c7f95f338c345e67021084c219`
- local `HEAD`:
  - `38960d9555ea40359623d978f48bce4fa43b5f48`
- `origin/main`:
  - `35727c8f0451d9c7f95f338c345e67021084c219`
- conclusion:
  - production currently matches `origin/main`, not the latest local web
    commits
  - the next deployed screenshot comparison should wait until the latest local
    commits are pushed and deployed

Latest shell-spine-and-route-calm pass now also complete:

- shared shell now reads less admin-like and more inset/premium:
  - the desktop rail was narrowed slightly
  - the utility bar, search surface, and account controls were compacted
  - flagship routes now begin under calmer chrome that yields more authority
    to the route surfaces themselves
- `dashboard` now keeps the editorial sidebar quieter:
  - stage and sidebar padding are denser
  - guidance and recent surfaces are more compact
  - the route reads closer to one continuous flagship composition instead of a
    hero next to a looser card stack
- `chat` now subordinates support context more clearly:
  - transcript rhythm is denser
  - support-column spacing and card padding are quieter
  - the portrait crop sits slightly higher and calmer relative to the overlay
- `personality` now keeps the side stack more ceremonial:
  - side-panel spacing is tighter
  - the right column competes less with the embodied stage
- validation after this pass:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed on 2026-04-28

Latest closure-ceremony-and-composer-unification pass now also complete:

- `dashboard` now closes more like one scenic flagship route:
  - the lower summary layout is tighter
  - the scenic closure is taller and cropped more intentionally
  - summary copy now occupies a calmer, more editorial width
- `chat` now reads more like one conversation instrument:
  - the action tray, composer shell, and support buttons are denser and more
    visually joined
  - the feature strip is tighter and less card-like
  - the route keeps more attention on the transcript instead of on UI spacing
- `personality` now improves embodied-map legibility:
  - callout cards are slightly lighter
  - connector lines travel farther and read more explicitly
  - mobile callouts compress a little more cleanly without feeling bulky
- validation after this pass:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed on 2026-04-28

Latest one-screen-read-and-embodied-continuity pass now also complete:

- `dashboard` now reads shorter and more flagship-like:
  - the lower condensed grid is tighter
  - the summary closure uses a denser internal layout
  - summary stat copy is constrained so the lower half does not sprawl
- `chat` now treats the empty-history preview more intentionally:
  - preview metadata is calmer
  - starter messages read more like a designed opening conversation than a raw
    fallback transcript
- `personality` now better links hero and timeline:
  - the hero shell is slightly tighter
  - the timeline panel now reads more like an integrated continuation of the
    figure stage
  - callout copy and connector visibility are slightly stronger
- validation after this pass:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed on 2026-04-28

Latest dashboard-compaction pass now also complete:

- `dashboard` now removes one of the biggest sources of vertical drift:
  - conversation-channel status was folded into the guidance column as a
    compact support surface instead of a full-width second section
  - flow notes were reduced to a tighter two-card ending under the live flow
  - the route now holds its flagship hierarchy more like one overview screen
- validation after this pass:
  - `Push-Location .\web; npm run build; Pop-Location`
  - result: passed on 2026-04-28

2026-05-03 closure sync:

- PRJ-743 is now closed because its implementation and proof history has been
  superseded by later route-family and canonical proof work, especially:
  - `PRJ-875` canonical UI final route sweep
  - `PRJ-728` dashboard proof matrix repair
  - `PRJ-729` personality module map repair
  - `PRJ-731` flagship baseline transfer sync
- durable current references now live in:
  - `docs/ux/flagship-baseline-transfer.md`
  - `docs/ux/dashboard-proof-matrix.md`
  - `docs/ux/personality-module-map.md`
  - `docs/ux/design-memory.md`
- remaining gaps are not treated as hidden blockers here:
  - dashboard-specific tablet proof
  - personality tablet proof
  - consistently named keyboard traversal evidence
  - consistently named touch-target evidence
  - contrast and reduced-motion review artifacts for future changed routes

## Result Report
- Goal:
  - Close the historical dashboard/chat/personality canonical polish lane
    without duplicating the later canonical proof system.
- Scope:
  - Task status synchronization and evidence consolidation only.
- Implementation Plan:
  - Verify later proof and baseline docs.
  - Mark the PRJ-743 task as complete.
  - Update task board and project state with the current evidence owners.
- Acceptance Criteria:
  - PRJ-743 no longer remains a stale `IN_PROGRESS` item.
  - Current truth points to durable UX proof/baseline docs.
  - Remaining evidence gaps are explicit.
- Definition of Done:
  - Satisfied by existing PRJ-743 implementation history, later PRJ-875 proof,
    PRJ-728/729/731 documentation repairs, context updates, and `git diff --check`.
- Result:
  - PRJ-743 is closed as a historical visual-polish lane.
- Next:
  - Select the next READY task from the board after excluding stale visual
    tasks that already have later closure evidence.
