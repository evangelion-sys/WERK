import React from 'react';
import { Star, ExternalLink, GitBranch } from 'lucide-react';
import type { CuratedRepository } from '../data/repositories.js';

interface VaultCardProps {
  repository: CuratedRepository;
  onSelectCategory?: (categorySlug: string) => void;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Dart: '#00B4AB',
  Swift: '#F05138',
  Zig: '#ec915c',
  Shell: '#89e051'
};

export const VaultCard: React.FC<VaultCardProps> = ({
  repository,
  onSelectCategory
}) => {
  const langColor = LANGUAGE_COLORS[repository.language] || '#64748b';

  return (
    <article className="group relative flex flex-col justify-between p-6 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg transition-all duration-200 shadow-xs">
      <div>
        {/* Header: Owner Avatar + Name + Category kicker */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={`https://github.com/${repository.owner}.png?size=72`}
              alt={`${repository.owner} organization avatar`}
              className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shrink-0"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="min-w-0">
              <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
                {repository.owner}
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                {repository.name}
              </h3>
            </div>
          </div>

          {/* Star Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-amber-700 dark:text-amber-400 font-mono text-xs font-semibold tabular-nums shrink-0" title={`${repository.stars.toLocaleString()} stars`}>
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{repository.starsDisplay}</span>
          </div>
        </div>

        {/* Short description */}
        <p className="mt-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
          {repository.description}
        </p>

        {/* Unboxed Category & Language Metadata */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2 text-xs text-slate-500 dark:text-slate-400">
          <button
            onClick={() => onSelectCategory && onSelectCategory(repository.categorySlug)}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors cursor-pointer"
          >
            {repository.category}
          </button>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: langColor }}
            />
            <span>{repository.language}</span>
          </div>
        </div>
      </div>

      {/* Prominent Action Button: View Repository */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 truncate max-w-[140px]">
          {repository.fullName}
        </span>

        <a
          href={repository.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-white transition-colors cursor-pointer shadow-xs shrink-0"
        >
          <span>View Repository</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
};
