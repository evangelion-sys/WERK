import type { Repository, TierKey } from '../types/repository.js';

const cache: Partial<Record<TierKey, Repository[]>> = {};

export async function loadTierDataset(tier: TierKey): Promise<Repository[]> {
  if (cache[tier]) {
    return cache[tier]!;
  }

  let data: Repository[] = [];
  if (tier === '10k') {
    const mod = await import('../data/repos_10k.json');
    data = (mod.default || mod) as unknown as Repository[];
  } else if (tier === '5k') {
    const mod = await import('../data/repos_5k.json');
    data = (mod.default || mod) as unknown as Repository[];
  } else {
    const mod = await import('../data/repos_1k.json');
    data = (mod.default || mod) as unknown as Repository[];
  }

  cache[tier] = data;
  return data;
}
