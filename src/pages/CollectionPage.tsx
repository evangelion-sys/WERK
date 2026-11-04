import React, { useMemo, useEffect } from 'react';
import { ArrowLeft, Sparkles, Layers, ExternalLink } from 'lucide-react';
import { RepositoryGrid } from '../components/RepositoryGrid.js';
import { ShareBar } from '../components/ShareBar.js';
import type { Repository } from '../types/repository.js';
import { COLLECTIONS } from '../data/collections.js';
import { updatePageSeo, CANONICAL_BASE } from '../utils/seo.js';
import { trackCollectionView } from '../utils/analytics.js';

interface CollectionPageProps {
  collectionSlug: string;
  allRepositories: Repository[];
  onBack: () => void;
  onSelectCollectionSlug: (slug: string) => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  collectionSlug,
  allRepositories,
  onBack,
  onSelectCollectionSlug
}) => {
  const collection = useMemo(() => {
    return COLLECTIONS.find((c) => c.slug === collectionSlug) || COLLECTIONS[0];
  }, [collectionSlug]);

  // Find the repositories matching the collection's featured full names
  const matchedRepos = useMemo(() => {
    const list: Repository[] = [];
    const lowerNames = collection.featuredRepoFullNames.map((n) => n.toLowerCase());

    for (const fullName of lowerNames) {
      const found = allRepositories.find((r) => r.fullName.toLowerCase() === fullName);
      if (found) list.push(found);
    }

    return list;
  }, [allRepositories, collection]);

  const otherCollections = useMemo(() => {
    return COLLECTIONS.filter((c) => c.slug !== collection.slug);
  }, [collection]);

  // SEO & Social Optimization on mount/update
  useEffect(() => {
    const seoTitle = `${collection.title} — Curated Collection`;
    const seoDescription = `${collection.subtitle}. ${collection.description} Verified open-source GitHub repositories on WERK.`;
    const canonicalPath = `/collection/${collection.slug}`;

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
              'name': 'Collections',
              'item': `${CANONICAL_BASE}/collections`
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': collection.title,
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

    trackCollectionView(collection.slug, collection.title);
  }, [collection]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-sans">
      {/* Back button & Breadcrumb */}
      <div>
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-sans text-slate-500 dark:text-slate-400">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Collections</span>
          </button>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">{collection.title}</span>
        </nav>

        {/* Collection Header */}
        <div className="p-8 sm:p-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-4 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2 uppercase tracking-wider">
              <span>Curated Architectural Stack</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span>{matchedRepos.length} Projects Verified</span>
            </div>
            <span className="text-[11px]">KERNEL.dev Editorial Curation</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-slate-950 dark:text-white tracking-tight">
            {collection.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-700 dark:text-slate-300 font-medium">
            {collection.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {collection.description}
          </p>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <ShareBar
              title={collection.title}
              description={collection.subtitle}
              urlPath={`/collection/${collection.slug}`}
            />
          </div>
        </div>
      </div>

      {/* Main Grid of Collection Repositories */}
      <section aria-label="Curated projects in this collection" className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">
            Included Engineering Projects
          </h2>
          <span className="text-xs font-mono text-slate-400">
            Direct GitHub Links
          </span>
        </div>

        <RepositoryGrid
          repositories={matchedRepos}
          pageSize={12}
          showPagination={false}
        />
      </section>

      {/* Other Curated Collections */}
      <section aria-label="Other curated collections" className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Explore Other Curated Stacks
          </h3>
          <a
            href="#/collections"
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== 'undefined') window.location.hash = '#/collections';
            }}
            className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:underline"
          >
            View all collections →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherCollections.slice(0, 3).map((oc) => (
            <button
              key={oc.id}
              onClick={() => onSelectCollectionSlug(oc.slug)}
              className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-400 dark:hover:border-slate-600 transition-colors text-left cursor-pointer space-y-2 shadow-2xs"
            >
              <div className="text-xs font-mono text-slate-400 dark:text-slate-500">
                {oc.featuredRepoFullNames.length} repositories
              </div>
              <h4 className="font-display font-semibold text-sm text-slate-950 dark:text-white">
                {oc.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {oc.subtitle}
              </p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CollectionPage;
