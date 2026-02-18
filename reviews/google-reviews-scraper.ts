/**
 * Google Reviews Scraper
 *
 * Extract business reviews, star ratings, and reviewer feedback from Google Maps r
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx google-reviews-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.google.com/maps/place/Empire+State+Building/");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const reviews = [];
  document.querySelectorAll("[data-review-id]").forEach(el => {
    const reviewer = el.querySelector("a[href*='contrib'] span, button[aria-label] span")?.textContent?.trim();
    const text = el.querySelector("span[jstcache], div > span:not(:empty)")?.textContent?.trim();
    const rating = el.querySelector("[aria-label*='star']")?.getAttribute("aria-label");
    const date = el.querySelector("[aria-label*='ago']")?.textContent?.trim()
      || el.querySelector("span:last-of-type")?.textContent?.trim();
    if (text) reviews.push({ reviewer, text: text.slice(0, 300), rating, date });
  });
  return JSON.stringify({ total: reviews.length, reviews: reviews.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
