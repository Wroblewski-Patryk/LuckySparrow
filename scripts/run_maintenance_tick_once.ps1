$pythonExe = Join-Path $PSScriptRoot "..\.venv\Scripts\python.exe"
& $pythonExe "$PSScriptRoot\run_maintenance_tick_once.py" @args
