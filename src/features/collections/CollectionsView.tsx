import React, { useState, useEffect } from 'react';
import {
  Folder,
  Bookmark,
  Plus,
  Trash2,
  Download,
  ExternalLink,
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';
import type { Repository, Collection } from '../../types/index.js';
import { RepositoryCard } from '../repositories/RepositoryCard.js';
import { fetchCollectionDetail } from '../../services/api.js';

interface CollectionsViewProps {
  collections: Collection[];
  allRepositories: Repository[];
  bookmarks: number[];
  isBookmarked: (id: number) => boolean;
  onToggleBookmark: (id: number) => void;
  onCreateCollection: (name: string, description?: string) => Promise<void>;
  onDeleteCollection: (id: string) => Promise<void>;
  onRemoveRepoFromCollection: (colId: string, repoId: number) => Promise<void>;
  onSelectRepository: (repo: Repository) => void;
  onSelectCategory: (slug: string) => void;
  initialTab?: 'collections' | 'bookmarks';
  initialCollectionSlug?: string | null;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  collections,
  allRepositories,
  bookmarks,
  isBookmarked,
  onToggleBookmark,
  onCreateCollection,
  onDeleteCollection,
  onRemoveRepoFromCollection,
  onSelectRepository,
  onSelectCategory,
  initialTab = 'collections',
  initialCollectionSlug = null
}) => {
  const [activeTab, setActiveTab] = useState<'collections' | 'bookmarks'>(initialTab);
  const [selectedColId, setSelectedColId] = useState<string | null>(() => {
    if (initialCollectionSlug) {
      const match = collections.find(c => c.slug === initialCollectionSlug || c.id === initialCollectionSlug);
      if (match) return match.id;
    }
    return collections[0]?.id || null;
  });

  const [detailedCollection, setDetailedCollection] = useState<(Collection & { repositories: Repository[] }) | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!selectedColId) return;
    setLoadingDetail(true);
    fetchCollectionDetail(selectedColId)
      .then(res => {
        setDetailedCollection(res);
        setLoadingDetail(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingDetail(false);
      });
  }, [selectedColId]);

  const bookmarkedRepos = allRepositories.filter(r => bookmarks.includes(r.id));
  const activeCollection = collections.find(c => c.id === selectedColId);

  const displayRepos = detailedCollection?.repositories || [];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName.trim()) return;
    setIsSubmitting(true);
    try {
      await onCreateCollection(newColName.trim(), newColDesc.trim());
      setNewColName('');
      setNewColDesc('');
      setShowCreateModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExportMarkdown = (name: string, repos: Repository[]) => {
    let md = `# ${name}\nExported from Kernel Repo Vault\n\n`;
    repos.forEach((r, idx) => {
      md += `${idx + 1}. [${r.full_name}](${r.html_url}) — ★ ${r.stars.toLocaleString()} (${r.language || 'Any'})\n   ${r.description || ''}\n\n`;
    });
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_repos.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1 uppercase tracking-wider">
            Curated Knowledge Stacks
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Editorial Collections & Bookmarks
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Hand-curated collections grouping battle-tested repositories around practical real-world workflows.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab Selector */}
          <div className="flex items-center p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('collections')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'collections'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Folder className="w-3.5 h-3.5 text-indigo-500" />
              <span>Collections ({collections.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'bookmarks'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-500" />
              <span>Bookmarks ({bookmarks.length})</span>
            </button>
          </div>

          {activeTab === 'collections' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Collection</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'collections' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Collection Sidebar List */}
          <div className="lg:col-span-1 border border-slate-200 dark:border-slate-800 rounded-lg p-3 bg-white dark:bg-slate-900/40 space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
              Curated Stacks
            </div>
            {collections.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500">
                No collections available yet.
              </div>
            ) : (
              collections.map(col => (
                <div
                  key={col.id}
                  onClick={() => setSelectedColId(col.id)}
                  className={`w-full p-2.5 rounded-md text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    selectedColId === col.id
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-medium'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="truncate font-semibold flex items-center gap-1.5">
                      {col.is_featured && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />}
                      <span>{col.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {col.repository_count || 0} repositories
                    </div>
                  </div>

                  {!col.is_featured && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete collection "${col.name}"?`)) {
                          onDeleteCollection(col.id);
                          if (selectedColId === col.id) setSelectedColId(null);
                        }
                      }}
                      title="Delete collection"
                      className="p-1 text-slate-400 hover:text-rose-500 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Active Collection View */}
          <div className="lg:col-span-3">
            {activeCollection ? (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {activeCollection.name}
                      </h2>
                      {activeCollection.is_featured && (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/60 px-1.5 py-0.5 rounded">
                          Editorial Curated
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                      {activeCollection.description}
                    </p>
                  </div>

                  {displayRepos.length > 0 && (
                    <button
                      onClick={() => handleExportMarkdown(activeCollection.name, displayRepos)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Stack (.md)</span>
                    </button>
                  )}
                </div>

                <div className="mt-6">
                  {loadingDetail ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-44 rounded-lg bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 animate-pulse" />
                      ))}
                    </div>
                  ) : displayRepos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {displayRepos.map(repo => (
                        <div key={repo.id} className="relative group">
                          <RepositoryCard
                            repository={repo}
                            isBookmarked={isBookmarked(repo.id)}
                            onToggleBookmark={onToggleBookmark}
                            onSelectRepository={onSelectRepository}
                            onSelectCategory={onSelectCategory}
                          />
                          {!activeCollection.is_featured && (
                            <button
                              onClick={() => onRemoveRepoFromCollection(activeCollection.id, repo.id)}
                              className="absolute top-2 right-12 z-10 p-1 rounded bg-white/80 dark:bg-slate-900/80 text-rose-500 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs cursor-pointer"
                              title="Remove from collection"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-6">
                      <Folder className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs text-slate-500">Repositories in this collection are synchronizing.</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Any qualifying repository can also be assigned from its detail drawer.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-sm">
                Select a collection to inspect its curated open-source projects.
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Bookmarks Tab */
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Saved Bookmarks ({bookmarkedRepos.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Repositories saved locally on your browser for instant retrieval.
              </p>
            </div>

            {bookmarkedRepos.length > 0 && (
              <button
                onClick={() => handleExportMarkdown('Kernel_Repo_Vault_Bookmarks', bookmarkedRepos)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Bookmarks</span>
              </button>
            )}
          </div>

          <div className="mt-6">
            {bookmarkedRepos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {bookmarkedRepos.map(repo => (
                  <RepositoryCard
                    key={repo.id}
                    repository={repo}
                    isBookmarked={true}
                    onToggleBookmark={onToggleBookmark}
                    onSelectRepository={onSelectRepository}
                    onSelectCategory={onSelectCategory}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-6">
                <Bookmark className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">No bookmarked repositories</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Click the bookmark ribbon on any repository card to save it to your personal library.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Collection Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Create Custom Stack</h3>
            <p className="text-xs text-slate-500 mt-1">Organize repositories around your projects or team stack.</p>

            <form onSubmit={handleCreate} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Collection Name *
                </label>
                <input
                  type="text"
                  required
                  value={newColName}
                  onChange={(e) => setNewColName(e.target.value)}
                  placeholder="e.g. Next-Gen Inference Stack"
                  className="w-full text-xs px-3 py-2 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={newColDesc}
                  onChange={(e) => setNewColDesc(e.target.value)}
                  placeholder="Context on this curated stack..."
                  className="w-full text-xs px-3 py-2 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !newColName.trim()}
                  className="px-4 py-1.5 text-xs font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
                >
                  {isSubmitting ? 'Creating...' : 'Create Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
