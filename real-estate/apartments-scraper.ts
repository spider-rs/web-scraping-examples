/**
 * Apartments.com Scraper
 *
 * Extract apartment listings from Apartments.com — address, rent, and unit details.
 * Scrapes Chicago, IL listings with dynamic stealth browsing.
 *
 * Uses `evaluate()` to extract data from apartment placard elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx apartments-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.apartments.com/chicago-il/");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll("article.placard").forEach(el => {
    const address = el.querySelector(".property-address")?.textContent?.trim();
    const rent = el.querySelector(".price")?.textContent?.trim();
    const beds = el.querySelector(".bed-info")?.textContent?.trim();
    if (address) listings.push({ address, rent, beds });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
