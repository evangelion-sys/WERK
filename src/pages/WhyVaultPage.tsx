import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { updatePageSeo } from '../utils/seo.js';
import { trackPageView } from '../utils/analytics.js';

interface WhyVaultPageProps {
  onNavigate: (path: string) => void;
}

export const WhyVaultPage: React.FC<WhyVaultPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSeo({
      title: 'Why WERK — Rationale for a Considered Software Library',
      description: 'The engineering rationale for a considered open-source software library over uncurated search engines, keyword bias, and algorithmic feeds.',
      path: '/why',
      ogType: 'article'
    });
    trackPageView('why');
  }, []);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 space-y-2">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
          A KERNEL.dev Project · Rationale
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
          Why WERK
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          The engineering justification for a considered software library over uncurated search engines.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-10 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* Section 1: The value of a curated, categorized repository library */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-semibold text-slate-950 dark:text-white">
            The Value of a Considered Library
          </h2>
          <p>
            Traditional developer search engines present an empty input box. To find viable tools, engineers must already know the exact keyword, package name, or technical jargon. This model introduces three common failure modes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
            <li>
              <strong className="text-slate-900 dark:text-slate-100">Keyword Bias:</strong> Projects with strong SEO or recognizable names dominate search results, while equally robust tools with technical or obscure names remain invisible.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-slate-100">Empty State Friction:</strong> Exploring a new domain (such as WebAssembly runtimes or vector database indexing) requires guessing queries without knowing what solutions exist.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-slate-100">Low-Signal Noise:</strong> Uncurated queries frequently return abandoned student tutorials, unfinished hobby experiments, and unmaintained forks.
            </li>
          </ul>
          <p>
            By contrast, WERK provides immediate visual access to 40 pre-categorized technical disciplines. Developers can survey the state of the art in any category at a glance.
          </p>
        </section>

        {/* Section 2: The usefulness of star-based collections */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-semibold text-slate-950 dark:text-white">
            The Utility of Star-Based Tiers
          </h2>
          <p>
            GitHub stars are an imperfect metric, but they provide a clear signal of community scrutiny, production adoption, and active testing across diverse runtime environments.
          </p>
          <p>
            Partitioning repositories into discrete tiers (1K+, 5K+, and 10K+) helps developers make deliberate architectural tradeoffs:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1.5">
              <span className="font-mono text-xs font-semibold text-amber-600 dark:text-amber-400">10,000+ Stars</span>
              <h3 className="font-semibold text-slate-950 dark:text-white text-xs">Maximum Consensus</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ideal for core enterprise dependencies where ecosystem stability, long-term support, and extensive documentation are mandatory.
              </p>
            </div>

            <div className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1.5">
              <span className="font-mono text-xs font-semibold text-amber-600 dark:text-amber-400">5,000+ Stars</span>
              <h3 className="font-semibold text-slate-950 dark:text-white text-xs">Proven Utility</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ideal for specialized infrastructure, secondary services, and production utilities that balance maturity with agility.
              </p>
            </div>

            <div className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1.5">
              <span className="font-mono text-xs font-semibold text-amber-600 dark:text-amber-400">1,000+ Stars</span>
              <h3 className="font-semibold text-slate-950 dark:text-white text-xs">Emerging Solutions</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ideal for modern developer ergonomics, novel abstractions, and lightweight libraries that solve specific technical problems cleanly.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Deterministic Browsing */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-semibold text-slate-950 dark:text-white">
            Deterministic Browsing
          </h2>
          <p>
            WERK does not use recommendation algorithms, user profiling, or sponsored ranking. Browsing is deterministic: you choose a tier, select a category, and inspect repositories ordered by authentic star counts, fork counts, or recent updates.
          </p>
        </section>

        {/* Action strip */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <a
            href="#/vault"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#/vault');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-white transition-colors cursor-pointer"
          >
            <span>Enter WERK</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#/faq"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#/faq');
            }}
            className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
          >
            Read frequently asked questions →
          </a>
        </div>
      </div>
    </div>
  );
};
