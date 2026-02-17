/**
 * MatchesFashion Scraper
 *
 * Extract luxury fashion listings, designer profiles, editorial features, and pric
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx matchesfashion-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.matchesfashion.com/us/womens/clothing/dresses");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-card").forEach(el => {
    const designer = el.querySelector(".product-card__designer")?.textContent?.trim();
    const name = el.querySelector(".product-card__name")?.textContent?.trim();
    const price = el.querySelector(".product-card__price")?.textContent?.trim();
    if (designer) items.push({ designer, name, price });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
