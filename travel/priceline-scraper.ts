/**
 * Priceline Scraper
 *
 * Extract deal-focused hotel and flight pricing, Express Deals, and bundled travel
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx priceline-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.priceline.com/relax/in/3000019787/from/20260601/to/20260605/rooms/1");
await page.content(15000);

const data = await page.evaluate(`(() => {
  const hotels = [];
  document.querySelectorAll("[data-testid='hotel-listing-card']").forEach(el => {
    const name = el.querySelector("[data-testid='hotel-name']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='price-display']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='guest-rating']")?.textContent?.trim();
    const stars = el.querySelector("[data-testid='star-rating']")?.textContent?.trim();
    if (name) hotels.push({ name, price, rating, stars });
  });
  return JSON.stringify({ total: hotels.length, hotels: hotels.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
