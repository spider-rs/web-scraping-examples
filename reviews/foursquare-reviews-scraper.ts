/**
 * Foursquare Reviews Scraper
 *
 * Extract venue listings, user tips, check-in data, and curated location guides fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx foursquare-reviews-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://foursquare.com/explore?mode=url&near=New+York&q=coffee");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const venues = [];
  document.querySelectorAll(".venue-card").forEach(el => {
    const name = el.querySelector(".venue-name")?.textContent?.trim();
    const rating = el.querySelector(".venue-rating")?.textContent?.trim();
    const category = el.querySelector(".venue-category")?.textContent?.trim();
    const address = el.querySelector(".venue-address")?.textContent?.trim();
    const price = el.querySelector(".venue-price")?.textContent?.trim();
    if (name) venues.push({ name, rating, category, address, price });
  });
  return JSON.stringify({ total: venues.length, venues: venues.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
