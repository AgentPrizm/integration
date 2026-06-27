import json

from client import config, ingest_memory, recall_memory

cfg = config()

ingest_response = ingest_memory(
    {
        "content": "Procurement freezes Dec 15 to Jan 5. Renewal owner: Priya.",
        "type": "fact",
        "containers": [cfg["container"]],
        "tags": ["sales", "renewal", "demo"],
        "source": "direct",
        "validUntil": "2026-12-31T23:59:59Z",
        "metadata": {"account": "Acme Co", "example": True},
    }
)

print("Ingested memory:")
print(json.dumps(ingest_response, indent=2))

recall_response = recall_memory(
    "When can we close the renewal?",
    containers=[cfg["container"]],
    types=["fact"],
)

print("\nRecall result:")
print(json.dumps(recall_response, indent=2))
