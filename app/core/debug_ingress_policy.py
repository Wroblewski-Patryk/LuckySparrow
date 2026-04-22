from __future__ import annotations


DEBUG_INTERNAL_ADMIN_INGRESS_PATH = "/internal/event/debug"
DEBUG_SHARED_COMPAT_INGRESS_PATH = "/event/debug"
DEBUG_QUERY_COMPAT_INGRESS_PATH = "/event?debug=true"


def debug_ingress_policy_snapshot() -> dict[str, object]:
    return {
        "policy_owner": "dedicated_admin_debug_ingress_policy",
        "target_admin_ingress_kind": "dedicated_internal_admin_route",
        "target_admin_ingress_path": DEBUG_INTERNAL_ADMIN_INGRESS_PATH,
        "shared_compat_ingress_path": DEBUG_SHARED_COMPAT_INGRESS_PATH,
        "query_compat_ingress_path": DEBUG_QUERY_COMPAT_INGRESS_PATH,
        "shared_compat_retirement_target": "break_glass_only_then_remove_from_normal_operator_flows",
        "shared_compat_retirement_blockers": [
            "shared_clients_still_depend_on_compat_route",
            "release_smoke_not_green_for_dedicated_admin_path",
            "rollback_notes_missing_for_break_glass_posture",
        ],
        "shared_compatibility_posture": "rollback_safe_compatibility_only",
        "operator_default": "use_dedicated_admin_ingress",
        "break_glass_header": "X-AION-Debug-Break-Glass",
    }
