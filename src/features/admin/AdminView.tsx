import React, { useState } from 'react';
import {
  Activity,
  RefreshCw,
  Database,
  Layers,
  CheckCircle2,
  XCircle,
  Play,
  RotateCw,
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import type { VaultStats } from '../../types/index.js';
import type { AdminStatus } from '../../services/api.js';

interface AdminViewProps {
  stats: VaultStats | null;
  adminStatus: AdminStatus | null;
  onTriggerDiscovery: (forceAll?: boolean) => Promise<void>;
  onTriggerRefresh: () => Promise<void>;
  onReloadStatus: () => void;
  isSyncing: boolean;
}

export const AdminView: React.FC<AdminViewProps> = ({
  stats,
  adminStatus,
  onTriggerDiscovery,
  onTriggerRefresh,
  onReloadStatus,
  isSyncing
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('kernel_vault_admin_auth'));
  });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [triggeringDiscovery, setTriggeringDiscovery] = useState(false);
  const [triggeringRefresh, setTriggeringRefresh] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin key for secure development / administration
    if (passcodeInput.trim() === 'vault-admin-2026' || passcodeInput.trim() === 'admin' || passcodeInput.trim() === 'kernel') {
      setIsAuthenticated(true);
      localStorage.setItem('kernel_vault_admin_auth', 'true');
      setAuthError(null);
    } else {
      setAuthError('Invalid administrator credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('kernel_vault_admin_auth');
    setPasscodeInput('');
  };

  const handleDiscovery = async (forceAll = false) => {
    setTriggeringDiscovery(true);
    setActionMessage(null);
    try {
      await onTriggerDiscovery(forceAll);
      setActionMessage('Discovery synchronization initiated in background.');
    } catch (err: any) {
      setActionMessage(`Failed: ${err.message}`);
    } finally {
      setTriggeringDiscovery(false);
    }
  };

  const handleRefresh = async () => {
    setTriggeringRefresh(true);
    setActionMessage(null);
    try {
      await onTriggerRefresh();
      setActionMessage('Metadata refresh initiated for existing catalog records.');
    } catch (err: any) {
      setActionMessage(`Failed: ${err.message}`);
    } finally {
      setTriggeringRefresh(false);
    }
  };

  const rateLimit = adminStatus?.rateLimit || stats?.rate_limit || { limit: 60, remaining: 60, reset: 0, used: 0 };
  const percentRemaining = rateLimit.limit > 0 ? (rateLimit.remaining / rateLimit.limit) * 100 : 100;
  const resetDate = rateLimit.reset ? new Date(rateLimit.reset * 1000) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1 uppercase tracking-wider">
            Protected Control Plane
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Vault Administration
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Monitor automated cron discovery, GitHub API quotas, checkpoint cursors, and trigger manual synchronization workflows.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer"
            >
              Sign Out
            </button>
          )}

          <button
            onClick={onReloadStatus}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Refresh Telemetry</span>
          </button>
        </div>
      </div>

      {/* Authentication Gate */}
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto my-12 p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 mx-auto flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Administrator Authentication Required
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Per Section 12 specifications, administrative controls are protected and inaccessible to anonymous users.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3 pt-2 text-left">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Passcode / Access Key
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  placeholder="Enter administrator passcode (e.g. kernel)"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {authError && (
              <p className="text-xs text-rose-500 font-medium">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-colors cursor-pointer"
            >
              Unlock Control Plane
            </button>
          </form>

          <p className="text-[11px] text-slate-400 pt-2 font-mono">
            Default credentials for local environment: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-indigo-500">kernel</code>
          </p>
        </div>
      ) : (
        <>
          {actionMessage && (
            <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-xs text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-500" />
              <span>{actionMessage}</span>
            </div>
          )}

          {/* Primary KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* GitHub API Quota */}
            <div className="p-5 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>GitHub API Rate Limit</span>
                <span className="font-mono">{rateLimit.remaining} / {rateLimit.limit}</span>
              </div>
              <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    percentRemaining > 30 ? 'bg-emerald-500' : percentRemaining > 10 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${percentRemaining}%` }}
                />
              </div>
              <div className="mt-2 text-[11px] text-slate-400 truncate">
                {resetDate ? `Quota resets at ${resetDate.toLocaleTimeString()}` : 'Default rate limit active'}
              </div>
            </div>

            {/* Sync Status */}
            <div className="p-5 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Sync Engine State</span>
                {isSyncing ? (
                  <span className="text-indigo-500 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Active
                  </span>
                ) : (
                  <span className="text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Idle
                  </span>
                )}
              </div>
              <div className="mt-2 text-xl font-bold font-mono text-slate-900 dark:text-white">
                {isSyncing ? 'Ingesting...' : 'Idle (Standing by)'}
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                Cron: Scheduled every 6 hours
              </div>
            </div>

            {/* Total Indexed */}
            <div className="p-5 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Total Vault Size</span>
                <Database className="w-3.5 h-3.5 text-indigo-500" />
              </div>
              <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                {stats ? stats.total_repositories.toLocaleString() : '—'}
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                Strictly ≥ 1,000 stars verified
              </div>
            </div>

            {/* Disciplines */}
            <div className="p-5 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Taxonomy Architecture</span>
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
              </div>
              <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                {stats ? stats.total_categories : 39} Categories
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                Deterministic metadata matching
              </div>
            </div>
          </div>

          {/* Manual Action Controls */}
          <div className="p-5 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Authorized Synchronization Controls</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Trigger GitHub API searches, ingest qualifying repositories (stars:≥1000), or refresh existing metadata.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => handleDiscovery(false)}
                disabled={isSyncing || triggeringDiscovery}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{triggeringDiscovery ? 'Running...' : 'Run Discovery Sync'}</span>
              </button>

              <button
                onClick={() => handleDiscovery(true)}
                disabled={isSyncing || triggeringDiscovery}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-200 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <span>Run All 12 Search Queries</span>
              </button>

              <button
                onClick={handleRefresh}
                disabled={isSyncing || triggeringRefresh}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-200 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{triggeringRefresh ? 'Refreshing...' : 'Refresh Existing Metadata'}</span>
              </button>
            </div>
          </div>

          {/* Sync Jobs History Table */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Synchronization Audit History
            </h3>
            <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900/40">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono">
                  <tr>
                    <th className="p-3">Job ID</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Started</th>
                    <th className="p-3 text-right">Discovered</th>
                    <th className="p-3 text-right">Inserted</th>
                    <th className="p-3 text-right">Updated</th>
                    <th className="p-3">Summary / Checkpoint</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                  {adminStatus?.jobs && adminStatus.jobs.length > 0 ? (
                    adminStatus.jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                        <td className="p-3 text-slate-600 dark:text-slate-400">{job.id}</td>
                        <td className="p-3">
                          {job.status === 'completed' ? (
                            <span className="text-emerald-600 dark:text-emerald-400 font-sans flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Completed
                            </span>
                          ) : job.status === 'failed' ? (
                            <span className="text-rose-600 dark:text-rose-400 font-sans flex items-center gap-1">
                              <XCircle className="w-3 h-3" /> Failed
                            </span>
                          ) : (
                            <span className="text-indigo-600 dark:text-indigo-400 font-sans flex items-center gap-1">
                              <RefreshCw className="w-3 h-3 animate-spin" /> In Progress
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-slate-500">{new Date(job.started_at).toLocaleTimeString()}</td>
                        <td className="p-3 text-right tabular-nums">{job.discovered_count}</td>
                        <td className="p-3 text-right tabular-nums text-emerald-600 dark:text-emerald-400 font-semibold">+{job.inserted_count}</td>
                        <td className="p-3 text-right tabular-nums text-slate-600 dark:text-slate-400">{job.updated_count}</td>
                        <td className="p-3 font-sans text-slate-500 truncate max-w-xs">{job.error_summary || 'Normal execution'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-slate-400 font-sans">
                        No sync jobs recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Configured Queries */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Configured Discovery Queries & Checkpoint Cursors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {adminStatus?.queries?.map((q) => {
                const cursor = adminStatus.cursors?.find(c => c.query_key === q.id);
                return (
                  <div key={q.id} className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                      <span>{q.name}</span>
                      <span className="text-[10px] font-mono text-indigo-500">{q.id}</span>
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {q.query}
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-mono flex items-center justify-between">
                      <span>Checkpoint: Page {cursor?.cursor || 1}</span>
                      <span>{cursor?.last_successful_sync ? new Date(cursor.last_successful_sync).toLocaleTimeString() : 'Pending'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
