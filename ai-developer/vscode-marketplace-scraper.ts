/**
 * VS Code Marketplace Scraper
 *
 * Extract extension details, install counts, ratings, and publisher info from the 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx vscode-marketplace-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://marketplace.visualstudio.com/search?target=VSCode&category=All%20categories&sortBy=Installs");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const extensions = [];
  document.querySelectorAll(".gallery-item-card").forEach(el => {
    const name = el.querySelector(".item-title")?.textContent?.trim();
    const publisher = el.querySelector(".publisher-name")?.textContent?.trim();
    const installs = el.querySelector(".install-count")?.textContent?.trim();
    const rating = el.querySelector(".average-rating")?.getAttribute("title");
    const desc = el.querySelector(".item-description")?.textContent?.trim();
    if (name) extensions.push({ name, publisher, installs, rating, desc });
  });
  return JSON.stringify({ total: extensions.length, extensions: extensions.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
