/**
 * Setlist.fm Scraper
 *
 * Extract concert setlists, venue data, tour dates, and fan-submitted song lists f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx setlistfm-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.setlist.fm/setlists/radiohead-bd6bd12.html");
await page.content();

const data = await page.evaluate(`(() => {
  const setlists = [];
  document.querySelectorAll(".setlistPreview").forEach(el => {
    const date = el.querySelector(".dateBlock .month, .dateBlock .day")?.textContent?.trim();
    const venue = el.querySelector(".setlistMainLine a:nth-child(2)")?.textContent?.trim();
    const city = el.querySelector(".setlistMainLine span")?.textContent?.trim();
    const songs = [];
    el.querySelectorAll(".songPart a").forEach(s => songs.push(s.textContent?.trim()));
    if (venue) setlists.push({ date, venue, city, songs: songs.slice(0, 5) });
  });
  return JSON.stringify({ total: setlists.length, setlists: setlists.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
