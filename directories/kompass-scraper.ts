/**
 * Kompass Scraper
 *
 * Extract global B2B company profiles, product catalogs, export data, and industry
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx kompass-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.kompass.com/searchCompanies?text=manufacturing&localizationCode=US");
await page.content();

const data = await page.extractFields({
  name: ".company-name a",
  industry: ".company-activity",
  location: ".company-location",
  employees: ".company-employees",
  products: ".company-products",
  contact: ".company-contact",
});

console.log(data);
await spider.close();
