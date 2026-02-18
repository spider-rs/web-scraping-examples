/**
 * OLX Scraper
 *
 * Extract classified ads, user listings, pricing, and location data from OLX globa
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx olx-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-ds-component='DS-AdCard']").forEach(el => {
    const name = el.querySelector("h2")?.textContent?.trim();
    const price = el.querySelector("[data-ds-component='DS-Text'] span")?.textContent?.trim();
    const location = el.querySelector("[data-ds-component='DS-LocationDate']")?.textContent?.trim();
    if (name) items.push({ name, price, location });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
