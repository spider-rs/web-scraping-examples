/**
 * Google Finance Scraper
 *
 * Scrapes stock details from Google Finance using extractFields API.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx finance/google-finance-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.google.com/finance/quote/AAPL:NASDAQ");
await page.content();
const data = await page.extractFields({
  fields: [
    { name: "price", selector: '[data-test="price"]' },
    { name: "change", selector: '[data-test="change"]' },
    { name: "marketCap", selector: '[data-test="market-cap"]' },
    { name: "peRatio", selector: '[data-test="pe-ratio"]' },
    { name: "dividend", selector: '[data-test="dividend"]' },
  ],
});
console.log(data);
await spider.close();
