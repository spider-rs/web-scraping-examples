/**
 * Trustpilot Reviews Scraper
 *
 * Scrapes Amazon reviews from Trustpilot review platform.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx reviews/trustpilot-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.trustpilot.com/review/amazon.com");
await page.content();
const data = await page.evaluate(`(() => {
  const reviews = Array.from(document.querySelectorAll('[data-test-id="review"]')).map(el => ({
    title: el.querySelector('[data-test-id="review-title"]')?.textContent?.trim(),
    rating: el.querySelector('[data-test-id="star-rating-icon"]')?.getAttribute('aria-label'),
    body: el.querySelector('[data-test-id="review-content"]')?.textContent?.trim(),
    author: el.querySelector('[data-test-id="consumer-name"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ reviews });
})()`);
console.log(JSON.parse(data));
await spider.close();
