/**
 * TaskRabbit Scraper
 *
 * Extract tasker profiles, hourly rates, skill categories, and booking availabilit
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx taskrabbit-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.taskrabbit.com/locations/new-york/furniture-assembly");
await page.content(10000);

const data = await page.extractFields({
  name: "[data-testid='tasker-name']",
  rate: "[data-testid='tasker-rate']",
  rating: "[data-testid='tasker-rating']",
  reviews: "[data-testid='tasker-reviews']",
  tasks: "[data-testid='tasks-completed']",
  image: { selector: "[data-testid='tasker-avatar'] img", attribute: "src" },
});

console.log(data);
await spider.close();
