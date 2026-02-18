/**
 * Mint Mobile Scraper
 *
 * Extract prepaid wireless plan pricing, multi-month discount tiers, data allowanc
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mint-mobile-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.mintmobile.com/plans/");
await page.content(10000);

const data = await page.extractFields({
  name: "[data-testid='plan-name']",
  price: "[data-testid='plan-price']",
  data: "[data-testid='plan-data']",
  duration: "[data-testid='plan-duration']",
  features: "[data-testid='plan-features']",
  image: { selector: "[data-testid='plan-icon'] img", attribute: "src" },
});

console.log(data);
await spider.close();
