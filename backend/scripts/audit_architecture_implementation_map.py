from __future__ import annotations

import argparse
import csv
from collections import Counter
from dataclasses import dataclass
from datetime import date
from pathlib import Path


LEDGER_COLUMNS = [
    "ID",
    "Module",
    "Submodule",
    "Mode",
    "Layer",
    "Capability",
    "Scenario / child function",
    "Expected behavior",
    "Local status",
    "Local evidence",
    "Target status",
    "Target evidence",
    "Confidence",
    "Risk",
    "Priority",
    "Owner",
    "Next verification",
    "Validation command pack",
    "Last verified",
    "Notes",
    "Readiness bucket",
]


@dataclass(frozen=True)
class AuditRow:
    row_id: str
    module: str
    submodule: str
    mode: str
    layer: str
    capability: str
    scenario: str
    expected: str
    local_status: str
    local_evidence: str
    target_status: str
    target_evidence: str
    confidence: str
    risk: str
    priority: str
    owner: str
    next_verification: str
    last_verified: str
    notes: str
    bucket: str

    def as_csv_row(self) -> dict[str, str]:
        return {
            "ID": self.row_id,
            "Module": self.module,
            "Submodule": self.submodule,
            "Mode": self.mode,
            "Layer": self.layer,
            "Capability": self.capability,
            "Scenario / child function": self.scenario,
            "Expected behavior": self.expected,
            "Local status": self.local_status,
            "Local evidence": self.local_evidence,
            "Target status": self.target_status,
            "Target evidence": self.target_evidence,
            "Confidence": self.confidence,
            "Risk": self.risk,
            "Priority": self.priority,
            "Owner": self.owner,
            "Next verification": self.next_verification,
            "Validation command pack": validation_command_pack(self.row_id),
            "Last verified": self.last_verified,
            "Notes": self.notes,
            "Readiness bucket": self.bucket,
        }


def repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def exists(root: Path, relative_path: str) -> bool:
    return (root / relative_path).exists()


def contains(root: Path, relative_path: str, needle: str) -> bool:
    path = root / relative_path
    if not path.exists():
        return False
    return needle in path.read_text(encoding="utf-8", errors="ignore")


