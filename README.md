# AgentPrizm

AI agents forget. AgentPrizm remembers.

AgentPrizm is the governed memory and reusable skills layer for AI agents. It helps agents recall durable facts, lessons, directives, preferences, contacts, and bookmarks across sessions with scoped containers, validity windows, confidence signals, and recall receipts.

## What AgentPrizm gives AI agents

- Persistent memory for agents that need context across sessions
- Scoped containers for users, teams, customers, environments, and agents
- Recall receipts so teams can see why an agent remembered something
- Fact-validity windows for time-sensitive information
- REST API and remote MCP integration
- Reusable AgentSkills for repeatable agent workflows
- Right-to-forget and safer memory hygiene patterns

## Start here

- Website: https://agentprizm.com
- Docs: https://agentprizm.com/docs
- API reference: https://agentprizm.com/api-reference
- Security: https://agentprizm.com/security
- Integration examples: https://github.com/AgentPrizm/integration

## Integration examples

The public `integration` repository includes:

- REST examples with curl
- JavaScript examples using Node 18+ native fetch
- Python examples using the standard library
- Remote MCP configs for Claude Code, Cursor, and Claude Desktop
- Example AgentSkills for support, sales, and PR review workflows
- Migration notes for DIY memory, Mem0, Zep, Letta, and pgvector-style stores

## Example use cases

### Coding agents

Recall repo conventions, architecture decisions, PR feedback, and repeated review lessons before writing code or reviewing pull requests.

### Support agents

Recall customer preferences, plan facts, escalation rules, active tickets, and stale policy warnings before drafting replies.

### Sales agents

Recall champion notes, blockers, procurement windows, renewal owners, objections, and next steps before outreach or call prep.

### AI agencies and integrators

Partition memory by client, environment, and agent while shipping governed recall without maintaining a custom memory stack for every project.

## Core line

Every recall should have a receipt.

