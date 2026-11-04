import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Database, EyeOff, Lock, Globe, FileText, ExternalLink } from 'lucide-react';
import { updatePageSeo } from '../utils/seo.js';
import { trackPageView } from '../utils/analytics.js';

interface PrivacyPolicyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSeo({
      title: 'Privacy Policy — WERK',
      description: 'WERK\'s Privacy Policy: zero trackers, zero user accounts, zero database-backed contact form retention, local storage scope, and external NOWPayments disclosures.',
      path: '/privacy',
      ogType: 'article'
    });
    trackPageView('privacy');
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
            <span>KERNEL.dev Publication · Privacy Transparency</span>
            <span>Effective: November 2026</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Privacy Policy
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            This policy discloses the exact data practices of WERK. We believe software reference libraries should be free of behavioral trackers, intrusive profiling, and unneeded data retention.
          </p>
        </header>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-12 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* Section 1: Overview */}
        <section className="space-y-3.5">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            01 · Core Principles
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Overview & Data Philosophy
          </h2>
          <p>
            WERK is an independent curated library of open-source software repositories maintained by <strong className="text-slate-900 dark:text-slate-100 font-semibold">KERNEL.dev</strong>.
          </p>
          <p>
            Our architecture is client-first and privacy-focused: we do not sell visitor data, do not run commercial advertising networks, and do not track users across the web.
          </p>
        </section>

        {/* Section 2: What WERK Actually Collects */}
        <section className="space-y-4 pt-8 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            02 · Information Collection
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            What Information Is Handled
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 text-sm">
                <EyeOff className="w-4 h-4 text-emerald-500" />
                <span>Zero User Accounts</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                WERK has no user registration, no sign-in requirement, and no profile management. Visitors browse the library anonymously.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 text-sm">
                <Database className="w-4 h-4 text-emerald-500" />
                <span>Zero Contact Form Submissions</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We operate no database-backed contact forms or newsletter lists. Inquiries are initiated directly by the visitor through standard email or social channels.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Zero Third-Party Analytics</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                There are no third-party tracking scripts, Google Analytics tags, Meta pixels, or telemetry beacons embedded in WERK.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 text-sm">
                <Lock className="w-4 h-4 text-emerald-500" />
                <span>Local Storage Only</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The browser's local storage is used exclusively on your device to persist your theme preference (<code className="font-mono text-[11px]">werk_theme</code>) and local bookmarks. This data is never sent to our servers.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="font-display text-sm font-semibold text-slate-950 dark:text-white">
              Standard Web Server Request Logs
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Like any website served on standard internet infrastructure (Vercel and Cloud edge runtimes), server and edge networks receive standard HTTP request metadata (IP address, user agent, request path, timestamp) necessary to deliver web traffic securely and defend against denial-of-service attacks. These ephemeral logs are not tied to personal identities.
            </p>
          </div>
        </section>

        {/* Section 3: Third-Party Links & External Platforms */}
        <section className="space-y-3.5 pt-8 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            03 · External Services
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Third-Party External Links
          </h2>
          <p>
            WERK indexes open-source software and provides direct outbound links to external destinations:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <li>
              <strong className="text-slate-900 dark:text-slate-100 font-medium">GitHub:</strong> Outbound links direct users to repository source code, issues, and releases on <code className="font-mono text-[11px]">github.com</code>.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-slate-100 font-medium">Social Channels:</strong> Direct links to KERNEL.dev social profiles, such as Instagram (<code className="font-mono text-[11px]">instagram.com/kernel.bat</code>).
            </li>
            <li>
              <strong className="text-slate-900 dark:text-slate-100 font-medium">Outbound Link Protection:</strong> All external links open in a new browser tab with <code className="font-mono text-[11px]">rel="noopener noreferrer"</code> to protect your browsing session from tabnabbing or referrer leaks.
            </li>
          </ul>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            External sites are operated by independent third parties with their own privacy policies. WERK is not responsible for the privacy practices of external platforms.
          </p>
        </section>

        {/* Section 4: NOWPayments External Donation Gateway */}
        <section className="space-y-3.5 pt-8 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            04 · Payment Processing
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            NOWPayments External Donation Processing
          </h2>
          <div className="p-5 rounded-lg border border-amber-200/70 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 space-y-3">
            <div className="flex items-center gap-2 font-semibold text-amber-900 dark:text-amber-200 text-sm">
              <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>External, Hosted Contribution Processing</span>
            </div>
            <p className="text-xs text-amber-900/90 dark:text-amber-200/80 leading-relaxed">
              Voluntary contributions to WERK are handled directly through the official hosted NOWPayments page at <code className="font-mono text-[11px] font-bold">https://nowpayments.io/donation/WERK</code>.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-amber-900/80 dark:text-amber-200/70">
              <li>Payment transactions occur entirely on NOWPayments' secure platform, not on WERK.</li>
              <li>WERK's servers and website never request, receive, process, or store credit cards, bank accounts, or cryptocurrency private keys.</li>
              <li>Any information you provide during the contribution process is governed exclusively by NOWPayments' own Privacy Policy and Terms of Service.</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Inquiries & Contact */}
        <section className="space-y-3.5 pt-8 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            05 · Communication
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Contacting WERK Regarding Privacy
          </h2>
          <p>
            If you have questions, corrections, or comments regarding this Privacy Policy or how technical data is handled, you may reach the maintainers through our official project contact channel:
          </p>
          <div className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-mono text-xs text-slate-700 dark:text-slate-300">
            <span className="text-slate-400 dark:text-slate-500 block text-[11px] uppercase mb-1">Official Project Channel</span>
            <a href="mailto:inbox@kernel.dev" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              inbox@kernel.dev
            </a>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            WERK is an independent publication of KERNEL.dev. This document reflects general disclosures of actual site operations and does not assert fictional statutory entities or commercial registration numbers.
          </p>
        </section>

        {/* Bottom Actions */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <a
            href="#/terms"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#/terms');
            }}
            className="text-xs font-semibold text-slate-900 dark:text-slate-100 hover:underline flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Read Terms of Service →</span>
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

export default PrivacyPolicyPage;
