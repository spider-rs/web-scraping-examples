/**
 * BirdEye Scraper
 *
 * Extract aggregated business reviews, sentiment analysis, and reputation scores f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx birdeye-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://birdeye.com/top-businesses/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const businesses = [];
  document.querySelectorAll(".business-card").forEach(el => {
    const name = el.querySelector(".business-card__name")?.textContent?.trim();
    const rating = el.querySelector(".business-card__rating")?.textContent?.trim();
    const reviews = el.querySelector(".business-card__review-count")?.textContent?.trim();
    const category = el.querySelector(".business-card__category")?.textContent?.trim();
    if (name) businesses.push({ name, rating, reviews, category });
  });
  return JSON.stringify({ total: businesses.length, businesses: businesses.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
