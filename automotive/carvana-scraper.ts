/**
 * Carvana Scraper
 *
 * Scrape Carvana certified vehicle listings, 360-degree photo URLs, delivery estim
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx carvana-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.carvana.com/cars");
await page.content();

const data = await page.evaluate(`(() => {
  const vehicles = [];
  document.querySelectorAll('[data-qa="result-tile"]').forEach(el => {
    const title = el.querySelector('[data-qa="make-model"]')?.textContent?.trim();
    const price = el.querySelector('[data-qa="price"]')?.textContent?.trim();
    const mileage = el.querySelector('[data-qa="mileage"]')?.textContent?.trim();
    const monthly = el.querySelector('[data-qa="monthly-payment"]')?.textContent?.trim();
    if (title) vehicles.push({ title, price, mileage, monthly });
  });
  return JSON.stringify({ total: vehicles.length, vehicles: vehicles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
