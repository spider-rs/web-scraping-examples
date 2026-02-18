/**
 * Google Play Store Scraper
 *
 * Extract app metadata from the Google Play Store — name, developer,
 * rating, genre, and description.
 *
 * Uses `evaluate()` for robust extraction from the Play Store layout.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx google-play-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});
await spider.init();
const page = spider.page!;

await page.goto(
  "https://play.google.com/store/apps/details?id=com.whatsapp",
);
await page.content();

const data = await page.evaluate(`(() => {
  const name = document.querySelector("h1")?.textContent?.trim();
  const developer = document.querySelector("a[href*='/store/apps/dev'], a[href*='dev?id=']")?.textContent?.trim();
  const rating = document.querySelector("[aria-label*='rating'], [aria-label*='star'], [itemprop='starRating']")?.textContent?.trim();
  const genre = document.querySelector("[itemprop='genre']")?.textContent?.trim()
    || document.querySelector("a[href*='category/'][itemprop]")?.textContent?.trim();
  const desc = document.querySelector("[data-g-id='description']");
  const description = (desc?.textContent?.trim() || document.querySelector("[itemprop='description']")?.textContent?.trim() || "").slice(0, 500);
  return JSON.stringify({ name, developer, rating, genre, description });
})()`);

console.log(JSON.parse(data));
await spider.close();
