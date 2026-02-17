/**
 * Financial Times Scraper
 *
 * Acquire global financial news, market data summaries, and opinion columns from t
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx financial-times-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.ft.com/markets");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".o-teaser").forEach(el => {
    const title = el.querySelector(".o-teaser__heading a")?.textContent?.trim();
    const summary = el.querySelector(".o-teaser__standfirst")?.textContent?.trim();
    const tag = el.querySelector(".o-teaser__tag")?.textContent?.trim();
    const time = el.querySelector("time")?.getAttribute("datetime");
    if (title) articles.push({ title, summary, tag, time });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
