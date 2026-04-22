def web_knowledge_tooling_snapshot() -> dict[str, object]:
    return {
        "policy_owner": "web_knowledge_tooling_policy",
        "tool_boundary": "action_owned_external_capability",
        "skill_execution_boundary": "metadata_only_capability_hints",
        "provider_execution_posture": "first_bounded_provider_slices_selected",
        "fallback_posture": "respond_without_external_tool_execution",
        "knowledge_search": {
            "capability_kind": "knowledge_search",
            "selected_provider_hint": "duckduckgo_html",
            "authorized_operations": ["search_web", "suggest_search"],
            "execution_mode": "provider_backed_without_credentials",
            "state": "provider_backed_ready",
            "hint": "duckduckgo_html_search_live",
        },
        "web_browser": {
            "capability_kind": "web_browser",
            "selected_provider_hint": "generic_http",
            "authorized_operations": ["read_page", "suggest_page_review"],
            "execution_mode": "provider_backed_without_credentials",
            "state": "provider_backed_ready",
            "hint": "generic_http_read_page_live",
        },
    }
