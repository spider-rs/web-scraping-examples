/**
 * Google Maps Scraper
 *
 * Extracts restaurant places from Google Maps search results
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx search/google-maps-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.google.com/maps/search/restaurants+near+times+square");
await page.content(5000);

// Dismiss cookie consent if present (appears on EU proxies)
await page.evaluate(`(() => {
  const btn = document.querySelector("button[aria-label*='Accept'], button[aria-label*='Reject all'], form[action*='consent'] button:last-child");
  if (btn) btn.click();
})()`);
await page.content(12000);

const places = await page.evaluate(`(() => {
  const results = [];
  document.querySelectorAll("a[href*='/maps/place/']").forEach(el => {
    const name = el.getAttribute("aria-label")?.trim();
    if (name) results.push({ name });
  });
  // Fallback: extract from feed items
  if (!results.length) {
    document.querySelectorAll("[role='feed'] > div").forEach(el => {
      const name = el.querySelector("[aria-label]")?.getAttribute("aria-label")?.trim()
        || el.textContent?.split("\\n")[0]?.trim();
      if (name && name.length > 2 && name.length < 100) results.push({ name });
    });
  }
  return JSON.stringify(results);
})()`);

const parsed = JSON.parse(places as string);
console.log("Places found:", parsed.length);
parsed.slice(0, 5).forEach((p: { name: string }) => console.log(`- ${p.name}`));
await spider.close();
