/**
 * Yelp Business Scraper
 *
 * Extract business listings from Yelp search — name, rating, reviews,
 * and categories. Handles dynamic content with stealth browsing.
 *
 * Uses `evaluate()` to iterate over multiple business card elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx yelp-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto(
  "https://www.yelp.com/search?find_desc=restaurants&find_loc=San+Francisco",
);
await page.content(10000);

const data = await page.evaluate(`(() => {
  const businesses = [];
  document.querySelectorAll("[data-testid='serp-ia-card']").forEach(el => {
    const name = el.querySelector("a[data-testid='biz-name']")?.textContent?.trim();
    const rating = el.querySelector("[aria-label*='star rating']")?.getAttribute("aria-label");
    const reviews = el.querySelector("[data-font-weight='semibold']")?.textContent?.trim();
    const categories = el.querySelector("[class*='priceCategory']")?.textContent?.trim();
    if (name) businesses.push({ name, rating, reviews, categories });
  });
  return JSON.stringify({ total: businesses.length, businesses: businesses.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
