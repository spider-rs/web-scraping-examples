/**
 * Canva Scraper
 *
 * Extract design templates, element categories, pricing plans, and creator marketp
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx canva-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.canva.com/templates/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const templates = [];
  document.querySelectorAll("[data-testid='template-card'], .templateCard").forEach(el => {
    const name = el.querySelector("h3, [data-testid='template-title']")?.textContent?.trim();
    const category = el.querySelector("[data-testid='template-category']")?.textContent?.trim();
    const dimensions = el.querySelector("[data-testid='template-dimensions']")?.textContent?.trim();
    if (name) templates.push({ name, category, dimensions });
  });
  return JSON.stringify({ total: templates.length, templates: templates.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
