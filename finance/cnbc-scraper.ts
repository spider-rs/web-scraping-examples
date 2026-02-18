/**
 * CNBC Scraper
 *
 * Gather stock market updates, business news articles, and economic data reports f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cnbc-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.cnbc.com/markets/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".Card-titleContainer a").forEach(el => {
    const title = el.textContent?.trim();
    const link = el.getAttribute("href");
    if (title) articles.push({ title, link });
  });
  const indices = [];
  document.querySelectorAll(".MarketsBanner-container .MarketCard-container").forEach(el => {
    const name = el.querySelector(".MarketCard-symbol")?.textContent?.trim();
    const value = el.querySelector(".MarketCard-lastPrice")?.textContent?.trim();
    const change = el.querySelector(".MarketCard-changeAndPercent")?.textContent?.trim();
    if (name) indices.push({ name, value, change });
  });
  return JSON.stringify({ articles: articles.slice(0, 10), indices });
})()`);

console.log(JSON.parse(data));
await spider.close();
