# Migration patterns

This repo does not include a dedicated importer. The safest migration pattern is to read records from your current memory store and replay them into AgentPrizm as one memory per row.

## Generic migration shape

For each existing memory record:

```json
{
  "content": "...",
  "type": "fact",
  "containers": ["prod"],
  "source": "extraction",
  "tags": ["migration"],
  "validFrom": "2026-01-01T00:00:00Z",
  "validUntil": "2026-12-31T23:59:59Z",
  "metadata": {
    "migratedFrom": "legacy-memory-store",
    "legacyId": "abc123"
  }
}
```

Then POST it to:

```text
/api/v1/agent/memories
```

## Mapping examples

| Existing field | AgentPrizm field |
| --- | --- |
| text / value / summary | `content` |
| category | `type` |
| tenant_id / workspace_id / customer_id | `containers` |
| tags | `tags` |
| source_id / message_id / ticket_id | `metadata` |
| created_at | `validFrom` or `metadata.createdAt` |
| expires_at | `validUntil` |

## Recommended migration steps

1. Export a small sample first.
2. Normalize each record into an atomic memory.
3. Choose containers before importing.
4. Add `metadata.migratedFrom` and legacy IDs.
5. Import into a staging/demo container.
6. Run recall tests against known queries.
7. Import production data only after the recall behavior looks right.

## Important cautions

- Do not migrate secrets.
- Do not mix clients in a single container unless intentional.
- Do not import raw chat logs as one giant memory. Summarize durable facts first.
- Do not treat old facts as current; add validity windows where possible.
