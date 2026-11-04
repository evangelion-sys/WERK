import React, { useState } from 'react';
import { TrendingUp, Sparkles, Award, History, Info } from 'lucide-react';
import type { Repository } from '../../types/index.js';
import { RepositoryCard } from '../repositories/RepositoryCard.js';

interface TrendingViewProps {
  trendingData: {
    trending_7d: Repository[];
    trending_30d: Repository[];
    newly_discovered: Repository[];
    most_popular: Repository[];
  } | null;
  loading: boolean;
  isBookmarked: (id: number) => boolean;
  onToggleBookmark: (id: number) => void;
  onSelectRepository: (repo: Repository) => void;
  onSelectCategory: (slug: string) => void;
}

export const TrendingView: React.FC<TrendingViewProps> = ({
  trendingData,
  loading,
  isBookmarked,
  onToggleBookmark,
  onSelectRepository,
  onSelectCategory
}) => {
  const [activeTab, setActiveTab] = useState<'7d' | '30d' | 'new' | 'popular'>('7d');

  let activeList: Repository[] = [];
  if (trendingData) {
    if (activeTab === '7d') activeList = trendingData.trending_7d;
    else if (activeTab === '30d') activeList = trendingData.trending_30d;
    else if (activeTab === 'new') activeList = trendingData.newly_discovered;
    else if (activeTab === 'popular') activeList = trendingData.most_popular;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl">
        <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-2">
          Velocity & Popularity Intelligence
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
          Repository Growth & Trajectory
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Distinguishing genuine momentum from static star counts. Trends are computed from historical database snapshots recorded during automated synchronization intervals.
        </p>
      </div>

      {/* Snapshot Verification Notice */}
      <div className="mt-6 p-3.5 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/50 flex items-start gap-3 text-xs text-indigo-900 dark:text-indigo-300">
        <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Deterministic Snapshot Policy:</strong> Star growth metrics reflect actual star delta points collected by KERNEL REPO VAULT across 6-hour cron intervals. No synthetic growth figures or estimated trends are ever fabricated.
        </div>
      </div>

      {/* Segmented Control for Trending Modes */}
      <div className="mt-8 flex items-center gap-1.5 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit overflow-x-auto max-w-full">
        <button
          onClick={() => setActiveTab('7d')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
            activeTab === '7d'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
          <span>7-Day Growth</span>
        </button>

        <button
          onClick={() => setActiveTab('30d')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
            activeTab === '30d'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <History className="w-3.5 h-3.5 text-amber-500" />
          <span>30-Day Growth</span>
        </button>

        <button
          onClick={() => setActiveTab('new')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
            activeTab === 'new'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>Newly Discovered (≥1K)</span>
        </button>

        <button
          onClick={() => setActiveTab('popular')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
            activeTab === 'popular'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-purple-500" />
          <span>All-Time Most Popular</span>
        </button>
      </div>

      {/* Grid of Repositories */}
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
        ) : activeList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeList.map((repo) => (
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
          <div className="text-center py-12 text-slate-400 text-sm">
            No repositories found for this trajectory segment.
          </div>
        )}
      </div>
    </div>
  );
};
