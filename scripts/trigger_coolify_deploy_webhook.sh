#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <webhook_url> <webhook_secret> [repository] [branch] [before_sha] [after_sha] [pusher_name] [evidence_path]" >&2
  exit 1
fi

WEBHOOK_URL="$1"
WEBHOOK_SECRET="$2"
REPOSITORY="${3:-}"
BRANCH="${4:-main}"
BEFORE_SHA="${5:-}"
AFTER_SHA="${6:-}"
PUSHER_NAME="${7:-codex}"
EVIDENCE_PATH="${8:-}"

if [[ -x "./.venv/bin/python" ]]; then
  PYTHON_BIN="./.venv/bin/python"
elif [[ -x "./.venv/Scripts/python" ]]; then
  PYTHON_BIN="./.venv/Scripts/python"
else
  PYTHON_BIN="python3"
fi

ARGS=(
  "./scripts/trigger_coolify_deploy_webhook.py"
  "--webhook-url" "$WEBHOOK_URL"
  "--webhook-secret" "$WEBHOOK_SECRET"
  "--repository" "$REPOSITORY"
  "--branch" "$BRANCH"
  "--before-sha" "$BEFORE_SHA"
  "--after-sha" "$AFTER_SHA"
  "--pusher-name" "$PUSHER_NAME"
)

if [[ -n "$EVIDENCE_PATH" ]]; then
  ARGS+=("--evidence-path" "$EVIDENCE_PATH")
fi

"$PYTHON_BIN" "${ARGS[@]}"
