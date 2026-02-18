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

await spider.init();
const page = spider.page!;
await page.goto("https://www.google.com/travel/hotels/London?q=hotels+in+london&g2lb=2502548&hl=en&gl=us&cs=1&ssta=1&ts=CAESCgoCCAMKAggDEAAaRwopEicyJTB4NDg3NjA0ZGVhZjIyMWU5YjoweDEzZDRhMTM4MTc2NmQxMTQSGhIUCgcI6A8QBhgTEgcI6A8QBhgUGAEyAhAAKgsKBygBOgNHQlAaAA");
await page.content(15000);

const data = await page.evaluate(`(() => {
  const hotels = [];
  document.querySelectorAll("a[href*='/travel/hotels/entity']").forEach(el => {
    const card = el.closest("[data-ved]") || el.parentElement;
    const name = card?.querySelector("h2, h3, [role='heading']")?.textContent?.trim();
    const price = card?.querySelector("[aria-label*='$'], [aria-label*='£']")?.textContent?.trim()
      || card?.textContent?.match(/[\\$£€]\\d+/)?.[0];
    const rating = card?.querySelector("[aria-label*='star'], [aria-label*='rating']")?.textContent?.trim();
    const reviews = card?.querySelector("[aria-label*='review']")?.textContent?.trim();
    if (name && name.length > 2) hotels.push({ name, price, rating, reviews });
  });
  return JSON.stringify({ total: hotels.length, hotels: hotels.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
