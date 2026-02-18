/**
 * Vercel Scraper
 *
 * Extract template showcases, integration details, and framework documentation fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx vercel-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://vercel.com/templates");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const templates = [];
  document.querySelectorAll("[class*='template-card']").forEach(el => {
    const name = el.querySelector("h3")?.textContent?.trim();
    const framework = el.querySelector("[class*='framework']")?.textContent?.trim();
    const desc = el.querySelector("p")?.textContent?.trim();
    const link = el.querySelector("a")?.getAttribute("href");
    if (name) templates.push({ name, framework, desc, link });
  });
  return JSON.stringify({ total: templates.length, templates: templates.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
