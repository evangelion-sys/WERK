/**
 * KERNEL GITHUB INDEX — Cloudflare Worker
 * Handles API routing, D1 persistence, and scheduled Cron triggers (every 6 hours).
 */

export interface Env {
  DB: any; // Cloudflare D1Database
  GITHUB_TOKEN?: string;
  ADMIN_API_KEY?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      if (pathname === '/api/health') {
        return new Response(JSON.stringify({ status: 'ok', runtime: 'cloudflare-worker' }), {
          headers: corsHeaders
        });
      }

      if (pathname === '/api/stats') {
        const stats = await env.DB.prepare(`
          SELECT 
            (SELECT COUNT(*) FROM repositories WHERE visibility_status = 'public') as total_repositories,
            (SELECT COUNT(*) FROM categories) as total_categories,
            (SELECT COALESCE(SUM(stars), 0) FROM repositories WHERE visibility_status = 'public') as total_stars_indexed
        `).first();

        const lastSync = await env.DB.prepare(`
          SELECT completed_at FROM sync_jobs WHERE status = 'completed' ORDER BY completed_at DESC LIMIT 1
        `).first();

        return new Response(JSON.stringify({
          ...stats,
          last_successful_sync: lastSync?.completed_at || null,
          next_scheduled_sync: lastSync?.completed_at ? new Date(new Date(lastSync.completed_at).getTime() + 6 * 3600 * 1000).toISOString() : null
        }), { headers: corsHeaders });
      }

      if (pathname === '/api/categories') {
        const { results } = await env.DB.prepare(`
          SELECT c.*, COUNT(rc.repository_id) as repository_count
          FROM categories c
          LEFT JOIN repository_categories rc ON rc.category_id = c.id
          GROUP BY c.id
          ORDER BY repository_count DESC, c.name ASC
        `).all();

        return new Response(JSON.stringify(results), { headers: corsHeaders });
      }

      if (pathname === '/api/repositories') {
        const page = parseInt(searchParams.get('page') || '1', 10);
        const pageSize = Math.min(100, parseInt(searchParams.get('pageSize') || '24', 10));
        const offset = (page - 1) * pageSize;
        const category = searchParams.get('category');
        const query = searchParams.get('query');
        const minStars = parseInt(searchParams.get('minStars') || '1000', 10);

        let querySql = `
          SELECT DISTINCT r.*
          FROM repositories r
        `;
        let whereConditions = ["r.visibility_status = 'public'", 'r.stars >= ?'];
        let params: any[] = [minStars];

        if (category && category !== 'all') {
          querySql += `
            JOIN repository_categories rc ON rc.repository_id = r.id
            JOIN categories c ON c.id = rc.category_id AND c.slug = ?
          `;
          params.unshift(category);
        }

        if (query) {
          whereConditions.push(`(
            LOWER(r.full_name) LIKE ? OR
            LOWER(r.description) LIKE ? OR
            LOWER(r.topics_json) LIKE ?
          )`);
          const qParam = `%${query.toLowerCase()}%`;
          params.push(qParam, qParam, qParam);
        }

        querySql += ` WHERE ${whereConditions.join(' AND ')} ORDER BY r.stars DESC LIMIT ? OFFSET ?`;
        params.push(pageSize, offset);

        const { results } = await env.DB.prepare(querySql).bind(...params).all();

        const countSql = `SELECT COUNT(DISTINCT r.id) as total FROM repositories r WHERE r.stars >= 1000`;
        const totalRes = await env.DB.prepare(countSql).first();
        const total = totalRes?.total || results.length;

        const formatted = results.map((row: any) => ({
          ...row,
          topics: JSON.parse(row.topics_json || '[]'),
          is_archived: Boolean(row.is_archived),
          is_fork: Boolean(row.is_fork)
        }));

        return new Response(JSON.stringify({
          data: formatted,
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize)
        }), { headers: corsHeaders });
      }

      return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
        status: 404,
        headers: corsHeaders
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: corsHeaders
      });
    }
  },

  // Cloudflare Scheduled Cron Handler
  async scheduled(event: any, env: Env, ctx: any): Promise<void> {
    console.log(`[Cloudflare Cron] Scheduled sync triggered at: ${new Date(event.scheduledTime).toISOString()}`);
    // Run automated 6-hour repository discovery
  }
};
