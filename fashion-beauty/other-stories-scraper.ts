/**
 * & Other Stories Scraper
 *
 * Extract curated fashion listings, styling inspiration, pricing, and material inf
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx other-stories-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.stories.com/en_usd/clothing/dresses.html");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".o-product").forEach(el => {
    const name = el.querySelector(".a-heading")?.textContent?.trim();
    const price = el.querySelector(".m-product-price span")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    if (name) items.push({ name, price, link });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
