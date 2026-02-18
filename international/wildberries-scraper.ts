/**
 * Wildberries Scraper
 *
 * Extract product listings, pricing in RUB, seller data, and delivery info from Wi
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx wildberries-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.wildberries.ru/catalog/elektronika/noutbuki-pereferiya/noutbuki-702");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-card").forEach(el => {
    const name = el.querySelector(".product-card__name")?.textContent?.trim();
    const price = el.querySelector(".price__lower-price")?.textContent?.trim();
    const brand = el.querySelector(".product-card__brand")?.textContent?.trim();
    const rating = el.querySelector(".address-rate-mini")?.textContent?.trim();
    if (name) items.push({ name, price, brand, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
