/**
 * Manta Scraper
 *
 * Extract small business profiles, company revenue estimates, employee counts, and
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx manta-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.manta.com/search?search_source=nav&search=restaurants&search_location=Chicago+IL");
await page.content();

const data = await page.evaluate(`(() => {
  const businesses = [];
  document.querySelectorAll(".search-result, .listing-card").forEach(el => {
    const name = el.querySelector("h2 a, .business-name")?.textContent?.trim();
    const address = el.querySelector(".address, .location")?.textContent?.trim();
    const phone = el.querySelector(".phone, .contact-phone")?.textContent?.trim();
    const industry = el.querySelector(".industry, .category")?.textContent?.trim();
    if (name) businesses.push({ name, address, phone, industry });
  });
  return JSON.stringify({ total: businesses.length, businesses: businesses.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
