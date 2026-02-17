/**
 * Postman Scraper
 *
 * Extract public API collections, workspace details, documentation pages, and flow
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx postman-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.postman.com/explore");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const collections = [];
  document.querySelectorAll("[class*='CollectionCard'], [class*='explore-card']").forEach(el => {
    const name = el.querySelector("h3, [class*='name']")?.textContent?.trim();
    const publisher = el.querySelector("[class*='publisher'], [class*='author']")?.textContent?.trim();
    const forks = el.querySelector("[class*='forks']")?.textContent?.trim();
    const desc = el.querySelector("p, [class*='description']")?.textContent?.trim();
    if (name) collections.push({ name, publisher, forks, desc });
  });
  return JSON.stringify({ total: collections.length, collections: collections.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
