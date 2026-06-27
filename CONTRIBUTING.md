# Contributing

Thanks for helping improve AgentPrizm integration examples.

This repo is for public examples, quickstarts, and integration patterns only. Please do not submit:

- AgentPrizm backend internals
- customer data
- API keys or credentials
- proprietary deployment details
- benchmark claims that cannot be reproduced from public examples

## Good contributions

- New REST examples in common languages
- MCP config improvements
- Small agent patterns for coding, support, sales, and operations
- Clear documentation and migration notes
- Example `SKILL.md` files that contain no secrets or confidential data

## Local validation

```bash
bash scripts/check-examples.sh
```

The check script validates file presence and catches accidental placeholder mistakes. It does not call AgentPrizm unless you run the examples yourself with a real API key.
