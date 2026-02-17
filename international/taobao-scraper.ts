/**
 * Taobao Scraper
 *
 * Extract product listings, shop ratings, pricing in CNY, and transaction data fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx taobao-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://s.taobao.com/search?q=headphones");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".Content--contentInner--QVTcU0M .Card--doubleCardWrapper--L2XFE73").forEach(el => {
    const name = el.querySelector(".Title--title--jCOPvpf span")?.textContent?.trim();
    const price = el.querySelector(".Price--priceInt--ZlsSi_M")?.textContent?.trim();
    const sales = el.querySelector(".Price--realSales--FhTZc7U")?.textContent?.trim();
    const shop = el.querySelector(".ShopInfo--TextAndPic--yH0AZfx")?.textContent?.trim();
    if (name) items.push({ name, price, sales, shop });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
