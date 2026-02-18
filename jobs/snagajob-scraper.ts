/**
 * Snagajob Scraper
 *
 * Extract hourly job listings, shift schedules, and employer ratings from Snagajob
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx snagajob-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.snagajob.com/jobs?q=barista&w=Seattle%2C+WA");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll("[data-test='jobCard']").forEach(el => {
    const title = el.querySelector("[data-test='jobTitle']")?.textContent?.trim();
    const company = el.querySelector("[data-test='companyName']")?.textContent?.trim();
    const location = el.querySelector("[data-test='jobLocation']")?.textContent?.trim();
    const pay = el.querySelector("[data-test='jobPay']")?.textContent?.trim();
    if (title) jobs.push({ title, company, location, pay });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
