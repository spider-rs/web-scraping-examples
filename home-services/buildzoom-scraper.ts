/**
 * BuildZoom Scraper
 *
 * Extract licensed contractor data, building permit histories, project scores, and
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx buildzoom-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.buildzoom.com/contractor/search?q=general+contractor&loc=San+Francisco%2C+CA");
await page.content();

const data = await page.evaluate(`(() => {
  const contractors = [];
  document.querySelectorAll(".contractor-card, .search-result").forEach(el => {
    const name = el.querySelector(".contractor-name, h3 a")?.textContent?.trim();
    const score = el.querySelector(".bz-score, .score-badge")?.textContent?.trim();
    const license = el.querySelector(".license-number")?.textContent?.trim();
    const permits = el.querySelector(".permit-count")?.textContent?.trim();
    const specialty = el.querySelector(".specialty, .trade-type")?.textContent?.trim();
    if (name) contractors.push({ name, score, license, permits, specialty });
  });
  return JSON.stringify({ total: contractors.length, contractors: contractors.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
