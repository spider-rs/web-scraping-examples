/**
 * Randstad Scraper
 *
 * Extract staffing and recruitment job postings, salary benchmarks, and industry i
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx randstad-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.randstad.com/jobs/q-software-engineer/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll(".job-card").forEach(el => {
    const title = el.querySelector(".job-card__title a")?.textContent?.trim();
    const location = el.querySelector(".job-card__location")?.textContent?.trim();
    const salary = el.querySelector(".job-card__salary")?.textContent?.trim();
    const type = el.querySelector(".job-card__type")?.textContent?.trim();
    if (title) jobs.push({ title, location, salary, type });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
