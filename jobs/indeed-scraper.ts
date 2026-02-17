/**
 * Indeed Job Scraper
 *
 * Extract job listings from Indeed — title, company, location, and
 * salary estimates. Handles dynamic search results with stealth browsing.
 *
 * Uses `evaluate()` to iterate over multiple job card elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx indeed-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto(
  "https://www.indeed.com/jobs?q=software+engineer&l=San+Francisco",
);
await page.content(10000);

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll(".job_seen_beacon").forEach(el => {
    const title = el.querySelector(".jobTitle span")?.textContent?.trim();
    const company = el.querySelector("[data-testid='company-name']")?.textContent?.trim();
    const location = el.querySelector("[data-testid='text-location']")?.textContent?.trim();
    const salary = el.querySelector(".salary-snippet-container")?.textContent?.trim();
    if (title) jobs.push({ title, company, location, salary });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
