def web_knowledge_tooling_snapshot() -> dict[str, object]:
    return {
        "policy_owner": "web_knowledge_tooling_policy",
        "tool_boundary": "action_owned_external_capability",
        "skill_execution_boundary": "metadata_only_capability_hints",
        "provider_execution_posture": "policy_only_until_bounded_provider_slice_selected",
        "fallback_posture": "respond_without_external_tool_execution",
        "knowledge_search": {
            "capability_kind": "knowledge_search",
            "selected_provider_hint": "generic",
            "authorized_operations": ["search_web", "suggest_search"],
            "execution_mode": "policy_only",
            "state": "policy_only_no_provider_slice_selected",
            "hint": "freeze_first_provider_backed_search_slice_before_live_execution",
        },
        "web_browser": {
            "capability_kind": "web_browser",
            "selected_provider_hint": "generic",
            "authorized_operations": ["read_page", "suggest_page_review"],
            "execution_mode": "policy_only",
            "state": "policy_only_no_provider_slice_selected",
            "hint": "freeze_first_provider_backed_browser_slice_before_live_execution",
        },
    }
