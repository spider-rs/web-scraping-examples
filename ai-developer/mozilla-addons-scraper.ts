/**
 * Mozilla Add-ons Scraper
 *
 * Extract Firefox add-on details, user reviews, weekly downloads, and compatibilit
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mozilla-addons-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://addons.mozilla.org/en-US/firefox/extensions/");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const addons = [];
  document.querySelectorAll(".SearchResult, [class*='AddonCard']").forEach(el => {
    const name = el.querySelector("h2 a, .SearchResult-name")?.textContent?.trim();
    const rating = el.querySelector("[class*='Rating'] [title]")?.getAttribute("title");
    const users = el.querySelector("[class*='users']")?.textContent?.trim();
    const desc = el.querySelector("[class*='summary'], p")?.textContent?.trim();
    const author = el.querySelector("[class*='author'] a")?.textContent?.trim();
    if (name) addons.push({ name, rating, users, desc, author });
  });
  return JSON.stringify({ total: addons.length, addons: addons.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
