/**
 * Audi Scraper
 *
 * Extract Audi model lineups, Quattro drivetrain specs, build-and-price configurat
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx audi-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.audiusa.com/us/web/en/models.html");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const models = [];
  document.querySelectorAll("[class*='model-card'], [class*='ModelCard']").forEach(el => {
    const name = el.querySelector("h2, h3, [class*='model-name']")?.textContent?.trim();
    const price = el.querySelector("[class*='price'], [class*='msrp']")?.textContent?.trim();
    const engine = el.querySelector("[class*='engine']")?.textContent?.trim();
    const drivetrain = el.querySelector("[class*='drivetrain']")?.textContent?.trim();
    const link = el.querySelector("a")?.getAttribute("href");
    if (name) models.push({ name, price, engine, drivetrain, link });
  });
  return JSON.stringify({ total: models.length, models: models.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
