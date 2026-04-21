from __future__ import annotations


def deployment_policy_snapshot() -> dict[str, object]:
    return {
        "policy_owner": "deployment_standard_and_release_reliability",
        "hosting_baseline": "coolify_medium_term_standard",
        "hosting_transition_state": "not_scheduled",
        "deployment_trigger_slo": {
            "delivery_success_rate_percent": 99.0,
            "manual_redeploy_exception_rate_percent": 5.0,
            "evidence_owner": "coolify_webhook_plus_release_smoke",
        },
        "rollback_posture": "release_smoke_failure_blocks_completion_and_keeps_manual_rollback_available",
    }
