/**
 * SoFi Scraper
 *
 * Catalog student loan refinancing rates, investment account offerings, and bankin
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx sofi-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.sofi.com/invest/");
await page.content(10000);

const data = await page.extractFields({
  productTitle: "h1.hero-title",
  subtitle: ".hero-subtitle",
  features: ".feature-list li",
  apy: ".apy-value",
  minInvestment: ".min-investment",
  cta: ".cta-button",
});

console.log(data);
await spider.close();
