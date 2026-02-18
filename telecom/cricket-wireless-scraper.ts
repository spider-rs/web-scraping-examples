/**
 * Cricket Wireless Scraper
 *
 * Extract prepaid wireless plans, group save discounts, device deals, and AT&T net
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cricket-wireless-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.cricketwireless.com/cell-phone-plans");
await page.content(10000);

const data = await page.extractFields({
  name: ".plan-card__title",
  price: ".plan-card__price",
  data: ".plan-card__data",
  groupSave: ".plan-card__group-save",
  features: ".plan-card__features",
  image: { selector: ".plan-card__icon img", attribute: "src" },
});

console.log(data);
await spider.close();
