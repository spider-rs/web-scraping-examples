/**
 * CarGurus Scraper
 *
 * Extract CarGurus deal ratings, price analysis, vehicle listings, and dealer revi
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cargurus-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.cargurus.com/Cars/inventorylisting/vAll_iO.jsp?zip=90001");
await page.content();

const data = await page.evaluate(`(() => {
  const vehicles = [];
  document.querySelectorAll('[data-testid="srp-listing-card"]').forEach(el => {
    const title = el.querySelector("h4")?.textContent?.trim();
    const price = el.querySelector('[data-testid="srp-tile-price"]')?.textContent?.trim();
    const deal = el.querySelector('[data-testid="srp-deal-badge"]')?.textContent?.trim();
    const mileage = el.querySelector('[data-testid="srp-tile-mileage"]')?.textContent?.trim();
    if (title) vehicles.push({ title, price, deal, mileage });
  });
  return JSON.stringify({ total: vehicles.length, vehicles: vehicles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
