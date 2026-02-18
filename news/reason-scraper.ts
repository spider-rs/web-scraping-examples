/**
 * Reason Scraper
 *
 * Extract libertarian policy analysis, free market commentary, civil liberties rep
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx reason-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://reason.com/latest/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article, .entry, .post-item").forEach(el => {
    const headline = el.querySelector("h2 a, h3 a, .entry-title a")?.textContent?.trim();
    const link = el.querySelector("h2 a, h3 a, .entry-title a")?.getAttribute("href");
    const author = el.querySelector(".byline a, .author a")?.textContent?.trim();
    const excerpt = el.querySelector(".entry-content p, .excerpt")?.textContent?.trim();
    if (headline) articles.push({ headline, link, author, excerpt });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
