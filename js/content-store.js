/**
 * Rizal Rahman Portfolio — Unified Content Store
 * Manages Blog Posts, Portfolio Projects, Testimonials, and Profile Info
 * with localStorage persistence and default seeds.
 */

const BLOG_STORAGE_KEY = 'rizal_blog_posts_v4';
try { localStorage.removeItem('rizal_blog_posts_v3'); } catch (e) {}
const PROJECTS_STORAGE_KEY = 'rizal_portfolio_projects_v1';
const TESTIMONIALS_STORAGE_KEY = 'rizal_portfolio_testimonials_v1';
const PROFILE_STORAGE_KEY = 'rizal_portfolio_profile_v1';
const BLOG_AUTH_KEY = 'rizal_blog_admin_auth';

/* ==========================================================================
   DEFAULT SEEDS
   ========================================================================== */
const DEFAULT_BLOG_POSTS = [
  {
    id: 'post-digital-marketing-guide',
    title: 'What Is Digital Marketing? A Simple Guide for Small Businesses',
    slug: 'what-is-digital-marketing-simple-guide-small-businesses',
    category: 'Digital Marketing',
    readTime: '6 min read',
    date: 'Nov 17, 2026',
    status: 'published',
    views: 486,
    coverImage: 'assets/images/project-6-card.jpg',
    tags: ['DigitalMarketing', 'SmallBusiness', 'MetaAds', 'SEO', 'BrandGrowth'],
    excerpt: 'Strip away the confusing agency jargon: here is a clear, practical 1,250-word roadmap explaining how small businesses can use websites, local SEO, social content, and targeted ads to attract loyal customers.',
    content: `
      <p class="lead-paragraph">If you run a small business today, you have probably heard the phrase "digital marketing" thrown around in almost every conversation about growth. Agencies promise it will double your sales overnight, social media gurus claim you need to post five videos a day to survive, and software companies try to sell you complicated dashboards before you even have your first ten customers. Let us strip away the confusing jargon and look at what digital marketing actually means for a real-world small business owner.</p>

      <p>At its core, digital marketing is simply the art and science of connecting with your ideal customers on the internet—where they already spend hours every day scrolling, searching, watching, and shopping. Whether you run a neighborhood bakery, a boutique clothing label, a local home-repair service, or an emerging e-commerce store, digital marketing is no longer a luxury reserved for giant corporations. When approached with clarity, it is the single greatest equalizer in modern business.</p>

      <div class="blog-callout-note">
        <strong>Core Definition:</strong> Digital marketing is any promotional effort that uses electronic devices and the internet—such as search engines, social media platforms, email newsletters, and websites—to build trust with people and turn casual browsers into loyal, paying customers.
      </div>

      <h3>Why Traditional Marketing Alone Is No Longer Enough</h3>

      <p>Twenty years ago, a small business had a limited menu of ways to get noticed. You could pay for an advertisement in the local newspaper, print thousands of paper flyers to hand out on street corners, or rent a roadside billboard. Those traditional methods had two major problems for small businesses: they were expensive, and they were almost impossible to measure.</p>

      <p>When you put a poster on a busy street, you have no way of knowing how many people looked at it, how many needed your product at that moment, or how many walked into your shop because of that poster. You were essentially paying to shout into a crowded room and hoping the right person heard you.</p>

      <p>Digital marketing flips that old model upside down. Instead of interrupting everyone in town, digital tools allow you to show up exclusively in front of the exact people who are already looking for what you offer. Even better, you can track every single click, view, message, and purchase. If a campaign is working, you can scale it up; if it is not working, you can pause it within seconds instead of wasting months of budget.</p>

      <h3>The 6 Essential Pillars of Digital Marketing</h3>

      <p>One of the biggest mistakes small business owners make is trying to do everything at once. You do not need to be on twelve platforms to build a thriving company. Instead, understand the six main pillars of the digital ecosystem so you can pick the two or three that best fit your customers and budget.</p>

      <h4>1. Your Website or Digital Storefront</h4>

      <p>Think of your website as your digital home base. Social media algorithms change every week, but your website is digital real estate that you own and control. A great small-business website simply needs to answer three questions within the first five seconds a visitor lands on it:</p>

      <ul>
        <li><strong>Who are you and what do you offer?</strong> State your value clearly without riddles.</li>
        <li><strong>Why should I trust you?</strong> Show real photos of your work, genuine customer reviews, and clear examples.</li>
        <li><strong>What is the next step?</strong> Make it effortless to buy a product, book an appointment, or send a quick WhatsApp or email inquiry.</li>
      </ul>

      <h4>2. Search Engine Optimization (SEO) and Local Discovery</h4>

      <p>Imagine someone in your city pulls out their phone and types "best custom birthday cakes near me" or "reliable interior designer in Kerala" into Google. Search Engine Optimization (SEO) is the process of structuring your website and Google Business Profile so your business appears at the top of those search results without paying for every click.</p>

      <p>For local small businesses, Local SEO is pure gold. Setting up a free Google Business Profile, adding accurate opening hours, uploading crisp photos of your storefront, and asking happy customers to leave honest five-star reviews can bring a steady stream of high-intent buyers to your door every week.</p>

      <h4>3. Social Media Marketing (Organic Content)</h4>

      <p>Platforms like Instagram, Facebook, YouTube, and LinkedIn are where people discover new ideas and connect with personalities. For a small business, organic social media is not about chasing random viral trends—it is about building familiarity and human trust.</p>

      <p>When you share behind-the-scenes clips of how your products are crafted, answer common customer questions on camera, or highlight real client stories, people stop seeing you as a faceless logo and start seeing the human craft behind your brand.</p>

      <h4>4. Paid Social and Search Advertising (Performance Ads)</h4>

      <p>While organic social media and SEO build long-term momentum, they take time. What if you are launching a new product this Friday and need customers right now? That is where paid digital advertising—such as Meta Ads (Facebook and Instagram) and Google Search Ads—comes into play.</p>

      <p>With Meta Ads Manager, even a modest daily budget allows a small business to target people by their exact city, age group, interests, and shopping behaviors. Instead of waiting months for an algorithm to find your audience, paid ads put your best visual hook and offer directly into the feeds of thousands of qualified local prospects today.</p>

      <h4>5. Content Marketing (Helpful Guides and Storytelling)</h4>

      <p>Content marketing is the practice of creating genuinely useful articles, short videos, or guides that solve your customer's problems before they even buy from you. When you educate your audience generously, you stop being treated like a pushy salesperson and start being respected as the trusted expert in your field.</p>

      <h4>6. Email and Direct Message Retention</h4>

      <p>Winning a new customer is the most expensive part of marketing; keeping an existing customer is where true profit is made. By collecting email addresses or WhatsApp opt-ins from buyers with their permission, you build a direct line of communication that no algorithm can block.</p>

      <div class="blog-callout-note">
        <strong>The Golden Rule:</strong> Never try to master six channels at once. Start with one strong foundation (your website or Google profile), one discovery channel (Instagram or Meta Ads), and one way to follow up with happy buyers.
      </div>

      <h3>A Simple 4-Step Action Plan</h3>

      <ol>
        <li><strong>Define Your Ideal Customer:</strong> Stop trying to sell to "everyone." Write down a clear picture of your best buyer and the exact problem they want solved.</li>
        <li><strong>Polish Your Digital Front Door:</strong> Complete your Google Business Profile, clean up your social media bio, and ensure your website loads fast on mobile phones.</li>
        <li><strong>Create Three Pillars of Proof:</strong> Capture real photos or short videos of your product in action, gather five genuine customer reviews, and craft one clear introductory offer.</li>
        <li><strong>Test, Measure, and Refine:</strong> Launch a focused campaign—whether three helpful video posts a week or a targeted local Meta Ads drive—and review the results every seven days.</li>
      </ol>

      <h3>Common Pitfalls to Avoid</h3>

      <ul>
        <li><strong>Chasing Vanity Metrics:</strong> Ten thousand likes from people who will never buy from you will not pay your bills. Focus on local reach, website clicks, and actual inquiries.</li>
        <li><strong>Copying Giant Corporations:</strong> Big brands can afford vague commercials because everyone already knows them. For a small business, clarity is your superpower.</li>
        <li><strong>Giving Up Too Early:</strong> Digital marketing is a system, not a lottery ticket. Give your strategy enough consistency to gather data and compound.</li>
      </ul>

      <h3>Final Thoughts: Start Simple, Stay Human</h3>

      <p>Digital marketing does not require you to become a programmer or filmmaker. At its heart, it is human communication scaled through modern screens. You already know your craft and care about your customers—digital marketing is the bridge that carries your work to the people searching for someone like you.</p>
    `
  },
  {
    id: 'post-1',
    title: 'The Death of Generic Ad Creatives: Why Authentic Visuals Win in 2026',
    slug: 'death-of-generic-ad-creatives',
    category: 'Digital Marketing',
    readTime: '5 min read',
    date: 'Nov 12, 2026',
    status: 'published',
    views: 342,
    coverImage: 'assets/images/project-2-art.jpg',
    tags: ['MetaAds', 'CreativeStrategy', 'PerformanceMarketing'],
    excerpt: 'In an era saturated by automated AI templates, brands that intentionally craft tactile, human-centered creative hooks are seeing 3x higher ROAS. Here is the exact visual framework we use.',
    content: `
      <p class="lead-paragraph">Every marketing feed today looks almost identical: polished stock footage, generic gradient overlays, and robotic AI voiceovers. Consumers have developed visceral subconscious blindness to corporate perfection.</p>
      <h3>The Friction Phenomenon: Why Flaws Catch the Eye</h3>
      <p>When scrolling at lightning speed through Instagram or TikTok, the brain looks for human signals—micro-imperfections, authentic handwriting, tactile textures, and unpredictable compositions. That is why scrapbook layouts, paper edges, and documentary-style photography consistently beat hyper-polished studio renders in CTR tests.</p>
      <div class="blog-callout-note">
        <strong>Key Metric:</strong> In our Q3 healthcare campaign for RPM, raw authentic first-responder visual storytelling dropped CPA by <strong>44%</strong> while boosting conversions by <strong>240%</strong> compared to traditional corporate graphic ads.
      </div>
      <h3>The 3-Second Visual Hook Rule</h3>
      <p>To stop thumbs in 2026, every ad creative must deliver an emotional question in the opening frame:</p>
      <ul>
        <li><strong>High Visual Contrast:</strong> Break the background color monotony of the host app interface.</li>
        <li><strong>Physical Tactility:</strong> Incorporate stamps, handwritten scribbles, or textured stickers that feel tangible.</li>
        <li><strong>Single Direct Message:</strong> Avoid cluttering. One clear promise beats five scattered features every time.</li>
      </ul>
      <p>The future of digital advertising does not belong to the algorithm with the most compute; it belongs to the creative team that understands human psychology and timeless art direction.</p>
    `
  },
  {
    id: 'post-2',
    title: 'From Prompt to Production: Commercial Higgsfield AI Workflows',
    slug: 'commercial-higgsfield-ai-workflows',
    category: 'AI & Creative Tech',
    readTime: '7 min read',
    date: 'Oct 28, 2026',
    status: 'published',
    views: 518,
    coverImage: 'assets/images/project-4-card.jpg',
    tags: ['GenerativeAI', 'Higgsfield', 'ArtDirection', 'Motion'],
    excerpt: 'How we integrate generative AI into high-end branding, packaging, and commercial advertising without sacrificing precision, color fidelity, or art direction control.',
    content: `
      <p class="lead-paragraph">Most designers use AI tools like a slot machine—pulling the lever until something neat appears. Commercial art direction requires the opposite: reproducible control, exact camera physics, and seamless post-processing with Higgsfield AI.</p>
      <h3>The Hybrid AI Creative Pipeline</h3>
      <p>True production-ready AI visuals are never 100% prompt-generated. At Monochrome FX, we treat Higgsfield as a high-speed cinematic concept engine inside a structured 4-step pipeline:</p>
      <ol>
        <li><strong>Style Rigging & Seed Priming:</strong> We develop proprietary cinematic styles, motion parameters, and color palettes to lock brand guidelines.</li>
        <li><strong>Raw Synthesis & Inpainting:</strong> Generating high-res architectural, video motion, or character components using Higgsfield AI and custom neural models.</li>
        <li><strong>Vector & Typography Integration:</strong> Bringing assets into Adobe Illustrator and Figma to pair with custom typography, Arabic calligraphy, or editorial grids.</li>
        <li><strong>Retouching & Color Grading:</strong> Final mastering in Adobe Photoshop to balance grain, dynamic range, and print color separations.</li>
      </ol>
      <div class="blog-callout-note">
        <strong>Takeaway:</strong> AI generates visual raw material; the human designer brings taste, restraint, and cultural storytelling.
      </div>
    `
  },
  {
    id: 'post-3',
    title: 'Scrapbooks, Paper Textures & Neo-Brutalism: Why Tactile Design is Dominating the Web',
    slug: 'tactile-scrapbook-design-trends',
    category: 'Design & Branding',
    readTime: '4 min read',
    date: 'Oct 15, 2026',
    status: 'published',
    views: 429,
    coverImage: 'assets/images/project-3-art.jpg',
    tags: ['UIUX', 'Branding', 'PaperCraft'],
    excerpt: 'SaaS interfaces all began to blur into sterile white cards and boring purple buttons. Enter washi tape, ruled notebook paper, and handcrafted scrapbook aesthetics.',
    content: `
      <p class="lead-paragraph">For ten years, the web was obsessed with invisible design: sterile minimalism, monochrome palettes, and uniform rounded rectangles. While clean, it stripped away personality.</p>
      <h3>The Emotional Need for Nostalgia & Craft</h3>
      <p>Today, visitors crave personality. A ruled notebook sheet with binder rings, a tilted post-it note pinned with translucent washi tape, or a hand-drawn curly arrow immediately feels personal, inviting, and human.</p>
      <p>When clients see a website that looks like an artist’s physical sketchbook, they instantly perceive care, authenticity, and individuality.</p>
      <div class="blog-callout-note">
        <strong>Design Rule:</strong> Use tactile motifs with purpose. Every washi tape strip or doodle should guide the eye toward key actions and narrative milestones.
      </div>
    `
  },
  {
    id: 'post-4',
    title: 'Motion Systems That Convert: Crafting 6-Second Hooks for Social Video',
    slug: 'motion-systems-that-convert',
    category: 'Motion & Video',
    readTime: '6 min read',
    date: 'Sep 24, 2026',
    status: 'published',
    views: 295,
    coverImage: 'assets/images/project-5-card.jpg',
    tags: ['MotionDesign', 'VideoMarketing', 'AfterEffects'],
    excerpt: 'Breaking down the visual choreography of the first 3 seconds: frame rate manipulation, kinetic typography, and audio-visual synchronization that drives action.',
    content: `
      <p class="lead-paragraph">In performance motion graphics, aesthetics without conversion velocity is just expensive wallpaper. Every millisecond of motion must pull the viewer deeper into the story.</p>
      <h3>Pacing and Rhythm in After Effects</h3>
      <p>We combine 60fps fluid camera curves with 12fps stylized stop-motion elements to create rhythmic texture that keeps the viewer's dopamine engaged.</p>
      <p>By pairing dynamic kinetic typography with rhythmic sound design, viewer retention skyrockets across Meta and YouTube Shorts.</p>
    `
  }
];

