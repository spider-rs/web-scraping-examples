/**
 * DHL Scraper
 *
 * Extract international shipment tracking, customs clearance status, delivery noti
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx dhl-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.dhl.com/us-en/home/tracking.html?tracking-id=1234567890");
await page.content(10000);

const data = await page.extractFields({
  status: "[data-test='shipment-status']",
  deliveryDate: "[data-test='delivery-date']",
  origin: "[data-test='origin']",
  destination: "[data-test='destination']",
  service: "[data-test='product']",
  lastEvent: "[data-test='last-event']",
  pieces: "[data-test='pieces']",
});

console.log(data);
await spider.close();
