/**
 * Ally Financial Scraper
 *
 * Extract savings account rates, auto loan terms, investment product details, and 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ally-financial-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.ally.com/bank/online-savings-account/");
await page.content(10000);

const data = await page.extractFields({
  title: "h1",
  apy: "[data-testid='apy-value'], .apy-rate",
  minDeposit: ".min-deposit",
  features: ".feature-list li",
  description: ".product-description p:first-of-type",
  cta: ".cta-button",
});

console.log(data);
await spider.close();
