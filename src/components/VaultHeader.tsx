import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/repositories.js';

interface VaultHeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  activeCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
}

export const VaultHeader: React.FC<VaultHeaderProps> = ({
  isDark,
  onToggleTheme,
  activeCategory,
  onSelectCategory
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <button
          onClick={() => {
            onSelectCategory(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-base sm:text-lg font-bold tracking-tight text-slate-950 dark:text-white whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity flex items-center gap-2.5 cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-xs bg-indigo-600 dark:bg-indigo-500"></span>
          <span>KERNEL REPO VAULT</span>
        </button>

        {/* Category Jump Selector */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto text-xs font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === null
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Categories (60)
          </button>

          <span className="text-slate-300 dark:text-slate-800">|</span>

          {CATEGORIES.slice(0, 5).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`px-2.5 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat.slug
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Action: Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>60 Verified Repos</span>
          </span>

          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
