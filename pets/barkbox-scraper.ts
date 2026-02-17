/**
 * BarkBox Scraper
 *
 * Extract monthly subscription box themes, toy and treat descriptions, plan pricin
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx barkbox-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.barkbox.com/subscribe");
await page.content(10000);

const data = await page.extractFields({
  plan: "[data-testid='plan-name'], .plan-title",
  price: "[data-testid='plan-price'], .plan-price",
  items: "[data-testid='items-included'], .items-count",
  theme: "[data-testid='box-theme'], .theme-name",
  features: "[data-testid='plan-features'], .feature-list",
  image: { selector: "[data-testid='box-image'] img, .box-hero img", attribute: "src" },
});

console.log(data);
await spider.close();
