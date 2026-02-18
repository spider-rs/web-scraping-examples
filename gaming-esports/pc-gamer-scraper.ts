/**
 * PC Gamer Scraper
 *
 * Extract PC gaming reviews, hardware recommendations, news articles, and buying g
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx pc-gamer-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.pcgamer.com/games/reviews/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".listingResult").forEach(el => {
    const title = el.querySelector(".article-name")?.textContent?.trim();
    const date = el.querySelector(".date")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    const excerpt = el.querySelector(".synopsis")?.textContent?.trim();
    if (title) articles.push({ title, date, link, excerpt });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
