/**
 * BMW Scraper
 *
 * Extract BMW model lineups, build-your-own configurations, pricing, performance s
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bmw-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.bmwusa.com/models.html");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const models = [];
  document.querySelectorAll("[class*='model-card'], [class*='vehicle-card']").forEach(el => {
    const name = el.querySelector("h2, h3, [class*='model-name']")?.textContent?.trim();
    const price = el.querySelector("[class*='price'], [class*='msrp']")?.textContent?.trim();
    const engine = el.querySelector("[class*='engine']")?.textContent?.trim();
    const hp = el.querySelector("[class*='horsepower'], [class*='power']")?.textContent?.trim();
    const link = el.querySelector("a")?.getAttribute("href");
    if (name) models.push({ name, price, engine, hp, link });
  });
  return JSON.stringify({ total: models.length, models: models.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
