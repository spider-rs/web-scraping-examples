/**
 * Lonely Planet Scraper
 *
 * Extract destination guides, travel tips, points of interest, and editorial recom
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx lonely-planet-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.lonelyplanet.com/japan/tokyo/attractions");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const attractions = [];
  document.querySelectorAll("[data-testid='attraction-card']").forEach(el => {
    const name = el.querySelector("h3")?.textContent?.trim();
    const description = el.querySelector(".card-description")?.textContent?.trim();
    const category = el.querySelector(".card-tag")?.textContent?.trim();
    const rating = el.querySelector(".rating-value")?.textContent?.trim();
    if (name) attractions.push({ name, description, category, rating });
  });
  return JSON.stringify({ total: attractions.length, attractions: attractions.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
