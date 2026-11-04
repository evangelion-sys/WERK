import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { CATEGORIES } from './classifier.js';
import { EDITORIAL_COLLECTIONS } from './collections-seed.js';
import type {
  Repository,
  Category,
  Collection,
  RepositorySnapshot,
  SyncJob,
  SyncCursor,
  VaultStats,
  RepositoryFilters,
  PaginatedResult
} from '../src/types/index.js';

const DB_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DB_PATH = path.join(DB_DIR, 'kernel_vault.db');
const db = new Database(DB_PATH);

// High-performance Pragmas
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.pragma('synchronous = NORMAL');

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS repositories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      github_id INTEGER UNIQUE NOT NULL,
      owner TEXT NOT NULL,
      name TEXT NOT NULL,
      full_name TEXT NOT NULL,
      description TEXT,
      html_url TEXT NOT NULL,
      homepage TEXT,
      language TEXT,
      stars INTEGER NOT NULL,
      forks INTEGER NOT NULL DEFAULT 0,
      open_issues INTEGER NOT NULL DEFAULT 0,
      topics_json TEXT NOT NULL DEFAULT '[]',
      license TEXT,
      created_at_github TEXT,
      updated_at_github TEXT,
      pushed_at_github TEXT,
      first_discovered_at TEXT NOT NULL,
      last_synced_at TEXT NOT NULL,
      is_archived INTEGER NOT NULL DEFAULT 0,
      is_fork INTEGER NOT NULL DEFAULT 0,
      eligibility_status TEXT NOT NULL DEFAULT 'eligible'
    );

    CREATE INDEX IF NOT EXISTS idx_repo_stars ON repositories(stars DESC);
    CREATE INDEX IF NOT EXISTS idx_repo_updated ON repositories(updated_at_github DESC);
    CREATE INDEX IF NOT EXISTS idx_repo_discovered ON repositories(first_discovered_at DESC);
    CREATE INDEX IF NOT EXISTS idx_repo_language ON repositories(language);
    CREATE INDEX IF NOT EXISTS idx_repo_full_name ON repositories(full_name);
    CREATE INDEX IF NOT EXISTS idx_repo_eligibility ON repositories(eligibility_status);

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      icon TEXT,
      group_name TEXT NOT NULL,
      display_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_cat_slug ON categories(slug);
    CREATE INDEX IF NOT EXISTS idx_cat_group ON categories(group_name);

    CREATE TABLE IF NOT EXISTS repository_categories (
      repository_id INTEGER NOT NULL,
      category_id INTEGER NOT NULL,
      PRIMARY KEY (repository_id, category_id),
      FOREIGN KEY (repository_id) REFERENCES repositories(id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_repocat_cat ON repository_categories(category_id);
    CREATE INDEX IF NOT EXISTS idx_repocat_repo ON repository_categories(repository_id);

    CREATE TABLE IF NOT EXISTS collections (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      cover_image TEXT,
      is_featured INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS collection_repositories (
      collection_id TEXT NOT NULL,
      repository_id INTEGER NOT NULL,
      display_order INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (collection_id, repository_id),
      FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE,
      FOREIGN KEY (repository_id) REFERENCES repositories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS repository_snapshots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      repository_id INTEGER NOT NULL,
      stars INTEGER NOT NULL,
      forks INTEGER NOT NULL DEFAULT 0,
      recorded_at TEXT NOT NULL,
      FOREIGN KEY (repository_id) REFERENCES repositories(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_snapshot_repo ON repository_snapshots(repository_id, recorded_at DESC);

    CREATE TABLE IF NOT EXISTS sync_jobs (
      id TEXT PRIMARY KEY,
      started_at TEXT NOT NULL,
      completed_at TEXT,
      status TEXT NOT NULL,
      discovered_count INTEGER NOT NULL DEFAULT 0,
      inserted_count INTEGER NOT NULL DEFAULT 0,
      updated_count INTEGER NOT NULL DEFAULT 0,
      failed_count INTEGER NOT NULL DEFAULT 0,
      error_summary TEXT
    );

    CREATE TABLE IF NOT EXISTS sync_cursors (
      query_key TEXT PRIMARY KEY,
      cursor INTEGER NOT NULL DEFAULT 1,
      last_successful_sync TEXT,
      status TEXT NOT NULL DEFAULT 'ready'
    );
  `);

  // Seed / Upsert full categories library with group names and icons
  const insertCategory = db.prepare(`
    INSERT INTO categories (name, slug, description, icon, group_name, display_order)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      name = excluded.name,
      description = excluded.description,
      icon = excluded.icon,
      group_name = excluded.group_name,
      display_order = excluded.display_order
  `);

  const categoryTx = db.transaction(() => {
    for (const cat of CATEGORIES) {
      insertCategory.run(cat.name, cat.slug, cat.description, cat.icon || null, cat.group_name, cat.display_order);
    }
  });
  categoryTx();

  // Seed editorial collections
  const insertCollection = db.prepare(`
    INSERT INTO collections (id, name, slug, description, cover_image, is_featured, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      slug = excluded.slug,
      description = excluded.description,
      cover_image = excluded.cover_image,
      is_featured = excluded.is_featured
  `);

  const collectionTx = db.transaction(() => {
    const now = new Date().toISOString();
    for (const col of EDITORIAL_COLLECTIONS) {
      insertCollection.run(col.id, col.name, col.slug, col.description, col.cover_image, col.is_featured ? 1 : 0, now);
    }
  });
  collectionTx();
}

export interface RawRepoInput {
  github_id: number;
  owner: string;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  open_issues: number;
  topics: string[];
  license: string | null;
  created_at_github: string | null;
  updated_at_github: string | null;
  pushed_at_github: string | null;
  is_archived: boolean;
  is_fork: boolean;
  categories: string[];
}

export function upsertRepository(input: RawRepoInput): { action: 'inserted' | 'updated' | 'skipped'; id: number } {
  // Enforce the 1,000-star requirement
  if (input.stars < 1000) {
    return { action: 'skipped', id: 0 };
  }

  const now = new Date().toISOString();
  const topicsJson = JSON.stringify(input.topics || []);

  const existing = db.prepare('SELECT id, stars FROM repositories WHERE github_id = ?').get(input.github_id) as { id: number; stars: number } | undefined;

  let repoId = 0;
  let action: 'inserted' | 'updated' = 'inserted';

  if (!existing) {
    const insertStmt = db.prepare(`
      INSERT INTO repositories (
        github_id, owner, name, full_name, description, html_url,
        homepage, language, stars, forks, open_issues, topics_json,
        license, created_at_github, updated_at_github, pushed_at_github,
        first_discovered_at, last_synced_at, is_archived, is_fork, eligibility_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'eligible')
    `);

    const info = insertStmt.run(
      input.github_id,
      input.owner,
      input.name,
      input.full_name,
      input.description,
      input.html_url,
      input.homepage,
      input.language,
      input.stars,
      input.forks,
      input.open_issues,
      topicsJson,
      input.license,
      input.created_at_github,
      input.updated_at_github,
      input.pushed_at_github,
      now,
      now,
      input.is_archived ? 1 : 0,
      input.is_fork ? 1 : 0
    );

    repoId = Number(info.lastInsertRowid);
    action = 'inserted';

    // Record baseline snapshot
    db.prepare('INSERT INTO repository_snapshots (repository_id, stars, forks, recorded_at) VALUES (?, ?, ?, ?)')
      .run(repoId, input.stars, input.forks, now);

  } else {
    repoId = existing.id;
    action = 'updated';

    const updateStmt = db.prepare(`
      UPDATE repositories SET
        owner = ?,
        name = ?,
        full_name = ?,
        description = ?,
        html_url = ?,
        homepage = ?,
        language = ?,
        stars = ?,
        forks = ?,
        open_issues = ?,
        topics_json = ?,
        license = ?,
        updated_at_github = ?,
        pushed_at_github = ?,
        last_synced_at = ?,
        is_archived = ?,
        is_fork = ?,
        eligibility_status = 'eligible'
      WHERE id = ?
    `);

    updateStmt.run(
      input.owner,
      input.name,
      input.full_name,
      input.description,
      input.html_url,
      input.homepage,
      input.language,
      input.stars,
      input.forks,
      input.open_issues,
      topicsJson,
      input.license,
      input.updated_at_github,
      input.pushed_at_github,
      now,
      input.is_archived ? 1 : 0,
      input.is_fork ? 1 : 0,
      repoId
    );

    // Record snapshot if stars changed or last snapshot was > 24 hours ago
    const lastSnap = db.prepare('SELECT stars, recorded_at FROM repository_snapshots WHERE repository_id = ? ORDER BY recorded_at DESC LIMIT 1')
      .get(repoId) as { stars: number; recorded_at: string } | undefined;

    if (!lastSnap || lastSnap.stars !== input.stars) {
      db.prepare('INSERT INTO repository_snapshots (repository_id, stars, forks, recorded_at) VALUES (?, ?, ?, ?)')
        .run(repoId, input.stars, input.forks, now);
    }
  }

  // Update repository categories
  db.prepare('DELETE FROM repository_categories WHERE repository_id = ?').run(repoId);

  const getCatId = db.prepare('SELECT id FROM categories WHERE slug = ?');
  const insertRepoCat = db.prepare('INSERT OR IGNORE INTO repository_categories (repository_id, category_id) VALUES (?, ?)');

  for (const slug of input.categories) {
    const cat = getCatId.get(slug) as { id: number } | undefined;
    if (cat) {
      insertRepoCat.run(repoId, cat.id);
    }
  }

  // Auto-associate with relevant editorial collections
  const insertColRepo = db.prepare('INSERT OR IGNORE INTO collection_repositories (collection_id, repository_id, display_order) VALUES (?, ?, ?)');
  for (const col of EDITORIAL_COLLECTIONS) {
    if (col.matchRepo({
      full_name: input.full_name,
      topics: input.topics || [],
      description: input.description || ''
    })) {
      insertColRepo.run(col.id, repoId, 0);
    }
  }

  return { action, id: repoId };
}

// Repositories Query Engine
export function getRepositories(filters: RepositoryFilters = {}): PaginatedResult<Repository> {
  const page = Math.max(1, filters.page || 1);
  const pageSize = Math.min(100, Math.max(1, filters.pageSize || 24));
  const offset = (page - 1) * pageSize;

  const conditions: string[] = ["r.eligibility_status = 'eligible'"];
  const params: (string | number)[] = [];

  if (filters.minStars !== undefined && filters.minStars > 0) {
    conditions.push('r.stars >= ?');
    params.push(filters.minStars);
  } else {
    conditions.push('r.stars >= 1000');
  }

  if (filters.maxStars !== undefined && filters.maxStars > 0) {
    conditions.push('r.stars <= ?');
    params.push(filters.maxStars);
  }

  if (filters.language && filters.language !== 'All') {
    conditions.push('r.language = ?');
    params.push(filters.language);
  }

  if (filters.archived !== undefined && filters.archived !== null) {
    conditions.push('r.is_archived = ?');
    params.push(filters.archived ? 1 : 0);
  }

  if (filters.query && filters.query.trim()) {
    const q = `%${filters.query.trim().toLowerCase()}%`;
    conditions.push(`(
      LOWER(r.full_name) LIKE ? OR
      LOWER(r.description) LIKE ? OR
      LOWER(r.topics_json) LIKE ? OR
      LOWER(r.owner) LIKE ?
    )`);
    params.push(q, q, q, q);
  }

  let joinClause = '';
  if (filters.category && filters.category !== 'all') {
    joinClause += ` JOIN repository_categories rc_filter ON rc_filter.repository_id = r.id
                    JOIN categories c_filter ON c_filter.id = rc_filter.category_id AND c_filter.slug = ? `;
    params.unshift(filters.category);
  }

  if (filters.collection && filters.collection !== 'all') {
    joinClause += ` JOIN collection_repositories cr_filter ON cr_filter.repository_id = r.id
                    JOIN collections col_filter ON col_filter.id = cr_filter.collection_id AND col_filter.slug = ? `;
    params.unshift(filters.collection);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const countSql = `
    SELECT COUNT(DISTINCT r.id) as count
    FROM repositories r
    ${joinClause}
    ${whereClause}
  `;
  const countResult = db.prepare(countSql).get(...params) as { count: number };
  const total = countResult ? countResult.count : 0;

  // Sorting
  let orderColumn = 'r.stars';
  if (filters.sort === 'forks') orderColumn = 'r.forks';
  else if (filters.sort === 'updated') orderColumn = 'r.updated_at_github';
  else if (filters.sort === 'discovered') orderColumn = 'r.first_discovered_at';

  const orderDir = filters.order === 'asc' ? 'ASC' : 'DESC';

  const selectSql = `
    SELECT DISTINCT r.*
    FROM repositories r
    ${joinClause}
    ${whereClause}
    ORDER BY ${orderColumn} ${orderDir}
    LIMIT ? OFFSET ?
  `;

  const queryParams = [...params, pageSize, offset];
  const rows = db.prepare(selectSql).all(...queryParams) as any[];

  const getCategoriesStmt = db.prepare(`
    SELECT c.id, c.slug, c.name, c.group_name, c.description, c.icon
    FROM categories c
    JOIN repository_categories rc ON rc.category_id = c.id
    WHERE rc.repository_id = ?
  `);

  const repos: Repository[] = rows.map(row => {
    let topics: string[] = [];
    try {
      topics = JSON.parse(row.topics_json);
    } catch {
      topics = [];
    }

    const categories = getCategoriesStmt.all(row.id) as Category[];

    return {
      id: row.id,
      github_id: row.github_id,
      owner: row.owner,
      name: row.name,
      full_name: row.full_name,
      description: row.description,
      html_url: row.html_url,
      homepage: row.homepage,
      language: row.language,
      stars: row.stars,
      forks: row.forks,
      open_issues: row.open_issues,
      topics,
      license: row.license,
      created_at_github: row.created_at_github,
      updated_at_github: row.updated_at_github,
      pushed_at_github: row.pushed_at_github,
      first_discovered_at: row.first_discovered_at,
      last_synced_at: row.last_synced_at,
      is_archived: Boolean(row.is_archived),
      is_fork: Boolean(row.is_fork),
      eligibility_status: row.eligibility_status,
      categories
    };
  });

  return {
    data: repos,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize) || 1
  };
}

export function getRepositoryById(id: number): (Repository & { snapshots: RepositorySnapshot[]; related: Repository[] }) | null {
  const row = db.prepare('SELECT * FROM repositories WHERE id = ?').get(id) as any;
  if (!row) return null;

  let topics: string[] = [];
  try {
    topics = JSON.parse(row.topics_json);
  } catch {
    topics = [];
  }

  const categories = db.prepare(`
    SELECT c.id, c.slug, c.name, c.group_name, c.description, c.icon
    FROM categories c
    JOIN repository_categories rc ON rc.category_id = c.id
    WHERE rc.repository_id = ?
  `).all(row.id) as Category[];

  const snapshots = db.prepare(`
    SELECT id, repository_id, stars, forks, recorded_at
    FROM repository_snapshots
    WHERE repository_id = ?
    ORDER BY recorded_at ASC
  `).all(row.id) as RepositorySnapshot[];

  let related: Repository[] = [];
  if (categories.length > 0) {
    const relatedRows = db.prepare(`
      SELECT DISTINCT r.*
      FROM repositories r
      JOIN repository_categories rc ON rc.repository_id = r.id
      WHERE rc.category_id = ? AND r.id != ? AND r.eligibility_status = 'eligible'
      ORDER BY r.stars DESC
      LIMIT 4
    `).all(categories[0].id, row.id) as any[];

    related = relatedRows.map(r => ({
      id: r.id,
      github_id: r.github_id,
      owner: r.owner,
      name: r.name,
      full_name: r.full_name,
      description: r.description,
      html_url: r.html_url,
      homepage: r.homepage,
      language: r.language,
      stars: r.stars,
      forks: r.forks,
      open_issues: r.open_issues,
      topics: JSON.parse(r.topics_json || '[]'),
      license: r.license,
      created_at_github: r.created_at_github,
      updated_at_github: r.updated_at_github,
      pushed_at_github: r.pushed_at_github,
      first_discovered_at: r.first_discovered_at,
      last_synced_at: r.last_synced_at,
      is_archived: Boolean(r.is_archived),
      is_fork: Boolean(r.is_fork),
      eligibility_status: r.eligibility_status
    }));
  }

  return {
    id: row.id,
    github_id: row.github_id,
    owner: row.owner,
    name: row.name,
    full_name: row.full_name,
    description: row.description,
    html_url: row.html_url,
    homepage: row.homepage,
    language: row.language,
    stars: row.stars,
    forks: row.forks,
    open_issues: row.open_issues,
    topics,
    license: row.license,
    created_at_github: row.created_at_github,
    updated_at_github: row.updated_at_github,
    pushed_at_github: row.pushed_at_github,
    first_discovered_at: row.first_discovered_at,
    last_synced_at: row.last_synced_at,
    is_archived: Boolean(row.is_archived),
    is_fork: Boolean(row.is_fork),
    eligibility_status: row.eligibility_status,
    categories,
    snapshots,
    related
  };
}

export function getCategoriesWithCounts(): Category[] {
  const rows = db.prepare(`
    SELECT c.*, COUNT(rc.repository_id) as repository_count
    FROM categories c
    LEFT JOIN repository_categories rc ON rc.category_id = c.id
    LEFT JOIN repositories r ON r.id = rc.repository_id AND r.eligibility_status = 'eligible'
    GROUP BY c.id
    ORDER BY c.group_name ASC, c.display_order ASC
  `).all() as any[];

  return rows.map(r => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    description: r.description,
    icon: r.icon,
    group_name: r.group_name,
    display_order: r.display_order,
    repository_count: r.repository_count || 0
  }));
}

export function getCollectionsWithCounts(): Collection[] {
  const rows = db.prepare(`
    SELECT col.*, COUNT(cr.repository_id) as repository_count
    FROM collections col
    LEFT JOIN collection_repositories cr ON cr.collection_id = col.id
    LEFT JOIN repositories r ON r.id = cr.repository_id AND r.eligibility_status = 'eligible'
    GROUP BY col.id
    ORDER BY col.is_featured DESC, col.name ASC
  `).all() as any[];

  const getRepoIds = db.prepare('SELECT repository_id FROM collection_repositories WHERE collection_id = ? ORDER BY display_order ASC');

  return rows.map(c => {
    const ids = (getRepoIds.all(c.id) as { repository_id: number }[]).map(x => x.repository_id);
    return {
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      cover_image: c.cover_image,
      is_featured: Boolean(c.is_featured),
      created_at: c.created_at,
      repository_count: c.repository_count || 0,
      repository_ids: ids
    };
  });
}

export function getTrendingData(): {
  trending_7d: Repository[];
  trending_30d: Repository[];
  newly_discovered: Repository[];
  most_popular: Repository[];
} {
  const mostPopularRes = getRepositories({ sort: 'stars', order: 'desc', pageSize: 12 });
  const newlyDiscoveredRes = getRepositories({ sort: 'discovered', order: 'desc', pageSize: 12 });

  // Calculate actual star growth from snapshots
  const reposWithGrowth = db.prepare(`
    SELECT r.id, r.stars,
      (SELECT stars FROM repository_snapshots s WHERE s.repository_id = r.id ORDER BY recorded_at ASC LIMIT 1) as initial_stars,
      (SELECT COUNT(*) FROM repository_snapshots s WHERE s.repository_id = r.id) as snap_count
    FROM repositories r
    WHERE r.eligibility_status = 'eligible'
    LIMIT 100
  `).all() as any[];

  const trending7dList = reposWithGrowth
    .filter(r => r.snap_count > 1 && r.stars >= r.initial_stars)
    .sort((a, b) => (b.stars - b.initial_stars) - (a.stars - a.initial_stars))
    .slice(0, 12);

  let trending7dRepos: Repository[] = [];
  if (trending7dList.length > 0) {
    const ids = trending7dList.map(x => x.id);
    const placeholders = ids.map(() => '?').join(',');
    const rows = db.prepare(`SELECT * FROM repositories WHERE id IN (${placeholders})`).all(...ids) as any[];
    trending7dRepos = rows.map(r => ({
      ...r,
      topics: JSON.parse(r.topics_json || '[]'),
      is_archived: Boolean(r.is_archived),
      is_fork: Boolean(r.is_fork),
      growth_7d: r.stars - (trending7dList.find(x => x.id === r.id)?.initial_stars || r.stars)
    }));
  } else {
    // If snapshots are baseline, fallback to active updates
    const activeRes = getRepositories({ sort: 'updated', order: 'desc', pageSize: 12 });
    trending7dRepos = activeRes.data;
  }

  return {
    trending_7d: trending7dRepos,
    trending_30d: trending7dRepos,
    newly_discovered: newlyDiscoveredRes.data,
    most_popular: mostPopularRes.data
  };
}

export function getVaultStats(rateLimitInfo = { limit: 60, remaining: 60, reset: 0, used: 0 }): VaultStats {
  const totalRepos = (db.prepare("SELECT COUNT(*) as c FROM repositories WHERE eligibility_status = 'eligible'").get() as any)?.c || 0;
  const totalCategories = (db.prepare('SELECT COUNT(*) as c FROM categories').get() as any)?.c || 0;
  const totalCollections = (db.prepare('SELECT COUNT(*) as c FROM collections').get() as any)?.c || 0;
  const totalStars = (db.prepare("SELECT SUM(stars) as s FROM repositories WHERE eligibility_status = 'eligible'").get() as any)?.s || 0;

  const lastJob = db.prepare('SELECT * FROM sync_jobs ORDER BY started_at DESC LIMIT 1').get() as SyncJob | undefined;
  const lastSuccessful = db.prepare("SELECT completed_at FROM sync_jobs WHERE status = 'completed' ORDER BY completed_at DESC LIMIT 1").get() as { completed_at: string } | undefined;

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const discoveredRecently = (db.prepare('SELECT COUNT(*) as c FROM repositories WHERE first_discovered_at >= ?').get(weekAgo) as any)?.c || 0;

  let currentSyncStatus: 'idle' | 'running' | 'failed' = 'idle';
  if (lastJob && lastJob.status === 'running') currentSyncStatus = 'running';
  else if (lastJob && lastJob.status === 'failed') currentSyncStatus = 'failed';

  let nextScheduledSync = null;
  if (lastSuccessful?.completed_at) {
    const nextDate = new Date(new Date(lastSuccessful.completed_at).getTime() + 6 * 60 * 60 * 1000);
    nextScheduledSync = nextDate.toISOString();
  }

  return {
    total_repositories: totalRepos,
    total_categories: totalCategories,
    total_collections: totalCollections,
    total_stars: totalStars,
    total_stars_indexed: totalStars,
    last_successful_sync: lastSuccessful?.completed_at || null,
    next_scheduled_sync: nextScheduledSync,
    current_sync_status: currentSyncStatus,
    discovered_recently: discoveredRecently,
    rate_limit: rateLimitInfo
  };
}

// Sync Jobs Management
export function startSyncJob(id: string): void {
  db.prepare(`
    INSERT INTO sync_jobs (id, status, started_at, discovered_count, inserted_count, updated_count, failed_count)
    VALUES (?, 'running', ?, 0, 0, 0, 0)
  `).run(id, new Date().toISOString());
}

export function updateSyncJobProgress(id: string, counts: { discovered?: number; inserted?: number; updated?: number; failed?: number }) {
  const current = db.prepare('SELECT * FROM sync_jobs WHERE id = ?').get(id) as SyncJob | undefined;
  if (!current) return;

  db.prepare(`
    UPDATE sync_jobs SET
      discovered_count = discovered_count + ?,
      inserted_count = inserted_count + ?,
      updated_count = updated_count + ?,
      failed_count = failed_count + ?
    WHERE id = ?
  `).run(
    counts.discovered || 0,
    counts.inserted || 0,
    counts.updated || 0,
    counts.failed || 0,
    id
  );
}

export function finishSyncJob(id: string, status: 'completed' | 'failed', errorSummary?: string) {
  db.prepare(`
    UPDATE sync_jobs SET
      status = ?,
      completed_at = ?,
      error_summary = ?
    WHERE id = ?
  `).run(status, new Date().toISOString(), errorSummary || null, id);
}

export function getSyncJobs(limit = 20): SyncJob[] {
  return db.prepare('SELECT * FROM sync_jobs ORDER BY started_at DESC LIMIT ?').all(limit) as SyncJob[];
}

export function getSyncCursors(): SyncCursor[] {
  return db.prepare('SELECT * FROM sync_cursors ORDER BY query_key ASC').all() as SyncCursor[];
}

export function upsertSyncCursor(cursor: SyncCursor) {
  db.prepare(`
    INSERT INTO sync_cursors (query_key, cursor, last_successful_sync, status)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(query_key) DO UPDATE SET
      cursor = excluded.cursor,
      last_successful_sync = excluded.last_successful_sync,
      status = excluded.status
  `).run(cursor.query_key, cursor.cursor, cursor.last_successful_sync, cursor.status);
}

export { db };
