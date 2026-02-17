/**
 * CarFax Scraper
 *
 * Extract CarFax used car listings, vehicle history indicators, one-owner badges, 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx carfax-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.carfax.com/Used-Toyota-Camry_w302");
await page.content();

const data = await page.evaluate(`(() => {
  const vehicles = [];
  document.querySelectorAll(".srp-list-item").forEach(el => {
    const title = el.querySelector(".srp-list-item-basic-info-model")?.textContent?.trim();
    const price = el.querySelector(".srp-list-item-price")?.textContent?.trim();
    const mileage = el.querySelector(".srp-list-item-basic-info-mileage")?.textContent?.trim();
    const owners = el.querySelector(".srp-list-item-history-owner")?.textContent?.trim();
    const accidents = el.querySelector(".srp-list-item-history-accident")?.textContent?.trim();
    if (title) vehicles.push({ title, price, mileage, owners, accidents });
  });
  return JSON.stringify({ total: vehicles.length, vehicles: vehicles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
