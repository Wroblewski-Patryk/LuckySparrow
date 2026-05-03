# V1 Cross-User And Session Isolation Audit

Last updated: 2026-05-03

## Status

`PRJ-932` is complete as an audit. No runtime defect was confirmed in this
pass.

`PRJ-959` closes the app-route evidence-depth gaps for two-user chat history,
single-user reset isolation, and active session-cookie switching. Telegram
relink/conflict ownership remains covered by the memory repository regression
`test_memory_repository_reassigns_telegram_link_ownership_to_latest_user`.

Focused validation:

```powershell
Push-Location .\backend
..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py -k "auth or session or reset or chat_history or personality_overview or tools_overview or telegram_link or linked_auth_user or internal_state"
Pop-Location
```

Result:

- `24 passed, 95 deselected`

## Reviewed Surfaces

| Surface | Primary Code | Current Posture | Audit Result |
| --- | --- | --- | --- |
| App auth sessions | `backend/app/api/routes.py` `_require_app_auth()` | Session cookie resolves to hashed token, rejects missing/revoked/expired sessions, touches active session, then loads active auth user | Verified |
| Auth cookies | `backend/app/api/routes.py` `_set_auth_cookie()` / `_clear_auth_cookie()` | `HttpOnly`, `SameSite=Lax`, `Secure` in production, root path | Verified |
| App profile/settings | `PATCH /app/me/settings` | Requires app auth and writes only authenticated `user_id` owned profile/preferences | Verified |
| Reset data | `POST /app/me/reset-data` | Requires app auth, exact confirmation text, and calls repository reset for authenticated `user_id` | Verified, add deeper two-user regression |
| Chat history | `GET /app/chat/history` | Requires app auth and reads `get_recent_chat_transcript_for_user(user_id=authenticated_user)` | Verified by code, add explicit two-user regression |
| App chat message | `POST /app/chat/message` | Requires app auth and injects authenticated `user_id` into runtime event meta | Verified by test |
| Personality overview | `GET /app/personality/overview` | Requires app auth and builds learned-state snapshot for authenticated `user_id` | Verified by test, including non-leakage of other-user recent activity |
| Tools overview/preferences | `/app/tools/*` | Requires app auth for overview, preference mutation, and Telegram link start | Verified by tests |
| Telegram linked identity | `_resolve_linked_telegram_user_id()` and link-code flow | Linked Telegram chat/user ids resolve to backend auth `user_id` after `/link CODE`; expired link code is rejected | Verified by tests |
| Internal state inspection | `GET /internal/state/inspect` | Requires debug access, not app auth; returns requested `user_id` learned-state snapshot for admin/debug use | Verified as admin/debug boundary |

## Verified Safeguards

- App-facing private routes call `_require_app_auth()` before reading or
  mutating user data.
- Auth session tokens are stored and looked up by hash.
- Missing, revoked, expired, inactive, or absent-session states fail closed with
  `401` or `403` posture.
- App chat messages use the authenticated backend auth `user_id`, not a
  caller-provided `user_id`.
- App chat history reads transcript entries through the authenticated
  `user_id`.
- Personality overview test coverage includes an other-user recent activity
  row and verifies it does not leak into the authenticated user's overview.
- Tools overview and preference mutation require authenticated session.
- Telegram link start requires authenticated session and configured provider.
- Telegram ingress after link resolves the event to the linked backend auth
  user id.
- Internal state inspection is intentionally admin/debug scoped through debug
  access enforcement.

## Evidence Gaps

These gaps did not prove a runtime defect in the audit. Their current status:

- Add an explicit two-user chat-history regression:
  - register user A and user B
  - persist transcript-like memory for both
  - assert user A cannot see user B transcript entries and vice versa
  - status: `DONE` in `PRJ-959`
- Add an explicit two-user reset-data regression:
  - register user A and user B
  - seed runtime data for both
  - reset user A with confirmation
  - assert user B data and sessions remain intact
  - status: `DONE` in `PRJ-959`
- Add an explicit session-cookie switching regression:
  - hold two valid session cookies
  - switch cookie contexts
  - assert every app overview/history/settings response follows the active
    cookie, not stale client state
  - status: `DONE` in `PRJ-959`
- Add an explicit Telegram relink/conflict regression if product policy allows
  resolving a Telegram chat already attached to another backend auth identity.
  - status: `DONE`; covered by
    `test_memory_repository_reassigns_telegram_link_ownership_to_latest_user`
- Execute the PRJ-931 AI red-team scenario pack for behavior-level leakage and
  prompt-injection evidence.
  - status: `DONE_WITH_REVIEW_REQUIRED` in `PRJ-958`

## Release Interpretation

Current recommendation:

- `DONE`

This means the audited server boundaries look aligned with current
architecture, and the original app-route evidence-depth gaps are now covered by
focused regressions. Provider payload, strict-mode incident, and live provider
credential tests remain separate planned security hardening tasks.
