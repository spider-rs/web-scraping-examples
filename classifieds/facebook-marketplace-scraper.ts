/**
 * Facebook Marketplace Scraper
 *
 * Extract product listings, prices, seller profiles, and location data from Facebo
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx facebook-marketplace-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.facebook.com/marketplace/nyc/search?query=furniture");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='marketplace_feed_item']").forEach(el => {
    const title = el.querySelector("span[dir='auto']")?.textContent?.trim();
    const price = el.querySelector("span[dir='auto']:first-child")?.textContent?.trim();
    const location = el.querySelector("[data-testid='marketplace_feed_item_location']")?.textContent?.trim();
    if (title) items.push({ title, price, location });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
