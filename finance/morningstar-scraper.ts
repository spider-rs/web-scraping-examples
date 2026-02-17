/**
 * Morningstar Scraper
 *
 * Scrapes best index funds from Morningstar investment platform.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx finance/morningstar-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.morningstar.com/best-investments/best-index-funds");
await page.content();
const data = await page.evaluate(`(() => {
  const funds = Array.from(document.querySelectorAll('[data-test="fund-item"]')).map(el => ({
    name: el.querySelector('[data-test="fund-name"]')?.textContent?.trim(),
    ticker: el.querySelector('[data-test="ticker"]')?.textContent?.trim(),
    rating: el.querySelector('[data-test="star-rating"]')?.textContent?.trim(),
    yield: el.querySelector('[data-test="yield"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ funds });
})()`);
console.log(JSON.parse(data));
await spider.close();
