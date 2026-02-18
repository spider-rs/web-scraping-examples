/**
 * Idealista Scraper
 *
 * Extract European property listings, rental prices, and neighborhood data from Id
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx idealista-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.idealista.com/en/venta-viviendas/madrid-madrid/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll("article.item").forEach(el => {
    const address = el.querySelector(".item-link")?.textContent?.trim();
    const price = el.querySelector(".item-price")?.textContent?.trim();
    const details = el.querySelector(".item-detail-char")?.textContent?.trim();
    const agency = el.querySelector(".item-not-clickable-logo img")?.getAttribute("alt");
    if (address) listings.push({ address, price, details, agency });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
