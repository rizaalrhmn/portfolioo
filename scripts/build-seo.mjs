#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
//  build-seo.mjs — zero-dependency static SEO build (Node 18+)
//
//  1. Copies the existing static site into /dist (your files stay untouched)
//  2. Rewrites the legacy vercel.app host to SITE.url everywhere
//  3. Replaces the homepage JSON-LD with a full @graph
//     (WebSite + ProfilePage + Person + ProfessionalService)
//  4. Pre-renders every published Supabase blog post to /insights/<slug>/
//     (real HTML for Googlebot, Bingbot and AI crawlers) and extracts
//     base64 cover images to real files
//  5. Generates /services/*, /pricing-malta/, /about/, /contact/,
//     /case-studies/*, /insights/, 404.html, robots.txt, sitemap.xml,
//     and the IndexNow key file
//  6. Marks any page containing "TODO" as noindex + keeps it out of the sitemap
// ─────────────────────────────────────────────────────────────
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from '../site.config.mjs';
import {
  SERVICES, PRICING, COMPARISON, INDUSTRIES, HOME_FAQS, ABOUT, CASE_STUDIES, LOCALITIES,
} from '../content/pages.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const EXCLUDE = new Set(['dist', 'node_modules', '.git', '.vercel', 'scripts', 'content', 'snippets', 'docs', '.antigravity', '.github']);
const EXCLUDE_FILES = /^(site\.config\.mjs|package(-lock)?\.json|vercel(\.after-domain)?\.json|.*\.md|\.env.*|\.gitignore)$/i;

const sitemap = []; // { loc, lastmod }
const warnings = [];
const today = new Date().toISOString().slice(0, 10);

// ── helpers ──────────────────────────────────────────────────
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (p) => SITE.url + p;
const slugify = (s) => String(s).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const hasTodo = (v) => JSON.stringify(v).includes('TODO');
const wa = (msg) => SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}` : '';

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    if (EXCLUDE.has(entry.name)) continue;
    if (entry.isFile() && EXCLUDE_FILES.test(entry.name)) continue;
    const s = path.join(src, entry.name), d = path.join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else if (entry.isFile()) await fs.copyFile(s, d);
  }
}

async function walk(dir, out = []) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, out); else out.push(p);
  }
  return out;
}

const pending = [];
function write(rel, content) {
  const file = path.join(DIST, rel);
  const job = fs.mkdir(path.dirname(file), { recursive: true }).then(() => fs.writeFile(file, content));
  pending.push(job);
  return job;
}

// ── shared JSON-LD ───────────────────────────────────────────
const personId = abs('/#person');
const serviceId = abs('/#service');
const websiteId = abs('/#website');

const personLd = () => ({
  '@type': 'Person',
  '@id': personId,
  name: SITE.name,
  jobTitle: SITE.jobTitle,
  url: abs('/'),
  image: abs(SITE.portrait),
  email: `mailto:${SITE.email}`,
  worksFor: { '@type': 'Organization', name: 'Monochrome FX' },
  knowsAbout: ['Search Engine Optimization', 'Google Ads', 'Meta Advertising', 'LinkedIn Advertising', 'TikTok Advertising', 'Conversion Rate Optimization', 'Google Analytics 4', 'Graphic Design', 'Brand Identity'],
  ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
});

const serviceLd = () => ({
  '@type': 'ProfessionalService',
  '@id': serviceId,
  name: SITE.brand,
  url: abs('/'),
  image: abs(SITE.portrait),
  email: SITE.email,
  ...(SITE.whatsapp ? { telephone: '+' + SITE.whatsapp } : {}),
  founder: { '@id': personId },
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  areaServed: [
    { '@type': 'Country', name: 'Malta' },
    { '@type': 'AdministrativeArea', name: 'Gozo' },
  ],
  // No "address": remote business serving Malta (never invent a local address).
  serviceType: ['Freelance Digital Marketing', 'SEO Consultancy', 'Google Ads Management', 'Social Media Advertising', 'Web Design & CRO'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital marketing services in Malta',
    itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.h1, url: abs(`/services/${s.slug}/`) } })),
  },
  ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
});

const breadcrumbLd = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(p) })),
});

const ldScript = (graph) => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`;

