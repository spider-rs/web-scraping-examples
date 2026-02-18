/**
 * E*TRADE Scraper
 *
 * Collect stock screener results, options pricing chains, mutual fund data, and re
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx etrade-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.etrade.com/what-we-offer/investment-choices/stocks");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const products = [];
  document.querySelectorAll(".product-card, .feature-card").forEach(el => {
    const title = el.querySelector("h2, h3")?.textContent?.trim();
    const desc = el.querySelector("p")?.textContent?.trim();
    const link = el.querySelector("a")?.getAttribute("href");
    if (title) products.push({ title, desc, link });
  });
  return JSON.stringify({ total: products.length, products: products.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
