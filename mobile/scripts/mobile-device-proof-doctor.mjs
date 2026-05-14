import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const MOBILE_ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const REPO_ROOT = resolve(MOBILE_ROOT, "..");
const DEFAULT_ARTIFACT_DIR = join(
  REPO_ROOT,
  ".codex",
  "artifacts",
  "prj1182-mobile-device-proof-doctor",
);

const CHECKS = [
  {
    name: "adb",
    command: "adb",
    args: ["version"],
    requiredFor: "Android device or emulator proof",
  },
  {
    name: "emulator",
    command: "emulator",
    args: ["-version"],
    requiredFor: "Android emulator launch proof",
  },
];

const PATH_SEPARATOR = process.platform === "win32" ? ";" : ":";

function envValue(name) {
  return process.env[name] || "";
}

function defaultAndroidSdkPath() {
  if (process.platform === "win32") {
    return process.env.LOCALAPPDATA ? join(process.env.LOCALAPPDATA, "Android", "Sdk") : "";
  }
  if (process.platform === "darwin") {
    return process.env.HOME ? join(process.env.HOME, "Library", "Android", "sdk") : "";
  }
  return process.env.HOME ? join(process.env.HOME, "Android", "Sdk") : "";
}

function pathEntries() {
  return String(process.env.PATH || "")
    .split(PATH_SEPARATOR)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function candidateToolPaths(command) {
  const executable = process.platform === "win32" ? `${command}.exe` : command;
  const sdkRoots = [envValue("ANDROID_HOME"), envValue("ANDROID_SDK_ROOT"), defaultAndroidSdkPath()]
    .filter(Boolean)
    .map((sdkPath) => resolve(sdkPath));
  const sdkCandidates =
    command === "adb"
      ? sdkRoots.map((sdkPath) => join(sdkPath, "platform-tools", executable))
      : sdkRoots.map((sdkPath) => join(sdkPath, "emulator", executable));
  const pathCandidates = pathEntries().map((entry) => join(entry, executable));
  return [...sdkCandidates, ...pathCandidates];
}

function resolveTool(command) {
  const candidates = candidateToolPaths(command);
  const found = candidates.find((candidate) => existsSync(candidate));
  return {
    command,
    found: Boolean(found),
    path: found || "",
    checked_candidates: candidates.slice(0, 24),
  };
}

function environmentSnapshot() {
  const sdkCandidates = [
    { name: "ANDROID_HOME", path: envValue("ANDROID_HOME") },
    { name: "ANDROID_SDK_ROOT", path: envValue("ANDROID_SDK_ROOT") },
    { name: "default_android_sdk", path: defaultAndroidSdkPath() },
  ].map((candidate) => ({
    ...candidate,
    configured: Boolean(candidate.path),
    exists: Boolean(candidate.path) && existsSync(candidate.path),
  }));
  return {
    platform: process.platform,
    cwd: process.cwd(),
    path_entry_count: pathEntries().length,
    sdk_candidates: sdkCandidates,
  };
}

function nextActions({ missing, environment }) {
  if (missing.length === 0) {
    return [
      "Run Expo Go or emulator proof for Home, Chat, Personality, Settings, and Tools.",
      "Attach the generated report and device/emulator evidence before marking native readiness verified.",
    ];
  }
  const actions = [];
  if (missing.includes("adb")) {
    actions.push("Install Android SDK platform-tools and make adb available on PATH.");
  }
  if (missing.includes("emulator")) {
    actions.push("Install Android Emulator through Android Studio SDK Manager or provide a physical Android device path.");
  }
  if (!environment.sdk_candidates.some((candidate) => candidate.exists)) {
    actions.push("Create or point ANDROID_HOME/ANDROID_SDK_ROOT to an Android SDK directory.");
  }
  actions.push("Rerun npm run doctor:ui-mobile-device from mobile/ after tooling is installed or a device is connected.");
  return actions;
}

function optionValue(name, fallback = "") {
  const index = process.argv.indexOf(name);
  if (index === -1) {
    return fallback;
  }
  return process.argv[index + 1] ?? fallback;
}

function run(command, args, timeoutMs = 10000) {
  return new Promise((resolveRun) => {
    const child = spawn(command, args, { windowsHide: true });
    let stdout = "";
    let stderr = "";
    let settled = false;
    const finish = (result) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timeout);
      resolveRun(result);
    };
    const timeout = setTimeout(() => {
      child.kill("SIGKILL");
      finish({ code: 1, stdout, stderr: `${stderr}\nTimed out after ${timeoutMs}ms` });
    }, timeoutMs);

    child.stdout?.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr?.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("close", (code) => finish({ code, stdout, stderr }));
    child.on("error", (error) => finish({ code: 1, stdout, stderr: String(error) }));
  });
}

async function main() {
  const artifactDir = resolve(REPO_ROOT, optionValue("--artifacts", DEFAULT_ARTIFACT_DIR));
  const reportPath = resolve(artifactDir, "report.json");
  mkdirSync(artifactDir, { recursive: true });

  const environment = environmentSnapshot();
  const toolResolution = Object.fromEntries(CHECKS.map((check) => [check.name, resolveTool(check.command)]));
  const checks = [];
  for (const check of CHECKS) {
    const result = await run(check.command, check.args);
    checks.push({
      name: check.name,
      required_for: check.requiredFor,
      available: result.code === 0,
      command: [check.command, ...check.args].join(" "),
      resolved_path: toolResolution[check.name]?.path || "",
      stdout: result.stdout.trim(),
      stderr: result.stderr.trim(),
    });
  }

  const missing = checks.filter((check) => !check.available);
  const missingTools = missing.map((check) => check.name);
  const report = {
    status: missing.length === 0 ? "ready" : "blocked",
    blocked: missing.length > 0,
    missing_tools: missingTools,
    next_action:
      missing.length === 0
        ? "Run Expo Go or simulator proof for Home, Chat, Personality, Settings, and Tools."
        : "Install Android platform tools or connect a supported device before native proof.",
    next_actions: nextActions({ missing: missingTools, environment }),
    proof_readiness: {
      android_tooling_ready: missingTools.length === 0,
      device_or_emulator_proof_required: true,
      native_readiness_claim_allowed: missingTools.length === 0,
    },
    environment,
    tool_resolution: toolResolution,
    checks,
  };

  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
