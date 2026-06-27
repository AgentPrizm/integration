import json
import os
import urllib.error
import urllib.request
from typing import Any, Dict

DEFAULT_BASE_URL = "https://agentprizm.com"


def config() -> Dict[str, str]:
    api_key = os.environ.get("AGENTPRIZM_API_KEY")
    if not api_key:
        raise RuntimeError("Missing AGENTPRIZM_API_KEY. Export it before running this example.")

    return {
        "api_key": api_key,
        "base_url": os.environ.get("AGENTPRIZM_BASE_URL", DEFAULT_BASE_URL).rstrip("/"),
        "container": os.environ.get("AGENTPRIZM_CONTAINER", "demo-acme"),
    }


def agentprizm_request(path: str, method: str = "POST", body: Dict[str, Any] | None = None) -> Dict[str, Any]:
    cfg = config()
    data = None if body is None else json.dumps(body).encode("utf-8")
    request = urllib.request.Request(
        f"{cfg['base_url']}{path}",
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {cfg['api_key']}",
            "Content-Type": "application/json",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            raw = response.read().decode("utf-8")
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as exc:
        raw = exc.read().decode("utf-8")
        raise RuntimeError(f"AgentPrizm API error {exc.code}: {raw}") from exc


def ingest_memory(memory: Dict[str, Any]) -> Dict[str, Any]:
    return agentprizm_request("/api/v1/agent/memories", body=memory)


def recall_memory(query: str, **kwargs: Any) -> Dict[str, Any]:
    body = {
        "query": query,
        "limit": 5,
        "searchMode": "hybrid",
        **kwargs,
    }
    return agentprizm_request("/api/v1/agent/recall", body=body)
