import React, { useState } from 'react';
import { ArrowUpRight, Filter, Layers } from 'lucide-react';
import type { Category } from '../../types/index.js';

interface CategoriesViewProps {
  categories: Category[];
  onSelectCategory: (slug: string) => void;
}

const CATEGORY_GROUPS = [
  'All Disciplines',
  'Artificial Intelligence',
  'Development',
  'Design & Frontend',
  'Infrastructure',
  'Specialized'
];

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  onSelectCategory
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('All Disciplines');

  const filteredCategories = selectedGroup === 'All Disciplines'
    ? categories
    : categories.filter(c => c.group_name === selectedGroup);

  // Group by discipline
  const grouped = categories.reduce<Record<string, Category[]>>((acc, cat) => {
    if (!acc[cat.group_name]) acc[cat.group_name] = [];
    acc[cat.group_name].push(cat);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="max-w-3xl">
        <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wider">
          Taxonomy Architecture
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
          39 Engineering Disciplines & Ecosystems
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Repositories are categorized deterministically using verified GitHub topics, programming language signatures, and maintainer metadata. Each repository can belong to multiple categories without synthetic labels.
        </p>
      </div>

      {/* Segmented Discipline Filter */}
      <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit overflow-x-auto max-w-full">
        {CATEGORY_GROUPS.map((group) => (
          <button
            key={group}
            onClick={() => setSelectedGroup(group)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              selectedGroup === group
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Render Disciplines */}
      {selectedGroup === 'All Disciplines' ? (
        <div className="space-y-12">
          {Object.entries(grouped).map(([groupName, cats]) => (
            <div key={groupName} className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <Layers className="w-4 h-4 text-indigo-500" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  {groupName}
                </h2>
                <span className="text-xs font-mono text-slate-400">({cats.length} categories)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cats.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.slug)}
                    className="group p-5 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                        <span>slug: {cat.slug}</span>
                        <span className="tabular-nums font-semibold text-slate-700 dark:text-slate-300">
                          {cat.repository_count ? `${cat.repository_count.toLocaleString()} repos` : 'Indexing...'}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                        <span>{cat.name}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                      </h3>

                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline">
                        Explore Category →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="group p-5 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                  <span>{cat.group_name}</span>
                  <span className="tabular-nums font-semibold text-slate-700 dark:text-slate-300">
                    {cat.repository_count ? `${cat.repository_count.toLocaleString()} repos` : '0 repos'}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                </h3>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">slug: {cat.slug}</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline">
                  Explore Category →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
