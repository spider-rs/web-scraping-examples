/**
 * Simply Wall St Scraper
 *
 * Visualize stock valuation snowflake charts, dividend analysis, and financial hea
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx simply-wall-st-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://simplywall.st/stocks/us/tech/nasdaq-aapl/apple");
await page.content(10000);

const data = await page.extractFields({
  companyName: "h1[data-cy='company-name']",
  price: "[data-cy='share-price']",
  fairValue: "[data-cy='intrinsic-value']",
  valuation: "[data-cy='snowflake-value']",
  futureGrowth: "[data-cy='snowflake-future']",
  health: "[data-cy='snowflake-health']",
});

console.log(data);
await spider.close();
