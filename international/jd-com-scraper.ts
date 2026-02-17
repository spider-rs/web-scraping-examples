/**
 * JD.com Scraper
 *
 * Extract product listings, pricing in CNY, seller ratings, and delivery options f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx jd-com-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://search.jd.com/Search?keyword=laptop&enc=utf-8");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("#J_goodsList .gl-item").forEach(el => {
    const name = el.querySelector(".p-name em")?.textContent?.trim();
    const price = el.querySelector(".p-price strong i")?.textContent?.trim();
    const shop = el.querySelector(".p-shop a")?.textContent?.trim();
    const comments = el.querySelector(".p-commit a")?.textContent?.trim();
    if (name) items.push({ name, price, shop, comments });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
