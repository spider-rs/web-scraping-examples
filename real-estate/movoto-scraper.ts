/**
 * Movoto Scraper
 *
 * Extract property listings, home valuations, market trends, and neighborhood deta
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx movoto-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.movoto.com/san-jose-ca/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll(".property-listing-card").forEach(el => {
    const address = el.querySelector(".listing-address")?.textContent?.trim();
    const price = el.querySelector(".listing-price")?.textContent?.trim();
    const beds = el.querySelector(".bed-count")?.textContent?.trim();
    const baths = el.querySelector(".bath-count")?.textContent?.trim();
    const sqft = el.querySelector(".sqft-count")?.textContent?.trim();
    if (address) listings.push({ address, price, beds, baths, sqft });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
