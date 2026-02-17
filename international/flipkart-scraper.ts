/**
 * Flipkart Scraper
 *
 * Extract product listings, seller data, pricing in INR, and delivery estimates fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx flipkart-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.flipkart.com/search?q=smartphones&sort=relevance");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("._1AtVbE").forEach(el => {
    const name = el.querySelector("._4rR01T, .s1Q9rs")?.textContent?.trim();
    const price = el.querySelector("._30jeq3")?.textContent?.trim();
    const rating = el.querySelector("._3LWZlK")?.textContent?.trim();
    const discount = el.querySelector("._3Ay6Sb")?.textContent?.trim();
    if (name) items.push({ name, price, rating, discount });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
