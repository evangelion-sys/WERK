import type {
  Repository,
  Category,
  VaultStats,
  RepositoryFilters,
  PaginatedResult,
  Collection,
  SyncJob,
  SyncCursor
} from '../types/index.js';

export async function fetchStats(): Promise<VaultStats> {
  const res = await fetch('/api/stats');
  if (!res.ok) throw new Error('Failed to fetch platform stats');
  return res.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch('/api/categories');
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function fetchRepositories(filters: RepositoryFilters): Promise<PaginatedResult<Repository>> {
  const params = new URLSearchParams();
  if (filters.query) params.set('query', filters.query);
  if (filters.category && filters.category !== 'all') params.set('category', filters.category);
  if (filters.collection && filters.collection !== 'all') params.set('collection', filters.collection);
  if (filters.language && filters.language !== 'all') params.set('language', filters.language);
  if (filters.minStars) params.set('minStars', String(filters.minStars));
  if (filters.maxStars) params.set('maxStars', String(filters.maxStars));
  if (filters.archived !== undefined && filters.archived !== null) params.set('archived', String(filters.archived));
  if (filters.sort) params.set('sort', filters.sort);
  if (filters.order) params.set('order', filters.order);
  if (filters.page) params.set('page', String(filters.page));
  if (filters.pageSize) params.set('pageSize', String(filters.pageSize));

  const res = await fetch(`/api/repositories?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch repositories');
  return res.json();
}

export async function fetchRepositoryDetail(id: number): Promise<Repository & { snapshots: any[]; related: Repository[] }> {
  const res = await fetch(`/api/repositories/${id}`);
  if (!res.ok) throw new Error('Failed to fetch repository details');
  return res.json();
}

export async function fetchTrending(): Promise<{
  trending_7d: Repository[];
  trending_30d: Repository[];
  newly_discovered: Repository[];
  most_popular: Repository[];
}> {
  const res = await fetch('/api/trending');
  if (!res.ok) throw new Error('Failed to fetch trending repositories');
  return res.json();
}

export async function fetchCollections(): Promise<Collection[]> {
  const res = await fetch('/api/collections');
  if (!res.ok) throw new Error('Failed to fetch collections');
  return res.json();
}

export async function fetchCollectionDetail(slugOrId: string): Promise<Collection & { repositories: Repository[] }> {
  const res = await fetch(`/api/collections/${slugOrId}`);
  if (!res.ok) throw new Error('Failed to fetch collection details');
  return res.json();
}

export async function createCollection(name: string, description?: string): Promise<Collection> {
  const res = await fetch('/api/collections', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description })
  });
  if (!res.ok) throw new Error('Failed to create collection');
  return res.json();
}

export async function addRepoToCollection(collectionId: string, repository_id: number): Promise<void> {
  const res = await fetch(`/api/collections/${collectionId}/repositories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ repository_id })
  });
  if (!res.ok) throw new Error('Failed to add repository to collection');
}

export async function removeRepoFromCollection(collectionId: string, repository_id: number): Promise<void> {
  const res = await fetch(`/api/collections/${collectionId}/repositories/${repository_id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to remove repository from collection');
}

export async function deleteCollection(collectionId: string): Promise<void> {
  const res = await fetch(`/api/collections/${collectionId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete collection');
}

export interface AdminStatus {
  rateLimit: {
    limit: number;
    remaining: number;
    reset: number;
    used: number;
  };
  jobs: SyncJob[];
  cursors: SyncCursor[];
  isSyncing: boolean;
  queries: Array<{ id: string; name: string; query: string }>;
}

export async function fetchAdminStatus(): Promise<AdminStatus> {
  const res = await fetch('/api/admin/status');
  if (!res.ok) throw new Error('Failed to fetch admin status');
  return res.json();
}

export async function triggerDiscoverySync(forceAll = false): Promise<any> {
  const res = await fetch('/api/admin/sync/discovery', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ forceAll })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to trigger discovery sync');
  }
  return res.json();
}

export async function triggerMetadataRefresh(): Promise<any> {
  const res = await fetch('/api/admin/sync/metadata', {
    method: 'POST'
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to trigger metadata refresh');
  }
  return res.json();
}
