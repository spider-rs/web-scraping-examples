/**
 * Bring a Trailer Scraper
 *
 * Scrape Bring a Trailer auction listings, current bid amounts, time remaining, co
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bring-a-trailer-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://bringatrailer.com/auctions/");
await page.content();

const data = await page.evaluate(`(() => {
  const auctions = [];
  document.querySelectorAll(".auction-item").forEach(el => {
    const title = el.querySelector(".auction-title a")?.textContent?.trim();
    const bid = el.querySelector(".auction-snippet-bid")?.textContent?.trim();
    const timeLeft = el.querySelector(".auction-snippet-time-left")?.textContent?.trim();
    const comments = el.querySelector(".auction-snippet-comments")?.textContent?.trim();
    if (title) auctions.push({ title, bid, timeLeft, comments });
  });
  return JSON.stringify({ total: auctions.length, auctions: auctions.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
