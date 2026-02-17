/**
 * Product Hunt Scraper
 *
 * Scrapes trending products from Product Hunt platform.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx reviews/producthunt-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.producthunt.com/");
await page.content();
const data = await page.evaluate(`(() => {
  const products = Array.from(document.querySelectorAll('[data-test="post-item"]')).map(el => ({
    title: el.querySelector('[data-test="post-title"]')?.textContent?.trim(),
    tagline: el.querySelector('[data-test="post-tagline"]')?.textContent?.trim(),
    votes: el.querySelector('[data-test="vote-button"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ products });
})()`);
console.log(JSON.parse(data));
await spider.close();