// ── layout ───────────────────────────────────────────────────
const NAV = [
  ['/services/', 'Services'],
  ['/case-studies/', 'Case Studies'],
  ['/pricing-malta/', 'Pricing'],
  ['/insights/', 'Insights'],
  ['/about/', 'About'],
  ['/contact/', 'Contact'],
];

function layout({ pathName, title, description, body, graph = [], crumbs = null, ogImage = null, ogType = 'website', noindex = false, extraHead = '' }) {
  if (noindex && pathName !== '/404') warnings.push(`noindex until TODOs are filled: ${pathName}`);
  else if (pathName !== '/404') sitemap.push({ loc: abs(pathName), lastmod: today });
  if (title.length > 60) title = title.replace(/ \| Rizal Rahman$/, '');
  if (title.length > 60) title = title.slice(0, 57).trimEnd() + '...';
  if (description.length > 160) description = description.slice(0, 157).trimEnd() + '...';
  const canonical = abs(pathName);
  const crumbHtml = crumbs ? `<nav class="crumbs" aria-label="Breadcrumb"><ol>${crumbs.map(([n, p], i) => i === crumbs.length - 1 ? `<li aria-current="page">${esc(n)}</li>` : `<li><a href="${p}">${esc(n)}</a></li>`).join('')}</ol></nav>` : '';
  if (crumbs) graph = [...graph, breadcrumbLd(crumbs)];
  const img = ogImage || abs(SITE.portrait);
  return `<!DOCTYPE html>
<html lang="en-MT">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(SITE.brand)}">
<meta property="og:locale" content="en_GB">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${img}">
<meta name="twitter:card" content="summary_large_image">
${SITE.googleVerification ? `<meta name="google-site-verification" content="${esc(SITE.googleVerification)}">` : ''}
${SITE.bingVerification ? `<meta name="msvalidate.01" content="${esc(SITE.bingVerification)}">` : ''}
<meta name="theme-color" content="#FAF8F5">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' font-weight='bold'>R</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${SITE.fontsHref}">
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/seo-pages.css">
<script src="/js/theme.js"></script>
${extraHead}
${graph.length ? ldScript(graph) : ''}
</head>
<body class="seo-page">
<a class="skip" href="#main">Skip to content</a>
<header class="scrapbook-header" id="site-header">
  <div class="container">
    <div class="header-nav-row">
      <a href="/" class="brand-stamp" aria-label="Rizal Rahman Home">RIZAL<span class="brand-dot">★</span></a>
      <nav aria-label="Primary Navigation">
        <ul class="nav-links-list" id="nav-menu">${NAV.map(([h, l]) => `<li><a href="${h}" class="nav-link${pathName.startsWith(h) ? ' active' : ''}"${pathName.startsWith(h) ? ' aria-current="page"' : ''}>${l}</a></li>`).join('')}</ul>
      </nav>
      <div class="header-actions">
        <button type="button" class="theme-toggle-btn" id="theme-toggle-btn" aria-label="Switch to dark mode" title="Toggle Dark / Light Mode">
          <span class="theme-icon-sun" aria-hidden="true">☀️</span>
          <span class="theme-icon-moon" aria-hidden="true">🌙</span>
        </button>
        <a href="/contact/" class="header-cta-btn">Free 15-min audit <span>✎</span></a>
      </div>
      <button class="mobile-nav-toggle" id="mobile-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>
<main id="main">
${crumbHtml}
${body}
</main>
${footer()}
<script>(function(){var t=document.getElementById('mobile-toggle'),m=document.getElementById('nav-menu');if(t&&m){t.addEventListener('click',function(){var o=m.classList.toggle('open');t.classList.toggle('active',o);t.setAttribute('aria-expanded',String(o));});}})();</script>
</body>
</html>`;
}

