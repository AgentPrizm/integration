#!/usr/bin/env bash
set -euo pipefail

: "${AGENTPRIZM_API_KEY:?Set AGENTPRIZM_API_KEY first}"
AGENTPRIZM_BASE_URL="${AGENTPRIZM_BASE_URL:-https://agentprizm.com}"
AGENTPRIZM_CONTAINER="${AGENTPRIZM_CONTAINER:-demo-acme}"

curl "$AGENTPRIZM_BASE_URL/api/v1/agent/memories" \
  -H "Authorization: Bearer $AGENTPRIZM_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"content\": \"Procurement freezes Dec 15 to Jan 5. Renewal owner: Priya.\",
    \"type\": \"fact\",
    \"containers\": [\"$AGENTPRIZM_CONTAINER\"],
    \"tags\": [\"sales\", \"renewal\", \"demo\"],
    \"source\": \"direct\",
    \"validUntil\": \"2026-12-31T23:59:59Z\",
    \"metadata\": {
      \"account\": \"Acme Co\",
      \"example\": true
    }
  }"

echo
