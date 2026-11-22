/**
 * Vercel Serverless Function: /api/blog-page (rewritten from /blog/:slug)
 * Serves full HTML with blog-specific Open Graph & Twitter Card metadata
 * in the initial response so WhatsApp, LinkedIn, Facebook, and X previews work.
 */

const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const SITE_ORIGIN = (process.env.SITE_URL || 'https://rizalrhmn.vercel.app').replace(/\/$/, '');

function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function toAbsoluteImageUrl(imgPath) {
  if (!imgPath) return `${SITE_ORIGIN}/assets/images/project-2-art.jpg`;
  if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) return imgPath;
  if (imgPath.startsWith('data:')) return `${SITE_ORIGIN}/assets/images/project-2-art.jpg`;
  return `${SITE_ORIGIN}/${imgPath.replace(/^\/+/, '')}`;
}

async function fetchPublishedPostBySlug(slug) {
  if (!SUPABASE_URL || !SERVICE_KEY || !slug) return null;
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`,
    {
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`
      }
    }
  );
  if (!res.ok) return null;
  const rows = await res.json();
  return rows && rows[0] ? rows[0] : null;
}

module.exports = async function handler(req, res) {
  const slug = String(req.query.slug || '').trim();
  const post = await fetchPublishedPostBySlug(slug);

  if (!post) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(404).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Article Not Found — Rizal Rahman</title>
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/blog.css">
  <script src="/js/theme.js"></script>
</head>
<body style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;">
  <div class="blog-hero-sheet grid-paper" style="max-width:560px;text-align:center;padding:3rem 2rem;">
    <div style="font-size:3rem;margin-bottom:0.75rem;">📓</div>
    <h1 class="blog-title-cutout" style="font-size:2.4rem;">404 — Page Not Found</h1>
    <p style="color:var(--ink-secondary);margin:1rem 0 1.8rem;">This blog post could not be found or has not been published yet.</p>
    <a href="/blog.html" class="btn-scrapbook-primary">← Back to Blog</a>
  </div>
</body>
</html>`);
  }

  const canonicalUrl = `${SITE_ORIGIN}/blog/${encodeURIComponent(post.slug)}`;
  const ogImage = toAbsoluteImageUrl(post.cover_image);
  const title = escHtml(post.title);
  const desc = escHtml(post.excerpt);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  return res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Rizal Rahman</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph / WhatsApp / LinkedIn / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Rizal Rahman — Portfolio & Blog">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${ogImage}">
  <meta property="article:published_time" content="${escHtml(post.published_at || '')}">

  <!-- Twitter / X Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${ogImage}">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Fredoka:wght@500;600;700&family=Kalam:wght@400;700&family=Patrick+Hand&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/blog.css">
  <script src="/js/theme.js"></script>
</head>
<body>
  <header class="scrapbook-header" id="site-header">
    <div class="container">
      <div class="header-nav-row">
        <a href="/index.html" class="brand-stamp">RIZAL<span class="brand-dot">★</span></a>
        <div class="header-actions">
          <button type="button" class="theme-toggle-btn" id="theme-toggle-btn" aria-label="Switch theme">
            <span class="theme-icon-sun" aria-hidden="true">☀️</span>
            <span class="theme-icon-moon" aria-hidden="true">🌙</span>
          </button>
          <a href="/blog.html" class="header-cta-btn">All Articles ✎</a>
        </div>
      </div>
    </div>
  </header>

  <main style="padding: 3rem 0 5rem;">
    <div class="container">
      <article class="article-modal-window ruled-paper" style="margin: 0 auto; max-width: 820px;">
        <div class="washi-tape tape-tl tape-yellow"></div>
        <div class="washi-tape tape-tr tape-blue"></div>

        <header class="article-header">
          <span class="article-category-tag">${escHtml(post.category)}</span>
          <h1 class="article-title-display">${title}</h1>
          <div class="article-meta-info">
            <span>${escHtml(post.date)}</span>
            <span>•</span>
            <span>${escHtml(post.read_time)}</span>
            <span>•</span>
            <span>${post.views || 0} reads</span>
          </div>
        </header>

        <img class="article-featured-image" src="/${escHtml(String(post.cover_image || '').replace(/^\/+/, ''))}" alt="${title}">
        <div class="article-body-text">${post.content || `<p>${desc}</p>`}</div>

        <div style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 2px dashed rgba(148,163,184,0.35); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
          <div style="font-family: var(--font-handwriting); font-size: 1.4rem; color: var(--ink-secondary);">
            Written by Rizal Rahman ✦ Manager at Monochrome FX
          </div>
          <div style="display:inline-flex; gap:0.65rem; flex-wrap:wrap;">
            <button type="button" class="btn-scrapbook-secondary" onclick="window.shareBlogArticle && window.shareBlogArticle('${escHtml(post.id)}')" style="font-size:0.9rem;padding:0.5rem 1.2rem;">🔗 Share</button>
            <a href="/blog.html" class="btn-scrapbook-primary" style="font-size:0.9rem;padding:0.5rem 1.4rem;">← All Articles</a>
          </div>
        </div>
      </article>
    </div>
  </main>

  <script src="/js/content-store.js"></script>
</body>
</html>`);
};
