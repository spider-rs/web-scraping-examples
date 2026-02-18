/**
 * Slack Scraper
 *
 * Extract public community directories, app listings, and workspace info from Slac
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx slack-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://slack.com/apps");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const apps = [];
  document.querySelectorAll("[data-qa='app_card']").forEach(el => {
    const name = el.querySelector("[data-qa='app_name']")?.textContent?.trim();
    const description = el.querySelector("[data-qa='app_short_description']")?.textContent?.trim();
    const category = el.querySelector("[data-qa='app_category']")?.textContent?.trim();
    if (name) apps.push({ name, description, category });
  });
  return JSON.stringify({ total: apps.length, apps: apps.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
