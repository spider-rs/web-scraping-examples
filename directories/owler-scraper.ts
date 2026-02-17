/**
 * Owler Scraper
 *
 * Extract competitive intelligence data, company news, revenue estimates, and empl
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx owler-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.owler.com/company/stripe");
await page.content(8000);

const data = await page.extractFields({
  name: "h1.company-name",
  revenue: ".revenue-value",
  employees: ".employee-count",
  founded: ".founded-date",
  ceo: ".ceo-name",
  description: ".company-description",
  competitors: ".competitor-name",
});

console.log(data);
await spider.close();
