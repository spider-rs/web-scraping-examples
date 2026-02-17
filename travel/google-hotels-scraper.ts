/**
 * Google Hotels Scraper
 *
 * Extract hotel comparison data, pricing across providers, and availability from G
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx google-hotels-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.google.com/travel/hotels/London?q=hotels+in+london&g2lb=2502548&hl=en&gl=us&cs=1&ssta=1&ts=CAESCgoCCAMKAggDEAAaRwopEicyJTB4NDg3NjA0ZGVhZjIyMWU5YjoweDEzZDRhMTM4MTc2NmQxMTQSGhIUCgcI6A8QBhgTEgcI6A8QBhgUGAEyAhAAKgsKBygBOgNHQlAaAA");
await page.content(15000);

const data = await page.evaluate(`(() => {
  const hotels = [];
  document.querySelectorAll(".BcKagd .uaTTDe").forEach(el => {
    const name = el.querySelector(".QT7m7")?.textContent?.trim();
    const price = el.querySelector(".kixHKb span")?.textContent?.trim();
    const rating = el.querySelector(".KFi5wf")?.textContent?.trim();
    const reviews = el.querySelector(".jdzyld")?.textContent?.trim();
    if (name) hotels.push({ name, price, rating, reviews });
  });
  return JSON.stringify({ total: hotels.length, hotels: hotels.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
