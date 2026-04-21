from __future__ import annotations

import importlib.util
import sys
from argparse import Namespace
from pathlib import Path


SCRIPT_PATH = Path(__file__).resolve().parents[1] / "scripts" / "run_behavior_validation.py"
SPEC = importlib.util.spec_from_file_location("run_behavior_validation_script", SCRIPT_PATH)
assert SPEC is not None and SPEC.loader is not None
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


def _summary(*, total: int, passed: int, failed: int, errors: int, skipped: int, exit_code: int) -> dict[str, int]:
    return {
        "total": total,
        "passed": passed,
        "failed": failed,
        "errors": errors,
        "skipped": skipped,
        "exit_code": exit_code,
    }


def test_ci_gate_fails_when_no_tests_collected_and_tests_are_required() -> None:
    status, violations = MODULE._evaluate_gate(
        gate_mode="ci",
        summary=_summary(total=0, passed=0, failed=0, errors=0, skipped=0, exit_code=0),
        ci_require_tests=True,
    )

    assert status == "fail"
    assert violations == ["no_behavior_validation_tests_collected"]


def test_ci_gate_allows_empty_collection_when_requirement_is_disabled() -> None:
    status, violations = MODULE._evaluate_gate(
        gate_mode="ci",
        summary=_summary(total=0, passed=0, failed=0, errors=0, skipped=0, exit_code=0),
        ci_require_tests=False,
    )

    assert status == "pass"
    assert violations == []


def test_operator_gate_tracks_pytest_exit_only() -> None:
    status, violations = MODULE._evaluate_gate(
        gate_mode="operator",
        summary=_summary(total=0, passed=0, failed=0, errors=0, skipped=0, exit_code=1),
        ci_require_tests=True,
    )

    assert status == "fail"
    assert violations == ["pytest_exit_code_non_zero:1"]


def test_main_includes_gate_payload_and_returns_ci_failure_on_gate_violation(
    monkeypatch,
    tmp_path: Path,
) -> None:
    artifact_path = tmp_path / "behavior-report.json"

    monkeypatch.setattr(
        MODULE,
        "_parse_args",
        lambda: Namespace(
            python_exe="python",
            artifact_path=str(artifact_path),
            print_artifact_json=False,
            gate_mode="ci",
            ci_require_tests=True,
        ),
    )
    monkeypatch.setattr(MODULE, "_run_behavior_pytest", lambda **_: (0, ["python", "-m", "pytest"]))
    monkeypatch.setattr(MODULE, "_parse_junit_results", lambda **_: [])

    exit_code = MODULE.main()

    payload = MODULE.json.loads(artifact_path.read_text(encoding="utf-8"))
    assert exit_code == 1
    assert payload["summary"]["exit_code"] == 0
    assert payload["gate"]["mode"] == "ci"
    assert payload["gate"]["status"] == "fail"
    assert payload["gate"]["violations"] == ["no_behavior_validation_tests_collected"]
    assert payload["gate"]["ci_require_tests"] is True


def test_main_includes_gate_payload_and_keeps_operator_mode_exit_code(
    monkeypatch,
    tmp_path: Path,
) -> None:
    artifact_path = tmp_path / "behavior-report.json"

    monkeypatch.setattr(
        MODULE,
        "_parse_args",
        lambda: Namespace(
            python_exe="python",
            artifact_path=str(artifact_path),
            print_artifact_json=False,
            gate_mode="operator",
            ci_require_tests=True,
        ),
    )
    monkeypatch.setattr(MODULE, "_run_behavior_pytest", lambda **_: (0, ["python", "-m", "pytest"]))
    monkeypatch.setattr(MODULE, "_parse_junit_results", lambda **_: [])

    exit_code = MODULE.main()

    payload = MODULE.json.loads(artifact_path.read_text(encoding="utf-8"))
    assert exit_code == 0
    assert payload["gate"]["mode"] == "operator"
    assert payload["gate"]["status"] == "pass"
    assert payload["gate"]["violations"] == []
    assert payload["gate"]["ci_require_tests"] is True
