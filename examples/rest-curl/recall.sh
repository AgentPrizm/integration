#!/usr/bin/env bash
set -euo pipefail

: "${AGENTPRIZM_API_KEY:?Set AGENTPRIZM_API_KEY first}"
AGENTPRIZM_BASE_URL="${AGENTPRIZM_BASE_URL:-https://agentprizm.com}"
AGENTPRIZM_CONTAINER="${AGENTPRIZM_CONTAINER:-demo-acme}"

# Optional knobs: minConfidence drops low-confidence memories; includeExpired
# keeps facts past their validUntil (excluded by default). The response returns
# each memory's `confidence`, a per-memory `why` breakdown, and a top-level
# `receipt` summarizing what matched and what was filtered.
curl "$AGENTPRIZM_BASE_URL/api/v1/agent/recall" \
  -H "Authorization: Bearer $AGENTPRIZM_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"query\": \"When can we close the renewal?\",
    \"containers\": [\"$AGENTPRIZM_CONTAINER\"],
    \"types\": [\"fact\"],
    \"limit\": 5,
    \"searchMode\": \"hybrid\",
    \"minConfidence\": 0.6,
    \"includeExpired\": false
  }"

echo
