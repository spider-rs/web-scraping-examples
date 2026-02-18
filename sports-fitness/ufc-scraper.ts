/**
 * UFC Scraper
 *
 * Extract UFC fight cards, fighter rankings, event schedules, and fight results fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ufc-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.ufc.com/rankings");
await page.content();

const data = await page.evaluate(`(() => {
  const rankings = [];
  document.querySelectorAll(".view-grouping").forEach(division => {
    const weightClass = division.querySelector(".view-grouping-header")?.textContent?.trim();
    division.querySelectorAll("table tbody tr").forEach(el => {
      const rank = el.querySelector("td:first-child")?.textContent?.trim();
      const name = el.querySelector("td:nth-child(2) a")?.textContent?.trim();
      if (name) rankings.push({ weightClass, rank, name });
    });
  });
  return JSON.stringify({ total: rankings.length, rankings: rankings.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
