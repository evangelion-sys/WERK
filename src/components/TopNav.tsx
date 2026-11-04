import React from 'react';
import { Sun, Moon, RefreshCw, Shield } from 'lucide-react';

export type NavTab = 'home' | 'categories' | 'collections' | 'recently-added' | 'trending' | 'bookmarks' | 'about' | 'admin';

interface TopNavProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  isSyncing?: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onTabChange,
  isDark,
  onToggleTheme,
  isSyncing = false
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onTabChange('home')}
          className="text-base sm:text-lg font-bold tracking-tight text-slate-950 dark:text-white whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity flex items-center gap-2 cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600 dark:bg-indigo-500"></span>
          KERNEL REPO VAULT
        </button>

        {/* Zone 2: Nav links (1-2 word labels, single line, hover underlines) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onTabChange('home')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
              currentTab === 'home'
                ? 'border-indigo-600 text-slate-950 dark:border-indigo-400 dark:text-white font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onTabChange('categories')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
              currentTab === 'categories'
                ? 'border-indigo-600 text-slate-950 dark:border-indigo-400 dark:text-white font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Categories
          </button>

          <button
            onClick={() => onTabChange('collections')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
              currentTab === 'collections'
                ? 'border-indigo-600 text-slate-950 dark:border-indigo-400 dark:text-white font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Collections
          </button>

          <button
            onClick={() => onTabChange('recently-added')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
              currentTab === 'recently-added'
                ? 'border-indigo-600 text-slate-950 dark:border-indigo-400 dark:text-white font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Recently Added
          </button>

          <button
            onClick={() => onTabChange('trending')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
              currentTab === 'trending'
                ? 'border-indigo-600 text-slate-950 dark:border-indigo-400 dark:text-white font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Trending
          </button>

          <button
            onClick={() => onTabChange('bookmarks')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
              currentTab === 'bookmarks'
                ? 'border-indigo-600 text-slate-950 dark:border-indigo-400 dark:text-white font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Bookmarks
          </button>

          <button
            onClick={() => onTabChange('about')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
              currentTab === 'about'
                ? 'border-indigo-600 text-slate-950 dark:border-indigo-400 dark:text-white font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            About
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Group */}
        <div className="flex items-center gap-3 shrink-0">
          {isSyncing && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-mono">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Syncing</span>
            </span>
          )}

          <button
            onClick={() => onTabChange('admin')}
            title="Vault Administration"
            className={`p-2 text-xs font-medium border rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'admin'
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Admin</span>
          </button>

          <button
            onClick={onToggleTheme}
            aria-label="Toggle visual theme"
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800 rounded-md transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div className="lg:hidden flex items-center gap-4 px-4 py-2 border-t border-slate-200 dark:border-slate-800/60 overflow-x-auto text-xs font-medium text-slate-600 dark:text-slate-400">
        <button
          onClick={() => onTabChange('home')}
          className={`whitespace-nowrap py-1 ${currentTab === 'home' ? 'text-indigo-600 dark:text-white font-semibold' : ''}`}
        >
          Home
        </button>
        <button
          onClick={() => onTabChange('categories')}
          className={`whitespace-nowrap py-1 ${currentTab === 'categories' ? 'text-indigo-600 dark:text-white font-semibold' : ''}`}
        >
          Categories
        </button>
        <button
          onClick={() => onTabChange('collections')}
          className={`whitespace-nowrap py-1 ${currentTab === 'collections' ? 'text-indigo-600 dark:text-white font-semibold' : ''}`}
        >
          Collections
        </button>
        <button
          onClick={() => onTabChange('recently-added')}
          className={`whitespace-nowrap py-1 ${currentTab === 'recently-added' ? 'text-indigo-600 dark:text-white font-semibold' : ''}`}
        >
          Recently Added
        </button>
        <button
          onClick={() => onTabChange('trending')}
          className={`whitespace-nowrap py-1 ${currentTab === 'trending' ? 'text-indigo-600 dark:text-white font-semibold' : ''}`}
        >
          Trending
        </button>
        <button
          onClick={() => onTabChange('bookmarks')}
          className={`whitespace-nowrap py-1 ${currentTab === 'bookmarks' ? 'text-indigo-600 dark:text-white font-semibold' : ''}`}
        >
          Bookmarks
        </button>
        <button
          onClick={() => onTabChange('about')}
          className={`whitespace-nowrap py-1 ${currentTab === 'about' ? 'text-indigo-600 dark:text-white font-semibold' : ''}`}
        >
          About
        </button>
      </div>
    </header>
  );
};
