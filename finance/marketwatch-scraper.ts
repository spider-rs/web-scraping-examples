/**
 * MarketWatch Scraper
 *
 * Gather stock market headlines, portfolio tracking data, and economic indicators 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx marketwatch-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.marketwatch.com/investing/stock/aapl");
await page.content();

const data = await page.extractFields({
  companyName: ".company__name",
  price: ".intraday__price bg-quote",
  change: ".intraday__change .change--point--q",
  changePercent: ".intraday__change .change--percent--q",
  volume: ".kv__item:nth-child(1) .kv__primary",
  avgVolume: ".kv__item:nth-child(2) .kv__primary",
});

console.log(data);
await spider.close();
