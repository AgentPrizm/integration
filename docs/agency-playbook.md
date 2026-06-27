# Agency and integrator playbook

AI agencies and integrators can use AgentPrizm as the governed memory layer for client agents without building a custom memory stack for every implementation.

## Recommended container strategy

Use a clear container naming convention:

```text
agency:{agency-slug}:client:{client-slug}:env:{environment}:agent:{agent-name}
```

Example:

```text
agency:brightops:client:acme:env:prod:agent:support
agency:brightops:client:acme:env:staging:agent:support
agency:brightops:client:northwind:env:prod:agent:sales
```

## Demo-to-production flow

1. Build a fake-data demo container.
2. Ingest 10-20 durable memories that show the target workflow.
3. Connect the demo to an MCP-capable agent or REST-based agent.
4. Show the client before/after: same prompt, same model, with and without recall.
5. Move to staging with client-approved data.
6. Create production containers only after sign-off.

## What to measure

- repeated questions avoided
- stale facts flagged
- support escalation quality
- sales follow-up relevance
- PR review repetition reduced
- time saved per workflow

## Client-facing positioning

Use this language:

> We are not giving your agent random long-term memory. We are giving it governed recall: scoped containers, provenance, confidence, validity windows, and auditability.

## What not to do

- Do not put multiple clients in the same memory container.
- Do not demo with real customer data unless approved.
- Do not claim compliance certifications that your deployment does not have.
- Do not let agents save everything. Save durable facts, preferences, directives, and lessons.
