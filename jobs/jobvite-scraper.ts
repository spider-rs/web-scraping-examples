/**
 * Jobvite Scraper
 *
 * Extract job openings, department listings, and application forms from Jobvite-po
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx jobvite-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://jobs.jobvite.com/careers/salesforce/jobs");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll(".jv-job-list__item").forEach(el => {
    const title = el.querySelector(".jv-job-list__title a")?.textContent?.trim();
    const department = el.querySelector(".jv-job-list__department")?.textContent?.trim();
    const location = el.querySelector(".jv-job-list__location")?.textContent?.trim();
    const link = el.querySelector(".jv-job-list__title a")?.getAttribute("href");
    if (title) jobs.push({ title, department, location, link });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
