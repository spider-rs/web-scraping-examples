/**
 * Google Images Scraper
 *
 * Extract image search results, metadata, source URLs, and related image suggestio
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx google-images-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.google.com/search?tbm=isch&q=web+scraping+diagram");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const images = [];
  document.querySelectorAll("[data-id]").forEach(el => {
    const title = el.querySelector("h3")?.textContent?.trim();
    const source = el.querySelector("a[href]")?.getAttribute("href");
    const thumbnail = el.querySelector("img[data-src]")?.getAttribute("data-src")
      || el.querySelector("img[src]")?.getAttribute("src");
    const domain = el.querySelector("cite, a[href] span")?.textContent?.trim();
    if (title || thumbnail) images.push({ title, source, thumbnail, domain });
  });
  return JSON.stringify({ total: images.length, images: images.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
