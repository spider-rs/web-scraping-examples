/**
 * PetSmart Scraper
 *
 * Extract pet product listings, pricing, brand details, and store availability fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx petsmart-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.petsmart.com/dog/toys/all-dog-toys/");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-tile").forEach(el => {
    const brand = el.querySelector(".product-tile__brand")?.textContent?.trim();
    const name = el.querySelector(".product-tile__name a")?.textContent?.trim();
    const price = el.querySelector(".product-tile__price .price-sales")?.textContent?.trim();
    const rating = el.querySelector(".product-tile__rating")?.getAttribute("aria-label");
    if (name) items.push({ brand, name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
