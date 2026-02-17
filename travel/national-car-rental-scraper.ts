/**
 * National Car Rental Scraper
 *
 * Extract National Car Rental vehicle inventory, Emerald Club options, and premium
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx national-car-rental-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.nationalcar.com/en/car-rental/locations/us/san-francisco-airport-sfo.html");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const vehicles = [];
  document.querySelectorAll(".vehicle-card").forEach(el => {
    const type = el.querySelector(".vehicle-card-name")?.textContent?.trim();
    const rate = el.querySelector(".vehicle-card-rate")?.textContent?.trim();
    const emerald = el.querySelector(".emerald-badge") ? true : false;
    const seats = el.querySelector(".passenger-count")?.textContent?.trim();
    if (type) vehicles.push({ type, rate, emerald, seats });
  });
  return JSON.stringify({ total: vehicles.length, vehicles: vehicles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
