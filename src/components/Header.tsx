import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Coins, ExternalLink } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  activePath: string;
  onNavigate: (path: string) => void;
  onPrefetch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  activePath,
  onNavigate,
  onPrefetch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', path: '#/about' },
    { label: 'Why WERK', path: '#/why' },
    { label: 'FAQ', path: '#/faq' },
    { label: 'Methodology', path: '#/methodology' },
    { label: 'Contact', path: '#/contact' },
    { label: 'Support', path: '#/support' }
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const isCurrent = (path: string) => {
    if (path === '#/' && (activePath === '#/' || activePath === '' || activePath === '#/home')) {
      return true;
    }
    if (path === '#/support' && (activePath.startsWith('#/support') || activePath.startsWith('#/donate') || activePath === '#donate' || activePath === '#support')) {
      return true;
    }
    return activePath.startsWith(path) && path !== '#/';
  };

  const isLibraryView =
    activePath.startsWith('#/vault') ||
    activePath.startsWith('#/library') ||
    activePath.startsWith('#/category');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6 sm:gap-8">
        {/* Zone 1: WERK wordmark — distinctive, carefully spaced display lettering */}
        <div className="flex items-center gap-3">
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#/');
            }}
            className="font-display text-xl sm:text-2xl font-bold tracking-[0.14em] uppercase text-slate-950 dark:text-white whitespace-nowrap shrink-0 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            WERK
          </a>
          <span className="hidden sm:inline-block text-[11px] font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500 border-l border-slate-200 dark:border-slate-800 pl-3">
            by KERNEL.dev
          </span>
        </div>

        {/* Zone 2: Navigation links in General Sans */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-400 font-sans">
          {navLinks.map((link) => {
            const active = isCurrent(link.path);
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.path);
                }}
                className={`whitespace-nowrap transition-colors py-1 ${
                  active
                    ? 'text-slate-950 dark:text-white font-semibold border-b-2 border-slate-900 dark:border-white'
                    : 'hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Actions + Theme toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Direct Hosted Donate Anchor Link */}
          <a
            href="https://nowpayments.io/donation/WERK"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-semibold rounded-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors whitespace-nowrap font-sans inline-flex items-center gap-1.5 shadow-2xs"
            aria-label="Donate to WERK via NOWPayments (opens in new tab)"
          >
            <Coins className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
            <span>Donate</span>
            <ExternalLink className="w-3 h-3 text-slate-400" aria-hidden="true" />
          </a>

          {!isLibraryView ? (
            <a
              href="#/vault"
              onMouseEnter={onPrefetch}
              onFocus={onPrefetch}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#/vault');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-950 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors whitespace-nowrap shrink-0 font-sans shadow-xs"
            >
              Enter WERK
            </a>
          ) : (
            <div className="flex items-center gap-2">
              <a
                href="#/"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#/');
                }}
                className="hidden sm:inline-block px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors whitespace-nowrap font-sans"
              >
                Home
              </a>
              <a
                href="#/categories"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#/categories');
                }}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors whitespace-nowrap shrink-0 font-sans"
              >
                Categories
              </a>
            </div>
          )}

          {/* Theme toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="p-2 rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" aria-hidden="true" /> : <Moon className="w-3.5 h-3.5" aria-hidden="true" />}
          </button>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            className="md:hidden p-2 rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" aria-hidden="true" /> : <Menu className="w-4 h-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-2"
        >
          {navLinks.map((link) => {
            const active = isCurrent(link.path);
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.path);
                }}
                className={`block px-3 py-2 text-xs font-medium rounded-md font-sans transition-colors ${
                  active
                    ? 'bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <a
              href="https://nowpayments.io/donation/WERK"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full text-center px-4 py-2 text-xs font-semibold rounded-md border border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-sans"
              aria-label="Donate to WERK via NOWPayments (opens in new tab)"
            >
              <Coins className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Donate (Bitcoin)</span>
              <ExternalLink className="w-3 h-3 text-amber-500" aria-hidden="true" />
            </a>

            <a
              href="#/vault"
              onMouseEnter={onPrefetch}
              onFocus={onPrefetch}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#/vault');
              }}
              className="block w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-950 rounded-md font-sans"
            >
              Enter WERK
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
