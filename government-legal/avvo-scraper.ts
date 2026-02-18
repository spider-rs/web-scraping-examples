/**
 * Avvo Scraper
 *
 * Extract attorney profiles, practice areas, client reviews, and rating data from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx avvo-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.avvo.com/all-lawyers/ca/san-francisco.html");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const attorneys = [];
  document.querySelectorAll(".lawyer-search-result").forEach(el => {
    const name = el.querySelector(".lawyer-name")?.textContent?.trim();
    const rating = el.querySelector(".avvo-rating-number")?.textContent?.trim();
    const practice = el.querySelector(".practice-area")?.textContent?.trim();
    const reviews = el.querySelector(".review-count")?.textContent?.trim();
    if (name) attorneys.push({ name, rating, practice, reviews });
  });
  return JSON.stringify({ total: attorneys.length, attorneys: attorneys.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
