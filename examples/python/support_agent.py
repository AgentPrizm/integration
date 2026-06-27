import json

from client import config, ingest_memory, recall_memory

cfg = config()
customer_container = f"{cfg['container']}:support:customer-042"

ingest_memory(
    {
        "content": "Customer 042 prefers short answers and hates repeated questions.",
        "type": "preference",
        "containers": [customer_container],
        "tags": ["support", "customer-preference"],
        "source": "conversation",
        "metadata": {"ticketId": "TCK-1001", "example": True},
    }
)

ingest_memory(
    {
        "content": "Customer 042 is on the Pro plan. Billing renewal is on the 3rd of each month.",
        "type": "fact",
        "containers": [customer_container],
        "tags": ["support", "billing"],
        "source": "capture",
        "validUntil": "2026-12-31T23:59:59Z",
        "metadata": {"ticketId": "TCK-1002", "example": True},
    }
)

recall_response = recall_memory(
    "How should the support agent answer a billing renewal question?",
    containers=[customer_container],
    limit=5,
)

print("Memories to inject before drafting the support reply:")
print(json.dumps(recall_response, indent=2))
