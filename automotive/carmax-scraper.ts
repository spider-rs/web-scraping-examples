/**
 * CarMax Scraper
 *
 * Extract CarMax no-haggle pricing, vehicle details, store availability, and trans
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx carmax-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.carmax.com/cars/toyota/camry");
await page.content();

const data = await page.evaluate(`(() => {
  const vehicles = [];
  document.querySelectorAll('[data-testid="result-card"]').forEach(el => {
    const title = el.querySelector('[data-testid="result-card-title"]')?.textContent?.trim();
    const price = el.querySelector('[data-testid="result-card-price"]')?.textContent?.trim();
    const mileage = el.querySelector('[data-testid="result-card-mileage"]')?.textContent?.trim();
    const store = el.querySelector('[data-testid="result-card-store"]')?.textContent?.trim();
    if (title) vehicles.push({ title, price, mileage, store });
  });
  return JSON.stringify({ total: vehicles.length, vehicles: vehicles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
