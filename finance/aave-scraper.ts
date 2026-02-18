/**
 * Aave Scraper
 *
 * Extract lending and borrowing market rates, liquidity pool data, governance prop
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx aave-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://app.aave.com/");
await page.content(12000);

const data = await page.extractFields({
  totalMarketSize: "[data-cy='total-market-size'], .market-size",
  totalBorrowed: "[data-cy='total-borrowed'], .total-borrowed",
  assets: "table tbody tr td:nth-child(1)",
  supplyApys: "table tbody tr td:nth-child(2)",
  borrowAprs: "table tbody tr td:nth-child(3)",
  totalSupplied: "table tbody tr td:nth-child(4)",
});

console.log(data);
await spider.close();
