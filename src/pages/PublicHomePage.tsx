import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { updatePageSeo, CANONICAL_BASE } from '../utils/seo.js';
import { trackPageView } from '../utils/analytics.js';

interface PublicHomePageProps {
  onNavigate: (path: string) => void;
  onPrefetch?: () => void;
}

export const PublicHomePage: React.FC<PublicHomePageProps> = ({ onNavigate, onPrefetch }) => {
  useEffect(() => {
    updatePageSeo({
      title: 'WERK — Curated Software Repository Library',
      description: 'A curated library of open-source software repositories by KERNEL.dev. A considered collection of projects worth discovering, learning from, and returning to.',
      path: '/',
      ogType: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'WERK',
        'url': CANONICAL_BASE,
        'applicationCategory': 'DeveloperApplication',
        'operatingSystem': 'All',
        'description': 'WERK is a curated library of open-source software repositories by KERNEL.dev. A considered collection of projects worth discovering, learning from, and returning to.',
        'publisher': {
          '@type': 'Organization',
          'name': 'KERNEL.dev',
          'url': 'https://kernel.dev'
        }
      }
    });
    trackPageView('home');
  }, []);
  return (
    <div className="space-y-24 sm:space-y-36 pb-20">
      {/* Hero Section — Typography as the central visual element */}
      <section className="pt-24 sm:pt-36 pb-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 max-w-4xl">
            {/* Small technical kicker in JetBrains Mono */}
            <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400">
              <span>KERNEL.dev</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</span>
              <span>Curated Software Library</span>
            </div>

            {/* Large Clash Display Hero Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-slate-950 dark:text-white leading-[1.08] text-balance">
              Good software is worth keeping close.
            </h1>

            {/* Supporting text in General Sans */}
            <p className="font-sans text-lg sm:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
              WERK is a curated library of open-source software repositories. A considered collection of projects worth discovering, learning from, and returning to.
            </p>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#/vault"
                onMouseEnter={onPrefetch}
                onFocus={onPrefetch}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('#/vault');
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-md bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-white transition-colors cursor-pointer shadow-xs font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <span>Enter the library</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#/about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('#/about');
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium rounded-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors font-sans"
              >
                <span>About WERK</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What WERK is */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
              01 · Identity
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              What WERK is
            </h2>
          </div>

          <div className="md:col-span-8 space-y-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
            <p className="font-medium text-slate-900 dark:text-slate-100">
              WERK brings useful open-source software projects together in one organized library. Visitors can browse by category, explore projects, and continue directly to GitHub.
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Instead of uncurated search engines or promoted algorithmic feeds, WERK presents a permanent catalog partitioned into 40 specialized engineering disciplines. Every entry links directly to its original GitHub repository.
            </p>
          </div>
        </div>
      </section>

      {/* Why WERK exists */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="md:col-span-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
              02 · Rationale
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Why WERK exists
            </h2>
          </div>

          <div className="md:col-span-8 space-y-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
            <p className="font-medium text-slate-900 dark:text-slate-100">
              Finding useful open-source projects can take time. WERK gives developers and curious builders a more considered starting point, with projects organized into clear categories and presented without unnecessary noise.
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Exploring open-source software should not require guessing obscure keywords or filtering through unmaintained experiments. A well-organized library makes high-signal work visible, accessible, and easy to evaluate.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800 flex items-baseline justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
              03 · Workflow
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              How it works
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
            Three simple steps
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-7 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-3">
            <div className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Step 01
            </div>
            <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">
              Browse
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore the library by category. Navigate 40 engineering disciplines covering machine learning, infrastructure, web tooling, databases, and systems.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-7 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-3">
            <div className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Step 02
            </div>
            <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">
              Discover
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Find projects that match your interests. Review descriptions, primary programming languages, star thresholds, and community adoption.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-7 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-3">
            <div className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Step 03
            </div>
            <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">
              Explore further
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Visit the original repository on GitHub. Inspect the codebase, read maintainer documentation, review open issues, and clone directly.
            </p>
          </div>
        </div>
      </section>

      {/* Built around clarity */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
            04 · Principles
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Built around clarity
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Core standards that govern how the library is constructed and presented.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-7 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2">
            <h3 className="font-display text-base font-semibold text-slate-950 dark:text-white">
              A considered collection
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Repositories are verified and organized before inclusion, ensuring baseline stability, relevance, and documentation quality.
            </p>
          </div>

          <div className="p-7 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2">
            <h3 className="font-display text-base font-semibold text-slate-950 dark:text-white">
              Clear organization
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Grouped into 40 specialized categories and 3 star tiers (1K+, 5K+, and 10K+) so you can browse at your own pace without infinite feeds.
            </p>
          </div>

          <div className="p-7 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2">
            <h3 className="font-display text-base font-semibold text-slate-950 dark:text-white">
              Direct access to original projects
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every entry links straight to GitHub. WERK never rehosts code, introduces wrappers, or creates walled gardens around open-source maintainers.
            </p>
          </div>

          <div className="p-7 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2">
            <h3 className="font-display text-base font-semibold text-slate-950 dark:text-white">
              No unnecessary complexity
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              No accounts, tracking, paywalls, or algorithm-driven noise. Just structured engineering resources for people who build software.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Take a look around.
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Explore the collection and see what catches your attention.
            </p>
          </div>

          <a
            href="#/vault"
            onMouseEnter={onPrefetch}
            onFocus={onPrefetch}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#/vault');
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-md bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-white transition-colors whitespace-nowrap cursor-pointer shrink-0 font-sans shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <span>Enter WERK</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
};
