# AION Mobile

`mobile/` is the approved Expo-managed React Native workspace for the native
client baseline.

## Stack

- Expo SDK 55
- React Native 0.83
- TypeScript
- Expo Router

## Commands

```powershell
Push-Location .\mobile
npm install
npm run start
Pop-Location
```

Use Expo Go first. Create custom native builds only when a later task adds a
feature that requires them.

## Shared Contract Boundary

This workspace must remain a thin client over backend-owned `/app/*`
contracts. The first scaffold records those shared resources in
`src/api/shared-client-contract.ts`; it does not implement final native auth
transport.

For chat, `GET /app/chat/history` is one shared conversation transcript surface
with exchanged message items. It is not a separate memory list or continuity
inspector.

It must not:

- implement runtime cognition or planning logic
- consume internal debug endpoints
- manage provider secrets in UI

See `docs/planning/mobile-client-baseline.md` for the shared client-contract
baseline that `mobile/` must follow.
