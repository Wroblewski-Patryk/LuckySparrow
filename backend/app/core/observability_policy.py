from __future__ import annotations

from datetime import datetime, timezone

OBSERVABILITY_EXPORT_POLICY_OWNER = "incident_evidence_export_policy"

REQUIRED_INCIDENT_EVIDENCE_FIELDS = (
    "trace_id",
    "event_id",
    "duration_ms",
    "stage_timings_ms",
)

REQUIRED_POLICY_POSTURE_SURFACES = (
    "runtime_policy",
    "memory_retrieval",
    "learned_state",
    "v1_readiness",
    "deployment",
    "attention",
    "runtime_topology.attention_switch",
    "proactive",
    "scheduler.external_owner_policy",
    "reflection.supervision",
    "connectors.execution_baseline",
    "connectors.organizer_tool_stack",
    "connectors.web_knowledge_tools",
    "conversation_channels.telegram",
)

INCIDENT_EVIDENCE_SCHEMA_VERSION = "1.0.0"
INCIDENT_EVIDENCE_BUNDLE_SCHEMA_VERSION = "1.0.0"
INCIDENT_EVIDENCE_BUNDLE_ENTRYPOINT_PATH = "scripts/export_incident_evidence_bundle.py"
REQUIRED_INCIDENT_EVIDENCE_BUNDLE_FILES = (
    "manifest.json",
    "incident_evidence.json",
    "health_snapshot.json",
)
OPTIONAL_INCIDENT_EVIDENCE_BUNDLE_FILES = (
    "behavior_validation_report.json",
)


def observability_export_policy_snapshot(
    *,
    structured_logs_available: bool,
    health_surface_available: bool,
    system_debug_available: bool,
    export_artifact_available: bool,
    bundle_helper_available: bool = False,
) -> dict[str, object]:
    local_surfaces: list[str] = []
    if structured_logs_available:
        local_surfaces.append("structured_runtime_logs")
    if health_surface_available:
        local_surfaces.append("health_policy_surfaces")
    if system_debug_available:
        local_surfaces.append("system_debug_runtime_payload")

    if export_artifact_available:
        export_state = "machine_readable_export_available"
        export_hint = "exportable_incident_evidence_ready"
        missing_capabilities: list[str] = []
    else:
        export_state = "local_only_surfaces_pending_export_artifact"
        export_hint = "implement_machine_readable_incident_evidence_export"
        missing_capabilities = [
            "machine_readable_incident_evidence_artifact",
            "machine_readable_release_evidence_attachment",
        ]

    return {
        "policy_owner": OBSERVABILITY_EXPORT_POLICY_OWNER,
        "incident_evidence_contract_version": 1,
        "incident_evidence_bundle_contract_version": 1,
        "required_incident_evidence_fields": list(REQUIRED_INCIDENT_EVIDENCE_FIELDS),
        "required_policy_posture_surfaces": list(REQUIRED_POLICY_POSTURE_SURFACES),
        "required_bundle_files": list(REQUIRED_INCIDENT_EVIDENCE_BUNDLE_FILES),
        "optional_bundle_files": list(OPTIONAL_INCIDENT_EVIDENCE_BUNDLE_FILES),
        "bundle_entrypoint_path": INCIDENT_EVIDENCE_BUNDLE_ENTRYPOINT_PATH,
        "bundle_helper_available": bundle_helper_available,
        "local_surfaces": local_surfaces,
        "export_artifact_available": export_artifact_available,
        "incident_export_ready": export_artifact_available,
        "incident_export_state": export_state,
        "incident_export_hint": export_hint,
        "missing_export_capabilities": missing_capabilities,
    }


def build_runtime_incident_evidence(
    *,
    trace_id: str,
    event_id: str,
    source: str,
    duration_ms: int,
    stage_timings_ms: dict[str, int],
    runtime_policy: dict[str, object],
    memory_retrieval: dict[str, object],
    learned_state: dict[str, object],
    v1_readiness: dict[str, object],
    deployment: dict[str, object],
    attention: dict[str, object],
    runtime_topology_attention_switch: dict[str, object],
    proactive: dict[str, object],
    scheduler_external_owner_policy: dict[str, object],
    reflection_supervision: dict[str, object],
    connectors_execution_baseline: dict[str, object],
    connectors_organizer_tool_stack: dict[str, object],
    connectors_web_knowledge_tools: dict[str, object],
    telegram_conversation_channel: dict[str, object],
) -> dict[str, object]:
    policy_posture = {
        "runtime_policy": dict(runtime_policy),
        "memory_retrieval": dict(memory_retrieval),
        "learned_state": dict(learned_state),
        "v1_readiness": dict(v1_readiness),
        "deployment": dict(deployment),
        "attention": dict(attention),
        "runtime_topology.attention_switch": dict(runtime_topology_attention_switch),
        "proactive": dict(proactive),
        "scheduler.external_owner_policy": dict(scheduler_external_owner_policy),
        "reflection.supervision": dict(reflection_supervision),
        "connectors.execution_baseline": dict(connectors_execution_baseline),
        "connectors.organizer_tool_stack": dict(connectors_organizer_tool_stack),
        "connectors.web_knowledge_tools": dict(connectors_web_knowledge_tools),
        "conversation_channels.telegram": dict(telegram_conversation_channel),
    }
    present_surface_names = [name for name, value in policy_posture.items() if value]
    missing_surface_names = [
        name
        for name in REQUIRED_POLICY_POSTURE_SURFACES
        if not policy_posture.get(name)
    ]
    return {
        "kind": "runtime_incident_evidence",
        "schema_version": INCIDENT_EVIDENCE_SCHEMA_VERSION,
        "policy_owner": OBSERVABILITY_EXPORT_POLICY_OWNER,
        "trace_id": trace_id,
        "event_id": event_id,
        "source": source,
        "duration_ms": int(duration_ms),
        "stage_timings_ms": {str(key): int(value) for key, value in stage_timings_ms.items()},
        "required_incident_evidence_fields": list(REQUIRED_INCIDENT_EVIDENCE_FIELDS),
        "required_policy_posture_surfaces": list(REQUIRED_POLICY_POSTURE_SURFACES),
        "policy_surface_coverage": {
            "present": present_surface_names,
            "missing": missing_surface_names,
            "complete": len(missing_surface_names) == 0,
        },
        "policy_posture": policy_posture,
    }


