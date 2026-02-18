/**
 * Discogs Scraper
 *
 * Extract music database entries, vinyl marketplace listings, label discographies,
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx discogs-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.discogs.com/search/?sort=hot%2Cdesc&type=release&genre_exact=Electronic");
await page.content();

const data = await page.evaluate(`(() => {
  const releases = [];
  document.querySelectorAll("#search_results .card").forEach(el => {
    const title = el.querySelector("a.search_result_title")?.textContent?.trim();
    const label = el.querySelector(".card-release-label a")?.textContent?.trim();
    const year = el.querySelector(".card-release-year")?.textContent?.trim();
    const format = el.querySelector(".card-release-format")?.textContent?.trim();
    if (title) releases.push({ title, label, year, format });
  });
  return JSON.stringify({ total: releases.length, releases: releases.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
