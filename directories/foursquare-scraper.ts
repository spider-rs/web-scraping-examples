/**
 * Foursquare Scraper
 *
 * Extract venue listings, user tips, ratings, check-in counts, and location catego
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx foursquare-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://foursquare.com/explore?near=San+Francisco&q=coffee");
await page.content();

const data = await page.evaluate(`(() => {
  const venues = [];
  document.querySelectorAll(".venue, .venueCard").forEach(el => {
    const name = el.querySelector(".venueName h2, .venueTitle")?.textContent?.trim();
    const category = el.querySelector(".categoryName, .venueCategory")?.textContent?.trim();
    const rating = el.querySelector(".venueScore, .rating")?.textContent?.trim();
    const address = el.querySelector(".venueAddress, .address")?.textContent?.trim();
    if (name) venues.push({ name, category, rating, address });
  });
  return JSON.stringify({ total: venues.length, venues: venues.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
