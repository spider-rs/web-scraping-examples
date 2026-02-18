/**
 * J.Crew Scraper
 *
 * Extract classic fashion listings, fabric details, pricing, and promotional offer
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx jcrew-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.jcrew.com/c/mens/clothing/shirts");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-tile").forEach(el => {
    const name = el.querySelector(".product-tile__name")?.textContent?.trim();
    const price = el.querySelector(".product-tile__price .product-pricing__price")?.textContent?.trim();
    const colors = el.querySelector(".product-tile__swatch-count")?.textContent?.trim();
    if (name) items.push({ name, price, colors });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
