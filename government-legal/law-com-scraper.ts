/**
 * Law.com Scraper
 *
 * Extract legal news articles, Am Law rankings, firm profiles, and industry analys
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx law-com-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.law.com/americanlawyer/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article.story").forEach(el => {
    const title = el.querySelector("h2 a")?.textContent?.trim();
    const author = el.querySelector(".byline")?.textContent?.trim();
    const date = el.querySelector(".date")?.textContent?.trim();
    const excerpt = el.querySelector(".summary")?.textContent?.trim();
    if (title) articles.push({ title, author, date, excerpt: excerpt?.slice(0, 200) });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
