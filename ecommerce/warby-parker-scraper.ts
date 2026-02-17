/**
 * Warby Parker Scraper
 *
 * Scrape eyewear frames, lens options, virtual try-on data, and pricing from Warby
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx warby-parker-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.warbyparker.com/eyeglasses/women");

const data = await page.extractFields({
  heading: "h1",
  frames: { selector: "[data-testid='product-card'] h3", all: true },
  prices: { selector: "[data-testid='product-card'] [data-testid='price']", all: true },
  colors: { selector: "[data-testid='product-card'] [data-testid='color-count']", all: true },
});

console.log(data);
await spider.close();
