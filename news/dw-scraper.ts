/**
 * Deutsche Welle Scraper
 *
 * Extract international news, German perspectives, and multilingual reporting from
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx dw-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.dw.com/en/top-stories/s-9097");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".teaser, .cc").forEach(el => {
    const headline = el.querySelector("h2 a, h3 a, .teaser__headline a")?.textContent?.trim();
    const link = el.querySelector("h2 a, h3 a, .teaser__headline a")?.href;
    const teaser = el.querySelector(".teaser__text, p")?.textContent?.trim();
    const date = el.querySelector("time, .date")?.textContent?.trim();
    if (headline) articles.push({ headline, link, teaser, date });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
