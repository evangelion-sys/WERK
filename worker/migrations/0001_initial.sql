-- Cloudflare D1 Migration for KERNEL GITHUB INDEX
-- 0001_initial.sql

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
  visibility_status TEXT NOT NULL DEFAULT 'public'
);

CREATE INDEX IF NOT EXISTS idx_repo_stars ON repositories(stars DESC);
CREATE INDEX IF NOT EXISTS idx_repo_updated ON repositories(updated_at_github DESC);
CREATE INDEX IF NOT EXISTS idx_repo_discovered ON repositories(first_discovered_at DESC);
CREATE INDEX IF NOT EXISTS idx_repo_language ON repositories(language);
CREATE INDEX IF NOT EXISTS idx_repo_full_name ON repositories(full_name);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS repository_categories (
  repository_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  PRIMARY KEY (repository_id, category_id),
  FOREIGN KEY (repository_id) REFERENCES repositories(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_repocat_cat ON repository_categories(category_id);
CREATE INDEX IF NOT EXISTS idx_repocat_repo ON repository_categories(repository_id);

CREATE TABLE IF NOT EXISTS star_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  repository_id INTEGER NOT NULL,
  stars INTEGER NOT NULL,
  recorded_at TEXT NOT NULL,
  FOREIGN KEY (repository_id) REFERENCES repositories(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_snapshot_repo ON star_snapshots(repository_id, recorded_at DESC);

CREATE TABLE IF NOT EXISTS collections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS collection_repositories (
  collection_id TEXT NOT NULL,
  repository_id INTEGER NOT NULL,
  PRIMARY KEY (collection_id, repository_id),
  FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE,
  FOREIGN KEY (repository_id) REFERENCES repositories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sync_jobs (
  id TEXT PRIMARY KEY,
  job_type TEXT NOT NULL,
  status TEXT NOT NULL,
  started_at TEXT NOT NULL,
  completed_at TEXT,
  discovered_count INTEGER NOT NULL DEFAULT 0,
  inserted_count INTEGER NOT NULL DEFAULT 0,
  updated_count INTEGER NOT NULL DEFAULT 0,
  failed_count INTEGER NOT NULL DEFAULT 0,
  error_summary TEXT
);

CREATE TABLE IF NOT EXISTS sync_cursors (
  id TEXT PRIMARY KEY,
  query TEXT NOT NULL,
  page INTEGER NOT NULL DEFAULT 1,
  last_successful_sync TEXT,
  next_sync_at TEXT
);
