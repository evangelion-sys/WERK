import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { PublicHomePage } from './pages/PublicHomePage.js';
import { CollectionSection } from './components/CollectionSection.js';
import { COLLECTIONS } from './data/collections.js';
import { loadTierDataset } from './services/datasetLoader.js';
import type { Repository, TierKey } from './types/repository.js';
import { ArrowUp, ArrowLeft, Loader2 } from 'lucide-react';

// Lazy-loaded routes for optimal initial bundle size and FCP/LCP
const VaultPage = lazy(() => import('./pages/VaultPage.js').then((m) => ({ default: m.VaultPage })));
const AboutPage = lazy(() => import('./pages/AboutPage.js').then((m) => ({ default: m.AboutPage })));
const WhyVaultPage = lazy(() => import('./pages/WhyVaultPage.js').then((m) => ({ default: m.WhyVaultPage })));
const FAQPage = lazy(() => import('./pages/FAQPage.js').then((m) => ({ default: m.FAQPage })));
const MethodologyPage = lazy(() => import('./pages/MethodologyPage.js').then((m) => ({ default: m.MethodologyPage })));
const ContactPage = lazy(() => import('./pages/ContactPage.js').then((m) => ({ default: m.ContactPage })));
const CategoriesDirectoryPage = lazy(() => import('./pages/CategoriesDirectoryPage.js').then((m) => ({ default: m.CategoriesDirectoryPage })));
const CategoryPage = lazy(() => import('./pages/CategoryPage.js').then((m) => ({ default: m.CategoryPage })));
const CollectionPage = lazy(() => import('./pages/CollectionPage.js').then((m) => ({ default: m.CollectionPage })));
const DataQualityReportPage = lazy(() => import('./pages/DataQualityReportPage.js').then((m) => ({ default: m.DataQualityReportPage })));
const SupportPage = lazy(async () => {
  const module = await import('./pages/SupportPage.js');
  const Component = module.SupportPage || (module as any).default;
  return { default: Component };
});
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage.js').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage.js').then((m) => ({ default: m.TermsPage })));

// Robust fallback error boundary preventing blank screens in production
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[WERK Error Boundary]:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-xl mx-auto my-16 p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-center space-y-4 font-sans">
          <div className="w-10 h-10 mx-auto rounded-full bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold text-sm">
            !
          </div>
          <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-white">
            Unable to load page view
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            An unexpected error occurred while rendering this view. You can return to the home page or reload the page.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                if (typeof window !== 'undefined') {
                  window.location.hash = '#/';
                }
              }}
              className="px-4 py-2 text-xs font-semibold rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Return to Home
            </button>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                if (typeof window !== 'undefined') {
                  window.location.reload();
                }
              }}
              className="px-4 py-2 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Reload View
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Safe storage wrapper to prevent crashes in restricted iframe / privacy mode
const safeGetStorageTheme = (): boolean => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem('werk_theme');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark');
    }
  } catch {
    // Graceful fallback if storage is blocked
  }
  return true;
};

const safeSetStorageTheme = (isDark: boolean): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('werk_theme', isDark ? 'dark' : 'light');
    }
  } catch {
    // Gracefully ignore storage failures
  }
};

// Route resolver supporting both hash routes and direct Vercel pathname rewrites
const resolveNormalizedRoute = (): string => {
  if (typeof window === 'undefined') return '#/';
  const hash = window.location.hash;
  if (hash && hash !== '#' && hash !== '#/') {
    return hash;
  }
  const pathname = window.location.pathname;
  if (pathname === '/donate' || pathname === '/support') {
    return '#/support' + (window.location.search || '');
  }
  if (pathname === '/privacy') {
    return '#/privacy' + (window.location.search || '');
  }
  if (pathname === '/terms') {
    return '#/terms' + (window.location.search || '');
  }
  if (pathname.startsWith('/category/')) {
    return `#${pathname}` + (window.location.search || '');
  }
  if (pathname.startsWith('/collection/')) {
    return `#${pathname}` + (window.location.search || '');
  }
  if (['/vault', '/library', '/about', '/why', '/faq', '/methodology', '/contact', '/privacy', '/terms', '/categories', '/collections', '/audit', '/quality-report'].includes(pathname)) {
    return `#${pathname}` + (window.location.search || '');
  }
  return hash || '#/';
};

