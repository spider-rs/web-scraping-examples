/**
 * FedEx Scraper
 *
 * Extract shipment tracking details, transit timelines, rate quotes, and service c
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx fedex-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.fedex.com/fedextrack/?trknbr=123456789012");
await page.content(10000);

const data = await page.extractFields({
  status: "[data-test-id='shipment-status']",
  deliveryDate: "[data-test-id='delivery-date']",
  shipDate: "[data-test-id='ship-date']",
  service: "[data-test-id='service-type']",
  origin: "[data-test-id='origin']",
  destination: "[data-test-id='destination']",
  signedBy: "[data-test-id='signed-by']",
});

console.log(data);
await spider.close();
