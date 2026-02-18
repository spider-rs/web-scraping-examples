/**
 * Williams Sonoma Scraper
 *
 * Extract premium kitchenware listings, pricing, product specs, and chef recommend
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx williams-sonoma-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.williams-sonoma.com/shop/cookware/pots-and-pans/");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-thumb").forEach(el => {
    const name = el.querySelector(".product-name a")?.textContent?.trim();
    const price = el.querySelector(".price-state")?.textContent?.trim();
    const brand = el.querySelector(".product-brand")?.textContent?.trim();
    if (name) items.push({ name, price, brand });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
