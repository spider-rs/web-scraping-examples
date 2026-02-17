/**
 * Lowes Scraper
 *
 * Extract power tools and home improvement product data from Lowes —
 * title, price, rating, availability, and product images.
 *
 * Uses `evaluate()` with splp-prd selectors.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ecommerce/lowes-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.lowes.com/search?searchTerm=power+tools");

const data = await page.evaluate(() => {
  const items = document.querySelectorAll(".splp-prd");
  return Array.from(items).map((item) => ({
    title: item.querySelector(".splp-prd-name")?.textContent?.trim(),
    price: item.querySelector(".splp-prd-price")?.textContent?.trim(),
    rating: item.querySelector(".splp-prd-rating")?.textContent?.trim(),
    availability: item.querySelector(".splp-prd-availability")?.textContent?.trim(),
    image: item.querySelector("img")?.getAttribute("src"),
  }));
});

console.log(data);
await spider.close();
