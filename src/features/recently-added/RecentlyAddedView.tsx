import React from 'react';
import { Sparkles, Calendar, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Repository, PaginatedResult } from '../../types/index.js';
import { RepositoryCard } from '../repositories/RepositoryCard.js';

interface RecentlyAddedViewProps {
  repositories: PaginatedResult<Repository> | null;
  loading: boolean;
  page: number;
  onPageChange: (p: number) => void;
  isBookmarked: (id: number) => boolean;
  onToggleBookmark: (id: number) => void;
  onSelectRepository: (repo: Repository) => void;
  onSelectCategory: (slug: string) => void;
}

export const RecentlyAddedView: React.FC<RecentlyAddedViewProps> = ({
  repositories,
  loading,
  page,
  onPageChange,
  isBookmarked,
  onToggleBookmark,
  onSelectRepository,
  onSelectCategory
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="max-w-3xl">
        <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Continuous Vault Ingestion</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
          Recently Added Repositories
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Repositories newly discovered and indexed during automated 6-hour GitHub synchronization runs that satisfy the 1,000-star verification standard.
        </p>
      </div>

      {/* Main Grid */}
      <div>
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
          <div className="text-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-6">
            <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">No recently discovered repositories</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Automated synchronization will discover and add newly qualifying repositories on its next cron execution.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {repositories && repositories.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            Page <span className="font-mono font-medium text-slate-900 dark:text-white">{repositories.page}</span> of{' '}
            <span className="font-mono font-medium text-slate-900 dark:text-white">{repositories.totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => onPageChange(Math.min(repositories.totalPages, page + 1))}
              disabled={page >= repositories.totalPages}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
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
