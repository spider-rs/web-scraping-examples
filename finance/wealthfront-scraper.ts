/**
 * Wealthfront Scraper
 *
 * Review robo-advisor portfolio strategies, cash account yields, and tax-loss harv
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx wealthfront-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.wealthfront.com/cash");
await page.content(10000);

const data = await page.extractFields({
  title: "h1",
  apy: "[data-testid='apy-value']",
  fdicCoverage: "[data-testid='fdic-amount']",
  features: ".feature-card h3",
  minDeposit: ".min-deposit-value",
  description: ".product-description",
});

console.log(data);
await spider.close();
