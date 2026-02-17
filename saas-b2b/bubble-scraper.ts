/**
 * Bubble Scraper
 *
 * Extract plugin marketplace listings, template data, pricing plans, and showcase 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bubble-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://bubble.io/marketplace");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const plugins = [];
  document.querySelectorAll(".marketplace-card, [data-testid='plugin-card']").forEach(el => {
    const name = el.querySelector("h3, .plugin-name")?.textContent?.trim();
    const rating = el.querySelector(".rating-value, [data-testid='rating']")?.textContent?.trim();
    const installs = el.querySelector(".install-count, [data-testid='installs']")?.textContent?.trim();
    const price = el.querySelector(".price, [data-testid='price']")?.textContent?.trim();
    if (name) plugins.push({ name, rating, installs, price });
  });
  return JSON.stringify({ total: plugins.length, plugins: plugins.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
