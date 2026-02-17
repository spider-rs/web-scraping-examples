/**
 * TrustRadius Scraper
 *
 * Extract verified software reviews, feature ratings, and comparison data from Tru
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx trustradius-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.trustradius.com/crm");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const products = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const name = el.querySelector("[data-testid='product-name']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='trScore']")?.textContent?.trim();
    const reviews = el.querySelector("[data-testid='review-count']")?.textContent?.trim();
    const category = el.querySelector("[data-testid='product-category']")?.textContent?.trim();
    if (name) products.push({ name, rating, reviews, category });
  });
  return JSON.stringify({ total: products.length, products: products.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
