import React from 'react';
import { Database, ShieldCheck, Cpu, RefreshCw, Layers, ArrowRight, FolderOpen } from 'lucide-react';

interface AboutViewProps {
  onExplore: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onExplore }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wider">
          Architecture & Methodology
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
          Kernel Repo Vault
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          A living, continuously updated digital archive of exceptional open-source GitHub repositories.
        </p>
      </div>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <section>
          <div className="text-xs font-mono text-indigo-500 uppercase tracking-wider mb-1">Principle 01</div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-500" />
            <span>Discover once. Curate automatically. Present beautifully.</span>
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Kernel Repo Vault is not a search engine or generic search directory. It opens with an already-populated, categorized, and described catalog of verified software. Users never arrive at an empty screen or need to invent complex search terms to find battle-tested engineering resources.
          </p>
        </section>

        <section>
          <div className="text-xs font-mono text-indigo-500 uppercase tracking-wider mb-1">Standard 02</div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            <span>The 1,000-Star Verification Threshold</span>
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Every repository archived in the vault must have at least 1,000 verified GitHub stars at the time of its last synchronization. This deterministic requirement eliminates abandoned prototypes, transient forks, and non-viable experiments, ensuring only proven open-source solutions are cataloged.
          </p>
        </section>

        <section>
          <div className="text-xs font-mono text-indigo-500 uppercase tracking-wider mb-1">Pipeline 03</div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-indigo-500" />
            <span>Scheduled 6-Hour GitHub Ingestion</span>
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Powered by Cloudflare Cron Triggers and scheduled background processes, the vault executes two synchronized workflows:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
            <li>
              <strong>Discovery Synchronization:</strong> Executes category-oriented search queries, identifies newly qualifying repositories crossing 1,000 stars, deduplicates records via unique GitHub IDs, and deterministically categorizes them.
            </li>
            <li>
              <strong>Metadata Refresh:</strong> Regularly updates existing repository star counts, forks, issues, licenses, and push activity without destructive overwrites.
            </li>
          </ul>
        </section>

        <section>
          <div className="text-xs font-mono text-indigo-500 uppercase tracking-wider mb-1">Taxonomy 04</div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            <span>39 Categories across 5 Engineering Disciplines</span>
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Rather than relying on ungrounded AI guesses, the vault classifies repositories deterministically across 5 core domains: <em>Artificial Intelligence</em>, <em>Development</em>, <em>Design & Frontend</em>, <em>Infrastructure</em>, and <em>Specialized</em>. Classifications are drawn exclusively from authentic GitHub topics, primary language signatures, and maintainer metadata.
          </p>
        </section>

        <section>
          <div className="text-xs font-mono text-indigo-500 uppercase tracking-wider mb-1">Curation 05</div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-indigo-500" />
            <span>Editorial Stacks & Honest Trending</span>
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Curated collections assemble battle-tested tools for concrete workflows—such as <em>Essential AI Tools</em>, <em>Build Your Own SaaS</em>, and <em>Modern Developer Toolkit</em>. Trending metrics rely strictly on authentic historical star snapshots gathered over time rather than fabricated momentum percentages.
          </p>
        </section>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Kernel Repo Vault v2.0 · Production Ready
          </span>
          <button
            onClick={onExplore}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <span>Explore the Vault</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
