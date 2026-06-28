# AgentPrizm integration concepts

This guide explains the core ideas used throughout the examples.

## Memory

A memory is one durable atomic item that an agent can recall later.

Recommended memory types:

| Type | Use it for |
| --- | --- |
| `fact` | Account facts, plan details, renewal dates, current status |
| `lesson` | Repeated learnings from reviews, incidents, or user feedback |
| `directive` | Rules the agent should follow |
| `preference` | User/customer/team preferences |
| `contact` | People, roles, owners, champions |
| `bookmark` | Useful links, documents, or resources |

## Containers

Containers isolate memory across tenants, customers, environments, and agents.

Examples:

```text
acme-prod
acme-staging
agency-client-001
support-customer-042
repo-agentprizm-integration
```

A support agent should not recall sales-only context unless you intentionally share a container. A staging agent should not recall production-only context.

## Validity windows

Use `validFrom` and `validUntil` for facts that expire.

Examples:

- procurement freeze dates
- pricing facts
- policy versions
- incident status
- shipping delays
- vendor windows

Expired facts (those whose `validUntil` is in the past) are **excluded from recall by default** — they will not be returned at all. To review stale facts (for example, to flag and refresh them), pass `includeExpired: true` and check each result's `why.validityState` (`active` | `future` | `expired`). Recall does not return `validUntil` itself; validity is reported through `why.validityState`.

## Recall

Recall retrieves relevant memories for a query.

Recommended default:

```json
{
  "query": "What should I remember before answering this customer?",
  "containers": ["support-customer-042"],
  "limit": 5,
  "searchMode": "hybrid"
}
```

Optional filters:

- `minConfidence` (0–1) — drop memories stored below your confidence bar.
- `includeReceipt` (default true) — set `false` to omit the audit receipt for lower latency.
- `includeExpired` (default false) — include facts past their `validUntil`.

## Recall response

Every recalled memory carries a `confidence` score (0–1) — use `minConfidence` to filter on it.

When the receipt is enabled (the default), each recall also returns:

- per memory: a `why` block (`cosine`, score multipliers, `finalScore`, `matchedVia`, `keywordMatches`, `validityState`) and a `supersedes` chain (`memoryId`, a short `snippet`, and `supersededAt`) for any older memory it replaced;
- a top-level `receipt`: what was searched and `filtered` (counts for below-threshold, deduplicated, low-confidence, and outside-validity-window drops), so you can show exactly why each memory was used.

The receipt is metadata — it is not counted against `_meta.tokens`.

Use recall before:

- drafting a customer reply
- generating code
- reviewing a PR
- preparing a sales call
- making a high-stakes tool call
- summarizing a conversation

## Skills vs memories

A memory is a fact or lesson to recall.

A skill is an instruction block the agent can load when it needs to perform a repeatable task a particular way.

Example:

- Memory: `Customer 042 prefers short answers.`
- Skill: `When replying to support tickets, recall customer preferences first, then draft a concise answer.`
