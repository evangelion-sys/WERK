import React from 'react';
import { Sparkles, Star, Layers, ShieldCheck, Github, ArrowDown } from 'lucide-react';
import { CATEGORIES, REPOSITORIES } from '../data/repositories.js';

interface VaultHeroProps {
  onScrollToCategory: (slug: string) => void;
  onViewAll: () => void;
  activeCategory: string | null;
}

export const VaultHero: React.FC<VaultHeroProps> = ({
  onScrollToCategory,
  onViewAll,
  activeCategory
}) => {
  const totalStars = REPOSITORIES.reduce((acc, r) => acc + r.stars, 0);
  const formattedTotalStars = `${(totalStars / 1_000_000).toFixed(1)}M+`;

  return (
    <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 pt-16 pb-14 transition-colors">
      {/* Subtle ambient background glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-40 dark:opacity-25"
      >
        <div className="w-[600px] h-[350px] bg-indigo-500/15 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Minimum 1k star qualification kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/50 mb-5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Verified Open Source · Minimum 1,000 GitHub Stars</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1] text-balance">
            Curated visual gallery of exceptional GitHub repositories.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            A hand-curated archive of 60 premier open-source projects organized into 12 technical categories. Every entry represents verified engineering excellence with a direct pathway to inspect and star on GitHub.
          </p>

          {/* Key quick action to jump into gallery */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 transition-colors shadow-xs cursor-pointer"
            >
              <span>Explore Gallery (60 Repositories)</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-xs"
            >
              <Github className="w-4 h-4" />
              <span>Official GitHub Network</span>
            </a>
          </div>
        </div>

        {/* Factual Stats Grid - No fabricated statistics */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-200/80 dark:border-slate-800/60">
          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>Curated Projects</span>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-slate-950 dark:text-white tabular-nums">
              {REPOSITORIES.length}
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Exactly 5 per category
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              <span>Cumulative Stars</span>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-slate-950 dark:text-white tabular-nums">
              {formattedTotalStars}
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Combined global community
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>Domains</span>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-slate-950 dark:text-white tabular-nums">
              {CATEGORIES.length}
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Curated software categories
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Star Threshold</span>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-slate-950 dark:text-white tabular-nums">
              ≥ 1,000
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Zero unverified repositories
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
