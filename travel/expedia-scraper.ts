/**
 * Expedia Hotel Scraper
 *
 * Extract hotel listings from Expedia — name, price, and guest rating.
 * Handles dynamic pricing and complex search result rendering.
 *
 * Uses `evaluate()` to iterate over multiple property listing elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx expedia-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto(
  "https://www.expedia.com/New-York-Hotels.d178293.Travel-Guide-Hotels",
);
await page.content(15000);

const data = await page.evaluate(`(() => {
  const hotels = [];
  document.querySelectorAll('[data-testid="property-listing"]').forEach(el => {
    const name = el.querySelector("h3")?.textContent?.trim();
    const price = el.querySelector('[data-testid="price-summary"] span')?.textContent;
    const rating = el.querySelector('[data-testid="reviews-summary"]')?.textContent;
    if (name) hotels.push({ name, price, rating });
  });
  return JSON.stringify({ total: hotels.length, hotels: hotels.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
