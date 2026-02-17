/**
 * Mother Jones Scraper
 *
 * Extract investigative journalism, political reporting, environmental coverage, a
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mother-jones-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.motherjones.com/politics/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article, .card, .entry").forEach(el => {
    const headline = el.querySelector("h2 a, h3 a, .hed a")?.textContent?.trim();
    const link = el.querySelector("h2 a, h3 a, .hed a")?.getAttribute("href");
    const author = el.querySelector(".byline a")?.textContent?.trim();
    const dek = el.querySelector(".dek, .excerpt")?.textContent?.trim();
    if (headline) articles.push({ headline, link, author, dek });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
