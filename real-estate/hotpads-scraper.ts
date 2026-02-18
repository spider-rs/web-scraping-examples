/**
 * HotPads Scraper
 *
 * Extract rental listings, map-based search results, and neighborhood ratings from
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hotpads-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://hotpads.com/seattle-wa/apartments-for-rent");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll("[data-testid='listing-card']").forEach(el => {
    const address = el.querySelector("[data-testid='card-address']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='card-price']")?.textContent?.trim();
    const beds = el.querySelector("[data-testid='card-beds']")?.textContent?.trim();
    const baths = el.querySelector("[data-testid='card-baths']")?.textContent?.trim();
    if (address) listings.push({ address, price, beds, baths });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
