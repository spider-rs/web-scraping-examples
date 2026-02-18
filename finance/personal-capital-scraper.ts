/**
 * Personal Capital Scraper
 *
 * Examine wealth management tools, retirement planner projections, and fee analyze
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx personal-capital-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.personalcapital.com/wealth-management");
await page.content(10000);

const data = await page.extractFields({
  title: "h1.page-title",
  advisoryFee: ".fee-structure .fee-value",
  minInvestment: ".minimum-investment",
  features: ".feature-list li",
  description: ".service-description p:first-of-type",
  cta: ".cta-primary",
});

console.log(data);
await spider.close();
