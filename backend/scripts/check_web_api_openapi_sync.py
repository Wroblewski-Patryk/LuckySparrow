from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any


REQUEST_JSON_PATTERN = re.compile(
    r'requestJson(?:<[^>]+>)?\(\s*"(?P<path>/[^"]+)"\s*,\s*\{\s*method:\s*"(?P<method>[A-Z]+)"',
    re.MULTILINE,
)


def extract_web_api_calls(source: str) -> list[dict[str, str]]:
    calls: list[dict[str, str]] = []
    seen: set[tuple[str, str]] = set()
    for match in REQUEST_JSON_PATTERN.finditer(source):
        method = match.group("method").upper()
        path = match.group("path")
        key = (method, path)
        if key in seen:
            continue
        seen.add(key)
        calls.append({"method": method, "path": path})
    return calls


def load_openapi_operations(path: Path) -> set[tuple[str, str]]:
    schema = json.loads(path.read_text(encoding="utf-8"))
    paths = schema.get("paths")
    if not isinstance(paths, dict):
        raise ValueError("OpenAPI schema does not contain an object-valued 'paths' section.")
    operations: set[tuple[str, str]] = set()
    for route_path, methods in paths.items():
        if not isinstance(methods, dict):
            continue
        for method in methods:
            normalized_method = str(method).upper()
            if normalized_method in {"GET", "POST", "PUT", "PATCH", "DELETE"}:
                operations.add((normalized_method, str(route_path)))
    return operations


def check_sync(*, openapi_path: Path, web_api_path: Path) -> dict[str, Any]:
    calls = extract_web_api_calls(web_api_path.read_text(encoding="utf-8"))
    operations = load_openapi_operations(openapi_path)
    missing = [
        call
        for call in calls
        if (call["method"], call["path"]) not in operations
    ]
    return {
        "kind": "web_api_openapi_sync_report",
        "schema_version": 1,
        "openapi_path": str(openapi_path),
        "web_api_path": str(web_api_path),
        "web_call_count": len(calls),
        "openapi_operation_count": len(operations),
        "missing_operations": missing,
        "status": "ok" if not missing else "drift",
    }


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Check that web/src/lib/api.ts only calls endpoints present in generated OpenAPI.",
    )
    parser.add_argument("--openapi", default="../docs/api/openapi.json")
    parser.add_argument("--web-api", default="../web/src/lib/api.ts")
    parser.add_argument("--print-json", action="store_true")
    return parser.parse_args()


def main() -> int:
    args = _parse_args()
    report = check_sync(openapi_path=Path(str(args.openapi)), web_api_path=Path(str(args.web_api)))
    if args.print_json:
        print(json.dumps(report, indent=2, sort_keys=True))
    elif report["status"] != "ok":
        print(json.dumps(report, indent=2, sort_keys=True))
    return 0 if report["status"] == "ok" else 1


if __name__ == "__main__":
    raise SystemExit(main())