const DEFAULT_PROJECTS = [
  {
    id: 'rpm',
    number: '01',
    badge: '01 // CAMPAIGN',
    bgClass: 'card-bg-orange',
    tapeClass: 'tape-tl tape-pink',
    title: 'RPM Healthcare Rapid Response',
    subtitle: 'Full-Funnel Acquisition Drive',
    category: 'Digital Marketing & Ads',
    client: 'Rapid Paramedic Medicine (RPM Global)',
    role: 'Creative Director & Marketing Manager',
    tools: 'Meta Ads Manager, GA4, After Effects',
    impact: '+240% Growth',
    excerpt: 'Omnichannel performance marketing and social awareness drive that scaled emergency healthcare response adoption by 240%.',
    challenge: 'Healthcare advertising must immediately project calm, unwavering reliability and surgical precision without provoking anxiety or clinical coldness in prospective patients and corporate clients.',
    solution: 'Engineered a cinematic visual narrative centering on first-responders in high-stakes city environments. Coupled this with high-converting Meta and Google Search campaigns targeting corporate campus safety contracts.',
    image: 'assets/images/project-2-art.jpg'
  },
  {
    id: 'mihdab',
    number: '02',
    badge: '02 // BRANDING',
    bgClass: 'card-bg-purple',
    tapeClass: 'tape-tr tape-yellow',
    title: 'MIHDAB Luxury Perfume',
    subtitle: 'Artisanal Fragrance Branding',
    category: 'Identity Design & Calligraphy',
    client: 'Mihdab Luxury Goods LLC, Dubai',
    role: 'Brand Architect & Lead Designer',
    tools: 'Illustrator, Photoshop, Blender 3D',
    impact: '+320% Launch Revenue',
    excerpt: 'A bespoke visual identity featuring Arabic calligraphy, custom bottle packaging renders, and editorial unboxing experiences.',
    challenge: 'Traditional Middle Eastern branding frequently leans heavily on ornate gold filigree. Mihdab needed to preserve authentic cultural authority while conveying avant-garde restraint suitable for boutique retailers in Paris, London, and Dubai.',
    solution: 'Designed a bespoke custom monomark deriving from classical Arabic letterforms, sculpted into an architectural crest. Developed a proprietary packaging system with tactile blind debossing and custom 3D flacon proportions.',
    image: 'assets/images/project-1-art.jpg'
  },
  {
    id: 'zviz',
    number: '03',
    badge: '03 // PACKAGING',
    bgClass: 'card-bg-mint',
    tapeClass: 'tape-tr tape-cream',
    title: 'ZVIZ Kinetic Nutrition',
    subtitle: 'Consumer Snack Pouch System',
    category: 'Packaging & 3D Render',
    client: 'Zviz Beverage & Nutrition Group',
    role: 'Visual Designer & Performance Marketer',
    tools: 'Photoshop, Illustrator, Blender',
    impact: '120,000+ Units Sold',
    excerpt: 'Hyper-tactile matte foil pouches with bold typographic hierarchy, designed to stand out on retail shelves and e-commerce hero shots.',
    challenge: 'Standing out against entrenched legacy beverage and snack giants in supermarket aisles while convincing fitness enthusiasts of the pouch\'s eco-advantages.',
    solution: 'Designed high-contrast, fresh botanical packaging featuring a vibrant emerald-lime gradient with hyper-realistic condensation drops and custom coconut cross-sections. Followed with viral UGC social video hooks.',
    image: 'assets/images/project-3-art.jpg'
  },
  {
    id: 'aura',
    number: '04',
    badge: '04 // AI ART',
    bgClass: 'card-bg-blue',
    tapeClass: 'tape-tl tape-yellow',
    title: 'AURA Synthetic Intelligence',
    subtitle: 'Generative Brand Imagery',
    category: 'Higgsfield AI & Generative Direction',
    client: 'Aura Intelligence Labs',
    role: 'Creative Technologist & AI Visual Lead',
    tools: 'Higgsfield AI, ComfyUI, Figma, After Effects',
    impact: '140,000+ Waitlist',
    excerpt: 'Crafting surreal, photorealistic AI visual worlds and consistent character models for next-generation tech and lifestyle narratives.',
    challenge: 'Humanizing complex neural network parameters and making abstract mathematical transformations visually poetic, aspirational, and commercially relevant.',
    solution: 'Constructed deep neon color gradients, parametric dimensional grids, and hyper-stylized AI visual showcases that illustrate algorithmic power and emotional storytelling.',
    image: 'assets/images/project-4-card.jpg'
  },
  {
    id: 'kinetix',
    number: '05',
    badge: '05 // MOTION',
    bgClass: 'card-bg-pink',
    tapeClass: 'tape-tr tape-pink',
    title: 'KINETIX Dynamic Broadcast',
    subtitle: 'Kinetic Type & 3D Stings',
    category: 'Motion Graphics & 3D',
    client: 'Kinetix Athletic Wear & Broadcast',
    role: 'Motion Director & 3D Animator',
    tools: 'After Effects, Blender 3D, Photoshop',
    impact: '+410% Reel Engagement',
    excerpt: 'A high-energy motion design language and modular video intro package built for high-tempo sports and esports broadcasts.',
    challenge: 'Communicating the raw feeling of athletic velocity and physical momentum through digital mobile screens and massive retail video displays.',
    solution: 'Developed procedurally animated typography and 3D ribbon simulations rendered in Blender and After Effects, synced to high-tempo percussive sound design.',
    image: 'assets/images/project-5-card.jpg'
  },
  {
    id: 'monochrome',
    number: '06',
    badge: '06 // SHOWREEL',
    bgClass: 'card-bg-yellow',
    tapeClass: 'tape-center tape-cream',
    title: 'Monochrome FX Showreel',
    subtitle: 'Creative Agency Brand System',
    category: 'Agency Direction & Showreel',
    client: 'Monochrome FX Studio',
    role: 'Manager & Creative Strategy Lead',
    tools: 'After Effects, Photoshop, Figma, Audition',
    impact: '28 Enterprise RFPs',
    excerpt: 'Leading the global visual identity, studio website, and promotional reel for Monochrome FX, driving multi-million-rupee brand partnerships.',
    challenge: 'Summarizing four years of diverse agency case studies, client campaigns, and visual design milestones into an electrifying, award-winning narrative.',
    solution: 'Tight rhythmic audio-visual editing synchronized to high-energy sound design with bold typographic interstitials and interactive online showcases.',
    image: 'assets/images/project-6-card.jpg'
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    id: 'test-1',
    author: 'Sarah Al-Mansoor',
    role: 'Founder, Mihdab Fragrances',
    colorClass: 'sticky-yellow',
    tapeClass: 'tape-center tape-cream',
    quote: '“Rizal doesn\'t just design graphics; he understands how to generate sales and engagement through visuals. His rebranding of Mihdab transformed our perception in the market.”'
  },
  {
    id: 'test-2',
    author: 'Dr. Marcus Vance',
    role: 'Chief Medical Officer, RPM Global',
    colorClass: 'sticky-pink',
    tapeClass: 'tape-center tape-yellow',
    quote: '“The emergency rescue campaign exceeded every growth benchmark we had set. Rizal’s blend of creative storytelling and performance ad strategy is world-class.”'
  },
  {
    id: 'test-3',
    author: 'Aarav Kapoor',
    role: 'VP Product, Aura Technologies',
    colorClass: 'sticky-blue',
    tapeClass: 'tape-center tape-pink',
    quote: '“His mastery of Higgsfield AI workflows, motion design, and modern graphic design saved us months of production time while delivering visual assets that looked completely bespoke.”'
  }
];

