/**
 * Codewars Scraper
 *
 * Extract kata challenges, difficulty ranks, completion stats, and language availa
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx codewars-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.codewars.com/kata/search/javascript?q=&order_by=popularity+desc");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const katas = [];
  document.querySelectorAll("[class*='kata-row'], .list-item").forEach(el => {
    const name = el.querySelector("a[href*='/kata/']")?.textContent?.trim();
    const rank = el.querySelector("[class*='rank']")?.textContent?.trim();
    const completions = el.querySelector("[class*='completed']")?.textContent?.trim();
    const tags = [...el.querySelectorAll("[class*='tag'] span")].map(t => t.textContent?.trim());
    if (name) katas.push({ name, rank, completions, tags });
  });
  return JSON.stringify({ total: katas.length, katas: katas.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
