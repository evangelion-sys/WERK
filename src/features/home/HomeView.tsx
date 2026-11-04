import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Database,
  Star,
  Layers,
  FolderOpen,
  Search,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Terminal,
  Shield,
  Palette
} from 'lucide-react';
import type { Repository, Category, Collection, VaultStats } from '../../types/index.js';
import { RepositoryCard } from '../repositories/RepositoryCard.js';

interface HomeViewProps {
  stats: VaultStats | null;
  categories: Category[];
  collections: Collection[];
  recentRepositories: Repository[];
  popularRepositories: Repository[];
  isBookmarked: (id: number) => boolean;
  onToggleBookmark: (id: number) => void;
  onSelectRepository: (repo: Repository) => void;
  onSelectCategory: (slug: string) => void;
  onSelectCollection: (slug: string) => void;
  onNavigateTab: (tab: any) => void;
  onSearchSubmit: (query: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  stats,
  categories,
  collections,
  recentRepositories,
  popularRepositories,
  isBookmarked,
  onToggleBookmark,
  onSelectRepository,
  onSelectCategory,
  onSelectCollection,
  onNavigateTab,
  onSearchSubmit
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [activeCollectionTab, setActiveCollectionTab] = useState<string>('essential-ai-tools');

  const formatCompact = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`;
    return String(num);
  };

  const featuredCollections = collections.filter(c => c.is_featured);
  const currentSpotlight = collections.find(c => c.slug === activeCollectionTab) || collections[0];

  const handleSearchKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    }
  };

  // Group top categories for the featured categories section
  const featuredCategories = categories.slice(0, 8);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Premium Editorial Hero Section */}
      <section className="relative pt-14 pb-12 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Core Principle kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3 uppercase tracking-wider">
              <span>Discover once. Curate automatically. Present beautifully.</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.12]" style={{ textWrap: 'balance' }}>
              The living library of exceptional open-source engineering.
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              Kernel Repo Vault is a curated collection of verified GitHub projects with at least 1,000 stars. Every project is categorized, described, and continuously synchronized.
            </p>

            {/* Non-intrusive Search (Secondary Convenience) */}
            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleSearchKey}
                  placeholder="Quick lookup by name, technology, or keywords (press Enter)..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
                />
              </div>

              <button
                onClick={() => searchInput.trim() && onSearchSubmit(searchInput.trim())}
                className="px-5 py-2.5 text-xs font-medium rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-white transition-colors cursor-pointer shrink-0"
              >
                Search Vault
              </button>
            </div>
          </div>

          {/* Live Telemetry KPI Strip */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/60">
            <div className="p-4 rounded-lg bg-white dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <Database className="w-3.5 h-3.5 text-indigo-500" />
                <span>Indexed Vault</span>
              </div>
              <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-950 dark:text-white">
                {stats ? stats.total_repositories.toLocaleString() : '—'}
              </div>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Strictly ≥ 1,000 stars verified
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <Star className="w-3.5 h-3.5 text-amber-500" />
                <span>Aggregated Stars</span>
              </div>
              <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-950 dark:text-white">
                {stats ? formatCompact(stats.total_stars) : '—'}
              </div>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Verified developer endorsement
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <Layers className="w-3.5 h-3.5 text-emerald-500" />
                <span>Taxonomy Disciplines</span>
              </div>
              <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-950 dark:text-white">
                {stats ? stats.total_categories : 39} Categories
              </div>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Across 5 core engineering domains
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <FolderOpen className="w-3.5 h-3.5 text-purple-500" />
                <span>Editorial Stacks</span>
              </div>
              <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-950 dark:text-white">
                {stats ? stats.total_collections : 10} Collections
              </div>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Hand-curated thematic stacks
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white tracking-tight">
              Popular Engineering Categories
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Explore open-source ecosystems categorized deterministically from GitHub metadata.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('categories')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>View All 39 Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {featuredCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="p-4 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-left transition-all cursor-pointer group shadow-xs"
            >
              <div className="text-[11px] font-mono text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {cat.group_name}
              </div>
              <div className="mt-1 font-semibold text-sm text-slate-900 dark:text-white truncate">
                {cat.name}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span className="tabular-nums">{cat.repository_count || 0} repositories</span>
                <span className="text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Featured Repository Collection Spotlight */}
      {currentSpotlight && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-br from-indigo-950/10 via-slate-900/20 to-slate-900/40 border border-indigo-500/20 dark:border-indigo-500/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/40 dark:border-slate-800/80">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                  Spotlight Collection
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                  {currentSpotlight.name}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
                  {currentSpotlight.description}
                </p>
              </div>

              {/* Segmented controls for switching spotlight */}
              {featuredCollections.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-white/70 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                  {featuredCollections.slice(0, 4).map((col) => (
                    <button
                      key={col.id}
                      onClick={() => setActiveCollectionTab(col.slug)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                        activeCollectionTab === col.slug
                          ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {col.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick link to full collection */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => onSelectCollection(currentSpotlight.slug)}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Explore Entire Collection ({currentSpotlight.repository_count || 0} projects)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4. Recently Added Repositories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Recently Discovered Repositories</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Newly synchronized open-source projects crossing the 1,000-star verification threshold.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('recently-added')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>View All Recently Added</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recentRepositories.slice(0, 6).map((repo) => (
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
      </section>

      {/* 5. Popular Landmark Repositories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500/20" />
              <span>Popular Landmark Projects</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              The highest-starred foundational repositories archived in the vault.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('trending')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>View Trending & Popular</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularRepositories.slice(0, 6).map((repo) => (
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
      </section>

      {/* 6. Curated Editorial Collections Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white tracking-tight">
              Curated Thematic Collections
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Editorial collections grouping verified open-source libraries around practical developer workflows.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('collections')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Browse All Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => onSelectCollection(col.slug)}
              className="group p-5 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                  <span>Stack</span>
                  <span className="tabular-nums font-semibold text-slate-700 dark:text-slate-300">
                    {col.repository_count || 0} repositories
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {col.name}
                </h3>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {col.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">slug: {col.slug}</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
