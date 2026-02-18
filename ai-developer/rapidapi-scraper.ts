/**
 * RapidAPI Scraper
 *
 * Extract API listings, pricing tiers, endpoint documentation, and popularity metr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rapidapi-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://rapidapi.com/hub");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const apis = [];
  document.querySelectorAll("[class*='ApiCard'], [class*='api-item']").forEach(el => {
    const name = el.querySelector("h3, [class*='name']")?.textContent?.trim();
    const category = el.querySelector("[class*='category']")?.textContent?.trim();
    const popularity = el.querySelector("[class*='popularity']")?.textContent?.trim();
    const latency = el.querySelector("[class*='latency']")?.textContent?.trim();
    const desc = el.querySelector("p, [class*='description']")?.textContent?.trim();
    if (name) apis.push({ name, category, popularity, latency, desc });
  });
  return JSON.stringify({ total: apis.length, apis: apis.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
