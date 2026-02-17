/**
 * 17track Scraper
 *
 * Extract universal package tracking across 2000+ carriers, cross-border shipment 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx 17track-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.17track.net/en");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const carriers = [];
  document.querySelectorAll(".carrier-item, .carrier-card").forEach(el => {
    const name = el.querySelector(".carrier-name, h4")?.textContent?.trim();
    const country = el.querySelector(".carrier-country, .country")?.textContent?.trim();
    const website = el.querySelector("a")?.href;
    if (name) carriers.push({ name, country, website });
  });
  const stats = {
    totalCarriers: document.querySelector(".carrier-count, .total-carriers")?.textContent?.trim(),
    countries: document.querySelector(".country-count, .total-countries")?.textContent?.trim(),
  };
  return JSON.stringify({ stats, carriers: carriers.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
