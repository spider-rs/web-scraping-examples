/**
 * 
 *
 * 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx victorias-secret-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.victoriassecret.com/us/vs/bras");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-tile").forEach(el => {
    const name = el.querySelector(".product-tile__name")?.textContent?.trim();
    const price = el.querySelector(".product-tile__price")?.textContent?.trim();
    const promo = el.querySelector(".product-tile__promo")?.textContent?.trim();
    const colors = el.querySelectorAll(".swatch-circle").length;
    if (name) items.push({ name, price, promo, colorCount: colors });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
