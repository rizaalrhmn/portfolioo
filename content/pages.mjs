// ─────────────────────────────────────────────────────────────
//  PAGE CONTENT — British/EU English, EUR pricing, Malta context.
//  Edit text freely. Anything containing "TODO" marks the page as
//  a draft: it gets noindex and is left out of the sitemap until fixed.
// ─────────────────────────────────────────────────────────────

export const LOCALITIES = ['Valletta', 'Sliema', "St. Julian's", 'Gżira', 'Birkirkara', 'Mrieħel CBD', "St. Paul's Bay", 'Mosta', 'Gozo'];

// ── Services (/services/<slug>/) ─────────────────────────────
export const SERVICES = [
  {
    slug: 'seo-malta',
    short: 'SEO',
    title: 'Freelance SEO Consultant Malta | Rizal Rahman',
    description: 'Freelance SEO consultant for Maltese businesses: technical audits, Core Web Vitals, local SEO and AI-search (GEO) readiness. Realistic 3–6 month roadmap, EUR pricing.',
    h1: 'Freelance SEO Consultant in Malta',
    card: 'Technical SEO, local SEO and AI-search readiness with a realistic 3–6 month roadmap.',
    intro: [
      'Most Maltese websites do not lose rankings because of one big mistake. They lose them to dozens of small ones: slow pages on mobile, thin service pages, missing structured data and no presence on the directories that already rank on page one. I work as a freelance SEO consultant for SMEs across Malta and Gozo, fixing those issues in order of revenue impact.',
      'You get senior, hands-on work — no account managers, no junior hand-offs — and a reporting pack that ties rankings to enquiries, not vanity metrics. I do not promise guaranteed first-page rankings. Google itself warns against anyone who does. I promise a clear plan, transparent progress and work you can audit.',
    ],
    included: [
      ['Technical & Core Web Vitals audit', 'Crawlability, indexing, redirects, canonicals, sitemaps, LCP ≤ 2.5 s, INP ≤ 200 ms and CLS fixes.'],
      ['Keyword & intent mapping', 'One primary keyword per URL, mapped to Maltese buyer intent across Google and Bing.'],
      ['On-page optimisation', 'Titles, meta descriptions, headings, internal links and copy written for people first.'],
      ['Local SEO', 'Google Business Profile (where eligible), Malta citations such as Yellow, Tminta and Tech.mt, and locality pages.'],
      ['Structured data', 'Organisation, Person, Service, Article and Breadcrumb JSON-LD validated in the Rich Results Test.'],
      ['AI search / GEO', 'Direct answers, comparison tables and entity corroboration so AI Overviews and ChatGPT can cite you.'],
    ],
    process: [
      ['Weeks 1–2', 'Audit and quick wins: fix indexing blockers and broken pages.'],
      ['Weeks 3–6', 'Rebuild key service pages and the internal-link structure.'],
      ['Months 2–3', 'Local citations, reviews and the first Malta-specific guides.'],
      ['Months 4–6', 'Link earning, refresh content stuck at positions 4–10, monthly reporting.'],
    ],
    faqs: [
      ['How long does SEO take to work in Malta?', 'For most Maltese SMEs, meaningful organic traction takes 3 to 6 months. Technical fixes can show results in weeks, but competitive commercial keywords need consistent content, reviews and local links. I share a month-by-month plan so you know what to expect before you commit.'],
      ['Do you guarantee first-page rankings?', 'No. Nobody controls Google’s results, and Google advises businesses to be cautious of anyone promising guaranteed rankings. What I do commit to is transparent work, agreed KPIs such as enquiries and qualified traffic, and monthly reports you can verify in Search Console.'],
      ['Do you optimise for Bing as well?', 'Yes. Bing holds roughly a tenth of Malta’s search market, around double its global share, largely due to corporate desktop use. I verify Bing Webmaster Tools and set up IndexNow so new pages are discovered quickly.'],
    ],
  },
  {
    slug: 'google-ads-malta',
    short: 'Google Ads',
    title: 'Freelance Google Ads Specialist Malta | Rizal Rahman',
    description: 'Google Ads management for Maltese SMEs: Search and Shopping campaigns, GA4/GTM conversion tracking, negative keyword hygiene and monthly ROAS/CPA reporting in EUR.',
    h1: 'Freelance Google Ads Specialist in Malta',
    card: 'Search & Shopping campaigns with clean GA4 tracking and monthly ROAS/CPA reports.',
    intro: [
      'Google Ads is the fastest way to put a Maltese business in front of people searching right now — but in a small market, wasted clicks add up quickly. I build and manage Search and Shopping campaigns for SMEs, hospitality venues and e-commerce brands, with every euro tracked back to a lead or sale.',
      'You keep full ownership of the account and the data. Ad spend is paid directly by you to Google; my fee is transparent and never hidden inside your budget.',
    ],
    included: [
      ['Account structure', 'Search and Shopping campaigns organised by intent, location and margin.'],
      ['Conversion tracking', 'GA4, Google Tag Manager, enhanced conversions and call/WhatsApp tracking.'],
      ['Keyword hygiene', 'Weekly search-term reviews and negative keyword lists to stop wasted spend.'],
      ['Ads & assets', 'Responsive search ads, sitelinks, callouts and image assets written for Maltese buyers.'],
      ['Landing page CRO', 'Clear offers, fast pages and short forms that turn clicks into enquiries.'],
      ['Reporting', 'A monthly report on spend, CPA, ROAS and next actions — in plain English.'],
    ],
    process: [
      ['Week 1', 'Audit the existing account and tracking, or set up from scratch.'],
      ['Week 2', 'Launch the restructured campaigns with conversion tracking verified.'],
      ['Weeks 3–8', 'Bid, keyword and ad testing; landing page improvements.'],
      ['Ongoing', 'Monthly optimisation and reporting against agreed CPA/ROAS targets.'],
    ],
    faqs: [
      ['How much should a Maltese business spend on Google Ads?', 'It depends on your sector and the cost per click, but many Maltese SMEs start testing with €500–€1,500 a month in ad spend, paid directly to Google. I recommend a budget after looking at keyword costs and your profit per customer.'],
      ['How quickly will I see results?', 'Ads can generate enquiries within days of launch. The first 4–8 weeks are about learning which keywords and messages convert, so performance usually improves steadily after the first month.'],
      ['Who owns the Google Ads account?', 'You do. Campaigns are built in your own account, with me added as a manager. If we stop working together, you keep everything: campaigns, history and data.'],
    ],
  },
  {
    slug: 'social-media-ads-malta',
    short: 'Meta & LinkedIn Ads',
    title: 'Meta Ads & LinkedIn Ads Freelancer Malta | Rizal Rahman',
    description: 'Facebook, Instagram and LinkedIn ads for Maltese businesses: lead generation, Meta Pixel and Conversions API tracking, creative that converts and clear EUR reporting.',
    h1: 'Meta Ads & LinkedIn Ads Freelancer in Malta',
    card: 'Facebook, Instagram and LinkedIn campaigns with Pixel + CAPI tracking and scroll-stopping creative.',
    intro: [
      'Paid social is where I have spent most of my career: running lead-generation and sales campaigns on Facebook, Instagram, TikTok and Snapchat for healthcare, training, furniture and consumer brands. I combine media buying with in-house creative, so the ads are designed and tested by the same person who manages the budget.',
      'For Maltese B2B firms, LinkedIn reaches a large share of the country’s professionals. For hospitality and retail, Meta remains the most efficient way to drive direct bookings and sales.',
    ],
    included: [
      ['Campaign strategy', 'Objectives, audiences and budget split across Meta, LinkedIn and TikTok.'],
      ['Tracking', 'Meta Pixel, Conversions API, lead-form CRM sync and UTM discipline.'],
      ['Creative production', 'Static, carousel, video and AI-assisted visuals designed for each placement.'],
      ['Lead generation', 'Instant forms, WhatsApp click-to-chat and landing pages with lead quality checks.'],
      ['Testing', 'Structured creative and audience tests, so decisions are based on data.'],
      ['Reporting', 'Cost per lead, cost per acquisition and ROAS in EUR, every month.'],
    ],
    process: [
      ['Week 1', 'Audit pixel, events and past results; agree KPIs.'],
      ['Week 2', 'Produce the first creative batch and launch test campaigns.'],
      ['Weeks 3–6', 'Scale winners, cut losers, refresh creative.'],
      ['Ongoing', 'Monthly reporting and creative rotation to avoid ad fatigue.'],
    ],
    faqs: [
      ['Is Meta or LinkedIn better for my Maltese business?', 'Meta (Facebook and Instagram) usually wins for hospitality, retail and consumer services because of its lower cost per lead. LinkedIn is more expensive per click but reaches decision-makers directly, so it suits B2B services, financial firms and corporate advisory.'],
      ['Do you create the ads as well?', 'Yes. I am a graphic designer as well as a media buyer, so static, carousel and short video creative is included. You do not need a separate design agency.'],
      ['What tracking do you set up?', 'The Meta Pixel plus the Conversions API, so conversions are still measured when browsers block cookies. Leads can be synced to your CRM or a Google Sheet automatically.'],
    ],
  },
  {
    slug: 'web-design-cro-malta',
    short: 'Web Design & CRO',
    title: 'SEO-Ready Web Design & CRO Malta | Rizal Rahman',
    description: 'Fast, SEO-ready landing pages and websites for Maltese businesses, built to pass Core Web Vitals on mobile and desktop and designed to convert visitors into enquiries.',
    h1: 'SEO-Ready Web Design & CRO in Malta',
    card: 'Fast landing pages that pass Core Web Vitals and turn visitors into enquiries.',
    intro: [
      'Traffic is only useful if the page converts. I design landing pages and small business websites that load fast, read clearly and make it easy to get in touch — built with clean, crawlable HTML so they rank as well as they convert.',
      'Malta is unusual: around half of web traffic is on desktop. Every layout I build is tested on both desktop and mobile, not just one.',
    ],
    included: [
      ['Conversion-focused design', 'Clear offer, proof, pricing and a single strong call to action per page.'],
      ['Core Web Vitals', 'Optimised images, minimal scripts and self-hosted fonts to hit Google’s “Good” thresholds.'],
      ['SEO foundations', 'Semantic headings, metadata, structured data, sitemap and robots rules from day one.'],
      ['Brand & visual design', 'Typography, colour and graphics aligned with your brand identity.'],
      ['Analytics', 'GA4, consent-aware tracking and event setup for forms, calls and WhatsApp.'],
      ['A/B testing', 'Headline, offer and form tests once traffic allows.'],
    ],
    process: [
      ['Week 1', 'Goals, sitemap and wireframes.'],
      ['Weeks 2–3', 'Design, copy and build.'],
      ['Week 4', 'Speed testing, tracking checks and launch.'],
      ['After launch', 'Conversion reviews and iterative improvements.'],
    ],
    faqs: [
      ['Which platform do you build on?', 'It depends on what you need to manage yourself. For simple sites I build static or Next.js pages for speed; for teams that edit content often, WordPress with a lightweight theme works well.'],
      ['What are Core Web Vitals?', 'Google’s page-experience metrics: Largest Contentful Paint (loading, good at 2.5 seconds or less), Interaction to Next Paint (responsiveness, good at 200 ms or less) and Cumulative Layout Shift (visual stability).'],
      ['Can you improve my existing website instead of rebuilding it?', 'Often, yes. A conversion and speed audit usually finds quick wins — compressing images, removing unused scripts, rewriting the hero section and shortening forms — before a rebuild is needed.'],
    ],
  },
];

