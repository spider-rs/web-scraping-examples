/**
 * TrueCar Scraper
 *
 * Extract TrueCar market average pricing, dealer quotes, price curves, and certifi
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx truecar-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.truecar.com/used-cars-for-sale/listings/location-los-angeles-ca/");
await page.content();

const data = await page.evaluate(`(() => {
  const vehicles = [];
  document.querySelectorAll('[data-test="vehicleCardContainer"]').forEach(el => {
    const title = el.querySelector('[data-test="vehicleCardTitle"]')?.textContent?.trim();
    const price = el.querySelector('[data-test="vehicleCardPricingBlockPrice"]')?.textContent?.trim();
    const mileage = el.querySelector('[data-test="vehicleCardMileage"]')?.textContent?.trim();
    const marketValue = el.querySelector('[data-test="vehicleCardMarketValue"]')?.textContent?.trim();
    if (title) vehicles.push({ title, price, mileage, marketValue });
  });
  return JSON.stringify({ total: vehicles.length, vehicles: vehicles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
