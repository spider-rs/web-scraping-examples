/**
 * Amazon Reviews Scraper
 *
 * Extract product reviews, verified purchase badges, helpful votes, and rating bre
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx amazon-reviews-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.amazon.com/product-reviews/B0BSHF7WHW/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const reviews = [];
  document.querySelectorAll("[data-hook='review']").forEach(el => {
    const title = el.querySelector("[data-hook='review-title'] span:last-child")?.textContent?.trim();
    const text = el.querySelector("[data-hook='review-body'] span")?.textContent?.trim();
    const rating = el.querySelector("[data-hook='review-star-rating'] span")?.textContent?.trim();
    const author = el.querySelector("[data-hook='review-author']")?.textContent?.trim();
    const date = el.querySelector("[data-hook='review-date']")?.textContent?.trim();
    const verified = el.querySelector("[data-hook='avp-badge']")?.textContent?.trim();
    if (title) reviews.push({ title, text: text?.slice(0, 300), rating, author, date, verified });
  });
  return JSON.stringify({ total: reviews.length, reviews: reviews.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