def build_runtime_incident_evidence_from_health_snapshot(
    *,
    health_snapshot: dict[str, object],
    trace_id: str,
    event_id: str,
    source: str = "health_snapshot",
) -> dict[str, object]:
    connectors = health_snapshot.get("connectors", {})
    if not isinstance(connectors, dict):
        connectors = {}
    runtime_topology = health_snapshot.get("runtime_topology", {})
    if not isinstance(runtime_topology, dict):
        runtime_topology = {}
    scheduler = health_snapshot.get("scheduler", {})
    if not isinstance(scheduler, dict):
        scheduler = {}
    reflection = health_snapshot.get("reflection", {})
    if not isinstance(reflection, dict):
        reflection = {}
    conversation_channels = health_snapshot.get("conversation_channels", {})
    if not isinstance(conversation_channels, dict):
        conversation_channels = {}

    evidence = build_runtime_incident_evidence(
        trace_id=trace_id,
        event_id=event_id,
        source=source,
        duration_ms=0,
        stage_timings_ms={
            "health_snapshot": 0,
            "incident_evidence_export": 0,
            "total": 0,
        },
        runtime_policy=_dict_section(health_snapshot, "runtime_policy"),
        memory_retrieval=_dict_section(health_snapshot, "memory_retrieval"),
        learned_state=_dict_section(health_snapshot, "learned_state"),
        v1_readiness=_dict_section(health_snapshot, "v1_readiness"),
        deployment=_dict_section(health_snapshot, "deployment"),
        attention=_dict_section(health_snapshot, "attention"),
        runtime_topology_attention_switch=_dict_section(runtime_topology, "attention_switch"),
        proactive=_dict_section(health_snapshot, "proactive"),
        scheduler_external_owner_policy=_dict_section(scheduler, "external_owner_policy"),
        reflection_supervision=_dict_section(reflection, "supervision"),
        connectors_execution_baseline=_dict_section(connectors, "execution_baseline"),
        connectors_organizer_tool_stack=_dict_section(connectors, "organizer_tool_stack"),
        connectors_web_knowledge_tools=_dict_section(connectors, "web_knowledge_tools"),
        telegram_conversation_channel=_dict_section(conversation_channels, "telegram"),
    )
    evidence["capture_source"] = "health_snapshot_strict_mode"
    evidence["debug_payload_included"] = False
    return evidence


def _dict_section(payload: dict[str, object], key: str) -> dict[str, object]:
    value = payload.get(key)
    if isinstance(value, dict):
        return dict(value)
    return {}


def format_incident_bundle_directory_name(
    *,
    captured_at: datetime,
    trace_id: str,
    event_id: str,
) -> str:
    timestamp = captured_at.astimezone(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    preferred_id = str(trace_id or "").strip() or str(event_id or "").strip() or "bundle"
    safe_id = "".join(char if char.isalnum() or char in {"-", "_"} else "_" for char in preferred_id)
    return f"{timestamp}_{safe_id}"


def build_incident_evidence_bundle_manifest(
    *,
    base_url: str,
    capture_mode: str,
    trace_id: str,
    event_id: str,
    source: str,
    captured_at: datetime | None = None,
    attached_behavior_report: bool = False,
) -> dict[str, object]:
    captured_at_utc = (captured_at or datetime.now(timezone.utc)).astimezone(timezone.utc)
    files: dict[str, str] = {
        "manifest": "manifest.json",
        "incident_evidence": "incident_evidence.json",
        "health_snapshot": "health_snapshot.json",
    }
    if attached_behavior_report:
        files["behavior_validation_report"] = "behavior_validation_report.json"
    return {
        "kind": "incident_evidence_bundle_manifest",
        "schema_version": INCIDENT_EVIDENCE_BUNDLE_SCHEMA_VERSION,
        "policy_owner": OBSERVABILITY_EXPORT_POLICY_OWNER,
        "captured_at": captured_at_utc.isoformat(),
        "capture_mode": capture_mode,
        "base_url": base_url.rstrip("/"),
        "trace_id": trace_id,
        "event_id": event_id,
        "source": source,
        "required_bundle_files": list(REQUIRED_INCIDENT_EVIDENCE_BUNDLE_FILES),
        "optional_bundle_files": list(OPTIONAL_INCIDENT_EVIDENCE_BUNDLE_FILES),
        "files": files,
        "retention_baseline": {
            "keep_latest_successful_release_bundle": True,
            "keep_latest_failed_release_or_incident_bundle": True,
            "keep_active_incident_bundles_until_closure": True,
        },
    }
