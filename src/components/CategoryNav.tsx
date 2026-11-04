import React from 'react';
import { CATEGORIES } from '../data/repositories.js';
import { Layers } from 'lucide-react';

interface CategoryNavProps {
  activeCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory
}) => {
  return (
    <div className="sticky top-16 z-30 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            onClick={() => onSelectCategory(null)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 cursor-pointer ${
              activeCategory === null
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Categories (12)</span>
          </button>

          <span className="text-slate-300 dark:text-slate-700 mx-0.5">|</span>

          {CATEGORIES.map((cat, index) => {
            const isSelected = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white font-semibold shadow-xs'
                    : 'bg-slate-100/70 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800/80'
                }`}
              >
                <span className="text-[10px] font-mono opacity-60">
                  {String(index + 1).padStart(2, '0')}.
                </span>
                <span>{cat.name}</span>
                <span
                  className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? 'bg-indigo-700/60 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
