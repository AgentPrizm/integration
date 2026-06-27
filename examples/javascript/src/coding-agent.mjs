import { getConfig, ingestMemory, recallMemory } from './client.mjs';

const { container } = getConfig();
const repoContainer = `${container}:repo:agentprizm-demo`;

await ingestMemory({
  content: 'In this repo, all examples must use fake data and must never log API keys.',
  type: 'directive',
  containers: [repoContainer],
  tags: ['coding', 'security', 'repo-convention'],
  source: 'direct',
  metadata: { repo: 'AgentPrizm/integration', example: true }
});

await ingestMemory({
  content: 'Prefer Node 18 native fetch examples so users do not need to install an SDK.',
  type: 'lesson',
  containers: [repoContainer],
  tags: ['coding', 'developer-experience'],
  source: 'pr-review',
  metadata: { repo: 'AgentPrizm/integration', example: true }
});

const recall = await recallMemory('Before editing this repo, what conventions should the coding agent remember?', {
  containers: [repoContainer],
  limit: 5
});

console.log('Repo memories to inject before code generation or PR review:');
console.log(JSON.stringify(recall, null, 2));
