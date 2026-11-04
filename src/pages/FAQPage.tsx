import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { updatePageSeo } from '../utils/seo.js';
import { trackPageView } from '../utils/analytics.js';

interface FAQPageProps {
  onNavigate: (path: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSeo({
      title: 'Frequently Asked Questions — WERK',
      description: 'Direct, factual answers regarding the dataset, star tier methodology, verification criteria, and scope of WERK.',
      path: '/faq',
      ogType: 'article'
    });
    trackPageView('faq');
  }, []);
  const faqs = [
    {
      q: 'What is WERK?',
      a: 'WERK is a curated library of open-source software repositories maintained by KERNEL.dev. It brings together verified GitHub repositories partitioned into three discrete star tiers (1K+, 5K+, and 10K+) across 40 specialized categories. It is a reference catalog, not a search engine or automated crawler.'
    },
    {
      q: 'How are repositories selected?',
      a: 'Repositories were gathered from verified open-source registries (RepoSource Registry dataset v1.0.0 and Joshi595 Awesome GitHub Repos) and cross-validated against the official GitHub REST API. Every included repository was required to have valid repository identifiers, active public visibility, and satisfy or exceed the designated star threshold for its tier.'
    },
    {
      q: 'What do the star tiers mean?',
      a: 'The catalog is partitioned into three tiers of 5,000 repositories each: the 10K+ Tier (projects with 10,000 or more stars representing global consensus), the 5K+ Tier (projects with 5,000 to 9,999+ stars representing established frameworks and tooling), and the 1K+ Tier (projects with 1,000 to 4,999+ stars representing proven packages and emerging tools).'
    },
    {
      q: 'Are repositories hosted on this website?',
      a: 'No. WERK does not host source code, binary releases, Git mirrors, or package artifacts. It provides structured metadata, descriptions, category tagging, and direct links to the official repositories hosted on GitHub.com.'
    },
    {
      q: 'Where do repository links lead?',
      a: 'Every repository card includes a "View on GitHub" link that opens the original repository page directly on GitHub.com (e.g. https://github.com/torvalds/linux). All links open in a new browser tab with rel="noopener noreferrer" for security.'
    },
    {
      q: 'How often is repository information verified?',
      a: 'The current catalog represents a verified data snapshot compiled in November 2026. The application runs against pre-compiled static JSON datasets (repos_1k.json, repos_5k.json, and repos_10k.json) to ensure zero latency, offline reliability, and deterministic browsing without background sync overhead.'
    },
    {
      q: 'Can repository information become outdated?',
      a: 'Yes. Because the datasets are based on a verified snapshot rather than a continuous live crawler, live star counts, fork counts, and recent commits on GitHub will fluctuate over time. Always check the primary repository on GitHub for real-time issues, pull requests, and the latest releases.'
    },
    {
      q: 'Does WERK provide or maintain the listed projects?',
      a: 'No. WERK is an independent curation project by KERNEL.dev and does not own, maintain, or provide technical support for any of the indexed repositories. All trademarks, copyrights, and project code belong exclusively to their respective maintainers under their stated open-source licenses.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 space-y-2">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
          A KERNEL.dev Project · FAQ
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          Direct, factual answers regarding the dataset, methodology, and scope of WERK.
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <article
            key={idx}
            className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2.5"
          >
            <h2 className="text-base font-semibold text-slate-950 dark:text-white">
              {faq.q}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {faq.a}
            </p>
          </article>
        ))}
      </div>

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
          href="#/methodology"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('#/methodology');
          }}
          className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
        >
          Inspect data methodology & quality audit →
        </a>
      </div>
    </div>
  );
};