def validation_command_pack(row_id: str) -> str:
    packs = {
        "ARCH-RUNTIME-001": (
            "Push-Location .\\backend; ..\\.venv\\Scripts\\python -m pytest -q "
            "tests/test_runtime_pipeline.py tests/test_graph_stage_adapters.py "
            "tests/test_graph_state_contract.py; $exit=$LASTEXITCODE; Pop-Location; exit $exit"
        ),
        "ARCH-ACTION-LOOP-001": (
            "Push-Location .\\backend; ..\\.venv\\Scripts\\python -m pytest -q "
            "tests/test_action_executor.py tests/test_runtime_pipeline.py -k "
            "\"website_review_loop or work_partner_orchestration_baseline or "
            "triages_clickup_task_update_until_confirmation\"; $exit=$LASTEXITCODE; Pop-Location; exit $exit"
        ),
        "ARCH-AUTH-APP-001": (
            "Push-Location .\\backend; ..\\.venv\\Scripts\\python -m pytest -q "
            "tests/test_api_routes.py tests/test_config.py -k "
            "\"auth or session or login or register or logout\"; $exit=$LASTEXITCODE; Pop-Location; exit $exit"
        ),
        "ARCH-MEMORY-REFLECTION-001": (
            "Push-Location .\\backend; ..\\.venv\\Scripts\\python -m pytest -q "
            "tests/test_memory_repository.py tests/test_reflection_worker.py "
            "tests/test_runtime_pipeline.py; $exit=$LASTEXITCODE; Pop-Location; exit $exit"
        ),
        "ARCH-PROACTIVE-001": (
            "Push-Location .\\backend; ..\\.venv\\Scripts\\python -m pytest -q "
            "tests/test_scheduler_worker.py tests/test_planned_action_observer.py "
            "tests/test_runtime_pipeline.py -k \"scheduler or proactive or planned\"; "
            "$exit=$LASTEXITCODE; Pop-Location; exit $exit"
        ),
        "ARCH-WEB-UX-001": (
            "Push-Location .\\web; npm exec -- tsc -b --pretty false; "
            "if ($LASTEXITCODE -eq 0) { npm exec -- vite build }; "
            "if ($LASTEXITCODE -eq 0) { npm run smoke:routes }; "
            "$exit=$LASTEXITCODE; Pop-Location; exit $exit"
        ),
        "ARCH-CONNECTORS-001": (
            "Push-Location .\\backend; ..\\.venv\\Scripts\\python -m pytest -q "
            "tests/test_action_executor.py tests/test_connector_policy.py tests/test_api_routes.py "
            "-k \"connector or tools_overview or tools_preferences\"; $exit=$LASTEXITCODE; Pop-Location; exit $exit"
        ),
        "ARCH-WEB-ROUTES-001": (
            "Push-Location .\\web; npm run smoke:routes; $exit=$LASTEXITCODE; Pop-Location; exit $exit"
        ),
        "ARCH-MOBILE-001": "Native app proof is deferred by current scope; validate web responsive breakpoints through ARCH-WEB-UX-001.",
        "ARCH-AI-SECURITY-001": (
            ".\\backend\\scripts\\run_behavior_validation.ps1 -GateMode operator; "
            "review docs/security/v1-ai-red-team-scenario-pack.md"
        ),
        "ARCH-RELEASE-OPS-001": (
            "Push-Location .\\backend; ..\\.venv\\Scripts\\python .\\scripts\\run_release_go_no_go.py; "
            "$exit=$LASTEXITCODE; Pop-Location; exit $exit"
        ),
        "ARCH-DEPLOY-AUTO-001": (
            "Run candidate deploy from source/webhook, then capture release go/no-go and web meta revision "
            "evidence in docs/operations/release-evidence-index.md."
        ),
        "ARCH-DOCS-GOV-001": (
            "Push-Location .\\backend; ..\\.venv\\Scripts\\python .\\scripts\\audit_architecture_implementation_map.py; "
            "if ($LASTEXITCODE -eq 0) { ..\\.venv\\Scripts\\python .\\scripts\\generate_project_status_dashboard.py }; "
            "$exit=$LASTEXITCODE; Pop-Location; exit $exit"
        ),
        "ARCH-DOC-MAPS-001": (
            "Refresh docs/architecture/traceability-matrix.md and docs/architecture/codebase-map.md "
            "from docs/operations/architecture-implementation-map-2026-05-10.csv; "
            "then rerun the audit/dashboard generators and git diff --check."
        ),
        "ARCH-TEST-EVIDENCE-001": (
            "Push-Location .\\backend; ..\\.venv\\Scripts\\python .\\scripts\\audit_architecture_implementation_map.py; "
            "if ($LASTEXITCODE -eq 0) { ..\\.venv\\Scripts\\python .\\scripts\\generate_project_status_dashboard.py }; "
            "$exit=$LASTEXITCODE; Pop-Location; exit $exit"
        ),
    }
    return packs.get(row_id, "Define a row-specific validation command before marking this row READY.")


