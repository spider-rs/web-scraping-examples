/**
 * BBB Scraper
 *
 * Extract business accreditation ratings, complaint histories, customer reviews, a
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bbb-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.bbb.org/search?find_country=US&find_text=roofing&find_loc=Denver%2C+CO");
await page.content();

const data = await page.extractFields({
  name: ".bds-h4 a",
  rating: ".dtm-rating",
  accredited: ".dtm-accredited",
  complaints: ".dtm-complaints",
  address: ".dtm-address",
  phone: ".dtm-phone",
});

console.log(data);
await spider.close();