// ── Pricing (/pricing-malta/) — edit numbers to your real rates ──
export const PRICING = {
  tiers: [
    {
      name: 'Growth Audit',
      price: 'from €290',
      period: 'one-off',
      points: ['Technical SEO + tracking audit', 'Ads account review (Google or Meta)', 'Prioritised 90-day action plan', '45-minute walkthrough call'],
    },
    {
      name: 'Focused Retainer',
      price: 'from €600',
      period: 'per month',
      featured: true,
      points: ['One core channel: SEO, Google Ads or Meta Ads', 'Monthly optimisation & creative refresh', 'Monthly KPI report', 'No long lock-in: 30 days’ notice'],
    },
    {
      name: 'Multi-Channel Growth',
      price: 'from €1,100',
      period: 'per month',
      points: ['SEO + paid ads working together', 'Landing page CRO', 'Ad creative production included', 'Fortnightly check-ins'],
    },
  ],
  notes: [
    'Ad spend is paid directly by you to Google, Meta or LinkedIn and is never bundled into my fee.',
    'All prices are in euro (EUR) and exclude VAT where applicable.',
    'B2B services for VAT-registered Maltese and EU businesses are normally invoiced under the reverse-charge mechanism: no VAT is added to my invoice and you account for it locally. I check your VAT number on the EU VIES system before invoicing. Please confirm your own treatment with your accountant.',
    'Private individuals and non-VAT-registered businesses: please ask before ordering so the correct VAT treatment can be confirmed.',
  ],
};

