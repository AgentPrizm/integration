#!/usr/bin/env bash
set -euo pipefail

: "${AGENTPRIZM_API_KEY:?Set AGENTPRIZM_API_KEY first}"
AGENTPRIZM_BASE_URL="${AGENTPRIZM_BASE_URL:-https://agentprizm.com}"

curl "$AGENTPRIZM_BASE_URL/api/v1/agent/stats" \
  -H "Authorization: Bearer $AGENTPRIZM_API_KEY"

echo
