from __future__ import annotations


def connector_read_baseline_snapshot() -> dict[str, object]:
    return {
        "policy_owner": "connector_read_execution_baseline",
        "selected_live_read_path": {
            "connector_kind": "task_system",
            "provider": "clickup",
            "operation": "list_tasks",
            "execution_mode": "provider_backed_next",
            "why_selected": "extends_existing_clickup_owner_without_expanding_calendar_or_drive_read_scope",
        },
        "deferred_families": {
            "calendar": "policy_only_until_read_posture_and_time-boundary_contracts_are_explicit",
            "cloud_drive": "policy_only_until_document_scope_and_safe-read summarization boundary are explicit",
        },
        "current_live_mutation_path": {
            "connector_kind": "task_system",
            "provider": "clickup",
            "operation": "create_task",
        },
    }
