/**
 * Bol.com Scraper
 *
 * Extract product listings, pricing in EUR, seller data, and delivery options from
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bol-com-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.bol.com/nl/nl/s/?searchtext=laptop");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-test='product-card']").forEach(el => {
    const name = el.querySelector("[data-test='product-title']")?.textContent?.trim();
    const price = el.querySelector("[data-test='price']")?.textContent?.trim();
    const rating = el.querySelector("[data-test='rating']")?.getAttribute("aria-label");
    const delivery = el.querySelector("[data-test='delivery-highlight']")?.textContent?.trim();
    if (name) items.push({ name, price, rating, delivery });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
