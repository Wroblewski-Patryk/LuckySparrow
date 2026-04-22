$pythonExe = Join-Path $PSScriptRoot "..\.venv\Scripts\python.exe"
& $pythonExe "$PSScriptRoot\run_proactive_tick_once.py" @args
