/**
 * Bloomberg News Scraper
 *
 * Extract technology news from Bloomberg — headline, description, and link.
 * Scrapes Bloomberg technology section with dynamic stealth browsing.
 *
 * Uses `evaluate()` to extract data from story elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bloomberg-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.bloomberg.com/technology");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article.story-package-module").forEach(el => {
    const headline = el.querySelector(".story-package__headline")?.textContent?.trim();
    const link = el.querySelector("a.story-package__story-link")?.href;
    const description = el.querySelector(".story-package__description")?.textContent?.trim();
    if (headline) articles.push({ headline, link, description });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
