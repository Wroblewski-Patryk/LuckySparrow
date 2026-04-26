# AION Mobile

`mobile/` is the approved workspace for the future native client.

The initial stack is now frozen as:

- Expo-managed React Native
- TypeScript
- Expo Router

This workspace must remain a thin client over backend-owned `/app/*`
contracts.

For chat, that means `GET /app/chat/history` is treated as one shared
conversation transcript surface with exchanged message items, not as a
separate memory list or continuity inspector.

It must not:

- implement runtime cognition or planning logic
- consume internal debug endpoints
- manage provider secrets in UI

See [docs/planning/mobile-client-baseline.md](/C:/Personal/Projekty/Aplikacje/Personality/docs/planning/mobile-client-baseline.md)
for the shared client-contract baseline that `mobile/` must follow.
