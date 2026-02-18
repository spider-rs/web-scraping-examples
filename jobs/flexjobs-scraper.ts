/**
 * FlexJobs Scraper
 *
 * Gather vetted remote and flexible job listings, company reviews, and work arrang
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx flexjobs-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.flexjobs.com/remote-jobs/computer-it");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll(".sc-job-listing").forEach(el => {
    const title = el.querySelector(".sc-job-title a")?.textContent?.trim();
    const company = el.querySelector(".sc-job-company")?.textContent?.trim();
    const location = el.querySelector(".sc-job-location")?.textContent?.trim();
    const schedule = el.querySelector(".sc-job-schedule")?.textContent?.trim();
    if (title) jobs.push({ title, company, location, schedule });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
