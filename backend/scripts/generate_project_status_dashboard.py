from __future__ import annotations

import argparse
import csv
import json
from collections import Counter
from datetime import date
from pathlib import Path
from typing import Any


DEFAULT_MATRIX = "docs/operations/architecture-implementation-map-2026-05-10.csv"
DEFAULT_MARKDOWN = "docs/operations/project-status-dashboard.md"
DEFAULT_JSON = "docs/operations/project-status-dashboard.json"
PREFERRED_NEXT_ORDER = {
    "ARCH-CONNECTORS-001": 0,
    "ARCH-TEST-EVIDENCE-001": 1,
    "ARCH-WEB-UX-001": 2,
    "ARCH-DOC-MAPS-001": 3,
    "ARCH-PROACTIVE-001": 4,
    "ARCH-DEPLOY-AUTO-001": 5,
    "ARCH-MOBILE-001": 6,
}


def repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def read_rows(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle))


def row_id(row: dict[str, str]) -> str:
    return str(row.get("ID", "")).strip()


def bucket(row: dict[str, str]) -> str:
    return str(row.get("Readiness bucket", "")).strip() or "UNKNOWN"


def priority(row: dict[str, str]) -> str:
    return str(row.get("Priority", "")).strip() or "P?"


def current_phase(rows: list[dict[str, str]]) -> str:
    counts = Counter(bucket(row) for row in rows)
    if counts.get("V1_BLOCKER", 0):
        return "architecture evidence hardening with external blocker"
    if counts.get("IMPLEMENTED_NEEDS_EVIDENCE", 0):
        return "architecture evidence hardening"
    if counts.get("IMPLEMENTED_NOT_VERIFIED", 0):
        return "architecture evidence hardening"
    if counts.get("DEFERRED", 0):
        return "architecture complete for selected scope with deferred extensions"
    return "architecture implementation ready for release preservation"


def completion(rows: list[dict[str, str]]) -> dict[str, Any]:
    total = len(rows)
    ready = sum(1 for row in rows if bucket(row) == "READY")
    selected_scope_total = sum(1 for row in rows if bucket(row) != "DEFERRED")
    selected_scope_ready = sum(1 for row in rows if bucket(row) == "READY")
    return {
        "total_rows": total,
        "ready_rows": ready,
        "all_scope_ready_percent": round((ready / total) * 100, 1) if total else 0.0,
        "selected_scope_rows": selected_scope_total,
        "selected_scope_ready_rows": selected_scope_ready,
        "selected_scope_ready_percent": round((selected_scope_ready / selected_scope_total) * 100, 1)
        if selected_scope_total
        else 0.0,
    }


def group_rows(rows: list[dict[str, str]]) -> dict[str, list[dict[str, str]]]:
    groups: dict[str, list[dict[str, str]]] = {}
    for row in rows:
        groups.setdefault(bucket(row), []).append(row)
    for items in groups.values():
        items.sort(key=lambda item: (priority(item), row_id(item)))
    return groups


def next_actions(rows: list[dict[str, str]]) -> list[dict[str, str]]:
    priority_order = {
        "V1_BLOCKER": 0,
        "REQUIRES_IMPLEMENTATION_REVIEW": 1,
        "IMPLEMENTED_NEEDS_EVIDENCE": 2,
        "IMPLEMENTED_NOT_VERIFIED": 3,
        "DEFERRED": 4,
        "READY": 9,
    }
    candidates = [row for row in rows if bucket(row) != "READY"]
    candidates.sort(
        key=lambda item: (
            priority_order.get(bucket(item), 8),
            PREFERRED_NEXT_ORDER.get(row_id(item), 50),
            priority(item),
            row_id(item),
        )
    )
    return candidates[:5]


def next_without_external_inputs(rows: list[dict[str, str]]) -> dict[str, str] | None:
    for preferred_id in ("ARCH-TEST-EVIDENCE-001", "ARCH-WEB-UX-001", "ARCH-DOC-MAPS-001"):
        for row in rows:
            if row_id(row) == preferred_id and bucket(row) != "READY":
                return row
    return None


def slim_row(row: dict[str, str]) -> dict[str, str]:
    return {
        "id": row_id(row),
        "module": row.get("Module", ""),
        "capability": row.get("Capability", ""),
        "bucket": bucket(row),
        "priority": priority(row),
        "owner": row.get("Owner", ""),
        "next_verification": row.get("Next verification", ""),
        "validation_command_pack": row.get("Validation command pack", ""),
        "risk": row.get("Risk", ""),
    }


