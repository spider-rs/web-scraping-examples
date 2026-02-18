/**
 * Capterra Reviews Scraper
 *
 * Scrapes web scraping software reviews from Capterra marketplace.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx reviews/capterra-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.capterra.com/web-scraping-software/");
await page.content();
const data = await page.evaluate(`(() => {
  const products = Array.from(document.querySelectorAll('.shpi__details')).map(el => ({
    name: el.querySelector('a[data-product-name]')?.textContent?.trim(),
    rating: el.querySelector('[data-test="product-rating"]')?.textContent?.trim(),
    reviews: el.querySelector('[data-test="review-count"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ products });
})()`);
console.log(JSON.parse(data));
await spider.close();