function ctaBlock(heading = 'Book a free 15-minute marketing audit') {
  const waLink = wa('Hi Rizal, I would like a free 15-minute marketing audit.');
  return `<section class="cta-band">
  <h2>${esc(heading)}</h2>
  <p>Tell me about your business and I will show you the three changes most likely to bring in more enquiries. ${esc(SITE.responseSla)}.</p>
  <div class="cta-row">
    <a class="btn-scrapbook-primary" href="/contact/">Request your audit <span>→</span></a>
    ${waLink ? `<a class="btn-scrapbook-secondary" href="${waLink}" rel="nofollow">WhatsApp me</a>` : ''}
    ${SITE.calendarUrl ? `<a class="btn-scrapbook-secondary" href="${esc(SITE.calendarUrl)}" rel="nofollow">Pick a time</a>` : ''}
  </div>
</section>`;
}

function footer() {
  return `<footer class="scrapbook-footer">
  <div class="container">
    <div class="seo-footer-grid">
      <div>
        <div class="footer-stamp-mark" style="margin-bottom:0.6rem;">
          <a href="/" class="footer-home-link" aria-label="Rizal Rahman Home">RIZAL RAHMAN<span style="color:var(--color-pink);">®</span></a>
        </div>
        <p class="f-name">Freelance Digital Marketing in Malta</p>
        <p>Remote, serving Malta &amp; Gozo · Based in ${esc(SITE.basedIn)}<br>Live overlap: ${esc(SITE.workingOverlap)}</p>
        <p><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>${SITE.whatsapp ? ` · <a href="${wa('Hi Rizal')}" rel="nofollow">WhatsApp</a>` : ''}</p>
      </div>
      <ul>
        ${SERVICES.map((s) => `<li><a href="/services/${s.slug}/">${esc(s.h1)}</a></li>`).join('')}
      </ul>
      <ul>
        <li><a href="/case-studies/">Case studies</a></li>
        <li><a href="/pricing-malta/">Pricing</a></li>
        <li><a href="/insights/">Malta marketing insights</a></li>
        <li><a href="/about/">About</a></li>
        <li><a href="/contact/">Contact</a></li>
      </ul>
    </div>
    <p class="f-copy">© ${new Date().getFullYear()} ${esc(SITE.name)}. Prices in EUR.</p>
  </div>
</footer>`;
}

const faqHtml = (faqs, heading) => `<section class="faq"><h2>${esc(heading)}</h2>${faqs.map(([q, a]) => `<details><summary><h3>${esc(q)}</h3></summary><p>${esc(a)}</p></details>`).join('')}</section>`;

const comparisonHtml = (heading = 'Freelance digital marketer vs. a traditional Malta agency') => `<section><h2>${esc(heading)}</h2>
<div class="table-wrap"><table><thead><tr>${COMPARISON.head.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead>
<tbody>${COMPARISON.rows.map((r) => `<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join('')}</tbody></table></div></section>`;

// ── page builders ────────────────────────────────────────────
function servicePages() {
  for (const s of SERVICES) {
    const p = `/services/${s.slug}/`;
    const others = SERVICES.filter((o) => o.slug !== s.slug);
    const body = `<article class="wrap">
<header class="page-hero"><p class="eyebrow">Freelance · Malta &amp; Gozo · EUR pricing</p><h1>${esc(s.h1)}</h1>${s.intro.map((t) => `<p class="lead">${esc(t)}</p>`).join('')}</header>
<section><h2>What’s included</h2><div class="grid">${s.included.map(([h, t]) => `<div class="card"><h3>${esc(h)}</h3><p>${esc(t)}</p></div>`).join('')}</div></section>
<section><h2>How we’ll work</h2><ol class="steps">${s.process.map(([w, t]) => `<li><strong>${esc(w)}</strong> ${esc(t)}</li>`).join('')}</ol></section>
<section><h2>Who this is for</h2><p>Maltese SMEs, hospitality venues, e-commerce brands and B2B firms across ${esc(LOCALITIES.join(', '))}. Pricing starts from the tiers on the <a href="/pricing-malta/">pricing page</a>, and you can see real campaign work in the <a href="/case-studies/">case studies</a>.</p></section>
${faqHtml(s.faqs, `${s.short} in Malta: frequently asked questions`)}
<section><h2>Related services</h2><ul class="links">${others.map((o) => `<li><a href="/services/${o.slug}/">${esc(o.h1)}</a></li>`).join('')}</ul></section>
${ctaBlock()}
</article>`;
    const graph = [{
      '@type': 'Service', '@id': abs(p) + '#service', name: s.h1, description: s.description, url: abs(p),
      provider: { '@id': serviceId }, areaServed: [{ '@type': 'Country', name: 'Malta' }], serviceType: s.short,
    }, serviceLd(), personLd()];
    write(`services/${s.slug}/index.html`, layout({ pathName: p, title: s.title, description: s.description, body, graph, crumbs: [['Home', '/'], ['Services', '/services/'], [s.short, p]] }));
  }
  const body = `<div class="wrap"><header class="page-hero"><h1>Freelance Digital Marketing Services in Malta</h1><p class="lead">Four focused services, delivered directly by me, priced in euro and measured on enquiries and revenue.</p></header>
