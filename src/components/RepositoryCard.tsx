import React, { useState } from 'react';
import { Star, GitFork, ExternalLink, Calendar, Scale, ShieldCheck } from 'lucide-react';
import type { Repository } from '../types/repository.js';

interface RepositoryCardProps {
  repository: Repository;
  onSelectCategory?: (category: string) => void;
  isPriority?: boolean;
}

const LANGUAGE_DOT_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572a5',
  Rust: '#dea584',
  Go: '#00add8',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Java: '#b07219',
  Kotlin: '#a97bff',
  Swift: '#f05138',
  Dart: '#00b4ab',
  PHP: '#4f5d95',
  Ruby: '#701516',
  Zig: '#ec915c',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Jupyter: '#da5b0b',
  Vue: '#41b883',
  Svelte: '#ff3e00'
};

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  repository,
  onSelectCategory,
  isPriority = false
}) => {
  const [imageError, setImageError] = useState(false);
  const lang = repository.language || 'Plain Text';
  const langColor = LANGUAGE_DOT_COLORS[lang] || '#94a3b8';

  const formatStars = (num: number) => {
    return num.toLocaleString('en-US');
  };

  const formatForks = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return String(num);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not recorded';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateString.slice(0, 7);
    }
  };

  // Monogram fallback (2 characters from owner or name)
  const monogram = (repository.owner ? repository.owner.slice(0, 2) : repository.name.slice(0, 2)).toUpperCase();

  // Authentic avatar URL from GitHub
  const avatarUrl = `https://github.com/${repository.owner}.png?size=80`;

  // Standardized description handling per requirements
  const rawDescription = repository.description?.trim();
  const hasDescription = Boolean(rawDescription && rawDescription.length > 0);
  const displayDescription = hasDescription
    ? rawDescription
    : 'Description not provided by the project maintainer.';

  return (
    <article className="group flex flex-col justify-between p-5 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
      <div>
        {/* Header: Project Logo / Monogram + Name/Owner + Star Count */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Genuine Logo with Resilient Fallback */}
            {!imageError ? (
              <img
                src={avatarUrl}
                alt={`${repository.owner} project logo`}
                referrerPolicy="no-referrer"
                loading={isPriority ? 'eager' : 'lazy'}
                decoding="async"
                width={36}
                height={36}
                onError={() => setImageError(true)}
                className="w-9 h-9 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shrink-0 object-cover"
              />
            ) : (
              <div
                className="w-9 h-9 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-mono text-[11px] font-semibold text-slate-600 dark:text-slate-300 shrink-0 select-none"
                aria-label={`${repository.owner} initial`}
              >
                {monogram}
              </div>
            )}

            <div className="min-w-0">
              <span className="block text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
                {repository.owner}
              </span>
              <h3 className="font-display text-base font-semibold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {repository.name}
              </h3>
            </div>
          </div>

          {/* Star count with tabular figures */}
          <div
            className="flex items-center gap-1.5 shrink-0 text-slate-800 dark:text-slate-200 font-mono text-xs tabular-nums font-semibold pt-0.5"
            title={`${formatStars(repository.stars)} verified GitHub stars`}
          >
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
            <span>{formatStars(repository.stars)}</span>
          </div>
        </div>

        {/* Repository description */}
        <p
          className={`mt-3.5 text-xs font-sans leading-relaxed line-clamp-3 ${
            hasDescription
              ? 'text-slate-600 dark:text-slate-300'
              : 'text-slate-400 dark:text-slate-500 italic'
          }`}
        >
          {displayDescription}
        </p>

        {/* Unboxed Metadata row: Language · Forks · Updated */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-sans">
          <span className="inline-flex items-center gap-1.5 shrink-0">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: langColor }}
              aria-hidden="true"
            />
            <span>{lang}</span>
          </span>

          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>

          <span className="inline-flex items-center gap-1 shrink-0 font-mono" title={`${repository.forks.toLocaleString()} forks`}>
            <GitFork className="w-3 h-3 text-slate-400" />
            <span>{formatForks(repository.forks)} forks</span>
          </span>

          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>

          <span className="inline-flex items-center gap-1 shrink-0" title={`Last updated: ${repository.updatedAt}`}>
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>Updated {formatDate(repository.updatedAt)}</span>
          </span>

          {repository.license && (
            <>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className="inline-flex items-center gap-1 shrink-0 font-mono text-[11px]" title={`License: ${repository.license}`}>
                <Scale className="w-3 h-3 text-slate-400" />
                <span>{repository.license}</span>
              </span>
            </>
          )}
        </div>

        {/* Categories as clean quiet text with separators */}
        {repository.categories && repository.categories.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400 font-sans">
            <span className="text-slate-400 dark:text-slate-500 font-medium">Category:</span>
            {repository.categories.map((cat, idx) => (
              <React.Fragment key={cat}>
                {idx > 0 && <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</span>}
                <button
                  type="button"
                  onClick={() => onSelectCategory && onSelectCategory(cat)}
                  className="hover:text-slate-900 dark:hover:text-slate-100 hover:underline transition-colors cursor-pointer text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 rounded-xs"
                >
                  {cat}
                </button>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Full Path + Direct GitHub Link */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 truncate" title={repository.fullName}>
          {repository.fullName}
        </span>

        <a
          href={repository.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${repository.fullName} on GitHub (opens in a new window)`}
          className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer shrink-0 font-sans focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 rounded-xs"
        >
          <span>View on GitHub</span>
          <ExternalLink className="w-3 h-3 text-slate-400" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
};
