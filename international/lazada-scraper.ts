/**
 * Lazada Scraper
 *
 * Extract product listings, flash deals, seller ratings, and regional pricing from
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx lazada-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.lazada.com.ph/catalog/?q=headphones");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-qa-locator='product-item']").forEach(el => {
    const name = el.querySelector(".RfADt a")?.textContent?.trim();
    const price = el.querySelector(".ooOxS")?.textContent?.trim();
    const rating = el.querySelector(".qzqFw")?.textContent?.trim();
    if (name) items.push({ name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