def build_status(rows: list[dict[str, str]], matrix_path: Path) -> dict[str, Any]:
    counts = Counter(bucket(row) for row in rows)
    priority_counts = Counter(priority(row) for row in rows)
    groups = group_rows(rows)
    return {
        "date": date.today().isoformat(),
        "phase": current_phase(rows),
        "canonical_matrix": matrix_path.as_posix(),
        "completion": completion(rows),
        "bucket_counts": dict(sorted(counts.items())),
        "priority_counts": dict(sorted(priority_counts.items())),
        "next_actions": [slim_row(row) for row in next_actions(rows)],
        "next_without_external_inputs": (
            slim_row(next_without_external_inputs(rows)) if next_without_external_inputs(rows) is not None else None
        ),
        "blockers": [slim_row(row) for row in groups.get("V1_BLOCKER", [])],
        "evidence_gaps": [slim_row(row) for row in groups.get("IMPLEMENTED_NEEDS_EVIDENCE", [])],
        "deferred_scope": [slim_row(row) for row in groups.get("DEFERRED", [])],
        "ready_core": [slim_row(row) for row in groups.get("READY", [])],
        "definition_of_100_percent": [
            "All selected-scope P0/P1 rows are READY or explicitly deferred/waived.",
            "No V1_BLOCKER rows remain without owner-approved external blocker status.",
            "Implemented-needs-evidence rows have current local or target proof.",
            "Deferred rows have explicit scope decisions and are not silently counted as shipped.",
            "Every meaningful architecture change refreshes this dashboard and its source matrix.",
        ],
    }


def markdown_table(rows: list[dict[str, str]], *, include_command_pack: bool = False) -> list[str]:
    if not rows:
        return ["- none"]
    if include_command_pack:
        lines = [
            "| Row | Bucket | Owner | Next verification | Command pack |",
            "| --- | --- | --- | --- | --- |",
        ]
        for row in rows:
            lines.append(
                f"| `{row['id']}` | `{row['bucket']}` | {row['owner']} | "
                f"{row['next_verification']} | `{row['validation_command_pack']}` |"
            )
        return lines
    lines = ["| Row | Bucket | Owner | Next verification |", "| --- | --- | --- | --- |"]
    for row in rows:
        lines.append(
            f"| `{row['id']}` | `{row['bucket']}` | {row['owner']} | {row['next_verification']} |"
        )
    return lines


def write_markdown(path: Path, status: dict[str, Any]) -> None:
    completion_data = status["completion"]
    lines = [
        "# Project Status Dashboard",
        "",
        f"Last updated: {status['date']}",
        "",
        "## Current Moment",
        "",
        f"- phase: `{status['phase']}`",
        f"- canonical matrix: `{status['canonical_matrix']}`",
        f"- selected-scope readiness: `{completion_data['selected_scope_ready_rows']}/{completion_data['selected_scope_rows']}` rows (`{completion_data['selected_scope_ready_percent']}%`)",
        f"- all-scope readiness: `{completion_data['ready_rows']}/{completion_data['total_rows']}` rows (`{completion_data['all_scope_ready_percent']}%`)",
        f"- bucket counts: `{status['bucket_counts']}`",
        "",
        "## What 100% Means",
        "",
    ]
    for item in status["definition_of_100_percent"]:
        lines.append(f"- {item}")
    lines.extend(["", "## Next Actions", ""])
    lines.extend(markdown_table(status["next_actions"]))
    if status["next_without_external_inputs"] is not None:
        row = status["next_without_external_inputs"]
        lines.extend(
            [
                "",
                "## Next Without External Inputs",
                "",
                f"- `{row['id']}` {row['capability']}: {row['next_verification']}",
            ]
        )
    lines.extend(["", "## Active Blockers", ""])
    lines.extend(markdown_table(status["blockers"]))
    lines.extend(["", "## Evidence Gaps", ""])
    lines.extend(markdown_table(status["evidence_gaps"], include_command_pack=True))
    lines.extend(["", "## Deferred Scope", ""])
    lines.extend(markdown_table(status["deferred_scope"]))
    lines.extend(["", "## Ready Core", ""])
    lines.extend(markdown_table(status["ready_core"]))
    lines.extend(
        [
            "",
            "## Refresh Commands",
            "",
            "```powershell",
            "Push-Location .\\backend; ..\\.venv\\Scripts\\python .\\scripts\\audit_architecture_implementation_map.py; if ($LASTEXITCODE -eq 0) { ..\\.venv\\Scripts\\python .\\scripts\\generate_project_status_dashboard.py }; $exit=$LASTEXITCODE; Pop-Location; exit $exit",
            "```",
            "",
            "## Operating Rule",
            "",
            "Use this dashboard to answer where the project is before selecting work. If a relevant row exists, use its row ID in the next task contract.",
            "",
        ]
    )
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines), encoding="utf-8")


def write_json(path: Path, status: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(status, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate the current project status dashboard.")
    parser.add_argument("--matrix", default=DEFAULT_MATRIX, help="Architecture matrix path relative to repo root.")
    parser.add_argument("--markdown", default=DEFAULT_MARKDOWN, help="Markdown output path relative to repo root.")
    parser.add_argument("--json", default=DEFAULT_JSON, help="JSON output path relative to repo root.")
    args = parser.parse_args()

    root = repo_root()
    matrix_path = root / args.matrix
    rows = read_rows(matrix_path)
    status = build_status(rows, matrix_path.relative_to(root))
    write_markdown(root / args.markdown, status)
    write_json(root / args.json, status)
    print(f"wrote {args.markdown}")
    print(f"wrote {args.json}")
    print(f"phase={status['phase']}")
    print(
        "selected_scope_ready="
        f"{status['completion']['selected_scope_ready_rows']}/{status['completion']['selected_scope_rows']}"
    )
    print("next=" + ",".join(row["id"] for row in status["next_actions"]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
