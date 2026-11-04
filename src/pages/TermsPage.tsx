import React, { useEffect } from 'react';
import { ArrowLeft, ShieldAlert, Coins, ExternalLink, Scale, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { updatePageSeo } from '../utils/seo.js';
import { trackPageView } from '../utils/analytics.js';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSeo({
      title: 'Terms of Service — WERK',
      description: 'Terms of Service for WERK: website usage, repository trademark protections, voluntary donation disclosures, and limitation of liability.',
      path: '/terms',
      ogType: 'article'
    });
    trackPageView('terms');
  }, []);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12 font-sans">
      {/* Top Breadcrumb */}
      <div>
        <button
          type="button"
          onClick={() => onNavigate('#/')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Section Header */}
        <header className="space-y-4 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>KERNEL.dev Publication · Catalog Terms</span>
            <span>Effective: November 2026</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Terms of Service
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            These terms govern your access to and use of WERK. By browsing this curated open-source repository library, you agree to these terms.
          </p>
        </header>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-12 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* Section 1: Website Usage */}
        <section className="space-y-3.5">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            01 · Access & Conduct
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Website Usage
          </h2>
          <div className="space-y-3 text-slate-600 dark:text-slate-400">
            <p>
              <strong className="text-slate-900 dark:text-slate-100 font-medium">Acceptable Use:</strong> WERK is provided for developers, researchers, builders, and the general public to browse, discover, and navigate to notable open-source software repositories.
            </p>
            <p>
              <strong className="text-slate-900 dark:text-slate-100 font-medium">Prohibited Misuse:</strong> You may not attempt to disrupt, compromise, or overload site infrastructure; deploy malicious scraping that impairs service performance for other users; inject unauthorized scripts; or falsely represent an endorsement or affiliation with WERK or KERNEL.dev.
            </p>
            <p>
              <strong className="text-slate-900 dark:text-slate-100 font-medium">Availability & Changes:</strong> WERK is provided on an "as is" and "as available" basis without guarantees of uninterrupted uptime. We reserve the right to modify, update, re-categorize, or retire catalog records or site features at any time without prior notice.
            </p>
            <p>
              <strong className="text-slate-900 dark:text-slate-100 font-medium">External Links:</strong> WERK links directly to third-party services and code registries (notably GitHub). We do not control or assume responsibility for external websites, their availability, or their terms of use.
            </p>
          </div>
        </section>

        {/* Section 2: Open-Source Content & Intellectual Property */}
        <section className="space-y-3.5 pt-8 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            02 · Intellectual Property & Licensing
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Open-Source Content & Trademarks
          </h2>
          <div className="space-y-3 text-slate-600 dark:text-slate-400">
            <p>
              WERK is an independent, non-commercial curated directory. We do not host, re-distribute, re-license, or claim ownership over any of the source code, binaries, or artifacts listed in the library.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong className="text-slate-900 dark:text-slate-100 font-medium">Ownership:</strong> All repository names, organization logos, trademarks, and project content belong exclusively to their respective owners and maintainers.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-slate-100 font-medium">No Affiliation or Endorsement:</strong> Cataloging a repository in WERK does not imply that the project maintainers endorse WERK, nor does it imply that WERK or KERNEL.dev is affiliated with, sponsored by, or officially associated with the repository maintainers.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-slate-100 font-medium">License Compliance:</strong> Every indexed project is governed by its own open-source license (such as MIT, Apache 2.0, GPL, BSD, MPL, or others). Visitors must review each project's primary repository license on GitHub to determine permissible uses, modification rights, and distribution conditions.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Voluntary Contributions & Donations */}
        <section className="space-y-3.5 pt-8 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            03 · Contributions
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Voluntary Donations via NOWPayments
          </h2>
          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-3">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 text-sm">
              <Coins className="w-4 h-4 text-amber-500" />
              <span>Contribution Principles & Disclosures</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <strong className="text-slate-900 dark:text-slate-100 font-medium">Voluntary Nature:</strong> Contributions to WERK are completely voluntary. They are gifts intended to support independent cataloging, hosting, and data verification infrastructure.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-slate-100 font-medium">Not a Commercial Purchase:</strong> Donations do not constitute the purchase of goods, commercial services, or software licenses. No paid features, private access, special editorial treatment, or promotional placements are promised or provided in exchange for contributions.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-slate-100 font-medium">External Gateway Processing:</strong> All contributions are processed directly by NOWPayments through their hosted donation page (<code className="font-mono text-[11px]">https://nowpayments.io/donation/WERK</code>). NOWPayments operates as an independent external payment processor under its own terms and conditions.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-slate-100 font-medium">Cryptocurrency Finality & Volatility:</strong> Cryptocurrency transactions are broadcast to decentralized blockchains and are generally irreversible on-chain. Blockchain network gas fees, confirmation times, and market exchange rates are governed by independent market mechanics beyond WERK's control.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-slate-100 font-medium">Refund Policy:</strong> Because cryptocurrency blockchain transfers settle permanently on-chain, contributions cannot typically be refunded or canceled once confirmed. Any disputed transaction requests will be evaluated individually and subject to applicable payment processor verification procedures.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-slate-100 font-medium">Tax Status:</strong> Contributions to WERK are not guaranteed or represented to be tax-deductible charitable contributions in any jurisdiction. Consult your personal tax advisor for financial or tax advice.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4: Disclaimers & Limitation of Liability */}
        <section className="space-y-3.5 pt-8 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            04 · Disclaimers
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Disclaimers & Limitation of Liability
          </h2>
          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Informational Use Only</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              WERK provides curated links and factual informational descriptions compiled from public repository metadata. While we take care to verify dataset qualification thresholds, repository information evolves rapidly: star counts, maintainer activity, security postures, open issues, and project licenses change over time.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong className="text-slate-900 dark:text-slate-100 font-medium">No Code Warranty:</strong> WERK DOES NOT WARRANT OR GUARANTEE THE SECURITY, FUNCTIONALITY, STABILITY, COMPATIBILITY, OR FREEDOM FROM MALWARE OF ANY THIRD-PARTY REPOSITORY CATALOGED ON THIS SITE. USERS ARE SOLELY RESPONSIBLE FOR INDEPENDENTLY AUDITING, INSPECTING, AND EVALUATING ANY CODEBASE PRIOR TO CLONING, DOWNLOADING, OR EXECUTING IT IN PRODUCTION ENVIRONMENTS.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              To the fullest extent permitted by applicable law, KERNEL.dev and WERK maintainers disclaim all liability for any direct, indirect, incidental, special, or consequential damages resulting from the use of this website or any external repository linked herein.
            </p>
          </div>
        </section>

        {/* Section 5: Legal Disclosures */}
        <section className="space-y-3.5 pt-8 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            05 · Scope & Inquiries
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Legal Disclosures & Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            WERK is an independent publication of KERNEL.dev. These terms are general website terms and disclosures. They do not constitute formal legal counsel and do not substitute for independent legal advice. NOWPayments maintains separate, independent terms governing payment processing.
          </p>
          <div className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-mono text-xs text-slate-700 dark:text-slate-300">
            <span className="text-slate-400 dark:text-slate-500 block text-[11px] uppercase mb-1">Official Project Channel</span>
            <a href="mailto:inbox@kernel.dev" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              inbox@kernel.dev
            </a>
          </div>
        </section>

        {/* Bottom Actions */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <a
            href="#/privacy"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#/privacy');
            }}
            className="text-xs font-semibold text-slate-900 dark:text-slate-100 hover:underline flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Read Privacy Policy →</span>
          </a>

          <a
            href="#/contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#/contact');
            }}
            className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
          >
            Contact Information & Corrections
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
