/**
 * Tommy Hilfiger Scraper
 *
 * Scrape preppy fashion listings, seasonal collections, adaptive clothing options,
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx tommy-hilfiger-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://usa.tommy.com/en/men/men-polos");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-tile").forEach(el => {
    const name = el.querySelector(".product-tile__name")?.textContent?.trim();
    const price = el.querySelector(".product-tile__price")?.textContent?.trim();
    const colors = el.querySelectorAll(".color-swatch").length;
    if (name) items.push({ name, price, colorCount: colors });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
