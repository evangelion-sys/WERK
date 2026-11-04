import React from 'react';
import { RepositoryCard } from './RepositoryCard.js';
import type { Repository, CategoryInfo } from '../types/repository.js';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface CategorySectionProps {
  category: CategoryInfo;
  repositories: Repository[];
  index: number;
  onViewCategory: (categorySlug: string) => void;
  onSelectCategory?: (category: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  repositories,
  index,
  onViewCategory,
  onSelectCategory
}) => {
  // Show top 6 repositories in this category section
  const previewRepos = repositories.slice(0, 6);

  if (repositories.length === 0) return null;

  return (
    <section id={`category-${category.slug}`} className="scroll-mt-24 space-y-5">
      {/* Category Heading Zone */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {category.group}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            {category.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>{repositories.length.toLocaleString()} Repos</span>
          </span>

          <button
            onClick={() => onViewCategory(category.slug)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors cursor-pointer"
          >
            <span>View All ({repositories.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid of repositories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {previewRepos.map((repo) => (
          <RepositoryCard
            key={repo.id}
            repository={repo}
            onSelectCategory={onSelectCategory}
          />
        ))}
      </div>
    </section>
  );
};
