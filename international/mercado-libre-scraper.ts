/**
 * Mercado Libre Scraper
 *
 * Extract product listings, seller ratings, pricing in local currencies, and shipp
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mercado-libre-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://listado.mercadolibre.com.mx/celulares-smartphones");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".ui-search-layout__item").forEach(el => {
    const name = el.querySelector(".ui-search-item__title")?.textContent?.trim();
    const price = el.querySelector(".andes-money-amount__fraction")?.textContent?.trim();
    const shipping = el.querySelector(".ui-search-item__shipping")?.textContent?.trim();
    if (name) items.push({ name, price, shipping });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
