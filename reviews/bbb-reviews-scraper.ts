/**
 * BBB Reviews Scraper
 *
 * Extract business accreditation, ratings, complaints, and reviews from Better Bus
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bbb-reviews-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.bbb.org/search?find_country=US&find_text=web+development");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const businesses = [];
  document.querySelectorAll(".bds-listing").forEach(el => {
    const name = el.querySelector(".bds-listing-title a")?.textContent?.trim();
    const rating = el.querySelector(".bds-rating-image img")?.getAttribute("alt");
    const location = el.querySelector(".bds-listing-location")?.textContent?.trim();
    if (name) businesses.push({ name, rating, location });
  });
  return JSON.stringify({ total: businesses.length, businesses: businesses.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
