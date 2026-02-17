/**
 * 
 *
 * 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx sothebysrealty-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.sothebysrealty.com/eng/sales/new-york-ny-usa");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll(".search-result-item").forEach(el => {
    const address = el.querySelector(".listing-address")?.textContent?.trim();
    const price = el.querySelector(".listing-price")?.textContent?.trim();
    const beds = el.querySelector(".listing-beds")?.textContent?.trim();
    const baths = el.querySelector(".listing-baths")?.textContent?.trim();
    const agent = el.querySelector(".listing-agent")?.textContent?.trim();
    if (address) listings.push({ address, price, beds, baths, agent });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
