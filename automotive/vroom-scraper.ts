/**
 * Vroom Scraper
 *
 * Scrape Vroom online car inventory, delivery pricing, trade-in estimates, and det
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx vroom-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.vroom.com/inventory/toyota-camry-2022");
await page.content();

const data = await page.extractFields({
  title: "[data-testid='vehicle-title']",
  price: "[data-testid='vehicle-price']",
  mileage: "[data-testid='vehicle-mileage']",
  monthly: "[data-testid='monthly-payment']",
  color: "[data-testid='exterior-color']",
  image: { selector: "[data-testid='vehicle-image'] img", attribute: "src" },
});

console.log(data);
await spider.close();