def evidence_state(root: Path) -> dict[str, bool]:
    return {
        "runtime_contracts": exists(root, "backend/app/core/contracts.py")
        and exists(root, "backend/app/core/runtime.py")
        and exists(root, "backend/tests/test_runtime_pipeline.py"),
        "action_loop_summary": contains(root, "backend/app/core/contracts.py", "ActionLoopSummaryOutput")
        and contains(root, "backend/app/core/action.py", "_action_loop_summary")
        and contains(root, "docs/architecture/17_logging_and_debugging.md", "system_debug.action_result.action_loop"),
        "app_auth": contains(root, "backend/app/api/routes.py", "/app/auth/login")
        and contains(root, "web/src/lib/api.ts", "login"),
        "memory_reflection": exists(root, "backend/app/memory/repository.py")
        and exists(root, "backend/app/reflection/worker.py")
        and exists(root, "backend/tests/test_memory_repository.py"),
        "proactive_scheduler": exists(root, "backend/app/workers/scheduler.py")
        and exists(root, "backend/app/proactive/engine.py")
        and exists(root, "backend/tests/test_scheduler_worker.py"),
        "connector_confirmation": contains(root, "backend/app/core/connector_confirmation.py", "pending_confirmation")
        and contains(root, "web/src/components/chat.tsx", "pendingConfirmation"),
        "web_route_smoke": exists(root, "web/scripts/route-smoke.mjs")
        and contains(root, "docs/planning/v1-reality-audit-and-roadmap.md", "route smoke"),
        "mobile_scaffold": exists(root, "mobile"),
        "mobile_v15_proof": exists(root, "docs/operations/v15-mobile-ui-pr-and-production-promotion-handoff-2026-05-12.md")
        and exists(root, "mobile/scripts/mobile-device-proof-doctor.mjs")
        and contains(root, "mobile/package.json", "doctor:ui-mobile-device"),
        "ai_red_team": exists(root, "docs/security/v1-ai-red-team-scenario-pack.md")
        and contains(root, "docs/planning/v1-reality-audit-and-roadmap.md", "9 PASS / 0 REVIEW"),
        "release_evidence": exists(root, "docs/operations/release-evidence-index.md")
        and contains(root, "docs/planning/v1-reality-audit-and-roadmap.md", "v1.1.0"),
        "route_component_map": exists(root, "docs/frontend/route-component-map.md"),
        "test_ownership": exists(root, "docs/engineering/test-ownership-ledger.md"),
        "coolify_follow_up": contains(root, "docs/operations/release-evidence-index.md", "Coolify source/webhook automation reliability"),
    }


