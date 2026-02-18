/**
 * UPS Scraper
 *
 * Extract package tracking statuses, delivery estimates, service rate comparisons,
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ups-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.ups.com/track?tracknum=1Z999AA10123456784");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const tracking = {};
  tracking.status = document.querySelector(".ups-st_status, [data-test='statusMain']")?.textContent?.trim();
  tracking.delivery = document.querySelector(".ups-est_delivery, [data-test='deliveryDate']")?.textContent?.trim();
  tracking.origin = document.querySelector(".ups-origin, [data-test='origin']")?.textContent?.trim();
  tracking.destination = document.querySelector(".ups-dest, [data-test='destination']")?.textContent?.trim();
  tracking.service = document.querySelector(".ups-service_type, [data-test='serviceType']")?.textContent?.trim();
  tracking.weight = document.querySelector(".ups-weight, [data-test='weight']")?.textContent?.trim();
  return JSON.stringify(tracking);
})()`);

console.log(JSON.parse(data));
await spider.close();
