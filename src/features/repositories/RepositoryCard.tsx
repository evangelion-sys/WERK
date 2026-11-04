import React from 'react';
import { Star, GitFork, ExternalLink, Bookmark, ShieldAlert } from 'lucide-react';
import type { Repository } from '../../types/index.js';

interface RepositoryCardProps {
  repository: Repository;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  onSelectRepository: (repo: Repository) => void;
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
  Java: '#b07219',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Dart: '#00B4AB',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051'
};

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  repository,
  isBookmarked,
  onToggleBookmark,
  onSelectRepository,
  onSelectCategory
}) => {
  const formatStars = (count: number) => {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}k`;
    return String(count);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const langColor = repository.language ? LANGUAGE_COLORS[repository.language] || '#8b949e' : null;

  return (
    <div className="group relative flex flex-col justify-between p-5 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-150 shadow-xs">
      <div>
        {/* Header row: Owner/avatar + full name + bookmark action */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={`https://github.com/${repository.owner}.png?size=64`}
              alt={`${repository.owner} avatar`}
              className="w-7 h-7 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shrink-0"
              onError={(e) => {
                // Fallback container on avatar error
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <button
              onClick={() => onSelectRepository(repository)}
              className="text-left font-semibold text-sm sm:text-base text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate"
              title={repository.full_name}
            >
              <span className="font-normal text-slate-500 dark:text-slate-400">{repository.owner} / </span>
              <span>{repository.name}</span>
            </button>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(repository.id);
              }}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark repository'}
              aria-label="Bookmark repository"
              className={`p-1.5 rounded-md transition-colors ${
                isBookmarked
                  ? 'text-amber-500 hover:text-amber-600 dark:hover:text-amber-400'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              title="Open repository on GitHub"
              aria-label="Open on GitHub"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Description */}
        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {repository.description || 'No description provided by repository maintainers.'}
        </p>

        {/* Zero-Pill Categories metadata with typographic separator */}
        {repository.categories && repository.categories.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
            {repository.categories.slice(0, 3).map((cat, idx) => (
              <React.Fragment key={cat.id}>
                {idx > 0 && <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>}
                <button
                  onClick={() => onSelectCategory && onSelectCategory(cat.slug)}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {cat.name}
                </button>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Footer metadata: Stars, Forks, Language, Updated Date */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium tabular-nums" title={`${repository.stars.toLocaleString()} stars`}>
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
            <span>{formatStars(repository.stars)}</span>
          </div>

          <div className="flex items-center gap-1 tabular-nums" title={`${repository.forks.toLocaleString()} forks`}>
            <GitFork className="w-3.5 h-3.5 text-slate-400" />
            <span>{formatStars(repository.forks)}</span>
          </div>

          {repository.is_archived && (
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400" title="Archived on GitHub">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="font-sans text-[11px]">Archived</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {repository.language && (
            <div className="flex items-center gap-1.5 font-sans text-xs">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: langColor || '#888' }}
              />
              <span className="text-slate-600 dark:text-slate-300">{repository.language}</span>
            </div>
          )}

          <span className="text-slate-400 dark:text-slate-600">·</span>
          <span className="text-[11px] text-slate-400 font-sans" title={`Updated ${formatDate(repository.updated_at_github)}`}>
            {formatDate(repository.updated_at_github)}
          </span>
        </div>
      </div>
    </div>
  );
};
