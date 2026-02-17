/**
 * Bath & Body Works Scraper
 *
 * Extract fragrance and body care listings, scent details, pricing, and promotions
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bath-and-body-works-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.bathandbodyworks.com/c/body-care/body-lotions-and-creams");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-tile").forEach(el => {
    const name = el.querySelector(".product-tile__name")?.textContent?.trim();
    const price = el.querySelector(".product-tile__price .price-sales")?.textContent?.trim();
    const scent = el.querySelector(".product-tile__fragrance")?.textContent?.trim();
    const promo = el.querySelector(".product-tile__promo")?.textContent?.trim();
    if (name) items.push({ name, price, scent, promo });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
