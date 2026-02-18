/**
 * AWS Marketplace Scraper
 *
 * Extract software listings, pricing models, vendor data, and deployment options f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx aws-marketplace-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://aws.amazon.com/marketplace/search/results?searchTerms=monitoring");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const products = [];
  document.querySelectorAll("[data-testid='search-result-card']").forEach(el => {
    const name = el.querySelector("h2, [data-testid='product-title']")?.textContent?.trim();
    const vendor = el.querySelector("[data-testid='vendor-name']")?.textContent?.trim();
    const pricing = el.querySelector("[data-testid='pricing-info']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='star-rating']")?.getAttribute("aria-label");
    if (name) products.push({ name, vendor, pricing, rating });
  });
  return JSON.stringify({ total: products.length, products: products.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
