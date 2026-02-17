/**
 * Tokopedia Scraper
 *
 * Extract product listings, shop ratings, pricing in IDR, and promotional deals fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx tokopedia-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.tokopedia.com/search?q=smartphone");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='divProductWrapper']").forEach(el => {
    const name = el.querySelector("[data-testid='spnSRPProdName']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='spnSRPProdPrice']")?.textContent?.trim();
    const shop = el.querySelector("[data-testid='spnSRPProdShop']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='spnSRPProdRating']")?.textContent?.trim();
    if (name) items.push({ name, price, shop, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
