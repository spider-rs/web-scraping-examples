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

await spider.init();
const page = spider.page!;
await page.goto("https://www.lazada.com.ph/catalog/?q=headphones");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-qa-locator='product-item'], [data-tracking='product-card']").forEach(el => {
    const name = el.querySelector("a[title]")?.getAttribute("title")?.trim()
      || el.querySelector("a")?.textContent?.trim();
    const price = el.querySelector("span[data-price], [data-qa-locator='product-price']")?.textContent?.trim();
    const rating = el.querySelector("[aria-label*='rating'], [aria-label*='star']")?.getAttribute("aria-label");
    if (name) items.push({ name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
