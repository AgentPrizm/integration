# AgentPrizm Integration Examples

Public integration examples for adding governed memory to AI agents with AgentPrizm.

AgentPrizm gives agents persistent memory over REST and remote MCP, so they can recall facts, preferences, lessons, directives, contacts, and bookmarks across sessions without shipping AgentPrizm's backend or proprietary recall logic in your app.

> This repository contains **example integration code only**. It does not include AgentPrizm's backend, ranking logic, memory engine, database schema, infrastructure, or proprietary product code.

## What you can build here

- A 5-minute REST ingest + recall flow
- Remote MCP setup for Claude Code, Cursor, and Claude Desktop
- Support-agent memory examples
- Sales/account memory examples
- Coding-agent repo-convention memory examples
- Reusable `SKILL.md` examples for AgentSkills
- Migration patterns from DIY memory, Mem0, Zep, Letta, or pgvector-style stores

## Quickstart

### 1. Get an API key

Create an AgentPrizm API key in your dashboard. Keys are prefixed with `ap_`.

```bash
cp .env.example .env
export AGENTPRIZM_API_KEY=ap_xxxxxxxxxxxxxxxxxx
export AGENTPRIZM_CONTAINER=demo-acme
```

### 2. Ingest a memory

```bash
bash examples/rest-curl/ingest.sh
```

### 3. Recall it

```bash
bash examples/rest-curl/recall.sh
```

### 4. Try JavaScript

```bash
cd examples/javascript
npm install
AGENTPRIZM_API_KEY=$AGENTPRIZM_API_KEY npm run quickstart
```

### 5. Try Python

```bash
python3 examples/python/quickstart.py
```

## REST API shape

The examples use the stable v1 REST surface:

```bash
POST https://agentprizm.com/api/v1/agent/memories
POST https://agentprizm.com/api/v1/agent/recall
GET  https://agentprizm.com/api/v1/agent/stats
```

A memory is an atomic item with a `content`, `type`, optional `containers`, optional `tags`, source/provenance, confidence, and optional validity window.

Common memory types:

- `fact`
- `lesson`
- `directive`
- `preference`
- `contact`
- `bookmark`

## Remote MCP setup

AgentPrizm exposes a remote MCP endpoint:

```text
https://agentprizm.com/api/mcp
```

**The same config shape works across MCP clients.** Claude Code, Cursor, and Claude Desktop all use an identical `mcpServers` entry — the remote URL plus an `Authorization: Bearer ap_...` header — so the snippet is the same for each; only the file each client reads differs:

- [`examples/mcp/claude-code.json`](examples/mcp/claude-code.json)
- [`examples/mcp/cursor-mcp.json`](examples/mcp/cursor-mcp.json)
- [`examples/mcp/claude-desktop.json`](examples/mcp/claude-desktop.json)

## Repository map

```text
examples/
  rest-curl/          # Minimal shell scripts
  javascript/         # Node 18+ examples using native fetch
  python/             # Python 3 stdlib examples
  mcp/                # Remote MCP config snippets
  skills/             # Example SKILL.md files
docs/
  concepts.md         # Memory, containers, validity windows, recall
  migration.md        # Replay existing memory stores into AgentPrizm
  agency-playbook.md  # Patterns for AI agencies and integrators
scripts/
  check-examples.sh   # Lightweight local validation
```

## Use cases

### Coding agents

Store repo conventions, PR feedback, architecture decisions, and recurring review lessons. Recall them before code generation or PR review.

### Support agents

Store customer preferences, plan details, escalation rules, recent tickets, and stale-policy warnings. Recall them before answering.

### Sales agents

Store champion notes, blockers, procurement windows, renewal owners, objections, and next steps. Recall them before drafting outreach or call prep.

### AI agencies and integrators

Partition client memory by workspace/container, keep demos reproducible, and ship governed recall into multiple client agents without maintaining a custom memory stack.

## Safety notes

- Do not commit real API keys.
- Do not ingest production secrets into demo containers.
- Use separate containers for dev, staging, production, and each customer/client.
- Use `validFrom` / `validUntil` for facts that expire.
- Use `source` and `metadata` so future recalls are explainable.

## Links

- AgentPrizm: https://agentprizm.com
- Docs: https://agentprizm.com/docs
- API reference: https://agentprizm.com/api-reference
- Security: https://agentprizm.com/security
