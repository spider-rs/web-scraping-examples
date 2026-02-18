/**
 * Seeking Alpha Scraper
 *
 * Harvest investment analysis articles, earnings call transcripts, and quant ratin
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx seeking-alpha-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://seekingalpha.com/symbol/AAPL/ratings/quant-ratings");
await page.content(10000);

const data = await page.extractFields({
  ticker: "[data-test-id='symbol-title']",
  quantRating: "[data-test-id='quant-rating'] span",
  saRating: "[data-test-id='sa-author-rating'] span",
  wallStRating: "[data-test-id='wall-st-rating'] span",
  priceTarget: "[data-test-id='price-target']",
  dividendGrade: "[data-test-id='dividend-grade']",
});

console.log(data);
await spider.close();
