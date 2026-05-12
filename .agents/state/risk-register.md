# Risk Register

Last updated: 2026-05-12

| ID | Area | Risk | Likelihood | Impact | Trigger | Mitigation | Status | Linked Requirement/Decision | Next Action | Last Updated |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RISK-000 | process | Agents may report progress without requirement-level proof. | medium | high | Work changes behavior but matrix/evidence is not updated. | Require requirement matrix updates before DONE. | mitigating | REQ-FUNC-000 | Replace sample row with project-specific risks. | 2026-05-11 |
| RISK-UI-001 | web_ui | Automated route smoke could pass while tablet/mobile visual composition still feels too dense, too long, or below canonical polish. | medium | medium | v1.1 work relies only on route markers or accessibility checks. | Require screenshot artifacts and route-by-route visual review; close one flagship surface at a time against canonical references. | mitigating | REQ-UX-001, QA-UX-001 | v1.1 web responsive handoff is complete; use the screenshot evidence for `v1.5` mobile planning or explicit future polish feedback. | 2026-05-11 |
| RISK-MOB-001 | mobile_ui | Native mobile UI could drift into a second domain model or claim production readiness before auth transport and device proof exist. | medium | high | Mobile implementation adds local cognition/provider setup or only validates through web proxy. | Keep `/app/*` contract boundary visible; require TypeScript, repeatable Expo export screenshot audit now, local all-route preview proof for handoff, and device/simulator proof before production mobile claims. `PRJ-1177` proves the local preview on `127.0.0.1:8093` across all seeded routes while preserving the explicit native-device blocker. | mitigating | REQ-MOB-002, QA-MOB-001, QA-MOB-002 | Capture Expo Go/simulator proof when Android tooling or a device is available. | 2026-05-12 |

Allowed statuses: `open`, `mitigating`, `accepted`, `closed`, `superseded`.
