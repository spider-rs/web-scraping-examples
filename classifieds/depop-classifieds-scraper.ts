/**
 * Depop Classifieds Scraper
 *
 * Extract vintage and streetwear listings, seller profiles, pricing, and engagemen
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx depop-classifieds-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.depop.com/search/?q=vintage+jacket");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const title = el.querySelector("[data-testid='product-card__description']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-card__price']")?.textContent?.trim();
    const seller = el.querySelector("[data-testid='product-card__seller']")?.textContent?.trim();
    if (title) items.push({ title, price, seller });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
