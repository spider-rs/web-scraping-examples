/**
 * We Work Remotely Scraper
 *
 * Extract remote-only job postings, category tags, and company details from We Wor
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx weworkremotely-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://weworkremotely.com/categories/remote-programming-jobs");

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll("section.jobs article li").forEach(el => {
    const title = el.querySelector(".title")?.textContent?.trim();
    const company = el.querySelector(".company")?.textContent?.trim();
    const region = el.querySelector(".region")?.textContent?.trim();
    const link = el.querySelector("a")?.getAttribute("href");
    if (title) jobs.push({ title, company, region, link });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
