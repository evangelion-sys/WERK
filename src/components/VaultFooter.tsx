import React from 'react';
import { ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { CATEGORIES } from '../data/repositories.js';

interface VaultFooterProps {
  onSelectCategory: (slug: string) => void;
}

export const VaultFooter: React.FC<VaultFooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Manifesto */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-xs bg-indigo-600 dark:bg-indigo-500"></span>
              <span className="font-bold text-sm text-slate-950 dark:text-white tracking-tight">
                KERNEL REPO VAULT
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-md leading-relaxed text-xs">
              A curated visual gallery dedicated to showcasing exceptional open-source GitHub repositories. Every repository is independently verified with a minimum star count threshold of 1,000 GitHub stars.
            </p>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Strictly authentic metadata · Zero fabricated statistics</span>
            </div>
          </div>

          {/* Category Directory Column 1 */}
          <div>
            <h4 className="font-semibold text-slate-950 dark:text-white uppercase tracking-wider text-[11px] mb-3">
              Categories (1 – 6)
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(c.slug);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Category Directory Column 2 */}
          <div>
            <h4 className="font-semibold text-slate-950 dark:text-white uppercase tracking-wider text-[11px] mb-3">
              Categories (7 – 12)
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(6, 12).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(c.slug);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright notice and external link */}
        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-500">
          <p>
            © {new Date().getFullYear()} KERNEL REPO VAULT. All repository names, logos, and descriptions are trademarks of their respective owners.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
