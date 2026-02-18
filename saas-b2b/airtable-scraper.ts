/**
 * Airtable Scraper
 *
 * Extract template galleries, use case showcases, and universe base data from Airt
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx airtable-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.airtable.com/templates");
await page.content(10000);

const data = await page.extractFields({
  title: "h1",
  description: "[data-testid='template-description']",
  category: "[data-testid='template-category']",
  creator: "[data-testid='template-creator']",
  uses: "[data-testid='template-uses']",
  fields: "[data-testid='template-fields']",
});

console.log(data);
await spider.close();
