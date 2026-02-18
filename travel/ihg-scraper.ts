/**
 * IHG Scraper
 *
 * Extract IHG hotel availability, room pricing, IHG Rewards rates, and property de
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ihg-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.ihg.com/hotels/us/en/find-hotels/hotel-search?qDest=Miami&qCiD=01&qCiMy=052026&qCoD=04&qCoMy=052026");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const hotels = [];
  document.querySelectorAll("[data-testid='hotel-card']").forEach(el => {
    const name = el.querySelector("[data-testid='hotel-name']")?.textContent?.trim();
    const rate = el.querySelector("[data-testid='hotel-rate']")?.textContent?.trim();
    const points = el.querySelector("[data-testid='hotel-points']")?.textContent?.trim();
    const brand = el.querySelector("[data-testid='hotel-brand']")?.textContent?.trim();
    if (name) hotels.push({ name, rate, points, brand });
  });
  return JSON.stringify({ total: hotels.length, hotels: hotels.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
