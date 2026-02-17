/**
 * Opendoor Scraper
 *
 * Extract instant home offers, property details, and pricing estimates from Opendo
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx opendoor-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.opendoor.com/homes/phoenix-az");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll("[data-testid='home-card']").forEach(el => {
    const address = el.querySelector("[data-testid='home-card-address']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='home-card-price']")?.textContent?.trim();
    const beds = el.querySelector("[data-testid='home-card-beds']")?.textContent?.trim();
    const baths = el.querySelector("[data-testid='home-card-baths']")?.textContent?.trim();
    if (address) listings.push({ address, price, beds, baths });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
