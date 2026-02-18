/**
 * HomeAdvisor Scraper
 *
 * Extract home improvement contractor listings, project cost guides, screened prof
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx homeadvisor-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.homeadvisor.com/c.Roofing.Houston.TX.-12057.html");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const pros = [];
  document.querySelectorAll(".pro-listing-card").forEach(el => {
    const name = el.querySelector(".pro-name")?.textContent?.trim();
    const rating = el.querySelector(".star-rating-value")?.textContent?.trim();
    const reviews = el.querySelector(".review-count")?.textContent?.trim();
    const screened = el.querySelector(".screened-badge") ? true : false;
    const phone = el.querySelector(".phone-number")?.textContent?.trim();
    if (name) pros.push({ name, rating, reviews, screened, phone });
  });
  return JSON.stringify({ total: pros.length, pros: pros.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
