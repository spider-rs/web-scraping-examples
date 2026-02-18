/**
 * RepairPal Scraper
 *
 * Extract RepairPal repair cost estimates, certified mechanic listings, common pro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx repairpal-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://repairpal.com/estimator/toyota/camry/brake-pad-replacement-cost");

const data = await page.extractFields({
  repair: "h1.estimate-title",
  lowEstimate: ".cost-estimate-low",
  highEstimate: ".cost-estimate-high",
  laborCost: ".labor-cost-value",
  partsCost: ".parts-cost-value",
  description: ".repair-description",
});

console.log(data);
await spider.close();
