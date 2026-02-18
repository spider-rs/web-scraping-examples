/**
 * Verizon Scraper
 *
 * Extract wireless plan tiers, device inventory, trade-in valuations, and 5G cover
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx verizon-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.verizon.com/plans/");
await page.content(12000);

const data = await page.extractFields({
  name: "[data-testid='plan-title']",
  price: "[data-testid='plan-price']",
  data: "[data-testid='plan-data-allowance']",
  network: "[data-testid='plan-network-tier']",
  perks: "[data-testid='plan-perks']",
  image: { selector: "[data-testid='plan-icon'] img", attribute: "src" },
});

console.log(data);
await spider.close();
