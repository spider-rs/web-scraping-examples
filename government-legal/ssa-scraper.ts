/**
 * SSA Scraper
 *
 * Extract Social Security benefit info, COLA adjustments, policy data, and program
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ssa-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.ssa.gov/oact/cola/colasummary.html");
await page.content();

const data = await page.extractFields({
  title: "h1",
  content: "#content table",
  source: ".footer-note",
  lastUpdated: ".date-modified",
});

console.log(data);
await spider.close();
