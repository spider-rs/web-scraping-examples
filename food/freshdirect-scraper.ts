/**
 * FreshDirect Scraper
 *
 * Extract fresh grocery listings, pricing, nutritional info, and delivery windows 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx freshdirect-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.freshdirect.com/browse.jsp?pageType=browse&id=fru");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const products = [];
  document.querySelectorAll(".portrait-item").forEach(el => {
    const name = el.querySelector(".portrait-item-header a")?.textContent?.trim();
    const price = el.querySelector(".portrait-item-price")?.textContent?.trim();
    const weight = el.querySelector(".portrait-item-unit-price")?.textContent?.trim();
    if (name) products.push({ name, price, weight });
  });
  return JSON.stringify({ total: products.length, products: products.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