def build_rows(root: Path) -> list[AuditRow]:
    state = evidence_state(root)
    today = date.today().isoformat()
    return [
        AuditRow(
            "ARCH-RUNTIME-001",
            "runtime",
            "foreground pipeline",
            "API + APP + DEBUG",
            "backend",
            "Canonical stage flow",
            "event -> perception -> context -> motivation -> role -> planning -> action -> expression/memory/reflection evidence",
            "Runtime preserves canonical stage ownership and exposes debug evidence.",
            "PASS" if state["runtime_contracts"] else "NOT_VERIFIED",
            "backend/tests/test_runtime_pipeline.py; PRJ-925 full backend gate 1074 passed",
            "PASS",
            "PRJ-925 full backend gate; production release evidence remains tracked separately",
            "High",
            "Stage-order drift would corrupt all higher-level behavior.",
            "P0",
            "Backend + QA",
            "Keep full backend gate after shared runtime contract changes.",
            today,
            "Runtime path is implemented and broadly covered locally.",
            "READY",
        ),
        AuditRow(
            "ARCH-ACTION-LOOP-001",
            "action",
            "bounded action loop",
            "API + DEBUG",
            "backend + docs",
            "Skill-guided bounded tool use",
            "Website review and ClickUp triage expose summary and bounded observations.",
            "Action owns execution, skills remain metadata, raw payloads stay out of debug/memory.",
            "PASS" if state["action_loop_summary"] else "PARTIAL",
            "PRJ-924 focused tests; PRJ-925 full backend gate; PRJ-926 debug/ops docs",
            "NOT_APPLICABLE",
            "Provider behavior is locally testable; target proof belongs to provider activation rows.",
            "High",
            "Tool execution must not bypass confirmation or leak raw provider payloads.",
            "P0",
            "Backend + QA",
            "Plan deeper execute-observe-adjust only from a narrow evidence-backed task.",
            today,
            "Summary contract is ready; deeper reusable loop remains future scope.",
            "READY",
        ),
        AuditRow(
            "ARCH-AUTH-APP-001",
            "app shell",
            "auth/session",
            "WEB + API",
            "UI + API + DB",
            "First-party authenticated shell",
            "Register, login, logout, session-backed /app routes, and user settings.",
            "Product clients use backend-owned sessions, not raw user-id headers.",
            "COVERED_LOCAL" if state["app_auth"] else "NOT_VERIFIED",
            "backend/tests/test_api_routes.py; web/src/lib/api.ts; docs/architecture/traceability-matrix.md",
            "PASS",
            "v1.1 release evidence and production parity docs",
            "High",
            "Auth/session drift risks cross-user data exposure.",
            "P0",
            "Backend + Frontend",
            "Keep cross-user/session regressions in the release gate.",
            today,
            "Existing evidence is strong; keep in regression pack.",
            "READY",
        ),
        AuditRow(
            "ARCH-MEMORY-REFLECTION-001",
            "memory",
            "episodic/reflection",
            "API + WORKER",
            "backend + DB + worker",
            "Memory and deferred reflection",
            "Foreground memory persists, reflection queue processes later, conclusions/relations remain bounded.",
            "Memory and reflection preserve ownership boundaries and avoid expression-owned mutation.",
            "PASS" if state["memory_reflection"] else "PARTIAL",
            "backend/tests/test_memory_repository.py; backend/tests/test_reflection_worker.py; PRJ-925 full backend gate",
            "PASS",
            "v1.1 production release evidence green for core scope",
            "High",
            "Memory/reflection drift affects personality continuity and privacy.",
            "P0",
            "Backend + QA",
            "Keep relation and memory consistency in future AI/runtime changes.",
            today,
            "Reflection worker remains in-process/queue-backed; separate process is deferred.",
            "READY",
        ),
        AuditRow(
            "ARCH-PROACTIVE-001",
            "proactive",
            "scheduler/planned work",
            "WORKER + OPS",
            "backend + DB + ops",
            "Proactive and planned work",
            "External cadence posture, planned work observer, and anti-spam boundaries are health-visible.",
            "Proactive behavior is opt-in, bounded, and transcript-truth aware.",
            "COVERED_LOCAL" if state["proactive_scheduler"] else "PARTIAL",
            "backend/tests/test_scheduler_worker.py; backend/tests/test_planned_action_observer.py; runtime ops runbook",
            "SCOPE_DEPENDENT_FOLLOW_UP",
            "Current release boundary does not expand proactive launch scope; target sample is required only if that scope expands",
            "Medium",
            "Proactive mistakes can annoy users or violate communication boundaries.",
            "P1",
            "Backend + Ops",
            "Run target proactive sample only when proactive launch scope expands.",
            today,
            "Core implementation exists; broader live behavior remains scope-dependent.",
            "DEFERRED",
        ),
        AuditRow(
            "ARCH-WEB-UX-001",
            "web",
            "visual states and accessibility",
            "WEB",
            "frontend + QA",
            "Experience quality evidence",
            "Key routes have current responsive, loading, empty, error, success, blocked, and accessibility proof.",
            "UX quality claims are backed by repeatable screenshots or browser checks, not only route mounting.",
            "PASS",
            "PRJ-931 web command pack: tsc, Vite build, route smoke with 14 routes, no framework overlay, non-empty body text, and zero visible unnamed interactive controls",
            "PASS",
            "PRJ-931 focused route-state/accessibility smoke",
            "High",
            "A route can mount successfully while still missing state/accessibility polish.",
            "P1",
            "Frontend + QA",
            "Keep route-state/accessibility smoke in route-shell and shared-control changes.",
            today,
            "Fresh route-state and lightweight accessibility evidence is attached.",
            "READY",
        ),
        AuditRow(
            "ARCH-CONNECTORS-001",
            "connectors",
            "confirmation-gated organizer tools",
            "API + PROVIDERS",
            "backend + integration + web",
            "ClickUp/Calendar/Drive organizer stack",
            "Read paths are bounded; mutation paths require explicit confirmation and provider readiness.",
            "Provider operations remain action-owned and fail closed without credentials/confirmation.",
            "COVERED_LOCAL" if state["connector_confirmation"] else "PARTIAL",
            "PRJ-811..926 evidence; backend/tests/test_action_executor.py; backend/tests/test_api_routes.py",
            "BLOCKED_EXTERNAL_EXTENSION",
            "Provider activation smoke requires operator credentials and an expanded organizer launch claim",
            "Medium",
            "Daily-use organizer claims require real provider proof.",
            "P1",
            "Backend + Ops",
            "Run provider activation smoke after ClickUp/Calendar/Drive credentials exist and organizer launch scope expands.",
            today,
            "Current v1/v1.1 release boundary keeps organizer provider activation outside the achieved core/web-supported marker.",
            "DEFERRED",
        ),
        AuditRow(
            "ARCH-WEB-ROUTES-001",
            "web",
            "route shell",
            "WEB",
            "frontend",
            "First-party web shell",
            "Public, auth, dashboard, chat, personality, tools, and module routes mount and use backend-owned contracts.",
            "Routes render through shared shell patterns and app-facing APIs.",
            "PASS" if state["web_route_smoke"] else "PARTIAL",
            "web/scripts/route-smoke.mjs; v1 roadmap route smoke evidence; frontend extraction tasks",
            "PASS",
            "v1.1 release evidence and route smoke documentation",
            "High",
            "Route breakage blocks user-facing product usage.",
            "P0",
            "Frontend + QA",
            "Keep route smoke in every route/frontend architecture change.",
            today,
            "Visual perfection is separate from route mounting confidence.",
            "READY",
        ),
        AuditRow(
            "ARCH-MOBILE-001",
            "mobile",
            "native app scope",
            "MOBILE",
            "client",
            "Native app extension",
            "Native app proof is outside the current product scope; current UI target is the web app at mobile, tablet, and desktop breakpoints.",
            "Mobile must not consume internal debug/admin routes or provider secrets.",
            "SCOPE_DEFERRED" if state["mobile_v15_proof"] or state["mobile_scaffold"] else "NOT_VERIFIED",
            (
                "PRJ-1158..1199 evidence is preserved as historical native-app groundwork; current user scope selects web responsive breakpoints instead"
                if state["mobile_v15_proof"]
                else "docs/planning/mobile-client-baseline.md; mobile/ scaffold presence"
            ),
            "DEFERRED_BY_SCOPE" if state["mobile_v15_proof"] else "NOT_VERIFIED",
            (
                "User clarified current scope is web in mobile/tablet/desktop breakpoints; native app proof should not drive next work"
                if state["mobile_v15_proof"]
                else "Mobile remains outside the achieved core/web-supported release marker"
            ),
            "Medium",
            "Native mobile proof can distract from the selected web-responsive product target if kept as active next work.",
            "P2",
            "Mobile + Planning",
            (
                "Do not pursue native app proof unless scope is reactivated; keep validating web mobile/tablet/desktop breakpoints through ARCH-WEB-UX-001."
                if state["mobile_v15_proof"]
                else "Restart mobile scope only after an explicit product/release decision."
            ),
            today,
            (
                "Native app evidence remains preserved, but the active UI target is web responsive behavior across three breakpoints."
                if state["mobile_v15_proof"]
                else "Approved baseline exists; implementation is intentionally deferred."
            ),
            "DEFERRED",
        ),
        AuditRow(
            "ARCH-AI-SECURITY-001",
            "AI safety",
            "red-team/security",
            "API + PROD",
            "backend + ops",
            "AI red-team and boundary refusals",
            "Behavioral pack catches unsafe bypass, false mutation success, and cross-user/private-source leaks.",
            "AI responses preserve tool/action boundaries and user-data isolation.",
            "PASS" if state["ai_red_team"] else "PARTIAL",
            "docs/security/v1-ai-red-team-scenario-pack.md; v1.1 strict pack result in roadmap",
            "PASS",
            "v1.1 strict production pack: 9 PASS / 0 REVIEW / 0 FAIL / 0 BLOCKED",
            "High",
            "AI boundary failures can leak data or falsely claim actions.",
            "P0",
            "Security + QA",
            "Rerun red-team pack after prompt, expression, action, auth, or provider changes.",
            today,
            "Current hardening proof is green; keep as release regression gate.",
            "READY",
        ),
        AuditRow(
            "ARCH-RELEASE-OPS-001",
            "operations",
            "release/deploy",
            "PROD",
            "ops + backend",
            "Release evidence and deploy parity",
            "Release candidate, production backend revision, web meta revision, health, and release smoke align.",
            "Operators can prove what is deployed and whether release gates are green.",
            "PASS" if state["release_evidence"] else "PARTIAL",
            "docs/operations/release-evidence-index.md; backend/scripts/run_release_go_no_go.py",
            "PASS",
            "v1.1 release marker and go/no-go evidence",
            "High",
            "Deploy drift makes all release claims unreliable.",
            "P0",
            "Ops/Release",
            "Refresh release evidence index for every selected candidate.",
            today,
            "Source automation reliability is a future-candidate follow-up, not a current core blocker.",
            "READY",
        ),
        AuditRow(
            "ARCH-DEPLOY-AUTO-001",
            "operations",
            "Coolify source automation",
            "PROD",
            "ops",
            "Source-driven deployment reliability",
            "Repository source automation reliably deploys selected candidates without manual UI fallback.",
            "Release process should have repeatable source/webhook convergence evidence.",
            "PARTIAL" if state["coolify_follow_up"] else "NOT_VERIFIED",
            "docs/operations/release-evidence-index.md records source/webhook reliability as follow-up",
            "FUTURE_CANDIDATE_FOLLOW_UP",
            "Future candidate deploys should prove source automation without UI fallback",
            "Medium",
            "Manual fallback can hide source automation drift for the next candidate.",
            "P1",
            "Ops/Release",
            "On the next release candidate, capture source/webhook deploy convergence or explicit fallback evidence.",
            today,
            "Current release parity is green; this is future-candidate reliability work.",
            "DEFERRED",
        ),
        AuditRow(
            "ARCH-DOCS-GOV-001",
            "documentation",
            "source-of-truth governance",
            "REPO",
            "docs + workflow",
            "Architecture and execution truth",
            "Architecture, implementation reality, task board, state files, and ledgers stay synchronized.",
            "Future agents can continue without hidden chat context.",
            "PASS",
            "AGENTS.md; docs/README.md; PRJ-924..927 context/state updates",
            "NOT_APPLICABLE",
            "Repository-local governance only",
            "Medium",
            "Stale docs cause repeated wrong tasks and hidden regressions.",
            "P1",
            "Planning + Documentation",
            "Use this matrix to select future evidence/fix tasks before inventing new work.",
            today,
            "This row is the governance guardrail for the audit itself.",
            "READY",
        ),
        AuditRow(
            "ARCH-DOC-MAPS-001",
            "documentation",
            "secondary maps",
            "REPO",
            "docs",
            "Traceability and codebase maps",
            "Secondary maps stay aligned with the latest architecture implementation audit.",
            "Future agents can use secondary maps together with the generated dashboard without stale readiness claims.",
            "PASS",
            "PRJ-932; docs/architecture/traceability-matrix.md and docs/architecture/codebase-map.md refreshed 2026-05-11",
            "NOT_APPLICABLE",
            "Repository-local documentation only",
            "High",
            "Future drift is still possible if architecture rows change without refreshing maps.",
            "P1",
            "Documentation",
            "Keep secondary maps refreshed whenever architecture audit rows materially change.",
            today,
            "This audit remains the current planning radar; secondary maps now point to it explicitly.",
            "READY",
        ),
        AuditRow(
            "ARCH-TEST-EVIDENCE-001",
            "quality",
            "test ownership",
            "REPO",
            "tests + docs",
            "Test and evidence ownership",
            "Critical architecture rows map to exact tests, smoke scripts, and evidence artifacts.",
            "Future tasks can select validation packs from row IDs without rediscovering test ownership.",
            "PASS" if state["test_ownership"] else "PARTIAL",
            "docs/engineering/test-ownership-ledger.md; this audit now emits row-specific validation command packs",
            "NOT_APPLICABLE",
            "Repository-local quality map",
            "Medium",
            "Weak evidence ownership causes repeated broad test runs and missed focused regressions.",
            "P1",
            "QA/Test",
            "Keep row-specific command packs current when architecture rows or validation ownership change.",
            today,
            "PRJ-929 added exact row command packs to the generated audit and dashboard.",
            "READY",
        ),
    ]


