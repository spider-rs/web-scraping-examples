/**
 * ZipRecruiter Jobs Scraper
 *
 * Retrieve detailed job posting pages, application requirements, and employer info
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ziprecruiter-jobs-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.ziprecruiter.com/jobs/senior-backend-engineer-abc12345");
await page.content(10000);

const data = await page.extractFields({
  title: "h1.job_title",
  company: ".hiring_company_text a",
  location: ".location_text",
  salary: ".salary_range",
  posted: ".posted_date",
  description: ".job_description",
  benefits: ".benefits_list li",
  requirements: ".requirements_section li",
});

console.log(data);
await spider.close();
