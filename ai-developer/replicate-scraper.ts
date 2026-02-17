/**
 * Replicate Scraper
 *
 * Extract ML model listings, run counts, pricing data, and API integration example
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx replicate-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://replicate.com/explore");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const models = [];
  document.querySelectorAll("[class*='ModelCard'], [class*='model-card']").forEach(el => {
    const name = el.querySelector("h2, [class*='name']")?.textContent?.trim();
    const author = el.querySelector("[class*='owner'], [class*='author']")?.textContent?.trim();
    const runs = el.querySelector("[class*='runs']")?.textContent?.trim();
    const desc = el.querySelector("p, [class*='description']")?.textContent?.trim();
    if (name) models.push({ name, author, runs, desc });
  });
  return JSON.stringify({ total: models.length, models: models.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
