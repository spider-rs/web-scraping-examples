/**
 * Airbnb Listings Scraper
 *
 * Extract vacation rental listings from Airbnb — title, price, and
 * rating. Handles dynamic React content with full browser rendering.
 *
 * Uses `evaluate()` to iterate over multiple listing card elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx airbnb-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.airbnb.com/tokyo-japan/stays");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll("[itemprop='itemListElement']").forEach(el => {
    const title = el.querySelector("[data-testid='listing-card-title']")?.textContent?.trim();
    const price = el.querySelector("._tyxjp1")?.textContent?.trim();
    const rating = el.querySelector("[aria-label*='rating']")?.textContent?.trim();
    if (title) listings.push({ title, price, rating });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
