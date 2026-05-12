# Mobile Client Baseline

## Purpose

This document freezes the initial mobile stack and shared client-contract
baseline for the `v2` mobile foundation.

It exists so `mobile/` can move from placeholder status to a real workspace
without guessing the mobile stack or inventing a second product contract.

## Approved Stack

The initial mobile client stack is:

- Expo-managed React Native app
- TypeScript
- Expo Router

This aligns with current Expo guidance where new Expo apps include Expo Router
as the default routing baseline and keeps the first mobile slice close to the
existing TypeScript-first `web/` workspace while remaining native-client
appropriate.

## Shared Client-Contract Baseline

`mobile/` must remain a thin client over backend-owned app-facing contracts.

The shared first-party resource model is:

- authenticated user/session state
- settings
- shared conversation transcript history
- chat message send
- personality overview
- tools overview
- allowed tools preference updates
- Telegram linking start flow

Current shared app-facing endpoints:

- `POST /app/auth/register`
- `POST /app/auth/login`
- `POST /app/auth/logout`
- `GET /app/me`
- `PATCH /app/me/settings`
- `GET /app/chat/history`
- `POST /app/chat/message`
- `GET /app/personality/overview`
- `GET /app/tools/overview`
- `PATCH /app/tools/preferences`
- `POST /app/tools/telegram/link/start`

Transcript posture for `GET /app/chat/history`:

- it returns exchanged message items, not memory cards
- the default app-facing window is the latest `10` messages
- message order is oldest-to-newest for direct chat rendering
- the same transcript continuity is shared across first-party app chat and
  linked Telegram once both resolve under the same backend `user_id`
- mobile must present this as one conversation thread instead of rebuilding a
  separate continuity or memory-inspector surface

## Boundary Rules

- backend remains the only owner of auth, cognition, memory, planning, action,
  reflection, and integrations
- mobile must not consume internal debug or operator-only surfaces such as
  `/internal/*`
- mobile must not manage provider secrets in UI
- mobile must not introduce a second domain model for tools, personality,
  settings, or chat
- mobile may add client-side presentation state, navigation state, and local
  input drafts only

## Auth Transport Posture

The shared resource contract is frozen now, but native auth transport details
must remain explicit.

Current repo fact:

- backend auth is already owned by first-party `/app/auth/*` contracts
- the current `web` client uses backend-owned session cookies
- `mobile/` now has an Expo-managed scaffold that records the shared resource
  contract without claiming final native auth transport is solved
- `PRJ-1158` adds the first v1.5 native UI shell seed over the same shared
  resource model; it does not solve final native auth transport or introduce
  mobile-owned cognition/provider behavior

Bounded posture for the mobile foundation:

- `PRJ-668` scaffolds the client around the shared backend-owned resource model
- later API-client adapter work must decide final native auth transport before
  the scaffold becomes a production auth client
- `PRJ-1158` may use Expo web export as a lightweight render proof until a
  device/simulator proof is available

## Non-Goals For This Freeze

- choosing store-release automation
- building native modules
- deciding offline-first sync strategy
- introducing mobile-specific backend contracts before the shared baseline is
  exercised
- exposing provider setup or admin debug tooling inside the mobile client
