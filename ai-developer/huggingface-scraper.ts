/**
 * Hugging Face Models Scraper
 *
 * Scrapes trending AI models from Hugging Face platform.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ai-developer/huggingface-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://huggingface.co/models?sort=trending");
await page.content();
const data = await page.evaluate(`(() => {
  const models = Array.from(document.querySelectorAll('article.overview-card-wrapper')).map(el => ({
    name: el.querySelector('h4')?.textContent?.trim(),
    description: el.querySelector('p')?.textContent?.trim(),
    likes: el.querySelector('[data-test="likes-count"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ models });
})()`);
console.log(JSON.parse(data));
await spider.close();