// ── Freelancer vs agency comparison (used on homepage + pricing) ──
export const COMPARISON = {
  head: ['', 'Freelance digital marketer', 'Traditional Malta agency'],
  rows: [
    ['Who does the work', 'Senior specialist, directly', 'Often junior staff via an account manager'],
    ['Typical monthly cost', '€600–€1,500', '€1,500–€4,000+'],
    ['Turnaround', 'Days', 'Weeks, depending on queue'],
    ['Reporting', 'Plain-English KPIs: leads, CPA, ROAS', 'Varies; often traffic and impressions'],
    ['Contract', 'Monthly, 30 days’ notice', 'Often 6–12 month lock-in'],
  ],
};

// ── Industries (homepage section) ──
export const INDUSTRIES = [
  ['Tourism & Hospitality', 'Hotels, farmhouses, restaurants and tour operators shifting bookings from OTAs to direct.'],
  ['Retail & e-Commerce', 'Shopify and WooCommerce stores selling across Malta, Gozo and the EU.'],
  ['Professional & Financial Services', 'Advisory, legal, accounting and fintech firms winning B2B leads on Google and LinkedIn.'],
  ['Real Estate', 'Agencies and developers generating qualified buyer and tenant enquiries.'],
  ['Healthcare & Training', 'Clinics and training centres — the sector where I have run the most lead-generation campaigns.'],
  ['iGaming & B2B suppliers', 'Compliant B2B marketing for suppliers and service providers (no gambling consumer ads).'],
];

