/**
 * Eurogamer Scraper
 *
 * Extract gaming reviews, news, Digital Foundry analysis, and editorial features f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx eurogamer-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.eurogamer.net/reviews");

const data = await page.extractFields({
  title: "h1, .title a",
  author: ".author a, .byline a",
  date: "time",
  recommendation: ".review-badge, .verdict",
  summary: ".strapline, .standfirst",
  category: ".label, .topic a",
});

console.log(data);
await spider.close();
