/**
 * 
 *
 * 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx macys-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.macys.com/shop/womens-clothing/womens-dresses");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".productThumbnail").forEach(el => {
    const brand = el.querySelector(".productBrand")?.textContent?.trim();
    const name = el.querySelector(".productDescription a")?.textContent?.trim();
    const price = el.querySelector(".regular")?.textContent?.trim();
    const sale = el.querySelector(".discount")?.textContent?.trim();
    if (name) items.push({ brand, name, price, sale });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
