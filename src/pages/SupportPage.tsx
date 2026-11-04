import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
  Coins,
  Lock,
  Wallet,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { updatePageSeo } from '../utils/seo.js';
import { trackPageView } from '../utils/analytics.js';

interface SupportPageProps {
  onNavigate: (path: string) => void;
}

export const OFFICIAL_DONATION_URL = 'https://nowpayments.io/donation/WERK';

export const SupportPage: React.FC<SupportPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSeo({
      title: 'Support WERK — Independent Open-Source Sponsorship',
      description: 'Support WERK\'s independent open-source cataloging and verification infrastructure via verified non-custodial NOWPayments Bitcoin gateway.',
      path: '/support',
      ogType: 'website'
    });
    trackPageView('support');
  }, []);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 font-sans">
      {/* Top Breadcrumb */}
      <div>
        <button
          type="button"
          onClick={() => onNavigate('#/vault')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </button>

        {/* Editorial Section Header */}
        <header className="space-y-4 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>Independent Curation · Bitcoin Sponsorship</span>
            <span className="hidden sm:inline-block">NOWPayments Hosted Non-Custodial Gateway</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Support independent open-source cataloging.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            WERK is a considered library of open-source software repositories maintained by KERNEL.dev. We accept zero advertising, host zero trackers, and never sell catalog placements. Direct Bitcoin contributions sustain our ingestion, indexing, and data verification infrastructure.
          </p>
        </header>
      </div>

      {/* Main Donation Interaction Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Donation Portal Action (7 cols) */}
        <section aria-label="Official donation portal" className="md:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xs">
            {/* Payment Method Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-500" />
                <span className="font-display font-medium text-sm text-slate-950 dark:text-white">
                  Bitcoin & Cryptocurrency
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Non-Custodial Hosted Checkout
              </span>
            </div>

            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                Contributions to WERK are handled directly through our verified, hosted NOWPayments donation page. You can choose any custom contribution amount and complete your donation using Bitcoin (BTC) or other supported cryptocurrencies.
              </p>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Official Contribution Portal
                </div>
                <div className="font-mono text-xs text-slate-900 dark:text-slate-100 break-all select-all">
                  https://nowpayments.io/donation/WERK
                </div>
              </div>
            </div>

            {/* Primary Accessible Donate Anchor Link */}
            <div className="pt-2">
              <a
                href={OFFICIAL_DONATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 text-xs sm:text-sm font-semibold rounded-lg bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xs"
                aria-label="Donate to WERK via NOWPayments (opens in new tab)"
              >
                <Coins className="w-4 h-4 text-amber-500" aria-hidden="true" />
                <span>Donate with Bitcoin via NOWPayments</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Verified non-custodial gateway · Opens in a new tab</span>
            </div>
          </div>

          {/* Editorial Independence Notice */}
          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Editorial Independence Policy</span>
            </div>
            <p>
              Contributions never purchase catalog placement, priority ranking, or promotional editorial favor. Repositories in WERK are cataloged solely based on documentation quality, code stability, and community significance.
            </p>
          </div>
        </section>

        {/* Technical Architecture & Trust Sidebar (5 cols) */}
        <aside aria-label="Donation security and architecture" className="md:col-span-5 space-y-6">
          {/* How It Works Card */}
          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <h3 className="font-display text-xs font-semibold text-slate-950 dark:text-white uppercase tracking-wider">
              Contribution Flow
            </h3>

            <ol className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed list-none">
              <li className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                  1
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100 block">Open Official Portal</strong>
                  Clicking Donate opens the official NOWPayments hosted contribution page for WERK in a secure new tab.
                </div>
              </li>

              <li className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                  2
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100 block">Select Amount & Coin</strong>
                  Enter your chosen contribution amount and select Bitcoin (or another cryptocurrency of your choice).
                </div>
              </li>

              <li className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                  3
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100 block">Direct Wallet Transfer</strong>
                  Transfer directly from your crypto wallet to the single-use address generated on the page. Settlement occurs on-chain.
                </div>
              </li>
            </ol>
          </div>

          {/* Privacy & Non-Custodial Guarantees */}
          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3.5 shadow-xs">
            <h3 className="font-display text-xs font-semibold text-slate-950 dark:text-white uppercase tracking-wider">
              Security Standards
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Zero customer tracking or personal data collection.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Non-custodial payment processing via NOWPayments.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Wallet className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Transparent on-chain settlement directly to KERNEL.dev.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Zero client-side secrets or credentials stored in the browser.</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SupportPage;
