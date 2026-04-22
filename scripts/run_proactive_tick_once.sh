#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
"${SCRIPT_DIR}/../.venv/Scripts/python.exe" "${SCRIPT_DIR}/run_proactive_tick_once.py" "$@"
