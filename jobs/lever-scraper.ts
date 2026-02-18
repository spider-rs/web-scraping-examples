/**
 * Lever Scraper
 *
 * Extract job openings, team categories, and work locations from Lever-hosted comp
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx lever-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://jobs.lever.co/netflix");

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll(".posting").forEach(el => {
    const title = el.querySelector("h5 a")?.textContent?.trim();
    const location = el.querySelector(".posting-categories .sort-by-location")?.textContent?.trim();
    const team = el.querySelector(".posting-categories .sort-by-team")?.textContent?.trim();
    const commitment = el.querySelector(".posting-categories .sort-by-commitment")?.textContent?.trim();
    const link = el.querySelector("h5 a")?.getAttribute("href");
    if (title) jobs.push({ title, location, team, commitment, link });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
