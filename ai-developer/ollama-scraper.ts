/**
 * Ollama Scraper
 *
 * Extract local LLM model listings, download counts, parameter sizes, and quantiza
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ollama-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://ollama.com/library");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const models = [];
  document.querySelectorAll("[class*='model'], li a[href*='/library/']").forEach(el => {
    const name = el.querySelector("h2, [class*='name'], span:first-child")?.textContent?.trim();
    const desc = el.querySelector("p, [class*='description']")?.textContent?.trim();
    const pulls = el.querySelector("[class*='pulls'], [class*='download']")?.textContent?.trim();
    const tags = el.querySelector("[class*='tags'], [class*='size']")?.textContent?.trim();
    if (name) models.push({ name, desc, pulls, tags });
  });
  return JSON.stringify({ total: models.length, models: models.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
