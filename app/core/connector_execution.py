def clickup_task_create_ready(settings) -> bool:
    api_token = str(getattr(settings, "clickup_api_token", "") or "").strip()
    list_id = str(getattr(settings, "clickup_list_id", "") or "").strip()
    return bool(api_token and list_id)


def google_calendar_read_ready(settings) -> bool:
    access_token = str(getattr(settings, "google_calendar_access_token", "") or "").strip()
    calendar_id = str(getattr(settings, "google_calendar_calendar_id", "") or "").strip()
    return bool(access_token and calendar_id)


def connector_execution_baseline_snapshot(settings) -> dict[str, object]:
    clickup_ready = clickup_task_create_ready(settings)
    clickup_state = "provider_backed_ready" if clickup_ready else "credentials_missing"
    clickup_hint = (
        "clickup_create_task_live"
        if clickup_ready
        else "configure_clickup_api_token_and_clickup_list_id_for_live_execution"
    )
    google_calendar_ready = google_calendar_read_ready(settings)
    google_calendar_state = (
        "provider_backed_ready" if google_calendar_ready else "credentials_missing"
    )
    google_calendar_hint = (
        "google_calendar_read_availability_live"
        if google_calendar_ready
        else "configure_google_calendar_access_token_and_google_calendar_calendar_id_for_live_read_execution"
    )
    return {
        "execution_owner": "connector_execution_registry",
        "mvp_boundary": "clickup_task_create_and_list_plus_google_calendar_read_availability_first_live_paths",
        "task_system": {
            "read_capable_live_paths": ["clickup_list_tasks"],
            "mutation_live_paths": ["clickup_create_task"],
            "clickup_create_task": {
                "operation": "create_task",
                "provider": "clickup",
                "execution_mode": "provider_backed_when_configured",
                "ready": clickup_ready,
                "state": clickup_state,
                "hint": clickup_hint,
            },
            "clickup_list_tasks": {
                "operation": "list_tasks",
                "provider": "clickup",
                "execution_mode": "provider_backed_when_configured",
                "ready": clickup_ready,
                "state": clickup_state,
                "hint": (
                    "clickup_list_tasks_live"
                    if clickup_ready
                    else "configure_clickup_api_token_and_clickup_list_id_for_live_read_execution"
                ),
            },
            "other_operations": "policy_only_until_pre_action_read_and_additional_provider_paths_exist",
        },
        "calendar": {
            "read_capable_live_paths": ["google_calendar_read_availability"],
            "mutation_live_paths": [],
            "google_calendar_read_availability": {
                "operation": "read_availability",
                "provider": "google_calendar",
                "execution_mode": "provider_backed_when_configured",
                "ready": google_calendar_ready,
                "state": google_calendar_state,
                "hint": google_calendar_hint,
            },
            "other_operations": "policy_only_until_additional_calendar_read_or_mutation_paths_exist",
        },
        "cloud_drive": {
            "execution_mode": "policy_only",
            "hint": "drive_execution_remains_permission_gated_without_provider_adapter",
        },
    }
