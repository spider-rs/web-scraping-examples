/**
 * GovTrack Scraper
 *
 * Extract congressional voting records, bill tracking data, and legislator profile
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx govtrack-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.govtrack.us/congress/bills/subjects/artificial_intelligence/6960");
await page.content();

const data = await page.evaluate(`(() => {
  const bills = [];
  document.querySelectorAll("#main .search-result-item").forEach(el => {
    const title = el.querySelector("a")?.textContent?.trim();
    const status = el.querySelector(".status")?.textContent?.trim();
    const link = el.querySelector("a")?.getAttribute("href");
    if (title) bills.push({ title, status, link });
  });
  return JSON.stringify({ total: bills.length, bills: bills.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
