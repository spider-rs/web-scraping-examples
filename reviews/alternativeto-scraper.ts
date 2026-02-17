/**
 * AlternativeTo Scraper
 *
 * Extract software alternatives, user votes, platform availability, and feature ta
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx alternativeto-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://alternativeto.net/software/slack/");
await page.content();

const data = await page.evaluate(`(() => {
  const alternatives = [];
  document.querySelectorAll(".app-listing-item").forEach(el => {
    const name = el.querySelector(".app-listing-title a")?.textContent?.trim();
    const likes = el.querySelector(".like-count")?.textContent?.trim();
    const platforms = [];
    el.querySelectorAll(".platform-icon").forEach(p => platforms.push(p.getAttribute("title")));
    const license = el.querySelector(".app-listing-license")?.textContent?.trim();
    if (name) alternatives.push({ name, likes, platforms, license });
  });
  return JSON.stringify({ total: alternatives.length, alternatives: alternatives.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
