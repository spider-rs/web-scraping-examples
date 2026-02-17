/**
 * Century 21 Scraper
 *
 * Extract property listings, agent directories, and open house schedules from Cent
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx century21-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.century21.com/real-estate/miami-fl/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll(".property-card").forEach(el => {
    const address = el.querySelector(".property-address")?.textContent?.trim();
    const price = el.querySelector(".property-price")?.textContent?.trim();
    const beds = el.querySelector(".property-beds")?.textContent?.trim();
    const baths = el.querySelector(".property-baths")?.textContent?.trim();
    const agent = el.querySelector(".agent-name")?.textContent?.trim();
    if (address) listings.push({ address, price, beds, baths, agent });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
