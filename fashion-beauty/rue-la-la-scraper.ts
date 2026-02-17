/**
 * Rue La La Scraper
 *
 * Extract flash sale listings, designer deals, member pricing, and event schedules
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rue-la-la-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.ruelala.com/boutique/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const events = [];
  document.querySelectorAll(".boutique-card").forEach(el => {
    const brand = el.querySelector(".boutique-card__brand")?.textContent?.trim();
    const title = el.querySelector(".boutique-card__title")?.textContent?.trim();
    const discount = el.querySelector(".boutique-card__discount")?.textContent?.trim();
    const image = el.querySelector("img")?.src;
    if (brand) events.push({ brand, title, discount, image });
  });
  return JSON.stringify({ total: events.length, events: events.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
