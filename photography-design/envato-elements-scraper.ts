/**
 * Envato Elements Scraper
 *
 * Extract creative asset listings, license details, contributor data, and format i
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx envato-elements-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://elements.envato.com/graphic-templates/web/landing-page");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const assets = [];
  document.querySelectorAll("[data-testid='item-card']").forEach(el => {
    const title = el.querySelector("[data-testid='item-card-title']")?.textContent?.trim();
    const contributor = el.querySelector("[data-testid='item-card-author']")?.textContent?.trim();
    const img = el.querySelector("img")?.getAttribute("src");
    if (title) assets.push({ title, contributor, img });
  });
  return JSON.stringify({ total: assets.length, assets: assets.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
