/**
 * Michael Kors Scraper
 *
 * Scrape luxury handbag listings, watch collections, seasonal outlet deals, and pr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx michael-kors-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.michaelkors.com/women/handbags/");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-tile").forEach(el => {
    const name = el.querySelector(".product-tile__name")?.textContent?.trim();
    const price = el.querySelector(".product-tile__price")?.textContent?.trim();
    const salePrice = el.querySelector(".product-tile__sale-price")?.textContent?.trim();
    const colors = el.querySelectorAll(".color-swatch-list__item").length;
    if (name) items.push({ name, price, salePrice, colorCount: colors });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
