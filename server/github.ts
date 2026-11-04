export interface GitHubApiRateLimit {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
}

let latestRateLimit: GitHubApiRateLimit = {
  limit: 60,
  remaining: 60,
  reset: Math.floor(Date.now() / 1000) + 3600,
  used: 0
};

export function getRateLimitStatus(): GitHubApiRateLimit {
  return { ...latestRateLimit };
}

export interface GitHubRepoItem {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  description: string | null;
  fork: boolean;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
  } | null;
  topics: string[];
  archived: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepoItem[];
}

export const DISCOVERY_QUERIES = [
  { id: 'all-stars', name: 'High Star Universal', query: 'stars:>=1000' },
  { id: 'ai-ml', name: 'AI & Machine Learning', query: 'stars:>=1000 topic:artificial-intelligence' },
  { id: 'ml-deep', name: 'Deep Learning', query: 'stars:>=1000 topic:machine-learning' },
  { id: 'react', name: 'React Ecosystem', query: 'stars:>=1000 topic:react' },
  { id: 'devtools', name: 'Developer Tools', query: 'stars:>=1000 topic:developer-tools' },
  { id: 'automation', name: 'Automation', query: 'stars:>=1000 topic:automation' },
  { id: 'design-sys', name: 'Design Systems', query: 'stars:>=1000 topic:design-system' },
  { id: 'typescript', name: 'TypeScript', query: 'stars:>=1000 language:typescript' },
  { id: 'python', name: 'Python Systems', query: 'stars:>=1000 language:python' },
  { id: 'security', name: 'Cybersecurity', query: 'stars:>=1000 topic:security' },
  { id: 'self-hosted', name: 'Self-Hosted', query: 'stars:>=1000 topic:self-hosted' },
  { id: 'database', name: 'Databases & Storage', query: 'stars:>=1000 topic:database' }
];

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function searchGitHubRepositories(params: {
  query: string;
  sort?: 'stars' | 'updated' | 'help-wanted-issues';
  order?: 'desc' | 'asc';
  page?: number;
  per_page?: number;
}): Promise<GitHubSearchResponse> {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'KernelGithubIndex/1.0 (Open-Source Intelligence Platform)'
  };

  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  const queryParams = new URLSearchParams({
    q: params.query,
    sort: params.sort || 'stars',
    order: params.order || 'desc',
    page: String(params.page || 1),
    per_page: String(params.per_page || 30)
  });

  const url = `https://api.github.com/search/repositories?${queryParams.toString()}`;

  // Retry with exponential backoff
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    attempt++;
    try {
      const response = await fetch(url, { headers });

      // Update rate limit tracking from response headers
      const limitHeader = response.headers.get('x-ratelimit-limit');
      const remainingHeader = response.headers.get('x-ratelimit-remaining');
      const resetHeader = response.headers.get('x-ratelimit-reset');
      const usedHeader = response.headers.get('x-ratelimit-used');

      if (limitHeader && remainingHeader) {
        latestRateLimit = {
          limit: parseInt(limitHeader, 10),
          remaining: parseInt(remainingHeader, 10),
          reset: resetHeader ? parseInt(resetHeader, 10) : Math.floor(Date.now() / 1000) + 3600,
          used: usedHeader ? parseInt(usedHeader, 10) : 0
        };
      }

      if (response.status === 403 || response.status === 429) {
        const retryAfter = response.headers.get('retry-after');
        const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : Math.pow(2, attempt) * 2000;
        console.warn(`[GitHub API] Rate limited (${response.status}). Waiting ${waitTime}ms before retry...`);
        if (attempt >= maxRetries) {
          throw new Error(`GitHub API rate limit exceeded (HTTP ${response.status}). Remaining: ${latestRateLimit.remaining}`);
        }
        await sleep(waitTime);
        continue;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GitHub API error ${response.status}: ${errorText}`);
      }

      const data = await response.json() as GitHubSearchResponse;
      return data;
    } catch (err: any) {
      if (attempt >= maxRetries) {
        throw err;
      }
      const backoff = Math.pow(2, attempt) * 1000;
      await sleep(backoff);
    }
  }

  throw new Error('Failed to query GitHub API after retries');
}

export async function fetchSingleRepo(owner: string, repo: string): Promise<GitHubRepoItem | null> {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'KernelGithubIndex/1.0 (Open-Source Intelligence Platform)'
  };
  if (token) headers['Authorization'] = `token ${token}`;

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    if (!res.ok) return null;
    return (await res.json()) as GitHubRepoItem;
  } catch (err) {
    console.error(`Failed to fetch repo ${owner}/${repo}:`, err);
    return null;
  }
}
