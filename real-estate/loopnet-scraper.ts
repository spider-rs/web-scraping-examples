/**
 * LoopNet Commercial Real Estate Scraper
 *
 * Extract commercial property listings from LoopNet — address, price, and property type.
 * Scrapes Los Angeles, CA for-sale commercial listings with dynamic stealth browsing.
 *
 * Uses `evaluate()` to extract data from listing elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx loopnet-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.loopnet.com/search/commercial-real-estate/los-angeles-ca/for-sale/");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll(".property-card-link").forEach(el => {
    const address = el.querySelector(".property-title")?.textContent?.trim();
    const price = el.querySelector(".property-price")?.textContent?.trim();
    const type = el.querySelector(".property-type")?.textContent?.trim();
    if (address) listings.push({ address, price, type });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