const DEFAULT_PROFILE = {
  name: 'Rizal Rahman',
  roleBadge: '★ Digital Marketer & Graphic Designer',
  tagline: '“I create meaningful brand experiences through strategy, and digital marketing.”',
  bioP1: 'Hi! I\'m Rizal, a multidisciplinary Digital Marketer and Graphic Designer currently serving as Manager at Monochrome FX in India.',
  bioP2: 'My passion for creative work started with branding and visual identity—turning raw ideas into compelling narratives. Over the past 4+ years, I have helped brands scale through a blend of bold visual design, creative strategy, and performance-driven digital marketing.',
  bioP3: 'Whether directing full-scale advertising campaigns, crafting generative AI imagery and cinematic video with Higgsfield AI, or designing packaging that stops people in their tracks, I believe great design always bridges human emotion with strategic business goals.',
  email: 'rizalrahman8055@gmail.com',
  location: 'India'
};

/* ==========================================================================
   BLOG METHODS
   ========================================================================== */
function getBlogPosts() {
  try {
    const raw = localStorage.getItem(BLOG_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const posts = JSON.parse(raw);
    if (!Array.isArray(posts)) return [];
    return posts
      .map((p) => {
        const slug = p.slug || (typeof window.slugifyBlogTitle === 'function' ? window.slugifyBlogTitle(p.title) : p.id);
        return { ...p, slug };
      })
      .sort((a, b) => {
        const ta = Date.parse(a.publishedAt || a.createdAt || a.date || 0) || 0;
        const tb = Date.parse(b.publishedAt || b.createdAt || b.date || 0) || 0;
        return tb - ta;
      });
  } catch (e) {
    return [];
  }
}

function getBlogPost(idOrSlug) {
  const posts = getBlogPosts();
  return posts.find(p =>
    p.id === idOrSlug ||
    p.slug === idOrSlug ||
    (typeof window.slugifyBlogTitle === 'function' && window.slugifyBlogTitle(p.title) === idOrSlug)
  ) || null;
}

function saveBlogPost(postData) {
  const posts = getBlogPosts();
  const existingIdx = posts.findIndex(p => p.id === postData.id);
  let savedPost;

  if (existingIdx >= 0) {
    savedPost = {
      ...posts[existingIdx],
      ...postData,
      slug: postData.slug || posts[existingIdx].slug || (typeof window.slugifyBlogTitle === 'function' ? window.slugifyBlogTitle(postData.title || posts[existingIdx].title) : posts[existingIdx].id),
      updatedAt: new Date().toISOString()
    };
    posts[existingIdx] = savedPost;
  } else {
    const newId = 'post-' + Date.now();
    savedPost = {
      id: newId,
      views: 0,
      createdAt: new Date().toISOString(),
      ...postData
    };
    if (!savedPost.slug) {
      savedPost.slug = savedPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    posts.unshift(savedPost);
  }

  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
  return savedPost;
}

function deleteBlogPost(id) {
  const posts = getBlogPosts();
  const filtered = posts.filter(p => p.id !== id);
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

function togglePostStatus(id) {
  const posts = getBlogPosts();
  const target = posts.find(p => p.id === id);
  if (target) {
    target.status = target.status === 'published' ? 'draft' : 'published';
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
    return target.status;
  }
  return null;
}

function incrementPostView(id) {
  const posts = getBlogPosts();
  const target = posts.find(p => p.id === id);
  if (target) {
    target.views = (target.views || 0) + 1;
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
  }
}

function resetBlogToDefaults() {
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(DEFAULT_BLOG_POSTS));
  return DEFAULT_BLOG_POSTS;
}

/* ==========================================================================
   PORTFOLIO PROJECTS METHODS
   ========================================================================== */
function getProjects() {
  try {
    const raw = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
      return [...DEFAULT_PROJECTS];
    }
    const projects = JSON.parse(raw);
    return Array.isArray(projects) ? projects : [...DEFAULT_PROJECTS];
  } catch (e) {
    return [...DEFAULT_PROJECTS];
  }
}

function saveProject(projectData) {
  const projects = getProjects();
  const existingIdx = projects.findIndex(p => p.id === projectData.id);

  if (existingIdx >= 0) {
    projects[existingIdx] = {
      ...projects[existingIdx],
      ...projectData
    };
  } else {
    const newId = projectData.id || 'project-' + Date.now();
    const count = projects.length + 1;
    const numStr = count < 10 ? '0' + count : '' + count;
    const newProject = {
      id: newId,
      number: numStr,
      badge: `${numStr} // ${projectData.category ? projectData.category.split('&')[0].trim().toUpperCase() : 'PROJECT'}`,
      bgClass: projectData.bgClass || 'card-bg-orange',
      tapeClass: projectData.tapeClass || 'tape-tr tape-yellow',
      ...projectData
    };
    projects.push(newProject);
  }

  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  return true;
}

function deleteProject(id) {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

function resetProjectsToDefaults() {
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
  return DEFAULT_PROJECTS;
}

/* ==========================================================================
   TESTIMONIALS METHODS
   ========================================================================== */
function getTestimonials() {
  try {
    const raw = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(DEFAULT_TESTIMONIALS));
      return [...DEFAULT_TESTIMONIALS];
    }
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [...DEFAULT_TESTIMONIALS];
  } catch (e) {
    return [...DEFAULT_TESTIMONIALS];
  }
}

