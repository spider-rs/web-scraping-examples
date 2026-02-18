/**
 * Mastodon Scraper
 *
 * Extract toots, user profiles, instance info, and federated timeline data from Ma
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mastodon-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://mastodon.social/explore");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const toots = [];
  document.querySelectorAll(".status__wrapper").forEach(el => {
    const author = el.querySelector(".display-name__account")?.textContent?.trim();
    const text = el.querySelector(".status__content")?.textContent?.trim();
    const time = el.querySelector("time")?.getAttribute("datetime");
    const boosts = el.querySelector(".status__action-bar__counter:nth-child(2)")?.textContent?.trim();
    if (text) toots.push({ author, text: text.slice(0, 500), time, boosts });
  });
  return JSON.stringify({ total: toots.length, toots: toots.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
