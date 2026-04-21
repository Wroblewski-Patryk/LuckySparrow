param(
    [Parameter(Mandatory = $true)][string]$WebhookUrl,
    [Parameter(Mandatory = $true)][string]$WebhookSecret,
    [string]$Repository = "",
    [string]$Branch = "main",
    [string]$BeforeSha = "",
    [string]$AfterSha = "",
    [string]$PusherName = "codex",
    [string]$EvidencePath = ""
)

$ErrorActionPreference = "Stop"

if (Test-Path ".\.venv\Scripts\python.exe") {
    $pythonExe = ".\.venv\Scripts\python.exe"
}
elseif (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonExe = "python"
}
else {
    throw "Python executable not found. Install Python or activate .venv."
}

$args = @(
    ".\scripts\trigger_coolify_deploy_webhook.py",
    "--webhook-url", $WebhookUrl,
    "--webhook-secret", $WebhookSecret,
    "--repository", $Repository,
    "--branch", $Branch,
    "--before-sha", $BeforeSha,
    "--after-sha", $AfterSha,
    "--pusher-name", $PusherName
)

if ($EvidencePath) {
    $args += @("--evidence-path", $EvidencePath)
}

& $pythonExe @args
