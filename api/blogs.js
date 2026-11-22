/**
 * Vercel Serverless API for Blog Posts (/api/blogs)
 * Uses Supabase REST API (no npm dependencies required).
 *
 * Required Vercel Environment Variables:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   ADMIN_PIN (defaults to '1234' if unset — set a strong PIN in Vercel!)
 */

const SUPABASE_URL = (process.env.SUPABASE_URL || 'https://hfymxwfozvxpxjnprzvz.supabase.co').replace(/\/$/, '');
const PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_WQFiD3pzqVNy3S6qFV5OOQ_ZG8kAzvK';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const ADMIN_PIN = process.env.ADMIN_PIN || '';

function isConfigured() {
  return Boolean(SUPABASE_URL && (SERVICE_KEY || PUBLISHABLE_KEY));
}

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || ('post-' + Date.now());
}

function mapRowToPost(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    readTime: row.read_time,
    date: row.date,
    publishedAt: row.published_at,
    status: row.status,
    views: row.views || 0,
    coverImage: row.cover_image,
    tags: Array.isArray(row.tags) ? row.tags : [],
    excerpt: row.excerpt,
    content: row.content,
    author: row.author || 'Rizal Rahman'
  };
}

function mapPostToRow(post) {
  const title = String(post.title || '').trim();
  const id = String(post.id || ('post-' + Date.now())).trim();
  const slug = String(post.slug || slugify(title)).trim();
  return {
    id,
    slug,
    title,
    category: String(post.category || 'Digital Marketing').trim(),
    read_time: String(post.readTime || '5 min read').trim(),
    date: String(post.date || new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date())).trim(),
    published_at: post.publishedAt || new Date().toISOString(),
    status: post.status === 'draft' ? 'draft' : 'published',
    views: Number(post.views) || 0,
    cover_image: String(post.coverImage || 'assets/images/project-1-art.jpg').trim(),
    tags: Array.isArray(post.tags) ? post.tags : [],
    excerpt: String(post.excerpt || '').trim(),
    content: String(post.content || '').trim(),
    author: String(post.author || 'Rizal Rahman').trim(),
    updated_at: new Date().toISOString()
  };
}

async function sbFetch(path, options = {}, userToken = '') {
  const apiKey = SERVICE_KEY || PUBLISHABLE_KEY;
  const authHeader = userToken ? `Bearer ${userToken}` : (SERVICE_KEY ? `Bearer ${SERVICE_KEY}` : undefined);
  const headers = {
    apikey: apiKey,
    'Content-Type': 'application/json',
    ...(authHeader ? { Authorization: authHeader } : {}),
    ...(options.headers || {})
  };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = text;
  }
  if (!res.ok) {
    const msg = (data && data.message) || `Supabase error (${res.status})`;
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  return data;
}

function isAuthorizedAdmin(req) {
  const pin = req.headers['x-admin-pin'];
  return Boolean(pin && pin === ADMIN_PIN);
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (!isConfigured()) {
    return res.status(503).json({
      configured: false,
      error: 'Persistent database is not configured. Set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and ADMIN_PIN in Vercel Environment Variables.'
    });
  }

  try {
    // Public view increment
    if (req.method === 'POST' && req.query.action === 'view' && req.query.id) {
      const id = encodeURIComponent(req.query.id);
      const rows = await sbFetch(`blog_posts?id=eq.${id}&select=id,views`);
      if (rows && rows[0]) {
        await sbFetch(`blog_posts?id=eq.${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ views: (rows[0].views || 0) + 1 })
        });
      }
      return res.status(200).json({ ok: true });
    }

    // Admin PIN verification endpoint
    if (req.method === 'GET' && req.query.action === 'verify') {
      if (!ADMIN_PIN) {
        return res.status(503).json({ ok: false, error: 'ADMIN_PIN is not configured on the server.' });
      }
      if (!isAuthorizedAdmin(req)) {
        return res.status(401).json({ ok: false, error: 'Invalid Admin PIN.' });
      }
      return res.status(200).json({ ok: true });
    }

    // Read posts (public gets published only; admin gets all)
    if (req.method === 'GET') {
      const includeDrafts = req.query.all === '1' && isAuthorizedAdmin(req);
      const filter = includeDrafts ? '' : 'status=eq.published&';
      const slug = req.query.slug ? `slug=eq.${encodeURIComponent(req.query.slug)}&` : '';
      const id = req.query.id ? `id=eq.${encodeURIComponent(req.query.id)}&` : '';
      const rows = await sbFetch(`blog_posts?${filter}${slug}${id}order=published_at.desc`);
      const posts = (rows || []).map(mapRowToPost);
      return res.status(200).json({ configured: true, posts });
    }

    // Write operations require Admin PIN
    if (!isAuthorizedAdmin(req)) {
      return res.status(401).json({ error: 'Unauthorized: valid Admin PIN required.' });
    }

    if (req.method === 'POST' && req.query.action === 'migrate') {
      const posts = Array.isArray(req.body && req.body.posts) ? req.body.posts : [];
      if (!posts.length) return res.status(400).json({ error: 'No posts provided for migration.' });
      const rows = posts.map(mapPostToRow);
      const saved = await sbFetch('blog_posts?on_conflict=id', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
        body: JSON.stringify(rows)
      });
      return res.status(200).json({ ok: true, count: (saved || []).length, posts: (saved || []).map(mapRowToPost) });
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const body = req.body || {};
      if (!body.title || !body.excerpt || !body.content) {
        return res.status(400).json({ error: 'Title, excerpt, and content are required.' });
      }
      const row = mapPostToRow(body);
      const saved = await sbFetch('blog_posts?on_conflict=id', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
        body: JSON.stringify([row])
      });
      return res.status(200).json({ ok: true, post: saved && saved[0] ? mapRowToPost(saved[0]) : mapRowToPost(row) });
    }

    if (req.method === 'DELETE') {
      const id = req.query.id || (req.body && req.body.id);
      if (!id) return res.status(400).json({ error: 'Missing blog post id.' });
      await sbFetch(`blog_posts?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message || 'Server error.' });
  }
};
