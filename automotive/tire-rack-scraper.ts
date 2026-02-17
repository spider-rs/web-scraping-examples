/**
 * Tire Rack Scraper
 *
 * Extract Tire Rack product listings, customer ratings, tire test results, and fit
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx tire-rack-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.tirerack.com/tires/TireSearchResults.jsp?width=225%2F&ratio=45&diameter=17");
await page.content();

const data = await page.evaluate(`(() => {
  const tires = [];
  document.querySelectorAll(".product-list-item").forEach(el => {
    const name = el.querySelector(".product-name a")?.textContent?.trim();
    const price = el.querySelector(".price-value")?.textContent?.trim();
    const rating = el.querySelector(".customer-rating-value")?.textContent?.trim();
    const survey = el.querySelector(".survey-score")?.textContent?.trim();
    const warranty = el.querySelector(".warranty-miles")?.textContent?.trim();
    if (name) tires.push({ name, price, rating, survey, warranty });
  });
  return JSON.stringify({ total: tires.length, tires: tires.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
