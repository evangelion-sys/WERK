import React from 'react';
import { ExternalLink, Coins, Github, Instagram, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-24 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs transition-colors font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <a
                href="#/"
                onClick={(e) => handleLink(e, '#/')}
                className="font-display text-lg font-bold tracking-[0.14em] uppercase text-slate-950 dark:text-white hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                WERK
              </a>
              <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500">
                by KERNEL.dev
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs max-w-sm font-sans">
              A curated library of open-source software repositories. A considered collection of projects worth discovering, learning from, and returning to.
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Independent catalog · Zero trackers</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-slate-950 dark:text-white tracking-wider text-[11px] uppercase">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <a
                  href="#/"
                  onClick={(e) => handleLink(e, '#/')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#/vault"
                  onClick={(e) => handleLink(e, '#/vault')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors font-medium text-slate-900 dark:text-slate-100"
                >
                  Library
                </a>
              </li>
              <li>
                <a
                  href="#/about"
                  onClick={(e) => handleLink(e, '#/about')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#/why"
                  onClick={(e) => handleLink(e, '#/why')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Why WERK
                </a>
              </li>
              <li>
                <a
                  href="#/faq"
                  onClick={(e) => handleLink(e, '#/faq')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#/methodology"
                  onClick={(e) => handleLink(e, '#/methodology')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Methodology
                </a>
              </li>
              <li>
                <a
                  href="#/contact"
                  onClick={(e) => handleLink(e, '#/contact')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Directory & Audit Column */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-slate-950 dark:text-white tracking-wider text-[11px] uppercase">
              Directory & Data
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <a
                  href="#/categories"
                  onClick={(e) => handleLink(e, '#/categories')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  All 40 Categories
                </a>
              </li>
              <li>
                <a
                  href="#/collections"
                  onClick={(e) => handleLink(e, '#/collections')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Curated Collections
                </a>
              </li>
              <li>
                <a
                  href="#/audit"
                  onClick={(e) => handleLink(e, '#/audit')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors font-medium text-slate-900 dark:text-slate-200"
                >
                  Data Quality Audit
                </a>
              </li>
              <li>
                <a
                  href="https://docs.github.com/en/rest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-slate-950 dark:hover:text-white transition-colors"
                  aria-label="GitHub REST API Documentation (opens in new tab)"
                >
                  <span>GitHub REST API</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Connect, Donate & Legal Column */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-slate-950 dark:text-white tracking-wider text-[11px] uppercase">
              Connect & Compliance
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <a
                  href="https://nowpayments.io/donation/WERK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-950 dark:hover:text-white transition-colors text-amber-600 dark:text-amber-400 font-semibold inline-flex items-center gap-1.5"
                  aria-label="Donate to WERK via NOWPayments (opens in new tab)"
                >
                  <Coins className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
                  <span>Donate (Bitcoin)</span>
                  <ExternalLink className="w-3 h-3 text-amber-500" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="#/support"
                  onClick={(e) => handleLink(e, '#/support')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Support Details
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-slate-950 dark:hover:text-white transition-colors"
                  aria-label="Visit GitHub (opens in new tab)"
                >
                  <Github className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/kernel.bat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-slate-950 dark:hover:text-white transition-colors text-pink-600 dark:text-pink-400 font-medium"
                  aria-label="Visit KERNEL.dev Instagram profile @kernel.bat (opens in new tab)"
                >
                  <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Instagram (@kernel.bat)</span>
                  <ExternalLink className="w-3 h-3 text-pink-500/70" aria-hidden="true" />
                </a>
              </li>
              <li className="pt-1 border-t border-slate-100 dark:border-slate-800/80">
                <a
                  href="#/privacy"
                  onClick={(e) => handleLink(e, '#/privacy')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors font-medium text-slate-800 dark:text-slate-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#/terms"
                  onClick={(e) => handleLink(e, '#/terms')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors font-medium text-slate-800 dark:text-slate-200"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <div>
            © 2026 WERK. A KERNEL.dev project. Open-source repository trademarks and logos belong to their respective creators.
          </div>
          <div className="flex flex-wrap items-center gap-3 font-sans">
            <a
              href="#/privacy"
              onClick={(e) => handleLink(e, '#/privacy')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <span>·</span>
            <a
              href="#/terms"
              onClick={(e) => handleLink(e, '#/terms')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <span>·</span>
            <span className="font-mono text-slate-400 dark:text-slate-500">
              KERNEL.dev
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
