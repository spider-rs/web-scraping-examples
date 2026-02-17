/**
 * Adobe Stock Scraper
 *
 * Extract stock asset metadata, contributor profiles, pricing tiers, and keyword d
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx adobe-stock-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://stock.adobe.com/search?k=abstract+background");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const assets = [];
  document.querySelectorAll("[data-testid='search-result-cell']").forEach(el => {
    const title = el.querySelector("[data-testid='result-title']")?.textContent?.trim();
    const contributor = el.querySelector("[data-testid='result-contributor']")?.textContent?.trim();
    const img = el.querySelector("img")?.getAttribute("src");
    if (title) assets.push({ title, contributor, img });
  });
  return JSON.stringify({ total: assets.length, assets: assets.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