function saveTestimonial(testData) {
  const list = getTestimonials();
  const existingIdx = list.findIndex(t => t.id === testData.id);

  if (existingIdx >= 0) {
    list[existingIdx] = { ...list[existingIdx], ...testData };
  } else {
    const newId = 'test-' + Date.now();
    const colors = ['sticky-yellow', 'sticky-pink', 'sticky-blue'];
    const colorClass = testData.colorClass || colors[list.length % colors.length];
    list.push({
      id: newId,
      colorClass,
      tapeClass: 'tape-center tape-cream',
      ...testData
    });
  }

  localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(list));
  return true;
}

function deleteTestimonial(id) {
  const list = getTestimonials();
  const filtered = list.filter(t => t.id !== id);
  localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

function resetTestimonialsToDefaults() {
  localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(DEFAULT_TESTIMONIALS));
  return DEFAULT_TESTIMONIALS;
}

/* ==========================================================================
   PROFILE METHODS
   ========================================================================== */
function getProfileData() {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
      return DEFAULT_PROFILE;
    }
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_PROFILE;
  }
}

function saveProfileData(profileData) {
  const current = getProfileData();
  const updated = { ...current, ...profileData };
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
  return true;
}

function resetProfileToDefaults() {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
  return DEFAULT_PROFILE;
}

