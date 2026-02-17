/**
 * Rover Scraper
 *
 * Extract pet sitter and dog walker profiles, service rates, verified review score
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rover-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.rover.com/search/?service_type=overnight-boarding&location=Chicago%2C+IL");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const sitters = [];
  document.querySelectorAll("[data-testid='search-result'], .sitter-card").forEach(el => {
    const name = el.querySelector("[data-testid='sitter-name'], .sitter-name")?.textContent?.trim();
    const rate = el.querySelector("[data-testid='price'], .nightly-rate")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='rating'], .star-rating")?.textContent?.trim();
    const reviews = el.querySelector("[data-testid='review-count'], .review-count")?.textContent?.trim();
    const repeats = el.querySelector("[data-testid='repeat-clients'], .repeat-badge")?.textContent?.trim();
    if (name) sitters.push({ name, rate, rating, reviews, repeats });
  });
  return JSON.stringify({ total: sitters.length, sitters: sitters.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
