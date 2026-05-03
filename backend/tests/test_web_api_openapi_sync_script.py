from __future__ import annotations

import importlib.util
import json
import sys
from pathlib import Path


SCRIPT_PATH = Path(__file__).resolve().parents[1] / "scripts" / "check_web_api_openapi_sync.py"
SPEC = importlib.util.spec_from_file_location("check_web_api_openapi_sync_script", SCRIPT_PATH)
assert SPEC is not None and SPEC.loader is not None
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


def test_extract_web_api_calls_handles_typed_request_json() -> None:
    source = '''
export const api = {
  getMe(): Promise<AppMeResponse> {
    return requestJson<AppMeResponse>("/app/me", { method: "GET" });
  },
  sendChatMessage(text: string): Promise<AppChatMessageResponse> {
    return requestJson<AppChatMessageResponse>(
      "/app/chat/message",
      { method: "POST" },
      { text },
    );
  },
};
'''

    assert MODULE.extract_web_api_calls(source) == [
        {"method": "GET", "path": "/app/me"},
        {"method": "POST", "path": "/app/chat/message"},
    ]


def test_check_sync_passes_when_web_calls_exist_in_openapi(tmp_path: Path) -> None:
    openapi_path = tmp_path / "openapi.json"
    web_api_path = tmp_path / "api.ts"
    openapi_path.write_text(
        json.dumps(
            {
                "paths": {
                    "/app/me": {"get": {}},
                    "/app/chat/message": {"post": {}},
                }
            }
        ),
        encoding="utf-8",
    )
    web_api_path.write_text(
        '''
requestJson<AppMeResponse>("/app/me", { method: "GET" });
requestJson<AppChatMessageResponse>(
  "/app/chat/message",
  { method: "POST" },
);
''',
        encoding="utf-8",
    )

    report = MODULE.check_sync(openapi_path=openapi_path, web_api_path=web_api_path)

    assert report["status"] == "ok"
    assert report["missing_operations"] == []


def test_check_sync_reports_web_calls_missing_from_openapi(tmp_path: Path) -> None:
    openapi_path = tmp_path / "openapi.json"
    web_api_path = tmp_path / "api.ts"
    openapi_path.write_text(json.dumps({"paths": {"/app/me": {"get": {}}}}), encoding="utf-8")
    web_api_path.write_text(
        '''
requestJson<AppMeResponse>("/app/me", { method: "GET" });
requestJson<UnknownResponse>("/app/unknown", { method: "POST" });
''',
        encoding="utf-8",
    )

    report = MODULE.check_sync(openapi_path=openapi_path, web_api_path=web_api_path)

    assert report["status"] == "drift"
    assert report["missing_operations"] == [{"method": "POST", "path": "/app/unknown"}]
