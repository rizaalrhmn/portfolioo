// ─────────────────────────────────────────────────────────────
//  SITE CONFIG — the ONE place to edit your details.
//  Every generated page, canonical, sitemap and JSON-LD reads from here.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  // After you buy a domain, set SITE_URL in Vercel → Settings → Environment Variables
  // (e.g. https://rizalrahman.mt) and redeploy. No trailing slash.
  url: (process.env.SITE_URL || 'https://rizalrhmn.vercel.app').replace(/\/$/, ''),

  // The old host. The build rewrites it to `url` in every copied HTML file.
  legacyHost: 'https://rizalrhmn.vercel.app',

  name: 'Rizal Rahman',
  brand: 'Rizal Rahman — Freelance Digital Marketing in Malta',
  jobTitle: 'Freelance Digital Marketing Consultant',
  tagline: 'Freelance Digital Marketing in Malta Built for Measurable Pipeline',

  // TODO(domain): switch to hello@yourdomain.mt once the domain + mailbox exist.
  email: 'rizalrahman8055@gmail.com',

  // TODO: digits only, with country code, no + or spaces. e.g. '919876543210'
  // Leave '' to hide WhatsApp buttons.
  whatsapp: '',

  // Optional: Calendly / Cal.com link for the free 15-minute audit. '' hides it.
  calendarUrl: '',

  // Portrait image & default Open Graph preview image (1200x630 JPEG)
  portrait: '/assets/images/freelance-digital-marketing-in-malta.png',
  ogImage: '/images/og-default.jpg',

  // TODO: add each profile URL once it exists (LinkedIn, Clutch, Tminta, BeBee, Sortlist…)
  sameAs: [
    // 'https://www.linkedin.com/in/your-profile/',
    // 'https://clutch.co/profile/your-profile',
    // 'https://tminta.com/services/your-listing/',
  ],

  // Track B (remote, serving Malta). Never add a fake Malta street address.
  basedIn: 'Kerala, India',
  workingOverlap: 'Mon–Fri, 09:00–17:00 CET/CEST (Malta time)',
  responseSla: 'Reply within 1 business day (Malta time)',

  // Search engine verification codes (paste only the content="" value).
  googleVerification: '', // Google Search Console → HTML tag method
  bingVerification: '',   // Bing Webmaster Tools → meta tag method

  // IndexNow key (Bing, Yandex, Seznam…). The build writes /<key>.txt automatically.
  indexNowKey: '6450663701d9cf6dc2c8d9734b4e4e6c',

  // Supabase (same public publishable key your front end already uses).
  supabase: {
    url: process.env.SUPABASE_URL || 'https://hfymxwfozvxpxjnprzvz.supabase.co',
    key: process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_WQFiD3pzqVNy3S6qFV5OOQ_ZG8kAzvK',
    table: 'blog_posts',
  },

  // Same Google Fonts URL as index.html so new pages use your exact theme fonts.
  fontsHref:
    'https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Fredoka:wght@500;600;700&family=Kalam:wght@400;700&family=Patrick+Hand&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Silkscreen&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap',
};
