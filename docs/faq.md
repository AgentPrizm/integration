# FAQ

## Is this the AgentPrizm backend?

No. This repository contains public integration examples only. AgentPrizm's backend, memory engine, ranking logic, database schema, and infrastructure are not included.

## Do I need an SDK?

No. The examples call the REST API directly with `curl`, Node native `fetch`, or Python standard library.

## What is the fastest way to test it?

Use the curl examples:

```bash
export AGENTPRIZM_API_KEY=ap_xxxxxxxxxxxxxxxxxx
bash examples/rest-curl/ingest.sh
bash examples/rest-curl/recall.sh
```

## What should I store as memory?

Store durable context that will matter later: facts, lessons, directives, preferences, contacts, and bookmarks.

Avoid raw dumps, secrets, credentials, and irrelevant chat noise.

## How do I separate customers?

Use containers. Give each customer, environment, and agent its own container naming pattern.

## Can I use MCP?

Yes. Use the remote endpoint in the MCP examples and replace the placeholder bearer token with your API key.

## Can I migrate from another memory store?

Yes. Read records from your current store, normalize them into AgentPrizm memory objects, and replay them into `POST /api/v1/agent/memories`.
