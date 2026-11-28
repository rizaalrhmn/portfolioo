#!/usr/bin/env node
// Ping IndexNow (Bing, Yandex, Seznam, Naver…) with every URL in the live sitemap.
// Run AFTER a deploy is live:   node scripts/indexnow.mjs
// Optional: node scripts/indexnow.mjs https://yourdomain.mt/insights/new-post/
import { SITE } from '../site.config.mjs';

const host = new URL(SITE.url).host;
let urls = process.argv.slice(2);
if (!urls.length) {
  const xml = await (await fetch(`${SITE.url}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
const keyCheck = await fetch(`${SITE.url}/${SITE.indexNowKey}.txt`);
if (!keyCheck.ok) { console.error(`✖ Key file not live at ${SITE.url}/${SITE.indexNowKey}.txt — deploy first.`); process.exit(1); }

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: SITE.indexNowKey, keyLocation: `${SITE.url}/${SITE.indexNowKey}.txt`, urlList: urls }),
});
console.log(`IndexNow → HTTP ${res.status} for ${urls.length} URLs (200/202 = accepted)`);