<div class="grid">${SERVICES.map((s) => `<a class="card card-link" href="/services/${s.slug}/"><h2>${esc(s.h1)}</h2><p>${esc(s.card)}</p><span>Learn more →</span></a>`).join('')}</div>
${comparisonHtml()}${ctaBlock()}</div>`;
  write('services/index.html', layout({ pathName: '/services/', title: 'Digital Marketing Services in Malta | Rizal Rahman', description: 'SEO, Google Ads, Meta & LinkedIn Ads and web design/CRO for Maltese businesses — freelance, senior-led and priced transparently in EUR.', body, graph: [serviceLd()], crumbs: [['Home', '/'], ['Services', '/services/']] }));
}

function pricingPage() {
  const p = '/pricing-malta/';
  const body = `<div class="wrap"><header class="page-hero"><h1>Freelance Digital Marketing Pricing in Malta</h1><p class="lead">Transparent EUR pricing with no long lock-in. For context, published Maltese agency rates typically run from around €300–€800 a month for local SEO to €1,500–€4,000 a month for full-scale programmes.</p></header>
<div class="grid tiers">${PRICING.tiers.map((t) => `<div class="card tier${t.featured ? ' featured' : ''}"><h2>${esc(t.name)}</h2><p class="price">${esc(t.price)} <span>${esc(t.period)}</span></p><ul>${t.points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><a class="btn" href="/contact/">Get a quote</a></div>`).join('')}</div>
<section><h2>VAT, invoicing and ad spend</h2><ul class="notes">${PRICING.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul><p class="small">This is general information, not tax advice.</p></section>
${comparisonHtml()}${ctaBlock('Not sure which plan fits? Start with a free audit')}</div>`;
  write('pricing-malta/index.html', layout({ pathName: p, title: 'Digital Marketing Pricing Malta (EUR) | Rizal Rahman', description: 'Freelance digital marketing prices in Malta: audits from €290, retainers from €600/month. EUR invoicing, EU reverse-charge VAT for B2B, no long contracts.', body, graph: [serviceLd()], crumbs: [['Home', '/'], ['Pricing', p]] }));
}

function aboutPage() {
  const p = '/about/';
  const body = `<div class="wrap about"><header class="page-hero"><h1>${esc(ABOUT.h1)}</h1></header>
<div class="about-grid"><img src="${SITE.portrait}" alt="Portrait of ${esc(SITE.name)}, freelance digital marketer" width="400" height="400" loading="eager" fetchpriority="high">
<div>${ABOUT.paragraphs.map((t) => `<p>${esc(t)}</p>`).join('')}</div></div>
<section><h2>Career timeline</h2><ol class="steps">${ABOUT.timeline.map(([y, r]) => `<li><strong>${esc(y)}</strong> ${esc(r)}</li>`).join('')}</ol></section>
${ABOUT.credentials.length ? `<section><h2>Certifications</h2><ul>${ABOUT.credentials.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></section>` : ''}
<section><h2>How I work with Malta</h2><ul><li>Remote, based in ${esc(SITE.basedIn)}</li><li>Live overlap: ${esc(SITE.workingOverlap)}</li><li>${esc(SITE.responseSla)}</li><li>Euro invoicing, GDPR-aware tracking, you own every account</li></ul></section>
${SITE.sameAs.length ? `<section><h2>Find me elsewhere</h2><ul class="links">${SITE.sameAs.map((u) => `<li><a href="${esc(u)}" rel="me">${esc(new URL(u).hostname.replace('www.', ''))}</a></li>`).join('')}</ul></section>` : ''}
${ctaBlock()}</div>`;
  const graph = [{ '@type': 'ProfilePage', '@id': abs(p) + '#profilepage', url: abs(p), name: ABOUT.title, mainEntity: { '@id': personId } }, personLd()];
  write('about/index.html', layout({ pathName: p, title: ABOUT.title, description: ABOUT.description, body, graph, crumbs: [['Home', '/'], ['About', p]], ogType: 'profile' }));
}

function contactPage() {
  const p = '/contact/';
  const body = `<div class="wrap"><header class="page-hero"><h1>Hire a Freelance Digital Marketer in Malta</h1><p class="lead">Book a free 15-minute audit or ask a question. ${esc(SITE.responseSla)} — live overlap ${esc(SITE.workingOverlap)}.</p></header>
<div class="contact-grid">
<form id="lead-form" class="card" novalidate>
  <label>Name<input name="name" autocomplete="name" required></label>
  <label>Email<input name="email" type="email" autocomplete="email" required></label>
  <label>Company &amp; website<input name="company" autocomplete="organization"></label>
  <label>What do you need?<select name="service">${SERVICES.map((s) => `<option>${esc(s.short)}</option>`).join('')}<option>Not sure yet</option></select></label>
  <label>Tell me about your goals<textarea name="message" rows="5" required></textarea></label>
  <button class="btn" type="submit">Send by email</button>
  ${SITE.whatsapp ? '<button class="btn btn-ghost" type="button" id="wa-send">Send on WhatsApp</button>' : ''}
  <p class="small">Your details are only used to reply to you.</p>
</form>
<aside class="card"><h2>Direct contact</h2><p><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p>
${SITE.whatsapp ? `<p><a href="${wa('Hi Rizal')}" rel="nofollow">WhatsApp: +${esc(SITE.whatsapp)}</a></p>` : ''}
${SITE.calendarUrl ? `<p><a href="${esc(SITE.calendarUrl)}" rel="nofollow">Book a call in the calendar</a></p>` : ''}
<h3>Hours (Malta time)</h3><p>${esc(SITE.workingOverlap)}</p><h3>Where I work</h3><p>Remote, based in ${esc(SITE.basedIn)}. Serving businesses across Malta and Gozo.</p></aside>
</div></div>
<script>
(function(){var f=document.getElementById('lead-form');function body(){var d=new FormData(f);return 'Name: '+d.get('name')+'\\nEmail: '+d.get('email')+'\\nCompany: '+d.get('company')+'\\nService: '+d.get('service')+'\\n\\n'+d.get('message');}
f.addEventListener('submit',function(e){e.preventDefault();if(!f.reportValidity())return;location.href='mailto:${SITE.email}?subject='+encodeURIComponent('Audit request — '+f.name.value)+'&body='+encodeURIComponent(body());});
var w=document.getElementById('wa-send');if(w)w.addEventListener('click',function(){if(!f.reportValidity())return;window.open('https://wa.me/${SITE.whatsapp}?text='+encodeURIComponent(body()),'_blank','noopener');});})();
</script>`;
  const graph = [{ '@type': 'ContactPage', url: abs(p), name: 'Contact Rizal Rahman', about: { '@id': serviceId } }, serviceLd()];
  write('contact/index.html', layout({ pathName: p, title: 'Contact | Hire a Freelance Digital Marketer in Malta', description: 'Book a free 15-minute digital marketing audit. Freelance SEO, Google Ads and Meta Ads for Maltese businesses — reply within 1 business day, Malta time.', body, graph, crumbs: [['Home', '/'], ['Contact', p]] }));
}

function caseStudyPages() {
  const live = [];
  for (const c of CASE_STUDIES) {
    const p = `/case-studies/${c.slug}/`;
    const draft = hasTodo(c);
    if (!draft) live.push(c);
    const title = `${c.client}: ${c.channels[0]} Case Study | Rizal Rahman`;
    const body = `<article class="wrap"><header class="page-hero"><p class="eyebrow">${esc(c.industry)} · ${esc(c.location)}</p><h1>${esc(c.client)} — ${esc(c.summary)}</h1><p class="chips">${c.channels.map((x) => `<span>${esc(x)}</span>`).join('')}</p></header>
<section class="results"><h2>Results</h2><div class="grid">${c.results.map(([k, v]) => `<div class="card stat"><p class="stat-v">${esc(v)}</p><p>${esc(k)}</p></div>`).join('')}</div></section>
<section><h2>The challenge</h2><p>${esc(c.problem)}</p></section>
<section><h2>What I did</h2><ul>${c.execution.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>
${c.quote ? `<blockquote><p>“${esc(c.quote.text)}”</p><cite>${esc(c.quote.name)}, ${esc(c.quote.role)}</cite></blockquote>` : ''}
${ctaBlock('Want results like these for your Maltese business?')}</article>`;
    const graph = [{ '@type': 'Article', headline: `${c.client} case study`, about: c.industry, author: { '@id': personId }, publisher: { '@id': personId }, url: abs(p), dateModified: today }, personLd()];
    write(`case-studies/${c.slug}/index.html`, layout({ pathName: p, title, description: `${c.summary} Channels: ${c.channels.join(', ')}.`.slice(0, 158), body, graph, crumbs: [['Home', '/'], ['Case Studies', '/case-studies/'], [c.client, p]], noindex: draft }));
  }
  const list = (live.length ? live : CASE_STUDIES);
  const body = `<div class="wrap"><header class="page-hero"><h1>Digital Marketing Case Studies</h1><p class="lead">Real campaigns, real numbers: the problem, what I changed and what happened next.</p></header>
<div class="grid">${list.map((c) => `<a class="card card-link" href="/case-studies/${c.slug}/"><p class="eyebrow">${esc(c.industry)}</p><h2>${esc(c.client)}</h2><p>${esc(c.summary)}</p><span>Read case study →</span></a>`).join('')}</div>${ctaBlock()}</div>`;
  write('case-studies/index.html', layout({ pathName: '/case-studies/', title: 'Digital Marketing Case Studies | Rizal Rahman', description: 'Meta Ads, TikTok, Snapchat and branding case studies with measured results: cost per lead, enquiries and ROAS.', body, graph: [personLd()], crumbs: [['Home', '/'], ['Case Studies', '/case-studies/']], noindex: live.length === 0 }));
}

// ── blog posts from Supabase ─────────────────────────────────
async function fetchPosts() {
  const { url, key, table } = SITE.supabase;
  try {
    const res = await fetch(`${url}/rest/v1/${table}?status=eq.published&order=published_at.desc&select=*`, { headers: { apikey: key } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = await res.json();
    return Array.isArray(rows) ? rows : [];
  } catch (e) {
    warnings.push(`Could not fetch blog posts from Supabase (${e.message}). Insights pages built without posts.`);
    return [];
  }
}

async function saveCover(slug, cover) {
  if (!cover) return null;
  const m = /^data:image\/(png|jpe?g|webp|gif);base64,(.+)$/i.exec(cover);
  if (!m) return cover; // already a URL
  const ext = m[1].toLowerCase().replace('jpeg', 'jpg');
  const rel = `/images/blog/${slug}.${ext}`;
  await write(rel.slice(1), Buffer.from(m[2], 'base64'));
  return rel;
}

async function insightPages(posts) {
  const cards = [];
  for (const row of posts) {
    const slug = slugify(row.slug || row.title);
    const p = `/insights/${slug}/`;
    const cover = await saveCover(slug, row.cover_image);
    const coverAbs = cover ? (cover.startsWith('http') ? cover : abs(cover)) : null;
    const text = String(row.content || '').replace(/<[^>]+>/g, ' ');
    const words = text.split(/\s+/).filter(Boolean).length;
    const published = row.published_at || new Date().toISOString();
    const modified = row.updated_at || published;
    const description = (row.excerpt || text).replace(/\s+/g, ' ').trim().slice(0, 155);
    const tags = Array.isArray(row.tags) ? row.tags : [];
    const dateLabel = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(published));
    const body = `<article class="wrap post">
<header class="page-hero"><p class="eyebrow">${esc(row.category || 'Digital Marketing')} · <time datetime="${published}">${dateLabel}</time> · ${Math.max(1, Math.round(words / 220))} min read</p>
<h1>${esc(row.title)}</h1><p class="byline">By <a href="/about/" rel="author">${esc(row.author || SITE.name)}</a></p></header>
${cover ? `<img class="cover" src="${esc(cover)}" alt="${esc(row.title)}" width="1200" height="630" fetchpriority="high">` : ''}
<div class="prose">${row.content || ''}</div>
${tags.length ? `<p class="chips">${tags.map((t) => `<span>${esc(t)}</span>`).join('')}</p>` : ''}
<aside class="card"><h2>Need help applying this in Malta?</h2><p>See my <a href="/services/seo-malta/">SEO</a>, <a href="/services/google-ads-malta/">Google Ads</a> and <a href="/services/social-media-ads-malta/">Meta Ads</a> services, or <a href="/">read more about freelance digital marketing in Malta</a>.</p></aside>
${ctaBlock()}</article>`;
    const graph = [{
      '@type': 'BlogPosting', '@id': abs(p) + '#article', headline: row.title, description, url: abs(p), mainEntityOfPage: abs(p),
      datePublished: published, dateModified: modified, wordCount: words, inLanguage: 'en',
      ...(coverAbs ? { image: coverAbs } : {}), ...(tags.length ? { keywords: tags.join(', ') } : {}),
      author: { '@id': personId }, publisher: { '@id': personId },
    }, personLd()];
    write(`insights/${slug}/index.html`, layout({
      pathName: p, title: `${row.title} | Rizal Rahman`, description, body, graph, ogImage: coverAbs, ogType: 'article',
      crumbs: [['Home', '/'], ['Insights', '/insights/'], [row.title, p]],
      extraHead: `<meta property="article:published_time" content="${published}"><meta property="article:modified_time" content="${modified}">`,
    }));
    sitemap[sitemap.length - 1].lastmod = modified.slice(0, 10);
    cards.push({ slug, title: row.title, description, cover, dateLabel, published });
  }
  const body = `<div class="wrap"><header class="page-hero"><h1>Malta Digital Marketing Insights</h1><p class="lead">Practical guides on SEO, paid ads and growth for Maltese businesses.</p></header>
${cards.length ? `<div class="grid">${cards.map((c) => `<a class="card card-link" href="/insights/${c.slug}/">${c.cover ? `<img src="${esc(c.cover)}" alt="" width="600" height="315" loading="lazy">` : ''}<p class="eyebrow"><time datetime="${c.published}">${c.dateLabel}</time></p><h2>${esc(c.title)}</h2><p>${esc(c.description)}</p><span>Read article →</span></a>`).join('')}</div>` : '<p>New guides are on the way.</p>'}
${ctaBlock()}</div>`;
  write('insights/index.html', layout({ pathName: '/insights/', title: 'Malta Digital Marketing Insights & Guides | Rizal Rahman', description: 'Guides on SEO, Google Ads, Meta Ads and AI search for Maltese SMEs — pricing, grants, Bing, hospitality and B2B.', body, graph: [{ '@type': 'Blog', name: 'Malta Digital Marketing Insights', url: abs('/insights/'), author: { '@id': personId } }], crumbs: [['Home', '/'], ['Insights', '/insights/']] }));
  return cards;
}

// ── homepage + existing-file patches ─────────────────────────
async function patchExistingHtml(cards) {
  const files = (await walk(DIST)).filter((f) => /\.(html|xml|txt|webmanifest|json)$/i.test(f));
  for (const f of files) {
    let s = await fs.readFile(f, 'utf8');
    const before = s;
    if (SITE.url !== SITE.legacyHost) s = s.split(SITE.legacyHost).join(SITE.url);
    const rel = path.relative(DIST, f).replace(/\\/g, '/');

    if (rel === 'index.html') {
      const graph = [
        { '@type': 'WebSite', '@id': websiteId, url: abs('/'), name: SITE.brand, inLanguage: 'en', publisher: { '@id': personId } },
        { '@type': 'ProfilePage', '@id': abs('/#profilepage'), url: abs('/'), name: 'Freelance Digital Marketing in Malta | ' + SITE.name, isPartOf: { '@id': websiteId }, mainEntity: { '@id': personId } },
        personLd(),
        serviceLd(),
      ];
      const ld = ldScript(graph);
      s = /<script type="application\/ld\+json">[\s\S]*?<\/script>/i.test(s)
        ? s.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, ld)
        : s.replace('</head>', `${ld}\n</head>`);
      // Crawlable list of latest articles at the marker inside #blog
      const list = `<ul class="seo-latest" style="list-style:none;padding:0;margin:1.75rem auto 0;max-width:780px;display:flex;flex-wrap:wrap;justify-content:center;gap:0.65rem 1.25rem;font-size:0.95rem;">${cards.slice(0, 6).map((c) => `<li><a href="/insights/${c.slug}/" style="color:var(--ink-primary);text-decoration:underline;font-weight:600;">${esc(c.title)}</a></li>`).join('')}<li><a href="/insights/" style="color:var(--color-pink);text-decoration:underline;font-weight:700;">All Malta marketing insights →</a></li></ul>`;
      s = s.replace('<!-- SEO:LATEST_POSTS -->', list);
      if (SITE.googleVerification && !s.includes('google-site-verification')) s = s.replace('</head>', `<meta name="google-site-verification" content="${esc(SITE.googleVerification)}">\n</head>`);
      if (SITE.bingVerification && !s.includes('msvalidate.01')) s = s.replace('</head>', `<meta name="msvalidate.01" content="${esc(SITE.bingVerification)}">\n</head>`);
      sitemap.unshift({ loc: abs('/'), lastmod: today });
    }
    // blog.html is the JS/admin blog view → keep it working but out of the index.
    if (rel === 'blog.html' && !/name="robots"/i.test(s)) {
      s = s.replace('</head>', '<meta name="robots" content="noindex, follow">\n</head>');
    }
    if (s !== before) await fs.writeFile(f, s);
  }
}

function notFoundPage() {
  const body = `<div class="wrap"><header class="page-hero"><h1>Page not found</h1><p class="lead">That page doesn’t exist (URLs are lowercase). Try one of these:</p></header>
<ul class="links"><li><a href="/">Freelance digital marketing in Malta</a></li>${NAV.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></div>`;
  return write('404.html', layout({ pathName: '/404', title: 'Page not found | Rizal Rahman', description: 'This page could not be found.', body, noindex: true }).replace(/<link rel="canonical"[^>]*>\n/, ''));
}

async function seoFiles() {
  await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);
  const seen = new Set();
  const urls = sitemap.filter((u) => !seen.has(u.loc) && seen.add(u.loc));
  await write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${esc(u.loc)}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`);
  await write(`${SITE.indexNowKey}.txt`, SITE.indexNowKey);
  return urls.length;
}

// ── run ──────────────────────────────────────────────────────
await fs.rm(DIST, { recursive: true, force: true });
await copyDir(ROOT, DIST);
const seoCss = path.join(ROOT, 'css', 'seo-pages.css');
try { await fs.access(seoCss); } catch { warnings.push('css/seo-pages.css missing — generated pages will be unstyled.'); }

const posts = await fetchPosts();
servicePages();
pricingPage();
aboutPage();
contactPage();
caseStudyPages();
const cards = await insightPages(posts);
await notFoundPage();
await Promise.all(pending);
await patchExistingHtml(cards);
const count = await seoFiles();

console.log(`\n✔ SEO build complete → dist/  (${count} URLs in sitemap, ${posts.length} blog posts pre-rendered)`);
console.log(`  Site URL: ${SITE.url}`);
for (const w of warnings) console.log('  ⚠ ' + w);
