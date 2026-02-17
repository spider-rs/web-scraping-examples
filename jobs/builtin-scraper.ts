/**
 * Built In Scraper
 *
 * Extract tech company job listings, culture profiles, and benefits data from Buil
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx builtin-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://builtin.com/jobs/remote/dev-engineering");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll("[data-id='job-card']").forEach(el => {
    const title = el.querySelector(".job-title a")?.textContent?.trim();
    const company = el.querySelector(".company-title")?.textContent?.trim();
    const location = el.querySelector(".job-location")?.textContent?.trim();
    const salary = el.querySelector(".job-salary")?.textContent?.trim();
    if (title) jobs.push({ title, company, location, salary });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
