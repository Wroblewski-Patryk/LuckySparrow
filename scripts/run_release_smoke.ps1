param(
    [Parameter(Mandatory = $true)][string]$BaseUrl,
    [string]$Text = "AION manual smoke test",
    [string]$UserId = "manual-smoke",
    [switch]$IncludeDebug
)

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
Add-Type -AssemblyName System.Net.Http

function Invoke-JsonUtf8 {
    param(
        [Parameter(Mandatory = $true)][ValidateSet("GET", "POST")][string]$Method,
        [Parameter(Mandatory = $true)][string]$Uri,
        [byte[]]$BodyBytes = $null
    )

    $handler = [System.Net.Http.HttpClientHandler]::new()
    $client = [System.Net.Http.HttpClient]::new($handler)
    try {
        $request = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::$Method, $Uri)
        if ($Method -eq "POST") {
            $content = [System.Net.Http.ByteArrayContent]::new($BodyBytes)
            $content.Headers.ContentType = [System.Net.Http.Headers.MediaTypeHeaderValue]::Parse("application/json; charset=utf-8")
            $request.Content = $content
        }

        $response = $client.SendAsync($request).GetAwaiter().GetResult()
        $response.EnsureSuccessStatusCode() | Out-Null
        $bytes = $response.Content.ReadAsByteArrayAsync().GetAwaiter().GetResult()
        $json = [System.Text.Encoding]::UTF8.GetString($bytes)
        return $json | ConvertFrom-Json
    }
    finally {
        if ($null -ne $client) {
            $client.Dispose()
        }
        if ($null -ne $handler) {
            $handler.Dispose()
        }
    }
}

function Has-Property {
    param(
        [object]$Object,
        [Parameter(Mandatory = $true)][string]$Name
    )
    return $null -ne $Object -and $Object.PSObject.Properties.Name -contains $Name
}

$trimmedBaseUrl = $BaseUrl.TrimEnd("/")
$traceId = [guid]::NewGuid().ToString()
$eventUrl = "$trimmedBaseUrl/event"
if ($IncludeDebug) {
    $eventUrl = "${eventUrl}?debug=true"
}

$payload = @{
    source    = "api"
    subsource = "manual_smoke"
    text      = $Text
    meta      = @{
        user_id  = $UserId
        trace_id = $traceId
    }
}

$json = $payload | ConvertTo-Json -Depth 6 -Compress
$bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($json)

$health = Invoke-JsonUtf8 -Method GET -Uri "$trimmedBaseUrl/health"
if ($health.status -ne "ok") {
    throw "Health check failed: unexpected status '$($health.status)'."
}

$runtimePolicy = $health.runtime_policy
if ($null -eq $runtimePolicy) {
    throw "Health check failed: response is missing runtime_policy."
}

$releaseReadiness = $health.release_readiness
$releaseReadinessReady = $true
$releaseReadinessViolations = @()

if ($null -ne $releaseReadiness -and $releaseReadiness.PSObject.Properties.Name -contains "ready") {
    $releaseReadinessReady = [bool]$releaseReadiness.ready
    if ($releaseReadiness.PSObject.Properties.Name -contains "violations" -and $null -ne $releaseReadiness.violations) {
        $releaseReadinessViolations = @($releaseReadiness.violations)
    }
}
else {
    $fallbackViolations = @()
    $policyMismatches = @()
    if (
        $runtimePolicy.PSObject.Properties.Name -contains "production_policy_mismatches" -and
        $null -ne $runtimePolicy.production_policy_mismatches
    ) {
        $policyMismatches = @($runtimePolicy.production_policy_mismatches)
    }
    if ($policyMismatches.Count -gt 0) {
        $fallbackViolations += "runtime_policy.production_policy_mismatches_non_empty"
    }
    if ([bool]$runtimePolicy.strict_startup_blocked) {
        $fallbackViolations += "runtime_policy.strict_startup_blocked=true"
    }
    if ([bool]$runtimePolicy.event_debug_query_compat_enabled) {
        $fallbackViolations += "runtime_policy.event_debug_query_compat_enabled=true"
    }
    $releaseReadinessViolations = $fallbackViolations
    $releaseReadinessReady = $releaseReadinessViolations.Count -eq 0
}

if (-not $releaseReadinessReady) {
    $details = if ($releaseReadinessViolations.Count -gt 0) {
        ($releaseReadinessViolations -join ",")
    }
    else {
        "unspecified"
    }
    throw "Release readiness check failed: $details."
}

$reflection = $health.reflection
if ($null -eq $reflection) {
    throw "Health check failed: response is missing reflection."
}

$reflectionDeploymentReadiness = if (Has-Property -Object $reflection -Name "deployment_readiness") {
    $reflection.deployment_readiness
}
else {
    $null
}
$reflectionDeploymentReady = $true
$reflectionDeploymentBlockingSignals = @()

