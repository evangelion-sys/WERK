import crypto from 'crypto';
import {
  upsertRepository,
  startSyncJob,
  updateSyncJobProgress,
  finishSyncJob,
  upsertSyncCursor,
  db
} from './db.js';
import {
  searchGitHubRepositories,
  fetchSingleRepo,
  DISCOVERY_QUERIES,
  getRateLimitStatus
} from './github.js';
import { classifyRepository } from './classifier.js';

let isSyncRunning = false;

export function isCurrentlySyncing(): boolean {
  return isSyncRunning;
}

export async function runDiscoverySync(options: { forceAllQueries?: boolean; queryLimit?: number } = {}): Promise<{
  jobId: string;
  status: 'completed' | 'failed';
  discovered: number;
  inserted: number;
  updated: number;
  error?: string;
}> {
  if (isSyncRunning) {
    throw new Error('A synchronization job is already in progress');
  }

  isSyncRunning = true;
  const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  startSyncJob(jobId);

  let totalDiscovered = 0;
  let totalInserted = 0;
  let totalUpdated = 0;
  let totalFailed = 0;

  try {
    const rateLimit = getRateLimitStatus();
    if (rateLimit.remaining <= 2) {
      console.warn(`[Sync] GitHub API remaining quota low (${rateLimit.remaining}). Sync paused until reset at ${new Date(rateLimit.reset * 1000).toISOString()}`);
      finishSyncJob(jobId, 'completed', `Paused: GitHub API remaining quota is ${rateLimit.remaining}`);
      isSyncRunning = false;
      return { jobId, status: 'completed', discovered: 0, inserted: 0, updated: 0, error: 'Rate limit threshold reached' };
    }

    const queriesToRun = options.forceAllQueries ? DISCOVERY_QUERIES : DISCOVERY_QUERIES.slice(0, options.queryLimit || 4);

    for (const queryDef of queriesToRun) {
      // Check rate limit before each query
      const currentLimit = getRateLimitStatus();
      if (currentLimit.remaining <= 1) {
        console.warn(`[Sync] Stopping query run: rate limit low (${currentLimit.remaining})`);
        break;
      }

      console.log(`[Sync Discovery] Executing query: ${queryDef.name} ("${queryDef.query}")...`);

      try {
        const searchRes = await searchGitHubRepositories({
          query: queryDef.query,
          sort: 'stars',
          order: 'desc',
          page: 1,
          per_page: 30
        });

        const items = searchRes.items || [];
        totalDiscovered += items.length;

        for (const item of items) {
          // Strictly enforce: Discovered repository must have at least 1,000 stars
          if (item.stargazers_count < 1000) continue;

          const categories = classifyRepository({
            topics: item.topics || [],
            language: item.language,
            name: item.name,
            description: item.description
          });

          const res = upsertRepository({
            github_id: item.id,
            owner: item.owner.login,
            name: item.name,
            full_name: item.full_name,
            description: item.description,
            html_url: item.html_url,
            homepage: item.homepage,
            language: item.language,
            stars: item.stargazers_count,
            forks: item.forks_count,
            open_issues: item.open_issues_count,
            topics: item.topics || [],
            license: item.license ? item.license.name : null,
            created_at_github: item.created_at,
            updated_at_github: item.updated_at,
            pushed_at_github: item.pushed_at,
            is_archived: item.archived,
            is_fork: item.fork,
            categories
          });

          if (res.action === 'inserted') totalInserted++;
          else if (res.action === 'updated') totalUpdated++;
        }

        updateSyncJobProgress(jobId, {
          discovered: items.length,
          inserted: totalInserted,
          updated: totalUpdated
        });

        // Update cursor
        upsertSyncCursor({
          query_key: queryDef.id,
          cursor: 1,
          last_successful_sync: new Date().toISOString(),
          status: 'ready'
        });

      } catch (err: any) {
        totalFailed++;
        console.error(`[Sync] Failed query ${queryDef.id}:`, err.message);
        // Do not crash the entire sync if a single query fails
      }
    }

    finishSyncJob(jobId, 'completed');
    console.log(`[Sync Discovery] Completed job ${jobId}. Discovered: ${totalDiscovered}, Inserted: ${totalInserted}, Updated: ${totalUpdated}`);

    return {
      jobId,
      status: 'completed',
      discovered: totalDiscovered,
      inserted: totalInserted,
      updated: totalUpdated
    };
  } catch (err: any) {
    finishSyncJob(jobId, 'failed', err.message);
    console.error(`[Sync Discovery] Fatal error in job ${jobId}:`, err);
    return {
      jobId,
      status: 'failed',
      discovered: totalDiscovered,
      inserted: totalInserted,
      updated: totalUpdated,
      error: err.message
    };
  } finally {
    isSyncRunning = false;
  }
}

