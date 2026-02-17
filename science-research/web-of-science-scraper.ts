/**
 * Web of Science Scraper
 *
 * Extract citation indexes, journal impact factors, h-index data, and research ana
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx web-of-science-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.webofscience.com/wos/woscc/basic-search");
await page.content(10000);

const data = await page.extractFields({
  title: "[data-ta='summary-record-title'] a",
  authors: "[data-ta='summary-record-author']",
  source: "[data-ta='summary-record-source']",
  year: "[data-ta='summary-record-pub-date']",
  citations: "[data-ta='summary-record-times-cited']",
  doi: "[data-ta='summary-record-doi']",
});

console.log(data);
await spider.close();
