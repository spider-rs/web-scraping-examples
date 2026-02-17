/**
 * 1stDibs Scraper
 *
 * Extract luxury furniture, art, and collectible listings with pricing, provenance
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx 1stdibs-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.1stdibs.com/furniture/seating/lounge-chairs/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-tn='search-results-item']").forEach(el => {
    const title = el.querySelector("[data-tn='search-result-title']")?.textContent?.trim();
    const price = el.querySelector("[data-tn='search-result-price']")?.textContent?.trim();
    const dealer = el.querySelector("[data-tn='search-result-seller']")?.textContent?.trim();
    if (title) items.push({ title, price, dealer });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
