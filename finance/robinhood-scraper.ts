/**
 * Robinhood Scraper
 *
 * Retrieve stock quotes, options chains, earnings calendars, and commission-free t
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx robinhood-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://robinhood.com/stocks/AAPL");
await page.content(10000);

const data = await page.extractFields({
  name: "header h1",
  price: "[data-testid='PriceHeader'] span",
  change: "[data-testid='PriceChangeText']",
  marketCap: "[data-testid='MarketCap'] span",
  peRatio: "[data-testid='PERatio'] span",
  dividendYield: "[data-testid='DividendYield'] span",
});

console.log(data);
await spider.close();