if ($null -ne $reflectionDeploymentReadiness -and (Has-Property -Object $reflectionDeploymentReadiness -Name "ready")) {
    $reflectionDeploymentReady = [bool]$reflectionDeploymentReadiness.ready
    if ((Has-Property -Object $reflectionDeploymentReadiness -Name "blocking_signals") -and $null -ne $reflectionDeploymentReadiness.blocking_signals) {
        $reflectionDeploymentBlockingSignals = @($reflectionDeploymentReadiness.blocking_signals)
    }
}
else {
    $runtimeMode = if (Has-Property -Object $reflection -Name "runtime_mode") {
        [string]$reflection.runtime_mode
    }
    else {
        "in_process"
    }
    $workerRunning = if ((Has-Property -Object $reflection -Name "worker") -and $null -ne $reflection.worker -and (Has-Property -Object $reflection.worker -Name "running")) {
        [bool]$reflection.worker.running
    }
    else {
        $false
    }
    $topology = if (Has-Property -Object $reflection -Name "topology") {
        $reflection.topology
    }
    else {
        $null
    }
    $tasks = if (Has-Property -Object $reflection -Name "tasks") {
        $reflection.tasks
    }
    else {
        $null
    }

    $fallbackBlockingSignals = @()

    if ($runtimeMode -eq "deferred") {
        if ($workerRunning) {
            $fallbackBlockingSignals += "deferred_in_process_worker_running"
        }
        if (-not (Has-Property -Object $topology -Name "queue_drain_owner") -or [string]$topology.queue_drain_owner -ne "external_driver") {
            $fallbackBlockingSignals += "deferred_queue_drain_owner_mismatch"
        }
        if (-not (Has-Property -Object $topology -Name "external_driver_expected") -or -not [bool]$topology.external_driver_expected) {
            $fallbackBlockingSignals += "deferred_external_driver_expectation_missing"
        }
        if (-not (Has-Property -Object $topology -Name "scheduler_tick_dispatch") -or -not [bool]$topology.scheduler_tick_dispatch) {
            $fallbackBlockingSignals += "deferred_scheduler_dispatch_flag_mismatch"
        }
    }
    else {
        if (-not $workerRunning) {
            $fallbackBlockingSignals += "in_process_worker_not_running"
        }
        if (-not (Has-Property -Object $topology -Name "queue_drain_owner") -or [string]$topology.queue_drain_owner -ne "in_process_worker") {
            $fallbackBlockingSignals += "in_process_queue_drain_owner_mismatch"
        }
        if ((Has-Property -Object $topology -Name "external_driver_expected") -and [bool]$topology.external_driver_expected) {
            $fallbackBlockingSignals += "in_process_external_driver_flag_mismatch"
        }
        if ((Has-Property -Object $topology -Name "scheduler_tick_dispatch") -and [bool]$topology.scheduler_tick_dispatch) {
            $fallbackBlockingSignals += "in_process_scheduler_dispatch_flag_mismatch"
        }
    }

    $stuckProcessing = if (Has-Property -Object $tasks -Name "stuck_processing") {
        [int]$tasks.stuck_processing
    }
    else {
        0
    }
    $exhaustedFailed = if (Has-Property -Object $tasks -Name "exhausted_failed") {
        [int]$tasks.exhausted_failed
    }
    else {
        0
    }
    if ($stuckProcessing -gt 0) {
        $fallbackBlockingSignals += "reflection_stuck_processing_detected"
    }
    if ($exhaustedFailed -gt 0) {
        $fallbackBlockingSignals += "reflection_exhausted_failures_detected"
    }

    $reflectionDeploymentBlockingSignals = $fallbackBlockingSignals
    $reflectionDeploymentReady = $reflectionDeploymentBlockingSignals.Count -eq 0
}

if (-not $reflectionDeploymentReady) {
    $details = if ($reflectionDeploymentBlockingSignals.Count -gt 0) {
        ($reflectionDeploymentBlockingSignals -join ",")
    }
    else {
        "unspecified"
    }
    throw "Reflection deployment readiness check failed: $details."
}

$response = Invoke-JsonUtf8 -Method POST -Uri $eventUrl -BodyBytes $bodyBytes

if (-not $response.event_id) {
    throw "Smoke request failed: response is missing event_id."
}

if (-not $response.reply -or -not $response.reply.message) {
    throw "Smoke request failed: response is missing reply.message."
}

if (-not $response.runtime -or -not $response.runtime.role) {
    throw "Smoke request failed: response is missing runtime.role."
}

if ($IncludeDebug -and -not $response.debug) {
    throw "Smoke request failed: debug=true was requested but debug payload is missing."
}

$summary = @{
    base_url             = $trimmedBaseUrl
    health_status        = $health.status
    reflection_healthy   = $health.reflection.healthy
    event_id             = $response.event_id
    trace_id             = $response.trace_id
    reply_message        = $response.reply.message
    reply_language       = $response.reply.language
    runtime_role         = $response.runtime.role
    runtime_action       = $response.runtime.action_status
    reflection_triggered = $response.runtime.reflection_triggered
    release_ready        = $releaseReadinessReady
    release_violations   = @($releaseReadinessViolations)
    reflection_deployment_ready      = $reflectionDeploymentReady
    reflection_deployment_violations = @($reflectionDeploymentBlockingSignals)
    debug_included       = [bool]$response.debug
}

$summary | ConvertTo-Json -Depth 6
