/**
 * Travelocity Scraper
 *
 * Extract bundled travel packages, hotel deals, and flight-hotel combo pricing fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx travelocity-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.travelocity.com/Hotel-Search?destination=Orlando%2C+Florida");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const hotels = [];
  document.querySelectorAll("[data-testid='property-listing']").forEach(el => {
    const name = el.querySelector("h3")?.textContent?.trim();
    const price = el.querySelector("[data-testid='price-summary']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='reviews-summary']")?.textContent?.trim();
    const stars = el.querySelector("[data-testid='star-rating']")?.textContent?.trim();
    if (name) hotels.push({ name, price, rating, stars });
  });
  return JSON.stringify({ total: hotels.length, hotels: hotels.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
