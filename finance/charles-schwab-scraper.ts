/**
 * Charles Schwab Scraper
 *
 * Collect stock research reports, ETF screener results, and brokerage account insi
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx charles-schwab-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.schwab.com/research/stocks/quotes/summary/AAPL");
await page.content(10000);

const data = await page.extractFields({
  companyName: ".company-name",
  price: ".stock-price-value",
  change: ".price-change-value",
  schwabRating: ".schwab-rating-value",
  analystTarget: ".analyst-target-price",
  peRatio: ".pe-ratio-value",
});

console.log(data);
await spider.close();
