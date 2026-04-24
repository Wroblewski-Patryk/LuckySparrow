from __future__ import annotations

from typing import Any, Mapping


V1_READINESS_POLICY_OWNER = "v1_release_readiness_policy"
V1_REQUIRED_BEHAVIOR_SCENARIOS = (
    "T13.1",
    "T14.1",
    "T14.2",
    "T14.3",
    "T15.1",
    "T15.2",
    "T16.1",
    "T16.2",
    "T16.3",
    "T17.1",
    "T17.2",
)
V1_APPROVED_TOOL_SLICES = (
    "knowledge_search.search_web",
    "web_browser.read_page",
    "task_system.clickup_list_tasks",
    "task_system.clickup_update_task",
    "calendar.google_calendar_read_availability",
    "cloud_drive.google_drive_list_files",
)


def v1_readiness_policy_snapshot(
    *,
    telegram_conversation_channel: Mapping[str, Any],
    learned_state: Mapping[str, Any],
    role_skill_policy: Mapping[str, Any],
) -> dict[str, object]:
    telegram_state = str(telegram_conversation_channel.get("round_trip_state", "") or "")
    learned_state_path = str(learned_state.get("internal_inspection_path", "") or "")
    work_partner_state = str(role_skill_policy.get("work_partner_role_state", "available") or "available")
    return {
        "policy_owner": V1_READINESS_POLICY_OWNER,
        "product_stage": "v1_no_ui_life_assistant",
        "acceptance_bundle_owner": "health_plus_incident_evidence_plus_behavior_validation",
        "conversation_surface": "/health.conversation_channels.telegram",
        "conversation_round_trip_state": telegram_state,
        "conversation_gate_state": (
            "conversation_surface_ready"
            if telegram_state in {"provider_backed_ready", "missing_bot_token"}
            else "conversation_surface_invalid"
        ),
        "learned_state_surface": "/health.learned_state",
        "learned_state_internal_path": learned_state_path,
        "learned_state_gate_state": (
            "inspection_surface_ready" if learned_state_path == "/internal/state/inspect" else "inspection_surface_invalid"
        ),
        "approved_tool_slices": list(V1_APPROVED_TOOL_SLICES),
        "approved_tooling_state": "bounded_provider_slices_live",
        "required_behavior_scenarios": list(V1_REQUIRED_BEHAVIOR_SCENARIOS),
        "work_partner_role_state": work_partner_state,
        "work_partner_boundary": str(
            role_skill_policy.get("work_partner_role_boundary", "same_personality_role_not_separate_persona") or ""
        ),
    }
