/**
 * Canva Templates Scraper
 *
 * Extract design templates, category listings, creator profiles, and customization
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx canva-templates-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.canva.com/templates/search/social-media/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const templates = [];
  document.querySelectorAll("[data-testid='template-card']").forEach(el => {
    const title = el.querySelector("[data-testid='template-title']")?.textContent?.trim();
    const category = el.querySelector("[data-testid='template-category']")?.textContent?.trim();
    const img = el.querySelector("img")?.getAttribute("src");
    if (title) templates.push({ title, category, img });
  });
  return JSON.stringify({ total: templates.length, templates: templates.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
