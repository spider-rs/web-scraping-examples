/**
 * Crocs Scraper
 *
 * Scrape clog and sandal listings, Jibbitz charm options, collaboration drops, and
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx crocs-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.crocs.com/clogs/");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-tile").forEach(el => {
    const name = el.querySelector(".product-tile__name")?.textContent?.trim();
    const price = el.querySelector(".product-tile__price .value")?.textContent?.trim();
    const badge = el.querySelector(".product-tile__badge")?.textContent?.trim();
    const colors = el.querySelectorAll(".color-swatch__item").length;
    if (name) items.push({ name, price, badge, colorCount: colors });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
