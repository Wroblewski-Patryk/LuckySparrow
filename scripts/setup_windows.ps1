param(
    [string]$PythonExe = "python"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path ".venv")) {
    & $PythonExe -m venv .venv
}

& .\.venv\Scripts\python -m pip install --upgrade pip
& .\.venv\Scripts\python -m pip install -e ".[dev]"

if (-not (Test-Path ".env")) {
    Copy-Item .env.example .env
}

Write-Host "Windows environment is ready."
Write-Host "1) Fill secrets in .env"
Write-Host "2) Run tests: .\\.venv\\Scripts\\python -m pytest -q"
Write-Host "3) Start stack: docker compose up --build"

