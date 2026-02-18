/**
 * Vox Scraper
 *
 * Extract explanatory journalism, policy analysis, and culture coverage from Vox M
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx vox-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.vox.com/technology");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".c-compact-river__entry, .c-entry-box--compact").forEach(el => {
    const headline = el.querySelector("h2 a")?.textContent?.trim();
    const link = el.querySelector("h2 a")?.href;
    const author = el.querySelector(".c-byline a")?.textContent?.trim();
    const excerpt = el.querySelector(".p-dek")?.textContent?.trim();
    if (headline) articles.push({ headline, link, author, excerpt });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
