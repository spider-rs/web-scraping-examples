/**
 * Columbia Sportswear Scraper
 *
 * Scrape outdoor gear, Omni-Heat technology products, pricing, and seasonal deals 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx columbia-sportswear-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.columbia.com/mens-jackets/");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-tile").forEach(el => {
    const name = el.querySelector(".product-tile__name a")?.textContent?.trim();
    const price = el.querySelector(".product-tile__price .value")?.textContent?.trim();
    const salePrice = el.querySelector(".product-tile__price .sales .value")?.textContent?.trim();
    const colors = el.querySelectorAll(".color-swatch").length;
    if (name) items.push({ name, price, salePrice, colorCount: colors });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
