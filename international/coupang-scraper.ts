/**
 * Coupang Scraper
 *
 * Extract product listings, rocket delivery info, pricing in KRW, and reviews from
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx coupang-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.coupang.com/np/search?q=laptop&channel=user");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".search-product").forEach(el => {
    const name = el.querySelector(".name")?.textContent?.trim();
    const price = el.querySelector(".price-value")?.textContent?.trim();
    const rating = el.querySelector(".rating")?.textContent?.trim();
    const rocket = !!el.querySelector(".rocket-icon");
    if (name) items.push({ name, price, rating, rocketDelivery: rocket });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
