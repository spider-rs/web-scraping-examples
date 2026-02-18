/**
 * Robert Half Scraper
 *
 * Harvest staffing job listings, salary guides, and career resources from Robert H
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx roberthalf-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.roberthalf.com/us/en/jobs/all/accountant/all");
await page.content(10000);

const data = await page.extractFields({
  title: "h1.job-title",
  location: ".job-location",
  salary: ".job-salary-range",
  type: ".job-employment-type",
  description: ".job-description",
  referenceId: ".job-reference-id",
});

console.log(data);
await spider.close();
