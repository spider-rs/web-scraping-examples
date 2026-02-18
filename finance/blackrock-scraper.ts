/**
 * BlackRock Scraper
 *
 * Extract iShares ETF data, institutional fund performance, market outlook reports
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx blackrock-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.blackrock.com/us/individual/products/etf-investments");
await page.content(10000);

const data = await page.extractFields({
  pageTitle: "h1",
  fundCount: ".results-count",
  categories: ".filter-category label",
  description: ".product-overview p:first-of-type",
  topFunds: ".fund-table tr td:first-child a",
  disclaimer: ".legal-disclaimer",
});

console.log(data);
await spider.close();
