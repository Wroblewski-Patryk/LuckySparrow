# V1 Provider Payload Leakage Audit

Date: 2026-05-03
Task: `PRJ-933`
Status: DONE; `PRJ-960` added provider payload sentinel regressions

## Purpose

This audit checks whether raw provider, Telegram, durable memory, or proposal
payload bodies can leak through user- or operator-facing overview and evidence
surfaces.

## Surfaces Reviewed

| Surface | Code owner | Result |
| --- | --- | --- |
| `/app/personality/overview` | `backend/app/api/routes.py` | FIXED: recent memory already used bounded activity summaries; pending proposals now use a sanitized metadata projection without raw `payload`. |
| `/app/tools/overview` | `backend/app/core/app_tools_policy.py` | No raw provider response bodies found; route returns provider readiness, status reasons, capabilities, next actions, and source-of-truth paths. |
| `/app/chat/history` | `backend/app/memory/repository.py` | Intentional transcript projection only. It reads `event` and `expression` text from memory payloads and honors internal/transcript visibility flags. |
| `/health` policy surfaces | `backend/app/api/routes.py`, `backend/app/core/observability_policy.py` | No raw provider response bodies found; health exposes policy, readiness, connector posture, and counts/metadata. |
| Incident evidence | `backend/app/core/observability_policy.py`, `backend/scripts/export_incident_evidence_bundle.py` | Strict-mode fallback uses health policy surfaces with `debug_payload_included=false`; debug payload routes remain token/debug-policy gated. |
| Durable memory repository | `backend/app/memory/repository.py` | Raw memory and proposal payloads are stored by design for runtime/repository use. Exposure risk is controlled at API projection boundaries. |
| Frontend overview usage | `web/src/App.tsx` | Current UI consumes summary/count fields from planning and learned-state snapshots; it does not render raw pending proposal payload bodies. |

## Fix Implemented

`_build_learned_state_snapshot(...)` previously returned
`planning_state.pending_proposals` from repository serialization. Repository
serialization intentionally contains `payload` for runtime handoff. The app
overview and internal learned-state snapshot now use `_pending_proposal_snapshot`
to expose:

- proposal id, type, summary, confidence, status, research policy, allowed
  tools, source event id, and timestamps
- `payload_present`
- sorted `payload_keys`

The raw `payload` body is no longer returned through this snapshot.

## Verified Boundaries

- Authenticated app overview recent activity does not include memory `payload`.
- Authenticated app overview pending proposals do not include raw proposal
  `payload`.
- Tools overview contains provider readiness and capability metadata, not raw
  ClickUp, Google Calendar, Google Drive, web page, or Telegram response
  bodies.
- Health/incident policy posture is metadata-oriented and does not include raw
  provider payload bodies in strict-mode evidence.
- Debug and internal inspection paths remain debug-policy gated.

## Validation

Focused route command:

```powershell
Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py -k "personality_overview or tools_overview or internal_state or incident or raw_payload"; Pop-Location
```

Result: `8 passed, 111 deselected`.

Provider sentinel regression:

```powershell
Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py -k "provider_payload_sentinels or personality_overview or tools_overview"; Pop-Location
```

Result: `6 passed, 117 deselected`.

Frontend API type/build check:

```powershell
Push-Location .\web; npm run build; Pop-Location
```

Result: passed.

Additional checks:

- route/repository/policy inspection
- frontend usage search for `pending_proposals`
- markdown/reference review
- `git diff --check`

## Residual Gaps

- Live provider activation smoke remains blocked until ClickUp, Google Calendar,
  and Google Drive credentials are configured.
- The PRJ-931 AI red-team scenario pack has first live execution evidence from
  `PRJ-958`, but it remains `REVIEW_REQUIRED` until assistant reply text can be
  captured for scoring.
- Add explicit strict-mode incident-bundle regression that searches exported
  JSON for known synthetic provider payload sentinels.
- Frontend route smoke with injected overview fixtures is still useful once a
  frontend test runner exists; `PRJ-960` adds the current API type/build
  contract instead.

## Release Posture

No confirmed raw provider payload leak remains in the inspected app overview,
tools overview, health, or strict-mode incident evidence paths. The fixed
proposal snapshot closes the only confirmed public learned-state projection
leak candidate found during this audit. `PRJ-960` now pins app overview, tools
overview, and health projections with synthetic provider payload sentinels.
