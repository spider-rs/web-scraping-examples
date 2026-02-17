/**
 * Lensa Scraper
 *
 * Harvest AI-matched job listings, salary predictions, and career path suggestions
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx lensa-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://lensa.com/jobs/software-engineer/san-francisco-ca");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll(".job-card").forEach(el => {
    const title = el.querySelector(".job-card-title a")?.textContent?.trim();
    const company = el.querySelector(".job-card-company")?.textContent?.trim();
    const location = el.querySelector(".job-card-location")?.textContent?.trim();
    const salary = el.querySelector(".job-card-salary")?.textContent?.trim();
    if (title) jobs.push({ title, company, location, salary });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
