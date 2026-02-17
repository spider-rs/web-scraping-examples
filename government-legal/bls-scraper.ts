/**
 * BLS Scraper
 *
 * Extract employment statistics, wage data, CPI figures, and economic indicators f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bls-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.bls.gov/news.release/empsit.nr0.htm");
await page.content();

const data = await page.extractFields({
  title: "h1",
  date: ".sub-title",
  summary: "#main-content p:first-of-type",
  source: ".source",
});

console.log(data);
await spider.close();
