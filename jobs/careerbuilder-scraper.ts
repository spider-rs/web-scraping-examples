/**
 * CareerBuilder Scraper
 *
 * Collect job postings, employer profiles, and compensation data from CareerBuilde
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx careerbuilder-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.careerbuilder.com/jobs?keywords=project+manager&location=Denver%2C+CO");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll(".data-results-content-parent").forEach(el => {
    const title = el.querySelector(".data-results-title")?.textContent?.trim();
    const company = el.querySelector(".data-details .data-detais-company")?.textContent?.trim();
    const location = el.querySelector(".data-details .data-details-location")?.textContent?.trim();
    if (title) jobs.push({ title, company, location });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
