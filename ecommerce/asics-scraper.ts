/**
 * ASICS Scraper
 *
 * Scrape running shoe listings, GEL technology specs, pronation guidance, and pric
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx asics-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.asics.com/us/en-us/mens-running-shoes/c/mens-running-shoes/");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-card").forEach(el => {
    const name = el.querySelector(".product-card__name")?.textContent?.trim();
    const price = el.querySelector(".product-card__price")?.textContent?.trim();
    const tech = el.querySelector(".product-card__technology")?.textContent?.trim();
    const colors = el.querySelectorAll(".product-card__swatch").length;
    if (name) items.push({ name, price, tech, colorCount: colors });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
