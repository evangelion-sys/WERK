import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  initDatabase,
  getRepositories,
  getRepositoryById,
  getCategoriesWithCounts,
  getCollectionsWithCounts,
  getTrendingData,
  getVaultStats,
  getSyncJobs,
  getSyncCursors,
  upsertRepository,
  db
} from './server/db.js';
import { bootstrapDatabaseIfEmpty } from './server/seed-data.js';
import { runDiscoverySync, runMetadataRefresh, isCurrentlySyncing, startBackgroundSyncScheduler } from './server/sync.js';
import { getRateLimitStatus, DISCOVERY_QUERIES } from './server/github.js';
import crypto from 'crypto';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize SQLite database and bootstrap data
initDatabase();
bootstrapDatabaseIfEmpty(upsertRepository, db);
startBackgroundSyncScheduler();

// API Routes
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    isSyncing: isCurrentlySyncing()
  });
});

app.get('/api/stats', (_req, res) => {
  const rateLimit = getRateLimitStatus();
  const stats = getVaultStats(rateLimit);
  res.json(stats);
});

app.get('/api/categories', (_req, res) => {
  const categories = getCategoriesWithCounts();
  res.json(categories);
});

app.get('/api/repositories', (req, res) => {
  const {
    query,
    category,
    collection,
    language,
    minStars,
    maxStars,
    archived,
    sort,
    order,
    page,
    pageSize
  } = req.query;

  const result = getRepositories({
    query: query as string | undefined,
    category: category as string | undefined,
    collection: collection as string | undefined,
    language: language as string | undefined,
    minStars: minStars ? parseInt(minStars as string, 10) : undefined,
    maxStars: maxStars ? parseInt(maxStars as string, 10) : undefined,
    archived: archived === 'true' ? true : archived === 'false' ? false : undefined,
    sort: sort as any,
    order: order as any,
    page: page ? parseInt(page as string, 10) : 1,
    pageSize: pageSize ? parseInt(pageSize as string, 10) : 24
  });

  res.json(result);
});

app.get('/api/repositories/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid repository ID' });
  }

  const repo = getRepositoryById(id);
  if (!repo) {
    return res.status(404).json({ error: 'Repository not found' });
  }

  res.json(repo);
});

app.get('/api/trending', (_req, res) => {
  const trending = getTrendingData();
  res.json(trending);
});

// Collections API
app.get('/api/collections', (_req, res) => {
  const collections = getCollectionsWithCounts();
  res.json(collections);
});

app.get('/api/collections/:slug', (req, res) => {
  const { slug } = req.params;
  const col = db.prepare('SELECT * FROM collections WHERE slug = ? OR id = ?').get(slug, slug) as any;
  if (!col) {
    return res.status(404).json({ error: 'Collection not found' });
  }

  const repoRows = db.prepare(`
    SELECT r.*
    FROM repositories r
    JOIN collection_repositories cr ON cr.repository_id = r.id
    WHERE cr.collection_id = ? AND r.eligibility_status = 'eligible'
    ORDER BY cr.display_order ASC, r.stars DESC
  `).all(col.id) as any[];

  const repos = repoRows.map(r => ({
    ...r,
    topics: JSON.parse(r.topics_json || '[]'),
    is_archived: Boolean(r.is_archived),
    is_fork: Boolean(r.is_fork)
  }));

  res.json({
    ...col,
    repositories: repos,
    repository_count: repos.length
  });
});

app.post('/api/collections', (req, res) => {
  const { name, description } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Collection name is required' });
  }

  const id = `col_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const now = new Date().toISOString();

  db.prepare('INSERT INTO collections (id, name, description, created_at) VALUES (?, ?, ?, ?)')
    .run(id, name.trim(), description ? description.trim() : '', now);

  res.status(201).json({ id, name: name.trim(), description: description || '', created_at: now, repository_ids: [] });
});

app.post('/api/collections/:id/repositories', (req, res) => {
  const collectionId = req.params.id;
  const { repository_id } = req.body;

  if (!repository_id) {
    return res.status(400).json({ error: 'Repository ID is required' });
  }

  const exists = db.prepare('SELECT id FROM collections WHERE id = ?').get(collectionId);
  if (!exists) {
    return res.status(404).json({ error: 'Collection not found' });
  }

  db.prepare('INSERT OR IGNORE INTO collection_repositories (collection_id, repository_id) VALUES (?, ?)')
    .run(collectionId, repository_id);

  res.json({ success: true, collectionId, repository_id });
});

app.delete('/api/collections/:id/repositories/:repoId', (req, res) => {
  const { id: collectionId, repoId } = req.params;
  db.prepare('DELETE FROM collection_repositories WHERE collection_id = ? AND repository_id = ?')
    .run(collectionId, parseInt(repoId, 10));

  res.json({ success: true });
});

app.delete('/api/collections/:id', (req, res) => {
  const collectionId = req.params.id;
  db.prepare('DELETE FROM collections WHERE id = ?').run(collectionId);
  res.json({ success: true });
});

// Admin endpoints
app.get('/api/admin/status', (_req, res) => {
  const rateLimit = getRateLimitStatus();
  const jobs = getSyncJobs(20);
  const cursors = getSyncCursors();
  const isSyncing = isCurrentlySyncing();

  res.json({
    rateLimit,
    jobs,
    cursors,
    isSyncing,
    queries: DISCOVERY_QUERIES
  });
});

app.post('/api/admin/sync/discovery', async (req, res) => {
  if (isCurrentlySyncing()) {
    return res.status(409).json({ error: 'A sync job is already in progress' });
  }

  const { forceAll } = req.body || {};

  try {
    // Run async in background or wait for first batch
    const promise = runDiscoverySync({ forceAllQueries: Boolean(forceAll), queryLimit: forceAll ? 12 : 3 });
    // Respond immediately with initial status while the background job processes
    res.json({
      message: 'Discovery synchronization initiated',
      status: 'started'
    });
    // Wait in background without blocking response
    await promise;
  } catch (err: any) {
    console.error('[Admin Sync Discovery Error]:', err);
  }
});

app.post('/api/admin/sync/metadata', async (_req, res) => {
  if (isCurrentlySyncing()) {
    return res.status(409).json({ error: 'A sync job is already in progress' });
  }

  try {
    const promise = runMetadataRefresh(15);
    res.json({
      message: 'Metadata refresh initiated',
      status: 'started'
    });
    await promise;
  } catch (err: any) {
    console.error('[Admin Refresh Error]:', err);
  }
});


// Serve static public assets (robots.txt, sitemap.xml, favicons)
const publicDir = path.resolve(__dirname, 'public');
app.use(express.static(publicDir));
app.get('/robots.txt', (_req, res) => {
  res.type('text/plain');
  res.sendFile(path.resolve(publicDir, 'robots.txt'));
});
app.get('/sitemap.xml', (_req, res) => {
  res.type('application/xml');
  res.sendFile(path.resolve(publicDir, 'sitemap.xml'));
});

// Vite Middleware for Full-stack Dev & Production Serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[KERNEL GITHUB INDEX] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
