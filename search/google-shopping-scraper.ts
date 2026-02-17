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
await spider.connect();
const page = spider.page!;

await page.goto("https://www.google.com/search?tbm=shop&q=wireless+headphones");
await page.waitForSelector(".sh-dgr__content", { timeout: 10000 });

const products = await page.evaluate(() => {
  const items = document.querySelectorAll(".sh-dgr__content");
  return Array.from(items).map((item) => ({
    name: item.querySelector(".mKornhf")?.textContent || "",
    price: item.querySelector(".a6T0Zd")?.textContent || "",
    source: item.querySelector(".aULrW")?.textContent || "",
  }));
});

console.log("Products found:", products.length);
products.slice(0, 5).forEach((p) => console.log(`- ${p.name} ${p.price}`));
await spider.close();
