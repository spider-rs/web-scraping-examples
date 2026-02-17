/**
 * AutoTrader Scraper
 *
 * Scrape AutoTrader vehicle inventory, pricing history, dealer ratings, and detail
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx autotrader-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.autotrader.com/cars-for-sale/all-cars/los-angeles-ca");
await page.content();

const data = await page.evaluate(`(() => {
  const vehicles = [];
  document.querySelectorAll('[data-cmp="inventoryListing"]').forEach(el => {
    const title = el.querySelector('[data-cmp="subheading"]')?.textContent?.trim();
    const price = el.querySelector('[data-cmp="firstPrice"]')?.textContent?.trim();
    const mileage = el.querySelector('.text-subdued-lighter')?.textContent?.trim();
    const dealer = el.querySelector('[data-cmp="ownerName"]')?.textContent?.trim();
    if (title) vehicles.push({ title, price, mileage, dealer });
  });
  return JSON.stringify({ total: vehicles.length, vehicles: vehicles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
