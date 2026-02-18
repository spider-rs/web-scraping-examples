/**
 * Product Hunt Scraper
 *
 * Extract daily product launches, upvote counts, maker profiles, and product descr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx product-hunt-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.producthunt.com/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const products = [];
  document.querySelectorAll("[data-test='post-item']").forEach(el => {
    const name = el.querySelector("[data-test='post-name']")?.textContent?.trim();
    const tagline = el.querySelector("[data-test='post-tagline']")?.textContent?.trim();
    const upvotes = el.querySelector("[data-test='vote-button'] span")?.textContent?.trim();
    const comments = el.querySelector("[data-test='comment-button'] span")?.textContent?.trim();
    const link = el.querySelector("a")?.getAttribute("href");
    if (name) products.push({ name, tagline, upvotes, comments, link });
  });
  return JSON.stringify({ total: products.length, products: products.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
