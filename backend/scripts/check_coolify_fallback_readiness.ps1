param(
    [string]$WebhookUrl = $env:COOLIFY_DEPLOY_WEBHOOK_URL,
    [string]$WebhookSecret = $env:COOLIFY_DEPLOY_WEBHOOK_SECRET,
    [string]$Repository = "",
    [string]$Branch = "main",
    [string]$BeforeSha = "",
    [string]$AfterSha = "",
    [string]$Output = "",
    [switch]$PrintJson
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)

if (Test-Path (Join-Path $repoRoot ".venv\Scripts\python.exe")) {
    $pythonExe = Join-Path $repoRoot ".venv\Scripts\python.exe"
}
elseif (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonExe = "python"
}
else {
    throw "Python executable not found. Install Python or activate .venv."
}

$args = @(
    (Join-Path $PSScriptRoot "check_coolify_fallback_readiness.py"),
    "--webhook-url", ([string]$WebhookUrl),
    "--webhook-secret", ([string]$WebhookSecret),
    "--repository", $Repository,
    "--branch", $Branch,
    "--before-sha", $BeforeSha,
    "--after-sha", $AfterSha
)

if ($Output) {
    $args += @("--output", $Output)
}
if ($PrintJson) {
    $args += "--print-json"
}

Push-Location $repoRoot
try {
    & $pythonExe @args
}
finally {
    Pop-Location
}
