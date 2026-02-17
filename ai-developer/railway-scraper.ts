/**
 * Railway Scraper
 *
 * Extract deployment templates, starter projects, plugin details, and infrastructu
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx railway-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://railway.app/templates");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const templates = [];
  document.querySelectorAll("[class*='TemplateCard'], [class*='template-card']").forEach(el => {
    const name = el.querySelector("h3, [class*='name']")?.textContent?.trim();
    const desc = el.querySelector("p, [class*='description']")?.textContent?.trim();
    const deploys = el.querySelector("[class*='deploys']")?.textContent?.trim();
    const author = el.querySelector("[class*='author']")?.textContent?.trim();
    if (name) templates.push({ name, desc, deploys, author });
  });
  return JSON.stringify({ total: templates.length, templates: templates.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
