/**
 * Wirecutter Scraper
 *
 * Extract expert product recommendations, buying guides, and detailed test results
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx wirecutter-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.nytimes.com/wirecutter/reviews/best-wireless-headphones/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const picks = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const name = el.querySelector("[data-testid='product-name']")?.textContent?.trim();
    const pickType = el.querySelector("[data-testid='pick-type']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-price']")?.textContent?.trim();
    const summary = el.querySelector("[data-testid='product-summary']")?.textContent?.trim();
    if (name) picks.push({ name, pickType, price, summary: summary?.slice(0, 200) });
  });
  return JSON.stringify({ total: picks.length, picks: picks.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
