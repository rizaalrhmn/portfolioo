# Automatic SEO Rebuild on Blog Publish (Supabase → Vercel)

Whenever you publish, update, or delete an article in `/admin.html`, Supabase writes to `public.blog_posts`. To pre-render the new static `/insights/<slug>/index.html` page and update `sitemap.xml` automatically without touching Git, connect a **Vercel Deploy Hook** to a **Supabase Database Webhook**.

## 1. Create a Vercel Deploy Hook
1. Open your project in the [Vercel Dashboard](https://vercel.com/).
2. Go to **Settings → Git → Deploy Hooks**.
3. Click **Create Hook**:
   - **Name**: `supabase-blog`
   - **Git Branch**: `main`
4. Copy the generated webhook URL (looks like `https://api.vercel.com/v1/integrations/deploy/prj_.../XXXXXXXX`).
   > **Keep this URL private** — anyone with it can trigger a deployment. Do not commit it to the repository.

## 2. Connect a Supabase Database Webhook
1. Open your Supabase project (`rizal-portfolio`) in the [Supabase Dashboard](https://supabase.com/dashboard).
2. Go to **Database → Webhooks** (enable Database Webhooks if prompted).
3. Click **Create a new hook**:
   - **Name**: `rebuild-vercel-on-blog-change`
   - **Table**: `public.blog_posts`
   - **Events**: check `Insert`, `Update`, and `Delete`
   - **Type**: `HTTP Request`
   - **Method**: `POST`
   - **URL**: paste the Vercel Deploy Hook URL from Step 1
   - **HTTP Headers**: leave default (`Content-type: application/json`)
4. Save the webhook.

## 3. Test the End-to-End Flow
1. Sign in to `/admin.html` and publish or edit a test post.
2. Within ~5 seconds, a new deployment triggered by `supabase-blog` will appear in **Vercel → Deployments**.
3. Once finished (~30 seconds), verify:
   - `https://rizalrhmn.vercel.app/insights/<your-slug>/` returns full static HTML (View Source shows `<h1>`, `<article>`, and `BlogPosting` JSON-LD).
   - `https://rizalrhmn.vercel.app/sitemap.xml` includes the new `/insights/<your-slug>/` URL.
4. Optionally run `npm run indexnow` after publishing to notify Bing/Yandex immediately.
