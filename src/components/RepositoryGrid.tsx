import React, { useState, useMemo } from 'react';
import { RepositoryCard } from './RepositoryCard.js';
import type { Repository } from '../types/repository.js';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RepositoryGridProps {
  repositories: Repository[];
  pageSize?: number;
  onSelectCategory?: (category: string) => void;
  showPagination?: boolean;
}

export const RepositoryGrid: React.FC<RepositoryGridProps> = ({
  repositories,
  pageSize = 24,
  onSelectCategory,
  showPagination = true
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(repositories.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedRepos = useMemo(() => {
    if (!showPagination) return repositories;
    const start = (safePage - 1) * pageSize;
    return repositories.slice(start, start + pageSize);
  }, [repositories, safePage, pageSize, showPagination]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const el = document.getElementById('repository-grid-top');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (repositories.length === 0) {
    return (
      <div className="text-center py-16 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
        <h4 className="text-sm font-semibold text-slate-950 dark:text-white">
          No repositories found in this selection
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Select another category or switch to a different star tier.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8" id="repository-grid-top">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedRepos.map((repo) => (
          <RepositoryCard
            key={repo.id}
            repository={repo}
            onSelectCategory={onSelectCategory}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {showPagination && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <div>
            Showing <strong className="text-slate-950 dark:text-white font-mono tabular-nums">{(safePage - 1) * pageSize + 1}</strong> to{' '}
            <strong className="text-slate-950 dark:text-white font-mono tabular-nums">{Math.min(safePage * pageSize, repositories.length)}</strong> of{' '}
            <strong className="text-slate-950 dark:text-white font-mono tabular-nums">{repositories.length.toLocaleString()}</strong> repositories
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(safePage - 1)}
              disabled={safePage <= 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <span className="px-3 py-1.5 font-mono text-slate-700 dark:text-slate-300">
              Page {safePage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(safePage + 1)}
              disabled={safePage >= totalPages}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
