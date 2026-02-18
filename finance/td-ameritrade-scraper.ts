/**
 * TD Ameritrade Scraper
 *
 * Extract thinkorswim platform data, research reports, stock screening tools, and 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx td-ameritrade-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.tdameritrade.com/investment-products/stocks.html");
await page.content(10000);

const data = await page.extractFields({
  title: "h1",
  subtitle: ".hero-subtitle",
  features: ".feature-item h3",
  description: ".content-section p:first-of-type",
  commissions: ".pricing-table td",
  cta: ".cta-primary",
});

console.log(data);
await spider.close();
