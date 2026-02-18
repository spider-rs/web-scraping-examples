/**
 * Hotfrog Scraper
 *
 * Extract international business directory listings, company descriptions, service
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hotfrog-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.hotfrog.com/search/us/new-york/plumber");
await page.content();

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll(".listing-item, .search-result-item").forEach(el => {
    const name = el.querySelector("h2 a, .company-name")?.textContent?.trim();
    const description = el.querySelector(".description, .listing-desc")?.textContent?.trim();
    const address = el.querySelector(".address, .location-text")?.textContent?.trim();
    const phone = el.querySelector(".phone, .contact-phone")?.textContent?.trim();
    if (name) listings.push({ name, description, address, phone });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
