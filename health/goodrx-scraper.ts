/**
 * GoodRx Scraper
 *
 * Scrapes medication prices from GoodRx prescription savings platform.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx health/goodrx-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.goodrx.com/amoxicillin");
await page.content();
const data = await page.evaluate(`(() => {
  const prices = Array.from(document.querySelectorAll('[data-test="price-option"]')).map(el => ({
    pharmacy: el.querySelector('[data-test="pharmacy-name"]')?.textContent?.trim(),
    price: el.querySelector('[data-test="price"]')?.textContent?.trim(),
    discount: el.querySelector('[data-test="discount-percent"]')?.textContent?.trim(),
    quantity: el.querySelector('[data-test="quantity"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ prices });
})()`);
console.log(JSON.parse(data));
await spider.close();
