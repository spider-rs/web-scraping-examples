/**
 * Fnac Scraper
 *
 * Extract product listings, pricing in EUR, customer reviews, and availability fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx fnac-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.fnac.com/SearchResult/ResultList.aspx?Search=laptop&sft=1");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".Article-item").forEach(el => {
    const name = el.querySelector(".Article-desc a")?.textContent?.trim();
    const price = el.querySelector(".userPrice .price")?.textContent?.trim();
    const rating = el.querySelector(".rating")?.getAttribute("aria-label");
    if (name) items.push({ name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
