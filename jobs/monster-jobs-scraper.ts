/**
 * Monster Jobs Scraper
 *
 * Pull detailed job posting content, qualification lists, and employer profiles fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx monster-jobs-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.monster.com/jobs/search?q=marketing+manager&where=Los+Angeles%2C+CA");
await page.content(10000);

const data = await page.extractFields({
  title: "[data-testid='svx-job-title']",
  company: "[data-testid='svx-job-company']",
  location: "[data-testid='svx-job-location']",
  salary: "[data-testid='svx-job-salary']",
  description: "[data-testid='svx-job-description']",
  qualifications: "[data-testid='svx-job-qualifications'] li",
  benefits: "[data-testid='svx-job-benefits'] li",
});

console.log(data);
await spider.close();
