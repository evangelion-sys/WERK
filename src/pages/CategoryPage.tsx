import React, { useMemo, useEffect } from 'react';
import { ArrowLeft, Layers, Star, ExternalLink, Compass } from 'lucide-react';
import { RepositoryGrid } from '../components/RepositoryGrid.js';
import { ShareBar } from '../components/ShareBar.js';
import type { Repository, TierKey } from '../types/repository.js';
import { CATEGORIES } from '../data/categories.js';
import { updatePageSeo, CANONICAL_BASE } from '../utils/seo.js';
import { trackCategoryView } from '../utils/analytics.js';

interface CategoryPageProps {
  categorySlug: string;
  activeTier: TierKey;
  allRepositories: Repository[];
  onBack: () => void;
  onSelectCategorySlug: (slug: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categorySlug,
  activeTier,
  allRepositories,
  onBack,
  onSelectCategorySlug
}) => {
  const category = useMemo(() => {
    return CATEGORIES.find((c) => c.slug === categorySlug) || CATEGORIES[0];
  }, [categorySlug]);

  const categoryRepos = useMemo(() => {
    return allRepositories.filter((r) => r.categories.includes(category.name));
  }, [allRepositories, category]);

  const relatedCategories = useMemo(() => {
    return CATEGORIES.filter((c) => c.group === category.group && c.slug !== category.slug).slice(0, 5);
  }, [category]);

  const totalCategoryStars = useMemo(() => {
    return categoryRepos.reduce((acc, r) => acc + r.stars, 0);
  }, [categoryRepos]);

  const formatCompact = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`;
    return String(num);
  };

  // SEO & Social Optimization on mount/update
  useEffect(() => {
    const seoTitle = `${category.name} Open-Source Repositories`;
    const seoDescription = `Explore curated open-source ${category.name} repositories on WERK. ${category.description} Filtered by verified GitHub stars in the ${category.group} domain.`;
    const canonicalPath = `/category/${category.slug}`;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': CANONICAL_BASE
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Categories',
              'item': `${CANONICAL_BASE}/categories`
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': category.name,
              'item': `${CANONICAL_BASE}${canonicalPath}`
            }
          ]
        },
        {
          '@type': 'CollectionPage',
          'name': seoTitle,
          'description': seoDescription,
          'url': `${CANONICAL_BASE}${canonicalPath}`,
          'isPartOf': {
            '@type': 'WebSite',
            'name': 'WERK',
            'url': CANONICAL_BASE
          },
          'about': {
            '@type': 'Thing',
            'name': category.name,
            'description': category.description
          }
        }
      ]
    };

    updatePageSeo({
      title: seoTitle,
      description: seoDescription,
      path: canonicalPath,
      ogType: 'website',
      jsonLd
    });

    trackCategoryView(category.slug, category.name, categoryRepos.length);
  }, [category, categoryRepos.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-sans">
      {/* Back button and breadcrumb */}
      <div>
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-sans text-slate-500 dark:text-slate-400">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Library</span>
          </button>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</span>
          <a
            href="#/categories"
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== 'undefined') window.location.hash = '#/categories';
            }}
            className="hover:underline"
          >
            Categories
          </a>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-3 max-w-3xl">
            {/* Domain kicker */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <span>{category.group}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span>{activeTier.toUpperCase()} Stars Tier</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span>Verified Snapshot</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {category.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {category.description}
            </p>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Every indexed repository satisfies strict verification criteria including authentic GitHub star thresholds, active maintainer documentation, and direct open-source repository pathways.
            </p>

            {/* Social Share Bar */}
            <ShareBar
              title={`${category.name} Repositories`}
              description={category.description}
              urlPath={`/category/${category.slug}`}
            />
          </div>

          {/* Metrics summary for this category */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 font-mono text-xs">
            <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left min-w-[120px] shadow-2xs">
              <span className="block text-slate-500 dark:text-slate-400 font-sans text-[11px]">
                Repositories
              </span>
              <span className="font-bold text-lg text-slate-950 dark:text-white tabular-nums">
                {categoryRepos.length.toLocaleString()}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left min-w-[120px] shadow-2xs">
              <span className="block text-slate-500 dark:text-slate-400 font-sans text-[11px]">
                Aggregated Stars
              </span>
              <span className="font-bold text-lg text-amber-600 dark:text-amber-400 tabular-nums">
                {formatCompact(totalCategoryStars)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Categories in this group */}
      {relatedCategories.length > 0 && (
        <section aria-label="Related categories" className="p-4 rounded-lg bg-slate-100/70 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Related Disciplines in {category.group}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {relatedCategories.map((rc) => (
              <button
                key={rc.id}
                type="button"
                onClick={() => onSelectCategorySlug(rc.slug)}
                className="px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer"
              >
                {rc.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Main Grid with Pagination */}
      <section aria-label={`${category.name} repository listings`}>
        <RepositoryGrid
          repositories={categoryRepos}
          pageSize={24}
          onSelectCategory={(catName) => {
            const found = CATEGORIES.find((c) => c.name.toLowerCase() === catName.toLowerCase());
            if (found) onSelectCategorySlug(found.slug);
          }}
        />
      </section>
    </div>
  );
};

export default CategoryPage;
