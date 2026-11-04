import React, { useEffect } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import reportData from '../data/data_quality_report.json';
import { updatePageSeo } from '../utils/seo.js';
import { trackPageView } from '../utils/analytics.js';

interface MethodologyPageProps {
  onNavigate: (path: string) => void;
}

export const MethodologyPage: React.FC<MethodologyPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSeo({
      title: 'Data Methodology & Quality Verification — WERK',
      description: 'Detailed verification methodology, star thresholds, and dataset integrity standards for WERK\'s 15,000 repository records.',
      path: '/methodology',
      ogType: 'article'
    });
    trackPageView('methodology');
  }, []);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 space-y-2">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
          A KERNEL.dev Project · Data Transparency
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
          Methodology & Data Sources
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          Complete disclosure of data collection pipelines, star threshold verification, data sources, and known metadata limitations.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-10 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* Section 1: Real Data Sources */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-semibold text-slate-950 dark:text-white">
            1. Authentic Data Sources
          </h2>
          <p>
            The records in WERK are derived from two primary public datasets and verified against the official GitHub REST API:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
            <li>
              <strong className="text-slate-900 dark:text-slate-100">Official GitHub REST API (v3):</strong> Used as the authoritative source of truth for star counts, fork counts, primary programming languages, creation timestamps, and commit activity.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-slate-100">RepoSource Registry dataset (v1.0.0):</strong> Curated open-source registry containing structured classifications and GitHub repository identifiers.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-slate-100">Joshi595 Awesome GitHub Repos Verified Snapshot:</strong> Established open-source catalog of community-reviewed repositories and foundational projects.
            </li>
          </ul>
        </section>

        {/* Section 2: Collection and Verification Date */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-semibold text-slate-950 dark:text-white">
            2. Verification Snapshot & Date
          </h2>
          <p>
            The dataset was compiled, deduplicated, and verified in <strong className="text-slate-900 dark:text-slate-100">November 2026</strong>.
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            <strong>Static Snapshot Transparency:</strong> WERK does not run live scrapers or continuous background synchronization jobs during user browsing sessions. Star counts, fork metrics, and commit activity reflect their verified values at the time of dataset generation. This architecture guarantees fast page load times and deterministic browsing without hitting GitHub API rate limits.
          </p>
        </section>

        {/* Section 3: Star Thresholds and Gating */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-semibold text-slate-950 dark:text-white">
            3. Star Thresholds & Tier Verification
          </h2>
          <p>
            An initial candidate pool of 33,970 public GitHub repositories was evaluated. Repositories were partitioned into three strict tiers of 5,000 records each. No repository was admitted unless it strictly met or exceeded its threshold:
          </p>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-md">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Dataset File</th>
                  <th className="py-2.5 px-4 font-semibold">Tier Threshold</th>
                  <th className="py-2.5 px-4 font-semibold">Verified Records</th>
                  <th className="py-2.5 px-4 font-semibold">Actual Lowest Star</th>
                  <th className="py-2.5 px-4 font-semibold">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-slate-100">repos_10k.json</td>
                  <td className="py-2.5 px-4">≥ 10,000 Stars</td>
                  <td className="py-2.5 px-4">5,000</td>
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">11,138</td>
                  <td className="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-sans font-medium">100% Gated</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-slate-100">repos_5k.json</td>
                  <td className="py-2.5 px-4">≥ 5,000 Stars</td>
                  <td className="py-2.5 px-4">5,000</td>
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">5,981</td>
                  <td className="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-sans font-medium">100% Gated</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-slate-100">repos_1k.json</td>
                  <td className="py-2.5 px-4">≥ 1,000 Stars</td>
                  <td className="py-2.5 px-4">5,000</td>
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">3,759</td>
                  <td className="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-sans font-medium">100% Gated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Disclosure of Incomplete or Unavailable Metadata */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-semibold text-slate-950 dark:text-white">
            4. Metadata Limitations & Transparency Disclosures
          </h2>
          <p>
            In accordance with our zero-hallucination policy, we explicitly disclose missing or incomplete fields present in the raw GitHub records:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1">
              <span className="text-xs font-mono text-slate-500">Missing Descriptions</span>
              <div className="text-xl font-bold font-mono text-slate-950 dark:text-white tabular-nums">
                208 repos (1.38%)
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Maintainers omitted a public description in the GitHub repository header.
              </p>
            </div>

            <div className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1">
              <span className="text-xs font-mono text-slate-500">Unspecified Language</span>
              <div className="text-xl font-bold font-mono text-slate-950 dark:text-white tabular-nums">
                1,217 repos (8.11%)
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Polyglot repositories, curated lists, documentation, or asset packages without a single dominant language.
              </p>
            </div>

            <div className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1">
              <span className="text-xs font-mono text-slate-500">Unspecified License</span>
              <div className="text-xl font-bold font-mono text-slate-950 dark:text-white tabular-nums">
                1,710 repos (11.40%)
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Repositories lacking a machine-readable SPDX license key in the root metadata.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            WERK never invents descriptions, synthesizes languages, or assumes licenses when GitHub data is absent.
          </p>
        </section>

        {/* Section 5: Classification Methodology */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-semibold text-slate-950 dark:text-white">
            5. Taxonomy & Classification Logic
          </h2>
          <p>
            Repositories are categorized across 40 technical classes within 5 domain groups (AI & Machine Learning, Development & Languages, Frontend & UI, Infrastructure & Cloud, and Specialized Systems). Classifications are assigned deterministically based on maintainer-defined GitHub topics, repository names, and primary language indicators.
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

          <div className="flex items-center gap-4">
            <a
              href="#/audit"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#/audit');
              }}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors"
            >
              View complete Data Quality Audit report →
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
    </div>
  );
};
