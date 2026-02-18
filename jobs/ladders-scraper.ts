/**
 * Ladders Scraper
 *
 * Collect high-salary job listings, executive positions, and compensation data fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ladders-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.theladders.com/jobs/search-jobs?searchQuery=VP+Engineering");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll(".job-listing-card").forEach(el => {
    const title = el.querySelector(".job-title a")?.textContent?.trim();
    const company = el.querySelector(".company-name")?.textContent?.trim();
    const location = el.querySelector(".job-location")?.textContent?.trim();
    const salary = el.querySelector(".salary-estimate")?.textContent?.trim();
    if (title) jobs.push({ title, company, location, salary });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
