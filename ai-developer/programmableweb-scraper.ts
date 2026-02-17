/**
 * ProgrammableWeb Scraper
 *
 * Extract API directory listings, SDK references, mashup examples, and developer n
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx programmableweb-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.programmableweb.com/apis/directory");

const data = await page.extractFields({
  name: ".views-row .views-field-title a",
  category: ".views-row .views-field-field-api-category",
  protocol: ".views-row .views-field-field-api-protocol",
  description: ".views-row .views-field-search-api-excerpt",
  provider: ".views-row .views-field-field-api-provider",
  added: ".views-row .views-field-created",
});

console.log(data);
await spider.close();
