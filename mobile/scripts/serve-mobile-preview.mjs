import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const MOBILE_ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const EXPORT_ROOT = resolve(MOBILE_ROOT, ".expo-web-export");
const INDEX = resolve(EXPORT_ROOT, "index.html");
const PORT = Number(process.env.PORT || process.argv[2] || "8093");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const ROUTES = ["/", "/chat", "/personality", "/settings", "/tools"];

function sendJson(response, payload) {
  response.writeHead(200, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(`${JSON.stringify(payload, null, 2)}\n`);
}

function sendFile(response, filePath) {
  response.writeHead(200, {
    "Content-Type": MIME_TYPES[extname(filePath)] ?? "application/octet-stream",
  });
  response.end(readFileSync(filePath));
}

if (!existsSync(INDEX)) {
  console.error("Missing Expo web export. Run `npm run export:ui-mobile` first.");
  process.exit(1);
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://127.0.0.1:${PORT}`);

  if (url.pathname === "/__preview_health") {
    sendJson(response, {
      app: "aviary-mobile-ui-preview",
      status: "ok",
      route_count: ROUTES.length,
      routes: ROUTES,
    });
    return;
  }

  const cleanPath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  const candidate = resolve(EXPORT_ROOT, cleanPath);
  const isInsideExport = candidate.startsWith(EXPORT_ROOT);

  if (isInsideExport && existsSync(candidate) && statSync(candidate).isFile()) {
    sendFile(response, candidate);
    return;
  }

  sendFile(response, INDEX);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Aviary mobile UI preview: http://127.0.0.1:${PORT}`);
});
