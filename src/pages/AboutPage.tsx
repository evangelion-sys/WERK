import React, { useEffect } from 'react';
import { ArrowRight, Layers, Compass, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
import { updatePageSeo } from '../utils/seo.js';
import { trackPageView } from '../utils/analytics.js';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSeo({
      title: 'About WERK — Independent Open-Source Software Library',
      description: 'WERK is a curated library of open-source software repositories maintained by KERNEL.dev. Learn why WERK exists and our catalog standards.',
      path: '/about',
      ogType: 'article'
    });
    trackPageView('about');
  }, []);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
      {/* A. Introduction */}
      <div className="pb-8 border-b border-slate-200 dark:border-slate-800 space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
          A KERNEL.dev Project · About WERK
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-slate-950 dark:text-white">
          About WERK
        </h1>
        <p className="font-sans text-base sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          WERK is an independent library of open-source software repositories, organized to make useful projects easier to explore.
        </p>
        <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          It brings together software from across the open-source ecosystem in one place, with clear categories, project descriptions, and direct links to the original GitHub repositories.
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-12 font-sans text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* B. Why WERK exists */}
        <section className="space-y-3.5">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            01 · Motivation
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Why WERK exists
          </h2>
          <p>
            Open-source software is spread across countless repositories, individual organizations, and disparate communities.
          </p>
          <p>
            Finding useful projects can take time. Developers frequently contend with keyword bias in general search engines, SEO-driven lists, and abandoned experiment repositories. WERK provides a more organized starting point: a considered collection that visitors can browse by category and explore at their own pace.
          </p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Note: WERK does not claim to index every open-source repository in existence, nor does it guarantee that every indexed project is currently active or bug-free. It serves as a curated catalog of notable tools and libraries.
          </p>
        </section>

        {/* C. What visitors can do */}
        <section className="space-y-3.5 pt-8 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            02 · Capabilities
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            What visitors can do
          </h2>
          <p>
            The library is designed for direct, self-guided exploration. You can:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <strong className="text-slate-900 dark:text-slate-100 font-medium">Browse repositories by category:</strong> Filter through 40 specialized engineering classifications across artificial intelligence, web development, systems engineering, databases, and infrastructure.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-slate-100 font-medium">Explore projects through descriptions:</strong> Read concise, maintainer-grounded summaries explaining what each project does and its core purpose.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-slate-100 font-medium">Review repository metadata:</strong> Inspect star counts, fork metrics, primary programming languages, and recent commit dates.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-slate-100 font-medium">Visit original GitHub repositories directly:</strong> Navigate straight to the source repository on GitHub with a single click to inspect documentation, issues, and code.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-slate-100 font-medium">Discover projects across disciplines:</strong> Cross-reference alternative frameworks and utilities across three distinct star tiers (1K+, 5K+, and 10K+).
            </li>
          </ul>
        </section>

        {/* D. How the collection is organized */}
        <section className="space-y-3.5 pt-8 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            03 · Architecture
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            How the collection is organized
          </h2>
          <p>
            WERK partitions its 15,000 repository records across two primary dimensions:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2">
              <h3 className="font-display text-base font-semibold text-slate-950 dark:text-white">
                40 Technical Categories
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Grouped into 5 core engineering domains: Artificial Intelligence, Frontend Development, Backend & Systems, Cloud & DevOps, and Specialized & Utilities. These categories exist to simplify browsing and are curated based on topics, language signatures, and maintainer metadata. They do not represent official GitHub classifications.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2">
              <h3 className="font-display text-base font-semibold text-slate-950 dark:text-white">
                Three Verified Star Tiers
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Partitioned into 10K+ Stars (global standards), 5K+ Stars (established frameworks), and 1K+ Stars (proven tooling). Each tier contains exactly 5,000 verified records, allowing builders to calibrate ecosystem maturity against specialized agility.
              </p>
            </div>
          </div>
        </section>

        {/* E. Selection and information standards */}
        <section className="space-y-3.5 pt-8 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            04 · Standards
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Selection & Information Standards
          </h2>
          <p>
            Repository information is compiled directly from original project sources and verified GitHub metadata:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>Repository links lead exclusively to the official project pages on GitHub.com.</li>
            <li>Repository metadata can change over time. Star counts, fork tallies, and last-commit dates represent verified snapshots from the November 2026 data audit.</li>
            <li>Project descriptions reflect information provided by the project maintainers. Where a maintainer did not provide a description, WERK explicitly notes: <em>“Description not provided by the project maintainer”</em> rather than fabricating a summary.</li>
            <li>No algorithmically generated popularity scores, artificial ranking boosts, or sponsored listings are used.</li>
          </ul>
        </section>

        {/* F. Independence and scope */}
        <section className="space-y-3.5 pt-8 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            05 · Governance
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Independence & Scope
          </h2>
          <p>
            WERK is an independent publication maintained under <strong className="text-slate-900 dark:text-slate-100">KERNEL.dev</strong>.
          </p>
          <p>
            WERK is not affiliated with, endorsed by, or sponsored by GitHub, Microsoft, or the maintainers of the listed repositories. All repository trademarks, logos, codebases, and brand names belong exclusively to their respective owners under their stated open-source licenses.
          </p>
        </section>

        {/* G. Closing section */}
        <div className="pt-10 border-t border-slate-200 dark:border-slate-800 p-8 sm:p-10 rounded-lg bg-slate-100 dark:bg-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Good software deserves to be easier to find.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Explore the library, take your time, and follow the projects that interest you.
            </p>
          </div>

          <a
            href="#/vault"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#/vault');
            }}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold rounded-md bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-white transition-colors cursor-pointer shrink-0 font-sans shadow-xs"
          >
            <span>Explore the library</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