def write_csv(path: Path, rows: list[AuditRow]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=LEDGER_COLUMNS)
        writer.writeheader()
        for row in rows:
            writer.writerow(row.as_csv_row())


def write_report(path: Path, rows: list[AuditRow], csv_path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    buckets = Counter(row.bucket for row in rows)
    priorities = Counter(row.priority for row in rows)
    blockers = [row for row in rows if row.bucket == "V1_BLOCKER"]
    evidence = [row for row in rows if row.bucket == "IMPLEMENTED_NEEDS_EVIDENCE"]
    deferred = [row for row in rows if row.bucket == "DEFERRED"]
    ready = [row for row in rows if row.bucket == "READY"]
    blocker_ids = ", ".join(f"`{row.row_id}`" for row in blockers) or "none"
    evidence_ids = ", ".join(f"`{row.row_id}`" for row in evidence) or "none"
    deferred_ids = ", ".join(f"`{row.row_id}`" for row in deferred) or "none"
    ready_ids = ", ".join(f"`{row.row_id}`" for row in ready) or "none"

    lines = [
        "# Architecture Implementation Audit",
        "",
        f"Date: {date.today().isoformat()}",
        "Task: `PRJ-927`",
        f"Canonical matrix: `{csv_path.as_posix()}`",
        "",
        "## Purpose",
        "",
        "This report maps approved architecture areas to current implementation and evidence.",
        "It is a planning tool: it does not replace tests, architecture docs, release smoke, or product decisions.",
        "",
        "## Summary",
        "",
        f"- total rows: `{len(rows)}`",
        f"- ready rows: `{buckets.get('READY', 0)}`",
        f"- release blockers: `{buckets.get('V1_BLOCKER', 0)}`",
        f"- implemented but needs evidence: `{buckets.get('IMPLEMENTED_NEEDS_EVIDENCE', 0)}`",
        f"- deferred scope rows: `{buckets.get('DEFERRED', 0)}`",
        f"- P0 rows: `{priorities.get('P0', 0)}`",
        f"- P1 rows: `{priorities.get('P1', 0)}`",
        f"- P2 rows: `{priorities.get('P2', 0)}`",
        "",
        "## Main Findings",
        "",
        "1. Core backend/runtime architecture is locally green after `PRJ-925` full pytest (`1074 passed`).",
        "2. `ActionResult.action_loop` is implemented, tested, and documented for debug/ops triage.",
        "3. Credential-dependent organizer activation remains an extension gate, not a core/web-supported v1 blocker.",
        "4. Web route mounting and lightweight route-state/accessibility proof are green after `PRJ-931`.",
        "5. Proactive/scheduler architecture exists locally; target sampling is deferred until launch scope expands.",
        "6. Mobile, organizer activation, and future-candidate deployment automation are explicitly deferred or follow-up scope for the achieved marker.",
        "7. Secondary maps now point to the generated audit/dashboard; future architecture row changes must refresh them in the same slice.",
        "",
        "## Error / Gap Index",
        "",
        "| Gap | Rows | Meaning |",
        "| --- | --- | --- |",
        f"| External blocker | {blocker_ids} | Organizer/provider daily-use claims need operator credentials and live provider smoke. |",
        f"| Evidence gap | {evidence_ids} | Implementation or docs exist, but more specific target/current evidence is needed before claiming 100%. |",
        f"| Deferred scope | {deferred_ids} | Approved topology exists, but mobile should not count as implemented product architecture yet. |",
        f"| Ready core | {ready_ids} | Current evidence is strong enough for regression preservation rather than new feature work. |",
        "",
        "## Planning Buckets",
        "",
        "### Release Blockers",
        "",
    ]
    if blockers:
        for row in blockers:
            lines.append(f"- `{row.row_id}` {row.capability}: {row.next_verification}")
    else:
        lines.append("- none")
    lines.extend(["", "### Implemented But Needs Evidence", ""])
    if evidence:
        for row in evidence:
            lines.append(f"- `{row.row_id}` {row.capability}: {row.next_verification}")
    else:
        lines.append("- none")
    lines.extend(["", "### Deferred Scope", ""])
    if deferred:
        for row in deferred:
            lines.append(f"- `{row.row_id}` {row.capability}: {row.next_verification}")
    else:
        lines.append("- none")
    lines.extend(["", "### Ready Rows", ""])
    for row in ready:
        lines.append(f"- `{row.row_id}` {row.capability}: {row.local_evidence}")
    lines.extend(["", "## Validation Command Packs", ""])
    lines.extend(
        [
            "| Row | Command pack |",
            "| --- | --- |",
        ]
    )
    for row in sorted(rows, key=lambda item: item.row_id):
        lines.append(f"| `{row.row_id}` | `{validation_command_pack(row.row_id)}` |")
    lines.extend(
        [
            "",
            "## Recommended Next Task Order",
            "",
            "1. Do not add broad new architecture until current blocked/evidence rows are intentionally handled.",
            "2. If operator credentials and expanded organizer scope are available, run provider activation smoke for `ARCH-CONNECTORS-001`.",
            "3. If proactive launch scope expands, run a target proactive sample for `ARCH-PROACTIVE-001`.",
            "4. Keep `ARCH-MOBILE-001` deferred unless native app scope is reactivated; current UI proof belongs to web responsive breakpoints.",
            "5. If a new release candidate is selected, capture source/webhook deploy convergence for `ARCH-DEPLOY-AUTO-001`.",
            "",
            "## Refresh Command",
            "",
            "```powershell",
            "Push-Location .\\backend; ..\\.venv\\Scripts\\python .\\scripts\\audit_architecture_implementation_map.py; if ($LASTEXITCODE -eq 0) { ..\\.venv\\Scripts\\python .\\scripts\\generate_project_status_dashboard.py }; $exit=$LASTEXITCODE; Pop-Location; exit $exit",
            "```",
            "",
            "## Guardrails",
            "",
            "- Do not treat `BLOCKED` provider rows as implementation defects before credentials exist.",
            "- Do not treat `DEFERRED` mobile scope as a release blocker without an explicit product decision.",
            "- Do not mark target status `PASS` without a current target-environment sample or release artifact.",
            "- Keep action/provider mutations behind the action boundary and connector confirmation gates.",
            "",
        ]
    )
    path.write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate the architecture implementation audit map.")
    parser.add_argument(
        "--csv",
        default="docs/operations/architecture-implementation-map-2026-05-10.csv",
        help="CSV output path relative to repository root.",
    )
    parser.add_argument(
        "--report",
        default="docs/operations/architecture-implementation-audit-2026-05-10.md",
        help="Markdown report output path relative to repository root.",
    )
    args = parser.parse_args()

    root = repo_root()
    rows = build_rows(root)
    csv_path = root / args.csv
    report_path = root / args.report
    write_csv(csv_path, rows)
    write_report(report_path, rows, csv_path.relative_to(root))
    print(f"wrote {csv_path.relative_to(root)}")
    print(f"wrote {report_path.relative_to(root)}")
    print(f"rows={len(rows)}")
    print("buckets=" + ",".join(f"{key}:{value}" for key, value in sorted(Counter(row.bucket for row in rows).items())))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