// ── Homepage FAQ (visible Q&A, no FAQPage schema — Google limits FAQ rich results) ──
export const HOME_FAQS = [
  ['Why hire a freelance digital marketer in Malta instead of an agency?', 'You work directly with the person doing the work, so decisions are faster and nothing is lost in hand-offs. Freelance retainers in Malta are typically lower than full-agency fees, and you can scale up or down month by month without long contracts.'],
  ['You are based in India — how does working with Malta clients work?', 'I work remotely and keep fixed overlap hours with Malta, Monday to Friday 09:00–17:00 CET/CEST. Calls run on Google Meet or Zoom, communication is by email or WhatsApp, and I reply within one business day Malta time. Invoices are in euro.'],
  ['How long until I see results?', 'Paid ads on Google or Meta can bring enquiries within days of launch. SEO is slower: most Maltese SMEs see meaningful organic traction in 3 to 6 months. Every plan starts with a timeline so expectations are clear from day one.'],
  ['How do you invoice Maltese companies for VAT?', 'Prices are in EUR. For VAT-registered Maltese and EU businesses, B2B services are normally invoiced under the reverse-charge mechanism, so no VAT is added to the invoice. I verify your VAT number on VIES first. Your accountant should confirm your own treatment.'],
  ['Is my data GDPR-compliant?', 'Yes. I set up GA4, Meta and Google Ads tracking with consent mode, work only in your own accounts, and sign a data processing agreement where needed. You keep ownership of all accounts and data.'],
  ['Do you cover Gozo as well as Malta?', 'Yes. I work with businesses across Malta and Gozo, including Valletta, Sliema, St. Julian’s, Birkirkara, the Mrieħel CBD, St. Paul’s Bay and Victoria.'],
  ['Can you help with the Digitalise Your SME grant?', 'I can help plan and deliver eligible digital marketing, analytics and e-commerce upgrades. Grant eligibility and applications are handled by the scheme and your adviser, and spending must not start before official approval.'],
];

// ── About (/about/) ──
export const ABOUT = {
  title: 'Rizal Rahman — Freelance Digital Marketer for Malta | About',
  description: 'About Rizal Rahman: freelance digital marketer and graphic designer with 4+ years of performance marketing, Meta Ads and brand design experience, serving Maltese businesses remotely.',
  h1: 'Rizal Rahman — Freelance Digital Marketer Serving Malta',
  paragraphs: [
    'I am a digital marketer and graphic designer, currently Manager at Monochrome FX in Kerala, India. For the past four years I have planned and run performance campaigns on Meta, TikTok, Snapchat and Google for healthcare providers, training centres, furniture retailers and consumer brands, and designed the creative those campaigns run on.',
    'I work with Maltese businesses remotely, with fixed working hours that overlap with the Malta business day. That means senior, hands-on execution without agency overheads, clear euro pricing and reporting you can verify.',
    'My approach is simple: start with tracking you can trust, fix what is costing you money first, and report on enquiries and revenue rather than vanity metrics. I do not sell guaranteed rankings.',
  ],
  timeline: [
    ['2023 — Present', 'Manager & Creative Lead, Monochrome FX'],
    ['2021 — 2023', 'Senior Digital Strategist & Designer, Apex Digital Studio'],
    ['2019 — 2021', 'Brand & Graphic Designer, Vanguard Media'],
  ],
  // TODO: add certificates you actually hold, e.g. 'Google Ads Search Certification'. Leave empty if none.
  credentials: [],
};

