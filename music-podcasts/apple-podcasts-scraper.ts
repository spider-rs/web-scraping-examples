/**
 * Apple Podcasts Scraper
 *
 * Extract podcast show pages, episode listings, ratings, and chart rankings from A
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx apple-podcasts-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://podcasts.apple.com/us/charts/top-shows/all/all");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const shows = [];
  document.querySelectorAll(".we-lockup").forEach(el => {
    const title = el.querySelector(".we-lockup__title")?.textContent?.trim();
    const artist = el.querySelector(".we-lockup__subtitle")?.textContent?.trim();
    const img = el.querySelector(".we-artwork__image")?.getAttribute("src");
    if (title) shows.push({ title, artist, img });
  });
  return JSON.stringify({ total: shows.length, shows: shows.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
