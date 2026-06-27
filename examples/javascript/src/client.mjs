const DEFAULT_BASE_URL = 'https://agentprizm.com';

export function getConfig() {
  const apiKey = process.env.AGENTPRIZM_API_KEY;
  if (!apiKey) {
    throw new Error('Missing AGENTPRIZM_API_KEY. Export it before running this example.');
  }

  return {
    apiKey,
    baseUrl: process.env.AGENTPRIZM_BASE_URL || DEFAULT_BASE_URL,
    container: process.env.AGENTPRIZM_CONTAINER || 'demo-acme'
  };
}

export async function agentprizmFetch(path, options = {}) {
  const { apiKey, baseUrl } = getConfig();
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  const text = await response.text();
  let payload;
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    payload = { raw: text };
  }

  if (!response.ok) {
    const detail = typeof payload === 'object' ? JSON.stringify(payload, null, 2) : String(payload);
    throw new Error(`AgentPrizm API error ${response.status}: ${detail}`);
  }

  return payload;
}

export async function ingestMemory(memory) {
  return agentprizmFetch('/api/v1/agent/memories', {
    method: 'POST',
    body: JSON.stringify(memory)
  });
}

export async function recallMemory(query, options = {}) {
  return agentprizmFetch('/api/v1/agent/recall', {
    method: 'POST',
    body: JSON.stringify({
      query,
      limit: 5,
      searchMode: 'hybrid',
      ...options
    })
  });
}