/* Reset Everything */
function resetAllContent() {
  resetBlogToDefaults();
  resetProjectsToDefaults();
  resetTestimonialsToDefaults();
  resetProfileToDefaults();
}

/* Auth helpers */
function isAdminLoggedIn() {
  return sessionStorage.getItem(BLOG_AUTH_KEY) === 'true';
}

function setAdminLoggedIn(status) {
  if (status) {
    sessionStorage.setItem(BLOG_AUTH_KEY, 'true');
  } else {
    sessionStorage.removeItem(BLOG_AUTH_KEY);
  }
}

/* ==========================================================================
   CARTOON & PENCIL SKETCHBOOK FILLER ENGINE FOR FREE GRID SPACES
   Automatically fills empty slots in 3-column grids when items are added/deleted
   so cards never stretch into oversized boxes!
   ========================================================================== */
function getScrapbookFillerDoodles(itemCount, cols = 3) {
  const freeSlots = itemCount === 0 ? cols : (cols - (itemCount % cols)) % cols;
  if (freeSlots === 0) return '';

  const doodleTemplates = [
    // Doodle 1: Cartoon Sketchbook Cat, Steaming Coffee & Graphite Pencil
    `
      <div class="scrapbook-doodle-filler-card" aria-hidden="true">
        <div class="washi-tape tape-tl tape-yellow"></div>
        <svg class="doodle-filler-svg doodle-pencil-float" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Dotted Sketch Spiral Trail -->
          <path d="M 20 140 Q 55 95 95 125 T 185 65" stroke="#94A3B8" stroke-width="2" stroke-dasharray="5 5" stroke-linecap="round"/>
          <!-- Cartoon Studio Cat Peeking Over Sketchpad -->
          <path d="M 55 110 L 55 68 L 72 82 L 98 82 L 115 68 L 115 110 Z" fill="#FFFFFF" stroke="#18181B" stroke-width="2.8" stroke-linejoin="round"/>
          <ellipse cx="85" cy="105" rx="34" ry="24" fill="#FFFFFF" stroke="#18181B" stroke-width="2.8"/>
          <!-- Cat Eyes & Whiskers -->
          <circle cx="74" cy="100" r="3.5" fill="#18181B"/>
          <circle cx="96" cy="100" r="3.5" fill="#18181B"/>
          <ellipse cx="85" cy="106" rx="3" ry="2" fill="#F43F5E"/>
          <path d="M 82 109 Q 85 113 88 109" stroke="#18181B" stroke-width="2" stroke-linecap="round"/>
          <line x1="42" y1="102" x2="60" y2="105" stroke="#18181B" stroke-width="2" stroke-linecap="round"/>
          <line x1="42" y1="110" x2="60" y2="110" stroke="#18181B" stroke-width="2" stroke-linecap="round"/>
          <line x1="110" y1="105" x2="128" y2="102" stroke="#18181B" stroke-width="2" stroke-linecap="round"/>
          <line x1="110" y1="110" x2="128" y2="110" stroke="#18181B" stroke-width="2" stroke-linecap="round"/>
          <!-- Steaming Coffee Mug -->
          <rect x="142" y="98" width="36" height="40" rx="6" fill="#FEF08A" stroke="#18181B" stroke-width="2.8"/>
          <path d="M 178 106 H 188 C 193 106 193 126 188 126 H 178" stroke="#18181B" stroke-width="2.8" stroke-linecap="round"/>
          <path d="M 152 88 Q 156 78 152 70" stroke="#64748B" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M 166 86 Q 170 76 166 68" stroke="#64748B" stroke-width="2.2" stroke-linecap="round"/>
          <!-- Floating Graphite Pencil Sketching -->
          <g transform="translate(125, 22) rotate(28)">
            <rect x="0" y="0" width="14" height="52" fill="#FBBF24" stroke="#18181B" stroke-width="2.4"/>
            <rect x="0" y="-10" width="14" height="10" rx="3" fill="#FB7185" stroke="#18181B" stroke-width="2.4"/>
            <polygon points="0,52 7,68 14,52" fill="#FDE68A" stroke="#18181B" stroke-width="2.4" stroke-linejoin="round"/>
            <polygon points="4.5,62 7,68 9.5,62" fill="#18181B"/>
          </g>
          <!-- Hand-drawn Stars -->
          <path d="M 35 45 L 38 53 L 46 56 L 38 59 L 35 67 L 32 59 L 24 56 L 32 53 Z" fill="#38BDF8" stroke="#18181B" stroke-width="1.5"/>
          <text x="58" y="45" font-family="'Patrick Hand', cursive" font-size="14" fill="#64748B">★ doodle break</text>
        </svg>
        <div class="doodle-filler-caption">Sketchbook Margin ✎</div>
        <div class="doodle-filler-sub">Space saved for the next fresh story</div>
      </div>
    `,
    // Doodle 2: Cartoon Walking Lightbulb Mascot & Paper Airplane
    `
      <div class="scrapbook-doodle-filler-card" aria-hidden="true">
        <div class="washi-tape tape-tr tape-pink"></div>
        <svg class="doodle-filler-svg doodle-pencil-float" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Loop-de-loop Dotted Paper Plane Trail -->
          <path d="M 18 135 C 65 145, 85 45, 50 45 C 20 45, 45 130, 155 58" stroke="#64748B" stroke-width="2.2" stroke-dasharray="5 5" stroke-linecap="round"/>
          <!-- Paper Airplane -->
          <polygon points="150,42 198,48 164,76 160,60" fill="#FFFFFF" stroke="#18181B" stroke-width="2.6" stroke-linejoin="round"/>
          <line x1="198" y1="48" x2="160" y2="60" stroke="#18181B" stroke-width="2.2"/>
          <!-- Cartoon Smiling Lightbulb Character -->
          <g transform="translate(82, 58)">
            <!-- Glow rays -->
            <line x1="30" y1="-14" x2="30" y2="-6" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
            <line x1="-8" y1="12" x2="0" y2="16" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
            <line x1="68" y1="12" x2="60" y2="16" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
            <!-- Bulb Glass -->
            <path d="M 6 32 C 6 12, 54 12, 54 32 C 54 46, 44 54, 42 66 L 18 66 C 16 54, 6 46, 6 32 Z" fill="#FEF08A" stroke="#18181B" stroke-width="2.8" stroke-linejoin="round"/>
            <!-- Cute Eyes & Smile -->
            <circle cx="22" cy="34" r="3.2" fill="#18181B"/>
            <circle cx="38" cy="34" r="3.2" fill="#18181B"/>
            <path d="M 24 43 Q 30 49 36 43" stroke="#18181B" stroke-width="2.4" stroke-linecap="round"/>
            <!-- Screw Base -->
            <rect x="18" y="66" width="24" height="12" rx="3" fill="#CBD5E1" stroke="#18181B" stroke-width="2.5"/>
            <!-- Cartoon Legs & Sneakers -->
            <path d="M 23 78 L 20 96 M 37 78 L 40 96" stroke="#18181B" stroke-width="2.8" stroke-linecap="round"/>
            <ellipse cx="16" cy="98" rx="8" ry="4.5" fill="#F43F5E" stroke="#18181B" stroke-width="2.2"/>
            <ellipse cx="44" cy="98" rx="8" ry="4.5" fill="#F43F5E" stroke="#18181B" stroke-width="2.2"/>
          </g>
        </svg>
        <div class="doodle-filler-caption">Idea Lab Sketch ★</div>
        <div class="doodle-filler-sub">Pencil notes & creative daydreaming</div>
      </div>
    `,
    // Doodle 3: Cartoon Pencil Rocket & Hand-Drawn Stars
    `
      <div class="scrapbook-doodle-filler-card" aria-hidden="true">
        <div class="washi-tape tape-tl tape-blue"></div>
        <svg class="doodle-filler-svg doodle-pencil-float" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Sketchy Clouds & Stars -->
          <path d="M 30 140 Q 45 125 65 135 Q 85 118 110 132 Q 135 120 155 138 Z" fill="#FFFFFF" stroke="#18181B" stroke-width="2.5" stroke-linejoin="round"/>
          <!-- Cartoon Pencil Rocket -->
          <g transform="translate(95, 22) rotate(18)">
            <polygon points="18,0 36,26 0,26" fill="#38BDF8" stroke="#18181B" stroke-width="2.6" stroke-linejoin="round"/>
            <polygon points="12,0 24,0 18,-10" fill="#18181B"/>
            <rect x="0" y="26" width="36" height="62" fill="#FBBF24" stroke="#18181B" stroke-width="2.6"/>
            <line x1="12" y1="26" x2="12" y2="88" stroke="#18181B" stroke-width="2"/>
            <line x1="24" y1="26" x2="24" y2="88" stroke="#18181B" stroke-width="2"/>
            <!-- Cute Rocket Face -->
            <circle cx="12" cy="52" r="3" fill="#18181B"/>
            <circle cx="24" cy="52" r="3" fill="#18181B"/>
            <path d="M 14 60 Q 18 65 22 60" stroke="#18181B" stroke-width="2.2" stroke-linecap="round"/>
            <!-- Fins -->
            <polygon points="0,68 -14,88 0,88" fill="#F43F5E" stroke="#18181B" stroke-width="2.5" stroke-linejoin="round"/>
            <polygon points="36,68 50,88 36,88" fill="#F43F5E" stroke="#18181B" stroke-width="2.5" stroke-linejoin="round"/>
            <!-- Eraser Booster -->
            <rect x="4" y="88" width="28" height="12" rx="3" fill="#FB7185" stroke="#18181B" stroke-width="2.5"/>
          </g>
          <circle cx="48" cy="54" r="5" fill="#FEF08A" stroke="#18181B" stroke-width="2"/>
          <circle cx="172" cy="84" r="6" fill="#A7F3D0" stroke="#18181B" stroke-width="2"/>
        </svg>
        <div class="doodle-filler-caption">Studio Sketchpad ✦</div>
        <div class="doodle-filler-sub">Hand-drawn margin artwork</div>
      </div>
    `
  ];

  let html = '';
  for (let i = 0; i < freeSlots; i++) {
    html += doodleTemplates[i % doodleTemplates.length];
  }
  return html;
}

