import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { CuratedCollection, Repository } from '../types/repository.js';

interface CollectionSectionProps {
  collections: CuratedCollection[];
  allRepositories: Repository[];
  onSelectCollection: (slug: string) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  collections,
  allRepositories,
  onSelectCollection
}) => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Curated Architectural Ensembles
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            Curated Collections
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Hand-assembled groupings of complementary open-source repositories designed to work together.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((coll) => {
          return (
            <article
              key={coll.id}
              className="group flex flex-col justify-between p-6 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span>Stack</span>
                  <span>{coll.featuredRepoFullNames.length} Repositories</span>
                </div>

                <h3 className="text-base font-semibold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {coll.title}
                </h3>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {coll.description}
                </p>

                {/* Key projects as quiet text with slashes */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/70 text-xs">
                  <span className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                    Key Repositories:
                  </span>
                  <div className="text-xs font-mono text-slate-700 dark:text-slate-300">
                    {coll.featuredRepoFullNames.map((name) => name.split('/')[1] || name).join(' · ')}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/70">
                <button
                  onClick={() => onSelectCollection(coll.slug)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-white transition-colors cursor-pointer"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
