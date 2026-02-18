/**
 * Congress.gov Scraper
 *
 * Extract bill text, voting records, committee reports, and legislative history fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx congress-gov-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.congress.gov/search?q=%7B%22source%22%3A%22legislation%22%7D");
await page.content();

const data = await page.extractFields({
  title: ".expanded .result-title a",
  status: ".expanded .result-item .result-textual",
  sponsor: ".expanded .result-item:nth-child(2)",
  action: ".expanded .result-item:nth-child(3)",
});

console.log(data);
await spider.close();
