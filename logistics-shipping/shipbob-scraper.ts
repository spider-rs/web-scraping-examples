/**
 * ShipBob Scraper
 *
 * Extract fulfillment center locations, shipping speed comparisons, integration li
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx shipbob-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.shipbob.com/fulfillment-centers/");
await page.content();

const data = await page.evaluate(`(() => {
  const centers = [];
  document.querySelectorAll(".location-card, .center-item").forEach(el => {
    const name = el.querySelector("h3, .center-name")?.textContent?.trim();
    const location = el.querySelector(".location, .address")?.textContent?.trim();
    const details = el.querySelector("p, .description")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    if (name) centers.push({ name, location, details, link });
  });
  return JSON.stringify({ total: centers.length, centers: centers.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
