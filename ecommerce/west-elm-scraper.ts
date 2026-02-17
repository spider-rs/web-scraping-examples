/**
 * West Elm Scraper
 *
 * Extract modern home decor listings, pricing, material details, and customization
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx west-elm-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.westelm.com/shop/furniture/coffee-tables/");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-thumb").forEach(el => {
    const name = el.querySelector(".product-name a")?.textContent?.trim();
    const price = el.querySelector(".price-amount")?.textContent?.trim();
    const link = el.querySelector(".product-name a")?.href;
    if (name) items.push({ name, price, link });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