// ── Case studies (/case-studies/<slug>/) ─────────────────────
// Fill every TODO with REAL, client-approved numbers. Pages stay noindex until no TODO remains.
// Get written permission from each client before publishing their name.
export const CASE_STUDIES = [
  {
    slug: 'rpm-medical-complex-meta-lead-generation',
    client: 'Response Plus Medical Complex (RPM)',
    industry: 'Healthcare',
    location: 'Saudi Arabia',
    channels: ['Meta Ads', 'Facebook & Instagram', 'Lead forms'],
    summary: 'Meta lead-generation campaigns for a multi-speciality medical complex, including a dedicated homecare campaign.',
    problem: 'TODO: describe the baseline — e.g. cost per lead, lead volume and lead quality before you started.',
    execution: [
      'Rebuilt campaign structure by service line (clinic visits, homecare).',
      'Designed bilingual Arabic/English ad creative.',
      'TODO: tracking or lead-form changes you made.',
    ],
    results: [['Cost per lead', 'TODO'], ['Leads per month', 'TODO'], ['Period', 'TODO']],
    quote: null, // { text: '...', name: 'Real name', role: 'Real role' } — only with permission
  },
  {
    slug: 'prometheus-training-center-cpr-course-leads',
    client: 'Prometheus Training Center KSA',
    industry: 'Training & Education',
    location: 'Saudi Arabia',
    channels: ['Meta Ads', 'Lead generation'],
    summary: 'Lead generation for CPR and first-aid training programmes.',
    problem: 'TODO: baseline problem.',
    execution: ['TODO: what you did.'],
    results: [['Cost per lead', 'TODO'], ['Course enrolments', 'TODO'], ['Period', 'TODO']],
    quote: null,
  },
  {
    slug: 'al-kharj-sofa-tiktok-snapchat-leads',
    client: 'Al Kharj sofa & furniture retailer',
    industry: 'Retail / Furniture',
    location: 'Al Kharj, Saudi Arabia',
    channels: ['TikTok Ads', 'Snapchat Lead Ads', 'WhatsApp'],
    summary: 'TikTok and Snapchat lead campaigns driving WhatsApp enquiries for a furniture showroom.',
    problem: 'TODO: baseline problem.',
    execution: ['TODO: what you did.'],
    results: [['Cost per lead', 'TODO'], ['WhatsApp enquiries', 'TODO'], ['Period', 'TODO']],
    quote: null,
  },
  {
    slug: 'mihdab-luxury-perfume-packaging-branding',
    client: 'MIHDAB',
    industry: 'Luxury Fragrance',
    location: 'TODO: client location',
    channels: ['Brand identity', 'Packaging design'],
    summary: 'Packaging and brand identity design for a luxury perfume brand.',
    problem: 'TODO: the brief and challenge.',
    execution: ['TODO: design process and deliverables.'],
    results: [['Deliverables', 'TODO'], ['Business outcome', 'TODO']],
    quote: null,
  },
];

// ── Planned Malta guides (publish via your Supabase blog admin) ──
export const PLANNED_GUIDES = [
  'Malta SME Digitalisation Grant Guide 2026–2027 (Digitalise Your SME Call 2)',
  'Digital Marketing Pricing in Malta: 2026–2027 Benchmark',
  'Local SEO Across Malta’s Business Hubs (Valletta to Gozo)',
  'Capturing Malta’s 10% Bing Search Audience with IndexNow',
  'Hospitality & Direct-Booking SEO in Malta',
  'LinkedIn B2B Demand Generation in Malta',
  'Malta Web Speed & SEO Benchmark Study (50 sites)',
  'AI Overviews & ChatGPT Search Readiness for Maltese SMEs',
];
