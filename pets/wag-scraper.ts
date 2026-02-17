/**
 * Wag Scraper
 *
 * Extract dog walker profiles, on-demand walk pricing, GPS route tracking details,
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx wag-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://wagwalking.com/dog-walking");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const services = [];
  document.querySelectorAll(".service-card, [data-testid='service-option']").forEach(el => {
    const name = el.querySelector("h3, .service-title")?.textContent?.trim();
    const price = el.querySelector(".service-price, .starting-at")?.textContent?.trim();
    const description = el.querySelector("p, .service-description")?.textContent?.trim();
    const duration = el.querySelector(".service-duration, .time-info")?.textContent?.trim();
    if (name) services.push({ name, price, description, duration });
  });
  return JSON.stringify({ total: services.length, services: services.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
