/**
 * Trivago Scraper
 *
 * Scrapes hotel listings from Trivago including names, prices, ratings, and comparison data.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx travel/trivago-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.trivago.com/en-US/srl/hotels-rome-italy");
await page.content(15000);
const data = await page.evaluate(`
  Array.from(document.querySelectorAll("[data-testid='accommodation-list-element']")).map(element => ({
    name: element.querySelector("[data-testid='accommodation-name']")?.textContent?.trim() || '',
    price: element.querySelector("[data-testid='price']")?.textContent?.trim() || '',
    rating: element.querySelector("[data-testid='rating']")?.textContent?.trim() || '',
    reviews: element.querySelector("[data-testid='review-count']")?.textContent?.trim() || '',
    location: element.querySelector("[data-testid='location']")?.textContent?.trim() || '',
    offerCount: element.querySelector("[data-testid='offer-count']")?.textContent?.trim() || '',
    url: element.querySelector('a[href*="/hotels/"]')?.href || ''
  }))
`);
console.log(JSON.parse(data));
await spider.close();
