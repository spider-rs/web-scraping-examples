/**
 * Google Maps Scraper
 *
 * Extracts restaurant places from Google Maps search results
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx search/google-maps-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.google.com/maps/search/restaurants+near+times+square");
await page.waitForSelector("[role='feed']", { timeout: 10000 });

const places = await page.evaluate(() => {
  const items = document.querySelectorAll("[role='feed'] > div");
  return Array.from(items).map((item) => ({
    name: item.querySelector("h3")?.textContent || "",
    rating: item.querySelector("[aria-label*='stars']")?.textContent || "",
  }));
});

console.log("Places found:", places.length);
places.slice(0, 5).forEach((p) => console.log(`- ${p.name} ${p.rating}`));
await spider.close();