export function App() {
  const [activeTier, setActiveTier] = useState<TierKey>('10k');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentHash, setCurrentHash] = useState<string>(resolveNormalizedRoute);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  const [isDark, setIsDark] = useState<boolean>(safeGetStorageTheme);

  // Dark mode persistence
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      safeSetStorageTheme(true);
    } else {
      root.classList.remove('dark');
      safeSetStorageTheme(false);
    }
  }, [isDark]);

  // Hash-based and popstate routing listener
  useEffect(() => {
    const handleNavigation = () => {
      setCurrentHash(resolveNormalizedRoute());
    };

    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  // Scroll listener for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLibraryRoute =
    currentHash.startsWith('#/vault') ||
    currentHash.startsWith('#/library') ||
    currentHash.startsWith('#/categories') ||
    currentHash.startsWith('#/category/') ||
    currentHash.startsWith('#/collections') ||
    currentHash.startsWith('#/collection/');

  // Prefetch dataset on hover/focus intent
  const handlePrefetch = () => {
    loadTierDataset(activeTier).catch(() => {});
  };

  // Load dataset only when entering library routes or when activeTier changes while browsing
  useEffect(() => {
    if (!isLibraryRoute && repositories.length === 0) {
      // Keep homepage and informational pages lightweight (zero JSON transfer)
      setIsLoading(false);
      return;
    }

    let isCancelled = false;
    setIsLoading(true);

    loadTierDataset(activeTier)
      .then((data) => {
        if (!isCancelled) {
          setRepositories(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load tier dataset:', err);
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [activeTier, isLibraryRoute]);

  const handleSelectTier = (tier: TierKey) => {
    setActiveTier(tier);
  };

  const navigate = (path: string) => {
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route parser
  const renderRoute = () => {
    const hash = currentHash;

    if (hash === '#/' || hash === '' || hash === '#/home') {
      return <PublicHomePage onNavigate={navigate} />;
    }

    if (hash.startsWith('#/vault') || hash.startsWith('#/library')) {
      const urlParams = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '');
      const catSlug = urlParams.get('cat') || undefined;
      return (
        <VaultPage
          repositories={repositories}
          activeTier={activeTier}
          onSelectTier={handleSelectTier}
          selectedCategorySlug={catSlug}
          onSelectCategorySlug={(slug) => {
            if (slug) {
              navigate(`#/vault?cat=${slug}`);
            } else {
              navigate('#/vault');
            }
          }}
          isLoading={isLoading}
        />
      );
    }

    if (hash.startsWith('#/about')) {
      return <AboutPage onNavigate={navigate} />;
    }

    if (hash.startsWith('#/why')) {
      return <WhyVaultPage onNavigate={navigate} />;
    }

    if (hash.startsWith('#/faq')) {
      return <FAQPage onNavigate={navigate} />;
    }

    if (hash.startsWith('#/methodology')) {
      return <MethodologyPage onNavigate={navigate} />;
    }

    if (hash.startsWith('#/contact')) {
      return <ContactPage onNavigate={navigate} />;
    }

    if (hash.startsWith('#/privacy')) {
      return <PrivacyPolicyPage onNavigate={navigate} />;
    }

    if (hash.startsWith('#/terms')) {
      return <TermsPage onNavigate={navigate} />;
    }

    if (hash.startsWith('#/audit') || hash.startsWith('#/quality-report')) {
      return <DataQualityReportPage onBack={() => navigate('#/vault')} />;
    }

    if (
      hash.startsWith('#/support') ||
      hash.startsWith('#/donate') ||
      hash === '#support' ||
      hash === '#donate'
    ) {
      return <SupportPage onNavigate={navigate} />;
    }

    if (hash.startsWith('#/categories')) {
      return (
        <CategoriesDirectoryPage
          activeTier={activeTier}
          allRepositories={repositories}
          onSelectCategorySlug={(slug) => navigate(`#/category/${slug}`)}
          onBack={() => navigate('#/vault')}
        />
      );
    }

    if (hash.startsWith('#/category/')) {
      const slug = hash.replace('#/category/', '').split('?')[0];
      return (
        <CategoryPage
          categorySlug={slug}
          activeTier={activeTier}
          allRepositories={repositories}
          onBack={() => navigate('#/vault')}
          onSelectCategorySlug={(newSlug) => navigate(`#/category/${newSlug}`)}
        />
      );
    }

    if (hash.startsWith('#/collections')) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          <div>
            <button
              onClick={() => navigate('#/vault')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Library</span>
            </button>

            <div className="pb-6 border-b border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Curated Architectural Stacks
              </div>

              <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
                Curated Collections
              </h1>

              <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Handcrafted groupings of synergistic repositories designed to accelerate production engineering.
              </p>
            </div>
          </div>

          <CollectionSection
            collections={COLLECTIONS}
            allRepositories={repositories}
            onSelectCollection={(slug) => navigate(`#/collection/${slug}`)}
          />
        </div>
      );
    }

    if (hash.startsWith('#/collection/')) {
      const slug = hash.replace('#/collection/', '').split('?')[0];
      return (
        <CollectionPage
          collectionSlug={slug}
          allRepositories={repositories}
          onBack={() => navigate('#/collections')}
          onSelectCollectionSlug={(newSlug) => navigate(`#/collection/${newSlug}`)}
        />
      );
    }

    // Default fallback to PublicHomePage
    return <PublicHomePage onNavigate={navigate} onPrefetch={handlePrefetch} />;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-150">
      {/* WCAG 2.2 AA SC 2.4.1 Bypass Blocks: Skip to Content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-slate-900 focus:text-white dark:focus:bg-white dark:focus:text-slate-950 focus:rounded-md focus:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans text-xs font-semibold"
      >
        Skip to main content
      </a>

      {/* Sticky Header complying with Top Bar Contract */}
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        activePath={currentHash}
        onNavigate={navigate}
        onPrefetch={handlePrefetch}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {isLibraryRoute && isLoading && repositories.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3" role="status" aria-live="polite">
            <Loader2 className="w-6 h-6 text-slate-600 dark:text-slate-400 animate-spin" aria-hidden="true" />
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Loading {activeTier.toUpperCase()} repository dataset (5,000 verified records)...
            </p>
          </div>
        ) : (
          <ErrorBoundary key={currentHash}>
            <Suspense
              fallback={
                <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3" role="status" aria-live="polite">
                  <Loader2 className="w-5 h-5 text-slate-400 animate-spin" aria-hidden="true" />
                  <span className="sr-only">Loading page content...</span>
                </div>
              }
            >
              {renderRoute()}
            </Suspense>
          </ErrorBoundary>
        )}
      </main>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 p-2.5 rounded-md bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 shadow-md hover:opacity-90 transition-all cursor-pointer border border-slate-700 dark:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <ArrowUp className="w-4 h-4" aria-hidden="true" />
        </button>
      )}

      {/* Complete, Consistent Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
