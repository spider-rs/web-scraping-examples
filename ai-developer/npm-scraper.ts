/**
 * NPM Package Scraper
 *
 * Scrapes web scraping packages from NPM registry.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ai-developer/npm-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.npmjs.com/search?q=web+scraping");
await page.content();
const data = await page.evaluate(`(() => {
  const packages = Array.from(document.querySelectorAll('[data-test="pkg"]')).map(el => ({
    name: el.querySelector('[data-test="pkg-name"]')?.textContent?.trim(),
    description: el.querySelector('[data-test="pkg-description"]')?.textContent?.trim(),
    downloads: el.querySelector('[data-test="pkg-downloads"]')?.textContent?.trim(),
    modified: el.querySelector('[data-test="pkg-modified"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ packages });
})()`);
console.log(JSON.parse(data));
await spider.close();
