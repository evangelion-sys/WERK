export interface Repository {
  id: number;
  github_id: number;
  owner: string;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  open_issues: number;
  topics: string[];
  license: string | null;
  created_at_github: string | null;
  updated_at_github: string | null;
  pushed_at_github: string | null;
  first_discovered_at: string;
  last_synced_at: string;
  is_archived: boolean;
  is_fork: boolean;
  eligibility_status: 'eligible' | 'under_review' | 'ineligible';
  categories?: Category[];
  growth_7d?: number;
  growth_30d?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  group_name: string;
  display_order: number;
  repository_count?: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  cover_image?: string;
  is_featured: boolean;
  created_at: string;
  repository_count?: number;
  repository_ids?: number[];
  repositories?: Repository[];
}

export interface RepositorySnapshot {
  id: number;
  repository_id: number;
  stars: number;
  forks: number;
  recorded_at: string;
}

export interface SyncJob {
  id: string;
  started_at: string;
  completed_at: string | null;
  status: 'running' | 'completed' | 'failed';
  discovered_count: number;
  inserted_count: number;
  updated_count: number;
  failed_count: number;
  error_summary: string | null;
}

export interface SyncCursor {
  query_key: string;
  cursor: number;
  last_successful_sync: string | null;
  status: string;
}

export interface VaultStats {
  total_repositories: number;
  total_categories: number;
  total_collections: number;
  total_stars: number;
  total_stars_indexed?: number;
  last_successful_sync: string | null;
  next_scheduled_sync: string | null;
  current_sync_status: 'idle' | 'running' | 'failed';
  discovered_recently: number;
  rate_limit: {
    limit: number;
    remaining: number;
    reset: number;
    used: number;
  };
}

export type PlatformStats = VaultStats;

export interface RepositoryFilters {
  query?: string;
  category?: string;
  collection?: string;
  language?: string;
  minStars?: number;
  maxStars?: number;
  archived?: boolean | null;
  sort?: 'stars' | 'forks' | 'updated' | 'discovered';
  order?: 'desc' | 'asc';
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