export async function runMetadataRefresh(limit = 15): Promise<{
  jobId: string;
  status: 'completed' | 'failed';
  refreshed: number;
  error?: string;
}> {
  if (isSyncRunning) {
    throw new Error('A synchronization job is already in progress');
  }

  isSyncRunning = true;
  const jobId = `refresh_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  startSyncJob(jobId);

  let refreshedCount = 0;
  let failedCount = 0;

  try {
    const repos = db.prepare(`
      SELECT owner, name
      FROM repositories
      ORDER BY last_synced_at ASC
      LIMIT ?
    `).all(limit) as { owner: string; name: string }[];

    for (const repo of repos) {
      const rateLimit = getRateLimitStatus();
      if (rateLimit.remaining <= 2) {
        console.warn(`[Metadata Refresh] Rate limit low (${rateLimit.remaining}). Halting refresh.`);
        break;
      }

      try {
        const item = await fetchSingleRepo(repo.owner, repo.name);
        if (item && item.stargazers_count >= 1000) {
          const categories = classifyRepository({
            topics: item.topics || [],
            language: item.language,
            name: item.name,
            description: item.description
          });

          upsertRepository({
            github_id: item.id,
            owner: item.owner.login,
            name: item.name,
            full_name: item.full_name,
            description: item.description,
            html_url: item.html_url,
            homepage: item.homepage,
            language: item.language,
            stars: item.stargazers_count,
            forks: item.forks_count,
            open_issues: item.open_issues_count,
            topics: item.topics || [],
            license: item.license ? item.license.name : null,
            created_at_github: item.created_at,
            updated_at_github: item.updated_at,
            pushed_at_github: item.pushed_at,
            is_archived: item.archived,
            is_fork: item.fork,
            categories
          });

          refreshedCount++;
        }
      } catch (err) {
        failedCount++;
      }
    }

    finishSyncJob(jobId, 'completed');
    return { jobId, status: 'completed', refreshed: refreshedCount };
  } catch (err: any) {
    finishSyncJob(jobId, 'failed', err.message);
    return { jobId, status: 'failed', refreshed: refreshedCount, error: err.message };
  } finally {
    isSyncRunning = false;
  }
}

// Background Cron / Interval Scheduler
let schedulerTimer: NodeJS.Timeout | null = null;

export function startBackgroundSyncScheduler() {
  if (schedulerTimer) return;

  // Run initial lightweight discovery check after 10s if not run recently
  setTimeout(async () => {
    try {
      const lastJob = db.prepare("SELECT completed_at FROM sync_jobs WHERE status = 'completed' ORDER BY completed_at DESC LIMIT 1").get() as { completed_at: string } | undefined;
      const hoursSinceLast = lastJob ? (Date.now() - new Date(lastJob.completed_at).getTime()) / (1000 * 60 * 60) : 999;
      if (hoursSinceLast >= 6) {
        console.log('[Scheduler] 6+ hours since last sync. Running discovery...');
        await runDiscoverySync({ queryLimit: 2 });
      }
    } catch (e: any) {
      console.error('[Scheduler Initial Check Error]:', e.message);
    }
  }, 10000);

  // Every 6 hours, run discovery
  const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
  schedulerTimer = setInterval(async () => {
    try {
      console.log('[Scheduler] Triggering 6-hour discovery sync...');
      await runDiscoverySync({ queryLimit: 3 });
    } catch (e: any) {
      console.error('[Scheduler Interval Error]:', e.message);
    }
  }, SIX_HOURS_MS);

  console.log('[Scheduler] Background sync engine registered (every 6 hours).');
}
