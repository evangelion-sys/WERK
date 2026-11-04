import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Mail, GitPullRequest, Globe, Instagram, Github } from 'lucide-react';
import { updatePageSeo } from '../utils/seo.js';
import { trackPageView } from '../utils/analytics.js';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  // Configurable contact email from environment or maintainer configuration
  const contactEmail = (import.meta.env.VITE_CONTACT_EMAIL as string) || '';

  useEffect(() => {
    updatePageSeo({
      title: 'Contact & Communication Channels — WERK',
      description: 'Contact channels for WERK and KERNEL.dev. General inquiries, repository metadata corrections, official GitHub, and Instagram @kernel.bat.',
      path: '/contact',
      ogType: 'website'
    });
    trackPageView('contact');
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12 font-sans">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => onNavigate('#/')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="pb-6 border-b border-slate-200 dark:border-slate-800 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            A KERNEL.dev Project · Inquiries & Social Presence
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Contact & Channels
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
            Have a question, feedback, or a repository correction? Reach out through our official communication and social channels below.
          </p>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Direct Email Channel */}
          <div className="p-6 sm:p-7 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <Mail className="w-4 h-4 text-slate-500" />
              <span>Direct Inquiries</span>
            </div>
            <h2 className="font-display text-base font-semibold text-slate-950 dark:text-white">
              Official Email
            </h2>
            {contactEmail ? (
              <div className="space-y-1">
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline break-all"
                  aria-label={`Send email to ${contactEmail}`}
                >
                  {contactEmail}
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  General inquiries, editorial questions, and feedback.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300">
                  <a
                    href="mailto:inbox@kernel.dev"
                    className="hover:underline text-blue-600 dark:text-blue-400 font-medium"
                    aria-label="Send email to inbox@kernel.dev"
                  >
                    inbox@kernel.dev
                  </a>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Direct maintainer channel for WERK & KERNEL.dev.
                </p>
              </div>
            )}
          </div>

          {/* Card 2: GitHub (Preserved) */}
          <div className="p-6 sm:p-7 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <Github className="w-4 h-4 text-slate-500" />
              <span>Source & Registry</span>
            </div>
            <h2 className="font-display text-base font-semibold text-slate-950 dark:text-white">
              GitHub
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore the open-source software ecosystem and inspected project repositories on GitHub.
            </p>
            <div className="pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-slate-100 hover:underline"
                aria-label="Visit GitHub (opens in new tab)"
              >
                <Github className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Visit GitHub</span>
                <ExternalLink className="w-3 h-3 text-slate-400" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Card 3: Instagram (Canonical Profile: @kernel.bat) */}
          <div className="p-6 sm:p-7 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>Official Instagram</span>
            </div>
            <h2 className="font-display text-base font-semibold text-slate-950 dark:text-white">
              Instagram
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Visual updates, release announcements, and project highlights from KERNEL.dev.
            </p>
            <div className="pt-1">
              <a
                href="https://www.instagram.com/kernel.bat/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 dark:text-pink-400 hover:underline"
                aria-label="Visit KERNEL.dev Instagram profile @kernel.bat (opens in new tab)"
              >
                <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
                <span>@kernel.bat</span>
                <ExternalLink className="w-3 h-3 text-pink-500/70" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Repository Corrections Section */}
        <section className="p-7 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
            <GitPullRequest className="w-4 h-4 text-slate-500" />
            <span>Catalog Quality</span>
          </div>
          <h2 className="font-display text-lg sm:text-xl font-semibold text-slate-950 dark:text-white">
            Repository Metadata Corrections
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            If you maintain an indexed repository or identified an inaccurate category classification, outdated license marker, or missing description:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
            <div className="p-3.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-mono text-slate-400 block text-[11px]">1. Specify Project</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">Full repository path (e.g. owner/name).</span>
            </div>
            <div className="p-3.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-mono text-slate-400 block text-[11px]">2. Include GitHub Link</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">Direct URL to verify maintainer status.</span>
            </div>
            <div className="p-3.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-mono text-slate-400 block text-[11px]">3. Describe Correction</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">Category reclassification or description note.</span>
            </div>
          </div>
        </section>

        {/* Action link */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <a
            href="#/vault"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#/vault');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-white transition-colors cursor-pointer"
          >
            <span>Enter the library</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
            <a
              href="#/privacy"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#/privacy');
              }}
              className="hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <a
              href="#/terms"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#/terms');
              }}
              className="hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
