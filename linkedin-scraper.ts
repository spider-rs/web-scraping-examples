/**
 * LinkedIn Company Scraper
 *
 * Extract public company data from LinkedIn — name, industry, size,
 * description, and headquarters. Handles anti-bot protection.
 *
 * Uses `extractFields()` for clean, single-call field extraction.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx linkedin-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.linkedin.com/company/google/");
await page.content(10000);

const data = await page.extractFields({
  name: "h1",
  industry: "[data-test-id='about-us__industry']",
  size: "[data-test-id='about-us__size']",
  description: "[data-test-id='about-us__description']",
  location: "[data-test-id='about-us__headquarters']",
});

console.log(data);
await spider.close();
