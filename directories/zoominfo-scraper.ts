/**
 * ZoomInfo Scraper
 *
 * Extract B2B contact profiles, company technographics, org charts, and intent dat
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx zoominfo-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.zoominfo.com/companies-search/location-usa--industry-technology");
await page.content(10000);

const data = await page.extractFields({
  name: ".company-name a",
  industry: ".company-industry",
  revenue: ".company-revenue",
  employees: ".company-employees",
  location: ".company-location",
  website: ".company-website a",
  description: ".company-description",
});

console.log(data);
await spider.close();
