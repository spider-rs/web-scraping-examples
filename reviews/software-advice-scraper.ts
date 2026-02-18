/**
 * Software Advice Scraper
 *
 * Extract software recommendations, advisor reviews, and buyer guides from Softwar
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx software-advice-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.softwareadvice.com/crm/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const products = [];
  document.querySelectorAll("[data-testid='product-listing']").forEach(el => {
    const name = el.querySelector("[data-testid='product-name']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='overall-rating']")?.textContent?.trim();
    const reviews = el.querySelector("[data-testid='review-count']")?.textContent?.trim();
    const pricing = el.querySelector("[data-testid='pricing-info']")?.textContent?.trim();
    if (name) products.push({ name, rating, reviews, pricing });
  });
  return JSON.stringify({ total: products.length, products: products.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
