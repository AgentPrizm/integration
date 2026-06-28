import { getConfig, ingestMemory, recallMemory } from './client.mjs';

const { container } = getConfig();
const accountContainer = `${container}:sales:acme-co`;

// `validUntil` marks a fact stale after its date. Recall now EXCLUDES expired
// facts by default — keep this window in the future so the objection still
// surfaces, or pass `includeExpired: true` on recall to review stale ones.
await ingestMemory({
  content: 'Acme Co champion is Priya. Main objection: procurement freeze until Mar 31, 2027.',
  type: 'fact',
  containers: [accountContainer],
  tags: ['sales', 'champion', 'objection'],
  source: 'conversation',
  validUntil: '2027-03-31T23:59:59Z',
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

// Each memory now carries a `confidence` (0-1); the response also includes a
// `receipt` (what matched, why, and what was filtered) you can log for audit.
console.log('Sales account memories to inject before drafting outreach:');
console.log(JSON.stringify(recall, null, 2));
