/**
 * JetBrains Marketplace Scraper
 *
 * Extract IDE plugin details, download counts, compatibility info, and vendor data
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx jetbrains-marketplace-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://plugins.jetbrains.com/search?orderBy=downloads");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const plugins = [];
  document.querySelectorAll("[class*='PluginCard'], [class*='plugin-card']").forEach(el => {
    const name = el.querySelector("[class*='name'] a, h3 a")?.textContent?.trim();
    const downloads = el.querySelector("[class*='downloads']")?.textContent?.trim();
    const rating = el.querySelector("[class*='rating']")?.textContent?.trim();
    const vendor = el.querySelector("[class*='vendor']")?.textContent?.trim();
    const desc = el.querySelector("[class*='description'], p")?.textContent?.trim();
    if (name) plugins.push({ name, downloads, rating, vendor, desc });
  });
  return JSON.stringify({ total: plugins.length, plugins: plugins.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
