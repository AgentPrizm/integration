import { getConfig, ingestMemory, recallMemory } from './client.mjs';

const { container } = getConfig();

await ingestMemory({
  content: 'Procurement freezes Dec 15 to Jan 5. Renewal owner: Priya.',
  type: 'fact',
  containers: [container],
  tags: ['sales', 'renewal', 'demo'],
  source: 'direct',
  validUntil: '2026-12-31T23:59:59Z',
  metadata: {
    account: 'Acme Co',
    example: true
  }
});

const result = await recallMemory('When can we close the renewal?', {
  containers: [container],
  types: ['fact']
});

console.log(JSON.stringify(result, null, 2));
