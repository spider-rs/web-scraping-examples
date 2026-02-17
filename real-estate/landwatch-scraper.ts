/**
 * LandWatch Scraper
 *
 * Extract rural land listings, acreage details, and property features from LandWat
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx landwatch-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.landwatch.com/texas-land-for-sale");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll(".result-card").forEach(el => {
    const title = el.querySelector(".result-title")?.textContent?.trim();
    const price = el.querySelector(".result-price")?.textContent?.trim();
    const acreage = el.querySelector(".result-acreage")?.textContent?.trim();
    const county = el.querySelector(".result-county")?.textContent?.trim();
    const broker = el.querySelector(".result-broker")?.textContent?.trim();
    if (title) listings.push({ title, price, acreage, county, broker });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
