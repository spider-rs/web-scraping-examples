/**
 * EasyPost Scraper
 *
 * Extract shipping API documentation, carrier rate comparisons, address verificati
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx easypost-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.easypost.com/carriers");
await page.content();

const data = await page.evaluate(`(() => {
  const carriers = [];
  document.querySelectorAll(".carrier-card, .carrier-item").forEach(el => {
    const name = el.querySelector("h3, .carrier-name")?.textContent?.trim();
    const description = el.querySelector("p, .carrier-description")?.textContent?.trim();
    const services = el.querySelector(".services, .service-list")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    if (name) carriers.push({ name, description, services, link });
  });
  return JSON.stringify({ total: carriers.length, carriers: carriers.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
