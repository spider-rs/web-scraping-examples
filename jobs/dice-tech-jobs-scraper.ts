/**
 * Dice Tech Jobs Scraper
 *
 * Pull detailed tech job postings, required certifications, and remote work option
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx dice-tech-jobs-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.dice.com/job-detail/abc12345-example-senior-devops-engineer");
await page.content(10000);

const data = await page.extractFields({
  title: "[data-cy='jobTitle']",
  company: "[data-cy='companyNameLink']",
  location: "[data-cy='locationDetails']",
  salary: "[data-cy='compensationText']",
  posted: "[data-cy='postedDate']",
  skills: "[data-cy='skillsList']",
  description: "[data-cy='jobDescription']",
  employmentType: "[data-cy='employmentDetails']",
});

console.log(data);
await spider.close();
