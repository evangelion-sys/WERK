import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  LayoutGrid,
  List
} from 'lucide-react';
import type { Repository, Category, RepositoryFilters, PaginatedResult } from '../../types/index.js';
import { RepositoryCard } from '../repositories/RepositoryCard.js';

interface DiscoveryViewProps {
  repositories: PaginatedResult<Repository> | null;
  categories: Category[];
  filters: RepositoryFilters;
  onFilterChange: (newFilters: Partial<RepositoryFilters>) => void;
  onResetFilters: () => void;
  loading: boolean;
  isBookmarked: (id: number) => boolean;
  onToggleBookmark: (id: number) => void;
  onSelectRepository: (repo: Repository) => void;
  onSelectCategory: (slug: string) => void;
}

const COMMON_LANGUAGES = [
  'All',
  'TypeScript',
  'JavaScript',
  'Python',
  'Rust',
  'Go',
  'C++',
  'C',
  'Java',
  'Dart',
  'Swift',
  'Kotlin',
  'Vue',
  'Svelte'
];

const STAR_PRESETS = [
  { label: '≥ 1,000 Stars (Default)', value: 1000 },
  { label: '≥ 5,000 Stars', value: 5000 },
  { label: '≥ 10,000 Stars', value: 10000 },
  { label: '≥ 50,000 Stars', value: 50000 },
  { label: '≥ 100,000 Stars', value: 100000 }
];

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({
  repositories,
  categories,
  filters,
  onFilterChange,
  onResetFilters,
  loading,
  isBookmarked,
  onToggleBookmark,
  onSelectRepository,
  onSelectCategory
}) => {
  const [searchInput, setSearchInput] = useState(filters.query || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== (filters.query || '')) {
        onFilterChange({ query: searchInput, page: 1 });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Keep search input synced if external change happens
  useEffect(() => {
    if (filters.query !== undefined && filters.query !== searchInput) {
      setSearchInput(filters.query);
    }
  }, [filters.query]);

  const hasActiveFilters = Boolean(
    (filters.query && filters.query.trim()) ||
    (filters.category && filters.category !== 'all') ||
    (filters.language && filters.language !== 'all') ||
    (filters.minStars && filters.minStars > 1000) ||
    filters.archived !== undefined ||
    (filters.sort && filters.sort !== 'stars')
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by repository name, owner, description, or topics..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          {/* Action Row: Sort, View mode, Filter drawer toggle */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 md:pb-0">
            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 shrink-0">
              <span className="hidden sm:inline font-medium">Sort:</span>
              <select
                value={filters.sort || 'stars'}
                onChange={(e) => onFilterChange({ sort: e.target.value as any, page: 1 })}
                className="text-xs px-2.5 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="stars">Most Stars</option>
                <option value="forks">Most Forks</option>
                <option value="updated">Recently Updated</option>
                <option value="discovered">Newly Discovered</option>
              </select>
            </div>

            {/* Toggle Grid vs List */}
            <div className="flex items-center p-0.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
                title="List view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-md transition-colors shrink-0"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Secondary Filter Bar (Responsive) */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 ${showFiltersMobile ? 'block' : 'hidden md:grid'}`}>
          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
              Category
            </label>
            <select
              value={filters.category || 'all'}
              onChange={(e) => onFilterChange({ category: e.target.value, page: 1 })}
              className="w-full text-xs px-2.5 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All 25 Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name} {c.repository_count ? `(${c.repository_count})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
              Language
            </label>
            <select
              value={filters.language || 'All'}
              onChange={(e) => onFilterChange({ language: e.target.value === 'All' ? undefined : e.target.value, page: 1 })}
              className="w-full text-xs px-2.5 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              {COMMON_LANGUAGES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* Minimum Stars */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
              Minimum Stars
            </label>
            <select
              value={filters.minStars || 1000}
              onChange={(e) => onFilterChange({ minStars: parseInt(e.target.value, 10), page: 1 })}
              className="w-full text-xs px-2.5 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              {STAR_PRESETS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Archive Status */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
              Repository Status
            </label>
            <select
              value={filters.archived === undefined ? 'all' : filters.archived ? 'archived' : 'active'}
              onChange={(e) => {
                const val = e.target.value;
                onFilterChange({
                  archived: val === 'all' ? undefined : val === 'archived',
                  page: 1
                });
              }}
              className="w-full text-xs px-2.5 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">Active & Archived</option>
              <option value="active">Active Only</option>
              <option value="archived">Archived Only</option>
            </select>
          </div>
        </div>

        {/* Filter Summary and Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
          <div>
            <span>Showing </span>
            <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
              {repositories ? repositories.total.toLocaleString() : 0}
            </span>
            <span> qualifying repositories with 1,000+ stars</span>
          </div>

          {filters.category && filters.category !== 'all' && (
            <div className="flex items-center gap-1.5">
              <span>Category: </span>
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                {categories.find(c => c.slug === filters.category)?.name || filters.category}
              </span>
              <button
                onClick={() => onFilterChange({ category: 'all', page: 1 })}
                className="text-slate-400 hover:text-slate-600 ml-1"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Repositories Grid or Skeleton */}
      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-44 rounded-lg bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 animate-pulse p-5"
              />
            ))}
          </div>
        ) : repositories && repositories.data.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {repositories.data.map((repo) => (
                <RepositoryCard
                  key={repo.id}
                  repository={repo}
                  isBookmarked={isBookmarked(repo.id)}
                  onToggleBookmark={onToggleBookmark}
                  onSelectRepository={onSelectRepository}
                  onSelectCategory={onSelectCategory}
                />
              ))}
            </div>
          ) : (
            <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900/40 divide-y divide-slate-100 dark:divide-slate-800/80">
              {repositories.data.map((repo) => (
                <div
                  key={repo.id}
                  onClick={() => onSelectRepository(repo)}
                  className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900 dark:text-white hover:text-indigo-600 transition-colors">
                        {repo.full_name}
                      </span>
                      {repo.language && (
                        <span className="text-xs text-slate-400">· {repo.language}</span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {repo.description || 'No description provided'}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 text-xs font-mono text-slate-600 dark:text-slate-300 tabular-nums shrink-0">
                    <div>★ {repo.stars.toLocaleString()}</div>
                    <div>⑂ {repo.forks.toLocaleString()}</div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(repo.id);
                      }}
                      className="p-1 hover:text-amber-500"
                    >
                      {isBookmarked(repo.id) ? '★ Saved' : '☆ Save'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16 px-4 rounded-lg border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
            <Filter className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              No matching repositories found
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any repositories matching your exact filter criteria with at least 1,000 stars.
            </p>
            <button
              onClick={onResetFilters}
              className="mt-4 px-4 py-2 text-xs font-medium rounded-md bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {repositories && repositories.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            Page <span className="font-mono font-medium text-slate-900 dark:text-white">{repositories.page}</span> of{' '}
            <span className="font-mono font-medium text-slate-900 dark:text-white">{repositories.totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onFilterChange({ page: Math.max(1, (filters.page || 1) - 1) })}
              disabled={(filters.page || 1) <= 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => onFilterChange({ page: Math.min(repositories.totalPages, (filters.page || 1) + 1) })}
              disabled={(filters.page || 1) >= repositories.totalPages}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
