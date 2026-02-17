/**
 * Cox Scraper
 *
 * Extract internet speed packages, Panoramic WiFi pricing, TV bundle details, and 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cox-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.cox.com/residential/internet.html");
await page.content(10000);

const data = await page.extractFields({
  name: ".plan-card__name",
  price: ".plan-card__price",
  speed: ".plan-card__speed",
  dataCap: ".plan-card__data-cap",
  features: ".plan-card__features-list",
  image: { selector: ".plan-card__icon img", attribute: "src" },
});

console.log(data);
await spider.close();
