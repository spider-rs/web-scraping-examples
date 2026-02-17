/**
 * Yellow Pages Scraper
 *
 * Extract business listings, phone numbers, addresses, and customer reviews from Y
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx yellow-pages-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.yellowpages.com/search?search_terms=plumber&geo_location_terms=New+York+NY");
await page.content();

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll(".result").forEach(el => {
    const name = el.querySelector(".business-name span")?.textContent?.trim();
    const phone = el.querySelector(".phones")?.textContent?.trim();
    const address = el.querySelector(".adr")?.textContent?.trim();
    const category = el.querySelector(".categories a")?.textContent?.trim();
    const rating = el.querySelector(".ratings .count")?.textContent?.trim();
    if (name) listings.push({ name, phone, address, category, rating });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
