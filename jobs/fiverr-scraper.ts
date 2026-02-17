/**
 * Fiverr Scraper
 *
 * Extract freelance service listings, seller ratings, pricing tiers, and delivery 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx fiverr-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.fiverr.com/search/gigs?query=web+scraping&source=top-bar");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const gigs = [];
  document.querySelectorAll("[class*='gig-card-layout']").forEach(el => {
    const title = el.querySelector("[class*='gig-title'] a")?.textContent?.trim();
    const seller = el.querySelector("[class*='seller-name']")?.textContent?.trim();
    const rating = el.querySelector("[class*='rating-score']")?.textContent?.trim();
    const price = el.querySelector("[class*='price-wrapper'] span")?.textContent?.trim();
    if (title) gigs.push({ title, seller, rating, price });
  });
  return JSON.stringify({ total: gigs.length, gigs: gigs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
