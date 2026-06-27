import { getConfig, ingestMemory, recallMemory } from './client.mjs';

const { container } = getConfig();
const customerContainer = `${container}:support:customer-042`;

await ingestMemory({
  content: 'Customer 042 prefers short answers and does not want to repeat their account ID after login.',
  type: 'preference',
  containers: [customerContainer],
  tags: ['support', 'customer-preference'],
  source: 'conversation',
  metadata: { ticketId: 'TCK-1001', example: true }
});

await ingestMemory({
  content: 'Customer 042 is on the Pro plan. Billing renewal is on the 3rd of each month.',
  type: 'fact',
  containers: [customerContainer],
  tags: ['support', 'billing'],
  source: 'capture',
  validUntil: '2026-12-31T23:59:59Z',
  metadata: { ticketId: 'TCK-1002', example: true }
});

const recall = await recallMemory('How should the support agent answer a billing renewal question?', {
  containers: [customerContainer],
  limit: 5
});

console.log('Memories to inject before drafting the support reply:');
console.log(JSON.stringify(recall, null, 2));
