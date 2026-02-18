/**
 * Bloomberg Scraper
 *
 * Capture global market indices, commodity prices, currency rates, and breaking fi
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bloomberg-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.bloomberg.com/markets");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const indices = [];
  document.querySelectorAll("[data-type='index'] .data-table-row").forEach(el => {
    const name = el.querySelector(".name")?.textContent?.trim();
    const value = el.querySelector(".value")?.textContent?.trim();
    const change = el.querySelector(".change")?.textContent?.trim();
    const pctChange = el.querySelector(".pct-change")?.textContent?.trim();
    if (name) indices.push({ name, value, change, pctChange });
  });
  return JSON.stringify({ total: indices.length, indices: indices.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
