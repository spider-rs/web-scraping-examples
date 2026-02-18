/**
 * Superpages Scraper
 *
 * Extract local business listings, service provider profiles, contact information,
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx superpages-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.superpages.com/search?search_terms=electrician&geo_location_terms=Miami+FL");
await page.content();

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll(".search-result, .organic-listing").forEach(el => {
    const name = el.querySelector(".business-name a, h2 a")?.textContent?.trim();
    const phone = el.querySelector(".phone-number, .phones")?.textContent?.trim();
    const address = el.querySelector(".street-address, .adr")?.textContent?.trim();
    const rating = el.querySelector(".rating-count, .stars")?.textContent?.trim();
    if (name) listings.push({ name, phone, address, rating });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
