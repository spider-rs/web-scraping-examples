/**
 * iCIMS Scraper
 *
 * Pull job postings, category filters, and location options from iCIMS-hosted tale
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx icims-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://careers-anduril.icims.com/jobs/search");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll(".iCIMS_JobsTable .row").forEach(el => {
    const title = el.querySelector(".iCIMS_JobTitle a")?.textContent?.trim();
    const location = el.querySelector(".iCIMS_JobLocation")?.textContent?.trim();
    const category = el.querySelector(".iCIMS_JobCategory")?.textContent?.trim();
    const link = el.querySelector(".iCIMS_JobTitle a")?.getAttribute("href");
    if (title) jobs.push({ title, location, category, link });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
