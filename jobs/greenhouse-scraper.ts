/**
 * Greenhouse Scraper
 *
 * Collect job openings, department listings, and office locations from Greenhouse-
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx greenhouse-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://boards.greenhouse.io/spotify");

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll(".opening").forEach(el => {
    const title = el.querySelector("a")?.textContent?.trim();
    const location = el.querySelector(".location")?.textContent?.trim();
    const link = el.querySelector("a")?.getAttribute("href");
    if (title) jobs.push({ title, location, link });
  });
  const departments = [];
  document.querySelectorAll(".department-name").forEach(el => {
    departments.push(el.textContent?.trim());
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 15), departments });
})()`);

console.log(JSON.parse(data));
await spider.close();
