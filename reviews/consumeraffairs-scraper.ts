/**
 * Consumer Affairs Scraper
 *
 * Scrapes Amazon customer reviews from Consumer Affairs review platform.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx reviews/consumeraffairs-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.consumeraffairs.com/online/amazon.html");
await page.content();
const data = await page.evaluate(`(() => {
  const reviews = Array.from(document.querySelectorAll('[data-test="review-item"]')).map(el => ({
    rating: el.querySelector('[data-test="star-rating"]')?.textContent?.trim(),
    title: el.querySelector('[data-test="review-title"]')?.textContent?.trim(),
    body: el.querySelector('[data-test="review-body"]')?.textContent?.trim(),
    author: el.querySelector('[data-test="reviewer-name"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ reviews });
})()`);
console.log(JSON.parse(data));
await spider.close();
