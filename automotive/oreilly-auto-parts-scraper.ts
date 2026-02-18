/**
 * 
 *
 * 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx oreilly-auto-parts-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.oreillyauto.com/shop/b/oil-filters/oil--chemicals---fluids/oil-filters/e18c9f64072f");
await page.content();

const data = await page.evaluate(`(() => {
  const products = [];
  document.querySelectorAll(".product-card").forEach(el => {
    const name = el.querySelector(".product-card__title a")?.textContent?.trim();
    const price = el.querySelector(".product-card__price")?.textContent?.trim();
    const partNum = el.querySelector(".product-card__part-number")?.textContent?.trim();
    const brand = el.querySelector(".product-card__brand")?.textContent?.trim();
    const availability = el.querySelector(".product-card__availability")?.textContent?.trim();
    if (name) products.push({ name, price, partNum, brand, availability });
  });
  return JSON.stringify({ total: products.length, products: products.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