/**
 * Shared 5 MB image upload + optimization helper for Blog & Project editors.
 * Validates file type and <= 5 MB size, then scales large photos for reliable localStorage persistence.
 */
window.processPortfolioImageUpload = function (file) {
  const MAX_BYTES = 5 * 1024 * 1024;
  return new Promise((resolve, reject) => {
    if (!file || !file.type || !file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file (JPG, PNG, WebP, GIF).'));
      return;
    }
    if (file.size > MAX_BYTES) {
      reject(new Error('Image exceeds the 5 MB limit. Please choose a file under 5 MB.'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read the selected image file.'));
    reader.onload = () => {
      const rawDataUrl = reader.result;
      if (typeof rawDataUrl !== 'string') {
        reject(new Error('Invalid image data.'));
        return;
      }
      // Keep small images or SVGs untouched
      if (rawDataUrl.length <= 380000 || file.type === 'image/svg+xml') {
        resolve(rawDataUrl);
        return;
      }
      const img = new Image();
      img.onerror = () => resolve(rawDataUrl);
      img.onload = () => {
        const maxDim = 1400;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Slug & Public URL Helpers
 */
window.slugifyBlogTitle = function (text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || ('post-' + Date.now());
};

window.getBlogPublicUrl = function (postOrId) {
  const post = typeof postOrId === 'string'
    ? (typeof getBlogPost === 'function' ? getBlogPost(postOrId) : null)
    : postOrId;
  const slug = (post && post.slug) || (post && post.title && window.slugifyBlogTitle(post.title)) || String(postOrId || '');
  const isHttp = window.location.protocol === 'http:' || window.location.protocol === 'https:';
  if (isHttp) {
    return `${window.location.origin}/blog/${encodeURIComponent(slug)}`;
  }
  return `blog.html?article=${encodeURIComponent(slug)}`;
};

/**
 * Persistent Server Sync (Vercel /api/blogs -> Supabase Postgres)
 * Falls back gracefully to localStorage on file:// or when DB env vars are not yet configured.
 */
window.syncBlogPostsFromServer = async function (includeDrafts = false, adminPin = '') {
  if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') {
    return { configured: false, posts: typeof getBlogPosts === 'function' ? getBlogPosts() : [] };
  }
  try {
    const query = includeDrafts ? '?all=1' : '';
    const headers = adminPin ? { 'x-admin-pin': adminPin } : {};
    const res = await fetch(`/api/blogs${query}`, { headers, cache: 'no-store' });
    const data = await res.json();
    if (!res.ok || !data || !Array.isArray(data.posts)) {
      return { configured: false, posts: getBlogPosts(), error: data && data.error };
    }
    // Always sync server state (including empty [] when all posts are deleted)
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(data.posts));
    window.dispatchEvent(new CustomEvent('rizal:blogs-synced', { detail: { posts: data.posts } }));
    return { configured: true, posts: data.posts };
  } catch (err) {
    return { configured: false, posts: typeof getBlogPosts === 'function' ? getBlogPosts() : [], error: err.message };
  }
};

window.saveBlogPostToServer = async function (postData, adminPin) {
  const payload = {
    ...postData,
    slug: postData.slug || window.slugifyBlogTitle(postData.title)
  };
  const savedLocal = saveBlogPost(payload);
  if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') {
    return { ok: true, localOnly: true, post: savedLocal };
  }
  try {
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-pin': adminPin || sessionStorage.getItem('rizal_admin_pin') || ''
      },
      body: JSON.stringify(savedLocal)
    });
    const data = await res.json();
    if (!res.ok) {
      return { ok: false, localSaved: true, error: (data && data.error) || 'Failed to save to cloud database.' };
    }
    return { ok: true, post: data.post || savedLocal };
  } catch (err) {
    return { ok: false, localSaved: true, error: err.message };
  }
};

window.deleteBlogPostFromServer = async function (id, adminPin) {
  deleteBlogPost(id);
  if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') {
    return { ok: true, localOnly: true };
  }
  try {
    const res = await fetch(`/api/blogs?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { 'x-admin-pin': adminPin || sessionStorage.getItem('rizal_admin_pin') || '' }
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: (data && data.error) || 'Failed to delete from cloud database.' };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
};

window.migrateLocalBlogsToServer = async function (adminPin) {
  const posts = getBlogPosts();
  const res = await fetch('/api/blogs?action=migrate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-pin': adminPin || sessionStorage.getItem('rizal_admin_pin') || ''
    },
    body: JSON.stringify({ posts })
  });
  const data = await res.json();
  if (!res.ok) throw new Error((data && data.error) || 'Migration failed');
  return data;
};

/**
 * Full Social Share Modal (Copy Link, WhatsApp, LinkedIn, Facebook, X/Twitter, Native Share)
 */
window.shareBlogArticle = function (postId) {
  const posts = typeof getBlogPosts === 'function' ? getBlogPosts() : [];
  const post = posts.find(p => p.id === postId || p.slug === postId) || null;
  const shareUrl = window.getBlogPublicUrl(post || postId);
  const title = post ? post.title : document.title;
  const text = post ? post.excerpt : 'Check out this article on Rizal Rahman\'s blog!';

  let modal = document.getElementById('blog-share-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'blog-share-modal';
    modal.className = 'scrapbook-modal-backdrop';
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('role', 'dialog');
    modal.innerHTML = `
      <div class="modal-paper-window blog-share-window" style="max-width: 480px; padding: 2rem 1.75rem;">
        <button type="button" class="modal-close-btn" id="blog-share-close" aria-label="Close share dialog">✕</button>
        <div class="washi-tape tape-tl tape-yellow"></div>
        <div class="washi-tape tape-tr tape-pink"></div>

        <span class="article-category-tag">SHARE ARTICLE ✦</span>
        <h3 id="share-modal-title" style="font-family: var(--font-cutout); font-size: 1.45rem; color: var(--ink-primary); margin: 0.45rem 0 1rem; line-height: 1.3;"></h3>

        <div class="share-url-row">
          <input type="text" id="share-modal-url" class="admin-input" readonly aria-label="Article public URL">
          <button type="button" id="share-copy-btn" class="btn-scrapbook-primary" style="padding: 0.55rem 1.1rem; font-size: 0.85rem; white-space: nowrap;">Copy Link</button>
        </div>
        <div id="share-copy-feedback" style="font-family: var(--font-mono); font-size: 0.78rem; min-height: 1.2rem; margin: 0.4rem 0 1rem; color: #16A34A;"></div>

        <div class="share-platforms-grid">
          <a id="share-wa-link" target="_blank" rel="noopener noreferrer" class="share-platform-btn share-wa">💬 WhatsApp</a>
          <a id="share-li-link" target="_blank" rel="noopener noreferrer" class="share-platform-btn share-li">💼 LinkedIn</a>
          <a id="share-fb-link" target="_blank" rel="noopener noreferrer" class="share-platform-btn share-fb">📘 Facebook</a>
          <a id="share-x-link" target="_blank" rel="noopener noreferrer" class="share-platform-btn share-x">𝕏 Post on X</a>
        </div>

        <button type="button" id="share-native-btn" class="btn-scrapbook-secondary" style="width: 100%; justify-content: center; margin-top: 0.9rem; display: none;">
          📱 Share via Device...
        </button>
      </div>
    `;
    document.body.appendChild(modal);

    const closeShare = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    document.getElementById('blog-share-close').addEventListener('click', closeShare);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeShare();
    });
  }

  document.getElementById('share-modal-title').textContent = title;
  const urlInput = document.getElementById('share-modal-url');
  const feedback = document.getElementById('share-copy-feedback');
  urlInput.value = shareUrl;
  feedback.textContent = '';

  const encUrl = encodeURIComponent(shareUrl);
  const encTitle = encodeURIComponent(title);
  document.getElementById('share-wa-link').href = `https://wa.me/?text=${encodeURIComponent(title + ' — ' + shareUrl)}`;
  document.getElementById('share-li-link').href = `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`;
  document.getElementById('share-fb-link').href = `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`;
  document.getElementById('share-x-link').href = `https://twitter.com/intent/tweet?text=${encTitle}&url=${encUrl}`;

  document.getElementById('share-copy-btn').onclick = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        urlInput.select();
        urlInput.setSelectionRange(0, 99999);
        document.execCommand('copy');
      }
      feedback.style.color = '#16A34A';
      feedback.textContent = '✓ Link copied to clipboard!';
    } catch (err) {
      urlInput.select();
      try {
        document.execCommand('copy');
        feedback.style.color = '#16A34A';
        feedback.textContent = '✓ Link copied!';
      } catch (e2) {
        feedback.style.color = '#EF4444';
        feedback.textContent = 'Press Ctrl+C to copy the link above.';
      }
    }
  };

  const nativeBtn = document.getElementById('share-native-btn');
  if (navigator.share) {
    nativeBtn.style.display = 'inline-flex';
    nativeBtn.onclick = async () => {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch (err) {
        if (err && err.name !== 'AbortError') {
          feedback.style.color = '#EF4444';
          feedback.textContent = 'Native share unavailable; use the options above.';
        }
      }
    };
  } else {
    nativeBtn.style.display = 'none';
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

// Automatically sync published blog posts from Vercel API on HTTP/HTTPS load
if (typeof window !== 'undefined' && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.location.pathname.endsWith('admin.html')) {
      window.syncBlogPostsFromServer(false);
    }
  });
}
