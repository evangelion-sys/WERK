import React from 'react';
import { Layers, Star, ShieldCheck, Sparkles, ArrowDown, FolderGit2, CheckCircle2 } from 'lucide-react';
import type { TierKey } from '../types/repository.js';

interface HeroProps {
  activeTier: TierKey;
  onSelectTier: (tier: TierKey) => void;
  onScrollToGallery: () => void;
  onNavigateToCategories: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  activeTier,
  onSelectTier,
  onScrollToGallery,
  onNavigateToCategories
}) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 pt-14 pb-12 transition-colors">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-30 dark:opacity-20"
      >
        <div className="w-[650px] h-[320px] bg-indigo-500/20 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Authentic verification badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/50 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>15,000 Verified Records · 3 Tiers · Zero Fabricated Data</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1] text-balance">
            The definitive open-source repository archive.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            A comprehensive, pre-populated library of exceptional open-source GitHub repositories partitioned into three verified star tiers. Browse foundational machine learning engines, full-stack frameworks, cloud infrastructure, and security arsenals.
          </p>

          {/* Tier Selection Quick Bar in Hero */}
          <div className="mt-8 p-1.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 inline-flex flex-col sm:flex-row items-stretch sm:items-center gap-1 shadow-xs">
            <span className="text-xs font-semibold px-3 py-1 text-slate-500 dark:text-slate-400 sm:border-r border-slate-200 dark:border-slate-800">
              Active Tier:
            </span>

            <button
              onClick={() => onSelectTier('10k')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTier === '10k'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>10K+ Stars Tier</span>
              <span className="font-mono text-[10px] opacity-75">(5,000 Repos)</span>
            </button>

            <button
              onClick={() => onSelectTier('5k')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTier === '5k'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-500" />
              <span>5K+ Stars Tier</span>
              <span className="font-mono text-[10px] opacity-75">(5,000 Repos)</span>
            </button>

            <button
              onClick={() => onSelectTier('1k')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTier === '1k'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-slate-400" />
              <span>1K+ Stars Tier</span>
              <span className="font-mono text-[10px] opacity-75">(5,000 Repos)</span>
            </button>
          </div>

          {/* Direct Gallery Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onScrollToGallery}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 transition-colors shadow-xs cursor-pointer"
            >
              <span>Explore Gallery ({activeTier.toUpperCase()} Tier)</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onNavigateToCategories}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-xs cursor-pointer"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Browse 40 Categories</span>
            </button>
          </div>
        </div>

        {/* Factual Catalog Metrics Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/60">
          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>Total Dataset</span>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-slate-950 dark:text-white tabular-nums">
              15,000
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              5,000 per star tier
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Unique Repos</span>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-slate-950 dark:text-white tabular-nums">
              14,600
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Distinct GitHub projects
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>Taxonomy</span>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-slate-950 dark:text-white tabular-nums">
              40
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              In 5 technical groups
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Thresholds</span>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-slate-950 dark:text-white tabular-nums">
              ≥ 1k / 5k / 10k
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              100% verified GitHub stars
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
