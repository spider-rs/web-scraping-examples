/**
 * ProPublica Scraper
 *
 * Extract investigative journalism, data-driven reports, and public accountability
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx propublica-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.propublica.org/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article, .river-item").forEach(el => {
    const headline = el.querySelector("h2 a, h3 a, .hed a")?.textContent?.trim();
    const link = el.querySelector("h2 a, h3 a, .hed a")?.href;
    const dek = el.querySelector(".dek")?.textContent?.trim();
    const series = el.querySelector(".series-label")?.textContent?.trim();
    if (headline) articles.push({ headline, link, dek, series });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
