/**
 * Petco Pets Scraper
 *
 * Extract pet product listings, Vital Care membership pricing, veterinary service 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx petco-pets-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.petco.com/shop/en/petcostore/category/cat/cat-food");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const products = [];
  document.querySelectorAll("[data-testid='product-tile'], .product-card").forEach(el => {
    const name = el.querySelector("[data-testid='product-name'], .product-name")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-price'], .product-price")?.textContent?.trim();
    const repeatDelivery = el.querySelector("[data-testid='repeat-delivery'], .rd-price")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='star-rating'], .star-rating")?.textContent?.trim();
    if (name) products.push({ name, price, repeatDelivery, rating });
  });
  return JSON.stringify({ total: products.length, products: products.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
