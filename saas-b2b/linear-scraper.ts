/**
 * Linear Scraper
 *
 * Extract issue tracker features, pricing tiers, changelog entries, and integratio
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx linear-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://linear.app/changelog");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const entries = [];
  document.querySelectorAll("article, [data-testid='changelog-entry']").forEach(el => {
    const title = el.querySelector("h2, h3")?.textContent?.trim();
    const date = el.querySelector("time")?.getAttribute("datetime");
    const description = el.querySelector("p")?.textContent?.trim();
    if (title) entries.push({ title, date, description });
  });
  return JSON.stringify({ total: entries.length, entries: entries.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
