#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
"${SCRIPT_DIR}/../.venv/Scripts/python.exe" "${SCRIPT_DIR}/run_maintenance_tick_once.py" "$@"
