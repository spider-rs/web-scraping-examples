/**
 * Glassdoor Reviews Scraper
 *
 * Extract company reviews from Glassdoor — title, rating, pros, and
 * cons. Handles authentication walls with stealth browsing.
 *
 * Uses `evaluate()` to iterate over multiple review elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx glassdoor-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto(
  "https://www.glassdoor.com/Reviews/google-reviews-SRCH_KE0,6.htm",
);
await page.content(12000);

const data = await page.evaluate(`(() => {
  const reviews = [];
  document.querySelectorAll('[data-test="reviewsList"] li').forEach(el => {
    const title = el.querySelector('[class*="reviewLink"]')?.textContent?.trim();
    const rating = el.querySelector('[class*="ratingNumber"]')?.textContent?.trim();
    const pros = el.querySelector('[data-test="pros"]')?.textContent?.trim();
    const cons = el.querySelector('[data-test="cons"]')?.textContent?.trim();
    if (title) reviews.push({ title, rating, pros, cons });
  });
  return JSON.stringify({ total: reviews.length, reviews: reviews.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
