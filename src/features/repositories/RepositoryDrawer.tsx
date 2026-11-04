import React, { useEffect, useState } from 'react';
import {
  X,
  Star,
  GitFork,
  ExternalLink,
  Bookmark,
  Calendar,
  FolderPlus,
  Copy,
  Check,
  TrendingUp,
  Globe
} from 'lucide-react';
import type { Repository, Collection } from '../../types/index.js';
import { fetchRepositoryDetail, addRepoToCollection } from '../../services/api.js';

interface RepositoryDrawerProps {
  repositoryId: number | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  collections: Collection[];
  onSelectCategory?: (slug: string) => void;
  onSelectRepository?: (repo: Repository) => void;
}

export const RepositoryDrawer: React.FC<RepositoryDrawerProps> = ({
  repositoryId,
  onClose,
  isBookmarked,
  onToggleBookmark,
  collections,
  onSelectCategory,
  onSelectRepository
}) => {
  const [detail, setDetail] = useState<(Repository & { snapshots: any[]; related: Repository[] }) | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedClone, setCopiedClone] = useState(false);
  const [selectedCol, setSelectedCol] = useState<string>('');
  const [colSuccess, setColSuccess] = useState(false);

  useEffect(() => {
    if (!repositoryId) return;
    setLoading(true);
    fetchRepositoryDetail(repositoryId)
      .then(res => {
        setDetail(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [repositoryId]);

  if (!repositoryId) return null;

  const handleCopyClone = () => {
    if (!detail) return;
    navigator.clipboard.writeText(`git clone ${detail.html_url}.git`);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const handleAddToCollection = async () => {
    if (!selectedCol || !detail) return;
    try {
      await addRepoToCollection(selectedCol, detail.id);
      setColSuccess(true);
      setTimeout(() => setColSuccess(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const formatDate = (str: string | null) => {
    if (!str) return '—';
    return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-3">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono">Loading repository intelligence...</span>
          </div>
        ) : detail ? (
          <div>
            {/* Top drawer bar: close button + actions */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleBookmark(detail.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                    isBookmarked
                      ? 'border-amber-300 dark:border-amber-800/80 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                  <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>

                <a
                  href={detail.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white transition-colors"
                >
                  <span>Open on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <button
                onClick={onClose}
                aria-label="Close drawer"
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Owner */}
            <div className="mt-6 flex items-start gap-4">
              <img
                src={`https://github.com/${detail.owner}.png?size=96`}
                alt={detail.owner}
                className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-800 shrink-0"
              />
              <div>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white tracking-tight">
                  {detail.full_name}
                </h2>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <span>GitHub ID: {detail.github_id}</span>
                  <span aria-hidden="true">·</span>
                  <span>License: {detail.license || 'Unspecified'}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="mt-5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {detail.description || 'No description provided.'}
            </p>

            {/* Homepage Link */}
            {detail.homepage && (
              <div className="mt-4 flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400">
                <Globe className="w-3.5 h-3.5" />
                <a
                  href={detail.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline truncate"
                >
                  {detail.homepage}
                </a>
              </div>
            )}

            {/* Core Metrics Grid */}
            <div className="mt-6 grid grid-cols-3 gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span>Stars</span>
                </div>
                <div className="mt-1 font-mono font-bold text-lg text-slate-900 dark:text-white tabular-nums">
                  {detail.stars.toLocaleString()}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <GitFork className="w-3.5 h-3.5 text-slate-400" />
                  <span>Forks</span>
                </div>
                <div className="mt-1 font-mono font-bold text-lg text-slate-900 dark:text-white tabular-nums">
                  {detail.forks.toLocaleString()}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Discovered</span>
                </div>
                <div className="mt-1 font-mono text-xs text-slate-900 dark:text-white pt-1">
                  {formatDate(detail.first_discovered_at)}
                </div>
              </div>
            </div>

            {/* Clone snippet */}
            <div className="mt-6">
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                Quick Clone Command
              </label>
              <div className="flex items-center justify-between p-2.5 rounded-md bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200">
                <span className="truncate">{`git clone ${detail.html_url}.git`}</span>
                <button
                  onClick={handleCopyClone}
                  className="ml-3 p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded"
                  title="Copy command"
                >
                  {copiedClone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Intelligent Categories */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Intelligent Categories
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                {detail.categories?.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onClose();
                      onSelectCategory && onSelectCategory(cat.slug);
                    }}
                    className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Topics */}
            {detail.topics && detail.topics.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  GitHub Topics
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {detail.topics.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 font-mono text-[11px]">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Star Snapshots History */}
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                <span>Historical Snapshots</span>
              </div>
              <div className="mt-3 space-y-2">
                {detail.snapshots && detail.snapshots.length > 0 ? (
                  detail.snapshots.map((snap, i) => (
                    <div key={snap.id} className="flex items-center justify-between text-xs py-1.5 px-3 rounded bg-slate-50 dark:bg-slate-800/40 font-mono">
                      <span className="text-slate-500 dark:text-slate-400">
                        {new Date(snap.recorded_at).toLocaleDateString()} {new Date(snap.recorded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-slate-900 dark:text-white font-medium tabular-nums">
                        {snap.stars.toLocaleString()} stars {i === 0 && <span className="text-[10px] text-indigo-500 font-sans ml-1">(baseline)</span>}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">Continuous snapshots will be recorded every sync cycle.</p>
                )}
              </div>
            </div>

            {/* Add to Personal Collection */}
            {collections.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Add to Collection
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedCol}
                    onChange={(e) => setSelectedCol(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="">Choose a collection...</option>
                    {collections.map(col => (
                      <option key={col.id} value={col.id}>{col.name}</option>
                    ))}
                  </select>

                  <button
                    onClick={handleAddToCollection}
                    disabled={!selectedCol}
                    className="px-3 py-2 text-xs font-medium rounded-md bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 disabled:opacity-40 hover:bg-slate-800 transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    <span>{colSuccess ? 'Added!' : 'Add'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Related Repositories */}
            {detail.related && detail.related.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Related High-Star Projects
                </h3>
                <div className="space-y-2.5">
                  {detail.related.map(rel => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectRepository && onSelectRepository(rel)}
                      className="p-3 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-800/20 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-medium text-xs text-slate-900 dark:text-white truncate">
                          {rel.full_name}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {rel.description || 'No description'}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-mono tabular-nums text-slate-600 dark:text-slate-300 shrink-0">
                        <Star className="w-3 h-3 text-amber-500" />
                        <span>{rel.stars.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400 text-sm">
            Repository data could not be loaded.
          </div>
        )}
      </div>
    </div>
  );
};
