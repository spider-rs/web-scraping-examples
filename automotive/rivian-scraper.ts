/**
 * Rivian Scraper
 *
 * Extract Rivian electric vehicle configurations, pricing, range estimates, advent
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rivian-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://rivian.com/r1t");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const specs = [];
  document.querySelectorAll("[class*='spec-card'], [class*='trim-card'], [class*='variant']").forEach(el => {
    const name = el.querySelector("h2, h3, [class*='name']")?.textContent?.trim();
    const price = el.querySelector("[class*='price']")?.textContent?.trim();
    const range = el.querySelector("[class*='range']")?.textContent?.trim();
    const towing = el.querySelector("[class*='towing']")?.textContent?.trim();
    if (name) specs.push({ name, price, range, towing });
  });
  return JSON.stringify({ total: specs.length, specs: specs.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
