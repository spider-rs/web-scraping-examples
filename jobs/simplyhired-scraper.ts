/**
 * SimplyHired Scraper
 *
 * Harvest job listings, salary estimates, and employer details from SimplyHired ag
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx simplyhired-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.simplyhired.com/search?q=data+analyst&l=Boston%2C+MA");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll("[data-testid='searchSerpJob']").forEach(el => {
    const title = el.querySelector("h2 a")?.textContent?.trim();
    const company = el.querySelector("[data-testid='companyName']")?.textContent?.trim();
    const location = el.querySelector("[data-testid='searchSerpJobLocation']")?.textContent?.trim();
    const salary = el.querySelector("[data-testid='searchSerpJobSalary']")?.textContent?.trim();
    if (title) jobs.push({ title, company, location, salary });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
