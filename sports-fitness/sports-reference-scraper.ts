/**
 * Sports Reference Scraper
 *
 * Extract comprehensive sports statistics, historical data, and player records fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx sports-reference-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.sports-reference.com/");

const data = await page.extractFields({
  siteTitle: "h1",
  sportLinks: "#content a",
  description: "#meta p",
  navigation: "#header nav a",
  trending: ".trending a",
  recentUpdates: ".updates li",
});

console.log(data);
await spider.close();
