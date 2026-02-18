/**
 * Zoopla Scraper
 *
 * Extract UK property valuations, rental listings, and market insights from Zoopla
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx zoopla-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.zoopla.co.uk/for-sale/details/london/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll("[data-testid='search-result']").forEach(el => {
    const address = el.querySelector("[data-testid='listing-title']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='listing-price']")?.textContent?.trim();
    const beds = el.querySelector("[data-testid='listing-spec-beds']")?.textContent?.trim();
    const agent = el.querySelector("[data-testid='listing-agent']")?.textContent?.trim();
    if (address) listings.push({ address, price, beds, agent });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
