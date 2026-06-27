#!/usr/bin/env bash
set -euo pipefail

required_files=(
  "README.md"
  ".env.example"
  "examples/rest-curl/ingest.sh"
  "examples/rest-curl/recall.sh"
  "examples/javascript/package.json"
  "examples/javascript/src/client.mjs"
  "examples/javascript/src/quickstart.mjs"
  "examples/python/client.py"
  "examples/python/quickstart.py"
  "examples/mcp/claude-code.json"
  "docs/concepts.md"
  "docs/migration.md"
)

for file in "${required_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "Missing required file: $file" >&2
    exit 1
  fi
done

python3 -m py_compile examples/python/client.py examples/python/quickstart.py examples/python/support_agent.py
node --check examples/javascript/src/client.mjs
node --check examples/javascript/src/quickstart.mjs
node --check examples/javascript/src/support-agent.mjs
node --check examples/javascript/src/sales-agent.mjs
node --check examples/javascript/src/coding-agent.mjs

for json_file in examples/mcp/*.json; do
  python3 -m json.tool "$json_file" >/dev/null
done

if grep -R "ap_[A-Za-z0-9]\{12,\}" . --exclude-dir=.git | grep -v "ap_xxxxxxxxxxxxxxxxxx"; then
  echo "Possible real AgentPrizm API key found. Refusing to pass checks." >&2
  exit 1
fi

echo "Example validation passed."
