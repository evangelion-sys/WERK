import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CATEGORIES, CATEGORY_GROUPS } from '../data/categories.js';
import type { Repository, TierKey } from '../types/repository.js';
import { updatePageSeo } from '../utils/seo.js';
import { trackPageView } from '../utils/analytics.js';

interface CategoriesDirectoryPageProps {
  activeTier: TierKey;
  allRepositories: Repository[];
  onSelectCategorySlug: (slug: string) => void;
  onBack: () => void;
}

export const CategoriesDirectoryPage: React.FC<CategoriesDirectoryPageProps> = ({
  activeTier,
  allRepositories,
  onSelectCategorySlug,
  onBack
}) => {
  useEffect(() => {
    updatePageSeo({
      title: 'Categories Directory — 40 Open-Source Technical Taxonomies',
      description: 'Browse 40 specialized open-source repository categories across AI, Frontend, Backend, Infrastructure, and Security disciplines on WERK.',
      path: '/categories',
      ogType: 'website'
    });
    trackPageView('categories');
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </button>

        <div className="pb-6 border-b border-slate-200 dark:border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Taxonomy Directory · 40 Categories
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
            Category Taxonomy Directory
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            40 specialized engineering classifications partitioned across 5 technical disciplines for the <strong className="text-slate-900 dark:text-white">{activeTier.toUpperCase()} Stars Tier</strong>.
          </p>
        </div>
      </div>

      {/* 5 Technical Groups */}
      <div className="space-y-12">
        {CATEGORY_GROUPS.map((group) => {
          const groupCategories = CATEGORIES.filter((c) => c.group === group);

          return (
            <div key={group} className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                  {group}
                </h2>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {groupCategories.length} Categories
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {groupCategories.map((cat) => {
                  const matchingCount = allRepositories.filter((r) =>
                    r.categories.includes(cat.name)
                  ).length;

                  return (
                    <article
                      key={cat.id}
                      onClick={() => onSelectCategorySlug(cat.slug)}
                      className="group p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-400 dark:hover:border-slate-600 transition-colors cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-base text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {cat.name}
                          </h3>
                          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0 tabular-nums">
                            {matchingCount} repos
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                          {cat.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 font-medium group-hover:translate-x-0.5 transition-transform">
                        <span>Browse category</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
