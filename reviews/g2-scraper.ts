/**
 * G2 Reviews Scraper
 *
 * Scrapes web scraping tool reviews from G2 marketplace.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx reviews/g2-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.g2.com/categories/web-scraping");
await page.content();
const data = await page.evaluate(`(() => {
  const products = Array.from(document.querySelectorAll('[data-test="product-card"]')).map(el => ({
    name: el.querySelector('[data-test="product-name"]')?.textContent?.trim(),
    rating: el.querySelector('[data-test="rating"]')?.textContent?.trim(),
    reviews: el.querySelector('[data-test="review-count"]')?.textContent?.trim(),
    price: el.querySelector('[data-test="price"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ products });
})()`);
console.log(JSON.parse(data));
await spider.close();
