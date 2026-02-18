/**
 * Docker Hub Scraper
 *
 * Extract container image metadata, pull counts, tag versions, and Dockerfile deta
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx docker-hub-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://hub.docker.com/search?q=nginx&type=image");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const images = [];
  document.querySelectorAll("[data-testid='imageSearchResult']").forEach(el => {
    const name = el.querySelector("h3")?.textContent?.trim();
    const desc = el.querySelector("p")?.textContent?.trim();
    const pulls = el.querySelector("[data-testid='pulls']")?.textContent?.trim();
    const stars = el.querySelector("[data-testid='stars']")?.textContent?.trim();
    if (name) images.push({ name, desc, pulls, stars });
  });
  return JSON.stringify({ total: images.length, images: images.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
