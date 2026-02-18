/**
 * Regulations.gov Scraper
 *
 * Extract proposed regulations, public comments, docket summaries, and agency rule
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx regulations-gov-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.regulations.gov/search?documentTypes=Rule&sortBy=postedDate&sortDirection=desc");
await page.content(10000);

const data = await page.extractFields({
  title: ".document-card .title a",
  agency: ".document-card .agency",
  date: ".document-card .posted-date",
  type: ".document-card .document-type",
});

console.log(data);
await spider.close();
