/**
 * Better Business Bureau (BBB) Scraper
 *
 * Scrapes web development business listings from BBB directory.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx reviews/bbb-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.bbb.org/search?find_country=US&find_text=web+development");
await page.content();
const data = await page.evaluate(`(() => {
  const businesses = Array.from(document.querySelectorAll('[data-test="result"]')).map(el => ({
    name: el.querySelector('[data-test="business-name"]')?.textContent?.trim(),
    rating: el.querySelector('[data-test="bbb-rating"]')?.textContent?.trim(),
    accredited: el.querySelector('[data-test="accredited"]')?.textContent?.trim(),
    phone: el.querySelector('[data-test="phone"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ businesses });
})()`);
console.log(JSON.parse(data));
await spider.close();
