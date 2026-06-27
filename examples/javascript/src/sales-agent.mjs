import { getConfig, ingestMemory, recallMemory } from './client.mjs';

const { container } = getConfig();
const accountContainer = `${container}:sales:acme-co`;

await ingestMemory({
  content: 'Acme Co champion is Priya. Main objection: procurement freeze until Jan 5.',
  type: 'fact',
  containers: [accountContainer],
  tags: ['sales', 'champion', 'objection'],
  source: 'conversation',
  validUntil: '2026-01-05T23:59:59Z',
  metadata: { crmOpportunityId: 'OPP-ACME-2026', example: true }
});

await ingestMemory({
  content: 'Use a direct, executive tone with Acme Co. Avoid long educational paragraphs.',
  type: 'preference',
  containers: [accountContainer],
  tags: ['sales', 'tone'],
  source: 'direct',
  metadata: { example: true }
});

const recall = await recallMemory('Draft next-step outreach for Acme renewal.', {
  containers: [accountContainer],
  limit: 5,
  searchMode: 'hybrid'
});

console.log('Sales account memories to inject before drafting outreach:');
console.log(JSON.stringify(recall, null, 2));
