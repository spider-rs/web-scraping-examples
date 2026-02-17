/**
 * Axios Scraper
 *
 * Extract concise news briefs, newsletters, and smart brevity content from Axios a
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx axios-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.axios.com/technology");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("[data-cy='content-list'] article, .story-card").forEach(el => {
    const headline = el.querySelector("h2, h3")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    const author = el.querySelector("[class*='author']")?.textContent?.trim();
    if (headline) articles.push({ headline, link, author });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
