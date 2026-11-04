export interface Repository {
  id: number;
  owner: string;
  name: string;
  fullName: string;
  description: string | null;
  githubUrl: string;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  categories: string[];
  license: string | null;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  verifiedAt: string;
  source: string;
}

export type TierKey = '1k' | '5k' | '10k';

export type CategoryGroup =
  | 'Artificial Intelligence'
  | 'Frontend Development'
  | 'Backend & Engineering'
  | 'Infrastructure'
  | 'Specialized';

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  group: CategoryGroup;
  description: string;
}

export interface CuratedCollection {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  featuredRepoFullNames: string[];
  badgeColor?: string;
  tagline: string;
}
