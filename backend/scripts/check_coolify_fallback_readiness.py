from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

BACKEND_ROOT = Path(__file__).resolve().parents[1]
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from app.core.deployment_policy import deployment_policy_snapshot


def _utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _git_value(*args: str) -> str:
    completed = subprocess.run(
        ["git", *args],
        check=False,
        capture_output=True,
        text=True,
    )
    if completed.returncode != 0:
        return ""
    return completed.stdout.strip()


def _infer_repository(explicit_repository: str) -> str:
    if explicit_repository:
        return explicit_repository
    remote_url = _git_value("config", "--get", "remote.origin.url")
    match = re.search(r"github\.com[:/](.+?)(?:\.git)?$", remote_url)
    return match.group(1) if match is not None else ""


def _resolve_after_sha(explicit_after_sha: str) -> str:
    return explicit_after_sha or _git_value("rev-parse", "HEAD")


def _resolve_before_sha(*, explicit_before_sha: str, after_sha: str) -> str:
    if explicit_before_sha:
        return explicit_before_sha
    if not after_sha:
        return ""
    return _git_value("rev-parse", f"{after_sha}^") or after_sha


def _check_sha(value: str) -> bool:
    return bool(re.fullmatch(r"[0-9a-fA-F]{40}", value))


def _check_webhook_url(value: str) -> tuple[bool, str]:
    if not value:
        return False, "missing"
    parsed = urlparse(value)
    if parsed.scheme != "https":
        return False, "must_use_https"
    if not parsed.netloc:
        return False, "missing_host"
    return True, "ok"


def build_readiness_report(
    *,
    webhook_url: str,
    webhook_secret: str,
    repository: str,
    branch: str,
    before_sha: str,
    after_sha: str,
) -> dict[str, Any]:
    policy = deployment_policy_snapshot()
    canonical_app = policy.get("canonical_coolify_app", {})
    checks: list[dict[str, Any]] = []

    def add_check(name: str, ok: bool, detail: str) -> None:
        checks.append({"name": name, "ok": ok, "detail": detail})

    url_ok, url_detail = _check_webhook_url(webhook_url)
    add_check("webhook_url", url_ok, url_detail)
    add_check("webhook_secret_present", bool(webhook_secret), "present" if webhook_secret else "missing")
    add_check(
        "webhook_secret_length",
        len(webhook_secret) >= 16,
        "at_least_16_chars" if len(webhook_secret) >= 16 else "too_short_or_missing",
    )
    add_check("repository", bool(repository), repository or "missing")
    add_check("branch", bool(branch), branch or "missing")
    add_check("before_sha", _check_sha(before_sha), before_sha or "missing")
    add_check("after_sha", _check_sha(after_sha), after_sha or "missing")
    add_check(
        "canonical_coolify_app",
        bool(canonical_app.get("application_id")),
        str(canonical_app.get("application_id") or "missing"),
    )

    failed_checks = [check for check in checks if not check["ok"]]
    ready = not failed_checks

    return {
        "kind": "coolify_fallback_readiness_report",
        "schema_version": 1,
        "policy_owner": policy.get("deployment_automation_policy_owner"),
        "generated_at": _utc_now_iso(),
        "ready": ready,
        "readiness_state": "ready" if ready else "blocked",
        "checks": checks,
        "failed_checks": failed_checks,
        "secret_redacted": True,
        "trigger_mode": "webhook_manual_fallback",
        "trigger_class": "manual_fallback",
        "canonical_coolify_app": canonical_app,
        "repository": repository,
        "branch": branch,
        "before_sha": before_sha,
        "after_sha": after_sha,
        "evidence_path_hint": "artifacts/deploy/coolify-webhook.json",
        "trigger_command_hint": (
            ".\\backend\\scripts\\trigger_coolify_deploy_webhook.ps1 "
            f"-WebhookUrl \"{webhook_url or '<coolify_webhook_url>'}\" "
            "-WebhookSecret \"<coolify_webhook_secret>\" "
            f"-Repository \"{repository or '<owner/repo>'}\" "
            f"-Branch \"{branch or 'main'}\" "
            f"-BeforeSha \"{before_sha or '<before_sha>'}\" "
            f"-AfterSha \"{after_sha or '<after_sha>'}\" "
            "-EvidencePath \"artifacts/deploy/coolify-webhook.json\""
        ),
        "next_action": (
            "fallback_ready_run_trigger_then_release_smoke"
            if ready
            else "provide_missing_fallback_inputs_before_trigger"
        ),
    }


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Check Coolify fallback deploy webhook readiness without triggering deploy.")
    parser.add_argument("--webhook-url", default=os.environ.get("COOLIFY_DEPLOY_WEBHOOK_URL", ""))
    parser.add_argument("--webhook-secret", default=os.environ.get("COOLIFY_DEPLOY_WEBHOOK_SECRET", ""))
    parser.add_argument("--repository", default="")
    parser.add_argument("--branch", default="main")
    parser.add_argument("--before-sha", default="")
    parser.add_argument("--after-sha", default="")
    parser.add_argument("--output", default="")
    parser.add_argument("--print-json", action="store_true")
    return parser.parse_args()


def main() -> int:
    args = _parse_args()
    after_sha = _resolve_after_sha(str(args.after_sha))
    before_sha = _resolve_before_sha(explicit_before_sha=str(args.before_sha), after_sha=after_sha)
    report = build_readiness_report(
        webhook_url=str(args.webhook_url),
        webhook_secret=str(args.webhook_secret),
        repository=_infer_repository(str(args.repository)),
        branch=str(args.branch),
        before_sha=before_sha,
        after_sha=after_sha,
    )

    if args.output:
        output_path = Path(str(args.output))
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    if args.print_json or not args.output:
        print(json.dumps(report, ensure_ascii=False, indent=2))

    return 0 if report["ready"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
