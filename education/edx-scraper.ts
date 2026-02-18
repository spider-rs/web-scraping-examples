/**
 * edX Scraper
 *
 * Extract course catalogs, university partners, certificates, and program details 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx edx-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.edx.org/search?q=python&tab=course");

const data = await page.extractFields({
  title: "h3.pgn__hstack",
  institution: ".partner-logo img[alt]",
  level: ".badge-level",
  duration: ".course-duration",
  price: ".price-text",
  availability: ".availability-text",
});

console.log(data);
await spider.close();
