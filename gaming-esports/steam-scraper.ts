/**
 * Steam Scraper
 *
 * Extract game listings, pricing, reviews, tags, and player counts from the Steam 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx steam-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://store.steampowered.com/app/1245620/ELDEN_RING/");
await page.content();

const data = await page.evaluate(`(() => {
  const title = document.querySelector("#appHubAppName")?.textContent?.trim();
  const price = document.querySelector(".game_purchase_price, .discount_final_price")?.textContent?.trim();
  const discount = document.querySelector(".discount_pct")?.textContent?.trim();
  const reviewSummary = document.querySelector(".game_review_summary")?.textContent?.trim();
  const releaseDate = document.querySelector(".date")?.textContent?.trim();
  const developer = document.querySelector("#developers_list a")?.textContent?.trim();
  const tags = [];
  document.querySelectorAll(".glance_tags a.app_tag").forEach(el => {
    tags.push(el.textContent?.trim());
  });
  return JSON.stringify({ title, price, discount, reviewSummary, releaseDate, developer, tags: tags.slice(0, 8) });
})()`);

console.log(JSON.parse(data));
await spider.close();
