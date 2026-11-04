import React, { useState, useMemo, useEffect } from 'react';
import { Star, GitFork, Calendar, ChevronLeft, ChevronRight, X, ArrowUpRight, Filter, ChevronDown, Check } from 'lucide-react';
import { RepositoryCard } from '../components/RepositoryCard.js';
import { CATEGORIES, CATEGORY_GROUPS } from '../data/categories.js';
import type { Repository, TierKey, CategoryInfo } from '../types/repository.js';
import { updatePageSeo } from '../utils/seo.js';
import { trackPageView } from '../utils/analytics.js';

interface VaultPageProps {
  repositories: Repository[];
  activeTier: TierKey;
  onSelectTier: (tier: TierKey) => void;
  selectedCategorySlug?: string;
  onSelectCategorySlug: (slug?: string) => void;
  isLoading: boolean;
}

type SortOption = 'stars' | 'forks' | 'updated' | 'alpha';

export const VaultPage: React.FC<VaultPageProps> = ({
  repositories,
  activeTier,
  onSelectTier,
  selectedCategorySlug,
  onSelectCategorySlug,
  isLoading
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('stars');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState<boolean>(false);
  const pageSize = 24;

  // Compute live count of repositories per category in the currently loaded tier
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const repo of repositories) {
      if (repo.categories) {
        for (const catName of repo.categories) {
          counts[catName] = (counts[catName] || 0) + 1;
        }
      }
    }
    return counts;
  }, [repositories]);

  // Active category object
  const activeCategory = useMemo(() => {
    if (!selectedCategorySlug) return null;
    return CATEGORIES.find((c) => c.slug === selectedCategorySlug) || null;
  }, [selectedCategorySlug]);

  // Filter repositories by selected category (if any)
  const filteredRepositories = useMemo(() => {
    if (!activeCategory) return repositories;
    return repositories.filter((r) => r.categories.includes(activeCategory.name));
  }, [repositories, activeCategory]);

  // Sort filtered repositories deterministically
  const sortedRepositories = useMemo(() => {
    const list = [...filteredRepositories];
    if (sortBy === 'stars') {
      return list.sort((a, b) => b.stars - a.stars);
    }
    if (sortBy === 'forks') {
      return list.sort((a, b) => b.forks - a.forks);
    }
    if (sortBy === 'updated') {
      return list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }
    if (sortBy === 'alpha') {
      return list.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    }
    return list;
  }, [filteredRepositories, sortBy]);

  // Reset pagination when category, tier, or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategorySlug, activeTier, sortBy]);

  // Dynamic SEO title & description
  useEffect(() => {
    const title = activeCategory
      ? `${activeCategory.name} (${activeTier.toUpperCase()} Tier) — Library`
      : `Library (${activeTier.toUpperCase()} Tier) — 15,000 Verified Repositories`;
    const description = activeCategory
      ? `Browse verified ${activeCategory.name} repositories in the ${activeTier.toUpperCase()} star tier on WERK.`
      : `Browse 15,000 verified open-source GitHub repositories partitioned into 1K+, 5K+, and 10K+ star tiers across 40 technical disciplines.`;

    updatePageSeo({
      title,
      description,
      path: '/vault',
      ogType: 'website'
    });
    trackPageView('vault');
  }, [activeCategory, activeTier]);

  // Paginated slice
  const totalPages = Math.max(1, Math.ceil(sortedRepositories.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedRepos = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return sortedRepositories.slice(start, start + pageSize);
  }, [sortedRepositories, safePage, pageSize]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const el = document.getElementById('vault-content-top');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCategory = (slug?: string) => {
    onSelectCategorySlug(slug);
    setMobileCategoriesOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" id="vault-content-top">
      {/* 1. Header bar: Title + Star Tier Switcher */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              A KERNEL.dev Project · Curated Repository Library
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
              WERK Library
            </h1>
            <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Browse 15,000 verified open-source software repositories partitioned into discrete star tiers. Filter by category to explore domain-specific tools.
            </p>
          </div>

          {/* Star Tier Switcher (Segmented, non-pill) */}
          <div
            role="radiogroup"
            aria-label="Star tiers"
            className="flex items-center p-1 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start md:self-auto shrink-0 font-sans"
          >
            {(['10k', '5k', '1k'] as TierKey[]).map((tier) => {
              const label = tier === '10k' ? '10K+ Stars' : tier === '5k' ? '5K+ Stars' : '1K+ Stars';
              const isActive = activeTier === tier;
              return (
                <button
                  key={tier}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => onSelectTier(tier)}
                  className={`px-3 py-1.5 rounded-sm font-mono text-xs font-medium transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Active Category Banner (When a specific category is selected) */}
      {activeCategory && (
        <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
              <span>{activeCategory.group}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span>{activeTier.toUpperCase()} Stars Tier</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              {activeCategory.name}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {activeCategory.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 tabular-nums">
              {sortedRepositories.length.toLocaleString()} repositories
            </span>

            <button
              onClick={() => handleSelectCategory(undefined)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>All Categories</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Mobile Category Trigger */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileCategoriesOpen((prev) => !prev)}
          aria-expanded={mobileCategoriesOpen}
          aria-controls="mobile-categories-list"
          aria-label={`Category filter: currently ${activeCategory ? activeCategory.name : 'All Categories'}`}
          className="w-full flex items-center justify-between p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" aria-hidden="true" />
            <span>Category: <strong>{activeCategory ? activeCategory.name : 'All Categories'}</strong></span>
            <span className="font-mono text-slate-400">({sortedRepositories.length.toLocaleString()})</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileCategoriesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>

        {mobileCategoriesOpen && (
          <nav
            id="mobile-categories-list"
            aria-label="Mobile categories filter"
            className="mt-2 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 max-h-80 overflow-y-auto space-y-4 text-xs font-sans"
          >
            <button
              type="button"
              onClick={() => handleSelectCategory(undefined)}
              className={`w-full flex items-center justify-between p-2 rounded-md text-left transition-colors cursor-pointer ${
                !activeCategory
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>All Repositories</span>
              <span className="font-mono text-[11px] opacity-75">{repositories.length.toLocaleString()}</span>
            </button>

            {CATEGORY_GROUPS.map((group) => {
              const groupCats = CATEGORIES.filter(
                (c) => c.group === group && (categoryCounts[c.name] || 0) > 0
              );
              if (groupCats.length === 0) return null;

              return (
                <div key={group} className="space-y-1">
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 pt-1">
                    {group}
                  </span>
                  {groupCats.map((cat) => {
                    const count = categoryCounts[cat.name] || 0;
                    const isSelected = activeCategory?.slug === cat.slug;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleSelectCategory(cat.slug)}
                        className={`w-full flex items-center justify-between p-2 rounded-md text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 font-semibold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="truncate pr-2">{cat.name}</span>
                        <span className="font-mono text-[11px] opacity-75 shrink-0">{count}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        )}
      </div>

      {/* 4. Main Layout: Sidebar (Desktop) + Repository Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Category Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 space-y-6 text-xs font-sans scrollbar-thin">
          <nav aria-label="Category navigation" className="space-y-6">
            <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="font-display font-semibold text-slate-950 dark:text-white uppercase tracking-wider text-[11px]">
                Categories
              </span>
              <span className="font-mono text-slate-400 dark:text-slate-500 text-[11px]">
                {repositories.length.toLocaleString()} Repos
              </span>
            </div>

            {/* All Repositories Option */}
          <button
            onClick={() => handleSelectCategory(undefined)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors cursor-pointer ${
              !activeCategory
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 font-semibold shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <span className="font-medium">All Repositories</span>
            <span className="font-mono text-[11px] opacity-75 tabular-nums">
              {repositories.length.toLocaleString()}
            </span>
          </button>

          {/* Grouped Categories with Live Counts */}
          {CATEGORY_GROUPS.map((group) => {
            const groupCats = CATEGORIES.filter(
              (c) => c.group === group && (categoryCounts[c.name] || 0) > 0
            );
            if (groupCats.length === 0) return null;

            return (
              <div key={group} className="space-y-1.5">
                <span className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 pt-1">
                  {group}
                </span>

                <div className="space-y-0.5">
                  {groupCats.map((cat) => {
                    const count = categoryCounts[cat.name] || 0;
                    const isSelected = activeCategory?.slug === cat.slug;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectCategory(cat.slug)}
                        title={cat.description}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-left transition-colors cursor-pointer group ${
                          isSelected
                            ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 font-semibold shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                        }`}
                      >
                        <span className="truncate pr-2">{cat.name}</span>
                        <span className="font-mono text-[11px] opacity-70 group-hover:opacity-100 shrink-0 tabular-nums">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          </nav>
        </aside>

        {/* Primary Repository Content Area */}
        <section className="lg:col-span-9 space-y-6">
          {/* Sorting Strip & Count Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 text-xs font-sans">
            <div className="text-slate-600 dark:text-slate-400">
              <span>Showing </span>
              <strong className="text-slate-950 dark:text-white font-mono tabular-nums">
                {sortedRepositories.length > 0 ? (safePage - 1) * pageSize + 1 : 0}–{Math.min(safePage * pageSize, sortedRepositories.length)}
              </strong>
              <span> of </span>
              <strong className="text-slate-950 dark:text-white font-mono tabular-nums">
                {sortedRepositories.length.toLocaleString()}
              </strong>
              <span> repositories in </span>
              <strong className="text-slate-950 dark:text-white font-mono uppercase">
                {activeTier} Tier
              </strong>
              {activeCategory && (
                <span> ({activeCategory.name})</span>
              )}
            </div>

            {/* Deterministic Sorting Options */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Sort:</span>
              <div
                role="radiogroup"
                aria-label="Sort repositories by"
                className="flex items-center p-0.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-sans"
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={sortBy === 'stars'}
                  onClick={() => setSortBy('stars')}
                  className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 ${
                    sortBy === 'stars'
                      ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  Most Stars
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={sortBy === 'forks'}
                  onClick={() => setSortBy('forks')}
                  className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 ${
                    sortBy === 'forks'
                      ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  Most Forks
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={sortBy === 'updated'}
                  onClick={() => setSortBy('updated')}
                  className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 ${
                    sortBy === 'updated'
                      ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  Recently Updated
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={sortBy === 'alpha'}
                  onClick={() => setSortBy('alpha')}
                  className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 ${
                    sortBy === 'alpha'
                      ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  A–Z
                </button>
              </div>
            </div>
          </div>

          {/* Repository Cards Grid */}
          {paginatedRepos.length === 0 ? (
            <div className="text-center py-20 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 space-y-3">
              <h3 className="font-display text-base font-semibold text-slate-950 dark:text-white">
                No matching repositories found in this category
              </h3>
              <p className="font-sans text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                No projects in the {activeTier.toUpperCase()} tier are currently assigned to this category.
              </p>
              <button
                type="button"
                onClick={() => handleSelectCategory(undefined)}
                className="mt-2 px-4 py-2 text-xs font-semibold rounded-md bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-white transition-colors cursor-pointer font-sans"
              >
                Return to All Repositories
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {paginatedRepos.map((repo, idx) => (
                <RepositoryCard
                  key={repo.id}
                  repository={repo}
                  isPriority={idx < 4}
                  onSelectCategory={(catName) => {
                    const found = CATEGORIES.find((c) => c.name.toLowerCase() === catName.toLowerCase());
                    if (found) handleSelectCategory(found.slug);
                  }}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs font-sans text-slate-600 dark:text-slate-400"
            >
              <div>
                Page <span className="font-mono font-semibold text-slate-950 dark:text-white">{safePage}</span> of{' '}
                <span className="font-mono font-semibold text-slate-950 dark:text-white">{totalPages}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePageChange(safePage - 1)}
                  disabled={safePage <= 1}
                  aria-label="Previous page"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer font-sans"
                >
                  <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Previous</span>
                </button>

                <span
                  aria-current="page"
                  className="px-3 py-1.5 font-mono font-semibold text-slate-900 dark:text-slate-100"
                >
                  {safePage} / {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => handlePageChange(safePage + 1)}
                  disabled={safePage >= totalPages}
                  aria-label="Next page"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer font-sans"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </nav>
          )}
        </section>
      </div>
    </div>
  );
};
