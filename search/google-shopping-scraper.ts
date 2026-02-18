/**
 * Google Shopping Scraper
 *
 * Extracts product listings from Google Shopping results
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx search/google-shopping-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.google.com/search?tbm=shop&q=wireless+headphones");
await page.content(10000);

const products = await page.evaluate(`(() => {
  const items = document.querySelectorAll("[data-docid], .sh-dgr__content");
  return JSON.stringify(Array.from(items).map(item => ({
    name: item.querySelector("h3")?.textContent?.trim() || "",
    price: item.querySelector("span[aria-label*='$'], b")?.textContent?.trim() || "",
    source: item.querySelector("cite")?.textContent?.trim() || "",
  })));
})()`);

const parsed = JSON.parse(products as string);
console.log("Products found:", parsed.length);
parsed.slice(0, 5).forEach((p: { name: string; price: string }) => console.log(`- ${p.name} ${p.price}`));
await spider.close();
